const db = require('../config/db.config');
const bcrypt = require('bcrypt');


// Verifying User Token
const verifyUserToken = async (email, token) => {

    const query = `
        SELECT verification_token, verified 
        FROM users WHERE email = $1;
    `;

    try {
        const result = await db.query(query, [email]);

        if (!result.rows[0]) return false;

        const isValid = await bcrypt.compare(token, result.rows[0].verification_token);

        if (!isValid) 
            return false;

    } catch (error) {
        console.error('Error al verificar al usuario por su token', error);
        throw error;
    }

    
    try {
        // Updating User
        const updateQuery = `
          UPDATE users SET verified = true, verification_token = NULL 
          WHERE email = $1 
          RETURNING *
        `;

        await db.query(updateQuery, [email]);
        return true;

    } catch (error) {
        console.error('Error al actualizar al usuario', error);
        throw error;
    }
};



// Getting User by ID 
const getUserById = async (id) => {

    const query = `
      SELECT id, name, email, created_at, profile_picture_url 
      FROM users WHERE id = $1;
    `;

    try {
        const result = await db.query(query, [id]);

        return result.rows[0] || null;

    } catch (error) {
        console.error("Error al obtener el usuario por su ID:", error.message);
        throw error;
    }
};



// Getting User by Email 
const getUserByEmail = async (email) => {

    const query = `
      SELECT id, name, email, password_hash, verified, created_at, profile_picture_url 
      FROM users WHERE email = $1
    `;

    try {
        const result = await db.query(query, [email]);

        if (result.rows[0]) {
            return {
                ...result.rows[0],
                password_hash: result.rows[0].password_hash
            };
        }

        return null;

    } catch (error) {
        console.error("Error al obtener el usuario por su correo:", error.message);
        throw error;
    }
};



// Registering User With Google
const createUserFromGoogle = async ({ name, email, profile_picture_url }) => {

    // Get Email Name It Doesn't Exist
    const finalName = name || (email && email.split('@')[0]) || 'Usuario de Google'; 

    // Creating Password and Hashing It
    const dummyPassword = 'SOCIAL_LOGIN_PASSWORD_' + Date.now();
    const hashedPassword = await bcrypt.hash(dummyPassword, 10); 
    

    const query = `
      INSERT INTO users (
        name, 
        email, 
        password_hash, 
        acceptterms, 
        terms_accepted_at,
        created_at,
        verified, 
        profile_picture_url
      ) 
      VALUES ($1, $2, $3, $4, NOW(), NOW(), TRUE, $5) 
      RETURNING id, name, email, created_at, verified, profile_picture_url
    `;

    try {

        const result = await db.query(query, [
            finalName,            
            email,                 
            hashedPassword,
            true,       
            profile_picture_url    
        ]);

        return result.rows[0];

    } catch (error) {
        console.error('Error al registrar el nuevo usuario desde Google:' , error.message);
        throw error;
    }
};



// Registering User
const registerUser = async (name, email, password_hash, acceptedTerms, verified = false, verification_token = null) => {

    // Inserting Date
    const termsAcceptedAt = acceptedTerms ? new Date() : null;

    const query = `
        INSERT INTO users (name, email, password_hash, acceptterms, terms_accepted_at, verified, verification_token)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, name, email, created_at;
    `;

    try {
        const result = await db.query(query, [
            name,
            email,
            password_hash,
            acceptedTerms,
            termsAcceptedAt,
            verified,
            verification_token
        ]);

        return result.rows[0];

    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        throw error;
    }
};



// Updating User
const updateUser = async (id, name, email) => {

    const query = `
      UPDATE users 
      SET name = $1, email = $2 
      WHERE id = $3 
      RETURNING id, name, email, created_at;
    `;

    try {
        const result = await db.query(query, [name, email, id]);
        return result.rows[0];

    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        throw error;
    }
};



const updateVerificationToken = async (email, verificationToken ) => {

    try {
       
        const query = 'UPDATE users SET verification_token = $1 WHERE email = $2 RETURNING *'; 
        
        const result = await db.query(query, [
            verificationToken, 
            email
        ]);
        
        return result.rows[0];


    } catch (error) {
        console.error("DETALLE DEL ERROR EN DB:", error.message); 
        throw error; 
    }
};



// Updating Photo Profile
const updateProfilePicture = async (userId, profilePictureUrl) => {

    const query = `
        UPDATE users 
        SET profile_picture_url = $1
        WHERE id = $2
        RETURNING id, name, email, verified, created_at, profile_picture_url;
    `;

    const values = [profilePictureUrl, userId];

    try {
        const result = await db.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0]
        }

        return null;


    } catch (error) {
        console.error('Error al actualizar la foto de perfil', error);
        throw error; 
    }
};



// Deleting User
const deleteUserById = async (id) => {

    const query = `
      DELETE FROM users 
      WHERE id = $1;
    `;
    await db.query(query, [id]);
};



// Adding Address
const addAddress = async (userId, addressData) => {

    const { complexName, tower, apartment } = addressData;
    
    const query = `
      INSERT INTO addresses (user_id, complex_name, tower, apartment)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    try {

      const result = await db.query(query, [
        userId, 
        complexName, 
        tower, 
        apartment
      ]);

      return result.rows[0];

    } catch (error) {
      throw error;
    }
};



// Getting Directions
const getUserAddresses = async (userId) => {

    const query = `
      SELECT id, complex_name, tower, apartment
      FROM addresses 
      WHERE user_id = $1 
      ORDER BY created_at DESC;
    `;

    const values = [userId];

    const result = await db.query(query, values);
    return result.rows; 
};



// Delete Address
const deleteAddress = async (userId, addressId) => {

    const query = `
      DELETE FROM addresses
      WHERE id = $1
      AND user_id = $2
    `;

    await db.query(query, [addressId, userId]);
}



module.exports = {
    verifyUserToken,
    getUserById,
    getUserByEmail,
    createUserFromGoogle,
    registerUser,
    updateUser,
    updateVerificationToken,
    updateProfilePicture,
    deleteUserById,
    addAddress,
    getUserAddresses, 
    deleteAddress
};
