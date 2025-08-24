import React, { useState } from 'react';

// Import global CSS file
import '../interfaceSettings.css';

// OpenStreetMap
import Map from '../components/Map/Map.js';

// Import images
import goldMapThumbnail from '../assets/images/goldMapThumbnail.png';
import greenMapThumbnail from '../assets/images/greenMapThumbnail.png';
import grayMapThumbnail from '../assets/images/grayMapThumbnail.png';

const Home = () => {
  const [trailId, setTrailId] = useState('673e9addbf9ebe061ef810c1');

  const handleClick = (trail) => {
    setTrailId(trail);
  };

  return (
    <div className="container-xl rounded border" style={{ background: '#ffffff' }}>
      <h1 className='pt-4'>Trail Map</h1>
      <p className='lead text-center'>
        Explore our interactive trail map by selecting one of the routes below. 
        Use the bench toggle to show or hide important points of interest along each trail, 
        making it easier to plan your adventure.
      </p>
      <section id="trailmaps">
        <div className="container my-4">
          <Map trailId={trailId} />
          <div className="row justify-content-center my-4">
            <div className="col-12 col-sm-12 col-md-4 mb-3">
              <button
                onClick={() => handleClick('673e9addbf9ebe061ef810bf')}
                className="btn btn-trail btn-gold w-100"
                style={{ backgroundImage: `url(${goldMapThumbnail})` }}
              >
              </button>
            </div>
            <div className="col-12 col-sm-12 col-md-4 mb-3">
              <button
                onClick={() => handleClick('673e9addbf9ebe061ef810c1')}
                className="btn btn-trail btn-green w-100"
                style={{ backgroundImage: `url(${greenMapThumbnail})` }}
              >
              </button>
            </div>
            <div className="col-12 col-sm-12 col-md-4 mb-3">
              <button
                onClick={() => handleClick('673e9addbf9ebe061ef810c0')}
                className="btn btn-trail btn-gray w-100"
                style={{ backgroundImage: `url(${grayMapThumbnail})` }}
              >
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;