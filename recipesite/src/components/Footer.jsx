import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    {/* Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-heading">Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/tasty-recipes">Recipes</Link></li>
                            <li><Link to="/add-recipe">Add Recipe</Link></li>
                            <li><Link to="/favorites">Favorites</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-heading">Contact</h5>
                        <ul className="footer-links">
                            <li>
                                <a href="mailto:your.email@example.com">
                                    <FaEnvelope className="me-2" />
                                    your.email@example.com
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                                    <FaGithub className="me-2" />
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="me-2" />
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* About */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-heading">About Recipe Book</h5>
                        <p className="footer-about">
                            Your personal cookbook for discovering, saving, and organizing your favorite recipes.
                            Built with modern web technologies and a passion for cooking.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer-bottom">
                    <p className="text-center mb-0">
                        Made with <FaHeart className="text-danger mx-1" /> by Ryan
                        <br />
                        <small>&copy; {new Date().getFullYear()} Recipe Book. All rights reserved.</small>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 