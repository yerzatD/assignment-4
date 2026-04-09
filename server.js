/**
 * CineAI вЂ” Express Server Entry Point
 * Node.js + Express + MongoDB (Mongoose)
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./db');

// --- Route imports ---
const movieRoutes = require('./routes/movieRoutes');
const seriesRoutes = require('./routes/seriesRoutes');
const searchRoutes = require('./routes/searchRoutes');
const aiRoutes = require('./routes/aiRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// --- Connect to MongoDB ---
connectDB();

const app = express();

/* ============================================================
   MIDDLEWARE
   ============================================================ */

// Security headers
app.use(helmet());

// CORS вЂ” allow frontend origins
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  'http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173,http://localhost:5500,http://127.0.0.1:5500,http://localhost:5000,http://127.0.0.1:5000'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === 'null' || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON bodies
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate limiting вЂ” protect against abuse
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 min
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'РЎР»РёС€РєРѕРј РјРЅРѕРіРѕ Р·Р°РїСЂРѕСЃРѕРІ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ.' },
});
app.use('/api', limiter);

/* ============================================================
   ROUTES
   ============================================================ */

app.use('/api/movies', movieRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'РњР°СЂС€СЂСѓС‚ РЅРµ РЅР°Р№РґРµРЅ' });
});

/* ============================================================
   GLOBAL ERROR HANDLER
   ============================================================ */
app.use(require('./middleware/errorHandler'));

/* ============================================================
   START SERVER
   ============================================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\nрџЋ¬ CineAI Server running on port ${PORT} [${process.env.NODE_ENV}]`);
  console.log(`рџ“Ў API: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;

