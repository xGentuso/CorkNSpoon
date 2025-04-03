import mongoose, { Schema, Document } from 'mongoose';

interface ISharedUser {
  userId: mongoose.Types.ObjectId;
  permission: 'owner' | 'edit' | 'view';
}

interface IItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  addedAt: Date;
}

export interface IShoppingList extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  items: IItem[];
  sharedWith: ISharedUser[];
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const SharedUserSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  permission: {
    type: String,
    enum: ['owner', 'edit', 'view'],
    default: 'edit'
  }
});

const ShoppingListSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [ItemSchema],
  sharedWith: [SharedUserSchema]
}, {
  timestamps: true
});

export default mongoose.model<IShoppingList>('ShoppingList', ShoppingListSchema); 