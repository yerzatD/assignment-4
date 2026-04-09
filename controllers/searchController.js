/**
 * controllers/searchController.js
 * GET /api/search?q=
 */

const Movie = require('../models/Movie');

const search = async (req, res, next) => {
  try {
    const { q, type, limit = 10 } = req.query;

    if (!q || q.trim().length < 1) {
      return res.status(400).json({ success: false, message: 'Введите поисковый запрос.' });
    }

    const filter = {
      $text: { $search: q },
      ...(type && { type }),
    };

    const results = await Movie.find(filter, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(parseInt(limit))
      .select('title type genre rating year poster description');

    res.json({ success: true, query: q, count: results.length, data: results });
  } catch (err) {
    next(err);
  }
};

module.exports = { search };