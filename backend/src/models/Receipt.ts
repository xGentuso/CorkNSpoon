import mongoose, { Schema, Document } from 'mongoose';

interface IReceiptItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IReceipt extends Document {
  userId: mongoose.Types.ObjectId;
  storeId?: mongoose.Types.ObjectId;
  items: IReceiptItem[];
  totalAmount: number;
  purchaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReceiptItemSchema: Schema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const ReceiptSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  items: [ReceiptItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IReceipt>('Receipt', ReceiptSchema); 