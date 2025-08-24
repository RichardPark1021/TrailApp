// src/components/Authorization/ForgotPasswordForm.js
import React from 'react';
const ForgotPasswordForm = ({ resetEmail, setResetEmail }) => {
    return (
        <div className="form-group">
            <label htmlFor="reset-email"><strong>Enter your email to reset password</strong></label>
            <input 
                id="reset-email" 
                type="email" 
                className="form-control" 
                value={resetEmail} 
                onChange={(e) => setResetEmail(e.target.value)} 
                required 
            />
        </div>
    );
};

export default ForgotPasswordForm;
