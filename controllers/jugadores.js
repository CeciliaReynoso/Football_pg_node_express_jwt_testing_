const { getPlayers, addPlayer } = require('../db/consultas');

const obtenerJugadores = async (req, res) => {
    try {
        const { teamID } = req.params;
        const jugadores = await getPlayers(teamID);
        res.json(jugadores);
    } catch (error) {
        console.error('Error al obtener jugadores:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error al obtener jugadores' });
    }
}

const registrarJugador = async (req, res) => {
    try {
        const { teamID } = req.params;
        const jugador = req.body;
        console.log('Datos del jugador:', jugador); // Log the player data for debugging
        const nuevoJugador = await addPlayer({ jugador, teamID });
        res.status(201).json(nuevoJugador);
    } catch (error) {
        console.error('Error al registrar jugador:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error al registrar jugador' });
    }
}

module.exports = { obtenerJugadores, registrarJugador }