const { Pool } = require('pg');
require('dotenv').config(); 


// Obteniendo credenciales
const { 
    PG_HOST: host,
    PG_PORT: port, 
    PG_DATABASE: database,
    PG_USER: user,
    PG_PASSWORD: password

} = process.env;


// Grupo conexiones
const pool = new Pool({
    host, 
    port, 
    database, 
    user, 
    password: password || '', 
});


// Conectando
pool.connect((err, _client, release) => {

    if (err) {
        return console.error('Error al conectar a PostgreSQL:', err.stack);
    }
    console.log('Conexión exitosa a PostgreSQL.');
    release();
});

module.exports = pool;