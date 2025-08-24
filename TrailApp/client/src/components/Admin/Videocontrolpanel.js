import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputGroup, Badge } from 'react-bootstrap';
import { fetchVideos, deleteVideo } from '../../api/index.js';

const Videocontrolpanel = () => {
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchVideos();
                setVideos(result.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteVideo(id);
            setVideos(videos.filter(video => video._id !== id));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    const getCategoryBadgeColor = (category) => {
        switch (category?.toLowerCase()) {
            case 'health': return 'success';
            case 'exercise': return 'info';
            case 'proper walking techniques': return 'primary';
            case 'nutrition': return 'warning';
            case 'hydration': return 'info';
            case 'injury prevention': return 'danger';
            default: return 'secondary';
        }
    };

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='p-4'>
            <h3>Video Management</h3>
            <div className="container col-lg-12 col-md-12 p-3 pb-3 text-center card shadow-sm">
                <div className="col-lg-12 mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <InputGroup>
                        <InputGroup.Text>🔎</InputGroup.Text>
                        <FormControl
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Videos"
                            required
                            style={{ marginRight: '8px' }}
                        />
                    </InputGroup>
                </div>
                <hr />
                <div className="video-grid">
                    <div className="video-grid-header" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr 1fr 0.5fr 0.5fr 1fr',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #ccc',
                        padding: '10px 0'
                    }}>
                        <span>Video</span>
                        <span>Video Title</span>
                        <span>Category</span>
                        <span>Likes</span>
                        <span>Dislikes</span>
                        <span>Actions</span>
                    </div>

                    {filteredVideos.length > 0 ? (
                        filteredVideos.map((video, index) => (
                            <div className="video-grid-row" key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 2fr 1fr 0.5fr 0.5fr 1fr',
                                alignItems: 'center',
                                padding: '12px 0',
                                borderBottom: '1px solid #eee'
                            }}>
                                <div className="video-cell">
                                    <iframe
                                        src={video.url}
                                        title={video.title}
                                        width="100%"
                                        height="80"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <div className="title-cell">{video.title}</div>
                                <div className="category-cell">
                                    <Badge bg={getCategoryBadgeColor(video.category)}>
                                        {video.category}
                                    </Badge>
                                </div>
                                <div>{video.likes || 0}</div>
                                <div>{video.dislikes || 0}</div>
                                <div>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => handleDelete(video._id)}
                                    >
                                        <i className="fas fa-trash-alt me-1"></i>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="video-grid-row">
                            <span style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                                No results found
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Videocontrolpanel;