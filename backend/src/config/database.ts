import mongoose from 'mongoose';
import { config } from './environment';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
}); 