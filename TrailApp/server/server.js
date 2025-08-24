// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import the new auth routes
import trailRoutes from './routes/trailRoutes.js';
import benchRoutes from './routes/benchRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Creates object app that contains Express framework API by calling createApplication() in node_modules/express/lib/express.js
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(express.json());

// Routes for API functions
app.use('/api/user', userRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/auth', authRoutes); // Add the new auth routes
app.use('/api/trails', trailRoutes);
app.use('/api/bench', benchRoutes);
app.use('/api/feedback', feedbackRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const db = mongoose.connection;
        //const grid = new Grid(db.db, mongoose.mongo);
        // Listen for requests
        app.listen(process.env.PORT, () => 
            console.log('Connected to DB, server running on port:', process.env.PORT));
    })
    .catch((error) => 
        console.log(error.message)
    );
