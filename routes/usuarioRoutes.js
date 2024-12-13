// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  // Lógica para iniciar sesión
});

module.exports = router;