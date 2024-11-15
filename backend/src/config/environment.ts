import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  port: process.env.PORT || 5000
}; 