const router = require('express').Router();
const { verifyToken } = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controllers');


// AUTHENTICATION ROUTES (PUBLIC)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
router.get('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authController.handleForgotPassword);
router.post('/reset-password', authController.handleResetPassword);


// PROFILE ROUTES (PROTECTED)
router.get('/verify-token', verifyToken, authController.verifyToken);
router.put('/profile', verifyToken, authController.updateProfile);
router.put('/profile/avatar', verifyToken, authController.updateAvatar);
router.delete('/account', verifyToken, authController.deleteAccount);


// DIRECTIONS ROUTES
router.post('/address', verifyToken, authController.addAddress);
router.get('/address', verifyToken, authController.getUserAddresses);
router.delete('/address/delete', verifyToken, authController.deleteAddress);


module.exports = router;
