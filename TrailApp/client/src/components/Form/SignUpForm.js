import React, { useState } from 'react';
import Input from '../Authorization/input.js';
import { Modal, Button } from 'react-bootstrap';
import Privacy from '../../pages/Privacy';
import Consent from '../../pages/UserConsent';

const SignUpForm = ({ formData, handleChange }) => {
    const [show, setShow] = useState(false); // Declare the show state for the modal
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [consent, setConsent] = useState(false);

    const [passwordError, setPasswordError] = useState(""); // For real-time password feedback

    const handleClose = () => setShow(false); // Close modal
    const handleShow = () => setShow(true); // Show modal

    const handleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword); // Toggle confirm password visibility
    };

    const handlePasswordChange = (e) => {
        handleChange(e);
        const password = e.target.value;

        // Validate password
        const passwordRegex = /^.{4,}$/; // Password must be at least 4 characters long
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be at least 4 characters long.");
        } else {
            setPasswordError("");
        }
    };

    const handleAgeChange = (e) => {
        // Get the input value
        let value = e.target.value;
        
        // Ensure the value is not negative
        if (value < 0) {
            value = 0;
        }

        handleChange(e); // Call the handleChange function to update form data
    };

    const closeConsent = () => setConsent(false);
    const showConsent = () => setConsent(true);

    return (
        <>
            <Input 
                id="username-input" 
                name="username" 
                label="Username" 
                handleChange={handleChange} 
                autoFocus 
                type="text" 
            />
            <Input 
                id="email-input" 
                name="email" 
                label="Email Address" 
                handleChange={handleChange} 
                type="email" 
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

            {/* Age Input with validation to prevent negative values */}
            <div className="form-group">
                <label htmlFor="age-input"><strong>Age</strong></label>
                <input 
                    id="age-input" 
                    name="age" 
                    type="number" 
                    className="form-control"
                    value={formData.age} 
                    onChange={handleAgeChange} // Use the custom handleAgeChange function
                    min="0" // Prevent negative values directly in the input
                />
            </div>

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
                label="Password" 
                handleChange={handlePasswordChange} // Use handlePasswordChange to validate password
                type={showPassword ? "text" : "password"} 
                handleShowPassword={handleShowPassword} // This will toggle the password visibility
            />

            {/* Confirm Password Field with Separate Show/Hide */}
            <Input 
                id="confirm-password-input" 
                name="confirmPassword" 
                label="Repeat Password" 
                handleChange={handleChange} 
                type={showConfirmPassword ? "text" : "password"} 
                handleShowPassword={handleShowConfirmPassword} // This will toggle the confirm password visibility
            />

            <p className="mt-3" onClick={handleShow} style={{ cursor: 'pointer', color: 'var(--btn-privacy-popup-color)', textDecoration: 'underline' }}>
                User Privacy Agreement
            </p>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Privacy Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Privacy />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <p className="mt-3" onClick={showConsent} style={{ cursor: 'pointer', color: 'var(--btn-privacy-popup-color)', textDecoration: 'underline' }}>
                User Consent Agreement
            </p>

            <Modal show={consent} onHide={closeConsent} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Consent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Consent />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeConsent}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignUpForm;
