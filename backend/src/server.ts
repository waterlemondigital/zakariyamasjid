import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import { seedDatabase } from './utils/seed';
import authRoutes from './routes/authRoutes';
import welfareRoutes from './routes/welfareRoutes';
import adminRoutes from './routes/adminRoutes';
import { generalLimiter } from './middleware/rateLimiter';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// 1. Production-Grade Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. CORS Whitelisting
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
  : defaultOrigins;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Body Parsers with Safe Limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. General Rate Limiter
app.use(generalLimiter);

// 5. Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    institution: 'Zakariya Masjid & Kabrastan Trust, Pune',
    service: 'Welfare & Admin API',
    timestamp: new Date().toISOString(),
  });
});

// 6. Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/welfare-cases', welfareRoutes);
app.use('/api/admin', adminRoutes);

// 7. 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 8. Global Error Handler (Production Safe)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err.message);

  const isDev = process.env.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred.',
    ...(isDev && { stack: err.stack }),
  });
});

// 9. Start Server & Connect Database
let serverStarted = false;
export const startServer = async () => {
  if (serverStarted) return;
  serverStarted = true;
  const isConnected = await connectDB();
  if (isConnected) {
    await seedDatabase();
  }

  if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`\n🕌 ──────────────────────────────────────────────────────────`);
      console.log(`   Zakariya Masjid & Kabrastan Trust — Backend API`);
      console.log(`   Running on port : http://localhost:${PORT}`);
      console.log(`   Health Check    : http://localhost:${PORT}/api/health`);
      console.log(`   Environment     : ${process.env.NODE_ENV || 'development'}`);
      console.log(`────────────────────────────────────────────────────────────\n`);
    });
  }
};

startServer();

export default app;
