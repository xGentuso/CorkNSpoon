import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/recipes.php');
                console.log('API Response:', response.data); // Debug log

                if (response.data && Array.isArray(response.data.recipes)) {
                    setRecipes(response.data.recipes);
                    setTotalPages(Math.ceil(response.data.recipes.length / 9));
                } else {
                    console.error('Invalid response format:', response.data);
                    setError('Failed to fetch recipes');
                }
            } catch (err) {
                console.error('Error fetching recipes:', err);
                setError('Failed to fetch recipes');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [currentPage]);

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

    if (!recipes || recipes.length === 0) {
        return (
            <div className="container mt-5">
                <div className="alert alert-info" role="alert">
                    No recipes found. Try adding some!
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 text-center mb-4">Our Recipes</h1>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {recipes.map(recipe => {
                    console.log('Rendering recipe:', recipe); // Debug log
                    return (
                        <div key={recipe.id} className="col">
                            <div className="card h-100 shadow-sm hover-card">
                                {recipe.image_url && (
                                    <img 
                                        src={recipe.image_url} 
                                        className="card-img-top" 
                                        alt={recipe.title}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text text-muted">
                                        {recipe.description?.substring(0, 100)}
                                        {recipe.description?.length > 100 ? '...' : ''}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className={`badge bg-${getDifficultyColor(recipe.difficulty)}`}>
                                            {recipe.difficulty}
                                        </span>
                                        <small className="text-muted">
                                            {(parseInt(recipe.prep_time) + parseInt(recipe.cook_time)) || 0} mins
                                        </small>
                                    </div>
                                    <Link 
                                        to={`/recipe/${recipe.id}`} 
                                        className="btn btn-outline-primary w-100"
                                    >
                                        View Recipe
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
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
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

function getDifficultyColor(difficulty) {
    switch (difficulty?.toLowerCase()) {
        case 'easy':
            return 'success';
        case 'medium':
            return 'warning';
        case 'hard':
            return 'danger';
        default:
            return 'secondary';
    }
}

export default RecipeList; 