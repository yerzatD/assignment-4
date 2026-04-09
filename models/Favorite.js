/**
 * models/Favorite.js — User favorites + Chat history
 */

const mongoose = require('mongoose');

// ── Favorite ──────────────────────────────────────────────
const favoriteSchema = new mongoose.Schema({
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
}, { timestamps: true });

// Each user-movie pair must be unique
favoriteSchema.index({ user: 1, movie: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

// ── ChatHistory ───────────────────────────────────────────
const chatMessageSchema = new mongoose.Schema({
  role:      { type: String, enum: ['user', 'assistant'], required: true },
  content:   { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatHistorySchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, required: true },
  messages:  [chatMessageSchema],
  context: {
    mood:                String,
    genres:              [String],
    lastRecommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  },
}, { timestamps: true });

chatHistorySchema.index({ user: 1, sessionId: 1 });

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema);

module.exports = { Favorite, ChatHistory };
