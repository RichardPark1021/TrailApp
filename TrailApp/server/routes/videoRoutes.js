// Import dependencies
import express from 'express';

// Import controllers for API calls
import {
    createVideo,
    getAllVideos,
    getVideo,
    deleteVideo,
    updateVideo,
    likeVideo,
    dislikeVideo,
    incrementViewCount,
    getVideoViewsByUrl
} from '../controllers/videoController.js';

const router = express.Router();

// GET all videos
router.get('/videos', getAllVideos);

// GET a single video by ID
router.get('/videos/:id', getVideo);

// GET video views by URL
router.get('/videos/views/:url', getVideoViewsByUrl);

// POST a new video || ADMIN ONLY
router.post('/videos/upload', createVideo); // Requires admin middleware

// DELETE a video by ID || ADMIN ONLY
router.delete('/videos/:id', deleteVideo); // Requires admin middleware

// UPDATE a video by ID || ADMIN ONLY
router.patch('/videos/:id', updateVideo); // Requires admin middleware

// LIKE a video
router.patch('/videos/like/:id', likeVideo);

// DISLIKE a video
router.patch('/videos/dislike/:id', dislikeVideo);

// INCREMENT view count for a video
router.patch('/videos/view/:id', incrementViewCount);

export default router;
