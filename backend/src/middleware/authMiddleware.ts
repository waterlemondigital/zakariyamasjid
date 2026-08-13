import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminUser, IAdminUser } from '../models/AdminUser';

export interface AuthenticatedRequest extends Request {
  admin?: {
    id: string;
    username: string;
    role: string;
    name: string;
  };
}

export const authenticateAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in to access the trust admin panel.',
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'zakariya_masjid_trust_super_secure_jwt_secret_key_2026_quran_sunnah_welfare';

    const decoded = jwt.verify(token, secret) as {
      id: string;
      username: string;
      role: string;
      name: string;
    };

    req.admin = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again for security.',
        expired: true,
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: 'Invalid authorization token. Access denied.',
    });
  }
};
