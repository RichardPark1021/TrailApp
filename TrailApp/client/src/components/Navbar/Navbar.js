import React, { useEffect, useState } from 'react';

// Import the different navbars
import LandingNavbar from './LandingNavbar';
import UserNavbar from './UserNavbar';
import AdminNavbar from './AdminNavbar';

const Navbar = () => {
    const [navbar, setNavbar] = useState(<LandingNavbar />);

    // Function to check the user is of Admin/User roleType before generating their Navbars
    const checkUserStatus = () => {
        try {
            const storedData = localStorage.getItem('roleType');
        
            // If there's no data, show the LandingNavbar
            if (!storedData) {
                setNavbar(<LandingNavbar />);
                return;
            }

            const userProfile = JSON.parse(storedData);
            const userRole = userProfile?.result?.roleType;

            // Set navbar based on roleType
            if (userRole === 'Admin') {
                console.log("Accessor is an admin")
                setNavbar(<AdminNavbar />);
            } else if (userRole === 'User') {
                console.log("Accessor is an user")
                setNavbar(<UserNavbar />);
            } else {
                // Default to LandingNavbar if roleType is not recognized
                setNavbar(<LandingNavbar />);
            }
        } catch (error) {
            console.error('Error checking user status:', error);
            setNavbar(<LandingNavbar />); // Default to LandingNavbar on error
        }
    };

    useEffect(() => {
        checkUserStatus(); // Check user status when the component mounts
    }, []);

    return (
        <>
            {navbar}
        </>
    );
};

export default Navbar;