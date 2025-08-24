import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../server'; // Assuming this is your Express app
import User from '../models/user'; // Your User model

jest.mock('../models/user'); // Mock the User model

describe('Auth Controller', () => {

  describe('POST /api/user/signin', () => {
    it('should return 404 if user does not exist', async () => {
      User.findOne.mockResolvedValue(null); // Simulate user not found

      const res = await request(app)
        .post('/api/user/signin')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("User doesn't exist.");
    });

    it('should return 400 if password is incorrect', async () => {
      const mockUser = {
        email: 'jetest@gmail.com',
        password: await bcrypt.hash('test', 12),
      };
      User.findOne.mockResolvedValue(mockUser); // Simulate user found

      const res = await request(app)
        .post('/api/user/signin')
        .send({ email: 'jetest@gmail.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid credentials.");
    });

    it('should return 200 and token if credentials are correct', async () => {
      const mockUser = {
        email: 'jetest@gmail.com',
        password: await bcrypt.hash('test', 12),
        _id: 'userId123',
        role: 'user',
      };
      User.findOne.mockResolvedValue(mockUser); // Simulate user found

      const res = await request(app)
        .post('/api/user/signin')
        .send({ email: 'test@example.com', password: 'correctpassword' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token'); // Check for token
      expect(res.body.result.email).toBe(mockUser.email);
    });
  });
});