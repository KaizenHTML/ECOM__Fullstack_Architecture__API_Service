require('dotenv').config(); 

const db = require('./src/config/db.config'); 
const cors = require('cors');
const express = require('express');



// Importando Rutas
const authRoutes = require('./src/routes/auth.routes'); 


const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(cors());
app.use(express.json()); 


// Rutas
app.use('/api/auth', authRoutes);


// Controlando Errores
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Algo salió mal en el servidor.', 
        error: err.message 
    });
});


// Encendiendo Servidor
app.listen(PORT, () => {
    console.log(`Servidor de Express corriendo en http://localhost:${PORT}.`);
});