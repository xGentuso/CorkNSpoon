import React, { useState, useEffect } from 'react';
import { FaWineGlass, FaSpinner, FaStar } from 'react-icons/fa';
import axios from '../config/axios';
import './WinePairing.css';

function WinePairing() {
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWineRecommendations = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get('/api/wine-pairing');
                
                if (response.data?.recommendations?.length > 0) {
                    setRecommendations(response.data);
                } else {
                    throw new Error('No wine recommendations available');
                }
            } catch (err) {
                console.error('Wine recommendations error:', err);
                setError(err.response?.data?.error?.message || 'Failed to load wine recommendations');
            } finally {
                setLoading(false);
            }
        };

        fetchWineRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="wine-recommendations-container">
                <h2 className="section-title">
                    <FaWineGlass className="wine-icon" />
                    Wine Recommendations
                </h2>
                <div className="wine-content loading">
                    <FaSpinner className="spinner" />
                    <p>Loading wine recommendations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="wine-recommendations-container">
            <h2 className="section-title">
                <FaWineGlass className="wine-icon" />
                Wine Recommendations
            </h2>
            <div className="wine-content">
                {error ? (
                    <div className="wine-error">
                        <p>{error}</p>
                    </div>
                ) : recommendations && (
                    <div className="wine-grid">
                        {recommendations.recommendations.map((wine, index) => (
                            <div key={index} className="wine-card">
                                <div className="wine-image-container">
                                    <img 
                                        src={wine.imageUrl} 
                                        alt={wine.title}
                                        className="wine-image"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop
                                            e.target.src = 'https://spoonacular.com/productImages/wine-bottle.jpg';
                                        }}
                                    />
                                </div>
                                <div className="wine-info">
                                    <h3>{wine.title}</h3>
                                    <p className="wine-description">{wine.description}</p>
                                    <div className="wine-details">
                                        <span className="wine-price">${wine.price}</span>
                                        <span className="wine-rating">
                                            <FaStar className="star-icon" />
                                            {wine.averageRating.toFixed(1)}
                                        </span>
                                    </div>
                                    {wine.link && (
                                        <a 
                                            href={wine.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="wine-link"
                                        >
                                            View Details
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WinePairing; 