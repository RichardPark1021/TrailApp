import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { Form, InputGroup, Button, Col } from 'react-bootstrap';
import '../../interfaceSettings.css';

// Define the Input component
const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    <Col xs={12} sm={half ? 6 : 12}>
        <Form.Group controlId={name} className="mb-3">
            <Form.Label className="input-label">{label}</Form.Label>
            <InputGroup>
                <Form.Control
                    name={name}
                    onChange={handleChange}
                    required
                    autoFocus={autoFocus}
                    type={type}
                    placeholder={label}
                    className="input-field"
                />
                {(name === 'password' || name === 'confirmPassword') && handleShowPassword && (
                    <Button variant="outline-secondary" onClick={handleShowPassword} className="input-toggle">
                        {type === "password" ? 'Show' : 'Hide'}
                    </Button>
                )}
            </InputGroup>
        </Form.Group>
    </Col>
);

// Define prop types for the Input component
Input.propTypes = {
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    half: PropTypes.bool,
    autoFocus: PropTypes.bool,
    type: PropTypes.string.isRequired,
    handleShowPassword: PropTypes.func,
};

// Default props
Input.defaultProps = {
    half: false,
    autoFocus: false,
    handleShowPassword: null,
};

export default Input;
