const { sendPasswordResetEmail } = require('../utils/email');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const db = require('../config/db.config');


// Guardando token en password_resets
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


// Obteniendo token de recuperación
const getPasswordResetByToken = async (token) => {

  const query = `
    SELECT email, expires_at FROM password_resets
    WHERE token = $1 AND expires_at > NOW();`;
  
  try {
    const result = await db.query(query, [token]);
    return result.rows[0] || null;

  } catch (error) {
    console.error("Error al obtener token de recuperación:", error.message);
    throw error;
  }
};


// Eliminando token después de usarlo
const deletePasswordResetToken = async (email) => {

  const query = 'DELETE FROM password_resets WHERE email = $1;';
  
  try {
    await db.query(query, [email]);

  } catch (error) {
    console.error("Error al eliminar token de recuperación:", error.message);
    throw error;
  }
};


// Creando token temporal - Enviando correo
const forgotPassword = async (email) => {

  const { getUserByEmail } = require('./user.services'); 

  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Creando token temporal
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 3600000); 

  // Guardando en la bd
  await savePasswordResetToken(email, resetToken, resetTokenExpiry);


  const resetUrl =`${process.env.CLIENT_URL}/recover-password?token=${resetToken}`;

  // Parametros de envío de correo
  await sendPasswordResetEmail(user.email, resetUrl);

};


// Actualiza contraseña - Elimina token temporal
const resetPassword = async (token, newPassword) => {

  const resetRecord = await getPasswordResetByToken(token);

  if (!resetRecord) {
    throw new Error('Token inválido o expirado');
  }

  // Hasheando contraseña  
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  const query = `
    UPDATE users
    SET password_hash = $1
    WHERE email = $2;
  `;

  try {

    // Guardando contraseña en la bd
    await db.query(query, [hashedPassword, resetRecord.email]);
    
    // Eliminando token de la bd
    await deletePasswordResetToken(resetRecord.email);

  } catch (error) {
    console.error("Error al actualizar contraseña:", error.message);
    throw error;
  }
};


module.exports = {
    forgotPassword,
    resetPassword,
};