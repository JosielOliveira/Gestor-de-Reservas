const mongoose = require('mongoose');

// Esquema de Space
const spaceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Nombre único
    location: String,
    capacity: Number
});

// Crear el modelo Space
const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
