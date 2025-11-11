const { forgotPassword, resetPassword } = require('../services/auth.services')
const { sendVerificationEmail, sendPasswordResetEmail  } = require('../utils/email');
const errorHandler = require('../middleware/errorHandler');
const userService = require('../services/user.services'); 
const db = require('../config/db.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');



const register = errorHandler(async (req, res, _next) => {

    const { name, email, password, acceptterms } = req.body;


    // Comprobando correo existente
    const existingUser = await userService.getUserByEmail(email);
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


    // Registrando usuario no comprobado
    const newUser = await userService.registerUser(
        name, email, hashedPassword, acceptterms, false, hashedToken
    ); 


    // Enviando Email
    const verifyUrl = `http://localhost:4000/api/auth/verify-email?token=${verificationToken}&email=${email}`;
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


const verifyEmail = async (req, res) => {

    const { email, token } = req.query;


    if (!email || !token) {
        return res.status(400).send('Enlace inválido.');
    }

    try {
        const result = await db.query(
            'SELECT verification_token, verified FROM users WHERE email = $1', [email]
        );


        const isValid = await bcrypt.compare(token, result.rows[0].verification_token);

        if (!isValid) {
            return res.status(400).send('Token inválido');
        }

        // Actualiza el usuario
        const updateResult = await db.query(
            'UPDATE users SET verified = true, verification_token = NULL WHERE email = $1 RETURNING *',
            [email]
        );

        res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);

    } catch (error) {
        res.status(500).send('Error del servidor');
    }
};



// Login usuario
const login = errorHandler(async (req, res, _next) => {

    const { email, password } = req.body;


    // Buscando correos registrados
    const user = await userService.getUserByEmail(email);
    
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
        user: { 
            id: user.id, 
            name: user.name, 
            email: user.email,
            created_at: user.created_at 
        }
    });
});



// Enviando correo de cambio de contraseña
const handleForgotPassword = async (req, res) => {

    const { email } = req.body;

    try {
        await forgotPassword(email);
        res.status(200).json({
            message: 'Correo de recuperación enviado.'
        });

    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};



// Recibiendo token con la contraseña nueva
const handleResetPassword = async (req, res) => {

    const { token, newPassword } = req.body;

    try {
        await resetPassword(token, newPassword);
        res.status(200).json({
            message: 'Contraseña actualizada correctamente.'
        });

    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};


 
// Comprobando Token 
const verifyToken = async (req, res) => {
    
    // Comprobando existencia de usuario
    const userId = req.user?.id; 


    if (userId) {
        const user = await userService.getUserById(parseInt(userId));

        if (!user) {
            return res.status(404).json({ 
                success: false, message: 'Usuario no encontrado.' 
            });
        };
        
        return res.status(200).json({
            success: true,
            message: 'Token válido. Acceso autorizado.',
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                created_at: user.created_at
            }
        });
    };
};


// Eliminando usuario
const deleteAccount = async (req, res) => {

    const userId = req.user.id

    try {
        
        const user = await userService.getUserById(userId);

        if (!user) {
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


module.exports = {

    register,
    verifyEmail,
    login,
    handleForgotPassword,
    handleResetPassword,
    verifyToken,
    deleteAccount,
};