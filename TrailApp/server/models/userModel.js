// Import dependency
import mongoose from 'mongoose';

// Schema
const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    roleType: { 
        type: String 
    },
    gender: { 
        type: String,
        required: true
    },
    age: { 
        type: String,
        required: true
    },
    ethnicity: { 
        type: String,
        required: true
    },
    community: { 
        type: String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true }); 

export default mongoose.model('user', userSchema);
