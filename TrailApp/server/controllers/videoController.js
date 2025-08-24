import Videos from '../models/videoModel.js';
import mongoose from 'mongoose';

// GET all videos
export const getAllVideos = async (req, res) => {
    try {
        const videos = await Videos.find({}).sort({ createdAt: -1 });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// GET a single video
export const getVideo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such video.' });
    }

    try {
        const video = await Videos.findById(id);
        if (!video) {
            return res.status(404).json({ error: 'No such video.' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// GET videos by category
export const getVideoByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const videos = await Videos.find({ category });
        if (!videos || videos.length === 0) {
            return res.status(404).json({ error: 'No videos found in this category.' });
        }
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// CREATE a new video
export const createVideo = async (req, res) => {
    const { title, url, category, subCategory, totLikes, totDislikes } = req.body;

    try {
        const video = await Videos.create({ title, url, category, subCategory, totLikes, totDislikes });
        res.status(201).json(video);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a video
export const deleteVideo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such video.' });
    }

    try {
        const video = await Videos.findByIdAndDelete(id);
        if (!video) {
            return res.status(404).json({ error: 'No such video.' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// UPDATE a video
export const updateVideo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such video.' });
    }

    try {
        const video = await Videos.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!video) {
            return res.status(404).json({ error: 'No such video.' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// LIKE a video
export const likeVideo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such video.' });
    }

    try {
        const video = await Videos.findByIdAndUpdate(id, { $inc: { totLikes: 1 } }, { new: true });
        if (!video) {
            return res.status(404).json({ error: 'No such video.' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// DISLIKE a video
export const dislikeVideo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such video.' });
    }

    try {
        const video = await Videos.findByIdAndUpdate(id, { $inc: { totDislikes: 1 } }, { new: true });
        if (!video) {
            return res.status(404).json({ error: 'No such video.' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// INCREMENT VIEW COUNT
export const incrementViewCount = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such video.' });
    }

    try {
        const video = await Videos.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        if (!video) {
            return res.status(404).json({ error: 'No such video.' });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// GET video views by URL
export const getVideoViewsByUrl = async (req, res) => {
    const { url } = req.params;

    try {
        const video = await Videos.findOne({ url }).select('views');
        if (!video) {
            return res.status(404).json({ error: 'No such video.' });
        }
        res.status(200).json({ views: video.views });
    } catch (error) {
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

