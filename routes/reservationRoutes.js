const express = require('express');
const Reservation = require('../models/Reservation'); // Modelo de Reserva

const router = express.Router();

// Crear una reserva
router.post('/', async (req, res) => {
    const { user, space, date } = req.body;

    try {
        const newReservation = new Reservation({ user, space, date });
        await newReservation.save();

        res.status(201).json({ message: "Reserva creada exitosamente", reservation: newReservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la reserva" });
    }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las reservas" });
    }
});

module.exports = router;
