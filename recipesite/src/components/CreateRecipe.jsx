import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { toast } from 'react-toastify';

function CreateRecipe() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        cookingTime: '',
        num_servings: '',
        difficulty: 'easy'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const recipeData = {
                title: formData.title.trim(),
                ingredients: formData.ingredients.split('\n').filter(item => item.trim()),
                instructions: formData.instructions.split('\n').filter(item => item.trim()),
                cookingTime: parseInt(formData.cookingTime),
                num_servings: parseInt(formData.num_servings),
                difficulty: formData.difficulty
            };

            const response = await axios.post('/api/recipes', recipeData);
            
            if (response.data.success) {
                toast.success('Recipe created successfully!');
                navigate('/recipes');
            } else {
                throw new Error(response.data.message || 'Failed to create recipe');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create recipe. Please try again.');
            toast.error('Failed to create recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Recipe Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredients (one per line)</label>
                    <textarea
                        className="form-control"
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">Instructions (one per line)</label>
                    <textarea
                        className="form-control"
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cookingTime"
                        name="cookingTime"
                        value={formData.cookingTime}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="num_servings" className="form-label">Number of Servings</label>
                    <input
                        type="number"
                        className="form-control"
                        id="num_servings"
                        name="num_servings"
                        value={formData.num_servings}
                        onChange={handleChange}
                        required
                        min="1"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
                    <select
                        className="form-control"
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Creating Recipe...' : 'Create Recipe'}
                </button>
            </form>
        </div>
    );
}

export default CreateRecipe; 