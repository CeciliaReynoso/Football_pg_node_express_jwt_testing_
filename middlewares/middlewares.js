const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils');

const verificarCredencialesMiddleware = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Credenciales incompletas");
  }
  next();
};

const validarTokenMiddleware = (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (!Authorization) {
    return res.status(401).send("Token no proporcionado");
  }
  const token = Authorization.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    req.username = decoded.username; // Asignar el username a req.username
    next();
  } catch (error) {
    res.status(401).send("Token inválido");
  }
};

const reportarConsultasMiddleware = (req, res, next) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString();
  const url = req.url;
  let username = 'Desconocido';

  // Extraer el username del token JWT si está presente
  const Authorization = req.header("Authorization");
  if (Authorization) {
    const token = Authorization.split("Bearer ")[1];
    try {
      const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
      username = decoded.username;
    } catch (error) {
      console.log("Error al decodificar el token:", error.message);
    }
  }

  res.on('finish', () => {
    const statusCode = res.statusCode;
    console.log(`
      ${formattedDate} - ${formattedTime} - ${req.method} ${req.url} - ${statusCode} - Usuario: ${username}
    `);
  });

  res.on('error', (err) => {
    console.log(`
      ${formattedDate} - ${formattedTime} - ${req.method} ${req.url} - Error: ${err.message} - Usuario: ${username}
    `);
  });

  next();
};

const manejarErroresMiddleware = (err, req, res, next) => {
  console.error(`
    ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - ${req.method} ${req.url} - Error: ${err.message} - Usuario: ${req.username || 'Desconocido'}
  `);
  res.status(500).send('Algo salió mal!');
};

module.exports = { verificarCredencialesMiddleware, validarTokenMiddleware, reportarConsultasMiddleware, manejarErroresMiddleware };