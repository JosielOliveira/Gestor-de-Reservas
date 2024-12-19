const Reserva = require('../models/Reservation');
const Espacio = require('../models/Space');

// Validar disponibilidad de espacio
const validarDisponibilidad = async (espacioId, fechaInicio, fechaFin) => {
    const reservas = await Reserva.find({
        espacio: espacioId,
        $or: [
            { fechaInicio: { $lt: fechaFin, $gte: fechaInicio } },
            { fechaFin: { $gt: fechaInicio, $lte: fechaFin } }
        ]
    });
    return reservas.length === 0;
};

// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
    try {
        const { espacio, fechaInicio, fechaFin } = req.body;
        const disponible = await validarDisponibilidad(espacio, fechaInicio, fechaFin);
        if (!disponible) {
            return res.status(400).json({ message: 'El espacio no está disponible en las fechas seleccionadas' });
        }
        const nuevaReserva = new Reserva({ usuario: req.user.id, espacio, fechaInicio, fechaFin });
        await nuevaReserva.save();
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('usuario').populate('espacio');
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una reserva por ID
exports.obtenerReservaPorId = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id).populate('usuario').populate('espacio');
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una reserva
exports.actualizarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        if (reserva.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar esta reserva' });
        }
        const { espacio, fechaInicio, fechaFin } = req.body;
        const disponible = await validarDisponibilidad(espacio, fechaInicio, fechaFin);
        if (!disponible) {
            return res.status(400).json({ message: 'El espacio no está disponible en las fechas seleccionadas' });
        }
        reserva.espacio = espacio;
        reserva.fechaInicio = fechaInicio;
        reserva.fechaFin = fechaFin;
        await reserva.save();
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        if (reserva.usuario.toString() !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta reserva' });
        }
        await reserva.remove();
        res.status(200).json({ message: 'Reserva eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};