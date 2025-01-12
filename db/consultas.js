const { Pool } = require('pg')

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'Audint22',
    database: 'futscript',
    allowExitOnIdle: true
})

const getTeams = async () => {
    const { rows } = await pool.query('SELECT id, name FROM equipos');
    return rows;
}

const getPlayers = async (teamID) => {
    const { rows } = await pool.query(`
        SELECT jugadores.name, posiciones.name as posicion
        FROM jugadores
        INNER JOIN posiciones ON jugadores.position = posiciones.id
        WHERE jugadores.id_equipo = $1
    `, [teamID]);
    return rows;
}

const addTeam = async (equipo) => {
    const { name } = equipo;
    const result = await pool.query('INSERT INTO equipos (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
}

const addPlayer = async ({ jugador, teamID }) => {
    const { name, position } = jugador;
    const result = await pool.query('INSERT INTO jugadores (id_equipo, name, position) VALUES ($1, $2, $3) RETURNING *', [teamID, name, position]);
    return result.rows[0];
}

module.exports = { getTeams, addTeam, getPlayers, addPlayer }