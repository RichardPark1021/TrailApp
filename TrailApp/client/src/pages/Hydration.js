import React, { useState, useEffect } from 'react';

// Import global stylesheet
import '../interfaceSettings.css';
import * as api from '../api/index.js'; // Import your API functions

// Hydration Component
const Hydration = () => {
    const [videos, setVideos] = useState([]); // State to hold fetched videos
    const [likeCounts, setLikeCounts] = useState([]); // Track likes for each video
    const [dislikeCounts, setDislikeCounts] = useState([]); // Track dislikes for each video
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await api.fetchVideos(); // Fetch all videos from the API
                // Filter videos where category is "Hydration"
                const hydrationVideos = data.filter(video => video.category === "Hydration");
                setVideos(hydrationVideos); // Set videos from response
                setLikeCounts(Array(hydrationVideos.length).fill(0)); // Initialize like counts
                setDislikeCounts(Array(hydrationVideos.length).fill(0)); // Initialize dislike counts
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
        // Add logic here to update the like count on the server if necessary
    };

    // Functions for handling dislikes
    const handleDislike = (index) => {
        const newDislikes = [...dislikeCounts];
        newDislikes[index]++;
        setDislikeCounts(newDislikes);
        // Add logic here to update the dislike count on the server if necessary
    };

    if (loading) {
        return <p>Loading videos...</p>; // Loading state UI
    }

    return (
        <section id="hydration" className="container mt-5">
            <h1>Hydration</h1>
            <p>Welcome to the Hydration section! Discover the importance of staying hydrated and tips to improve your water intake.</p>

            <div className="row">
                {videos.map((video, index) => (
                    <div className="col-md-6 mb-4" key={video._id}>
                        <div className="video-section">
                            <h3>{video.title}</h3>
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src={video.url} // Use the url property for the iframe
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="feedback mt-2">
                                <button className="btn btn-outline-success" onClick={() => handleLike(index)}>👍 {likeCounts[index]}</button>
                                <button className="btn btn-outline-danger" onClick={() => handleDislike(index)}>👎 {dislikeCounts[index]}</button>
                                <p>Views: {video.views}</p> {/* Display view count */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hydration;
