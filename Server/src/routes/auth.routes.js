const router = require('express').Router();
const authController = require('../controllers/auth.controllers'); 


// Importando el Middleware de los Tokens
const { verifyToken } = require('../middleware/auth.middleware'); 


// RUTAS PÚBLICAS
router.post('/register', authController.register);
router.post('/login', authController.login);


// RUTAS PROTEGIDAS
router.get('/verify-token', verifyToken, authController.verifyToken); 


module.exports = router;
  