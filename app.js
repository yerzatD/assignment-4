/**
 * CineAI — Main Application JavaScript
 * Clean vanilla JS, architecture ready for backend API integration
 */

'use strict';

/* ============================================================
   DATA — Mock movie/series database
   Replace with API calls: GET /api/movies, GET /api/series
   ============================================================ */

const MOVIES_DATA = [
  {
    id: 1, type: 'movie', title: 'Достать ножи', genre: 'Детектив',
    rating: 8.1, mood: ['fun', 'cozy', 'tense'],
    year: 2019, duration: '130 мин',
    description: 'Знаменитый детектив расследует смерть дряхлого писателя в окружении его дисфункциональной семьи. Остроумный и атмосферный детектив с неожиданными поворотами.',
    poster: 'posters/1.jpg', trailer: 'hA5gbTCwDiA', streamUrl: 'https://fbsite.top/film/1188529/', director: 'Райан Джонсон',
  },
  {
    id: 2, type: 'movie', title: 'Интерстеллар', genre: 'Фантастика',
    rating: 8.6, mood: ['tense', 'motivating', 'dark'],
    year: 2014, duration: '169 мин',
    description: 'Команда исследователей путешествует через червоточину в космосе в поисках нового дома для человечества. Эпическая фантастика о любви и выживании.',
    poster: 'posters/2.jpg', trailer: 'zSWdZVtXT7E', streamUrl: 'https://fbsite.top/film/258687/', director: 'Кристофер Нолан',
  },
  {
    id: 3, type: 'movie', title: 'Ла-Ла Ленд', genre: 'Мюзикл',
    rating: 8.0, mood: ['romantic', 'motivating', 'cozy'],
    year: 2016, duration: '128 мин',
    description: 'Молодой джазовый пианист и начинающая актриса встречаются в Лос-Анджелесе. Красивая история о мечтах, любви и трудных выборах.',
    poster: 'posters/3.jpg', trailer: '0pdqf4P9MB8', streamUrl: 'https://fbsite.top/film/841081/', director: 'Дэмьен Шазелл',
  },
  {
    id: 4, type: 'movie', title: 'Жизнь Пи', genre: 'Драма',
    rating: 7.9, mood: ['motivating', 'cozy'],
    year: 2012, duration: '127 мин',
    description: 'Молодой индиец выживает в море после крушения на борту спасательной шлюпки вместе с бенгальским тигром.',
    poster: 'posters/4.jpg', trailer: 'mMuAgcNKAME', streamUrl: 'https://fbsite.top/film/158786/', director: 'Энг Ли',
  },
  {
    id: 5, type: 'movie', title: 'Паразиты', genre: 'Триллер',
    rating: 8.5, mood: ['dark', 'tense'],
    year: 2019, duration: '132 мин',
    description: 'Семья безработных аферистов постепенно проникает в жизнь зажиточного семейства. Острая социальная сатира с неожиданным финалом.',
    poster: 'posters/5.jpg', trailer: '5xH0HfJHsaY', streamUrl: 'https://fbsite.top/film/4499322/', director: 'Пон Чжун-хо',
  },
  {
    id: 6, type: 'movie', title: 'Вечное сияние', genre: 'Романтика',
    rating: 8.3, mood: ['romantic', 'dark', 'cozy'],
    year: 2004, duration: '108 мин',
    description: 'Пара решает стереть воспоминания друг о друге после болезненного расставания. Нестандартная история о любви и памяти.',
    poster: 'posters/6.jpg', trailer: '07-QBnEkgXU', streamUrl: 'https://fbsite.top/film/5492/', director: 'Мишель Гондри',
  },
  {
    id: 7, type: 'movie', title: 'Гладиатор', genre: 'Боевик',
    rating: 8.5, mood: ['tense', 'motivating'],
    year: 2000, duration: '155 мин',
    description: 'Римский генерал стал рабом и гладиатором. Он стремится отомстить коварному императору за убийство своей семьи.',
    poster: 'posters/7.jpg', trailer: 'owK1qxDselE', streamUrl: 'https://fbsite.top/film/474/', director: 'Ридли Скотт',
  },
  {
    id: 8, type: 'movie', title: 'Большой куш', genre: 'Комедия',
    rating: 8.2, mood: ['fun', 'tense'],
    year: 2000, duration: '104 мин',
    description: 'Хаотичный криминальный мир Лондона с множеством персонажей, запутанных схем и неожиданных поворотов. Культовый фильм Гая Ричи.',
    poster: 'posters/8.jpg', trailer: 'ulr_OgvfG64', streamUrl: 'https://fbsite.top/film/526/', director: 'Гай Ричи',
  },
  {
    id: 9, type: 'movie', title: 'Мне бы в небо', genre: 'Драма',
    rating: 7.7, mood: ['motivating', 'cozy'],
    year: 2009, duration: '109 мин',
    description: 'Корпоративный чистильщик, специализирующийся на увольнениях, летит по стране и переосмысливает смысл жизни.',
    poster: 'posters/9.jpg', trailer: 'jOtEp5_wEW8', streamUrl: 'https://fbsite.top/film/464130/', director: 'Джейсон Рейтман',
  },
  {
    id: 10, type: 'movie', title: 'Реквием по мечте', genre: 'Драма',
    rating: 8.4, mood: ['dark'],
    year: 2000, duration: '102 мин',
    description: 'Четыре портрета людей, захваченных зависимостью. Тяжёлый, но мощный фильм о разрушении человеческих мечт.',
    poster: 'posters/10.jpg', trailer: 'x3DlJlS-i08', streamUrl: 'https://fbsite.top/film/367/', director: 'Даррен Аронофски',
  },
  {
    id: 11, type: 'movie', title: 'Отступники', genre: 'Криминал',
    rating: 8.5, mood: ['tense', 'dark'],
    year: 2006, duration: '151 мин',
    description: 'Полиция внедряет агента в банду, пока гангстеры внедряют своего человека в полицию. Сложная игра с двойными агентами.',
    poster: 'posters/11.jpg', trailer: 'xdEKI9APNPM', streamUrl: 'https://fbsite.top/film/81314/reviews/', director: 'Мартин Скорсезе',
  },
  {
    id: 12, type: 'movie', title: 'Красота по-американски', genre: 'Драма',
    rating: 8.3, mood: ['dark', 'cozy'],
    year: 1999, duration: '122 мин',
    description: 'Мужчина переживает кризис среднего возраста и переосмысливает своё существование в идеальном пригородном доме.',
    poster: 'posters/12.jpg', trailer: 'EbXXBIo-Jmk', streamUrl: 'https://fbsite.top/film/351/cast/', director: 'Сэм Мендес',
  },
  /* ── НОВЫЕ ФИЛЬМЫ ── */
  {
    id: 13, type: 'movie', title: 'Семь', genre: 'Триллер',
    rating: 8.6, mood: ['dark', 'tense'],
    year: 1995, duration: '127 мин',
    description: 'Два детектива охотятся за серийным убийцей, совершающим убийства по числу семи смертных грехов. Мрачный, захватывающий триллер с незабываемой концовкой.',
    poster: 'posters/13.jpg', trailer: 'znmZoVkCjpI', streamUrl: 'https://fbsite.top/film/377/', director: 'Дэвид Финчер',
  },
  {
    id: 14, type: 'movie', title: 'Остров проклятых', genre: 'Триллер',
    rating: 8.1, mood: ['dark', 'tense'],
    year: 2010, duration: '138 мин',
    description: 'Федеральный маршал расследует исчезновение пациентки из психиатрической клиники на изолированном острове. Атмосферный психологический триллер Скорсезе.',
    poster: 'posters/14.jpg', trailer: '5iaYLCiq5RM', streamUrl: 'https://fbsite.top/film/397667/', director: 'Мартин Скорсезе',
  },
  {
    id: 15, type: 'movie', title: 'Начало', genre: 'Фантастика',
    rating: 8.8, mood: ['tense', 'dark', 'motivating'],
    year: 2010, duration: '148 мин',
    description: 'Вор, умеющий проникать в сны людей, получает задание внедрить идею в разум бизнесмена. Интеллектуальный блокбастер Кристофера Нолана о природе реальности.',
    poster: 'posters/15.jpg', trailer: 'YoHD9XEInc0', streamUrl: 'https://fbsite.top/film/447301/', director: 'Кристофер Нолан',
  },
  {
    id: 16, type: 'movie', title: 'Мстители: Финал', genre: 'Супергерои',
    rating: 8.4, mood: ['tense', 'motivating', 'fun'],
    year: 2019, duration: '181 мин',
    description: 'Оставшиеся герои Земли собираются для финальной битвы против Таноса. Грандиозное завершение 22-фильмной саги Marvel.',
    poster: 'posters/16.jpg', trailer: 'TcMBFSGVi1c', streamUrl: 'https://fbsite.top/film/843650/', director: 'Братья Руссо',
  },
  {
    id: 17, type: 'movie', title: 'Железный человек', genre: 'Супергерои',
    rating: 7.9, mood: ['fun', 'motivating', 'tense'],
    year: 2008, duration: '126 мин',
    description: 'Миллиардер Тони Старк создаёт бронированный костюм и становится супергероем. Фильм, с которого началась вселенная Marvel.',
    poster: 'posters/17.jpg', trailer: '8ugaeA-nMTc', streamUrl: 'https://www.kinopoisk.ru/film/258687/', director: 'Джон Фавро',
  },
  {
    id: 18, type: 'movie', title: 'Чёрная пантера', genre: 'Супергерои',
    rating: 7.3, mood: ['fun', 'motivating', 'tense'],
    year: 2018, duration: '134 мин',
    description: 'Принц Ваканды возвращается на родину после гибели отца и вступает в схватку за трон. Один из самых культурно значимых фильмов Marvel.',
    poster: 'posters/18.jpg', trailer: 'xjDjIWPAgrU', streamUrl: 'https://www.kinopoisk.ru/film/917259/', director: 'Райан Куглер',
  },
  {
    id: 19, type: 'movie', title: 'Человек-паук: Нет пути домой', genre: 'Супергерои',
    rating: 8.3, mood: ['fun', 'tense', 'motivating'],
    year: 2021, duration: '148 мин',
    description: 'Питер Паркер просит доктора Стрэнджа стереть память о его личности — и открывает мультивселенную. Фанаты назвали этот фильм лучшим за годы.',
    poster: 'posters/19.jpg', trailer: 'JfVOs4VSpmA', streamUrl: 'https://www.kinopoisk.ru/film/1221070/', director: 'Джон Уоттс',
  },
  {
    id: 20, type: 'movie', title: 'Тёмный рыцарь', genre: 'Супергерои',
    rating: 9.0, mood: ['dark', 'tense', 'motivating'],
    year: 2008, duration: '152 мин',
    description: 'Бэтмен противостоит Джокеру — хаотичному злодею, сеющему анархию в Готэме. Лучший супергеройский фильм всех времён по версии большинства рейтингов.',
    poster: 'posters/20.jpg', trailer: 'EXeTwQWrcwY', streamUrl: 'https://www.kinopoisk.ru/film/404900/', director: 'Кристофер Нолан',
  },
  {
    id: 21, type: 'movie', title: 'Побег из Шоушенка', genre: 'Драма',
    rating: 9.3, mood: ['motivating', 'dark', 'cozy'],
    year: 1994, duration: '142 мин',
    description: 'Банкир, осуждённый за убийство жены, находит смысл жизни в тюрьме и дружбу с матёрым заключённым. Один из лучших фильмов в истории кино.',
    poster: 'posters/21.jpg', trailer: 'PLl99DlL6b4', streamUrl: 'https://www.kinopoisk.ru/film/326/', director: 'Фрэнк Дарабонт',
  },
  {
    id: 22, type: 'movie', title: 'Список Шиндлера', genre: 'История',
    rating: 9.0, mood: ['dark', 'motivating'],
    year: 1993, duration: '195 мин',
    description: 'Немецкий предприниматель спасает более тысячи польских евреев во время Холокоста. Монументальная работа Спилберга, снятая в чёрно-белом цвете.',
    poster: 'posters/22.jpg', trailer: 'gG22XNhtnoY', streamUrl: 'https://www.kinopoisk.ru/film/329/', director: 'Стивен Спилберг',
  },
  {
    id: 23, type: 'movie', title: 'Форрест Гамп', genre: 'Драма',
    rating: 8.8, mood: ['cozy', 'motivating', 'romantic'],
    year: 1994, duration: '142 мин',
    description: 'История простодушного американца, случайно оказавшегося свидетелем ключевых событий XX века. Тёплый, трогательный и вдохновляющий.',
    poster: 'posters/23.jpg', trailer: 'bLvqoHBptjg', streamUrl: 'https://www.kinopoisk.ru/film/361/', director: 'Роберт Земекис',
  },
  {
    id: 24, type: 'movie', title: 'Матрица', genre: 'Фантастика',
    rating: 8.7, mood: ['tense', 'dark', 'motivating'],
    year: 1999, duration: '136 мин',
    description: 'Хакер узнаёт, что реальный мир — лишь симуляция, созданная машинами. Революционный фантастический боевик, изменивший кинематограф.',
    poster: 'posters/24.jpg', trailer: 'm8e-FF8MsqU', streamUrl: 'https://www.kinopoisk.ru/film/301/', director: 'Вачовски',
  },
  {
    id: 25, type: 'movie', title: 'Бойцовский клуб', genre: 'Триллер',
    rating: 8.8, mood: ['dark', 'tense'],
    year: 1999, duration: '139 мин',
    description: 'Офисный работник знакомится с харизматичным мыловаром и создаёт подпольный бойцовский клуб. Культовый фильм Финчера о кризисе идентичности.',
    poster: 'posters/25.jpg', trailer: 'SUXWAEX2jlg', director: 'Дэвид Финчер' ,streamUrl: 'https://fbsite.top/film/361/',
  },
  {
    id: 26, type: 'movie', title: 'Крёстный отец', genre: 'Криминал',
    rating: 9.2, mood: ['dark', 'tense', 'cozy'],
    year: 1972, duration: '175 мин',
    description: 'Стареющий патриарх мафиозной династии передаёт власть сыну. Эпическая сага о власти, семье и чести — один из величайших фильмов всех времён.',
    poster: 'posters/26.jpg', trailer: 'sY1S34973zA', director: 'Фрэнсис Форд Коппола',
  },
  {
    id: 27, type: 'movie', title: 'Достать ножи 2', genre: 'Детектив',
    rating: 7.1, mood: ['fun', 'tense', 'cozy'],
    year: 2022, duration: '139 мин',
    description: 'Детектив Бенуа Блан расследует убийство на яхте технологического миллиардера. Остроумное продолжение с неожиданными поворотами.',
    poster: 'posters/27.jpg', trailer: '8MqYpFkYMJo', director: 'Райан Джонсон',
  },
  /* ── СЕРИАЛЫ ── */
  {
    id: 101, type: 'series', title: 'Тед Лассо', genre: 'Комедия',
    rating: 8.8, mood: ['fun', 'cozy', 'motivating'],
    year: 2020, duration: '3 сезона',
    description: 'Американский тренер по американскому футболу возглавляет британский футбольный клуб, не имея опыта. Позитивная, душевная история о лидерстве и доброте.',
    poster: 'posters/101.jpg', trailer: 'nDV7XdSXkm8', director: 'Apple TV+',
  },
  {
    id: 102, type: 'series', title: 'Настоящий детектив', genre: 'Детектив',
    rating: 9.0, mood: ['dark', 'tense'],
    year: 2014, duration: '4 сезона',
    description: 'Два детектива расследуют серию жестоких убийств в Луизиане на протяжении 17 лет. Атмосферный психологический триллер.',
    poster: 'posters/102.jpg', trailer: 'uK0mWJBCqFE', director: 'HBO',
  },
  {
    id: 103, type: 'series', title: 'Белый лотос', genre: 'Драма',
    rating: 7.9, mood: ['dark', 'cozy', 'tense'],
    year: 2021, duration: '2 сезона',
    description: 'Сатирический антология-триллер о гостях и персонале роскошного курортного отеля. Острая социальная сатира с отличной атмосферой.',
    poster: 'posters/103.jpg', trailer: 'pRmf0dJgBCE', director: 'HBO',
  },
  {
    id: 104, type: 'series', title: 'Очень странные дела', genre: 'Фантастика',
    rating: 8.7, mood: ['tense', 'cozy', 'fun'],
    year: 2016, duration: '4 сезона',
    description: 'В маленьком городке дети сталкиваются со сверхъестественными явлениями из параллельного мира. Ностальгическая смесь приключений и ужасов.',
    poster: 'posters/104.jpg', trailer: 'b9EkMc79ZSU', streamUrl: 'https://www.kinopoisk.ru/series/689918/', director: 'Netflix',
  },
  {
    id: 105, type: 'series', title: 'Succession', genre: 'Драма',
    rating: 8.9, mood: ['dark', 'tense'],
    year: 2018, duration: '4 сезона',
    description: 'Борьба за власть внутри дисфункциональной семьи медиамагната. Умная, жестокая и захватывающая история о власти и деньгах.',
    poster: 'posters/105.jpg', trailer: 'OzYxJV_rmE8', director: 'HBO',
  },
  {
    id: 106, type: 'series', title: 'Чернобыль', genre: 'История',
    rating: 9.4, mood: ['dark', 'tense', 'motivating'],
    year: 2019, duration: '5 эпизодов',
    description: 'Минисериал о катастрофе на Чернобыльской АЭС в 1986 году. Тщательно воссозданная, леденящая история о лжи и героизме.',
    poster: 'posters/106.jpg', trailer: 's9APLXM9Ei8', director: 'HBO/Sky',
  },
  {
    id: 107, type: 'series', title: 'Гравити Фолс', genre: 'Анимация',
    rating: 8.9, mood: ['fun', 'cozy', 'tense'],
    year: 2012, duration: '2 сезона',
    description: 'Брат и сестра проводят лето у двоюродного деда в таинственном городке, полном паранормальных явлений.',
    poster: 'posters/107.jpg', trailer: 'x9IaGLQdnmY', director: 'Disney',
  },
  {
    id: 108, type: 'series', title: 'Эйфория', genre: 'Драма',
    rating: 8.3, mood: ['dark', 'romantic'],
    year: 2019, duration: '2 сезона',
    description: 'Группа старшеклассников проживает истории о зависимости, идентичности и травме. Визуально завораживающая и эмоционально тяжёлая драма.',
    poster: 'posters/108.jpg', trailer: 'GbYCVNKhUs4', director: 'HBO',
  },
  /* ── НОВЫЕ СЕРИАЛЫ ── */
  {
    id: 109, type: 'series', title: 'Игра престолов', genre: 'Фэнтези',
    rating: 9.2, mood: ['dark', 'tense', 'motivating'],
    year: 2011, duration: '8 сезонов',
    description: 'Несколько могущественных семей борются за Железный трон в мире магии и драконов. Масштабная эпопея, изменившая стандарты телевизионного производства.',
    poster: 'posters/109.jpg', trailer: 'bjqg_aIHb4k', director: 'HBO',
  },
  {
    id: 110, type: 'series', title: 'Во все тяжкие', genre: 'Криминал',
    rating: 9.5, mood: ['dark', 'tense'],
    year: 2008, duration: '5 сезонов',
    description: 'Учитель химии, узнав о раке, начинает варить метамфетамин. Одна из лучших телевизионных историй о трансформации человека — от жертвы к злодею.',
    poster: 'posters/110.jpg', trailer: 'HhesaQXLuRY', director: 'AMC',
  },
  {
    id: 111, type: 'series', title: 'Чёрное зеркало', genre: 'Фантастика',
    rating: 8.8, mood: ['dark', 'tense'],
    year: 2011, duration: '6 сезонов',
    description: 'Антология историй о тёмных сторонах технологий и современного общества. Каждая серия — отдельная история, от сатирической до жуткой.',
    poster: 'posters/111.jpg', trailer: 'jDiYGjqJkOY', director: 'Netflix',
  },
  {
    id: 112, type: 'series', title: 'Ход королевы', genre: 'Драма',
    rating: 8.6, mood: ['motivating', 'dark', 'cozy'],
    year: 2020, duration: '7 эпизодов',
    description: 'Девочка-сирота становится гениальной шахматисткой и борется с зависимостью на пути к чемпионству. Захватывающий и красивый минисериал Netflix.',
    poster: 'posters/112.jpg', trailer: 'oZbQSdDlgBE', director: 'Netflix',
  },
  {
    id: 113, type: 'series', title: 'Пацаны', genre: 'Супергерои',
    rating: 8.7, mood: ['dark', 'tense', 'fun'],
    year: 2019, duration: '4 сезона',
    description: 'Группа людей противостоит коррумпированным супергероям, работающим на мегакорпорацию. Жёсткая сатира на супергеройский жанр и корпоративную культуру.',
    poster: 'posters/113.jpg', trailer: 'tEOCpMQxqQs', director: 'Amazon Prime',
  },
];



/* ============================================================
   AI MOCK RESPONSES
   Architecture ready for: POST /api/ai/recommend
   ============================================================ */

const AI_RESPONSES = {
  веселое: {
    text: '😄 Для хорошего настроения рекомендую:',
    movies: ['Большой куш', 'Тед Лассо', 'Достать ножи'],
    tip: 'Если хочешь чего-то совсем лёгкого — попробуй «Тед Лассо», поднимает настроение гарантированно 🏆',
  },
  грустное: {
    text: '😔 Когда грустно, иногда лучше не бороться. Вот что подойдёт:',
    movies: ['Вечное сияние', 'Ла-Ла Ленд', 'Мне бы в небо'],
    tip: 'Эти фильмы помогут прожить эмоцию — иногда это именно то, что нужно.',
  },
  ужасы: {
    text: '👻 Для острых ощущений:',
    movies: ['Настоящий детектив', 'Паразиты', 'Очень странные дела'],
    tip: 'Настоящий детектив — это не просто ужасы, это атмосфера. Смотри с первого сезона.',
  },
  романтика: {
    text: '💫 Для романтичного вечера:',
    movies: ['Ла-Ла Ленд', 'Вечное сияние', 'Жизнь Пи'],
    tip: '«Вечное сияние» — нестандартная, но очень глубокая история о любви.',
  },
  сериал: {
    text: '📺 Лучшие сериалы прямо сейчас:',
    movies: ['Тед Лассо', 'Succession', 'Чернобыль'],
    tip: 'Чернобыль — если ещё не смотрел, это must-watch. Всего 5 серий, но впечатление на месяц.',
  },
  'что посмотреть вечером': {
    text: '🌙 Для вечернего просмотра идеально подойдёт что-то не слишком тяжёлое:',
    movies: ['Достать ножи', 'Тед Лассо', 'Белый лотос'],
    tip: 'Достать ножи — универсальный выбор для вечера, смотрится легко и держит в тонусе.',
  },
  мрачное: {
    text: '🌑 Для мрачного, глубокого кино:',
    movies: ['Реквием по мечте', 'Настоящий детектив', 'Чернобыль'],
    tip: 'Предупреждаю: Реквием по мечте — очень сильный фильм, смотри осознанно.',
  },
  мотивация: {
    text: '🔥 Для вдохновения и мотивации:',
    movies: ['Гладиатор', 'Интерстеллар', 'Тед Лассо'],
    tip: 'Гладиатор — классика жанра. После него хочется свернуть горы.',
  },
  боевик: {
    text: '💥 Крутые боевики:',
    movies: ['Гладиатор', 'Отступники', 'Большой куш'],
    tip: 'Отступники — один из лучших криминальных фильмов Скорсезе.',
  },
  default: {
    text: '🎬 Вот несколько универсальных рекомендаций:',
    movies: ['Интерстеллар', 'Паразиты', 'Тед Лассо'],
    tip: 'Попробуй написать своё настроение или жанр — я подберу точнее!',
  },
};

/* ============================================================
   APP STATE
   ============================================================ */

const API_BASE = (() => {
  const isFileMode = window.location.protocol === 'file:';
  const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (isFileMode) return 'http://localhost:5000';
  if (isLocalhost && window.location.port && window.location.port !== '5000') return 'http://localhost:5000';
  return '';
})();

const AUTH_API_BASE = `${API_BASE}/api/auth`;
const AUTH_TOKEN_KEY = 'cineai_token';
const AUTH_USER_KEY = 'cineai_user';

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY) || 'null');
  } catch {
    return null;
  }
}

function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

function getFavoritesStorageKey() {
  const user = getCurrentUser();
  return user?.id ? `cineai_favorites_${user.id}` : 'cineai_favorites_guest';
}

function getFavoritesLibraryKey() {
  const user = getCurrentUser();
  return user?.id ? `cineai_fav_library_${user.id}` : 'cineai_fav_library_guest';
}

function loadFavorites() {
  try {
    const data = JSON.parse(localStorage.getItem(getFavoritesStorageKey()) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function loadFavoritesLibrary() {
  try {
    const data = JSON.parse(localStorage.getItem(getFavoritesLibraryKey()) || '{}');
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

function saveFavoritesLibrary(library) {
  localStorage.setItem(getFavoritesLibraryKey(), JSON.stringify(library));
}

function setAuthSession(user, token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

function applyAuthUI() {
  const user = getCurrentUser();
  const isAuthorized = Boolean(getAuthToken() && user);
  const btnLogin = document.getElementById('btnLogin');
  const btnRegister = document.getElementById('btnRegister');
  const btnProfile = document.getElementById('btnProfile');
  const btnLogout = document.getElementById('btnLogout');

  btnLogin?.classList.toggle('is-hidden', isAuthorized);
  btnRegister?.classList.toggle('is-hidden', isAuthorized);
  btnProfile?.classList.toggle('is-hidden', !isAuthorized);
  btnLogout?.classList.toggle('is-hidden', !isAuthorized);
  if (btnProfile && user?.name) {
    btnProfile.textContent = user.name.length > 14 ? `${user.name.slice(0, 14)}...` : user.name;
  }
}

const state = {
  currentTab: 'movies',        // 'movies' | 'series'
  currentMood: localStorage.getItem('cineai_mood') || 'all',
  currentFilter: 'all',
  favorites: loadFavorites(),
  searchQuery: '',
  aiTyping: false,
};

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

/**
 * Debounce — delays function execution
 * @param {Function} fn
 * @param {number} delay
 */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Sanitize HTML — prevent XSS
 * @param {string} str
 */
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Get emoji for rating
 * @param {number} rating
 */
function getRatingClass(rating) {
  if (rating >= 8) return 'movie-card__rating--high';
  if (rating >= 7) return 'movie-card__rating--mid';
  return 'movie-card__rating--low';
}

/**
 * Save favorites to localStorage
 * Ready for: POST /api/user/favorites
 */
function saveFavorites() {
  localStorage.setItem(getFavoritesStorageKey(), JSON.stringify(state.favorites));
}

/**
 * Toggle favorite status for a movie
 * @param {number} id
 */
function toggleFavorite(id) {
  const movie = MOVIES_DATA.find((item) => item.id === id);
  const library = loadFavoritesLibrary();
  const idx = state.favorites.indexOf(id);
  if (idx === -1) {
    state.favorites.push(id);
    if (movie) {
      library[id] = {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        year: movie.year,
        rating: movie.rating,
        type: movie.type,
      };
    }
  } else {
    state.favorites.splice(idx, 1);
    delete library[id];
  }
  saveFavorites();
  saveFavoritesLibrary(library);
  // Update all favorite buttons for this movie
  document.querySelectorAll(`[data-fav-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('active', state.favorites.includes(id));
    btn.title = state.favorites.includes(id) ? 'Убрать из избранного' : 'В избранное';
  });
  renderFavoritesSection();
}

/* ============================================================
   RENDER FUNCTIONS
   ============================================================ */

/**
 * Render a single movie card
 * @param {Object} movie
 * @returns {HTMLElement}
 */
function createMovieCard(movie) {
  const isFav = state.favorites.includes(movie.id);
  const ratingClass = getRatingClass(movie.rating);

  const card = document.createElement('article');
  card.className = 'movie-card reveal';
  card.setAttribute('role', 'listitem');
  card.setAttribute('data-id', movie.id);
  card.setAttribute('data-mood', movie.mood.join(' '));

  card.innerHTML = `
    <div class="movie-card__poster">
      ${movie.poster
        ? `<img class="movie-card__img" src="${movie.poster}" alt="${sanitize(movie.title)}" loading="lazy" onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<div class=\\'poster-placeholder\\'>🎬<span>${sanitize(movie.title)}</span></div>')">`
        : `<div class="poster-placeholder">🎬<span>${sanitize(movie.title)}</span></div>`
      }
      <button
        class="movie-card__favorite ${isFav ? 'active' : ''}"
        data-fav-id="${movie.id}"
        title="${isFav ? 'Убрать из избранного' : 'В избранное'}"
        aria-label="Добавить в избранное"
      >♥</button>
      <div class="movie-card__badge ${movie.type === 'series' ? 'movie-card__badge--series' : ''}">
        ${movie.type === 'series' ? 'Сериал' : 'Фильм'}
      </div>
    </div>
    <div class="movie-card__body">
      <h3 class="movie-card__title" title="${sanitize(movie.title)}">${sanitize(movie.title)}</h3>
      <div class="movie-card__meta">
        <span class="movie-card__genre">${sanitize(movie.genre)}</span>
        <span class="movie-card__rating ${ratingClass}">★ ${movie.rating}</span>
      </div>
      <button class="movie-card__btn" data-detail-id="${movie.id}">Подробнее</button>
    </div>
  `;

  // Favorite button
  card.querySelector('.movie-card__favorite').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(movie.id);
  });

  // Detail button
  card.querySelector('.movie-card__btn').addEventListener('click', () => {
    showMovieDetails(movie.id);
  });

  // Card click — also opens details
  card.querySelector('.movie-card__poster').addEventListener('click', () => {
    showMovieDetails(movie.id);
  });

  return card;
}

/**
 * Render movies/series to a grid container
 * @param {HTMLElement} container
 * @param {Array} data
 */
function renderMoviesToContainer(container, data) {
  container.innerHTML = '';
  if (!data.length) return false;
  const fragment = document.createDocumentFragment();
  data.forEach(movie => fragment.appendChild(createMovieCard(movie)));
  container.appendChild(fragment);
  // Trigger reveal animation
  requestAnimationFrame(() => {
    container.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  });
  return true;
}

/**
 * Main render: movies grid
 * Ready for: GET /api/movies?mood=&filter=
 */
function renderMovies() {
  const grid = document.getElementById('moviesGrid');
  const emptyState = document.getElementById('emptyState');
  const { currentFilter } = state;

  let data = MOVIES_DATA.filter(m => m.type === 'movie');

  if (currentFilter !== 'all') {
    data = data.filter(m => m.mood.includes(currentFilter));
  }

  const hasResults = renderMoviesToContainer(grid, data);
  emptyState.style.display = hasResults ? 'none' : 'block';
}

/**
 * Render series grid
 * Ready for: GET /api/series
 */
function renderSeries() {
  const grid = document.getElementById('seriesGrid');
  const data = MOVIES_DATA.filter(m => m.type === 'series');
  renderMoviesToContainer(grid, data);
}

/**
 * Render favorites section for current user
 */
function renderFavoritesSection() {
  const grid = document.getElementById('favoritesGrid');
  const empty = document.getElementById('favoritesEmpty');
  if (!grid || !empty) return;

  const data = MOVIES_DATA.filter((item) => state.favorites.includes(item.id));
  const hasResults = renderMoviesToContainer(grid, data);
  empty.style.display = hasResults ? 'none' : 'block';
}

/* ============================================================
   FILTER & SEARCH
   ============================================================ */

/**
 * Filter movies by mood
 * @param {string} mood
 */
function filterByMood(mood) {
  state.currentFilter = mood;
  state.currentMood = mood;
  localStorage.setItem('cineai_mood', mood);

  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('filter-btn--active', btn.dataset.filter === mood);
  });

  // Update mood cards
  document.querySelectorAll('.mood-card').forEach(card => {
    card.classList.toggle('active', card.dataset.mood === mood);
  });

  // Update mood tags in hero
  document.querySelectorAll('.mood-tag').forEach(tag => {
    tag.classList.toggle('active', tag.dataset.mood === mood);
  });

  renderMovies();

  // Scroll to movies section
  document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Pick and open a random movie
 */
function pickRandomMovie() {
  const randomBtn = document.getElementById('heroRandomBtn');
  randomBtn?.classList.add('btn--random-spin');
  setTimeout(() => randomBtn?.classList.remove('btn--random-spin'), 650);

  const movies = MOVIES_DATA.filter((item) => item.type === 'movie');
  if (!movies.length) {
    showToast('No movies available');
    return;
  }

  let source = movies;
  if (state.currentMood && state.currentMood !== 'all') {
    const moodFiltered = movies.filter((item) => item.mood?.includes(state.currentMood));
    if (moodFiltered.length) source = moodFiltered;
  }

  const randomMovie = source[Math.floor(Math.random() * source.length)];
  switchTab('movies');
  showMovieDetails(randomMovie.id);
  showToast(`Random pick: ${randomMovie.title}`);
}

/**
 * Search movies by query
 * @param {string} query
 * Ready for: GET /api/search?q=
 */
function searchMovies(query) {
  state.searchQuery = query.toLowerCase().trim();
  const resultsEl = document.getElementById('searchResults');

  if (!state.searchQuery) {
    resultsEl.classList.remove('active');
    resultsEl.innerHTML = '';
    return;
  }

  const results = MOVIES_DATA.filter(m =>
    m.title.toLowerCase().includes(state.searchQuery) ||
    m.genre.toLowerCase().includes(state.searchQuery) ||
    m.description.toLowerCase().includes(state.searchQuery)
  ).slice(0, 6);

  if (!results.length) {
    resultsEl.innerHTML = '<div class="search-result-item"><div class="search-result-item__info"><h4>Ничего не найдено</h4><span>Попробуйте другой запрос</span></div></div>';
    resultsEl.classList.add('active');
    return;
  }

  resultsEl.innerHTML = results.map(m => `
    <div class="search-result-item" data-id="${m.id}" role="option">
            ${m.poster
        ? `<img src="${m.poster}" alt="${sanitize(m.title)}" class="search-result-item__poster" loading="lazy" onerror="this.outerHTML='<div class=\\'search-result-item__poster poster-placeholder\\'>&#127916;</div>'">`
        : `<div class="search-result-item__poster poster-placeholder">&#127916;</div>`
      }
      <div class="search-result-item__info">
        <h4>${sanitize(m.title)}</h4>
        <span>${sanitize(m.genre)} · ${m.year} · ★${m.rating}</span>
      </div>
    </div>
  `).join('');

  resultsEl.classList.add('active');

  resultsEl.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.id);
      if (id) showMovieDetails(id);
      resultsEl.classList.remove('active');
      document.getElementById('searchInput').value = '';
    });
  });
}

/* ============================================================
   MOVIE DETAILS MODAL
   Ready for: GET /api/movies/:id
   ============================================================ */

/**
 * Show movie details in modal
 * @param {number} id
 */
function showMovieDetails(id) {
  const movie = MOVIES_DATA.find(m => m.id === id);
  if (!movie) return;

  const isFav = state.favorites.includes(movie.id);
  const ratingClass = getRatingClass(movie.rating);

  const content = document.getElementById('movieModalContent');
  content.innerHTML = `
    ${movie.poster
      ? `<img src="${movie.poster}" alt="${sanitize(movie.title)}" class="movie-modal__poster-img" style="width:100%;max-height:320px;object-fit:cover;border-radius:var(--radius-lg) var(--radius-lg) 0 0;" onerror="this.outerHTML='<div class=\\'movie-modal__poster-placeholder\\'>🎬</div>'">`
      : `<div class="movie-modal__poster-placeholder">🎬</div>`
    }
    <div class="movie-modal__body">
      <div class="movie-modal__genre-row">
        <span class="movie-modal__genre-tag">${sanitize(movie.genre)}</span>
        <span class="movie-modal__genre-tag">${movie.type === 'series' ? 'Сериал' : 'Фильм'}</span>
        <span class="movie-modal__genre-tag">${movie.year}</span>
      </div>
      <h2 class="movie-modal__title">${sanitize(movie.title)}</h2>
      <div class="movie-modal__meta">
        <span class="movie-modal__rating ${ratingClass}">★ ${movie.rating}</span>
        <span>${movie.duration}</span>
        <span>${sanitize(movie.director)}</span>
      </div>
      <p class="movie-modal__desc">${sanitize(movie.description)}</p>
      <div class="movie-modal__actions">
        <button class="btn btn--primary" id="watchFullBtn">🎬 Смотреть фильм</button>
        <button class="btn btn--outline" id="watchTrailerBtn">▶ Трейлер</button>
        <button class="btn btn--ghost ${isFav ? 'active' : ''}" id="modalFavBtn" data-fav-id="${movie.id}">
          ${isFav ? '♥ В избранном' : '♡ В избранное'}
        </button>
        <button class="btn btn--ghost" id="askAiAboutMovie" data-title="${sanitize(movie.title)}">◈ Спросить AI</button>
      </div>
    </div>
  `;

  document.getElementById('modalFavBtn').addEventListener('click', function () {
    toggleFavorite(movie.id);
    const isFavNow = state.favorites.includes(movie.id);
    this.textContent = isFavNow ? '♥ В избранном' : '♡ В избранное';
    this.classList.toggle('active', isFavNow);
  });

  document.getElementById('askAiAboutMovie').addEventListener('click', () => {
    closeModal('movieModal');
    openAiChat();
    setTimeout(() => {
      const input = document.getElementById('aiInput');
      input.value = `Расскажи про фильм "${movie.title}"`;
      input.focus();
    }, 300);
  });

  document.getElementById('watchTrailerBtn').addEventListener('click', () => {
    if (movie.trailer) {
      openVideoPlayer(movie.title, movie.trailer, 'trailer');
    } else {
      showToast('Трейлер для этого фильма недоступен 🎬');
    }
  });

  document.getElementById('watchFullBtn').addEventListener('click', () => {
    if (movie.streamUrl) {
      openVideoPlayer(movie.title, null, 'full', movie.streamUrl);
    } else {
      showToast('Полный фильм временно недоступен. Скоро добавим! 🍿');
    }
  });

  openModal('movieModal');
}

/* ============================================================
   TAB SWITCHING
   ============================================================ */

/**
 * Switch between movies and series tabs
 * @param {string} tab
 */
function switchTab(tab) {
  state.currentTab = tab;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('tab-btn--active', btn.dataset.tab === tab);
  });

  const moviesSection = document.getElementById('movies');
  const seriesSection = document.getElementById('series');

  if (tab === 'movies') {
    moviesSection.style.display = '';
    seriesSection.style.display = 'none';
    renderMovies();
  } else {
    moviesSection.style.display = 'none';
    seriesSection.style.display = '';
    renderSeries();
  }
}

/* ============================================================
   MODAL MANAGEMENT
   ============================================================ */

/**
 * Open a modal by ID
 * @param {string} id
 */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close a modal by ID
 * @param {string} id
 */
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function openAiChat() { openModal('aiModal'); }
function closeAiChat() { closeModal('aiModal'); }

/* ============================================================
   AI CHAT
   Architecture ready for: POST /api/ai/recommend
   ============================================================ */

/**
 * Find AI response based on user input keywords
 * @param {string} input
 * @returns {Object}
 */
function findAiResponse(input) {
  const lower = input.toLowerCase();

  // Exact key match first
  for (const key of Object.keys(AI_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) {
      return AI_RESPONSES[key];
    }
  }

  // Fuzzy match
  if (lower.match(/комедия|смешн|поднять настроени/)) return AI_RESPONSES['веселое'];
  if (lower.match(/грусть|плохо|депресс|тяжело/)) return AI_RESPONSES['грустное'];
  if (lower.match(/страшн|хоррор|мистика/)) return AI_RESPONSES['ужасы'];
  if (lower.match(/любов|отношен|пара|свидан/)) return AI_RESPONSES['романтика'];
  if (lower.match(/вечер|отдохнуть|устал|расслаб/)) return AI_RESPONSES['что посмотреть вечером'];
  if (lower.match(/напряж|экшн|action|трилл/)) return AI_RESPONSES['мрачное'];
  if (lower.match(/вдохновен|мотив|силы/)) return AI_RESPONSES['мотивация'];

  return AI_RESPONSES.default;
}

/**
 * Add a message to the AI chat
 * @param {string} content - HTML content
 * @param {'user'|'ai'} role
 */
function addChatMessage(content, role) {
  const messages = document.getElementById('chatMessages');
  const wrapper = document.createElement('div');
  wrapper.className = `chat-msg chat-msg--${role}`;

  if (role === 'ai') {
    wrapper.innerHTML = `
      <div class="chat-msg__avatar">◈</div>
      <div class="chat-msg__bubble">${content}</div>
    `;
  } else {
    wrapper.innerHTML = `<div class="chat-msg__bubble">${sanitize(content)}</div>`;
  }

  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
  return wrapper;
}

/* ============================================================
   AI CHAT — Real Llama via Ollama API
   Ollama должен быть запущен: ollama serve
   Модель: ollama pull llama3
   API endpoint: http://localhost:11434/api/chat
   ============================================================ */

const LLAMA_API = 'http://localhost:11434/api/chat';
const LLAMA_MODEL = 'llama3'; // или llama3.2, mistral, gemma2 — смотри: ollama list

/**
 * Send message to local Llama via Ollama API
 * @param {string} userInput
 */
async function sendAiMessage(userInput) {
  if (!userInput.trim() || state.aiTyping) return;
  state.aiTyping = true;

  addChatMessage(userInput, 'user');
  document.getElementById('aiInput').value = '';

  // Show typing indicator
  const typingEl = addChatMessage('<span></span><span></span><span></span>', 'ai');
  typingEl.querySelector('.chat-msg__bubble').classList.add('chat-msg__bubble--typing');

  try {
    const movieTitles = MOVIES_DATA.map(m => `${m.title} (${m.year}, ${m.genre}, рейтинг ${m.rating})`).join(', ');

    const response = await fetch(LLAMA_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: LLAMA_MODEL,
        stream: false,
        messages: [
          {
            role: 'system',
            content: `Ты — кино-ассистент CineAI. Отвечай ТОЛЬКО на русском языке. Рекомендуй фильмы по настроению или жанру пользователя. 
Вот фильмы и сериалы в нашей базе: ${movieTitles}.
Когда рекомендуешь — обязательно упоминай названия из базы. Отвечай коротко (3-5 предложений максимум), дружелюбно.`,
          },
          { role: 'user', content: userInput },
        ],
      }),
    });

    typingEl.remove();

    if (!response.ok) {
      throw new Error(`Ollama вернул ${response.status}`);
    }

    const data = await response.json();
    const text = data.message?.content || 'Нет ответа от модели.';

    // Format: turn newlines into <br>, bold **text**
    const formatted = sanitize(text)
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    addChatMessage(formatted, 'ai');

  } catch (err) {
    typingEl.remove();

    // Fallback to mock if Ollama not running
    console.warn('Ollama недоступен, использую mock:', err.message);
    const response = findAiResponse(userInput);
    const moviesList = response.movies.map(t => `<li>🎬 <strong>${sanitize(t)}</strong></li>`).join('');
    const aiHtml = `
      ${sanitize(response.text)}
      <ul style="margin-top:8px;">${moviesList}</ul>
      <p style="margin-top:10px;font-size:0.82rem;opacity:0.7;">💡 ${sanitize(response.tip)}</p>
      <p style="margin-top:8px;font-size:0.75rem;color:var(--accent-ai);opacity:0.8;">⚠️ Llama недоступна. Запусти: <code>ollama serve</code></p>
    `;
    addChatMessage(aiHtml, 'ai');
  }

  state.aiTyping = false;
}


/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */

function showToast(message) {
  const existing = document.getElementById('toastNotification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toastNotification';
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1);
    color: #f0f0f8; padding: 12px 24px; border-radius: 100px;
    font-size: 0.875rem; z-index: 9999; white-space: nowrap;
    animation: fadeInUp 0.3s ease; font-family: var(--font-body);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ============================================================
   AUTH MODAL
   Ready for: POST /api/auth/register, POST /api/auth/login
   ============================================================ */

let authMode = 'login'; // 'login' | 'register'

function switchAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.classList.toggle('auth-tab--active', tab.dataset.auth === mode);
  });

  const nameGroup = document.getElementById('nameGroup');
  const submitBtn = document.getElementById('authSubmit');
  nameGroup.style.display = mode === 'register' ? 'flex' : 'none';
  submitBtn.textContent = mode === 'register' ? 'Зарегистрироваться' : 'Войти';

  // Clear errors
  ['nameError', 'emailError', 'passwordError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
  document.getElementById('authMsg').textContent = '';
}

/**
 * Validate auth form
 * @returns {boolean}
 */
function validateAuthForm() {
  let valid = true;
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const name = document.getElementById('authName').value.trim();

  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('nameError').textContent = '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('emailError').textContent = 'Введите корректный email';
    valid = false;
  }
  if (!password || password.length < 6) {
    document.getElementById('passwordError').textContent = 'Минимум 6 символов';
    valid = false;
  }
  if (authMode === 'register' && !name) {
    document.getElementById('nameError').textContent = 'Введите ваше имя';
    valid = false;
  }
  return valid;
}

/**
 * Handle auth form submission
 * Ready for: POST /api/auth/login or /api/auth/register
 */
async function handleAuthSubmit(e) {
  e.preventDefault();
  if (!validateAuthForm()) return;

  const btn = document.getElementById('authSubmit');
  btn.textContent = 'Загрузка...';
  btn.disabled = true;

  await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API delay

  /* --- Future: Replace with real fetch ---
  const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  const data = await res.json();
  if (data.token) localStorage.setItem('cineai_token', data.token);
  ---------------------------------------- */

  document.getElementById('authMsg').textContent =
    authMode === 'login' ? '✓ Добро пожаловать!' : '✓ Аккаунт создан!';
  document.getElementById('authMsg').style.color = '#00d4ff';

  setTimeout(() => {
    closeModal('authModal');
    showToast(authMode === 'login' ? 'Добро пожаловать в CineAI! 🎬' : 'Аккаунт создан. Добро пожаловать!');
    btn.disabled = false;
    btn.textContent = authMode === 'register' ? 'Зарегистрироваться' : 'Войти';
  }, 1200);
}

/* ============================================================
   VIDEO PLAYER — Opens YouTube trailer in playerModal
   ============================================================ */

/**
 * Open video player modal
 * @param {string} title — movie title for the header
 * @param {string|null} youtubeId — YouTube video ID (for trailers)
 * @param {'trailer'|'full'} mode — what we're opening
 * @param {string|null} streamUrl — external stream URL (for full movie)
 */
function openVideoPlayer(title, youtubeId, mode = 'trailer', streamUrl = null) {
  const iframe = document.getElementById('playerIframe');
  const playerTitle = document.getElementById('playerTitle');
  if (!iframe || !playerTitle) return;

  if (mode === 'trailer' && youtubeId) {
    playerTitle.textContent = `▶ Трейлер — ${title}`;
    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
    openModal('playerModal');
  } else if (mode === 'full' && streamUrl) {
    // Open full movie in new tab (Kinopoisk, Netflix, etc.)
    playerTitle.textContent = `🎬 ${title}`;
    // Show a nice redirect screen inside the player modal
    iframe.src = '';
    openModal('playerModal');
    // Replace iframe with a redirect card
    const playerBody = iframe.parentElement;
    let redirectCard = document.getElementById('playerRedirectCard');
    if (!redirectCard) {
      redirectCard = document.createElement('div');
      redirectCard.id = 'playerRedirectCard';
      redirectCard.style.cssText = `
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        gap:20px; padding:40px; text-align:center; height:100%;
        background: linear-gradient(135deg,#0a0a1a 0%,#12122a 100%);
        border-radius: var(--radius-lg,12px);
      `;
      playerBody.insertBefore(redirectCard, iframe);
    }
    redirectCard.style.display = 'flex';
    iframe.style.display = 'none';
    redirectCard.innerHTML = `
      <div style="font-size:4rem;">🎬</div>
      <h2 style="color:#f0f0f8;font-family:var(--font-heading,'Syne'),sans-serif;font-size:1.4rem;">${sanitize(title)}</h2>
      <p style="color:rgba(240,240,248,0.6);font-size:0.9rem;max-width:320px;">
        Полный фильм доступен на стриминговой платформе. Нажми кнопку ниже для перехода.
      </p>
      <a href="${streamUrl}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;background:linear-gradient(135deg,#e94560,#c23152);
                color:#fff;padding:14px 32px;border-radius:100px;text-decoration:none;
                font-weight:600;font-size:1rem;transition:opacity 0.2s;"
         onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
        Смотреть на Кинопоиске →
      </a>
      <p style="color:rgba(240,240,248,0.35);font-size:0.75rem;">
        Откроется в новой вкладке
      </p>
    `;
  }
}

/**
 * Close video player and stop playback
 */
function closeVideoPlayer() {
  const iframe = document.getElementById('playerIframe');
  if (iframe) {
    iframe.src = '';
    iframe.style.display = '';
  }
  const redirectCard = document.getElementById('playerRedirectCard');
  if (redirectCard) redirectCard.style.display = 'none';
  closeModal('playerModal');
}

/* ============================================================
   THEME TOGGLE — Dark / Light
   ============================================================ */

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Restore saved theme
  const saved = localStorage.getItem('cineai_theme') || 'dark';
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      btn.textContent = '🌙';
      localStorage.setItem('cineai_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      btn.textContent = '☀️';
      localStorage.setItem('cineai_theme', 'light');
    }
  });
}



function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section, .step-card, .compare-card, .mood-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

/* ============================================================
   HEADER SCROLL EFFECT
   ============================================================ */

function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ============================================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile nav if open
        document.getElementById('mainNav').classList.remove('open');
      }
    });
  });
}

/* ============================================================
   MOBILE BURGER MENU
   ============================================================ */

function initBurger() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

/* ============================================================
   AI DEMO CHAT — demo typing animation loop
   ============================================================ */

function initDemoChat() {
  const bubble = document.getElementById('demoTyping');
  if (!bubble) return;

  setTimeout(() => {
    bubble.classList.remove('chat-msg__bubble--typing');
    bubble.innerHTML = `
      <strong>Тед Лассо</strong> — это сериал Apple TV+ про американского тренера,
      который возглавляет британский футбольный клуб. Никакого опыта, зато масса оптимизма. 
      Это один из самых добрых и вдохновляющих сериалов последних лет. 🏆
    `;
  }, 2000);
}

/* ============================================================
   PRELOADER
   ============================================================ */

function initPreloader() {
  const hide = () => {
    setTimeout(() => {
      const el = document.getElementById('preloader');
      if (el) el.classList.add('hidden');
    }, 1200);
  };

  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide);
    // Failsafe: force-hide after 3s no matter what
    setTimeout(() => {
      const el = document.getElementById('preloader');
      if (el) el.classList.add('hidden');
    }, 3000);
  }
}

/* ============================================================
   EVENT LISTENERS SETUP
   ============================================================ */

function bindEvents() {
  // Header AI button
  document.getElementById('btnOpenAI')?.addEventListener('click', openAiChat);
  // Section AI button
  document.getElementById('openAiFromSection')?.addEventListener('click', openAiChat);
  // Hero AI button
  document.getElementById('heroAiBtn')?.addEventListener('click', openAiChat);
  document.getElementById('heroRandomBtn')?.addEventListener('click', pickRandomMovie);

  // Close AI modal
  document.getElementById('closeAiModal')?.addEventListener('click', closeAiChat);

  // Close Movie modal
  document.getElementById('closeMovieModal')?.addEventListener('click', () => closeModal('movieModal'));

  // Close Auth modal
  document.getElementById('closeAuthModal')?.addEventListener('click', () => closeModal('authModal'));

  // Auth buttons
  document.getElementById('btnLogin')?.addEventListener('click', () => {
    switchAuthMode('login');
    openModal('authModal');
  });
  document.getElementById('btnRegister')?.addEventListener('click', () => {
    switchAuthMode('register');
    openModal('authModal');
  });
  document.getElementById('btnLogout')?.addEventListener('click', () => {
    clearAuthSession();
    state.favorites = loadFavorites();
    applyAuthUI();
    renderMovies();
    renderSeries();
    renderFavoritesSection();
    showToast('Logged out');
  });
  document.getElementById('heroWatchBtn')?.addEventListener('click', () => {
    if (getAuthToken()) {
      document.getElementById('favorites')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      switchAuthMode('register');
      openModal('authModal');
    }
  });

  // Auth tabs
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => switchAuthMode(tab.dataset.auth));
  });

  // Auth form
  document.getElementById('authForm')?.addEventListener('submit', handleAuthSubmit);

  // Close player modal
  document.getElementById('closePlayerModal')?.addEventListener('click', closeVideoPlayer);

  // Close player on overlay click
  document.getElementById('playerModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('playerModal')) closeVideoPlayer();
  });

  // Close other modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Escape key to close modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  searchInput?.addEventListener('input', debounce(e => searchMovies(e.target.value), 250));
  searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('searchResults').classList.remove('active');
      searchInput.value = '';
    }
  });

  // Hide search results on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.hero__search')) {
      document.getElementById('searchResults')?.classList.remove('active');
    }
  });

  // Tab buttons (movies / series)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Filter bar
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterByMood(btn.dataset.filter));
  });

  // Mood cards (section)
  document.querySelectorAll('.mood-card').forEach(card => {
    card.addEventListener('click', () => filterByMood(card.dataset.mood));
  });

  // Mood tags (hero)
  document.querySelectorAll('.mood-tag').forEach(tag => {
    tag.addEventListener('click', () => filterByMood(tag.dataset.mood));
  });

  // Reset filter
  document.getElementById('resetFilter')?.addEventListener('click', () => filterByMood('all'));

  // AI chat send button
  document.getElementById('aiSendBtn')?.addEventListener('click', () => {
    const input = document.getElementById('aiInput');
    sendAiMessage(input.value);
  });

  // AI chat enter key
  document.getElementById('aiInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const input = document.getElementById('aiInput');
      sendAiMessage(input.value);
    }
  });

  // AI quick buttons
  document.querySelectorAll('.ai-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.dataset.query;
      document.getElementById('aiInput').value = query;
      sendAiMessage(query);
    });
  });
}

/* ============================================================
   INIT — Application Bootstrap
   ============================================================ */

function init() {
  initPreloader();
  initThemeToggle();
  initHeader();
  initSmoothScroll();
  initBurger();
  bindEvents();

  // Render initial content
  applyAuthUI();
  renderMovies();
  renderSeries();
  renderFavoritesSection();
  initScrollReveal();
  initDemoChat();

  // Restore saved mood filter
  if (state.currentMood && state.currentMood !== 'all') {
    // Apply saved mood visually without re-rendering on load
    document.querySelectorAll(`[data-mood="${state.currentMood}"]`).forEach(el => {
      el.classList.add('active');
    });
  }

  console.log('🎬 CineAI initialized. Favorites:', state.favorites.length, 'saved.');
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);

/* ============================================================
   AUTH OVERRIDE (real API)
   ============================================================ */
async function handleAuthSubmit(e) {
  e.preventDefault();
  if (!validateAuthForm()) return;

  const currentMode = authMode;
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const name = document.getElementById('authName').value.trim();
  const msg = document.getElementById('authMsg');
  const btn = document.getElementById('authSubmit');

  btn.textContent = 'Loading...';
  btn.disabled = true;

  try {
    const endpoint = `${AUTH_API_BASE}/${currentMode === 'login' ? 'login' : 'register'}`;
    const payload = currentMode === 'login'
      ? { email, password }
      : { name, email, password };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success || !data.token || !data.user) {
      throw new Error(data.message || `Auth failed: ${res.status}`);
    }

    setAuthSession(data.user, data.token);
    state.favorites = loadFavorites();
    applyAuthUI();
    renderMovies();
    renderSeries();
    renderFavoritesSection();

    msg.textContent = currentMode === 'login' ? 'Success login' : 'Account created';
    msg.style.color = '#00d4ff';

    setTimeout(() => {
      closeModal('authModal');
      showToast(currentMode === 'login' ? 'Welcome back' : 'Registration complete');
      document.getElementById('authForm')?.reset();
      switchAuthMode('login');
    }, 700);
  } catch (error) {
    msg.textContent = error.message || 'Request failed';
    msg.style.color = '#e94560';
  } finally {
    btn.disabled = false;
    btn.textContent = currentMode === 'register' ? 'Register' : 'Login';
  }
}
