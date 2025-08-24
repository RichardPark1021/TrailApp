import React, { useState, useEffect } from 'react';
import '../interfaceSettings.css';
import * as api from '../api/index.js'; // Import your API functions

// Nutrition Component
const Nutrition = () => {
    const [videos, setVideos] = useState([]); // State to hold fetched videos
    const [likeCounts, setLikeCounts] = useState([]); // Track likes for each video
    const [dislikeCounts, setDislikeCounts] = useState([]); // Track dislikes for each video
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await api.fetchVideos(); // Fetch all videos from the API
                // Filter videos where category is "Nutrition"
                const nutritionVideos = data.filter(video => video.category === "Nutrition");
                setVideos(nutritionVideos); // Set videos from response
                setLikeCounts(Array(nutritionVideos.length).fill(0)); // Initialize like counts
                setDislikeCounts(Array(nutritionVideos.length).fill(0)); // Initialize dislike counts
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchVideos(); // Call the function to fetch videos
    }, []);

    // Functions for handling likes
    const handleLike = (index) => {
        const newLikes = [...likeCounts];
        newLikes[index]++;
        setLikeCounts(newLikes);
        // Logic to update like count on the server if necessary
    };

    // Functions for handling dislikes
    const handleDislike = (index) => {
        const newDislikes = [...dislikeCounts];
        newDislikes[index]++;
        setDislikeCounts(newDislikes);
        // Logic to update dislike count on the server if necessary
    };

    if (loading) {
        return <p>Loading videos...</p>; // Loading state UI
    }

    return (
        <section id="nutrition" className="container mt-5">
            <h1>Nutrition</h1>
            <p>
                Welcome to the Nutrition section! Here you will find information about healthy eating, meal plans, and nutrition tips.
            </p>

            <div className="row">
                {videos.map((video, index) => (
                    <div className="col-md-6 mb-4" key={video._id}>
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">{video.description}</h2>
                                <p className="card-text">{video.title}</p>
                                <div className="video-section mb-4">
                                    <h3>{video.title}</h3>
                                    <div className="ratio ratio-16x9">
                                        <iframe
                                            src={video.url} // Use the src property for the iframe
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="feedback mt-2">
                                        <button className="btn btn-outline-success" onClick={() => handleLike(index)}>👍 {likeCounts[index]}</button>
                                        <button className="btn btn-outline-danger" onClick={() => handleDislike(index)}>👎 {dislikeCounts[index]}</button>
                                        <p>Views: {video.views || 0}</p> {/* Display view count */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Nutrition;
