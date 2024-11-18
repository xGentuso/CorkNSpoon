import mongoose, { Schema, Document } from 'mongoose';

export interface IDietaryPreference extends Document {
  name: string;
}

const DietaryPreferenceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model<IDietaryPreference>('DietaryPreference', DietaryPreferenceSchema); 