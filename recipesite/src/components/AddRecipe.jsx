import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';

function AddRecipe() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        cookingTime: '',
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
            const response = await axios.post('/create-recipe.php', formData);
            
            if (response.data.success) {
                navigate(`/recipe/${response.data.recipeId}`);
            } else {
                setError(response.data.error || 'Failed to create recipe');
            }
        } catch (err) {
            console.error('Error creating recipe:', err);
            setError('Failed to create recipe. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">Add New Recipe</h1>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

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
                                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                                    <textarea
                                        className="form-control"
                                        id="ingredients"
                                        name="ingredients"
                                        value={formData.ingredients}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                    />
                                    <small className="text-muted">Enter each ingredient on a new line</small>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="instructions" className="form-label">Instructions</label>
                                    <textarea
                                        className="form-control"
                                        id="instructions"
                                        name="instructions"
                                        value={formData.instructions}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                    />
                                    <small className="text-muted">Enter each step on a new line</small>
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
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
                                    <select
                                        className="form-select"
                                        id="difficulty"
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>

                                <div className="d-grid">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Creating Recipe...
                                            </>
                                        ) : 'Add Recipe'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRecipe; 