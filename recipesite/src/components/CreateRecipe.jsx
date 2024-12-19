import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';

function CreateRecipe() {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        if (!title.trim() || !ingredients.trim() || !instructions.trim() || !cookingTime.trim()) {
            setError("Please fill in all fields.");
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('/create-recipe.php', {
                title,
                description: '',
                instructions,
                prep_time: parseInt(cookingTime),
                cook_time: 0,
                servings: 4,
                difficulty,
                author: 'Anonymous',
                ingredients: ingredients.split('\n').map(ingredient => ({
                    id: 1,
                    quantity: 1,
                    unit: 'piece'
                }))
            });
            navigate('/');
        } catch (error) {
            setError('Failed to create recipe. Please try again later.');
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Recipe</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Recipe Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    <textarea
                        className="form-control"
                        id="ingredients"
                        rows="3"
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">Instructions</label>
                    <textarea
                        className="form-control"
                        id="instructions"
                        rows="5"
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cookingTime"
                        onChange={(e) => setCookingTime(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
                    <select 
                        className="form-select"
                        id="difficulty"
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 
                        <span>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Adding Recipe...
                        </span> 
                        : 'Add Recipe'}
                </button>
            </form>
        </div>
    );
}

export default CreateRecipe; 