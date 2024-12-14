// models/Espacio.js
const mongoose = require('mongoose');

const EspacioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    capacidad: { type: Number, required: true },
    disponible: { type: Boolean, default: true }
});

const Espacio = mongoose.model('Espacio', EspacioSchema);
module.exports = Espacio;