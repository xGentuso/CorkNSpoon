import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';

function TastyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 6;

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                console.log('Attempting to fetch recipes...');
                
                const testResponse = await fetch('http://localhost/recipe_backend/api/tasty-recipes.php');
                console.log('Direct fetch response:', testResponse);
                
                const response = await axios.get('/tasty-recipes.php');
                console.log('Axios response:', response);

                if (response.data && response.data.results) {
                    setRecipes(response.data.results);
                } else {
                    throw new Error('No recipes found in response');
                }
            } catch (err) {
                console.error('Error details:', err);
                setError('Failed to fetch recipes: ' + (err.message || 'Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Calculate pagination values
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    // Handle page navigation
    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Tasty Recipes</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {currentRecipes.map(recipe => (
                    <div key={recipe.id} className="col">
                        <div className="card h-100 shadow-sm">
                            {recipe.thumbnail_url && (
                                <img 
                                    src={recipe.thumbnail_url} 
                                    className="card-img-top" 
                                    alt={recipe.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{recipe.name}</h5>
                                <p className="card-text">
                                    {recipe.description?.substring(0, 100)}
                                    {recipe.description?.length > 100 ? '...' : ''}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent border-top-0">
                                <Link 
                                    to={`/recipe/${recipe.id}`}
                                    className="btn btn-outline-primary w-100"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {recipes.length > recipesPerPage && (
                <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Recipe pagination">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li 
                                    key={index} 
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default TastyRecipes;