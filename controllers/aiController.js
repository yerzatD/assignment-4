/**
 * controllers/aiController.js
 * POST /api/ai/recommend
 */

const Movie = require('../models/Movie');
const { analyzeIntent, buildResponseText } = require('../services/aiService');

/**
 * POST /api/ai/recommend
 * Body: { query: string, sessionId?: string }
 */
const recommend = async (req, res, next) => {
  try {
    const { query, sessionId } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Введите запрос минимум 2 символа.',
      });
    }

    const intent = analyzeIntent(query);

    const filter = {};
    if (intent.mood) filter.mood = { $in: [intent.mood] };
    if (intent.genre) filter.genre = { $in: [intent.genre] };
    if (intent.type) filter.type = intent.type;

    let movies = await Movie.find(filter)
      .sort('-rating')
      .limit(4)
      .select('title type genre rating year description poster');

    if (!movies.length) {
      movies = await Movie.find()
        .sort('-rating')
        .limit(4)
        .select('title type genre rating year description poster');
    }

    const responseText = buildResponseText(intent, movies);

    res.json({
      success: true,
      response: responseText,
      recommendations: movies,
      intent,
      sessionId: sessionId || null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { recommend };
