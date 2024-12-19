const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuario
const spaceRoutes = require('./routes/spaceRoutes'); // Importar rutas de espacio
const reservationRoutes = require('./routes/reservationRoutes'); // Importar rutas de reserva

// Configurar dotenv para cargar las variables de entorno
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

// Usar las rutas
app.use('/api/users', userRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/reservations', reservationRoutes);

app.listen(process.env.PORT, () => {
console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});