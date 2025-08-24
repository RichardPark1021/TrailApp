import mongoose from "mongoose";

const benchSchema = new mongoose.Schema({
    bench_number: { type: Number, required: true},
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
    location: { type: String, required: true},
    videos: [{
        title: { type: String, required: true},
        url: { type: String, required: true}
    }]
}, { timestamps: true });

export default mongoose.model('bench', benchSchema);