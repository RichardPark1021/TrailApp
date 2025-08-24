/*app.post('/api/user/reset-password', async (req, res) => {
    console.log("Request received for password reset:", req.body.email);
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: "Email not found" });
    }

    // If found, proceed with sending reset email and log success
    console.log("User found:", user.email);
    // ... proceed with sending reset email
    res.status(200).json({ message: "Reset link sent" });
});


import nodemailer from 'nodemailer';
import crypto from 'crypto';  // For generating a reset token
import { User } from '../models/userModel'; // Make sure the path to your User model is correct
// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other services as well, like SendGrid, or SES
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
    }
});

app.post('/api/user/reset-password', async (req, res) => {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
        return res.status(404).json({ message: "Email not found" });
    }

    // Generate a token for the password reset (using a crypto function)
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Save the token to the user's record in the database, along with an expiration time
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Prepare the reset link
    const resetLink = `http://localhost:3000/updatepassword/${resetToken}`;

    // Send the email with the reset link
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Reset link sent" });
    } catch (error) {
        console.error('Error sending reset email:', error);
        return res.status(500).json({ message: "Error sending reset link" });
    }
});

app.get('/api/user/verify-reset-token/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        res.status(200).json({ message: "Token valid" });
    } catch (error) {
        console.error('Error verifying reset token:', error);
        res.status(500).json({ message: "Error verifying token" });
    }
});

export default usercontroller; */