// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, getByMood } = require('../controllers/movieController');

router.get('/', getMovies);
router.get('/mood/:mood', getByMood);        // GET /api/movies/mood/fun
router.get('/:id', getMovieById);

module.exports = router;