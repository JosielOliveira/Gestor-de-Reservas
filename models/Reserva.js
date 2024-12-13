// models/Reserva.js
const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  espacio: { type: mongoose.Schema.Types.ObjectId, ref: 'Espacio', required: true },
  fecha: { type: Date, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true }
});

const Reserva = mongoose.model('Reserva', ReservaSchema);
module.exports = Reserva;