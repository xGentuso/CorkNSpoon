import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { validateEmail } from '../utils/validators';

export class AuthController {
  // Register new user
  static async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Create new user
      const user = new User({
        email,
        password,
        name
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      // Return user data and token (excluding password)
      const userData = user.toObject();
      delete userData.password;

      res.status(201).json({
        message: 'User registered successfully',
        user: userData,
        token
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  // Login user
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      // Return user data and token (excluding password)
      const userData = user.toObject();
      delete userData.password;

      res.json({
        message: 'Login successful',
        user: userData,
        token
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }

  // Get current user
  static async getCurrentUser(req: Request, res: Response) {
    try {
      // User is attached to request by auth middleware
      const user = await User.findById(req.user?.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Error getting user data' });
    }
  }
} 