// Import React components
import React, { useState, useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
//import link for home page
import { Link } from 'react-router-dom';
// Import components
import Profilecontrolpanel from '../components/Admin/Profilecontrolpanel';
import Videocontrolpanel from '../components/Admin/Videocontrolpanel';
import FeedbackControlPanel from '../components/Admin/FeedbackControlPanel';
import TrailControlPanel from '../components/Admin/TrailControlPanel';
import BenchControlPanel from '../components/Admin/BenchControlPanel';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


// Import global stylesheet
import '../interfaceSettings.css';

// TODO:
//       Utilize Bootstrap components for mobile friendly design
//
//       Create table to view, edit, delete all videos
//       COLUMNS: title, category (dropdown select box), subcategory (dropdown select box), url, toggle listing/delisting, delete button
//       Create "Add Video" button at top of form, with form with these categories in same format
//
//       Create table to view & edit role for all registered users
//       COLUMNS: username, email, roleType (dropdown select box)
//       Manual Testing: Make sure everything is routed correctly & validated
const AdminControlPanel = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSelectedOption(params.get('option') || 'profiles'); // Default to 'profiles' if no option is passed
    }, [location]);

    return (
     <div className="container-xl bg-white rounded border">
            <div className="row my-3">
                { 
                <div className="col-12 col-md-3 mb-4 mb-md-0">
                    <hr />
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Nav.Link className="hover" href="/adminHome">🏠 Admin Dashboard</Nav.Link>
                        </Container>
                    </Navbar>
                    <br />
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Nav.Link className="hover" href="/AdminControlPanel?option=profiles">👤 Profile Manager</Nav.Link>
                        </Container>
                    </Navbar>
                    <br />
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Nav.Link className="hover" href="/AdminControlPanel?option=videos">🎞️ Video Manager</Nav.Link>
                        </Container>
                    </Navbar>
                    <br />
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Nav.Link className="hover" href="/AdminControlPanel?option=feedback">📝 Feedback Manager</Nav.Link>
                        </Container>
                    </Navbar>
                    <Navbar className="bg-body-tertiary my-4">
                        <Container>
                            <Nav.Link className="hover" href="/AdminControlPanel?option=trail">🏞️ Trail Manager</Nav.Link>
                        </Container>
                    </Navbar>
                    <Navbar className="bg-body-tertiary my-4">
                        <Container>
                            <Nav.Link className="hover" href="/AdminControlPanel?option=bench">📌 Bench Manager</Nav.Link>
                        </Container>
                    </Navbar>
                    <hr />
                </div> }
                <div className="col-12 col-md-9">
                    {selectedOption === 'profiles' && <Profilecontrolpanel />}
                    {selectedOption === 'videos' && <Videocontrolpanel />}
                    {selectedOption === 'feedback' && <FeedbackControlPanel />}
                    {selectedOption === 'trail' && <TrailControlPanel />}
                    {selectedOption === 'bench' && <BenchControlPanel />}
                </div>
                </div>
            </div>
            
        //</div>//Might delete. End of outer Layer- Background
    );
};

export default AdminControlPanel;
