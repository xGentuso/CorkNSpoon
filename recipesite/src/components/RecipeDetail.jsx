import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { FaClock, FaUsers, FaArrowLeft, FaCheckCircle, FaUtensils, FaHeartbeat } from 'react-icons/fa';
import axios from '../config/axios';
import './RecipeDetail.css';
import NutritionInfo from './NutritionInfo';
import { toast } from 'react-toastify';

function RecipeDetail() {
    const { id } = useParams();
    const location = useLocation();
    const [recipe, setRecipe] = useState(null);
    const [nutrition, setNutrition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeAndNutrition = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Determine which endpoint to use based on the URL path
                const isExploreRecipe = location.pathname.includes('/explore/');
                const endpoint = isExploreRecipe 
                    ? `/spoonacular-recipes/${id}/information`
                    : `/my-recipes/${id}`;
                
                // Fetch recipe details
                const recipeResponse = await axios.get(endpoint);
                setRecipe(recipeResponse.data.recipe);

                // Only fetch nutrition for Spoonacular recipes
                if (isExploreRecipe) {
                    const nutritionResponse = await axios.get(`/spoonacular-recipes/${id}/nutrition`);
                    setNutrition(nutritionResponse.data.nutrition);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch recipe details');
                toast.error('Failed to load recipe details');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeAndNutrition();
    }, [id, location.pathname]);

    if (loading) {
        return (
            <div className="recipe-detail-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading recipe...</p>
                </div>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="recipe-detail-container">
                <div className="error-message">
                    <h2>Oops!</h2>
                    <p>{error || 'Recipe not found'}</p>
                    <Link to={location.pathname.includes('/explore/') ? "/explore" : "/my-recipes"} className="back-button">
                        Back to Recipes
                    </Link>
                </div>
            </div>
        );
    }

    const instructions = recipe.analyzedInstructions?.[0]?.steps?.map(step => step.step) || [];

    return (
        <div className="recipe-detail-container">
            <div className="recipe-content">
                <Link to={location.pathname.includes('/explore/') ? "/explore" : "/my-recipes"} className="back-link">
                    <FaArrowLeft /> Back to Recipes
                </Link>

                <div className="recipe-header">
                    {recipe.image && (
                        <div className="recipe-image-container">
                            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                        </div>
                    )}
                    
                    <div className="recipe-title-container">
                        <h1 className="recipe-title">{recipe.title}</h1>
                        
                        <div className="recipe-meta">
                            <div className="meta-item">
                                <FaClock className="meta-icon" />
                                <span>{recipe.readyInMinutes} mins</span>
                            </div>
                            <div className="meta-item">
                                <FaUsers className="meta-icon" />
                                <span>{recipe.servings} servings</span>
                            </div>
                            {recipe.cuisines?.length > 0 && (
                                <div className="meta-item">
                                    <FaUtensils className="meta-icon" />
                                    <span>{recipe.cuisines.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="recipe-sections">
                    <section className="recipe-section ingredients-section">
                        <h2 className="section-title">Ingredients</h2>
                        <ul className="ingredients-list">
                            {recipe.extendedIngredients?.map((ingredient, index) => (
                                <li key={index} className="ingredient-item">
                                    <FaCheckCircle className="ingredient-icon" />
                                    <span>{ingredient.original}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="recipe-section instructions-section">
                        <h2 className="section-title">Instructions</h2>
                        <ol className="instructions-list">
                            {instructions.map((instruction, index) => (
                                <li key={index} className="instruction-step">
                                    <span className="step-number">{index + 1}</span>
                                    <div className="step-content">{instruction}</div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className="recipe-section nutrition-section">
                        <h2 className="section-title">
                            <FaHeartbeat className="section-icon" />
                            Nutrition Facts
                        </h2>
                        <div className="nutrition-content">
                            <div className="nutrition-header">
                                <h3>Per Serving</h3>
                                <p>Servings: {recipe.servings}</p>
                            </div>
                            <div className="nutrition-grid">
                                <div className="nutrition-item">
                                    <span className="nutrient-value">{nutrition?.calories || '0'}</span>
                                    <span className="nutrient-label">Calories</span>
                                </div>
                                <div className="nutrition-item">
                                    <span className="nutrient-value">{nutrition?.protein || '0'}</span>
                                    <span className="nutrient-label">Protein</span>
                                </div>
                                <div className="nutrition-item">
                                    <span className="nutrient-value">{nutrition?.carbs || '0'}</span>
                                    <span className="nutrient-label">Carbs</span>
                                </div>
                                <div className="nutrition-item">
                                    <span className="nutrient-value">{nutrition?.fat || '0'}</span>
                                    <span className="nutrient-label">Fat</span>
                                </div>
                            </div>
                            {nutrition?.nutrients && (
                                <div className="nutrition-details">
                                    {nutrition.nutrients.map((nutrient, index) => (
                                        <div key={index} className="nutrient-row">
                                            <span className="nutrient-name">{nutrient.name}</span>
                                            <span className="nutrient-amount">
                                                {nutrient.amount}{nutrient.unit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail; 