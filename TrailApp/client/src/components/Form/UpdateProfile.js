
import React, { useState } from 'react';
import Input from '../Authorization/input.js';

const UpdateProfileForm = ({ formData, handleChange, handleDelete, handleSubmit, setShowDeleteModal }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(""); // For password error message

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        handleChange(e);
        const password = e.target.value;

        // Validate password length (must be at least 4 characters)
        if (password.length < 4) {
            setPasswordError("Password must be at least 4 characters long.");
        } else {
            setPasswordError("");
        }
    };

    return (
        <>
            <Input 
                id="username-input" 
                name="username" 
                label="Username" 
                handleChange={handleChange} 
                autoFocus 
                type="text" 
                value={formData.username} 
            />
            <Input 
                id="email-input" 
                name="email" 
                label="Email Address" 
                handleChange={handleChange} 
                type="email" 
                value={formData.email} 
            />
            <div className="form-group">
                <label htmlFor="gender-input"><strong>Gender</strong></label>
                <select 
                    id="gender-input" 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange} 
                    className="form-control">
                    <option value="" disabled selected>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer Not To Say">Prefer Not To Say</option>
                </select>
            </div>
            <Input 
                id="age-input" 
                name="age" 
                label="Age" 
                handleChange={handleChange} 
                type="number" 
                value={formData.age} 
            />
            <div className="form-group">
                <label htmlFor="ethnicity-input"><strong>Ethnicity</strong></label>
                <select 
                    id="ethnicity-input" 
                    name="ethnicity" 
                    value={formData.ethnicity} 
                    onChange={handleChange} 
                    className="form-control">
                    <option value="" disabled selected>Select Ethnicity</option>
                    <option value="Asian">Asian</option>
                    <option value="Hispanic/Latino">Hispanic/Latino</option>
                    <option value="Black/African American">Black/African American</option>
                    <option value="American Indian/Alaska Native">American Indian/Alaska Native</option>
                    <option value="Native Hawaiian/Pacific Islander">Native Hawaiian/Pacific Islander</option>
                    <option value="White">White</option>
                    <option value="Prefer not to answer">Prefer not to answer</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="community-input"><strong>Part of GGC Community</strong></label>
                <select 
                    id="community-input" 
                    name="community" 
                    value={formData.community} 
                    onChange={handleChange} 
                    className="form-control">
                    <option value="" disabled selected>Select Yes or No</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {/* Add margin to create space between the community field and the error message */}
            {passwordError && <div className="alert alert-danger mt-3">{passwordError}</div>}

            {/* Password Field with Separate Show/Hide */}
            <Input 
                id="password-input" 
                name="password" 
                label="New Password" 
                handleChange={handlePasswordChange} // Use handlePasswordChange to validate password
                type={showPassword ? "text" : "password"} 
                handleShowPassword={handleShowPassword}
            />

            {/* Confirm Password Field with Separate Show/Hide */}
            <Input 
                id="confirm-password-input" 
                name="confirmPassword" 
                label="Repeat New Password" 
                handleChange={handleChange} 
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
            />

            <div className="form-group">
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => setShowDeleteModal(true)} >
                    Delete Profile
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={handleSubmit} 
                >
                    Submit Changes
                </button>
            </div>
        </>
    );
};

export default UpdateProfileForm;
