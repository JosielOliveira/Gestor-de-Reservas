const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    espacio: { type: mongoose.Schema.Types.ObjectId, ref: 'Espacio', required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true }
});

const Reserva = mongoose.model('Reserva', ReservaSchema);
module.exports = Reserva;