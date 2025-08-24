// Import React components
import React, { useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import page components & styling
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Navbar/Footer.js';
import PrivateRoute from './api/PrivateRoutes.js';

// Import pages
import Landing from './pages/Landing.js';
import Authorization from './pages/Authorization.js';
import AdminHome from './pages/AdminHome.js'
import AdminControlPanel from './pages/AdminControlPanel.js'
import AdminAnalytics from './pages/AdminAnalytics.js'
import UserHome from './pages/UserHome.js'
import UserControlPanel from './pages/UserControlPanel.js';
import Trails from './pages/Trails.js';
import BodyWeightExercises from './pages/BodyWeightExercises.js';
import ProperWalkingTechniques from './pages/ProperWalkingTechniques.js';
import StrechesForWalking from './pages/StretchesForWalking.js';
import InjuryPrevention from './pages/InjuryPrevention.js';
import NutritionandHydration from './pages/Nutrition&Hydration.js';
import About from './pages/About.js'
import Privacy from './pages/Privacy.js'
import ResetPassword from './pages/ResetPassword.js';
import SendResetLink from './components/Form/SendResetLink.js';

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem('roleType'));

        if (userProfile) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="pages d-flex flex-column min-vh-100">
                <Navbar />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={isSignedIn ? <UserHome /> : <Landing />} />
                    <Route path="/authorization" element={< Authorization />} />
                    <Route path="/about" element={< About />} />
                    <Route path="/privacy" element={< Privacy />} />
                    <Route path="/reset/:token" element={<ResetPassword />} /> {/* Reset Password Route */}
                    <Route path="/send-reset-link" element={<SendResetLink />} /> {/* Send Reset Link Route */}

                    {/* Authorized Routes */}
                    <Route element={<PrivateRoute allowedRoles={['Admin', 'User']} />}>
                        <Route path="/userHome" element={< UserHome />} />
                        <Route path="/userControlPanel" element={< UserControlPanel />} />
                        <Route path="/trails" element = {< Trails />}/>
                        <Route path="/properWalkingTechniques" element = {< ProperWalkingTechniques />}/>
                        <Route path="/strechesForWalking" element = {< StrechesForWalking />}/>
                        <Route path="/bodyWeightExercises" element = {< BodyWeightExercises />}/>
                        <Route path="/injuryPrevention" element={< InjuryPrevention />} />
                        <Route path="/nutritionandHydration" element={< NutritionandHydration />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
                        <Route path="/adminHome" element={< AdminHome />} />
                        <Route path="/adminControlPanel" element={< AdminControlPanel />} />
                        <Route path="/adminAnalytics" element={< AdminAnalytics />} />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
