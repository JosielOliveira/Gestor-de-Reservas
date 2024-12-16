require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');

const app = express();
const port = config.port;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido al Gestor de Reservas de Espacios Deportivos');
});

// Importa las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const espacioRoutes = require('./routes/espacioRoutes');

// Middleware de rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/espacios', espacioRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});