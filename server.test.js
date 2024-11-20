jest.setTimeout(15000);

import request from 'supertest';
import { createServer } from 'http';
import { app } from './server.js';

let server;

beforeAll(() => {
  server = createServer(app);
});

afterAll(() => {
  server.close();
});

describe('POST /video', () => {
  it('should return a pending status with a videoId', async () => {
    const response = await request(server)
      .post('/video')
      .set('Authorization', 'userId123');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'pending');
    expect(response.body).toHaveProperty('videoId');

    await new Promise(resolve => setTimeout(resolve, 10000));
  });
});
