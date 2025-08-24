// src/components/Authorization/SignInForm.js
import React from 'react';
import Input from '../Authorization/input.js';

const SignInForm = ({ formData, handleChange, handleShowPassword, showPassword }) => {
    return (
        <>
            <Input 
                id="email-input" 
                name="email" 
                label="Email Address" 
                handleChange={handleChange} 
                type="email" 
            />
            <Input
                id="password-input"
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
            />
        </>
    );
};

export default SignInForm;
