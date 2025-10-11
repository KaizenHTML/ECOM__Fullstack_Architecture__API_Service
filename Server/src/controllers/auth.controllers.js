// src/controllers/auth.controllers.js (Sintaxis CommonJS)

const errorHandler = require('../middleware/errorHandler');
const authService = require('../services/auth.services'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ------------------------------------
// Controlador de Registro
// ------------------------------------
const register = errorHandler(async (req, res, next) => {
    // ⬇️ CORRECCIÓN 1: Capturamos 'acceptTerms' del body
    const { name, email, password, acceptterms } = req.body;

    // 1. Verificar si el usuario ya existe
    const existingUser = await authService.getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'Cuenta existente con este correo' });
    }

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Registrar el usuario
    // ⬇️ CORRECCIÓN 2: Pasamos la contraseña hasheada y 'acceptTerms'
    const newUser = await authService.registerUser(name, email, hashedPassword, acceptterms); 
    
    // 4. Generar Token
    const token = jwt.sign(
        // NOTA: Usamos 'name' en lugar de 'username' para la carga útil del JWT
        { id: newUser.id, name: newUser.name }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.TIME_TOKEN }
    );

    res.status(201).json({ 
        message: 'Usuario registrado exitosamente', 
        token, 
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
});

// ------------------------------------
// Controlador de Login
// ------------------------------------
const login = errorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // 1. Buscar el usuario
    const user = await authService.getUserByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas. Correo no registrado.' });
    }

    // 2. Comparar la contraseña
    // Esto funciona porque en el servicio mapeamos la columna 'password' a 'password_hash'
    const isMatch = await bcrypt.compare(password, user.password_hash); 
    if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas. Contraseña incorrecta' });
    }

    // 3. Generar Token
    // NOTA: Usamos 'name' en lugar de 'username' para la carga útil del JWT
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

module.exports = {
    register,
    login,
};