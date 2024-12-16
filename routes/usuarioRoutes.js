// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuarioController');

// Ruta para registrar un nuevo usuario
router.post('/register', registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

// Rutas protegidas
router.get('/', authMiddleware, obtenerUsuarios);
router.get('/:id', authMiddleware, obtenerUsuarioPorId);
router.put('/:id', authMiddleware, actualizarUsuario);
router.delete('/:id', authMiddleware, eliminarUsuario);

module.exports = router;