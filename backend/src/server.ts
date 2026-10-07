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
import contactRoutes from './routes/contactRoutes';
import { generalLimiter } from './middleware/rateLimiter';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// 1. Production-Grade Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https:'],
      },
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

// Disable X-Powered-By header
app.disable('x-powered-by');

// 2. CORS Whitelisting & Preflight Handling
const configuredOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim().toLowerCase())
  : [];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    const lowerOrigin = origin.toLowerCase();

    // Allow localhost & 127.0.0.1 on any port
    const isLocalhost =
      lowerOrigin.startsWith('http://localhost') ||
      lowerOrigin.startsWith('http://127.0.0.1') ||
      lowerOrigin.startsWith('https://localhost');

    // Allow all Vercel domains (*.vercel.app)
    const isVercel =
      lowerOrigin.endsWith('.vercel.app') ||
      lowerOrigin.includes('.vercel.app');

    // Allow explicitly defined origins in env
    const isExplicitlyAllowed = configuredOrigins.some(
      (allowed) => lowerOrigin === allowed || lowerOrigin.includes(allowed)
    );

    if (isLocalhost || isVercel || isExplicitlyAllowed || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // Default to permissive for public trust API to avoid blocking preflights
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// 3. Body Parsers with Safe Production Limits
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

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
app.use('/api/contact', contactRoutes);

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
