// Import React components
import React from 'react';

// Import global stylesheet
import '../interfaceSettings.css';

const Privacy = () => {
    return (
        <section id="privacy" className="container mt-5">
            <h1>Privacy Policy</h1>
            <p>
                We will not obtain personally identifying information about you when you visit our site, unless you choose to register an account with us. You may volunteer to provide us personally identifying information so that the College can respond to any questions or provide you with information. Except as might be required by law, we do not share any information we receive with any outside parties.
            </p>
            <h2>Information Collected and Stored Automatically</h2>
            <p>
                If you do nothing during your visit but browse through the app, website, read pages, or download information, we will gather and store certain information about your visit automatically. This information does not identify you personally. We automatically collect and store only the following information about your visit:
            </p>
            <ul>
                <li>The date and time you access our site;</li>
                <li>The pages you visit; and</li>
                <li>If you linked to the Fitness @ Your Fingertips website from another website, the address of that website.</li>
            </ul>
            <p>
                We use this information to help us make our site more useful to visitors – to learn about the number of visitors to our site.
            </p>
            <h2>If You Send Us Personal Information</h2>
            <p>
                If you choose to provide us with demographic information by establishing an account with us, we use that information to help us provide users with information that is appropriate for them. We may also use your information to contact you in the future about special events related to the app that may be of interest. You may always opt-out of receiving future mailings; see the "Opt Out" section below.
            </p>
            <p>
                We may collect demographic information to report app usage data in research projects. We do not collect personal information for any other purposes. The information you provide is not given to any private organizations or private persons.
            </p>
            <h2>Opting-Out or Changing Your Contact Information</h2>
            <p>
                Our online community app provides users the opportunity to opt-out of receiving communications from us through a special online form. You may choose to receive only specific communications or none at all. You may also update your contact information previously provided to us through an online form. You cannot remove yourself from our database, but you can prevent unwanted communication.
            </p>
        </section>
    );
};

export default Privacy;
