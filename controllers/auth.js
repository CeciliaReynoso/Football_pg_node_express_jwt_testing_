const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils');

const login = (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        const token = jwt.sign({ username }, secretKey, { algorithm: 'HS256', expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};

module.exports = { login };