import React, { useState, useEffect } from 'react';
import { Card, Dropdown, Button, Form, Modal } from 'react-bootstrap';
import {
    getAllBenches,
    createBench,
    updateBench,
    deleteBench,
    addVideoToBench,
    deleteVideoFromBench,
} from '../../api/index.js';

const BenchControlPanel = () => {
    const [benches, setBenches] = useState([]);
    const [newBenchForm, setNewBenchForm] = useState({ bench_number: '', location: '', latitude: '', longitude: '' });
    const [selectedBench, setSelectedBench] = useState(null);
    const [form, setForm] = useState({ bench_number: '', location: '', latitude: '', longitude: '' });
    const [videoForm, setVideoForm] = useState({ title: '', url: '' });
    const [showDeleteBenchModal, setShowDeleteBenchModal] = useState(false);
    const [showDeleteVideoModal, setShowDeleteVideoModal] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);

    const fetchBenches = async () => {
        try {
            const { data } = await getAllBenches();
            setBenches(data);
        } catch (err) {
            console.error('Failed to fetch benches:', err);
        }
    };

    useEffect(() => {
        fetchBenches();
    }, []);

    const handleSelectBench = (benchId) => {
        const bench = benches.find((b) => b._id === benchId);
        setSelectedBench(bench);
        setForm(bench);
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleVideoInputChange = (e) => {
        setVideoForm({ ...videoForm, [e.target.name]: e.target.value });
    };

    const handleNewBenchInputChange = (e) => {
        setNewBenchForm({ ...newBenchForm, [e.target.name]: e.target.value });
    };    

    const handleCreateBench = async () => {
        try {
            await createBench({
                bench_number: Number(newBenchForm.bench_number),
                latitude: Number(newBenchForm.latitude),
                longitude: Number(newBenchForm.longitude),
                location: newBenchForm.location,
            });
            fetchBenches();
            setNewBenchForm({ bench_number: '', location: '', latitude: '', longitude: '' });
        } catch (err) {
            console.error('Error creating bench:', err);
        }
    };

    const handleUpdateBench = async () => {
        try {
            await updateBench(selectedBench._id, form);
            await refreshAndReselectBench(selectedBench._id);
            fetchBenches();
        } catch (err) {
            console.error('Error updating bench:', err);
        }
    };

    const handleDeleteBench = async () => {
        try {
            await deleteBench(selectedBench._id);
            setSelectedBench(null);
            fetchBenches();
        } catch (err) {
            console.error('Error deleting bench:', err);
        }
    };

    const handleAddVideo = async () => {
        try {
            await addVideoToBench(selectedBench._id, videoForm);
            await refreshAndReselectBench(selectedBench._id);
            fetchBenches();
            setVideoForm({ title: '', url: '' });
        } catch (err) {
            console.error('Error adding video:', err);
        }
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            await deleteVideoFromBench(selectedBench._id, videoId);
            await refreshAndReselectBench(selectedBench._id);
            fetchBenches();
        } catch (err) {
            console.error('Error deleting video:', err);
        }
    };

    const refreshAndReselectBench = async (benchId) => {
        try {
            const { data } = await getAllBenches();
            setBenches(data);
            const updatedBench = data.find(b => b._id === benchId);
            setSelectedBench(updatedBench || null);
        } catch (err) {
            console.error('Failed to refresh bench:', err);
        }
};


    return (
        <div className="p-4">
            <h3>Bench Management</h3>

            <Card className="mt-4 p-4 shadow-sm">
                <h4>Create New Bench</h4>
                <Form>
                    <Form.Group controlId="newBenchNumber">
                        <Form.Label>Bench Number</Form.Label>
                        <Form.Control
                            name="bench_number"
                            type="number"
                            value={newBenchForm.bench_number}
                            onChange={handleNewBenchInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="newLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            name="location"
                            value={newBenchForm.location}
                            onChange={handleNewBenchInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="newLatitude">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control
                            name="latitude"
                            value={newBenchForm.latitude}
                            onChange={handleNewBenchInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="newLongitude">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control
                            name="longitude"
                            value={newBenchForm.longitude}
                            onChange={handleNewBenchInputChange}
                        />
                    </Form.Group>

                    <Button className="mt-3" onClick={handleCreateBench}>Create Bench</Button>
                </Form>
            </Card>

            <Card className="mt-4 p-4 shadow-sm">
                <h4>Select a Bench</h4>
                <Dropdown onSelect={handleSelectBench}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-bench">
                        {selectedBench ? `Bench ${selectedBench.bench_number}` : 'Choose Bench'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {[...benches]
                            .sort((a, b) => a.bench_number - b.bench_number)
                            .map((bench) => (
                                <Dropdown.Item eventKey={bench._id} key={bench._id}>
                                    Bench #{bench.bench_number}
                                </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {selectedBench && (
                    <div className="mt-4">
                        <h5>Edit Bench</h5>
                        <Form>
                            <Form.Group controlId="formBenchNumber">
                                <Form.Label>Bench Number</Form.Label>
                                <Form.Control
                                    name="bench_number"
                                    type="number"
                                    value={form.bench_number}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    name="location"
                                    value={form.location}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formLatitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    name="latitude"
                                    value={form.latitude}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formLongitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    name="longitude"
                                    value={form.longitude}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <div className="mt-3 d-flex gap-2">
                                <Button variant="primary" onClick={handleUpdateBench}>Update</Button>
                                <Button variant="danger" onClick={() => setShowDeleteBenchModal(true)}>Delete</Button>
                            </div>
                        </Form>

                        <hr />

                        <h5>Bench Videos</h5>
                        <ul>
                            {selectedBench.videos?.map((video) => (
                                <li key={video._id}>
                                    {video.title} - <a href={video.url} target="_blank" rel="noreferrer">watch</a>
                                    <Button
                                        variant="link"
                                        className="text-danger"
                                        onClick={() => {
                                            setVideoToDelete(video._id);
                                            setShowDeleteVideoModal(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </li>
                            ))}
                        </ul>

                        <Form className="mt-3">
                            <Form.Group controlId="videoTitle">
                                <Form.Label>Video Title</Form.Label>
                                <Form.Control name="title" value={videoForm.title} onChange={handleVideoInputChange} />
                            </Form.Group>
                            <Form.Group controlId="videoUrl">
                                <Form.Label>Video URL</Form.Label>
                                <Form.Control name="url" value={videoForm.url} onChange={handleVideoInputChange} />
                            </Form.Group>
                            <Button className="mt-2" onClick={handleAddVideo}>Add Video</Button>
                        </Form>
                    </div>
                )}
            </Card>
            <Modal show={showDeleteBenchModal} onHide={() => setShowDeleteBenchModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete bench #{selectedBench?.bench_number}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowDeleteBenchModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={async () => {
                            await handleDeleteBench();
                            setShowDeleteBenchModal(false);
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteVideoModal} onHide={() => setShowDeleteVideoModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this video?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowDeleteVideoModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={async () => {
                            if (videoToDelete) {
                                await handleDeleteVideo(videoToDelete);
                                setShowDeleteVideoModal(false);
                                setVideoToDelete(null);
                            }
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BenchControlPanel;
