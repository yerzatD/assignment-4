/**
 * services/aiService.js
 * Intent analysis + response builder for recommendations
 */

const MOOD_KEYWORDS = {
  fun: ['веселое', 'смешное', 'комедия', 'поднять настроение', 'легкое', 'позитив', 'funny', 'comedy'],
  dark: ['мрачное', 'темное', 'депрессивное', 'тяжелое', 'нуар', 'мрак', 'dark'],
  romantic: ['романтика', 'любовь', 'мелодрама', 'отношения', 'свидание', 'romance', 'romantic'],
  motivating: ['мотивация', 'вдохновение', 'биография', 'спорт', 'победа', 'сила', 'motivating', 'inspiring'],
  cozy: ['уютное', 'тёплое', 'домашнее', 'расслабиться', 'отдохнуть', 'вечер', 'cozy'],
  tense: ['напряжение', 'триллер', 'хоррор', 'ужасы', 'экшен', 'детектив', 'страшн', 'tense', 'thriller'],
};

const GENRE_KEYWORDS = {
  'Комедия': ['комедия', 'смешно', 'юмор', 'comedy'],
  'Триллер': ['триллер', 'напряжение', 'саспенс', 'thriller'],
  'Ужасы': ['ужасы', 'хоррор', 'страшно', 'horror'],
  'Романтика': ['романтика', 'любовь', 'romance'],
  'Фантастика': ['фантастика', 'sci-fi', 'будущее', 'космос'],
  'Криминал': ['криминал', 'гангстер', 'мафия', 'crime'],
  'Драма': ['драма', 'серьезное', 'drama'],
  'Биография': ['биография', 'реальная история', 'biography'],
};

const analyzeIntent = (input) => {
  const lower = String(input).toLowerCase();
  let detectedMood = null;
  let detectedGenre = null;
  let detectedType = null;

  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      detectedMood = mood;
      break;
    }
  }

  for (const [genre, keywords] of Object.entries(GENRE_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      detectedGenre = genre;
      break;
    }
  }

  if (lower.includes('сериал') || lower.includes('series')) detectedType = 'series';
  else if (lower.includes('фильм') || lower.includes('movie')) detectedType = 'movie';

  if ((/вечер|ночь|не знаю что/.test(lower)) && !detectedMood) {
    detectedMood = 'cozy';
  }

  return { mood: detectedMood, genre: detectedGenre, type: detectedType };
};

const buildResponseText = (intent, movies) => {
  const { mood, genre } = intent;

  const moodPhrases = {
    fun: 'Отлично. Вот что поднимет настроение:',
    dark: 'Понимаю. Вот что может зацепить:',
    romantic: 'Романтичный вечер? Подойдут эти варианты:',
    motivating: 'Вот подборка для заряда мотивации:',
    cozy: 'Для уютного вечера рекомендую:',
    tense: 'Нужен адреналин? Лови подборку:',
  };

  const intro = mood
    ? moodPhrases[mood]
    : genre
      ? `Вот лучшее в жанре «${genre}»:`
      : 'Вот что я рекомендую:';

  const movieList = movies.length
    ? movies.map((m) => `🎬 ${m.title} (${m.year}) — ★${m.rating}`).join('\n')
    : 'По вашему запросу пока ничего не нашлось. Попробуйте переформулировать.';

  return `${intro}\n\n${movieList}\n\nЕсли хотите, подберу точнее по настроению, жанру или году.`;
};

module.exports = { analyzeIntent, buildResponseText };
