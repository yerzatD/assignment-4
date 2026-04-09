/**
 * controllers/authController.js
 * POST /api/auth/register
 * POST /api/auth/login
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Generate JWT token for user
 * @param {string} id
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Все поля обязательны.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email уже используется.' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email и пароль обязательны.' });
    }

    // Include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Неверный email или пароль.' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };


/**
 * controllers/userController.js
 * GET  /api/user/profile
 * POST /api/user/favorites
 * GET  /api/user/favorites
 */

const { Favorite } = require('../models/Favorite');

/**
 * GET /api/user/profile
 * Returns current user profile
 */
const getProfile = async (req, res) => {
  res.json({ success: true, data: req.user });
};

/**
 * POST /api/user/favorites
 * Add or remove movie from favorites (toggle)
 */
const toggleFavorite = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      return res.status(400).json({ success: false, message: 'movieId обязателен.' });
    }

    const existing = await Favorite.findOne({ user: req.user._id, movie: movieId });

    if (existing) {
      await existing.deleteOne();
      return res.json({ success: true, action: 'removed', message: 'Удалено из избранного.' });
    }

    await Favorite.create({ user: req.user._id, movie: movieId });
    res.status(201).json({ success: true, action: 'added', message: 'Добавлено в избранное.' });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/user/favorites
 * Returns user's favorite movies/series
 */
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('movie', 'title type genre rating poster year description')
      .sort('-createdAt');

    res.json({
      success: true,
      count: favorites.length,
      data: favorites.map(f => f.movie),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, toggleFavorite, getFavorites };