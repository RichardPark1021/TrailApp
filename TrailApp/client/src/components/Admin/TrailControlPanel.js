import React, { useState, useEffect } from 'react';
import Map from '../Map/Map.js';
import {
    Table,
    Button,
    FormControl,
    InputGroup,
    Dropdown,
    DropdownButton,
    Modal
} from 'react-bootstrap';

import {
    getAllTrails,
    updateTrailCoordinate,
    deleteTrailCoordinate,
    insertTrailCoordinate
} from '../../api/index.js';

const TrailControlPanel = () => {
    const [trails, setTrails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTrail, setSelectedTrail] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [coordToDelete, setCoordToDelete] = useState(null);
    const [editableCoords, setEditableCoords] = useState([]);
    const [newCoord, setNewCoord] = useState({ lat: '', lng: '' });
    const [mapRenderKey, setMapRenderKey] = useState(0); //reload map when saving

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllTrails();
            setTrails(result.data);
        };
        fetchData();
    }, []);

    const filteredTrails = trails.filter(trail =>
        trail.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectTrail = (trail) => {
        setSelectedTrail(trail);
        setEditableCoords([...trail.path.coordinates]);
    };

    const handleCoordChange = (index, value, type) => {
        const newCoords = [...editableCoords];
        newCoords[index][type === 'lat' ? 0 : 1] = parseFloat(value);
        setEditableCoords(newCoords);
    };

    const handleUpdateCoordinate = async (index) => {
        if (!selectedTrail) return; // Prevent action if no trail is selected

        const [latitude, longitude] = editableCoords[index];
        const trailId = selectedTrail._id;
        await updateTrailCoordinate(trailId, index, { latitude, longitude });

        const updated = await getAllTrails();
        setTrails(updated.data);

        const updatedTrail = updated.data.find(t => t._id === trailId);
        setSelectedTrail(updatedTrail);
        setEditableCoords([...updatedTrail.path.coordinates]);

        //trigger map re-render
        setMapRenderKey(prev => prev + 1);
    };

    const handleDeleteCoordinate = async (index) => {
        if (!selectedTrail) return; // Prevent action if no trail is selected

        const trailId = selectedTrail._id;
        await deleteTrailCoordinate(trailId, index);

        const updated = await getAllTrails();
        setTrails(updated.data);

        const updatedTrail = updated.data.find(t => t._id === trailId);
        setSelectedTrail(updatedTrail);
        setEditableCoords([...updatedTrail.path.coordinates]);
    };

    const handleInsertCoordinateBelow = async (index) => {
        if (!selectedTrail) return; // Prevent action if no trail is selected

        if (newCoord.lat === '' || newCoord.lng === '') {
            alert('Please provide both latitude and longitude');
            return;
        }

        const trailId = selectedTrail._id;
        const coordinate = [parseFloat(newCoord.lat), parseFloat(newCoord.lng)];

        // Insert the coordinate below the current index
        await insertTrailCoordinate(trailId, index + 1, coordinate);

        const updated = await getAllTrails();
        setTrails(updated.data);

        const updatedTrail = updated.data.find(t => t._id === trailId);
        setSelectedTrail(updatedTrail);
        setEditableCoords([...updatedTrail.path.coordinates]);

        setNewCoord({ lat: '', lng: '' });
    };

    return (
        <div className="p-4">
            <h3>Trail Management</h3>

            {/* Map should only render if a trail is selected */}
            {selectedTrail && <Map trailId={selectedTrail._id} key={`${editableCoords.length}-${mapRenderKey}`} />}

            <DropdownButton className='mt-3' variant="secondary" id="dropdown-trail" title="Select Trail">
                {filteredTrails.map((trail) => (
                    <Dropdown.Item
                        key={trail._id}
                        onClick={() => handleSelectTrail(trail)}
                    >
                        {trail.name}
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            {selectedTrail && (
                <div className="container mt-4 card p-4 shadow-sm">
                    <h4 className="mb-3">Coordinates for {selectedTrail.name}</h4>

                    {/* Add a form for inserting a new coordinate */}
                    <div className="mb-3">
                        <h5>Add New Coordinate</h5>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="number"
                                placeholder="Latitude"
                                value={newCoord.lng}
                                onChange={(e) => setNewCoord({ ...newCoord, lng: e.target.value })}
                                step="any"
                            />
                            <FormControl
                                type="number"
                                placeholder="Longitude"
                                value={newCoord.lat}
                                onChange={(e) => setNewCoord({ ...newCoord, lat: e.target.value })}
                                step="any"
                            />
                        </InputGroup>
                    </div>

                    {/* Disable the "Insert at End" button if no trail is selected */}
                    <Button
                        variant="primary"
                        onClick={() => handleInsertCoordinateBelow(editableCoords.length - 1)}
                        disabled={!selectedTrail}  // Disable if no trail is selected
                    >
                        Insert at End
                    </Button>

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Save</th> 
                                <th>Insert Below</th> 
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editableCoords.map((coord, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            value={coord[1]}
                                            onChange={(e) => handleCoordChange(index, e.target.value, 'lng')}
                                            step="any"
                                        />
                                    </td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            value={coord[0]}
                                            onChange={(e) => handleCoordChange(index, e.target.value, 'lat')}
                                            step="any"
                                        />
                                    </td>
                                    {/* Action buttons in their own columns */}
                                    <td>
                                        <Button
                                            variant="success"
                                            className='btn-primary'
                                            size="sm"
                                            onClick={() => handleUpdateCoordinate(index)}
                                            disabled={!selectedTrail}  // Disable if no trail is selected
                                        >
                                            Save
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="success"
                                            className='btn-primary'
                                            size="sm"
                                            onClick={() => handleInsertCoordinateBelow(index)}
                                            disabled={!selectedTrail}  // Disable if no trail is selected
                                        >
                                            Insert
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                setCoordToDelete(index);
                                                setShowDeleteModal(true);
                                            }}
                                            disabled={!selectedTrail}  // Disable if no trail is selected
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete coordinate #{coordToDelete + 1}?</p>
                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="primary"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="me-2"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={async () => {
                                        await handleDeleteCoordinate(coordToDelete);
                                        setShowDeleteModal(false);
                                        setCoordToDelete(null);
                                    }}
                                >
                                    Confirm Delete
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </div>
    );
};


export default TrailControlPanel;
