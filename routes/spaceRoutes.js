const express = require('express');
const Space = require('../models/Space'); // Modelo de Space

const router = express.Router();

// Obtener todos los espacios
router.get('/', async (req, res) => {
    try {
        const spaces = await Space.find();
        res.status(200).json(spaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los espacios" });
    }
});

// Crear un espacio
router.post('/', async (req, res) => {
    const { name, location, capacity } = req.body;

    try {
        const existingSpace = await Space.findOne({ name });
        if (existingSpace) {
            return res.status(400).json({ message: `El espacio "${name}" ya existe.` });
        }

        const newSpace = new Space({ name, location, capacity });
        await newSpace.save();

        res.status(201).json({ message: "Espacio creado exitosamente", space: newSpace });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el espacio" });
    }
});

module.exports = router;
