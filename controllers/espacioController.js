const Espacio = require('../models/Espacio');

// Obtener todos los espacios
const obtenerEspacios = async (req, res) => {
    try {
        const espacios = await Espacio.find();
        res.send(espacios);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtener un espacio por ID
const obtenerEspacioPorId = async (req, res) => {
    try {
        const espacio = await Espacio.findById(req.params.id);
        if (!espacio) {
            return res.status(404).send('Espacio no encontrado');
        }
        res.send(espacio);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Crear un nuevo espacio
const crearEspacio = async (req, res) => {
    try {
        const espacio = new Espacio(req.body);
        await espacio.save();
        res.status(201).send(espacio);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Actualizar un espacio
const actualizarEspacio = async (req, res) => {
    try {
        const espacio = await Espacio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!espacio) {
            return res.status(404).send('Espacio no encontrado');
        }
        res.send(espacio);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Eliminar un espacio
const eliminarEspacio = async (req, res) => {
    try {
        const espacio = await Espacio.findByIdAndDelete(req.params.id);
        if (!espacio) {
            return res.status(404).send('Espacio no encontrado');
        }
        res.send(espacio);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    obtenerEspacios,
    obtenerEspacioPorId,
    crearEspacio,
    actualizarEspacio,
    eliminarEspacio
};