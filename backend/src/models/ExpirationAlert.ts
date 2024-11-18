import mongoose, { Schema, Document } from 'mongoose';

export interface IExpirationAlert extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  expirationDate: Date;
  notified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExpirationAlertSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  notified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model<IExpirationAlert>('ExpirationAlert', ExpirationAlertSchema); 