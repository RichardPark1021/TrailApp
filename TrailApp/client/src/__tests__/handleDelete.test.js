import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import UserControlPanel from '../pages/UserControlPanel';
import { deleteUser } from '../actions/users';
import { updateProfile } from '../actions/auth';

jest.mock('../actions/users', () => ({
    deleteUser: jest.fn(),
}));

jest.mock('../actions/auth', () => ({
    updateProfile: jest.fn(),
}));

describe('UserControlPanel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('profile', JSON.stringify({ result: { _id: '123', username: 'testuser' } }));
        sessionStorage.setItem('authToken', 'some-token');
    });

    test('handleDelete should call deleteUser when user confirms in modal', async () => {
        render(<UserControlPanel />);

        // Click "Delete Profile" to open the modal
        fireEvent.click(screen.getByText(/Delete Profile/i));

        const deleteButtons = await screen.findAllByRole('button', { name: /Delete Profile/i });
        // Wait for the modal to appear and click the confirm delete button
        const confirmDeleteButton = deleteButtons.find(button =>
            button.closest('.modal') !== null
        );
        
        fireEvent.click(confirmDeleteButton);

        // Wait for deleteUser to be called
        await waitFor(() => {
            expect(deleteUser).toHaveBeenCalledWith('123');
        });

        // Check localStorage and sessionStorage cleared
        expect(localStorage.getItem('profile')).toBeNull();
        expect(sessionStorage.getItem('authToken')).toBeNull();
    });

    test('handleDelete should not call deleteUser when user cancels in modal', async () => {
        render(<UserControlPanel />);

        // Open modal
        fireEvent.click(screen.getByText(/Delete Profile/i));

        // Click "Cancel" inside the modal
        const cancelButton = await screen.findByRole('button', { name: /Cancel/i });
        fireEvent.click(cancelButton);

        // Wait to verify deleteUser was not called
        await waitFor(() => {
            expect(deleteUser).not.toHaveBeenCalled();
        });

        // Make sure user data is still present
        expect(localStorage.getItem('profile')).not.toBeNull();
        expect(sessionStorage.getItem('authToken')).not.toBeNull();
    });
});
