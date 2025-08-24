import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);