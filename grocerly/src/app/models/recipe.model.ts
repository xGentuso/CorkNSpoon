export interface Recipe {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  ingredients: string[];
  instructions: string[];
}

export interface CreateRecipeDTO extends Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateRecipeDTO extends Partial<CreateRecipeDTO> {} 