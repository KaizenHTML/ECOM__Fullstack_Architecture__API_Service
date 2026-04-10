require('dotenv').config();
const setDbUserContext = require('./src/middleware/dbUserContext')

const authRoutes = require('./src/routes/auth.routes')
const express = require('express');
const cors = require('cors');
const app = express();


const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(setDbUserContext);


// API Routes
app.use('/api/auth', authRoutes);

app.use((_req, res) => {
    res.status(404).json({
        message:'Ruta no encontrada'
    });
});


// Controlling Errors
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Algo salió mal en el servidor.',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});


// Turning on Server
app.listen(PORT, () => {
    console.log(`Server of Express running on http://localhost:${PORT}`);
});
