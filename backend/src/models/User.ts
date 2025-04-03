import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  barcode?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true
  },
  description: String
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema); 