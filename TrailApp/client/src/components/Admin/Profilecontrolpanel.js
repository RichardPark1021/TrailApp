import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, FormControl, Button, Badge, Form } from 'react-bootstrap';
import { getUsers, updateUserRole, deleteUser } from '../../actions/users';

const Profilecontrolpanel = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleDeleteButton = async (user) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete: ${user.username}?`);
        if (confirmDelete) {
            try {
                await dispatch(deleteUser(user._id));
                alert(`${user.username} was deleted.`);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleAdminUpdateButton = async (user) => {
        const confirmUpdate = window.confirm(`Are you sure you want to change ${user.username}'s role?`);
        if (confirmUpdate) {
            try {
                const newRole = user.roleType === 'User' ? 'Admin' : 'User';
                await dispatch(updateUserRole(user._id, { roleType: newRole }));
                alert(`${user.username}'s role was changed to ${newRole}.`);
            } catch (error) {
                console.error('Error updating user role:', error);
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='p-4'>
            <h3>Profile Management</h3>
            <div className="container col-lg-12 col-md-12 p-3 pb-3 text-center card shadow-sm">
                <div className="col-lg-12 mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <Form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
                        <InputGroup>
                            <InputGroup.Text>🔎</InputGroup.Text>
                            <FormControl
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search Profiles"
                                required
                                style={{ marginRight: '8px' }}
                            />
                        </InputGroup>
                    </Form>
                </div>
                <hr />
                <div className="user-grid-container">
                    <div className="user-grid-header" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr 1fr 1fr',
                        fontWeight: 'bold',
                        padding: '10px 0',
                        borderBottom: '1px solid #ccc'
                    }}>
                        <span>Username</span>
                        <span>Email</span>
                        <span>Role</span>
                        <span>Action</span>
                    </div>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <div className="user-grid-row" key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 2fr 1fr 1fr',
                                alignItems: 'center',
                                padding: '12px 0',
                                borderBottom: '1px solid #eee'
                            }}>
                                <span>{user.username}</span>
                                <span>{user.email}</span>
                                <span>
                                    <Badge bg={user.roleType === 'Admin' ? 'primary' : 'secondary'}>
                                        {user.roleType}
                                    </Badge>
                                    <br />
                                    <input
                                        type="checkbox"
                                        checked={user.roleType === 'Admin'}
                                        onChange={() => handleAdminUpdateButton(user)}
                                        style={{ marginTop: '5px' }}
                                    />
                                </span>
                                <span>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => handleDeleteButton(user)}
                                    >
                                        <i className="fas fa-trash-alt me-1"></i>
                                        Delete
                                    </Button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="user-grid-row">
                            <span style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                                No results found
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profilecontrolpanel;