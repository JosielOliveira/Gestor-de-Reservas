const Reservation = require('../models/Reservation');
const Space = require('../models/Space');

// Validar disponibilidad de espacio
const validateAvailability = async (spaceId, startDate, endDate) => {
    const reservations = await Reservation.find({
        space: spaceId,
        $or: [
            { startDate: { $lt: endDate, $gte: startDate } },
            { endDate: { $gt: startDate, $lte: endDate } }
        ]
    });
    return reservations.length === 0;
};

// Crear una nueva reserva
exports.createReservation = async (req, res) => {
    try {
        const { space, startDate, endDate } = req.body;
        const available = await validateAvailability(space, startDate, endDate);
        if (!available) {
            return res.status(400).json({ message: 'The space is not available for the selected dates' });
        }
        const newReservation = new Reservation({ user: req.user.id, space, startDate, endDate });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('user').populate('space');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('user').populate('space');
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        if (reservation.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this reservation' });
        }
        const { space, startDate, endDate } = req.body;
        const available = await validateAvailability(space, startDate, endDate);
        if (!available) {
            return res.status(400).json({ message: 'The space is not available for the selected dates' });
        }
        reservation.space = space;
        reservation.startDate = startDate;
        reservation.endDate = endDate;
        await reservation.save();
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        if (reservation.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this reservation' });
        }
        await reservation.remove();
        res.status(200).json({ message: 'Reservation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};