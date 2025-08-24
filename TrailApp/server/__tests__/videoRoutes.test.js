import request from 'supertest';
import express from 'express';
import videoRouter from '../routes/videoRoutes'; // Adjust the path according to your project structure
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Create an instance of the express app
const app = express();
app.use(express.json());
app.use('/api/video', videoRouter); // Use your router

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Video API', () => {
    let videoId;

    it('should create a new video', async () => {
        const response = await request(app)
            .post('/api/video/upload')
            .send({
                title: 'Test Video',
                url: 'http://example.com/video',
                category: 'Climate',
                viewCount: 0,
                likes: 0,
                dislikes: 0,
            });
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Video');
        videoId = response.body._id; // Store the created video ID for future tests
    });

    it('should get all videos', async () => {
        const response = await request(app).get('/api/video/videos');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Assuming at least one video exists
    });

    it('should get a single video', async () => {
        const response = await request(app).get(`/api/video/${videoId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(videoId);
    });

    it('should update a video', async () => {
        const response = await request(app)
            .patch(`/api/video/${videoId}`)
            .send({ title: 'Updated Test Video' });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Test Video');
    });

    it('should increment view count', async () => {
        const response = await request(app)
            .patch(`/api/video/view/${videoId}`);
        expect(response.status).toBe(200);
        expect(response.body.viewCount).toBeGreaterThan(0); // Assuming the view count is incremented
    });

    it('should like a video', async () => {
        const response = await request(app)
            .patch(`/api/video/like/${videoId}`)
            .send({ like: true });
        expect(response.status).toBe(200);
        expect(response.body.likes).toBeGreaterThan(0); // Assuming the likes count is incremented
    });

    it('should dislike a video', async () => {
        const response = await request(app)
            .patch(`/api/video/dislike/${videoId}`)
            .send({ dislike: true });
        expect(response.status).toBe(200);
        expect(response.body.dislikes).toBeGreaterThan(0); // Assuming the dislikes count is incremented
    });

    it('should delete a video', async () => {
        const response = await request(app).delete(`/api/video/${videoId}`);
        expect(response.status).toBe(204); // No content
    });
});
