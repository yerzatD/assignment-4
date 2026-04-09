/**
 * controllers/userController.js
 * GET  /api/user/profile
 * POST /api/user/favorites
 * GET  /api/user/favorites
 */

const { Favorite } = require('../models/Favorite');

const getProfile = async (req, res) => {
  res.json({ success: true, data: req.user });
};

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

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('movie', 'title type genre rating poster year description')
      .sort('-createdAt');

    res.json({
      success: true,
      count: favorites.length,
      data: favorites.map((f) => f.movie),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, toggleFavorite, getFavorites };
