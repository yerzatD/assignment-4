/**
 * services/aiService.js
 * Mock AI recommendation engine
 * Architecture ready for OpenAI API integration
 */

/**
 * Mood keyword map — used to extract intent from user input
 */
const MOOD_KEYWORDS = {
  fun: ['веселое', 'смешное', 'комедия', 'поднять настроение', 'легкое', 'позитив'],
  dark: ['мрачное', 'темное', 'депрессивное', 'тяжелое', 'нуар', 'мрак'],
  romantic: ['романтика', 'любовь', 'мелодрама', 'отношения', 'свидание'],
  motivating: ['мотивация', 'вдохновение', 'биография', 'спорт', 'победа', 'сила'],
  cozy: ['уютное', 'тёплое', 'домашнее', 'расслабиться', 'отдохнуть', 'вечер'],
  tense: ['напряжение', 'триллер', 'хоррор', 'ужасы', 'экшн', 'детектив', 'страшн'],
};

const GENRE_KEYWORDS = {
  'Комедия': ['комедия', 'смешно', 'юмор'],
  'Триллер': ['триллер', 'напряжение', 'саспенс'],
  'Ужасы': ['ужасы', 'хоррор', 'страшн'],
  'Романтика': ['романтика', 'любовь'],
  'Фантастика': ['фантастика', 'sci-fi', 'будущее', 'космос'],
  'Криминал': ['криминал', 'гангстер', 'мафия'],
  'Драма': ['драма', 'серьёзное'],
  'Биография': ['биография', 'реальная история'],
};

/**
 * Analyze user input and extract mood/genre intent
 * @param {string} input — user's text query
 * @returns {{ mood: string|null, genre: string|null, type: string|null }}
 */
const analyzeIntent = (input) => {
  const lower = input.toLowerCase();
  let detectedMood = null;
  let detectedGenre = null;
  let detectedType = null;

  // Detect mood
  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      detectedMood = mood;
      break;
    }
  }

  // Detect genre
  for (const [genre, keywords] of Object.entries(GENRE_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      detectedGenre = genre;
      break;
    }
  }

  // Detect type
  if (lower.includes('сериал')) detectedType = 'series';
  else if (lower.includes('фильм')) detectedType = 'movie';

  // Special evening pattern
  if (lower.match(/вечер|ночь|не знаю что/)) {
    if (!detectedMood) detectedMood = 'cozy';
  }

  return { mood: detectedMood, genre: detectedGenre, type: detectedType };
};

/**
 * Build AI response text based on intent
 * @param {Object} intent
 * @param {Array} movies — recommended movies from DB
 * @returns {string}
 */
const buildResponseText = (intent, movies) => {
  const { mood, genre, type } = intent;

  const moodPhrases = {
    fun: 'Отлично! Вот что поднимет настроение:',
    dark: 'Понимаю. Вот что зацепит:',
    romantic: 'Романтичный вечер? Идеально:',
    motivating: 'Зарядись энергией! Вот вдохновляющий выбор:',
    cozy: 'Для уютного вечера идеально подойдёт:',
    tense: 'Адреналин? Получи:',
  };

  const intro = mood
    ? moodPhrases[mood]
    : genre
      ? `Вот лучшее в жанре «${genre}»:`
      : 'Вот что я рекомендую:';

  const movieList = movies.length
    ? movies.map(m => `🎬 ${m.title} (${m.year}) — ★${m.rating}`).join('\n')
    : 'К сожалению, по вашему запросу ничего не найдено. Попробуйте переформулировать.';

  return `${intro}\n\n${movieList}\n\nЕсли хочешь узнать подробнее о любом фильме — просто спроси!`;
};

module.exports = { analyzeIntent, buildResponseText };


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
      return res.status(400).json({ success: false, message: 'Введите запрос минимум 2 символа.' });
    }

    // Step 1: Analyze user intent
    const intent = analyzeIntent(query);

    // Step 2: Build DB query
    const filter = {};
    if (intent.mood) filter.mood = { $in: [intent.mood] };
    if (intent.genre) filter.genre = { $in: [intent.genre] };
    if (intent.type) filter.type = intent.type;

    // Step 3: Fetch recommendations
    let movies = await Movie.find(filter)
      .sort('-rating')
      .limit(4)
      .select('title type genre rating year description poster');

    // Fallback: if nothing matches, return top-rated
    if (!movies.length) {
      movies = await Movie.find()
        .sort('-rating')
        .limit(4)
        .select('title type genre rating year description poster');
    }

    // Step 4: Build response text
    const responseText = buildResponseText(intent, movies);

    /* --- FUTURE: OpenAI integration ---
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Ты кино-ассистент. Отвечай на русском. Рекомендуй фильмы по настроению.' },
        { role: 'user', content: query },
      ],
    });
    const responseText = openaiResponse.choices[0].message.content;
    ------------------------------------ */

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