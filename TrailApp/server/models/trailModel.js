import mongoose from 'mongoose';

const trailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: {
        type: { type: String, default: 'LineString' },
        coordinates: { type: [[Number]], required: true } // Array of [latitude, longitude]
    },
}, { timestamps: true });

export default mongoose.model('trails', trailSchema);