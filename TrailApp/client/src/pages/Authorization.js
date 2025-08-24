import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import SignInForm from '../components/Form/SignInForm';
import SignUpForm from '../components/Form/SignUpForm';
import ForgotPasswordForm from '../components/Form/ForgotPasswordForm';
import { signin, signup } from '../actions/auth';
import { sendResetLink } from '../api/index.js';
import '../interfaceSettings.css';

const initialState = { 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    roleType: 'User', 
    gender: '', 
    age: '', 
    ethnicity: '', 
    community: '' 
};

const Authorization = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [resetEmail, setResetEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  
    const navigate = useNavigate();
    const location = useLocation(); // Access location to get the query params
    const dispatch = useDispatch(); // Get dispatch function from useDispatch

    // Extract query parameter 'formType' from the URL
    const params = new URLSearchParams(location.search);
    const formType = params.get('formType');  // 'signin' or 'signup'

    // Set the initial form state based on the formType URL param, default to 'signin'
    useEffect(() => {
        if (formType === 'signup') {
            setIsSignup(true);
        } else {
            setIsSignup(false); // Default to signin if no query parameter or invalid parameter
        }
    }, [formType]);

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        // Skip password matching and strength checks for Sign In
        if (showForgotPassword) {
            try {
                console.log("Attempting to send reset link for email:", resetEmail);
                const response = await sendResetLink(resetEmail);
                if (response.status === 200) {
                    setSuccessMessage("Password reset link has been sent to your email.");
                    setShowForgotPassword(false); // Return to Sign In view
                } else {
                    console.error("Unexpected response:", response);
                }
            } catch (error) {
                console.error("Error sending reset link:", error);
                setErrorMessage("Email not found. Please try again.");
            }
        } else {
            if (isSignup) {
                // Only check for password match and strength during Sign Up
                if (formData.password !== formData.confirmPassword) {
                    setErrorMessage("Passwords do not match.");
                    return;
                }
                // Update password validation to require 4 characters
                const passwordRegex = /^.{4,}$/;  // Password must be at least 4 characters long
                if (!passwordRegex.test(formData.password)) {
                    setErrorMessage("Password requirements not met.");
                    return;
                }
                try {
                    await dispatch(signup(formData, navigate)); // Use dispatch here
                    setSuccessMessage('Account created successfully!');
                } catch (error) {
                    const errorMsg = error.response?.data?.message || "An error occurred during signup.";
                    setErrorMessage(errorMsg + " Please try again.");
                }
            } else {
                // For Sign In, only check if password matches
                try {
                    const response = await dispatch(signin(formData, navigate)); 
                    if (response && response.success) {
                        setSuccessMessage('Signed in successfully!');
                    } else {
                        setErrorMessage("Sign-in failed. Please check your credentials.");
                    }
                } catch (error) {
                    setErrorMessage("Sign-in failed. Please check your credentials.");
                }
            }
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Switch between Sign Up and Sign In and update the URL dynamically
    const switchMode = () => {
        setIsSignup((prev) => !prev);
        setShowPassword(false);
        setShowForgotPassword(false);
        setSuccessMessage('');
        setErrorMessage('');
        // Update the URL with the correct formType
        const newFormType = !isSignup ? 'signup' : 'signin'; 
        navigate(`/authorization?formType=${newFormType}`); // Update the URL
    };

    const showForgotPasswordForm = () => {
        setShowForgotPassword(true);
        setIsSignup(false);
        setShowPassword(false);
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <div id="sign-in-container" className="container mt-5">
            <div id="sign-in-card" className="card">
                <div id="sign-in-card-body" className="card-body">
                    <h5 id="sign-in-title" className="card-title text-center">
                        {showForgotPassword ? 'Reset Password' : (isSignup ? 'Sign Up' : 'Sign In')}
                    </h5>

                    {successMessage && (
                        <div className="alert alert-success text-center">
                            {successMessage}
                        </div>
                    )}

                    {/* Move the error message above the fields */}
                    {errorMessage && (
                        <div className="alert alert-danger text-center">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div id="sign-in-form-group" className="form-group">
                            {showForgotPassword ? (
                                <ForgotPasswordForm resetEmail={resetEmail} setResetEmail={setResetEmail} />
                            ) : isSignup ? (
                                <SignUpForm formData={formData} handleChange={handleChange} showPassword={showPassword} />
                            ) : (
                                <SignInForm formData={formData} handleChange={handleChange} handleShowPassword={handleShowPassword} showPassword={showPassword} />
                            )}
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block btn-spacing">
                                {showForgotPassword ? 'Send Reset Link' : (isSignup ? 'Sign Up' : 'Sign In')}
                            </button>
                        </div>

                        {/* Don't show "Forgot Password" button in SignUp view */}
                        {!showForgotPassword && !isSignup && (
                            <div className="text-center mt-3">
                                <button 
                                    id="forgot-password-btn" 
                                    type="button" 
                                    onClick={showForgotPasswordForm} 
                                    className="btn btn-link">
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        {/* Only show switch between Sign In and Sign Up when not in Forgot Password view */}
                        {!showForgotPassword && (
                            <div className="text-center mt-3">
                                <button 
                                    id="switch-mode-btn" 
                                    type="button" 
                                    onClick={switchMode} 
                                    className="btn btn-link">
                                    {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </button>
                            </div>
                        )}

                        {showForgotPassword && (
                            <div className="text-center mt-3">
                                <button 
                                    id="back-to-signin-btn" 
                                    type="button" 
                                    onClick={() => setShowForgotPassword(false)} 
                                    className="btn btn-link">
                                    Back to Sign In
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Authorization;
