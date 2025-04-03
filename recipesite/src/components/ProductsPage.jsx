import React, { useState, useCallback, useEffect } from 'react';
import { FaSearch, FaShoppingBasket } from 'react-icons/fa';
import axios from 'axios';
import './ProductsPage.css';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filters, setFilters] = useState({
        maxCalories: '5000',
        minProtein: '0',
        maxProtein: '100',
        minFat: '0',
        maxFat: '100',
        minCarbs: '0',
        maxCarbs: '100',
        minCalories: '0',
        offset: '0',
        number: '24'
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [storeInfo, setStoreInfo] = useState(null);

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5001/api/products/autocomplete`, {
                params: { query }
            });
            if (response.data.success) {
                setSuggestions(response.data.suggestions);
                setShowSuggestions(true);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const debouncedFetchSuggestions = useCallback(
        debounce((query) => fetchSuggestions(query), 300),
        []
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim()) {
            debouncedFetchSuggestions(value);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.title);
        setSuggestions([]);
        setShowSuggestions(false);
        handleSearch({ preventDefault: () => {} });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:5001/api/products/search`, {
                params: {
                    query: searchQuery,
                    ...filters
                }
            });

            if (response.data.success && response.data.products) {
                const transformedProducts = response.data.products.map(product => ({
                    id: product.id,
                    title: product.title,
                    image: product.images && product.images[0],
                    nutrition: {
                        calories: product.nutrition?.calories || 'N/A',
                        protein: product.nutrition?.protein || 'N/A',
                        fat: product.nutrition?.fat || 'N/A',
                        carbs: product.nutrition?.carbs || 'N/A'
                    }
                }));

                setProducts(transformedProducts);
                
                if (transformedProducts.length === 0) {
                    setError('No products found matching your criteria.');
                }
            } else {
                setError('Invalid response format from server');
            }
        } catch (err) {
            console.error('Error details:', err.response?.data || err.message);
            setError(
                err.response?.data?.message || 
                'Failed to fetch products. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchStoreInfo = async (productId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5001/api/products/stores`, {
                params: { 
                    productId: productId 
                }
            });
            
            if (response.data.success && response.data.stores) {
                setStoreInfo(response.data.stores);
            } else {
                setError('No store information available');
            }
        } catch (error) {
            console.error('Error fetching store info:', error);
            setError('Failed to fetch store information');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-bar-container')) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderSuggestion = (suggestion) => {
        const highlightMatch = (text, query) => {
            const index = text.toLowerCase().indexOf(query.toLowerCase());
            if (index === -1) return text;
            
            const before = text.slice(0, index);
            const match = text.slice(index, index + query.length);
            const after = text.slice(index + query.length);
            
            return (
                <>
                    {before}<strong>{match}</strong>{after}
                </>
            );
        };

        return (
            <div className="suggestion-item">
                <div className="suggestion-content">
                    <div className="suggestion-title">
                        {highlightMatch(suggestion.title, searchQuery)}
                    </div>
                    {suggestion.brand && (
                        <div className="suggestion-brand">
                            {suggestion.brand}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const handleFilterChange = (field, value) => {
        setFilters({...filters, [field]: value});
    };

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>
                    <FaShoppingBasket className="header-icon" />
                    Grocery Products
                </h1>
                <p>Search for grocery products and compare nutritional information</p>
            </div>

            <div className="search-section">
                <div className="search-form">
                    <div className="search-bar">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <FaSearch /> Search
                        </button>
                    </div>

                    <div className="filters-grid">
                        <div className="filter-group">
                            <label>Max Price ($)</label>
                            <input
                                type="text"
                                placeholder="Any price"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <label>Min Protein (g)</label>
                            <input
                                type="number"
                                value={filters.minProtein}
                                onChange={(e) => handleFilterChange('minProtein', e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <label>Max Calories</label>
                            <input
                                type="number"
                                value={filters.maxCalories}
                                onChange={(e) => handleFilterChange('maxCalories', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Searching products...</p>
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <img 
                                src={product.image || 'https://placehold.co/500x500?text=No+Image'}
                                alt={product.title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/500x500?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="product-info">
                            <h3>{product.title}</h3>
                            <div className="nutrition-info">
                                <span>Calories: {product.nutrition.calories}</span>
                                <span>Protein: {product.nutrition.protein}</span>
                                <span>Fat: {product.nutrition.fat}</span>
                                <span>Carbs: {product.nutrition.carbs}</span>
                            </div>
                            <button 
                                className="store-info-button"
                                onClick={() => {
                                    setSelectedProduct(product.id);
                                    fetchStoreInfo(product.id);
                                }}
                            >
                                Find in Stores
                            </button>
                            {selectedProduct === product.id && (
                                <div className="store-info">
                                    {loading ? (
                                        <p>Loading store information...</p>
                                    ) : error ? (
                                        <p className="error-message">{error}</p>
                                    ) : storeInfo && storeInfo.length > 0 ? (
                                        <>
                                            <h4>Available at:</h4>
                                            {storeInfo.map((store, index) => (
                                                <div key={index} className="store-item">
                                                    <span>{store.store}</span>
                                                    <span>{store.name}</span>
                                                    <span>{typeof store.price === 'number' ? `$${store.price.toFixed(2)}` : store.price}</span>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <p>No store information available</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && !loading && !error && (
                <div className="no-results">
                    <p>Search for products to see results here.</p>
                </div>
            )}
        </div>
    );
}

export default ProductsPage; 