import express from 'express';
import cors from 'cors';
import { config } from './config/environment';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/error.middleware';
import authRouter from './routes/auth.routes';
import recipeRouter from './routes/recipe.routes';
import shoppingListRouter from './routes/shopping-list.routes';

const app = express();

// Connect to database
connectDatabase();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/shopping-list', shoppingListRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 