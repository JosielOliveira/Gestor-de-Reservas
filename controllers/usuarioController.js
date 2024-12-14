const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};