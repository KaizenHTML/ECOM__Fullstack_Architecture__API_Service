const db = require('./Connection_db');

async function testConnetion() {
    try {

        const res = await db.query('SELECT NOW()');
        console.log("Conexión a la base de datos exitosa.");
        console.log("Hora del servidor:", res.rows[0].now);
    } catch (err) {
        console.error("Error al conectar la base de datos: ", err)
    }
}

testConnetion();