// Import React component
import React from 'react';

// Import global stylesheet
import '../interfaceSettings.css';
import pic1 from '../assets/images/drKaren.png';
import pic2 from '../assets/images/drWals.png';
import pic3 from '../assets/images/drCorey.png';

const About = () => {
    return (
        <section id="about" className="container mt-5">
            <center><h1>About Us</h1>
            <p>About Us
            Welcome to Grizzly Fitness at Your Fingertips.
            The origin of this software application is the result of a Georgia Gwinnett College (GGC) experiential 
            learning collaborative project in the Department of Exercise Science and the Department of Information 
            Technology. The application itself was created by software development undergraduate students while exercise 
            science clinical and health promotion students created the fitness video content. The content 
            presented in the application is based upon scientific evidence and principles supported by the 
            American College of Sports Medicine (ACSM). This project was supported, in part through GGC STEC 
            4500 research mini grant and a GGC Research SEED grant funds.
            </p>
            <h3>Dr. Karen Lee Perell-Gerson</h3>
            <img
                src={pic1}
                alt="Dr. Karen Lee Perell-Gerson"
                className="img-fluid p-3"
              />
            <br/>
            <p>Dr. Perell-Gerson has served as a faculty member at the collegiate and graduate levels with appointments at UCLA and California State University, Fullerton. Her primary area of practice and research has been in kinesiotherapy and biomechanics, specifically, the movement patterns presented with chronic diseases. At Georgia Gwinnett College, she examines the benefits of an applied learning environment that allows the student to be part of the research process and be prepared for career development.</p>
            <h3>Dr. Kristie Walsdorf</h3>
            <img
                src={pic2}
                alt="Dr. Kristie Walsdorf"
                className="img-fluid p-3"
              />
            <br/>
            <p>Dr. Kristie Walsdorf graduated from Florida State University with a doctorate in physical education teacher education. While working on her Ph.D. she served as a full-time instructor in the Department of Kinesiology at Valdosta State University for four years. After leaving VSU, she was hired as an assistant professor of physical education teacher education at her alma mater, Florida State University. Walsdorf taught a variety of PETE undergraduate and graduate courses in addition to managing the student teaching internship program for seven years.</p>
            <h3>Ms. Cindie A. Corey</h3>
            <img
                src={pic3}
                alt="Ms. Cindie A. Corey"
                className="img-fluid p-3"
              />
            <br/>
            <p>Ms. Cindie Corey is an instructor in the exercise science and physical education disciplines.</p>
            </center>
        </section>
    );
};

export default About;