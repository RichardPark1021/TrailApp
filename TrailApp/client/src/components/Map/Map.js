import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as api from '../../api/index.js';
import '../../interfaceSettings.css';

function Map({ trailId }) {
  const [trailData, setTrailData] = useState(null);
  const [benches, setBenches] = useState([]);
  const [showMarkers, setShowMarkers] = useState(false);
  const mapRef = useRef(null);

  // Fetch benches from DB
  useEffect(() => {
    const fetchBenches = async () => {
      try {
        const response = await api.getAllBenches();
        setBenches(response.data);
      } catch (error) {
        console.error('Error fetching benches:', error);
      }
    };

    fetchBenches();
  }, []);

  // Fetch trail data
  useEffect(() => {
    setTrailData(null);

    const fetchTrail = async () => {
      try {
        const response = await api.getTrail(trailId);
        setTrailData(response.data);
      } catch (error) {
        console.error('Error fetching trail:', error);
      }
    };

    if (trailId) {
      fetchTrail();
    }
  }, [trailId]);

  const getTrailColor = (trailId) => {
    switch (trailId) {
      case '673e9addbf9ebe061ef810bf':
        return 'gold';
      case '673e9addbf9ebe061ef810c1':
        return 'green';
      case '673e9addbf9ebe061ef810c0':
        return 'gray';
      default:
        return 'blue';
    }
  };

  return (
    <div>
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="markerToggle"
          checked={showMarkers}
          onChange={() => setShowMarkers((prev) => !prev)}
        />
        <label className="form-check-label" htmlFor="markerToggle">
          {showMarkers ? 'Hide Benches' : 'Show Benches'}
        </label>
      </div>

      <MapContainer
        className='rounded overflow-hidden'
        ref={mapRef}
        center={[33.9804327949268, -84.00527240759934]}
        zoom={16}
        minZoom={16}
        maxZoom={18}
        scrollWheelZoom={true}
        maxBounds={[[33.97290, -84.01816], [33.98888, -83.99438]]}
        maxBoundsViscosity={1.0}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {trailData?.path && (
          <Polyline
            positions={trailData.path.coordinates.map(coord => [coord[1], coord[0]])}
            color={getTrailColor(trailId)}
            weight={6}
          />
        )}

        {showMarkers && benches.map((bench) => (
          <Marker
            key={bench._id}
            position={[bench.latitude, bench.longitude]}
            icon={L.divIcon({
              className: 'custom-loader-icon',
              html: `<div class="loader"></div>`,
              iconSize: [50, 50],
              iconAnchor: [23, 25],
            })}
            popupAnchor={[-35, -80]}
          >
            <Popup>
              <h5>{`Bench ${bench.bench_number}`}</h5>
              <p>{bench.location}</p>
              {bench.videos?.map((video, idx) => (
                <p key={idx}>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    {video.title}
                  </a>
                </p>
              ))}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
