const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.services');
const authService = require('../services/auth.services');
const {sendVerificationEmail} = require('../utils/email');
const {errorHandler} = require('../middleware/asyncHandler');



// Register
const register = errorHandler(async(req, res, _next) => {

    const { name, email, password, acceptterms } = req.body;


    // Checking Existing Email
    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
       
        if (existingUser.verified) {
            return res.status(400).json({
                status: 'exists',
                message: 'Ya tienes una cuenta con nosotros. ¡Inicia sesión!'
            });
        } 
        
        else {
            const verificationToken = crypto.randomBytes(32).toString('hex');
 
            await userService.updateVerificationToken(email, verificationToken  );

            const verifyUrl = `http://localhost:4000/api/auth/verify-email?token=${verificationToken}&email=${email}`;
            await sendVerificationEmail(email, name, verifyUrl);

            return res.status(200).json({
                status: 'pending_verification',
                message: 'Ya tienes una cuenta pendiente. Te enviamos un nuevo enlace de activación'
            });
        }
    }
    

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generating Verification Token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(verificationToken, 10);


    // Registering User not Verified
    const newUser = await userService.registerUser(
        name, email, hashedPassword, acceptterms, false, hashedToken
    );

    // Sending Email
    const verifyUrl = `http://localhost:4000/api/auth/verify-email?token=${verificationToken}&email=${email}`;
    await sendVerificationEmail(email, name, verifyUrl);

    res.status(201).json({
        message: '¡Registro exitoso! Te enviamos un correo para activar tu cuenta.',
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});



// Checking Email
const verifyEmail = errorHandler(async (req, res) => {

    const {email, token} = req.query;

    if (!email || !token) {
        return res.status(400).send('Enlace inválido.');
    }

    const isVerified = await userService.verifyUserToken(email, token);

    if (!isVerified) {
        return res.status(400).send('Token inválido o usuario no encontrado');
    }

    res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
});



// Logging In
const login = errorHandler(async (req, res, _next) => {

    const { email, password } = req.body;

    // Searching Registered Emails
    const user = await userService.getUserByEmail(email);

    if (!user) {
        return res.status(404).json({
            message: 'Credenciales inválidas. Correo o contraseña incorrecta'
        });
    }

    if (!user.verified) {
        return res.status(403).json({
            message: 'Por favor verifica tu correo antes de iniciar sesión.'
        });
    }

    // Comparing Passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch ) {
        return res.status(401).json({
            message: 'Credenciales inválidas. Correo o contraseña incorrecta'
        });
    }

    // Generating Token
    const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TIME_TOKEN }
    );

    res.status(200).json({
        message: '¡Bienvenido de vuelta!',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            profile_picture_url: user.profile_picture_url
        }
    });
});



// Sending Password Reset Email
const handleForgotPassword = errorHandler(async (req, res) => {

    const {email} = req.body;

    const user = await userService.getUserByEmail(email)

    if (!user) {
         return res.status(404).json({
            message: 'Correo electrónico no encontrado.'
        })
    }

    await authService.forgotPassword(email);

    res.status(200).json({
        message: 'Si el correo existe en nuestro sistema, recibirás un enlace de recuperación pronto.'
    });
});



// Reset Password
const handleResetPassword = errorHandler(async (req, res) => {

    const {token, newPassword} = req.body;

    await authService.resetPassword(token, newPassword);
    res.status(200).json({
        message: 'Contraseña actualizada correctamente.'
    });
});



// Checking Token 
const verifyToken = errorHandler(async (req, res) => {

    const userId = req.user?.id;

    const user = await userService.getUserById(parseInt(userId));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado.'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Token válido. Acceso autorizado.',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            profile_picture_url: user.profile_picture_url
        }
    });
});



// Deleting User
const deleteAccount = errorHandler(async (req, res) => {

    const userId = req.user.id;

    const user = await userService.getUserById(userId);

    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado.'
        });
    }

    // Deleting User
    await userService.deleteUserById(userId);

    return res.status(200).json({
        message: 'Cuenta eliminada exitosamente.'
    });
});



// Updating Profile
const updateProfile = errorHandler(async (req, res) => {

    const userId = req.user.id;

    const { name, email } = req.body;

    // Verifying Email
    if (email) {

        const existingUser = await userService.getUserByEmail(email);

        if (existingUser && existingUser.id !== userId) {
            return res.status(400).json({
                message: 'Este correo ya está en uso por otra cuenta.'
            });
        };
    }



    // Updating User
    const updatedUser = await userService.updateUser(userId, name, email);

    if (!updatedUser) {
        return res.status(404).json({
            message: 'Usuario no encontrado.'
        });
    }

    return res.status(200).json({
        message: 'Perfil actualizado correctamente.',
        data: updatedUser
    });
});



// Updating Photo Profile
const updateAvatar = errorHandler(async (req, res) => {

    const userId = req.user?.id;

    const { profilePictureUrl } = req.body;

    if (!profilePictureUrl){
        return res.status(400).json({
            success: false,
            message: 'No se recibió la URL de la imagen.'
        });
    }

    // Calling service
    const updatedUser = await userService.updateProfilePicture(userId, profilePictureUrl);

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado.'
        });
    }

    res.status(200).json({
        success: true, 
        message: 'Foto de perfil actualizada con éxito.',
        data: updatedUser
    });
});



// Signing In With Google
const googleLogin = errorHandler(async (req, res) => {
        
    const {id_token} = req.body;

    const {token, user} = await authService.googleLogin(id_token);

    res.status(200).json({
        message: '¡Bienvenido de vuelta!',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            profile_picture_url: user.profile_picture_url
        }
    });
});



// Add Address
const addAddress = errorHandler(async (req, res) => {

    try {

        const {complexName, tower, apartment} = req.body;

        const userId = req.user?.id; 

        // Validating Fields
        if (!complexName || !tower || !apartment) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios.'
            });
        }

        // Sending The Separate Data To The Service
        const newAddress = await userService.addAddress(userId, { 
            conjunto, 
            torre, 
            apartamento 
        });

        res.status(201).json({ 
            success: true,
            message: 'Dirección agregada con éxito.',
            user: newAddress 
        });


    } catch (error) {
      if (error.code === '23505') {

        return res.status(404).json({
          success: false,
          message: 'Esta dirección está registrada en tu perfil.'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Error interno.'
      });
    }
});



// Get Address
const getUserAddresses = errorHandler(async (req, res) => {

    const userId = req.user?.id; 

    const addresses = await userService.getUserAddresses(userId);

    res.status(200).json({
        success: true,
        user: addresses 
    });
});



// Delete Address
const deleteAddress = errorHandler (async (req, res) => {

    const userId = req.user?.id;

    const { id } = req.body;


    await userService.deleteAddress(
        userId, 
        id
    );

    res.status(200).json({
        success: true,
        message: 'Dirección eliminada con éxito.'
    });
});



module.exports = {
    googleLogin,
    register,
    verifyEmail,
    login,
    verifyToken,
    updateProfile,
    updateAvatar,
    deleteAccount,
    handleForgotPassword,
    handleResetPassword,
    addAddress, 
    getUserAddresses,
    deleteAddress
};