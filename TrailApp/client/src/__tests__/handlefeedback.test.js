import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FeedbackForm from '../components/Form/FeedbackForm';

describe('FeedbackForm', () => {
    test('should call handleSubmit when form is submitted', () => {
        
        const mockHandleSubmit = jest.fn();
        
        
        render(<FeedbackForm handleSubmit={mockHandleSubmit} />);
        
        
        fireEvent.change(screen.getByLabelText(/Username/i), {
            target: { value: 'testuser' }
        });
        
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'test@example.com' }
        });
        
        fireEvent.change(screen.getByLabelText(/Feedback/i), {
            target: { value: 'Test feedback message' }
        });
        
        // Submit the form
        fireEvent.click(screen.getByText(/Submit/i));
        
        // Check if handleSubmit was called with the correct data
        expect(mockHandleSubmit).toHaveBeenCalledWith({
            username: 'testuser',
            email: 'test@example.com',
            feedback: 'Test feedback message'
        });
    });
});