import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reaction: { type: String, enum: ['like', 'dislike'], required: true },
});

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    totLikes: { type: Number, default: 0 },
    totDislikes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    reactions: [reactionSchema], // New field to store user reactions
}, { timestamps: true });

const Videos = mongoose.model('Videos', videoSchema);

export default Videos;
