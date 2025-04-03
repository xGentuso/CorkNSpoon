import mongoose, { Schema, Document } from 'mongoose';

export interface IAllergen extends Document {
  name: string;
}

const AllergenSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model<IAllergen>('Allergen', AllergenSchema); 