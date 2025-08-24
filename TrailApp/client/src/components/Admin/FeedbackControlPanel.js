import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, InputGroup, Container, Row, Col, Badge } from 'react-bootstrap';
import { fetchFeedbacks, deleteFeedback } from '../../api/index.js';

const FeedbackControlPanel = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchFeedbacks();
            setFeedbacks(result.data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteFeedback(id);
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
    };

    const filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h3 className="text-center mb-4">Feedback Management</h3>
                    <div className='card p-3 p-md-4 shadow-sm'>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search feedback"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control-sm form-control-md-normal"
                            />
                        </InputGroup>
                        <div className="table-responsive">
                            <Table striped bordered hover className="table-sm">
                                <thead>
                                    <tr>
                                        <th className="align-middle">Username</th>
                                        <th className="align-middle">Email</th> {/* Removed d-none d-md-table-cell */}
                                        <th className="align-middle">Status</th>
                                        <th className="align-middle">Feedback</th>
                                        <th className="align-middle" style={{ minWidth: '100px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFeedbacks.map(feedback => (
                                        <tr key={feedback._id}>
                                            <td className="align-middle">{feedback.username}</td>
                                            <td className="align-middle">{feedback.email}</td> {/* Removed d-none d-md-table-cell */}
                                            <td className="align-middle">
                                                <Badge 
                                                    bg={feedback.isResolved ? 'success' : 'warning'}
                                                    className="me-2"
                                                >
                                                    {feedback.isResolved ? 'Resolved' : 'Pending'}
                                                </Badge>
                                            </td>
                                            <td className="align-middle">{feedback.feedback}</td>
                                            <td className="align-middle">
                                                <Button 
                                                    variant="danger" 
                                                    size="sm"
                                                    className="w-100"
                                                    onClick={() => handleDelete(feedback._id)}
                                                >
                                                    <i className="fas fa-trash-alt me-1"></i>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FeedbackControlPanel;