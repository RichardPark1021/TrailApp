import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
    const userProfile = JSON.parse(localStorage.getItem('roleType'));
    const userRole = userProfile?.result?.roleType;

    return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/authorization" />;
};

export default PrivateRoute;