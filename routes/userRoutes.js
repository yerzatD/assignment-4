// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getProfile, toggleFavorite, getFavorites } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getProfile);
router.post('/favorites', protect, toggleFavorite);
router.get('/favorites', protect, getFavorites);

module.exports = router;
