require('dotenv').config(); 

const authRoutes = require('./src/routes/auth.routes')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 4000;


// Middleware logging
app.use(morgan('combined'));


app.use(cors());
app.use(express.json()); 


// Rutas API
app.use('/api/auth', authRoutes);


// Controlando errores
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Algo salió mal en el servidor.', 
        error: err.message 
    });
});

// Encendiendo servidor
app.listen(PORT, () => {
    console.log(`Servidor de Express corriendo en http://localhost:${PORT}`);
});