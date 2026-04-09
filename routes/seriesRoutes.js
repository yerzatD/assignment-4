// routes/seriesRoutes.js
const express = require('express');
const router = express.Router();
const { getSeries } = require('../controllers/movieController');

router.get('/', getSeries);

module.exports = router;
