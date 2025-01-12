const { getTeams, addTeam } = require('../db/consultas');

const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await getTeams();
        res.json(equipos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener equipos' });
    }
}

const agregarEquipo = async (req, res) => {
    try {
        const equipo = req.body;
        const nuevoEquipo = await addTeam(equipo);
        res.status(201).json(nuevoEquipo);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar equipo' });
    }
}

module.exports = { obtenerEquipos, agregarEquipo }