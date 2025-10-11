// src/services/auth.services.js (Sintaxis CommonJS)
const db = require('../../src/config/db.config'); 

// ------------------------------------
// Buscar Usuario por Email (Para Login)
// ------------------------------------
const getUserByEmail = async (email) => {
    // La consulta es correcta, selecciona las columnas necesarias
    const query = 'SELECT id, name, email, password FROM users WHERE email = $1;';
    
    const result = await db.query(query, [email]);
    
    if (result.rows[0]) {
        // Truco de mapeo para que bcrypt.compare funcione en el controlador
        return {
            ...result.rows[0],
            // Mapeamos 'password' (columna de la DB) a 'password_hash' 
            password_hash: result.rows[0].password 
        };
    }
    return null;
};

// ------------------------------------
// Registrar Nuevo Usuario
// ------------------------------------
// ⬇️ CORRECCIÓN: Aceptamos 'hashedPassword' y 'acceptedTerms'
const registerUser = async (name, email, hashedPassword, acceptedTerms) => {
    
    // Lógica para determinar el TIMESTAMP: si aceptó, usa la hora actual, si no, es NULL.
    const termsAcceptedAt = acceptedTerms ? 'CURRENT_TIMESTAMP' : 'NULL';
    
    const query = `
        INSERT INTO users (name, email, password, acceptterms, terms_accepted_at)
        -- ⬇️ Columna 3 es la contraseña hasheada, Columna 4 es el booleano de aceptación
        VALUES ($1, $2, $3, $4, ${termsAcceptedAt})
        RETURNING id, name, email;
    `;
    
    // ⬇️ Los valores son: name, email, hashedPassword, y el booleano acceptedTerms
    const result = await db.query(query, [name, email, hashedPassword, acceptedTerms]);
    
    return result.rows[0]; 
};

module.exports = {
    getUserByEmail,
    registerUser,
};