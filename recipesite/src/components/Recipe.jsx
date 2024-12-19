import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from '../config/axios';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                console.log('Fetching recipe with ID:', id);
                
                const response = await axios.get(`/recipes.php?id=${id}`);
                console.log('Raw API Response:', response);
                console.log('Recipe Data:', response.data);

                if (response.data && response.data.recipes && response.data.recipes[0]) {
                    console.log('Setting recipe:', response.data.recipes[0]);
                    setRecipe(response.data.recipes[0]);
                } else {
                    console.error('Invalid recipe data:', response.data);
                    setError('Recipe not found');
                }
            } catch (err) {
                console.error('Error fetching recipe:', err);
                setError(`Failed to fetch recipe: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipe();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading recipe...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error Loading Recipe</h4>
                    <p>{error}</p>
                    <hr />
                    <div className="mt-2">
                        <Link to="/" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Recipes
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Recipe Not Found</h4>
                    <p>We couldn't find the recipe you're looking for.</p>
                    <hr />
                    <div className="mt-2">
                        <Link to="/" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Recipes
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow-sm">
                        {recipe.image_url && (
                            <img 
                                src={recipe.image_url} 
                                className="card-img-top" 
                                alt={recipe.title}
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        )}
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">{recipe.title}</h1>
                            
                            {recipe.description && (
                                <p className="lead text-muted mb-4">{recipe.description}</p>
                            )}

                            <div className="row mb-4">
                                <div className="col-md-3 text-center">
                                    <div className="p-3 border rounded">
                                        <i className="bi bi-clock mb-2" style={{ fontSize: '1.5rem' }}></i>
                                        <p className="mb-0"><strong>Prep Time</strong></p>
                                        <p className="mb-0">{recipe.prep_time} mins</p>
                                    </div>
                                </div>
                                <div className="col-md-3 text-center">
                                    <div className="p-3 border rounded">
                                        <i className="bi bi-fire mb-2" style={{ fontSize: '1.5rem' }}></i>
                                        <p className="mb-0"><strong>Cook Time</strong></p>
                                        <p className="mb-0">{recipe.cook_time} mins</p>
                                    </div>
                                </div>
                                <div className="col-md-3 text-center">
                                    <div className="p-3 border rounded">
                                        <i className="bi bi-people mb-2" style={{ fontSize: '1.5rem' }}></i>
                                        <p className="mb-0"><strong>Servings</strong></p>
                                        <p className="mb-0">{recipe.servings || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="col-md-3 text-center">
                                    <div className="p-3 border rounded">
                                        <i className="bi bi-diagram-2 mb-2" style={{ fontSize: '1.5rem' }}></i>
                                        <p className="mb-0"><strong>Difficulty</strong></p>
                                        <span className={`badge bg-${getDifficultyColor(recipe.difficulty)}`}>
                                            {recipe.difficulty}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {recipe.ingredients && (
                                <div className="mb-4">
                                    <h3 className="mb-3">Ingredients</h3>
                                    <ul className="list-group">
                                        {Array.isArray(recipe.ingredients) 
                                            ? recipe.ingredients.map((ingredient, index) => (
                                                <li key={index} className="list-group-item">
                                                    {ingredient}
                                                </li>
                                            ))
                                            : <li className="list-group-item">{recipe.ingredients}</li>
                                        }
                                    </ul>
                                </div>
                            )}

                            <div className="instructions">
                                <h3 className="mb-3">Instructions</h3>
                                <ol className="list-group list-group-numbered">
                                    {recipe.instructions.split('\n').map((instruction, index) => (
                                        instruction.trim() && (
                                            <li key={index} className="list-group-item">
                                                {instruction.trim()}
                                            </li>
                                        )
                                    ))}
                                </ol>
                            </div>

                            {recipe.author && (
                                <div className="mt-4 text-end">
                                    <p className="text-muted mb-0">Recipe by</p>
                                    <p className="h6">{recipe.author}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Recipes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

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

export default Recipe; 