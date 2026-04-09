'use strict';

const API_BASE = (() => {
  const isFileMode = window.location.protocol === 'file:';
  const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (isFileMode) return 'http://localhost:5000';
  if (isLocalhost && window.location.port && window.location.port !== '5000') return 'http://localhost:5000';
  return '';
})();

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

function loadFavoriteIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(getFavoritesStorageKey()) || '[]');
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

function loadFavoriteLibrary() {
  try {
    const library = JSON.parse(localStorage.getItem(getFavoritesLibraryKey()) || '{}');
    return library && typeof library === 'object' ? library : {};
  } catch {
    return {};
  }
}

function saveFavorites(ids, library) {
  localStorage.setItem(getFavoritesStorageKey(), JSON.stringify(ids));
  localStorage.setItem(getFavoritesLibraryKey(), JSON.stringify(library));
}

function sanitize(value) {
  const div = document.createElement('div');
  div.textContent = String(value ?? '');
  return div.innerHTML;
}

function createFavoriteCard(item) {
  const article = document.createElement('article');
  article.className = 'favorite-card';
  article.innerHTML = `
    <img class="favorite-card__poster" src="${sanitize(item.poster || '')}" alt="${sanitize(item.title || 'Favorite')}" loading="lazy" onerror="this.style.opacity='0.25'" />
    <div class="favorite-card__body">
      <h3 class="favorite-card__title">${sanitize(item.title || 'Untitled')}</h3>
      <div class="favorite-card__meta">${sanitize(item.type || 'movie')} • ${sanitize(item.year || '-')} • ★${sanitize(item.rating ?? '-')}</div>
      <button class="favorite-card__remove" data-remove-id="${sanitize(item.id)}">Remove</button>
    </div>
  `;
  return article;
}

function renderFavorites() {
  const grid = document.getElementById('profileFavoritesGrid');
  const empty = document.getElementById('profileFavoritesEmpty');
  const countEl = document.getElementById('favCount');

  if (!grid || !empty || !countEl) return;

  if (!getAuthToken() || !getCurrentUser()) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    countEl.textContent = '0';
    return;
  }

  const ids = loadFavoriteIds();
  const library = loadFavoriteLibrary();
  const items = ids.map((id) => library[id]).filter(Boolean);

  grid.innerHTML = '';
  if (!items.length) {
    empty.style.display = 'block';
    countEl.textContent = '0';
    return;
  }

  empty.style.display = 'none';
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(createFavoriteCard(item)));
  grid.appendChild(fragment);
  countEl.textContent = String(items.length);

  grid.querySelectorAll('[data-remove-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = Number(button.dataset.removeId);
      const newIds = ids.filter((id) => id !== targetId);
      delete library[targetId];
      saveFavorites(newIds, library);
      renderFavorites();
    });
  });
}

async function hydrateProfileFromApi() {
  const token = getAuthToken();
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success || !data.data) return;

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify({
      id: data.data._id || data.data.id,
      name: data.data.name,
      email: data.data.email,
      role: data.data.role,
    }));
  } catch {
    // Keep local profile data if API unavailable
  }
}

function renderProfileInfo() {
  const user = getCurrentUser();
  const token = getAuthToken();

  const nameEl = document.getElementById('profileName');
  const emailEl = document.getElementById('profileEmail');
  const avatarEl = document.getElementById('profileAvatar');
  const statusEl = document.getElementById('profileStatus');
  const accountTypeEl = document.getElementById('accountType');

  if (!nameEl || !emailEl || !avatarEl || !statusEl || !accountTypeEl) return;

  if (!token || !user) {
    nameEl.textContent = 'Guest';
    emailEl.textContent = 'Please sign in';
    avatarEl.textContent = 'G';
    statusEl.textContent = 'Not authenticated';
    accountTypeEl.textContent = 'Guest';
    return;
  }

  nameEl.textContent = user.name || 'User';
  emailEl.textContent = user.email || 'No email';
  avatarEl.textContent = (user.name || 'U').slice(0, 1).toUpperCase();
  statusEl.textContent = 'Signed in';
  accountTypeEl.textContent = (user.role || 'user').toUpperCase();
}

function bindEvents() {
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = 'index.html';
  });
}

async function init() {
  bindEvents();
  await hydrateProfileFromApi();
  renderProfileInfo();
  renderFavorites();
}

document.addEventListener('DOMContentLoaded', init);
