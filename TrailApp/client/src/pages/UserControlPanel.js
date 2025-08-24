import React, { useState, useEffect } from 'react';
import UserInfoForm from '../components/Form/UserInfoForm.js';
import UpdateProfileForm from '../components/Form/UpdateProfile.js';
import FeedbackForm from '../components/Form/FeedbackForm.js';
import { submitFeedback } from '../api/index.js';
import { getUser, deleteUser } from '../actions/users.js';
import { updateProfile } from '../actions/auth.js';
import { Modal, Button, Alert } from 'react-bootstrap';
import '../interfaceSettings.css';

const UserControlPanel = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        gender: '',
        age: '',
        ethnicity: '',
        community: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [alertData, setAlertData] = useState({
        show: false,
        message: '',
        type: '' // success or danger
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getUserId = () => {
        const currentUser = JSON.parse(localStorage.getItem('profile'));
        return currentUser?.result?._id ? { userId: currentUser.result._id, currentUser } : {};
    };
    
    const fillMissingFormData = (formData, currentUser) => {
        return {
            ...formData,
            username: formData.username || currentUser.result.username,
            email: formData.email || currentUser.result.email,
            age: formData.age || currentUser.result.age
        };
    };
    
    const validatePassword = (password, confirmPassword, setAlertData) => {
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                setAlertData({ show: true, message: 'Passwords do not match!', type: 'danger' });
                return false;
            } else if (password.length < 4) {
                setAlertData({ show: true, message: 'Password requirements not met.', type: 'danger' });
                return false;
            }
        }
        return true;
    };
    
    const checkForChanges = (updatedFormData, currentUser) => {
        return JSON.stringify(updatedFormData) !== JSON.stringify(currentUser.result);
    };
    
    const updateLocalProfile = (currentUser, updatedFormData) => {
        localStorage.setItem('profile', JSON.stringify({
            ...currentUser,
            result: { ...currentUser.result, ...updatedFormData }
        }));
    };
    
    const showAlert = (setAlertData, message, type) => {
        setAlertData({ show: true, message, type });
    };
    
    const handleSubmit = async () => {
        try {
            const { userId, currentUser } = getUserId();
            if (!userId) {
                console.error('User not found.');
                return;
            }
    
            let updatedFormData = fillMissingFormData(formData, currentUser);
    
            if (!validatePassword(formData.password, formData.confirmPassword, setAlertData)) return;
    
            if (formData.password && formData.confirmPassword) {
                updatedFormData.password = formData.password;
            } else {
                delete updatedFormData.password;
                delete updatedFormData.confirmPassword;
            }
    
            if (!checkForChanges(updatedFormData, currentUser)) {
                showAlert(setAlertData, 'No changes were made to the profile.', 'danger');
                return;
            }
    
            await updateProfile(updatedFormData, userId);
            updateLocalProfile(currentUser, updatedFormData);
    
            setFormData((prevData) => ({ ...prevData, ...updatedFormData }));
    
            setTimeout(() => window.location.reload(), 1500);
            showAlert(setAlertData, 'Profile Updated!', 'success');
    
        } catch (error) {
            console.error('Error updating user profile:', error);
            const message = error?.response?.data?.error || 'An error occurred while updating your profile. Please try again.';
            showAlert(setAlertData, message, 'danger');
        }
    };
    


    const handleDelete = async () => {
        const currentUser = JSON.parse(localStorage.getItem('profile'));
        const userId = currentUser?.result?._id;
    
        if (!userId) {
            console.log('Unable to find user.');
            return;
        }
    
        try {
            await deleteUser(userId);
            localStorage.removeItem('profile');
            localStorage.removeItem('roleType');
            sessionStorage.removeItem('authToken');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        setShowDeleteModal(false);
    };

    const handleFeedbackSubmit = async (feedbackData) => {
        try {
            await submitFeedback(feedbackData);
            setShowFeedbackModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUserData = () => {
            const storedProfile = JSON.parse(localStorage.getItem('profile'));
            if (storedProfile?.result) {
                setFormData(storedProfile.result); // Update the form data with the stored profile's result
            }
        };
    
        fetchUserData();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Profile Management</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">User Information</h5>
                            <UserInfoForm formData={formData} handleChange={handleChange} />
                            <Button 
                                variant="primary" 
                                onClick={() => setShowFeedbackModal(true)} 
                                className="feedback-button mt-3"
                            >
                                Feedback
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Update Profile</h5>
                            {alertData.show && (
                                <Alert variant={alertData.type} onClose={() => setAlertData({ ...alertData, show: false })} dismissible>
                                {alertData.message}
                                </Alert>
                            )}
                            <UpdateProfileForm 
                                formData={formData}
                                handleChange={handleChange}
                                showPassword={showPassword}
                                handleDelete={handleDelete}
                                handleSubmit={handleSubmit}
                                setShowDeleteModal={setShowDeleteModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Submit Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FeedbackForm handleSubmit={handleFeedbackSubmit} />
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="border-bottom-0">
                    <Modal.Title className="text-danger">Delete Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center pb-4">
                    <i className="fas fa-exclamation-triangle text-danger mb-4" style={{ fontSize: '3rem' }}></i>
                    <p className="mb-4 fw-medium">Are you sure you want to delete your profile?</p>
                    <p className="text-muted mb-4">This action cannot be undone.</p>
                    <div className="d-flex justify-content-center align-items-stretch gap-4" style={{ margin: '0 auto', maxWidth: '400px' }}>
                        <Button 
                            variant="outline-secondary" 
                            onClick={() => setShowDeleteModal(false)}
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                borderRadius: '8px',
                                width: '160px',
                                fontWeight: '500',
                                borderWidth: '2px',
                                height: '45px',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={handleDelete}
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                borderRadius: '8px',
                                width: '160px',
                                fontWeight: '500',
                                height: '45px',
                                padding: '0.5rem 1rem'
                            }}
                        >
                            Delete Profile
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserControlPanel;