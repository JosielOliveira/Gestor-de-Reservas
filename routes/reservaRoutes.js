const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    crearReserva,
    obtenerReservas,
    obtenerReservaPorId,
    actualizarReserva,
    eliminarReserva
} = require('../controllers/reservaController');

// Rutas protegidas
router.post('/', authMiddleware, crearReserva);
router.get('/', authMiddleware, obtenerReservas);
router.get('/:id', authMiddleware, obtenerReservaPorId);
router.put('/:id', authMiddleware, actualizarReserva);
router.delete('/:id', authMiddleware, eliminarReserva);

module.exports = router;