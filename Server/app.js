// app.js (Sintaxis CommonJS)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// ⬇️ CORRECCIÓN: Usamos require() para las rutas
const authRoutes = require('./src/routes/auth.routes'); 
const db = require('./src/config/db.config'); 


const app = express();
const PORT = process.env.PORT || 4000;

console.log('Usuario de DB configurado:', process.env.DB_USER); 
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Middleware alternativo para manejar JSON

// Rutas
app.use('/api/auth', authRoutes);


// Manejador de errores final de Express (si se llama a next(err))
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Algo salió mal en el servidor!', 
        error: err.message 
    });
});


// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor de Express corriendo en http://localhost:${PORT}`);
});