// Import React components
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

// Import global stylesheet & images
import '../interfaceSettings.css';
import pic1 from '../assets/images/Landing1.jpg';
import pic2 from '../assets/images/landingExercise.jpg';
import pic3 from '../assets/images/technique1.jpg';
import pic4 from '../assets/images/lunge1.jpg';
import pic5 from '../assets/images/injury2.jpg';
import pic6 from '../assets/images/nutrition1.jpg';

const Landing = () => {
  return (
    <Container className="my-4">
      {/* Showcase Section */}
      <section id="showcase">
        <Card className="shadow-sm">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={pic1} alt="GGC Trails" fluid className="rounded mx-auto" />
            </Col>
            <Col md={6} className="p-3 p-md-5">
              <h1>Walking Trails</h1>
              <p className="lead my-4">
                The Walking Trails App is a mobile application designed to enhance the walking experience on Georgia Gwinnett College (GGC) trails through interactive and educational content focused on fitness, health, and wellness. This project is a collaborative effort between ITEC students, who are responsible for app development, and EXSC students, who create the content.
              </p>
              <Link to="/authorization" className="btn btn-primary mt-3 w-100">
                <i className="bi bi-chevron-right"></i> <span>Sign In</span>
              </Link>
            </Col>
          </Row>
        </Card>
      </section>

      {/* Body Weight Exercises Section */}
      <section id="exercise">
        <Card className="shadow-sm my-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={pic2} alt="Personalized workout tutorials" fluid className="rounded mx-auto" />
            </Col>
            <Col md={6} className="p-3 p-md-5">
              <h2>Body Weight Exercises</h2>
              <p className="lead">Try a variety of body-weight exercises to build strength and endurance.</p>
              <Link to="/authorization" className="btn btn-primary mt-3 w-100">
                <i className="bi bi-chevron-right"></i> <span>Exercises</span>
              </Link>
            </Col>
          </Row>
        </Card>
      </section>

      {/* Proper Walking Techniques Section */}
      <section id="properWalkingTechniques">
        <Card className="shadow-sm my-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={pic3} alt="Proper Walking Techniques" fluid className="rounded mx-auto" />
            </Col>
            <Col md={6} className="p-3 p-md-5">
              <h2>Proper Walking Techniques</h2>
              <p className="lead">Learn techniques to improve your walking posture and efficiency.</p>
              <Link to="/authorization" className="btn btn-primary mt-3 w-100">
                <i className="bi bi-chevron-right"></i> <span>Proper Walking Techniques</span>
              </Link>
            </Col>
          </Row>
        </Card>
      </section>

      {/* Stretches For Walking Section */}
      <section id="stretchesForWalking">
        <Card className="shadow-sm my-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={pic4} alt="Stretches for Walking" fluid className="rounded mx-auto" />
            </Col>
            <Col md={6} className="p-3 p-md-5">
              <h2>Stretches For Walking</h2>
              <p className="lead">Enhance flexibility and prevent injuries with these essential stretches.</p>
              <Link to="/authorization" className="btn btn-primary mt-3 w-100">
                <i className="bi bi-chevron-right"></i> <span>Stretches For Walking</span>
              </Link>
            </Col>
          </Row>
        </Card>
      </section>

      {/* Nutrition and Hydration Section */}
      <section id="nutritionAndHydration">
        <Card className="shadow-sm my-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={pic6} alt="Nutrition and Hydration" fluid className="rounded mx-auto" />
            </Col>
            <Col md={6} className="p-3 p-md-5">
              <h2>Nutrition and Hydration</h2>
              <p className="lead">Fuel your body with the right nutrients and stay hydrated for better performance.</p>
              <Link to="/authorization" className="btn btn-primary mt-3 w-100">
                <i className="bi bi-chevron-right"></i> <span>Nutrition and Hydration</span>
              </Link>
            </Col>
          </Row>
        </Card>
      </section>

      {/* Injury Prevention Section */}
      <section id="injuryPrevention">
        <Card className="shadow-sm my-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center">
              <Image src={pic5} alt="Injury Prevention" fluid className="rounded mx-auto" />
            </Col>
            <Col md={6} className="p-3 p-md-5">
              <h2>Injury Prevention</h2>
              <p className="lead">Learn tips and techniques to prevent injuries and stay active.</p>
              <Link to="/authorization" className="btn btn-primary mt-3 w-100">
                <i className="bi bi-chevron-right"></i> <span>Injury Prevention</span>
              </Link>
            </Col>
          </Row>
        </Card>
      </section>
    </Container>
  );
};

export default Landing;
