
import Users from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Added jwt import
import crypto from 'crypto';
import { sendResetEmail } from '../mailer.js';  // Import the reset email function
import { sendConfirmationEmail } from '../mailer.js'; // Import the confirmation email function

// GET all users
export const getAllUsers = async (req, res) => {
    const users = await Users.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
};

// GET a single user
export const getUser = async (req, res) => {
    const { id } = req.params;

    // Check to see if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user.' });
    }

    const user = await Users.findById(id);

    if (!user) {
        return res.status(404).json({ error: 'No such user.' });
    }

    res.status(200).json(user);
};

// CREATE a new user
export const createUser = async (req, res) => {
    const { username, email, password, confirmPassword, roleType, gender, age, ethnicity, community } = req.body;
    console.log(req.body);

    // Final check to ensure all fields are correct
    if (!username || !email || !password || !confirmPassword || !roleType || !gender || !age || !ethnicity || !community) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if the email already exists
        const existingUsername = await Users.findOne({ username });
        if (existingUsername) return res.status(400).json({ message: "Username already exists." });

        const existingEmail = await Users.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: "Email already exists." });

        // Check if the passwords match & hash password
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the user document
        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
            roleType: "User",  // Default roleType
            gender,
            age,
            ethnicity,
            community
        });

        // Send the confirmation email
        await sendConfirmationEmail(email);

        // Handle signin with JSON Web Tokens
        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });

        // Respond with user info and token
        res.status(200).json({ user, token });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ message: error.message });
    }
};

// DELETE a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    // Check to see if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user.' });
    }

    const user = await Users.findOneAndDelete({ _id: id });

    if (!user) {
        return res.status(404).json({ error: 'No such user.' });
    }

    res.status(200).json(user);
};

// UPDATE a user by profile manager
export const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user.' });
    }

    try {
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'No such user.' });
        }

        const { username, email, password, confirmPassword } = req.body;

        // Check for username
        if (username && username !== user.username) {
            const existingUsername = await Users.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ error: 'Username already exists.' });
            }
        }

        // Check for email
        if (email && email !== user.email) {
            const existingEmail = await Users.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email already exists.' });
            }
        }

        // Ensure password match and hash it
        if (password) {
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Passwords do not match.' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;  // Set the hashed password in the request body
        }

        // Update the user document
        const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'No such user.' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// UPDATE a user by admin manager
export const updateUserRole = async (req, res) => {
    const { id } = req.params;

    // Check to see if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user.' });
    }

    const userRole = req.body.roleType;

    try {
        // Update the user role
        const user = await Users.findByIdAndUpdate(id, { roleType: userRole }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'No such user.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// FOR SIGNING IN A USER
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Users.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.roleType }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

// FOR LOGGING OUT A USER
export const logout = async (req, res) => {
    const token = Object.keys(req.body)[0];

    if (token) {
        try {
            // Assuming you are using a method to revoke the token
            await client.revokeToken(token);
        } catch (error) {
            console.error(error);
        }
    }

    res.redirect('/');
};

// SEND RESET LINK
export const sendResetLink = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate a reset token (using crypto or jwt)
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry

        // Save the reset token and its expiry in the user document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Send email with reset link (using the sendResetEmail function)
        const resetLink = `http://localhost:3000/reset/${resetToken}`;  // Adjust URL as necessary
        await sendResetEmail(user.email, resetLink);  // Send reset email with link

        res.status(200).json({ message: 'Password reset link has been sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};
