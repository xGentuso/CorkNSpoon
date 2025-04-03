import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaSpinner } from 'react-icons/fa';
import axios from '../config/axios';
import './NutritionInfo.css';

function NutritionInfo({ recipeId }) {
    const [nutrition, setNutrition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNutrition = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/spoonacular-recipes/${recipeId}/nutrition`);
                setNutrition(response.data);
            } catch (err) {
                setError('Failed to load nutrition information');
                console.error('Nutrition error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (recipeId) {
            fetchNutrition();
        }
    }, [recipeId]);

    if (loading) {
        return (
            <div className="nutrition-loading">
                <FaSpinner className="spinner" />
                <p>Loading nutrition facts...</p>
            </div>
        );
    }

    if (error || !nutrition) {
        return null;
    }

    return (
        <div className="nutrition-container">
            <h2 className="section-title">
                <FaHeartbeat className="nutrition-icon" />
                Nutrition Facts
            </h2>
            <div className="nutrition-content">
                <div className="nutrition-header">
                    <h3>Per Serving</h3>
                    <p>Servings: {nutrition.servings}</p>
                </div>
                <div className="nutrition-grid">
                    <div className="nutrition-item">
                        <span className="nutrient-value">{nutrition.calories}</span>
                        <span className="nutrient-label">Calories</span>
                    </div>
                    <div className="nutrition-item">
                        <span className="nutrient-value">{nutrition.protein}g</span>
                        <span className="nutrient-label">Protein</span>
                    </div>
                    <div className="nutrition-item">
                        <span className="nutrient-value">{nutrition.carbs}g</span>
                        <span className="nutrient-label">Carbs</span>
                    </div>
                    <div className="nutrition-item">
                        <span className="nutrient-value">{nutrition.fat}g</span>
                        <span className="nutrient-label">Fat</span>
                    </div>
                </div>
                <div className="nutrition-details">
                    {nutrition.nutrients?.map((nutrient, index) => (
                        <div key={index} className="nutrient-row">
                            <span className="nutrient-name">{nutrient.name}</span>
                            <span className="nutrient-amount">
                                {nutrient.amount}{nutrient.unit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NutritionInfo; 