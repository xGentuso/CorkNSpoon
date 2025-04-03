require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');

const app = express();

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// API Routes
app.use('/api', recipeRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// Server startup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 