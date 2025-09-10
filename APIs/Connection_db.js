const { Pool } = require('pg');

// Creando un grupo de conexiones 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Utilizando la cadena de conexión
  ssl: {
    rejectUnauthorized: false
  }
});

// Función para consultas con marcadores de posición
module.exports = {
  query: (text, params) => pool.query(text, params),
};