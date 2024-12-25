const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const spaceRoutes = require('./routes/spaceRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes'); // Si tienes rutas para reservas

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Usar las rutas desde sus archivos respectivos
app.use('/api/spaces', spaceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes); // Ajustar si tienes reservas

// Escuchar en el puerto definido en .env
app.listen(process.env.PORT, () => {
  console.log(`Servidor arriba 💪 puerto ${process.env.PORT}`);
});
