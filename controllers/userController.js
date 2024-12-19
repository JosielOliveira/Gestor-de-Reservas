const User = require('../models/Space');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
} catch (error) {
    res.status(400).send(error);
}
};

// Iniciar sesión de usuario
exports.loginUser = async (req, res) => {
try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
    return res.status(400).send('Usuario no encontrado');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(400).send('Contraseña incorrecta');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
} catch (error) {
    res.status(400).send(error);
}
};

// Obtener perfil de usuario
exports.getUserProfile = async (req, res) => {
try {
    const user = await User.findById(req.user._id);
    if (!user) {
    return res.status(404).send('Usuario no encontrado');
    }
    res.send(user);
} catch (error) {
    res.status(400).send(error);
}
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
    return res.status(400).send('Actualización no permitida');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
    return res.status(404).send('Usuario no encontrado');
    }

    updates.forEach(update => user[update] = req.body[update]);
    if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
    }
    await user.save();
    res.send(user);
} catch (error) {
    res.status(400).send(error);
}
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
    return res.status(404).send('Usuario no encontrado');
    }
    res.send(user);
} catch (error) {
    res.status(400).send(error);
}
};