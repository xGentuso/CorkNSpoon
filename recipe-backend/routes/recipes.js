const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const axios = require('axios');

// Get random recipes from Spoonacular via RapidAPI
router.get('/spoonacular-recipes/random', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://${process.env.RAPID_API_HOST}/recipes/random`,
            params: {
                number: '9',
                tags: 'main course'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);

        if (!response.data || !response.data.recipes) {
            throw new Error('Invalid response from Spoonacular API');
        }

        res.json({
            success: true,
            recipes: response.data.recipes
        });
    } catch (error) {
        console.error('Error fetching random recipes:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recipes',
            error: error.message
        });
    }
});

// Get recipe details from Spoonacular
router.get('/spoonacular-recipes/:id/information', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching recipe details for ID:', id);
        
        const options = {
            method: 'GET',
            url: `https://${process.env.RAPID_API_HOST}/recipes/${id}/information`,
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);
        
        res.json({
            success: true,
            recipe: {
                id: response.data.id,
                title: response.data.title,
                image: response.data.image,
                readyInMinutes: response.data.readyInMinutes,
                servings: response.data.servings,
                cuisines: response.data.cuisines,
                extendedIngredients: response.data.extendedIngredients,
                analyzedInstructions: response.data.analyzedInstructions,
                nutrition: response.data.nutrition
            }
        });
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recipe details',
            error: error.message
        });
    }
});

// Get all user recipes
router.get('/my-recipes', async (req, res) => {
    try {
        console.log('Fetching user recipes');
        const recipes = await Recipe.find();
        console.log('Found recipes:', recipes.length);
        res.json({
            success: true,
            recipes
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recipes',
            error: error.message
        });
    }
});

// Save a recipe
router.post('/my-recipes', async (req, res) => {
    try {
        console.log('Saving recipe:', req.body);
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.json({
            success: true,
            message: 'Recipe saved successfully',
            recipe
        });
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save recipe',
            error: error.message
        });
    }
});

// Delete a recipe
router.delete('/my-recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }
        res.json({
            success: true,
            message: 'Recipe deleted successfully'
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete recipe',
            error: error.message
        });
    }
});

// Get recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }
        res.json({
            success: true,
            recipe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recipe',
            error: error.message
        });
    }
});

// Create new recipe
router.post('/', async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).json({
            success: true,
            recipe
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create recipe',
            error: error.message
        });
    }
});

// Get wine description
router.get('/wine/description', async (req, res) => {
    try {
        const { wine } = req.query;
        const options = {
            method: 'GET',
            url: `https://${process.env.RAPID_API_HOST}/food/wine/description`,
            params: { 
                wine: wine,
                includeImage: true 
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);
        res.json({
            success: true,
            wineDescription: response.data.wineDescription,
            wineImage: response.data.image
        });
    } catch (error) {
        console.error('Error fetching wine description:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wine description',
            error: error.message
        });
    }
});

// Get dishes that go well with a specific wine
router.get('/wine/dishes', async (req, res) => {
    try {
        const { wine } = req.query;
        const options = {
            method: 'GET',
            url: `https://${process.env.RAPID_API_HOST}/food/wine/dishes`,
            params: { 
                wine: wine
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);
        res.json({
            success: true,
            text: response.data.text,
            pairings: response.data.pairings
        });
    } catch (error) {
        console.error('Error fetching wine dishes:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wine dishes',
            error: error.message
        });
    }
});

// Get wine pairing for food
router.get('/wine/pairing', async (req, res) => {
    try {
        const { food } = req.query;
        const options = {
            method: 'GET',
            url: `https://${process.env.RAPID_API_HOST}/food/wine/pairing`,
            params: { food: food },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);
        res.json({
            success: true,
            winePairing: {
                pairingText: response.data.pairingText,
                pairedWines: response.data.pairedWines
            }
        });
    } catch (error) {
        console.error('Error fetching wine pairing:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wine pairing',
            error: error.message
        });
    }
});

// Get wine recommendations
router.get('/wine/recommendation', async (req, res) => {
    try {
        const { maxPrice = 50, minRating = 0.8, number = 3 } = req.query;
        const options = {
            method: 'GET',
            url: `https://${process.env.RAPID_API_HOST}/food/wine/recommendation`,
            params: { 
                maxPrice,
                minRating,
                number
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);
        res.json({
            success: true,
            recommendations: response.data.recommendedWines
        });
    } catch (error) {
        console.error('Error fetching wine recommendations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wine recommendations',
            error: error.message
        });
    }
});

// First get the product list
router.get('/products/search', async (req, res) => {
    try {
        // First get the product list
        const searchResponse = await axios.get(`https://${process.env.RAPID_API_HOST}/food/products/search`, {
            params: {
                ...req.query,
                number: 24
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        });

        // Get detailed information for each product
        const productsWithDetails = await Promise.all(
            searchResponse.data.products.map(async (product) => {
                try {
                    const detailResponse = await axios.get(`https://${process.env.RAPID_API_HOST}/food/products/${product.id}`, {
                        headers: {
                            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                            'X-RapidAPI-Host': process.env.RAPID_API_HOST
                        }
                    });
                    return {
                        ...product,
                        ...detailResponse.data
                    };
                } catch (error) {
                    console.error(`Error fetching details for product ${product.id}:`, error);
                    return product;
                }
            })
        );

        res.json({
            success: true,
            products: productsWithDetails
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message
        });
    }
});

// Update the store information endpoint
router.get('/products/stores', async (req, res) => {
    try {
        const { productId } = req.query;
        // Use the correct endpoint from the Spoonacular API
        const response = await axios.get(`https://${process.env.RAPID_API_HOST}/food/products/search-grocery-products`, {
            params: {
                query: productId,
                number: 5  // Limit the number of results
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        });

        // Transform the response to match our needs
        const storeData = response.data.products.map(product => ({
            name: product.title,
            price: product.price || 'Price not available',
            store: product.source || 'Store information not available'
        }));

        res.json({
            success: true,
            stores: storeData
        });
    } catch (error) {
        console.error('Error fetching store information:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch store information',
            error: error.message
        });
    }
});

// Update autocomplete endpoint
router.get('/products/autocomplete', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`https://${process.env.RAPID_API_HOST}/food/products/suggest`, {
            params: {
                query: query,
                number: 8, // Increased number of suggestions
                minPopularity: 0.5 // Only show popular products
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        });

        // Transform and filter the results for more relevant suggestions
        const suggestions = response.data.results
            .filter(item => {
                // Filter out items that don't closely match the search query
                return item.title.toLowerCase().includes(query.toLowerCase());
            })
            .map(item => ({
                id: item.id,
                title: item.title,
                imageType: item.imageType,
                // Add additional relevant information
                brand: item.brand,
                type: item.type
            }));

        res.json({
            success: true,
            suggestions: suggestions
        });
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch suggestions',
            error: error.message
        });
    }
});

// Update the wine recommendations endpoint for RapidAPI
router.get('/spoonacular-recipes/:id/wine-recommendations', async (req, res) => {
    try {
        const { id } = req.params;
        
        // First get the recipe details to get the title
        const recipeResponse = await axios.get(`https://${process.env.RAPID_API_HOST}/recipes/${id}/information`, {
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        });

        // Get wine pairing based on the recipe title
        const wineResponse = await axios.get(`https://${process.env.RAPID_API_HOST}/food/wine/pairing`, {
            params: {
                food: recipeResponse.data.title
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        });

        res.json({
            success: true,
            wineRecommendations: {
                pairedWines: wineResponse.data.pairedWines || [],
                pairingText: wineResponse.data.pairingText,
                productMatches: wineResponse.data.productMatches || []
            }
        });
    } catch (error) {
        console.error('Error fetching wine recommendations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wine recommendations',
            error: error.message
        });
    }
});

// Get recipe nutrition from Spoonacular
router.get('/spoonacular-recipes/:id/nutrition', async (req, res) => {
    try {
        const { id } = req.params;
        
        const options = {
            method: 'GET',
            url: `https://${process.env.RAPID_API_HOST}/recipes/${id}/nutritionWidget.json`,
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST
            }
        };

        const response = await axios.request(options);
        
        res.json({
            success: true,
            nutrition: response.data
        });
    } catch (error) {
        console.error('Error fetching nutrition info:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch nutrition information',
            error: error.message
        });
    }
});

// Get saved recipe by ID
router.get('/my-recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }
        res.json({
            success: true,
            recipe
        });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recipe details',
            error: error.message
        });
    }
});

module.exports = router; 