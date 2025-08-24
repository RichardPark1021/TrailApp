import React, { useState, useEffect } from 'react';
import '../interfaceSettings.css';
import * as api from '../api/index.js';

const StrechesForWalking = () => {
    const [likeCounts, setLikeCounts] = useState([]);
    const [dislikeCounts, setDislikeCounts] = useState([]);
    const [videos, setVideos] = useState([]); // State to hold fetched videos
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await api.fetchVideos(); // Fetch all videos from the API
                setVideos(data); // Set videos from response
                setLikeCounts(Array(data.length).fill(0)); // Initialize like counts
                setDislikeCounts(Array(data.length).fill(0)); // Initialize dislike counts
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchVideos(); // Call the function to fetch videos
    }, []);

    const handleLike = (index) => {
        const newLikes = [...likeCounts];
        newLikes[index]++;
        setLikeCounts(newLikes);
        // Add logic here to update the like count on the server if necessary
    };

    const handleDislike = (index) => {
        const newDislikes = [...dislikeCounts];
        newDislikes[index]++;
        setDislikeCounts(newDislikes);
        // Add logic here to update the dislike count on the server if necessary
    };

    const categories = {
        "Stretching": videos.filter(video => video.subCategory === "Stretching"),
    };

    if (loading) {
        return <p>Loading videos...</p>; // Loading state UI
    }

    return (
        <section id="exercises" className="container mt-5">
            <h1>Stretches For Walking</h1>
            <p className='text-center'>
                Welcome to the Stretches For Walking library! This section offers videos focused on stretches to enhance your walking experience and prevent injuries.
            </p>

            <div className="row">
                {Object.keys(categories).map((category, catIndex) => (
                    <div className="col-md-12" key={catIndex}> {/* Full width for category section */}
                        <div className="card mb-4">
                            <div className="card-body">
                                
                                <div className="row">
                                    {categories[category].map((video, index) => (
                                        <div className="col-md-6 my-4" key={video._id}> {/* Individual video in each column */}
                                            <div className="card">
                                                <div className="card-body">
                                                    <h3 className="card-title">{video.title}</h3>
                                                    <div className="ratio ratio-16x9">
                                                        <iframe
                                                            src={video.url} // Use the url property for the iframe
                                                            title={video.title}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                    <p>Views: {video.views}</p> {/* Displaying the view count */}
                                                    <div className="feedback mt-2">
                                                        <button
                                                            className="thumb-btn thumbs-up" 
                                                            onClick={() => handleLike(index)}
                                                        >
                                                            <i className="fas fa-thumbs-up"></i> {likeCounts[index]}
                                                        </button>
                                                        <button
                                                            className="thumb-btn thumbs-down" 
                                                            onClick={() => handleDislike(index)}
                                                        >
                                                            <i className="fas fa-thumbs-down"></i> {dislikeCounts[index]}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StrechesForWalking;
