import Benches from '../models/benchModel.js';
import mongoose from 'mongoose';

//GET all benches
export const getAllBenches = async(req, res) => {
    try {
        const benches = await Benches.find({}).sort({createdAt: -1});
        res.status(200).json(benches);
    } catch(error) {
        res.status(500).json({error: "Server error occured"});
    }
}

// POST create new bench
export const createBench = async (req, res) => {
    try {
        const newBench = new Benches(req.body);
        await newBench.save();
        res.status(201).json(newBench);
    } catch (error) {
        res.status(400).json({ error: "Failed to create bench" });
    }
};

// PATCH update a bench
export const updateBench = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await Benches.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: "Failed to update bench" });
    }
};

// DELETE bench
export const deleteBench = async (req, res) => {
    const { id } = req.params;
    try {
        await Benches.findByIdAndDelete(id);
        res.status(200).json({ message: "Bench deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete bench" });
    }
};

// PATCH add video
export const addVideoToBench = async (req, res) => {
    const { id } = req.params;
    const { title, url } = req.body;
    try {
        const bench = await Benches.findById(id);
        bench.videos.push({ title, url });
        await bench.save();
        res.status(200).json(bench);
    } catch (error) {
        res.status(500).json({ error: "Failed to add video" });
    }
};

// PATCH remove video
export const deleteVideoFromBench = async (req, res) => {
    const { id, videoId } = req.params;
    try {
        const bench = await Benches.findById(id);
        bench.videos = bench.videos.filter(video => video._id.toString() !== videoId);
        await bench.save();
        res.status(200).json(bench);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete video" });
    }
};
