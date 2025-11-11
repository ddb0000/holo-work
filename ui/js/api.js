const TOKEN_KEY = 'holo_jwt';
let memoryToken = null;

const DEFAULT_API_BASE =
  window.__HOLO_API__ ||
  (location.port === '4173' || location.port === '4174' ? 'http://127.0.0.1:8787' : '');

export function getToken() {
  if (memoryToken) return memoryToken;
  memoryToken = sessionStorage.getItem(TOKEN_KEY);
  return memoryToken;
}

export function setToken(token) {
  memoryToken = token;
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export function ensureAuth() {
  if (!getToken()) {
    window.location.href = 'index.html';
  }
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getToken();
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  if (options.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }
  const url = buildUrl(path);
  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    setToken(null);
    window.location.href = 'index.html';
    return null;
  }
  if (!response.ok) {
    let details;
    try {
      details = await response.json();
    } catch (err) {
      details = { error: response.statusText };
    }
    throw new Error(details.error || 'Request failed');
  }
  if (response.status === 204) return null;
  return response.json();
}

function buildUrl(path) {
  if (path.startsWith('http')) return path;
  if (!DEFAULT_API_BASE) return path;
  if (path.startsWith('/')) {
    return `${DEFAULT_API_BASE}${path}`;
  }
  return `${DEFAULT_API_BASE}/${path}`;
}

export function formToJSON(form) {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}
