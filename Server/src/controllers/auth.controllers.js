const errorHandler = require('../middleware/errorHandler');
const authService = require('../services/auth.services'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Controlador Registro
const register = errorHandler(async (req, res, _next) => {
    const { name, email, password, acceptterms } = req.body;

    // Verificando usuario existente
    const existingUser = await authService.getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'Cuenta existente con este correo.' });
    }


    // Hasheando contraseña
    const hashedPassword = await bcrypt.hash(password, 10);


    // Registrando usuario
    const newUser = await authService.registerUser(name, email, hashedPassword, acceptterms); 


    if (process.env.JWT_SECRET){

        console.log('ALERTA. JWT_SECRET NO ESTÁ DEFINIDA.')
    }
    // Generando Token
    const token = jwt.sign(
        { id: newUser.id, name: newUser.name }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.TIME_TOKEN }
    );

    res.status(201).json({ 
        message: 'Usuario registrado exitosamente.', 
        token, 
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
});



// Controlador Login
const login = errorHandler(async (req, res, _next) => {
    const { email, password } = req.body;

    // Buscando correos registrados
    const user = await authService.getUserByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas. Correo o contraseña incorrecta.' });
    }


    // Compararando contraseñas
    const isMatch = await bcrypt.compare(password, user.password_hash); 
    if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas. Correo o contraseña incorrecta' });
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
        user: { id: user.id, name: user.name, email: user.email }
    });
});



// Controlador verificación Token 
const verifyToken = async (req, res) => {
    
    // Adjuntando ID usuario
    const userId = req.userId; 


    if (userId) {
        // Buscando usuario en la bd
        const user = await authService.getUserById(parseInt(userId));

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }
        

        // Usuario encontrado
        return res.status(200).json({
            success: true,
            message: 'Token válido. Acceso autorizado.',
            user: { id: user.id, name: user.name, email: user.email }
        });
    };
};


module.exports = {
    register,
    login,
    verifyToken,
};