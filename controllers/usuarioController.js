// controllers/usuarioController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        const esPasswordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esPasswordCorrecta) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};