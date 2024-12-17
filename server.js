require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json()); // Asegurarse de que express.json() esté configurado

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido al Gestor de Reservas de Espacios Deportivos');
});

// Importa las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const espacioRoutes = require('./routes/espacioRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

// Middleware de rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/espacios', espacioRoutes);
app.use('/api/reservas', reservaRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});