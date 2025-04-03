import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
}

const SessionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  ipAddress: String,
  userAgent: String,
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Index for token lookups and automatic expiration
SessionSchema.index({ token: 1 });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ISession>('Session', SessionSchema); 