const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    ingredients: [{
        type: String,
        required: [true, 'At least one ingredient is required']
    }],
    instructions: [{
        type: String,
        required: [true, 'At least one instruction is required']
    }],
    cookingTime: {
        type: Number,
        required: [true, 'Cooking time is required'],
        min: [1, 'Cooking time must be at least 1 minute']
    },
    num_servings: {
        type: Number,
        required: [true, 'Number of servings is required'],
        min: [1, 'Number of servings must be at least 1']
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema); 