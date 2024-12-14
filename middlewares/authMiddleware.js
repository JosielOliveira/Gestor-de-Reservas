const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id);
        if (!usuario) {
            throw new Error();
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).send('Acceso denegado');
    }
};

module.exports = authMiddleware;