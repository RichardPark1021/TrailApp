// Import React components
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Image, Container } from 'react-bootstrap';

// Import global stylesheet & images
import '../interfaceSettings.css';
import pic1 from '../assets/images/GGCWalking01.jpg';
import pic2 from '../assets/images/bodyweight1.jpg';
import pic3 from '../assets/images/GGCWalking02.jpg';
import pic4 from '../assets/images/stretch1.jpg';
import pic5 from '../assets/images/injury1.jpg';
import pic6 from '../assets/images/hydration1.jpg';

// Import User settings
import UserInfoForm from '../components/Form/UserInfoForm.js';


//Will place a header on line 27
const UserHome = () => {
  //Get username from Database/local storage
  
  const [username, setUserName] = useState('');

  useEffect(() =>{
    const storedProfile = localStorage.getItem('profile');
    if(storedProfile){
      try{
        const { result } = JSON.parse(storedProfile);
        if(result?.username){
          setUserName(result.username);
        }
      }catch (error){
        setUserName('User');
      }
    }
  }, []);

  return (
    <div className="container-xl">
      {/*Welcome User Section */}
      
      {/* Trails Section */}
      <div>
      <Container className="body-custom my-5 p-2 rounded border">
    
        <section id="user">
          <div className="container mt-5">
          <Card className="shadow-sm">
            <h1> Welcome Back, {username}!</h1>   
          </Card>
        </div>
        </section>

      <section id="showcase">
        <div className="container my-4">
          <Card className="shadow-sm">
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Image
                  src={pic1}
                  alt="GGC Trails"
                  className="img-fluid rounded mx-auto"
                />
              </Col>
              <Col md={6} className="p-3 p-md-5">
                <h1>Walking Trails</h1>
                <p className="lead my-4" style={{ textAlign: 'center' }}>
                  Discover scenic walking trails around campus designed to keep you active and engaged.
                </p>
                <Link to="/trails" className="btn btn-primary mt-3 btn-responsive btn-block">
                  <i className="bi bi-chevron-right"></i> <span>Trails</span>
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
        
      </section>
    
      {/* Body Weight Exercises Section */}
      <section id="exercise">
        <div className="container my-4">
          <Card className="shadow-sm">
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Image
                  src={pic2}
                  alt="Personalized workout tutorials"
                  className="img-fluid rounded mx-auto"
                />
              </Col>
              <Col md={6} className="p-3 p-md-5">
                <h2>Body Weight Exercises</h2>
                <p className="lead">
                  Try a variety of body-weight exercises to build strength and endurance.
                </p>
                <Link to="/bodyWeightExercises" className="btn btn-primary mt-3 btn-responsive btn-block">
                  <i className="bi bi-chevron-right"></i> <span>Exercises</span>
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
      </section>

      {/* Proper Walking Techniques Section */}
      <section id="properWalkingTechniques">
        <div className="container my-4">
          <Card className="shadow-sm">
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Image
                  src={pic3}
                  alt="Proper Walking Techniques"
                  className="img-fluid rounded mx-auto"
                />
              </Col>
              <Col md={6} className="p-3 p-md-5">
                <h2>Proper Walking Techniques</h2>
                <p className="lead">
                  Learn techniques to improve your walking posture and efficiency.
                </p>
                <Link to="/properWalkingTechniques" className="btn btn-primary mt-3 btn-responsive btn-block">
                  <i className="bi bi-chevron-right"></i> <span>Proper Walking Techniques</span>
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
      </section>

      {/* Stretches For Walking Section */}
      <section id="strechesForWalking">
        <div className="container my-4">
          <Card className="shadow-sm">
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Image
                  src={pic4}
                  alt="Stretches for Walking"
                  className="img-fluid rounded mx-auto"
                />
              </Col>
              <Col md={6} className="p-3 p-md-5">
                <h2>Stretches For Walking</h2>
                <p className="lead">
                  Enhance flexibility and prevent injuries with these essential stretches.
                </p>
                <Link to="/strechesForWalking" className="btn btn-primary mt-3 btn-responsive btn-block">
                  <i className="bi bi-chevron-right"></i> <span>Stretches For Walking</span>
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
      </section>

      {/* Nutrition and Hydration Section */}
      <section id="nutritionAndHydration">
        <div className="container my-4">
          <Card className="shadow-sm">
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Image
                  src={pic6}
                  alt="Nutrition and Hydration"
                  className="img-fluid rounded mx-auto"
                />
              </Col>
              <Col md={6} className="p-3 p-md-5">
                <h2>Nutrition and Hydration</h2>
                <p className="lead">
                  Fuel your body with the right nutrients and stay hydrated for better performance.
                </p>
                <Link to="/nutritionAndHydration" className="btn btn-primary mt-3 btn-responsive btn-block">
                  <i className="bi bi-chevron-right"></i> <span>Nutrition and Hydration</span>
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
      </section>

      {/* Injury Prevention Section */}
      <section id="injuryPrevention">
        <div className="container my-4">
          <Card className="shadow-sm">
            <Row className="align-items-center">
              <Col md={6} className="text-center">
                <Image
                  src={pic5}
                  alt="Injury Prevention"
                  className="img-fluid rounded mx-auto"
                />
              </Col>
              <Col md={6} className="p-3 p-md-5">
                <h2>Injury Prevention</h2>
                <p className="lead">
                  Learn tips and techniques to prevent injuries and stay active.
                </p>
                <Link to="/injuryPrevention" className="btn btn-primary mt-3 btn-responsive btn-block">
                  <i className="bi bi-chevron-right"></i> <span>Injury Prevention</span>
                </Link>
              </Col>
            </Row>
          </Card>
        </div>
      </section>
 
      </Container>
      </div>
    </div>
  );
};

export default UserHome;
