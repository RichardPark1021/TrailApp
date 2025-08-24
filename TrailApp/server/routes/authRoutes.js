import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import Users from '../models/userModel.js';
import { sendResetEmail } from '../mailer.js'; 
import { sendPasswordResetConfirmationEmail } from '../mailer.js';

const router = express.Router();

// POST: Send Reset Link (existing)
router.post('/send-reset-link', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Generate a reset token and set expiration time (1 hour)
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Construct the reset link
        const resetLink = `http://localhost:3000/reset/${token}`; // Adjust URL if necessary
        // Send the reset email to the user
        await sendResetEmail(user.email, resetLink);

        res.status(200).send('Reset link sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// POST: Reset Password 
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Find the user by reset token and check if it's valid
        const user = await Users.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token has expired
        });

        if (!user) {
            return res.status(400).send('Password reset token is invalid or has expired.');
        }

        // Hash the new password and update the user document
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Clear the reset token
        user.resetPasswordExpires = undefined; // Clear the expiry time
        await user.save();

        // Send the password reset confirmation email
        await sendPasswordResetConfirmationEmail(user.email);

        res.status(200).send('Password has been reset. A confirmation email has been sent.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
