import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services like SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,  // Email from environment variable
    pass: process.env.EMAIL_PASS,  // Password from environment variable
  },
});

// Send confirmation email function
const sendConfirmationEmail = async (toEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: toEmail,                  // recipient address (dynamic)
    subject: 'Account Successfully Created!',  // subject line
    text: 'Welcome! You have successfully created an account with us.', // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', toEmail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Send password reset email function
const sendResetEmail = async (toEmail, resetLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: toEmail,                  // recipient address (dynamic)
    subject: 'Password Reset Request', // subject line
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}`, // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', toEmail);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

const sendPasswordResetConfirmationEmail = async (toEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: toEmail,                  // recipient address (dynamic)
    subject: 'Your Password Has Been Successfully Reset',  // subject line
    text: 'This is to confirm that your password has been successfully reset. If you did not make this change, please contact support immediately.', // plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset confirmation email sent to:', toEmail);
  } catch (error) {
    console.error('Error sending password reset confirmation email:', error);
  }
};

export { sendConfirmationEmail , sendResetEmail , sendPasswordResetConfirmationEmail };

