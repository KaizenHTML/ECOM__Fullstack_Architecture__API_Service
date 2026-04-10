require('dotenv').config(); 
const {Pool} = require('pg');


// Get Credentials From The Database
const config = {
    db: {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT || 5432,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    },
};


// Connection Pool
const pool = new Pool ({
    ...config.db,

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});


// Using connections
pool.connect()
    .then(client => {
        console.log('Conexión exitosa a PostgreSQL.');
        client.release();
    }) 
    .catch(err => {
        console.error('Error crítico al conectar a PostgreSQL:', err.message);
    });


module.exports = pool;