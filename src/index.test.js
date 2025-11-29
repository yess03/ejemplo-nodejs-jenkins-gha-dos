const request = require('supertest');
const { app, server } = require('./index');

describe('API Tests', () => {
  afterAll((done) => {
    server.close(done);
  });

  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Jenkins');
  });

  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('GET /api/hello should return greeting', async () => {
    const response = await request(app).get('/api/hello?name=Test');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Test');
  });

  test('GET /info should return system info', async () => {
    const response = await request(app).get('/info');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nodeVersion');
  });
});
