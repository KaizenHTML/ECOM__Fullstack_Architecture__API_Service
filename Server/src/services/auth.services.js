const db = require('../config/db.config');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userService = require('./user.services')
const { OAuth2Client } = require('google-auth-library');
const { sendPasswordResetEmail } = require('../utils/email');


// Saving Token in password_resets
const savePasswordResetToken = async (email, token, expiry) => {

  const query = `
    INSERT INTO password_resets (email, token, expires_at, created_at)
    VALUES ($1, $2, $3, NOW())
    ON CONFLICT (email) DO UPDATE
    SET token = $2, expires_at = $3, created_at = NOW();
  `;

  try {
    await db.query(query, [email, token, expiry]);

  } catch (error) {
    console.error("Error al guardar token de recuperación:", error.message);
    throw error;
  }
};



// Creating Temporary Token
const forgotPassword = async (email) => {

  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Creating The Temporary Token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 1800000);

  await savePasswordResetToken(email, resetToken, resetTokenExpiry);

  // Password Change File URL
  const resetUrl = `${process.env.CLIENT_URL}/recover-password?token=${resetToken}`;

  // Mail Sending Parameters
  await sendPasswordResetEmail(user.email, resetUrl);
};


// Getting Recovery Token
const getPasswordResetByToken = async (token) => {

  const query = `
      SELECT email, expires_at FROM password_resets
      WHERE token = $1 AND expires_at > NOW();
  `;

  try {
    const result = await db.query(query, [token]);
    return result.rows[0] || null;

  } catch (error) {
    console.error("Error al obtener token de recuperación:", error.message);
    throw error;
  }
};



// Removing Token After Use
const deletePasswordResetToken = async (email) => {

  const query = `
      DELETE FROM password_resets 
      WHERE email = $1; 
  `;

  try {
    await db.query(query, [email]);

  } catch (error) {
    console.error("Error al eliminar token de recuperación:", error.message);
    throw error;
  }
};



// Updating password
const resetPassword = async (token, newPassword) => {

  const resetRecord = await getPasswordResetByToken(token);

  if (!resetRecord) {
    throw new Error('Token inválido o expirado');
  }



  // Getting User's Current Password
  const currentUser = await userService.getUserByEmail(resetRecord.email);

  // Comparing The New Password With The Current One
  const isSamePassword = await bcrypt.compare(newPassword, currentUser.password_hash);

  if (isSamePassword) {
    throw new Error('La nueva contraseña no puede ser la misma que la actual');
  }


  // Hashing Password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const query = `
    UPDATE users
    SET password_hash = $1
    WHERE email = $2;
  `;

  try {
    await db.query(query, [hashedPassword, resetRecord.email]);

    // Removing Token From The Database
    await deletePasswordResetToken(resetRecord.email);

  } catch (error) {
    console.error("Error al actualizar contraseña:", error.message);
    throw error;
  }
};



// Creating Access Keys
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateAuthToken = (user) => {
    return jwt.sign(
        { 
          id: user.id, 
          email: user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '45m' }
    );
};



// Validating The passport Provided by Google
const googleLogin = async (id_token) => {
    
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
        throw new Error('Token de Google inválido o no verificado.');
    }
    

    const { name, email, picture } = payload;
    
    let user = await userService.getUserByEmail(email);

    if (!user) {
        user = await userService.createUserFromGoogle({
            name, 
            email,
            profile_picture_url: picture 
        });

    } else {
        if (!user.profile_picture_url) {
            await userService.updateProfilePicture(user.id, picture);
            user.profile_picture_url = picture; 
        } 
    }
    
    const token = generateAuthToken(user);
    return { token, user };
};


module.exports = {
  forgotPassword,
  resetPassword,
  googleLogin,
};