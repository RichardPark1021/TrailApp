//Import React and interface setings
import React from "react";
import '../interfaceSettings.css';


const Consent = ()=>{
    return(
        <section id="consent" className="container md-5">
            <h1>User Consent</h1>
            <p><strong>Effective Date: March 19, 2025</strong></p>
            <h2>Introduction</h2>
            <p> By signing up for GGC Trails, you agree to provide data to be used in accordance with this consent form and our User Privacy Policy.</p>

            <h2>Data Collection and Purpose</h2>
            <p>We collect your username and email address, along with any consensual information you provide, including but not limited to: 
                <ul>
                    <li>Age</li>
                    <li>Gender</li>
                    <li>Ethnicity</li>
                    <li>If you are part of the GGC community:
                         (current student, alumni, faculty, staff, visitor, or if you're not part of the campus but choose to use our facilities)</li>
                </ul>
            </p>
            <h2>User Rights</h2>
            <p>You have the right to access, update or delete your personal information at any time.</p>
            <h2>Consent Confirmation</h2>
            <p>By completing the application, you consent to the collection, storage, and use of your data in accordance with the above and our User Privacy Policy.</p>
            <h2>Contact Info</h2>
            <p>For questions or concerns, please contact us at placeholder@ggc.edu.</p>
        </section>
    );
};
export default Consent;