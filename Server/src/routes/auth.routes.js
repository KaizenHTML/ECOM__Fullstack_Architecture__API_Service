const router = require('express').Router();
const authController = require('../controllers/auth.controllers'); 

// Importando el Middleware de los Tokens
const { verifyToken } = require('../middleware/auth.middleware'); 


// RUTAS PÚBLICAS
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email', authController.verifyEmail);


// RUTAS PROTEGIDAS
router.get('/verify-token', verifyToken, authController.verifyToken); 
router.delete('/delete-account', verifyToken, authController.deleteAccount);


module.exports = router;
  