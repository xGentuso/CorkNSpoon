import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaHeart, FaHome, FaGlobe, FaBook, FaWineGlass, FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link className="navbar-brand" to="/">
                    <FaBook />
                    Cork & Spoon
                </Link>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className={isActive('/')}>
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/explore" className={isActive('/explore')}>
                            <FaGlobe /> Explore
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-recipes" className={isActive('/my-recipes')}>
                            <FaBook /> My Recipes
                        </Link>
                    </li>
                    <li>
                        <Link to="/favorites" className={isActive('/favorites')}>
                            <FaHeart /> Favorites
                        </Link>
                    </li>
                    <li>
                        <Link to="/wines" className={isActive('/wines')}>
                            <FaWineGlass /> Wines
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className={isActive('/products')}>
                            <FaShoppingCart /> Products
                        </Link>
                    </li>
                </ul>
                <div className="search-bar">
                    <FaSearch style={{ color: '#666' }} />
                    <input type="search" placeholder="Search recipes..." />
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 