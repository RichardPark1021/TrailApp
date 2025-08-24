import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import UserControlPanel from '../pages/UserControlPanel';
import { updateProfile } from '../actions/auth';

// Mocking necessary modules
jest.mock('../actions/auth', () => ({
    updateProfile: jest.fn(),
}));

describe('UserControlPanel', () => {
    beforeEach(() => {
        // Reset the mocks before each test
        jest.clearAllMocks();
        // Mock localStorage and sessionStorage
        global.localStorage.setItem('profile', JSON.stringify({ result: { _id: '123', username: 'testuser', email: 'testuser@example.com' } }));
        global.sessionStorage.setItem('authToken', 'some-token');
    });

    test('handleSubmit should call updateProfile with correct data when form is submitted', async () => {
        // Render the component
        render(<UserControlPanel />);
    
        // Fill in the form with new data
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'newuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '30' } });
    
        // Simulate form submission
        const submitButton = screen.getByText(/Submit Changes/i);
        fireEvent.click(submitButton);
    
        // Wait for the updateProfile function to be called
        await waitFor(() => {
            expect(updateProfile).toHaveBeenCalledWith(
                {
                    _id: "123",
                    username: 'newuser',
                    email: 'newuser@example.com',
                    age: '30',
                },
                '123' // User ID as the second argument
            );
        });
    });

    test('handleSubmit should show an error message if passwords do not match', async () => {
        render(<UserControlPanel />);
        
        // Find the input fields using the 'id' attributes
        const newPasswordInput = screen.getByPlaceholderText('New Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Repeat New Password');
        
        // Simulate user typing different passwords in both fields
        fireEvent.change(newPasswordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    
        // Submit the form (you need to simulate the submit button click)
        const submitButton = screen.getByRole('button', { name: /Submit Changes/i });
        fireEvent.click(submitButton);
    });
});
