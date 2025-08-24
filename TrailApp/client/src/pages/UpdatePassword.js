/*import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePassword } from '../api/index.js';

const UpdatePassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();  // Retrieve token from URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        
        try {
            const response = await updatePassword(token, newPassword);
            if (response.status === 200) {
                alert("Password updated successfully. You may now log in.");
                navigate('/signin');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error updating password. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Update Password</h5>
                    
                    {errorMessage && (
                        <div className="alert alert-danger text-center">
                            {errorMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-4">
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
*/



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePassword } from '../api/index.js';

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidToken, setIsValidToken] = useState(true);
    const navigate = useNavigate();
    const { token } = useParams();  // Retrieve token from URL

    useEffect(() => {
        // Check if the token is valid when the component mounts
        const verifyToken = async () => {
            try {
                // Call an API to verify the token exists and is not expired
                const response = await fetch(`/api/user/verify-reset-token/${token}`);
                if (response.status !== 200) {
                    setIsValidToken(false);
                }
            } catch (error) {
                setIsValidToken(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await updatePassword(token, newPassword);
            if (response.status === 200) {
                alert("Password updated successfully. You may now log in.");
                navigate('/signin');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error updating password. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            {isValidToken ? (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center">Update Password</h5>

                        {errorMessage && (
                            <div className="alert alert-danger text-center">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mt-4">
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="alert alert-danger text-center">
                    The reset link is invalid or expired.
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;