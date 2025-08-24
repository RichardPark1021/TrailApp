import React, { useState, useEffect } from 'react';

const UserInfoForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        gender: '',
        age: '',
        ethnicity: '',
        community: ''
    });

    // Load user data from localStorage's 'profile' key
    const loadUserData = () => {
        try {
            const storedProfile = localStorage.getItem('profile');
            if (!storedProfile) {
                console.warn('No profile found in localStorage.');
                return;
            }

            // Parse the profile JSON and extract the 'result' field
            const { result } = JSON.parse(storedProfile);

            // Set the form data with the extracted user info
            setFormData({
                username: result.username || '',
                email: result.email || '',
                gender: result.gender || '',
                age: result.age || '',
                ethnicity: result.ethnicity || '',
                community: result.community || ''
            });
        } catch (error) {
            console.error('Error loading user data from localStorage:', error);
        }
    };

    // Load user data when the component mounts
    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <div className="user-info">
            <div className="user-field">
                <strong>Username:</strong> {formData.username}
            </div>
            <div className="user-field">
                <strong>Email:</strong> {formData.email}
            </div>
            <div className="user-field">
                <strong>Gender:</strong> {formData.gender}
            </div>
            <div className="user-field">
                <strong>Age:</strong> {formData.age}
            </div>
            <div className="user-field">
                <strong>Ethnicity:</strong> {formData.ethnicity}
            </div>
            <div className="user-field">
                <strong>Part of GGC Community:</strong> {formData.community}
            </div>
        </div>
    );
};

export default UserInfoForm;