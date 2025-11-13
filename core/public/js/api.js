const TOKEN_KEY = 'holo_jwt';
const UID_KEY = 'holo_uid';
let memoryToken = null;

const getAPIBase = () => window.__CONFIG__?.API_BASE || 'https://holo-work.dbarcelloz.workers.dev';

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

function getAnonId() {
  let uid = localStorage.getItem(UID_KEY);
  if (uid) return uid;
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  uid = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  localStorage.setItem(UID_KEY, uid);
  return uid;
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getToken();
  const authToken = token ? `Bearer ${token}` : `Bearer anon:${getAnonId()}`;
  headers.set('authorization', authToken);
  if (options.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }
  if (options.etag) {
    const etagKey = `etag:${path}`;
    const stored = localStorage.getItem(etagKey);
    if (stored) {
      headers.set('if-none-match', stored);
    }
  }
  const url = buildUrl(path);
  const response = await fetch(url, { ...options, headers });
  if (response.status === 401 && token) {
    setToken(null);
    window.location.href = 'index.html';
    return null;
  }
  if (options.etag && response.status === 304) {
    const cached = sessionStorage.getItem(`cache:${path}`);
    return cached ? JSON.parse(cached) : null;
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
  const data = await response.json();
  if (options.etag) {
    const etag = response.headers.get('etag');
    if (etag) {
      localStorage.setItem(`etag:${path}`, etag);
      sessionStorage.setItem(`cache:${path}`, JSON.stringify(data));
    }
  }
  return data;
}

function buildUrl(path) {
  if (path.startsWith('http')) return path;
  const base = getAPIBase();
  if (!base) return path;
  if (path.startsWith('/')) {
    return `${base}${path}`;
  }
  return `${base}/${path}`;
}

export function formToJSON(form) {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}
