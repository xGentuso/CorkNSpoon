import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="bi bi-book-half me-2"></i>
                    <span className="fw-bold">Recipe Book</span>
                </Link>

                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link px-3 ${isActive('/')}`} 
                                to="/"
                                onClick={() => setIsOpen(false)}
                            >
                                <i className="bi bi-house-door me-1"></i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link px-3 ${isActive('/create')}`}
                                to="/create"
                                onClick={() => setIsOpen(false)}
                            >
                                <i className="bi bi-plus-circle me-1"></i>
                                Add Recipe
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link px-3 ${isActive('/favorites')}`}
                                to="/favorites"
                                onClick={() => setIsOpen(false)}
                            >
                                <i className="bi bi-heart me-1"></i>
                                Favorites
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/tasty-recipes" 
                                className={`nav-link ${isActive('/tasty-recipes')}`}
                            >
                                <i className="bi bi-globe me-2"></i>
                                Tasty Recipes
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex ms-lg-3">
                        <div className="input-group">
                            <input 
                                className="form-control border-end-0 rounded-pill rounded-end" 
                                type="search" 
                                placeholder="Search recipes..." 
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-primary border-start-0 rounded-pill rounded-start" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 