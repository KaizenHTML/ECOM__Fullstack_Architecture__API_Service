const router = require('express').Router();

const authController = require('../controllers/auth.controllers');

const { verifyToken} = require('../middleware/auth.middleware');


// RUTAS PÚBLICAS

// Registro
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);



// RUTAS PROTEGIDAS

// Verificando Token
router.get('/verify-token', verifyToken, authController.verifyToken);


module.exports = router;