import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';
import RecipeCard from './RecipeCard';
import { FaSync } from 'react-icons/fa';
import { toast } from 'react-toastify';

function SpoonacularRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRandomRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/spoonacular-recipes/random');
            
            if (response.data.success) {
                setRecipes(response.data.recipes);
            } else {
                throw new Error(response.data.message || 'Failed to fetch recipes');
            }
        } catch (err) {
            setError('Failed to fetch recipes');
            toast.error('Failed to load recipes. Please try again.');
            console.error('Error fetching recipes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomRecipes();
    }, []);

    const handleSaveRecipe = async (spoonacularRecipe) => {
        try {
            const recipeToSave = {
                title: spoonacularRecipe.title,
                ingredients: spoonacularRecipe.extendedIngredients.map(ing => ing.original),
                instructions: spoonacularRecipe.analyzedInstructions[0]?.steps.map(step => step.step) || [],
                cookingTime: spoonacularRecipe.readyInMinutes,
                num_servings: spoonacularRecipe.servings,
                difficulty: 'medium',
                image: spoonacularRecipe.image
            };

            const response = await axios.post('/recipes', recipeToSave);
            
            if (response.data.success) {
                toast.success('Recipe saved successfully!');
            } else {
                throw new Error(response.data.message || 'Failed to save recipe');
            }
        } catch (err) {
            console.error('Error saving recipe:', err);
            toast.error('Failed to save recipe. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Discover Recipes</h2>
                <button 
                    onClick={fetchRandomRecipes} 
                    className="btn btn-primary"
                    disabled={loading}
                >
                    <FaSync className={loading ? 'spin' : ''} />
                    {' '}Refresh Recipes
                </button>
            </div>
            <div className="row">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.id} className="col-md-4 mb-4">
                            <Link 
                                to={`/explore/${recipe.id}`} 
                                className="text-decoration-none"
                            >
                                <RecipeCard 
                                    recipe={recipe} 
                                    onSave={handleSaveRecipe}
                                />
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No recipes found. Try refreshing the page.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SpoonacularRecipes;