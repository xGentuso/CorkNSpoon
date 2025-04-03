import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaPlus, FaArrowRight, FaUtensils, FaClock, FaBookOpen, FaGithub } from 'react-icons/fa';
import '../styles/Home.css';

function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content animate-on-scroll">
                    <div className="hero-badge">Welcome to Cork & Spoon</div>
                    <h1 className="hero-title">
                        Discover & Create
                        <span className="hero-highlight">Amazing Recipes</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your culinary journey starts here. Explore thousands of recipes, 
                        create your own cookbook, and share your passion for cooking.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/explore" className="explore-btn">
                            Explore Recipes <FaArrowRight className="btn-icon" />
                        </Link>
                        <Link to="/create" className="share-btn">
                            Share Recipe <FaPlus className="btn-icon" />
                        </Link>
                    </div>
                    <div className="tech-stack">
                        <span className="tech-badge">React</span>
                        <span className="tech-badge">Node.js</span>
                        <span className="tech-badge">MongoDB</span>
                        <span className="tech-badge">Express</span>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section animate-on-scroll">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">1000+</span>
                        <span className="stat-label">Recipes</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Active Users</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Categories</span>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title animate-on-scroll">Key Features</h2>
                <div className="features-grid">
                    <div className="feature-card animate-on-scroll">
                        <div className="feature-icon-wrapper">
                            <FaBookOpen className="feature-icon" />
                        </div>
                        <h3>Extensive Collection</h3>
                        <p>Access to thousands of curated recipes from around the world</p>
                    </div>
                    <div className="feature-card animate-on-scroll">
                        <div className="feature-icon-wrapper">
                            <FaUtensils className="feature-icon" />
                        </div>
                        <h3>Easy to Follow</h3>
                        <p>Step-by-step instructions with detailed ingredients and timing</p>
                    </div>
                    <div className="feature-card animate-on-scroll">
                        <div className="feature-icon-wrapper">
                            <FaHeart className="feature-icon" />
                        </div>
                        <h3>Save Favorites</h3>
                        <p>Create your personal cookbook with your favorite recipes</p>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section animate-on-scroll">
                <div className="newsletter-content">
                    <h2>Stay Updated</h2>
                    <p>Join our community and receive hand-picked recipes straight to your inbox</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <FaGithub /> View on GitHub
                        </a>
                    </div>
                    <p className="footer-text">Built with React, Node.js, and MongoDB</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;