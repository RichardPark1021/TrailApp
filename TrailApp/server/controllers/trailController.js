import Trails from '../models/trailModel.js';
import mongoose from 'mongoose';

//GET all trails
export const getAllTrails = async(req, res) => {
    try {
        const trails = await Trails.find({}).sort({createdAt: -1 });
        res.status(200).json(trails);
    } catch (error) {
        res.status(500).json({error: "Server error occured"});
    }
}

//GET a single trail
export const getTrail = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such trail.' });
    }

    const trail = await Trails.findById(id)

    if (!trail) {
        return res.status({error: 'no such trail.'})
    } 
    res.status(200).json(trail)
};

//PATCH a coordinate
export const updateCoordinate = async (req, res) => {
    const { trailId, index } = req.params;
    const { latitude, longitude } = req.body;

    if (!mongoose.Types.ObjectId.isValid(trailId)) {
        return res.status(404).json({ error: 'Invalid trail ID' });
    }

    try {
        const trail = await Trails.findById(trailId);
        if (!trail) return res.status(404).json({ error: 'Trail not found' });

        if (index < 0 || index >= trail.path.coordinates.length) {
            return res.status(400).json({ error: 'Invalid coordinate index' });
        }

        trail.path.coordinates[index] = [latitude, longitude];
        await trail.save();

        res.status(200).json(trail);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

//DELETE a coordinate
export const deleteCoordinate = async (req, res) => {
    const { trailId, index } = req.params;

    if (!mongoose.Types.ObjectId.isValid(trailId)) {
        return res.status(404).json({ error: 'Invalid trail ID' });
    }

    try {
        const trail = await Trails.findById(trailId);
        if (!trail) return res.status(404).json({ error: 'Trail not found' });

        if (index < 0 || index >= trail.path.coordinates.length) {
            return res.status(400).json({ error: 'Invalid coordinate index' });
        }

        trail.path.coordinates.splice(index, 1);
        await trail.save();

        res.status(200).json(trail);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const insertCoordinate = async (req, res) => {
    const { trailId } = req.params;
    const { index, coordinate } = req.body; // coordinate should be [lat, lng]

    if (!mongoose.Types.ObjectId.isValid(trailId)) {
        return res.status(404).json({ error: 'Invalid trail ID' });
    }

    try {
        const trail = await Trails.findById(trailId);
        if (!trail) return res.status(404).json({ error: 'Trail not found' });

        if (!Array.isArray(coordinate) || coordinate.length !== 2) {
            return res.status(400).json({ error: 'Invalid coordinate format' });
        }

        trail.path.coordinates.splice(index, 0, coordinate);
        await trail.save();
        res.status(200).json(trail);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};