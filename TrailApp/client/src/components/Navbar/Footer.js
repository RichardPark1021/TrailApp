// Import React components
import React from 'react';
import { Link } from 'react-router-dom';

// Styling elements. This includes Bootstrap
import '../../interfaceSettings.css';

const Footer = () => {

    return (
        <div className="card footer-card">
            <div className="card-body text-center">
                <p className="card-text mb-2">
                    &copy; Walking Trails, Spring 2025
                </p>
                <div className="footer-links d-flex justify-content-center">
                    <Link className="nav-link" to="/about">About</Link>
                    <Link className="nav-link" to="/privacy">Privacy</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;