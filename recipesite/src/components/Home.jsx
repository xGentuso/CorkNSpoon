import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaPlus } from 'react-icons/fa';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home-container">
            {/* Hero Section with Background */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Discover Your Next Favorite Recipe</h1>
                    <p className="hero-subtitle">
                        Explore, create, and save delicious recipes from around the world
                    </p>
                    <Link to="/tasty-recipes" className="cta-button">
                        Start Exploring
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <FaSearch />
                                </div>
                                <h3>Discover Recipes</h3>
                                <p>Find inspiration from our curated collection of delicious recipes</p>
                                <Link to="/tasty-recipes" className="feature-link">
                                    Browse Collection →
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <FaPlus />
                                </div>
                                <h3>Create & Share</h3>
                                <p>Add your own recipes and share them with the community</p>
                                <Link to="/add-recipe" className="feature-link">
                                    Add Recipe →
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <FaHeart />
                                </div>
                                <h3>Save Favorites</h3>
                                <p>Build your personal collection of favorite recipes</p>
                                <Link to="/favorites" className="feature-link">
                                    View Favorites →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="stat-item">
                                <h2>1000+</h2>
                                <p>Recipes</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stat-item">
                                <h2>500+</h2>
                                <p>Active Users</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stat-item">
                                <h2>50+</h2>
                                <p>Categories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home; 