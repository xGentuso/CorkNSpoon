import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaBook } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-brand">
                    <div className="brand-header">
                        <FaBook className="brand-icon" />
                        <h2>Cork & Spoon</h2>
                    </div>
                    <p>Your personal cookbook for discovering, saving, and organizing your favorite recipes. Built with modern web technologies and a passion for cooking.</p>
                    <div className="social-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="mailto:contact@example.com"><FaEnvelope /></a>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/explore">Explore Recipes</Link></li>
                        <li><Link to="/add">Add Recipe</Link></li>
                        <li><Link to="/favorites">Favorites</Link></li>
                    </ul>
                </div>

                {/* Categories Section */}
                <div className="footer-section">
                    <h3>Categories</h3>
                    <ul>
                        <li><Link to="/category/breakfast">Breakfast</Link></li>
                        <li><Link to="/category/lunch">Lunch</Link></li>
                        <li><Link to="/category/dinner">Dinner</Link></li>
                        <li><Link to="/category/desserts">Desserts</Link></li>
                        <li><Link to="/category/healthy">Healthy</Link></li>
                        <li><Link to="/category/vegetarian">Vegetarian</Link></li>
                    </ul>
                </div>

                {/* Stay Updated Section */}
                <div className="footer-section">
                    <h3>Stay Updated</h3>
                    <p>Subscribe to get the latest recipes and cooking tips.</p>
                    <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>© 2025 Cork & Spoon. All rights reserved.</p>
                <p>Made with ❤️ by Ryan</p>
            </div>
        </footer>
    );
}

export default Footer; 