import mongoose, { Schema, Document } from 'mongoose';

interface IStoreProduct {
  productId: mongoose.Types.ObjectId;
  price: number;
  availability: boolean;
  lastUpdated: Date;
}

export interface IStore extends Document {
  name: string;
  address?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  hours?: string;
  phoneNumber?: string;
  products: IStoreProduct[];
  createdAt: Date;
  updatedAt: Date;
}

const StoreProductSchema: Schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  price: {
    type: Number,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const StoreSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  hours: String,
  phoneNumber: String,
  products: [StoreProductSchema]
}, {
  timestamps: true
});

StoreSchema.index({ location: '2dsphere' });

export default mongoose.model<IStore>('Store', StoreSchema);