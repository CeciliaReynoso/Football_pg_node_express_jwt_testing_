const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('Token no proporcionado');
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error); // Log the error for debugging
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;