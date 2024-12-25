const Usuario = require('../models/Usuario');

const adminMiddleware = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.user.id);
        if (usuario.rol !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = adminMiddleware;