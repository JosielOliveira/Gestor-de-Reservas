const Usuario = require('../models/usuarioModel'); // Importar el modelo de usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validar entrada
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });

        // Guardar usuario en la base de datos
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;

        // Crear objeto con los campos a actualizar
        const camposActualizados = { nombre, email };
        if (password) {
            camposActualizados.password = await bcrypt.hash(password, 10);
        }

        // Actualizar usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, camposActualizados, { new: true });
        res.status(200).json({ message: 'Usuario actualizado', usuario: usuarioActualizado });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        // Eliminar usuario
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};

// Iniciar sesión de usuario
exports.iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar entrada
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Comparar contraseña
        const esPasswordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esPasswordCorrecta) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Responder con éxito
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario, token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Exportar las funciones del controlador
module.exports = exports;
