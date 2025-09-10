require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./Connection_db');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware para servir los archivos estáticos de React
// Esta línea es crucial y falta en tu código actual.
// La ruta ha sido corregida para tu estructura de carpetas.
app.use(express.static(path.join(__dirname, '../ComponentLoginBuild')));

app.use(express.json());
app.use(cors());

// Esta es la ruta de tu API para el registro de usuarios
app.post('/api/users', async (req, res) => {
  const { name, email, password, terms_accepted } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO users (name, email, password, terms_accepted) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, hashedPassword, terms_accepted];

    const result = await db.query(insertQuery, values);
    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error('Error al insertar el usuario:', err);

    if (err.code === '23505') {
      return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }

    res.status(500).json({ message: 'Hubo un error en el servidor. Inténtalo de nuevo.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});