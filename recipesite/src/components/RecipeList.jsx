import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/my-recipes');
            if (response.data.success) {
                setRecipes(response.data.recipes || []);
                setError('');
            } else {
                throw new Error('Failed to fetch recipes');
            }
        } catch (err) {
            console.error('Error fetching recipes:', err);
            setError('Failed to fetch recipes');
            toast.error('Failed to load recipes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                const response = await axios.delete(`/my-recipes/${id}`);
                if (response.data.success) {
                    toast.success('Recipe deleted successfully');
                    fetchRecipes();
                }
            } catch (err) {
                console.error('Delete error:', err);
                setError('Failed to delete recipe');
                toast.error('Failed to delete recipe. Please try again.');
            }
        }
    };

    const handleRecipeClick = (recipeId) => {
        navigate(`/my-recipes/${recipeId}`);
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>My Recipes</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            {recipes.length === 0 ? (
                <div className="alert alert-info">
                    No recipes found. Start by adding some recipes from the Explore section!
                </div>
            ) : (
                <div className="row">
                    {recipes.map(recipe => (
                        <div key={recipe._id} className="col-md-4 mb-4">
                            <div 
                                className="card h-100" 
                                onClick={() => handleRecipeClick(recipe._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {recipe.image && (
                                    <img 
                                        src={recipe.image} 
                                        className="card-img-top" 
                                        alt={recipe.title}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            {recipe.cookingTime} mins | {recipe.num_servings} servings
                                        </small>
                                    </p>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(recipe._id)}
                                    >
                                        Delete Recipe
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecipeList; 