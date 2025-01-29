import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendSignupEmail } from '../services/emailServices';
import User from '../models/userModels';

const signup = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone already exists' });
    }

    // Generate a random password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    // Send email with credentials
    await sendSignupEmail(email, { firstName, lastName, email, phone, password });

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (err:any) {
    res.status(500).json({ message: 'Error signing up', error: err.message });
  }
};

const login = async (req: any, res: any) => {
  try {
    const { email, phone, password } = req.body;

    // Find user by email or phone
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err:any) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

export { signup, login };