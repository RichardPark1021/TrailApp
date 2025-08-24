// Import React components
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbar, Container, Nav, Offcanvas, NavDropdown } from 'react-bootstrap';


// Import styling & header logo
import '../../interfaceSettings.css';
import GwinnettLogo from '../../assets/images/ggc-light-logo.png';

const AdminNavbar = () => {

    // State to handle mobile menu visibility 
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // User profile detection
    // TODO: Inspect & correct this code to serve the purpose of checking that user is logged in, and is of admin roleType
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [user, setUser] = useState(profile?.payload);
    const  [userRole, setUserRole] = useState('');
    /* [userRole, setUserRole] */

    // TODO: Inspect & describe code behavior, I believe some of these are generic React functions
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    };

    // Function that handles logouts
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/#');
        window.location.reload();
    };

    // TODO: Inspect & describe code behavior
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("profile"));
        const currentUserRole = currentUser?.result?.role;
        setUserRole(currentUserRole);
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    // Prevent menu from closing when clicking on dropdown links in the offcanvas
    const handleDropdownClick = (e) => {
        e.stopPropagation();  // Prevent the event from propagating to the offcanvas close event
    };

    // HTML/JSX web page
    // TODO: Redesign page with necessary links for admininstration portals with front end for video handler/statistics viewer REST APIs
    return (
        <Navbar expand="lg" className="navbar-custom mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/adminHome" className="d-flex align-items-center">
                    <img src={GwinnettLogo} alt="Gwinnett Logo" className="logo me-2" />
                    <span className="heading-gradient">WALKING TRAILS</span>
                </Navbar.Brand>

                {/* Mobile Menu Toggle Button */}
                <Navbar.Toggle
                    aria-controls="offcanvas-navbar"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="d-lg-none"
                />

                {/* Offcanvas for Mobile */}
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
                            <Nav.Link as={Link} to="/userHome" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/trails" onClick={() => setIsMenuOpen(false)}>
                                Trails
                            </Nav.Link>

                            {/* Dropdown for Exercises on Mobile */}
                            <NavDropdown
                                title="Exercises"
                                id="offcanvas-exercises"
                                onClick={handleDropdownClick}  // Prevent the offcanvas from closing
                            >
                                <NavDropdown.Item as={Link} to="/bodyWeightExercises" onClick={() => setIsMenuOpen(false)}>Body Weight Exercises</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/strechesForWalking" onClick={() => setIsMenuOpen(false)}>Stretches For Walking</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/properWalkingTechniques" onClick={() => setIsMenuOpen(false)}>Proper Walking Techniques</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/nutritionandHydration" onClick={() => setIsMenuOpen(false)}>Nutrition and Hydration</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/injuryPrevention" onClick={() => setIsMenuOpen(false)}>Injury Prevention</NavDropdown.Item>
                            </NavDropdown>

                            {/* Dropdown for Admin Controls on Mobile */}
                            <NavDropdown
                                title="Admin Controls"
                                id="offcanvas-admin-controls"
                                onClick={handleDropdownClick}  // Prevent the offcanvas from closing
                            >   
                                <NavDropdown.Item as={Link} to="/adminHome" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/adminControlPanel" onClick={() => setIsMenuOpen(false)}>Admin Control Panel</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/adminAnalytics" onClick={() => setIsMenuOpen(false)}>Analytics</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={Link} to="/userControlPanel" onClick={() => setIsMenuOpen(false)}>
                                My Profile
                            </Nav.Link>
                            <Nav.Link onClick={logout}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                {/* Desktop Links (Inline) */}
                <Navbar.Collapse id="navbarNav" className="d-none d-lg-flex">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/userHome">Home</Nav.Link>
                        <Nav.Link as={Link} to="/trails">Trails</Nav.Link>

                        {/* Dropdown for Exercises on Desktop */}
                        <NavDropdown title="Exercises" id="navbar-exercises">
                            <NavDropdown.Item as={Link} to="/bodyWeightExercises">Body Weight Exercises</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/strechesForWalking">Stretches For Walking</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/properWalkingTechniques">Proper Walking Techniques</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/nutritionandHydration">Nutrition and Hydration</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/injuryPrevention">Injury Prevention</NavDropdown.Item>
                        </NavDropdown>

                        {/* Dropdown for Admin Controls on Desktop */}
                        <NavDropdown title="Admin Controls" id="navbar-admin-controls">
                            <NavDropdown.Item as={Link} to="/adminHome">Admin Dashboard</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/adminControlPanel">Admin Control Panel</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/adminAnalytics">Analytics</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to="/userControlPanel">My Profile</Nav.Link>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;