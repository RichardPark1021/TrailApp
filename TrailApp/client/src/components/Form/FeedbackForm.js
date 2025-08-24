import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FeedbackForm = ({ handleSubmit }) => {
    const [feedbackData, setFeedbackData] = useState({
        username: '',
        email: '',
        feedback: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedbackData({ ...feedbackData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(feedbackData);
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={feedbackData.username}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={feedbackData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="feedback">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                    as="textarea"
                    name="feedback"
                    value={feedbackData.feedback}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                Submit
            </Button>
        </Form>
    );
};

export default FeedbackForm;