/**
 * controllers/movieController.js
 * Handles GET /api/movies, GET /api/movies/:id
 * Handles GET /api/series
 * Handles GET /api/mood/:mood
 */

const Movie = require('../models/Movie');

/**
 * GET /api/movies
 * Returns paginated list of movies
 */
const getMovies = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, genre, sort = '-rating' } = req.query;

    const filter = { type: 'movie' };
    if (genre) filter.genre = { $in: [genre] };

    const movies = await Movie.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-streamUrl -trailer');

    const total = await Movie.countDocuments(filter);

    res.json({
      success: true,
      data: movies,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/movies/:id
 * Returns single movie with full details
 */
const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Фильм не найден.' });
    }
    // Increment view count
    await Movie.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });
    res.json({ success: true, data: movie });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/series
 * Returns paginated list of series
 */
const getSeries = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = '-rating' } = req.query;

    const series = await Movie.find({ type: 'series' })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Movie.countDocuments({ type: 'series' });

    res.json({
      success: true,
      data: series,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/mood/:mood
 * Returns movies/series filtered by mood tag
 */
const getByMood = async (req, res, next) => {
  try {
    const { mood } = req.params;
    const { type, limit = 12 } = req.query;

    const validMoods = ['fun', 'dark', 'romantic', 'motivating', 'cozy', 'tense'];
    if (!validMoods.includes(mood)) {
      return res.status(400).json({ success: false, message: 'Неверное настроение.' });
    }

    const filter = { mood: { $in: [mood] } };
    if (type) filter.type = type;

    const results = await Movie.find(filter)
      .sort('-rating')
      .limit(parseInt(limit));

    res.json({ success: true, mood, data: results });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMovies, getMovieById, getSeries, getByMood };