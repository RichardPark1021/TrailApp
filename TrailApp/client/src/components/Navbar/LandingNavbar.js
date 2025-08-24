// LandingNavbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../interfaceSettings.css';
import GwinnettLogo from '../../assets/images/ggc-light-logo.png';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';

const LandingNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

    return (
        <Navbar expand="lg" className="navbar-custom mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img src={GwinnettLogo} alt="Gwinnett Logo" className="logo me-2" />
                    <span className="heading-gradient">WALKING TRAILS</span>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="offcanvas-navbar"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="d-lg-none"
                />

                <Navbar.Offcanvas
                    id="offcanvas-navbar"
                    placement="end"
                    show={isMenuOpen}
                    onHide={() => setIsMenuOpen(false)}
                    className="d-lg-none"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link as={Link} to="/" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about" onClick={() => setIsMenuOpen(false)}>
                                About
                            </Nav.Link>
                            <Nav.Link as={Link} to="/privacy" onClick={() => setIsMenuOpen(false)}>
                                Privacy
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/authorization?formType=signin"  // Add formType query parameter
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                <Navbar.Collapse id="navbarNav" className="d-none d-lg-flex">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/privacy">Privacy</Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/authorization?formType=signin"  // Add formType query parameter
                        >
                            Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default LandingNavbar;
