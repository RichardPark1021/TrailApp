import React, { useState } from 'react';
import axios from 'axios';
import ForgotPasswordForm from './ForgotPasswordForm'; // Import the ForgotPasswordForm component

const SendResetLink = () => {
    const [resetEmail, setResetEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/send-reset-link', { email: resetEmail });
            setMessage(response.data);  // Show the success or failure message
        } catch (error) {
            setMessage('Error sending reset link');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Send Reset Link</h5>
                    {message && <div className="alert alert-info text-center">{message}</div>}  {/* Display message */}
                    <form onSubmit={handleSubmit}>
                        {/* ForgotPasswordForm for email input */}
                        <ForgotPasswordForm resetEmail={resetEmail} setResetEmail={setResetEmail} /> 
                        <button type="submit" className="btn btn-primary btn-block mt-4">Send Reset Link</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendResetLink;
