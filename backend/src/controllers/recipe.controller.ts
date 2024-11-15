import { Request, Response, NextFunction } from 'express';
import { Recipe } from '../models/recipe.model';
import { NotFoundError, ValidationError } from '../utils/errors';

export const recipeController = {
  async getAllRecipes(req: Request, res: Response, next: NextFunction) {
    try {
      const recipes = await Recipe.find({ userId: req.user?.id });
      res.json(recipes);
    } catch (error) {
      next(error);
    }
  },

  async getRecipeById(req: Request, res: Response, next: NextFunction) {
    try {
      const recipe = await Recipe.findOne({ 
        _id: req.params.id,
        userId: req.user?.id 
      });
      
      if (!recipe) {
        throw new NotFoundError('Recipe');
      }
      
      res.json(recipe);
    } catch (error) {
      next(error);
    }
  },

  async createRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const recipe = new Recipe({
        ...req.body,
        userId: req.user?.id
      });
      
      await recipe.save();
      res.status(201).json(recipe);
    } catch (error) {
      next(error);
    }
  },

  async updateRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const recipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id, userId: req.user?.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!recipe) {
        throw new NotFoundError('Recipe');
      }

      res.json(recipe);
    } catch (error) {
      next(error);
    }
  },

  async deleteRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const recipe = await Recipe.findOneAndDelete({ 
        _id: req.params.id,
        userId: req.user?.id 
      });

      if (!recipe) {
        throw new NotFoundError('Recipe');
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}; 