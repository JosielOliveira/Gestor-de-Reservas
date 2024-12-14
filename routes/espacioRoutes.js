const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
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
router.post('/', authMiddleware, crearEspacio);
router.put('/:id', authMiddleware, actualizarEspacio);
router.delete('/:id', authMiddleware, eliminarEspacio);

module.exports = router;