import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../config/axios';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                setLoading(true);
                console.log('Fetching recipe details for ID:', id);
                
                const response = await axios.get(`/tasty-recipe-details.php?id=${id}`);
                console.log('Recipe API response:', response.data);

                if (response.data) {
                    setRecipe(response.data);
                } else {
                    throw new Error('No recipe data received');
                }
            } catch (err) {
                console.error('Error fetching recipe details:', err);
                setError(err.message || 'Failed to fetch recipe details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRecipeDetails();
        }
    }, [id]);

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
                    <br />
                    <Link to="/tasty-recipes" className="btn btn-primary mt-3">
                        Back to Recipes
                    </Link>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    Recipe not found
                    <br />
                    <Link to="/tasty-recipes" className="btn btn-primary mt-3">
                        Back to Recipes
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8">
                    {recipe.thumbnail_url && (
                        <img 
                            src={recipe.thumbnail_url} 
                            alt={recipe.name}
                            className="img-fluid rounded mb-4"
                        />
                    )}
                    <h1 className="mb-4">{recipe.name}</h1>
                    
                    {recipe.description && (
                        <div className="mb-4">
                            <h3>Description</h3>
                            <p>{recipe.description}</p>
                        </div>
                    )}

                    {recipe.instructions && (
                        <div className="mb-4">
                            <h3>Instructions</h3>
                            <ol className="list-group list-group-numbered">
                                {recipe.instructions.map((instruction, index) => (
                                    <li key={index} className="list-group-item">
                                        {instruction.display_text}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Recipe Details</h5>
                            <ul className="list-unstyled">
                                <li>Prep Time: {recipe.prep_time_minutes || 'N/A'} mins</li>
                                <li>Cook Time: {recipe.cook_time_minutes || 'N/A'} mins</li>
                                <li>Total Time: {recipe.total_time_minutes || 'N/A'} mins</li>
                                <li>Servings: {recipe.num_servings || 'N/A'}</li>
                            </ul>
                        </div>
                    </div>

                    <Link to="/tasty-recipes" className="btn btn-outline-primary w-100 mt-3">
                        Back to Recipes
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail; 