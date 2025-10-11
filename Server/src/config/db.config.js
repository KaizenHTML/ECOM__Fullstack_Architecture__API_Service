
const { Pool } = require('pg');
require('dotenv').config(); 

// Obteniendo credenciales
const { 
    DB_HOST: host,
    DB_PORT: port, 
    DB_DATABASE:database,
    DB_USER, 
    // ⬇️ CORRECCIÓN: CAMBIA EL NOMBRE DE LA VARIABLE EN EL CÓDIGO A PG_PASSWORD 
    // Y LUEGO FUERZA EL 'toString()' en la configuración del Pool
    DB_PASSWORD
} = process.env;


// Grupo conexiones
const pool = new Pool({
    host, 
    port, 
    database, 
    user: DB_USER, 
    // ⬇️ CLAVE: Pasamos la variable y forzamos que sea un string con el operador ternario
    password: DB_PASSWORD ? DB_PASSWORD.toString() : '', 
});


// Prueba de conexión
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar a PostgreSQL:', err.stack);
    }
    console.log('Conexión exitosa a PostgreSQL.');
    release();
});

module.exports = pool;