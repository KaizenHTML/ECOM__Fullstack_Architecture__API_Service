const db = require('../../src/config/db.config'); 



// Buscando usuario por Email
const getUserByEmail = async (email) => {

    const query = 'SELECT id, name, email, password FROM users WHERE email = $1;';
    
    try {
        const result = await db.query(query, [email]);
        
        if (result.rows[0]) {
        
            return {
                ...result.rows[0],
                password_hash: result.rows[0].password 
            };
        }
        return null;

    } catch (error) {
        console.error("Error en getUserByEmail:", error.message);

        return null;
    }
};


// Registrando
const registerUser = async (name, email, hashedPassword, acceptedTerms) => {
    
    // Insertando fecha
    const termsAcceptedAt = acceptedTerms ? new Date() : null;
    
    
    const query = `
        INSERT INTO users (name, email, password, acceptterms, terms_accepted_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email;
    `;
    
 
    const result = await db.query(query, [name, email, hashedPassword, acceptedTerms, termsAcceptedAt]);
    
    return result.rows[0]; 
};


// Buscando usuario por ID
const getUserById = async (id) => {

    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1;';
    
    try {
        const result = await db.query(query, [id]);
        return result.rows[0] || null;

    } catch (error) {
        console.error("Error en getUserById:", error.message);

        return null;
    }
};


module.exports = {
    getUserByEmail,
    registerUser,
    getUserById, 
};
