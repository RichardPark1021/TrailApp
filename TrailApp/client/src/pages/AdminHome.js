// Import React components
import React from 'react';

// Import global stylesheet
import '../interfaceSettings.css';
import { Card, Row, Col } from 'react-bootstrap';

const AdminHome = () => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Administrator Dashboard</h2>
            <Row>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title><strong>Role Management</strong></Card.Title>
                            <Card.Text>
                                View registered user profiles & assign roles.
                            </Card.Text>
                            <div className="mt-auto">
                                <a href="/AdminControlPanel?option=profiles" className="btn btn-primary">
                                    Manage Users
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title><strong>Media Management</strong></Card.Title>
                            <Card.Text>
                                Manage videos & how they're listed.
                            </Card.Text>
                            <div className="mt-auto">
                                <a href="/AdminControlPanel?option=videos" className="btn btn-primary w-100">
                                    Manage Content
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title><strong>Analytics</strong></Card.Title>
                            <Card.Text>
                                View video & user analytics
                            </Card.Text>
                            <div className="mt-auto">
                                <a href="/AdminAnalytics" className="btn btn-primary w-100">
                                    View Analytics
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title><strong>Feedback Management</strong></Card.Title>
                            <Card.Text>
                                View and manage user feedback.
                            </Card.Text>
                            <div className="mt-auto">
                                <a href="/AdminControlPanel?option=feedback" className="btn btn-primary w-100">
                                    Manage Feedback
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title><strong>Trail Management</strong></Card.Title>
                            <Card.Text>
                                Manage map trails.
                            </Card.Text>
                            <div className="mt-auto">
                                <a href="/AdminControlPanel?option=trail" className="btn btn-primary w-100">
                                    Manage Trails
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title><strong>Bench Management</strong></Card.Title>
                            <Card.Text>
                                Manage map benches.
                            </Card.Text>
                            <div className="mt-auto">
                                <a href="/AdminControlPanel?option=bench" className="btn btn-primary w-100">
                                    Manage Benches
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminHome;