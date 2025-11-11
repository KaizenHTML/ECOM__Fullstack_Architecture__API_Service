const db = require('../config/db.config'); 


// Buscando usuario por Email - Login/Registro
const getUserByEmail = async (email) => {

    const query = 'SELECT id, name, email, password_hash, verified, created_at FROM users WHERE email = $1;';
    
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



// Buscando usuario por ID - Protegiendo rutas con autenticación 
const getUserById = async (id) => {

    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1;';
    
    try {
        const result = await db.query(query, [id]);
        return result.rows[0] || null;

    } catch (error) {
        console.error("Error al obtener el usuario por su ID:", error.message);
        throw error;
    }
};



// Registrando usuario
const registerUser = async (name, email, password_hash, acceptedTerms, verified = false, verification_token = null) => {
    
    // Insertando fecha
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


module.exports = {

    getUserByEmail,
    registerUser,
    getUserById, 
};
