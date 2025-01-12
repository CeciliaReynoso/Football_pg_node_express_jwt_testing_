const express = require('express');
const app = express();

const { verificarCredencialesMiddleware, validarTokenMiddleware, reportarConsultasMiddleware, manejarErroresMiddleware } = require('./middlewares/middlewares');

app.listen(3000, console.log("SERVER ON"));
app.use(express.json());
app.use(reportarConsultasMiddleware); // Middleware para reportar consultas

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores');
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos');
const { login } = require('./controllers/auth');
const authMiddleware = require('./middlewares/authMiddlewares');

app.post('/login', verificarCredencialesMiddleware, login);

app.get("/equipos", obtenerEquipos);
app.post("/equipos", validarTokenMiddleware, agregarEquipo);

app.get("/equipos/:teamID/jugadores", obtenerJugadores);
app.post("/equipos/:teamID/jugadores", validarTokenMiddleware, registrarJugador);

app.use(manejarErroresMiddleware); // Middleware para manejar errores

module.exports = app;