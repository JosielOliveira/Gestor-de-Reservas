const express = require('express'); // Importa la librería express
const reservationController = require('../controllers/reservationController'); // Llama al controller de reservas
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de tener el middleware importado

const router = express.Router(); // Crea una nueva instancia de Router

// Rutas de reservas con autenticación

router.post('/', authMiddleware, reservationController.createReservation); // Crear una reserva (requiere autenticación)
router.get('/', authMiddleware, reservationController.getAllReservations); // Obtener todas las reservas (requiere autenticación)
router.get('/:id', authMiddleware, reservationController.getReservationById); // Obtener una reserva por ID (requiere autenticación)
router.put('/:id', authMiddleware, reservationController.updateReservation); // Actualizar una reserva (requiere autenticación)
router.delete('/:id', authMiddleware, reservationController.deleteReservation); // Eliminar una reserva (requiere autenticación)

module.exports = router; // Exporta el router para usarlo en otras partes de la aplicación
