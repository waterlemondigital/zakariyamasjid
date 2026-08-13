import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { AdminUser, IAdminUser } from '../models/AdminUser';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const getJWTSecret = () =>
  process.env.JWT_SECRET || 'zakariya_masjid_trust_super_secure_jwt_secret_key_2026_quran_sunnah_welfare';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide both username/email and password.',
      });
      return;
    }

    const cleanUsername = String(username).trim().toLowerCase();
    const isDBConnected = mongoose.connection.readyState === 1;

    let user: IAdminUser | null = null;

    if (isDBConnected) {
      user = await AdminUser.findOne({
        $or: [{ username: cleanUsername }, { email: cleanUsername }],
      });
    }

    // Default Seed Admin Fallback Check
    const defaultUser = (process.env.DEFAULT_ADMIN_USERNAME || 'admin').toLowerCase();
    const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || 'zakariya@2026';

    let isValid = false;
    let userData = {
      id: 'admin-default',
      username: defaultUser,
      role: 'superadmin',
      name: 'Zakariya Trust Executive Admin',
      email: process.env.DEFAULT_ADMIN_EMAIL || 'trustee@zakariyamasjid.org',
    };

    if (user) {
      isValid = await user.comparePassword(password);
      if (isValid) {
        user.lastLogin = new Date();
        await user.save();
        userData = {
          id: user._id.toString(),
          username: user.username,
          role: user.role,
          name: user.name,
          email: user.email,
        };
      }
    } else if (cleanUsername === defaultUser && password === defaultPass) {
      isValid = true;
    }

    if (!isValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password. Please verify your credentials.',
      });
      return;
    }

    // Sign Production-Grade JWT Token
    const token = jwt.sign(
      {
        id: userData.id,
        username: userData.username,
        role: userData.role,
        name: userData.name,
      },
      getJWTSecret(),
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Authentication successful. Welcome to Zakariya Masjid Admin Portal.',
      token,
      admin: userData,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An internal server error occurred during authentication.',
    });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to retrieve admin profile' });
  }
};
