import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../config/axios';

function RecipeDetail() {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <div>
                <h2>Ingredients:</h2>
                {recipe.ingredients.split(',').map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                ))}
            </div>
            <div>
                <h2>Instructions:</h2>
                {recipe.instructions.split('\n').map((step, index) => (
                    <p key={index}>{step}</p>
                ))}
            </div>
            <div>
                <p>Prep Time: {recipe.prep_time} minutes</p>
                <p>Cook Time: {recipe.cook_time} minutes</p>
                <p>Servings: {recipe.servings}</p>
                <p>Difficulty: {recipe.difficulty}</p>
                <p>Author: {recipe.author}</p>
            </div>
        </div>
    );
}

export default RecipeDetail; 