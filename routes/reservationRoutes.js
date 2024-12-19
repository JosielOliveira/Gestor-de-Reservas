const express = require('express');
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, reservationController.createReservation);
router.get('/', authMiddleware, reservationController.getAllReservations);
router.get('/:id', authMiddleware, reservationController.getReservationById);
router.put('/:id', authMiddleware, reservationController.updateReservation);
router.delete('/:id', authMiddleware, reservationController.deleteReservation);

module.exports = router;