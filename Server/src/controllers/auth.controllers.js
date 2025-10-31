const { sendVerificationEmail } = require('../utils/email');
const errorHandler = require('../middleware/errorHandler');
const authService = require('../services/auth.services'); 
const db = require('../config/db.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


// Registro
const register = errorHandler(async (req, res, _next) => {

    const { name, email, password, acceptterms } = req.body;


    // Verificando correo existente
    const existingUser = await authService.getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ 
            message: 'Cuenta existente con este correo.' 
        });
    }


    // Hasheando contraseña
    const hashedPassword = await bcrypt.hash(password, 10);


    // Generando token de verificación
    const verificationToken = crypto.randomBytes(32).toString('hex'); 
    const hashedToken = await bcrypt.hash(verificationToken, 10);


    // Registrando usuario no verificado
    const newUser = await authService.registerUser(
        name, email, hashedPassword, acceptterms, false, hashedToken
    ); 

    // Enviando email
    const verifyUrl = `http://localhost:4000/verify-email?token=${verificationToken}&email=${email}`;
    await sendVerificationEmail(email, name, verifyUrl);


    res.status(201).json({ 
        message: 'Registro exitoso. Revisa tu correo para verificar tu cuenta.', 
        user: { 
            id: newUser.id, 
            name: newUser.name, 
            email: newUser.email
        }
    });
});



// Login
const login = errorHandler(async (req, res, _next) => {

    const { email, password } = req.body;


    // Buscando correos registrados
    const user = await authService.getUserByEmail(email);
    if (!user) {
        return res.status(401).json({ 
            message: 'Credenciales inválidas. Correo o contraseña incorrecta.' 
        });
    }

    if(!user.verified){
        return res.status(403).json({
            message: 'Por favor verifica tu correo antes de iniciar sesión.'
        });
    }


    // Compararando contraseñas
    const isMatch = await bcrypt.compare(password, user.password_hash); 
    if (!isMatch) {
        return res.status(401).json({ 
            message: 'Credenciales inválidas. Correo o contraseña incorrecta' 
        });
    }


    // Generando Token
    const token = jwt.sign(
        { id: user.id, name: user.name }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.TIME_TOKEN }
    );

    res.status(200).json({ 
        message: 'Login exitoso', 
        token, 
        user: { id: user.id, name: user.name, email: user.email, created_At: user.created_at }
    });
});



// Verificando Token 
const verifyToken = async (req, res) => {
    
    // Adjuntando ID usuario
    const userId = req.user?.id; 


    if (userId) {
        // Buscando usuario en la bd
        const user = await authService.getUserById(parseInt(userId));

        if (!user) {
            return res.status(404).json({ 
                success: false, message: 'Usuario no encontrado.' 
            });
        };
        
        // Usuario encontrado
        return res.status(200).json({
            success: true,
            message: 'Token válido. Acceso autorizado.',
            user: { id: user.id, name: user.name, email: user.email }
        });
    };
};


// Eliminando usuario
const deleteAccount = async (req, res) =>{

    const userId = req.user.id

    try{
        // Buscando usuario
        const user = await authService.getUserById(userId);

        if(!user){
            res.status(404).json({
                message: 'Usuario no encontrado.'
            });
        }

        // Eliminando usuario
        const query = 'DELETE FROM users WHERE id = $1';
        await db.query(query, [userId]);

        return res.status(200).json({
            message: 'Cuenta eliminada exitosamente.'
        });


    } catch(error) {
        console.error('Error al eliminar la cuenta:', error);
        return res.status(500).json({
            message: 'Error al eliminar la cuenta'
        });
    }
};



// Verificando email
const verifyEmail = async (req, res) => {

    const { email, token } = req.query;

    if(!email || !token){
        return res.status(400).send('Enlace inválido.');
    }
    

    try {
        const result = await db.query(
            'SELECT verification_token FROM users WHERE email = $1 AND verified = false', [email]
        );


        if(result.rows.length === 0) {
            return res.status(400).send('Enlace inválido o verificado');
        }


        const isValid = await bcrypt.compare(token, result.rows[0].verification_token);

        if(!isValid){
            return res.status(400).send('Token inválido');
        }

        await db.query(
            'UPDATE users SET verified = true, verification_token = NULL WHERE email = $1',
            [email]
        );

        res.redirect('http://localhost:3000/login?verified=true');

    } catch (error) {
        console.error('Error al verificar:', error);
        res.status(500).send('Error del servidor');
    }
};


module.exports = {
    register,
    login,
    verifyToken,
    deleteAccount,
    verifyEmail,
};