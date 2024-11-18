import mongoose, { Schema, Document } from 'mongoose';

interface IRecipeProduct {
  productId: mongoose.Types.ObjectId;
  quantity: string;
  preparation?: string;
}

export interface IRecipe extends Document {
  name: string;
  instructions: string;
  createdBy: mongoose.Types.ObjectId;
  products: IRecipeProduct[];
  dietaryTags: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const RecipeProductSchema: Schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: String,
  preparation: String
});

const RecipeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  instructions: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [RecipeProductSchema],
  dietaryTags: [{
    type: Schema.Types.ObjectId,
    ref: 'DietaryPreference'
  }]
}, {
  timestamps: true
});

export default mongoose.model<IRecipe>('Recipe', RecipeSchema); 