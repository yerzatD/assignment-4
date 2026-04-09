/**
 * models/Movie.js — Movie and Series model
 */

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['movie', 'series'], required: true },
  genre: [{ type: String, required: true }],
  mood: [{ type: String, enum: ['fun', 'dark', 'romantic', 'motivating', 'cozy', 'tense'] }],
  rating: { type: Number, min: 0, max: 10, default: 0 },
  year: { type: Number },
  duration: { type: String },            // "120 мин" or "3 сезона"
  director: { type: String },
  cast: [String],
  description: { type: String },
  poster: { type: String },              // URL to poster image
  trailer: { type: String },             // YouTube URL
  streamUrl: { type: String },           // Streaming URL (future)
  language: { type: String, default: 'ru' },
  country: [String],
  tags: [String],
  isPopular: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
}, { timestamps: true });

// Text index for full-text search
movieSchema.index({ title: 'text', description: 'text', genre: 'text' });

// Index for fast mood queries
movieSchema.index({ mood: 1, type: 1 });

module.exports = mongoose.model('Movie', movieSchema);