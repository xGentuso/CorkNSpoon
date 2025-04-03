import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import axios from '../config/axios';
import { toast } from 'react-toastify';

function RecipeCard({ recipe, onSave }) {
    const handleSaveClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await onSave(recipe);
        } catch (error) {
            console.error('Error saving recipe:', error);
            toast.error('Failed to save recipe. Please try again.');
        }
    };

    return (
        <div className="card h-100 recipe-card">
            {recipe.image && (
                <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="card-img-top recipe-thumbnail"
                />
            )}
            <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <div className="recipe-meta">
                    <small className="text-muted">
                        {recipe.readyInMinutes} mins | {recipe.servings} servings
                    </small>
                </div>
                <button 
                    className="btn btn-outline-primary mt-2"
                    onClick={handleSaveClick}
                >
                    <FaBookmark className="me-2" />
                    Save Recipe
                </button>
            </div>
        </div>
    );
}

export default RecipeCard; 