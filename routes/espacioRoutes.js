const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {
    obtenerEspacios,
    obtenerEspacioPorId,
    crearEspacio,
    actualizarEspacio,
    eliminarEspacio
} = require('../controllers/espacioController');

// Rutas protegidas
router.get('/', authMiddleware, obtenerEspacios);
router.get('/:id', authMiddleware, obtenerEspacioPorId);
router.post('/', authMiddleware, adminMiddleware, crearEspacio);
router.put('/:id', authMiddleware, adminMiddleware, actualizarEspacio);
router.delete('/:id', authMiddleware, adminMiddleware, eliminarEspacio);

module.exports = router;