const router = require('express').Router();
const authController = require('../controllers/auth.controllers'); 

// Middleware de los Tokens
const { verifyToken } = require('../middleware/auth.middleware'); 


// Rutas Públicas
router.post('/register', authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/forgot-password',  authController.handleForgotPassword);
router.post('/reset-password', authController.handleResetPassword)


// Rutas protegidas
router.get('/verify-token', verifyToken, authController.verifyToken); 
router.delete('/delete-account', verifyToken, authController.deleteAccount);


module.exports = router;
  