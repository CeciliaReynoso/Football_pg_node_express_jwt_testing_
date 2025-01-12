const request = require('supertest');
const app = require('../index'); // Asegúrate de exportar tu app en index.js

describe('API Tests', () => {
    let token;

    it('GET /equipos should return an array and status code 200', async () => {
        const response = await request(app).get('/equipos');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /login with correct credentials should return an object', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'admin', password: '1234' });
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        token = response.body.token; // Save the token for later use
    });

    it('POST /login with incorrect credentials should return status code 401', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'admin', password: 'wrongpassword' });
        expect(response.status).toBe(401);
    });

    it('POST /equipos/:teamID/jugadores with valid token should return status code 201', async () => {
        const response = await request(app)
            .post('/equipos/1/jugadores')
            .set('Authorization', `Bearer ${token}`) // Use the token generated from login
            .send({ name: 'New Player', position: 1 });
        expect(response.status).toBe(201);
    });
});