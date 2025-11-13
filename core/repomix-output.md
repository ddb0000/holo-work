This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where comments have been removed, empty lines have been removed.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Empty lines have been removed from all files
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
public/
  assets/
    README.md
  css/
    style.css
  js/
    admin.js
    api.js
    config.js
    index.js
    room.js
  admin.html
  index.html
  room.html
scripts/
  iot_sim.py
sql/
  schema.sql
  seed.sql
worker/
  .wrangler/
    tmp/
      bundle-W7ZLgd/
        middleware-insertion-facade.js
        middleware-loader.entry.ts
      dev-KeMLqf/
        index.js
        index.js.map
  src/
    access.ts
    agent.ts
    auth.ts
    cache.ts
    dashboard.ts
    db.ts
    index.ts
    iot.ts
    ratelimit.ts
    rooms.ts
    types.ts
    utils.ts
  test/
    test/
      agent.test.ts
      auth.test.ts
  tsconfig.json
  wrangler.toml
package.json
tsconfig.json
```

# Files

## File: public/assets/README.md
```markdown
# assets
Drop regenerated avatar/tile/atlas PNGs here for the core Pages site so they can be served with immutable headers.
```

## File: public/css/style.css
```css
:root {
  --bg: #0b0b0c;
  --bg-1: #111114;
  --bg-2: #17171b;
  --fg: #e8e8ef;
  --fg-muted: #b4b4c3;
  --muted: #7d7d8c;
  --border: #2a2a33;
  --plum-core: #422d41;
  --accent: #22e3b3;
  --accent-2: #7aa2ff;
  --accent-3: #b58cff;
  --ring: color-mix(in oklab, var(--accent) 20%, transparent);
  --grid-line: color-mix(in oklab, var(--accent-2) 18%, transparent);
  --card-bg: #1a1a21;
  --panel-bg: #15151a;
  --elev: 0 20px 45px rgba(0,0,0,.45), 0 0 0 1px var(--border);
  --success: #30e39a;
  --warning: #f6c56a;
  --danger:  #ff6b7a;
}
* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  min-height: 100vh;
  color: var(--fg);
  background:
    radial-gradient(1200px 600px at 50% -10%, var(--plum-core) 0%, transparent 60%),
    radial-gradient(1000px 800px at 120% 0%, #13212a 0%, transparent 50%),
    var(--bg);
  background-color: var(--bg);
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
a {
  color: var(--accent-2);
  text-decoration: none;
  transition: color .15s ease, opacity .15s ease;
}
a:hover { color: var(--accent); }
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
.card {
  background: var(--card-bg);
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: var(--elev);
  padding: 2rem;
}
button, input, select, textarea {
  font: inherit;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--panel-bg);
  color: var(--fg);
  outline: none;
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease, background .15s ease;
}
input:focus, select:focus, textarea:focus { box-shadow: 0 0 0 3px var(--ring); border-color: var(--accent-2); }
button {
  background: linear-gradient(180deg, color-mix(in oklab, var(--accent) 92%, #0a0a0a) 0%, var(--accent) 100%);
  color: #0b0b0c;
  border: none;
  cursor: pointer;
}
button:hover { transform: translateY(-1px); box-shadow: 0 10px 28px color-mix(in oklab, var(--accent) 35%, transparent); }
button:active { transform: translateY(0); }
.login-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: var(--fg-muted);
}
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tabs button {
  flex: 1;
  background: var(--panel-bg);
  color: var(--muted);
  border: 1px solid var(--border);
}
.tabs button.active {
  background: linear-gradient(180deg, color-mix(in oklab, var(--accent-2) 85%, #0a0a0a) 0%, var(--accent-2) 100%);
  color: #0b0b0c;
}
.panel { display: none; }
.panel.active { display: block; }
.room-layout {
  display: grid;
  gap: 1.5rem;
}
.map-card {
  background: var(--card-bg);
  border-radius: 16px;
  border: 1px solid var(--border);
  padding: 1rem;
  min-height: 500px;
}
#roomGrid {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 1px dashed var(--border);
  border-radius: 12px;
  background:
    repeating-linear-gradient(90deg, var(--grid-line) 0, var(--grid-line) 1px, transparent 1px, transparent calc(100% / 16)),
    repeating-linear-gradient(0deg, var(--grid-line) 0, var(--grid-line) 1px, transparent 1px, transparent calc(100% / 16));
}
.presence-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.presence-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: color-mix(in oklab, var(--accent-2) 18%, transparent);
  color: var(--accent-2);
  font-weight: 600;
  border: 1px solid var(--border);
}
.chat-list, .task-list, .suggestion-list, .metric-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 320px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.message {
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: color-mix(in oklab, #ffffff 3%, var(--card-bg));
}
.metric-card {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: color-mix(in oklab, var(--accent-3) 8%, transparent);
}
.admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1.5rem;
}
.notice {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid color-mix(in oklab, var(--warning) 45%, var(--border));
  background: color-mix(in oklab, var(--warning) 12%, var(--panel-bg));
  color: color-mix(in oklab, var(--warning) 90%, #000);
}
hr {
  border: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
  margin: 1.25rem 0;
}
.small { color: var(--fg-muted); font-size: .9rem; }
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
```

## File: public/js/admin.js
```javascript
import { apiFetch, ensureAuth } from './api.js';
const allowed = new URLSearchParams(window.location.search).get('local') === '1';
const gateNotice = document.querySelector('#gateNotice');
const roomForm = document.querySelector('#roomAdminForm');
const deviceForm = document.querySelector('#deviceForm');
const deviceList = document.querySelector('#deviceList');
const deviceRoomSelect = document.querySelector('#deviceRoom');
const secretBox = document.querySelector('#secretBox');
const backBtn = document.querySelector('#backBtn');
ensureAuth();
if (!allowed) {
  gateNotice.textContent = 'Liberado apenas com ?local=1';
  roomForm.querySelectorAll('input,button,select').forEach((el) => (el.disabled = true));
  deviceForm.querySelectorAll('input,button,select').forEach((el) => (el.disabled = true));
} else {
  gateNotice.textContent = 'Somente uso local. Não exponha secrets em prod.';
  loadRooms();
  loadDevices();
}
roomForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!allowed) return;
  const formData = new FormData(roomForm);
  await apiFetch('/api/rooms', {
    method: 'POST',
    body: JSON.stringify({
      name: formData.get('name'),
      map_seed: formData.get('map_seed'),
    }),
  });
  roomForm.reset();
  loadRooms();
});
deviceForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!allowed) return;
  const formData = new FormData(deviceForm);
  const payload = {
    room_id: formData.get('room_id'),
    name: formData.get('name'),
  };
  const result = await apiFetch('/api/devices', { method: 'POST', body: JSON.stringify(payload) });
  secretBox.textContent = `ID: ${result.device.id} • SECRET: ${result.secret}`;
  deviceForm.reset();
  loadDevices();
});
backBtn.addEventListener('click', () => {
  window.location.href = 'room.html';
});
async function loadRooms() {
  const data = await apiFetch('/api/rooms');
  deviceRoomSelect.innerHTML = data.rooms.map((room) => `<option value="${room.id}">${room.name}</option>`).join('');
}
async function loadDevices() {
  if (!allowed) return;
  const data = await apiFetch('/api/devices');
  if (!data.devices.length) {
    deviceList.innerHTML = '<p>Nenhum device.</p>';
    return;
  }
  deviceList.innerHTML = data.devices
    .map(
      (dev) => `
        <div class="message">
          <strong>${dev.name}</strong>
          <p style="margin:0.25rem 0;">${dev.id} → sala ${dev.room_id}</p>
          <small>${new Date(dev.created_at).toLocaleString()}</small>
        </div>`
    )
    .join('');
}
```

## File: public/js/api.js
```javascript
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
```

## File: public/js/config.js
```javascript
(function(){
  const h = location.hostname
  let api
  if (location.search.includes('local=1')) {
    api = 'http://localhost:8787'
  }
  else if (h.includes('pages.dev') || h.includes('pages')) {
    api = 'https://holo-work.dbarcelloz.workers.dev'
  }
  else {
    api = 'https://holo-work.dbarcelloz.workers.dev'
  }
  window.__CONFIG__ = { API_BASE: api }
})()
```

## File: public/js/index.js
```javascript
import { apiFetch, setToken } from './api.js';
const loginForm = document.querySelector('#loginForm');
const registerBtn = document.querySelector('#registerBtn');
const statusBox = document.querySelector('#status');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  await authRequest('/api/auth/login', payload);
});
registerBtn.addEventListener('click', async () => {
  const formData = new FormData(loginForm);
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  await authRequest('/api/auth/register', payload);
});
async function authRequest(path, payload) {
  try {
    statusBox.textContent = 'Enviando...';
    const result = await apiFetch(path, { method: 'POST', body: JSON.stringify(payload) });
    setToken(result.jwt);
    statusBox.textContent = 'Pronto! Redirecionando...';
    window.location.href = 'room.html';
  } catch (err) {
    statusBox.textContent = err.message;
  }
}
```

## File: public/js/room.js
```javascript
import { apiFetch, setToken } from './api.js';
const state = {
  rooms: [],
  roomId: null,
  pollHandle: null,
  lastDashboard: null,
};
const ui = {
  roomSelect: document.querySelector('#roomSelect'),
  checkinForm: document.querySelector('#checkinForm'),
  roomStatus: document.querySelector('#roomStatus'),
  chatList: document.querySelector('#chatList'),
  messageForm: document.querySelector('#messageForm'),
  messageInput: document.querySelector('#messageBody'),
  tasksList: document.querySelector('#tasksList'),
  taskForm: document.querySelector('#taskForm'),
  metricList: document.querySelector('#metricList'),
  suggestionList: document.querySelector('#suggestionList'),
  presenceList: document.querySelector('#presenceList'),
  mapCanvas: document.querySelector('#roomGrid'),
  logoutBtn: document.querySelector('#logoutBtn'),
};
setupTabs();
attachEvents();
loadRooms();
function attachEvents() {
  ui.roomSelect.addEventListener('change', (event) => setRoom(event.target.value));
  ui.messageForm.addEventListener('submit', handleSendMessage);
  ui.taskForm.addEventListener('submit', handleCreateTask);
  ui.tasksList.addEventListener('click', handleTaskAction);
  ui.checkinForm.addEventListener('submit', handleCheckin);
  ui.logoutBtn.addEventListener('click', () => {
    setToken(null);
    window.location.href = 'index.html';
  });
}
async function loadRooms() {
  try {
    const data = await apiFetch('/api/rooms');
    state.rooms = data.rooms || [];
    ui.roomSelect.innerHTML = state.rooms
      .map((room) => `<option value="${room.id}">${room.name}</option>`)
      .join('');
    const queryRoom = new URLSearchParams(window.location.search).get('room');
    const initial = queryRoom && state.rooms.find((r) => r.id === queryRoom) ? queryRoom : state.rooms[0]?.id;
    if (initial) {
      ui.roomSelect.value = initial;
      await setRoom(initial);
    }
  } catch (err) {
    ui.roomStatus.textContent = err.message;
  }
}
async function setRoom(roomId) {
  if (!roomId) return;
  state.roomId = roomId;
  await apiFetch(`/api/rooms/${roomId}/join`, { method: 'POST' });
  await refreshRoom();
  if (state.pollHandle) clearInterval(state.pollHandle);
  state.pollHandle = setInterval(refreshRoom, 30000);
}
async function refreshRoom() {
  if (!state.roomId) return;
  ui.roomStatus.textContent = 'Atualizando...';
  try {
    const dashboard = await apiFetch(`/api/rooms/${state.roomId}/dashboard`, { etag: true });
    const payload = dashboard || state.lastDashboard;
    if (!payload) {
      ui.roomStatus.textContent = 'Sem dados ainda.';
      return;
    }
    state.lastDashboard = payload;
    renderMessages(payload.messages || []);
    renderTasks(payload.tasks || []);
    const readings = payload.readings?.readings || [];
    renderMetrics(payload.readings?.summary, readings);
    renderSuggestions(payload.suggestions || []);
    renderPresence(payload.presence || []);
    ui.roomStatus.textContent = `Atualizado às ${new Date().toLocaleTimeString()}`;
  } catch (err) {
    ui.roomStatus.textContent = err.message;
  }
}
async function handleSendMessage(event) {
  event.preventDefault();
  if (!state.roomId) return;
  const body = ui.messageInput.value.trim();
  if (!body) return;
  await apiFetch(`/api/rooms/${state.roomId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  });
  ui.messageInput.value = '';
  refreshRoom();
}
async function handleCreateTask(event) {
  event.preventDefault();
  if (!state.roomId) return;
  const formData = new FormData(ui.taskForm);
  await apiFetch(`/api/rooms/${state.roomId}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ title: formData.get('title') }),
  });
  ui.taskForm.reset();
  refreshRoom();
}
function handleTaskAction(event) {
  const btn = event.target.closest('[data-task-id]');
  if (!btn) return;
  const id = btn.dataset.taskId;
  const current = btn.dataset.status;
  const next = current === 'todo' ? 'doing' : current === 'doing' ? 'done' : 'todo';
  apiFetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status: next }),
  }).then(refreshRoom);
}
async function handleCheckin(event) {
  event.preventDefault();
  if (!state.roomId) return;
  const formData = new FormData(ui.checkinForm);
  await apiFetch(`/api/rooms/${state.roomId}/checkins`, {
    method: 'POST',
    body: JSON.stringify({
      mood: Number(formData.get('mood')),
      energy: Number(formData.get('energy')),
      status: formData.get('status'),
    }),
  });
  refreshRoom();
}
function renderMessages(messages) {
  ui.chatList.innerHTML = messages
    .map(
      (msg) => `
        <div class="message">
          <strong>${msg.email ? msg.email : 'Anon'}</strong>
          <p>${msg.body}</p>
          <small>${new Date(msg.created_at).toLocaleTimeString()}</small>
        </div>`
    )
    .join('');
}
function renderTasks(tasks) {
  if (!tasks.length) {
    ui.tasksList.innerHTML = '<p>Nenhuma task por aqui.</p>';
    return;
  }
  ui.tasksList.innerHTML = tasks
    .map(
      (task) => `
        <div class="message">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${task.title}</strong>
              <p style="margin:0.25rem 0; color:var(--muted);">Status: ${task.status}</p>
            </div>
            <button data-task-id="${task.id}" data-status="${task.status}" style="min-width:90px;">${nextLabel(task.status)}</button>
          </div>
        </div>`
    )
    .join('');
}
function nextLabel(status) {
  if (status === 'todo') return 'Iniciar';
  if (status === 'doing') return 'Concluir';
  return 'Reabrir';
}
function renderMetrics(summary, readings) {
  if (!summary) {
    ui.metricList.innerHTML = '<p>Sem leituras recentes.</p>';
    return;
  }
  ui.metricList.innerHTML = `
    <div class="metric-card"><span>Temperatura média</span><strong>${summary.avg_t_c ?? '--'} °C</strong></div>
    <div class="metric-card"><span>Ruído médio</span><strong>${summary.avg_noise_db ?? '--'} dB</strong></div>
    <div class="metric-card"><span>Luz média</span><strong>${summary.avg_lux ?? '--'} lux</strong></div>
  `;
}
function renderSuggestions(list) {
  if (!list.length) {
    ui.suggestionList.innerHTML = '<p>Nenhuma sugestão ainda. Rode o simulador IoT.</p>';
    return;
  }
  ui.suggestionList.innerHTML = list
    .map(
      (item) => `
        <div class="message">
          <strong>${item.kind}</strong>
          <p>${item.text}</p>
          <small>${new Date(item.created_at).toLocaleTimeString()}</small>
        </div>`
    )
    .join('');
}
function renderPresence(presence) {
  const latestByUser = new Map();
  presence.forEach((entry) => {
    if (!latestByUser.has(entry.user_id)) {
      latestByUser.set(entry.user_id, entry);
    }
  });
  const list = Array.from(latestByUser.values());
  ui.presenceList.innerHTML = list
    .map((p) => `<div class="presence-dot" title="${p.email || 'Anonymous'}">${initials(p.email)}</div>`)
    .join('');
  drawGrid(list);
}
function initials(email) {
  return (email || '?').slice(0, 2).toUpperCase();
}
function drawGrid(presence) {
  const canvas = ui.mapCanvas;
  const size = canvas.clientWidth;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  const cell = size / 16;
  ctx.fillStyle = '#eef2ff';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(99,102,241,0.15)';
  for (let i = 0; i <= 16; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * cell, 0);
    ctx.lineTo(i * cell, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * cell);
    ctx.lineTo(size, i * cell);
    ctx.stroke();
  }
  presence.forEach((p) => {
    const seat = hashString(p.user_id);
    const col = seat % 16;
    const row = Math.floor(seat / 16) % 16;
    const x = col * cell + cell / 2;
    const y = row * cell + cell / 2;
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(x, y, cell * 0.35, 0, Math.PI * 2);
    ctx.fill();
  });
}
function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 256;
  }
  return hash;
}
function setupTabs() {
  const buttons = document.querySelectorAll('.tabs button');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.panel').forEach((panel) => panel.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`#${btn.dataset.tab}`).classList.add('active');
    });
  });
}
```

## File: public/admin.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>holo.work — admin local</title>
    <link rel="stylesheet" href="./css/style.css" />
    <script src="./js/config.js"></script>
  </head>
  <body>
    <main>
      <section class="card" style="margin-bottom:1.5rem;">
        <h1>Admin local</h1>
        <p id="gateNotice">Carregando...</p>
        <button id="backBtn" style="background:#94a3b8;">Voltar</button>
      </section>
      <section class="admin-grid">
        <form id="roomAdminForm" class="card">
          <h3>Nova sala</h3>
          <div class="input-group">
            <label>Nome</label>
            <input type="text" name="name" placeholder="Focus Lab" required />
          </div>
          <div class="input-group">
            <label>Map seed</label>
            <input type="text" name="map_seed" placeholder="grid:16x16:lab" />
          </div>
          <button type="submit">Criar sala</button>
        </form>
        <form id="deviceForm" class="card">
          <h3>Emitir device</h3>
          <div class="input-group">
            <label>Sala</label>
            <select name="room_id" id="deviceRoom"></select>
          </div>
          <div class="input-group">
            <label>Nome</label>
            <input type="text" name="name" placeholder="Beacon 01" required />
          </div>
          <button type="submit">Gerar device</button>
          <p id="secretBox" style="margin-top:1rem; color:var(--accent);"></p>
        </form>
        <div class="card">
          <h3>Devices ativos</h3>
          <div id="deviceList" class="task-list"></div>
        </div>
      </section>
    </main>
    <script type="module" src="./js/admin.js"></script>
  </body>
</html>
```

## File: public/index.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>holo.work — login</title>
    <link rel="stylesheet" href="./css/style.css" />
    <script src="./js/config.js"></script>
  </head>
  <body>
    <main>
      <section class="card">
        <h1>holo.work</h1>
        <p>Hub híbrido com presença, chat, tasks, IoT e agente que cuida do ritmo.</p>
        <div class="login-grid">
          <form id="loginForm">
            <div class="input-group">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" placeholder="dev@holo.work" required />
            </div>
            <div class="input-group">
              <label for="password">Senha</label>
              <input id="password" name="password" type="password" placeholder="••••••" required />
            </div>
            <div style="display:flex; gap:0.75rem; margin-top:1rem;">
              <button type="submit" style="flex:1;">Entrar</button>
              <button type="button" id="registerBtn" style="flex:1; background:#0ea5e9;">Registrar</button>
            </div>
            <p class="notice" style="margin-top:1rem;">
              Use admin@holo.work / admin (PEPPER=dev-pepper) para seed local.
            </p>
          </form>
          <div>
            <h3>Como funciona?</h3>
            <p>
              1) Faz login → 2) Escolhe sala → 3) Marca presença, conversa e acompanha tarefas.
              O simulador IoT injeta temperatura, ruído e luz; o agente sugere pausas, pairing e ajustes.
            </p>
            <p>
              Depois de logar, compartilhe o token entre abas (sessionStorage). Para sair, limpe o token em
              <code>sessionStorage</code> ou clique em "sair" no header da sala.
            </p>
          </div>
        </div>
        <p id="status" style="margin-top:1rem; color:var(--accent);"></p>
      </section>
    </main>
    <script type="module" src="./js/index.js"></script>
  </body>
</html>
```

## File: public/room.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>holo.work — sala</title>
    <link rel="stylesheet" href="./css/style.css" />
    <script src="./js/config.js"></script>
  </head>
  <body>
    <main>
      <section class="card" style="margin-bottom:1.5rem;">
        <header style="display:flex; gap:1rem; align-items:center;">
          <h2 style="flex:1;">Sala</h2>
          <select id="roomSelect" style="flex:2;"></select>
          <button id="logoutBtn" style="background:#f43f5e;">Sair</button>
        </header>
        <form id="checkinForm" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-top:1rem;">
          <div class="input-group">
            <label>Mood</label>
            <input type="range" min="1" max="5" step="1" name="mood" value="3" />
          </div>
          <div class="input-group">
            <label>Energia</label>
            <input type="range" min="1" max="5" step="1" name="energy" value="3" />
          </div>
          <div class="input-group">
            <label>Status</label>
            <select name="status">
              <option value="focus">Focus</option>
              <option value="solo">Solo</option>
              <option value="pair">Pair</option>
              <option value="afk">AFK</option>
            </select>
          </div>
          <button type="submit">Check-in</button>
        </form>
        <p id="roomStatus" style="margin-top:0.75rem; color:var(--muted);"></p>
      </section>
      <section class="room-layout">
        <div class="map-card">
          <canvas id="roomGrid"></canvas>
          <h4 style="margin-top:1rem;">Presenças recentes</h4>
          <div id="presenceList" class="presence-list"></div>
        </div>
        <div class="card">
          <div class="tabs">
            <button data-tab="chat" class="active">Chat</button>
            <button data-tab="tasks">Tasks</button>
            <button data-tab="ambiente">Ambiente</button>
            <button data-tab="sugestoes">Sugestões</button>
          </div>
          <div id="chat" class="panel active">
            <div id="chatList" class="chat-list"></div>
            <form id="messageForm" style="margin-top:1rem; display:flex; gap:0.5rem;">
              <input id="messageBody" type="text" placeholder="Compartilhe algo" required style="flex:1;" />
              <button type="submit">Enviar</button>
            </form>
          </div>
          <div id="tasks" class="panel">
            <div id="tasksList" class="task-list"></div>
            <form id="taskForm" style="margin-top:1rem; display:flex; gap:0.5rem;">
              <input name="title" type="text" placeholder="Nova task" required style="flex:1;" />
              <button type="submit">Adicionar</button>
            </form>
          </div>
          <div id="ambiente" class="panel">
            <div id="metricList" class="metric-list"></div>
          </div>
          <div id="sugestoes" class="panel">
            <div id="suggestionList" class="suggestion-list"></div>
          </div>
        </div>
      </section>
    </main>
    <script type="module" src="./js/room.js"></script>
  </body>
</html>
```

## File: scripts/iot_sim.py
```python
from __future__ import annotations
import json
import os
import random
import time
import urllib.error
import urllib.request
INGEST_URL = os.getenv("INGEST_URL")
DEVICE_ID = os.getenv("DEVICE_ID")
DEVICE_SECRET = os.getenv("DEVICE_SECRET")
if not INGEST_URL or not DEVICE_ID or not DEVICE_SECRET:
  raise SystemExit("Set INGEST_URL, DEVICE_ID and DEVICE_SECRET env vars")
HEADERS = {
  "Content-Type": "application/json",
  "X-Device-Secret": DEVICE_SECRET,
}
print(f"→ streaming telemetry to {INGEST_URL} for {DEVICE_ID}")
while True:
  payload = {
    "device_id": DEVICE_ID,
    "t_c": round(random.uniform(20.0, 32.0), 2),
    "noise_db": round(random.uniform(40.0, 75.0), 1),
    "lux": round(random.uniform(60.0, 600.0), 0),
    "ts": int(time.time() * 1000),
  }
  data = json.dumps(payload).encode("utf-8")
  req = urllib.request.Request(INGEST_URL, data=data, headers=HEADERS, method="POST")
  try:
    with urllib.request.urlopen(req, timeout=10) as resp:
      if resp.status != 200:
        print(f"! ingest failed status={resp.status}")
      else:
        print(f"✓ sent {payload}")
  except urllib.error.HTTPError as exc:
    print(f"HTTP {exc.code}: {exc.read().decode('utf-8', 'ignore')}")
  except urllib.error.URLError as exc:
    print(f"Request failed: {exc}")
  time.sleep(5)
```

## File: sql/schema.sql
```sql
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  pass_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  map_seed TEXT,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS room_members (
  user_id TEXT NOT NULL,
  room_id TEXT NOT NULL,
  joined_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, room_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_messages_room_created ON messages(room_id, created_at DESC);
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo',
  assignee_id TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_tasks_room_created ON tasks(room_id, created_at DESC);
CREATE TABLE IF NOT EXISTS checkins (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  room_id TEXT NOT NULL,
  mood INTEGER,
  energy INTEGER,
  status TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_checkins_room_created ON checkins(room_id, created_at DESC);
CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  secret_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_devices_room ON devices(room_id);
CREATE TABLE IF NOT EXISTS readings (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  room_id TEXT NOT NULL,
  t_c REAL,
  noise_db REAL,
  lux REAL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_readings_room_created ON readings(room_id, created_at DESC);
CREATE TABLE IF NOT EXISTS suggestions (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  user_id TEXT,
  kind TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  UNIQUE(room_id, kind, text, created_at),
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_suggestions_room_created ON suggestions(room_id, created_at DESC);
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  room_id TEXT,
  kind TEXT NOT NULL,
  payload TEXT,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS anon_users (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS presence (
  user_id TEXT NOT NULL,
  room_id TEXT NOT NULL,
  status TEXT NOT NULL,
  mood INTEGER,
  energy INTEGER,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, room_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS rl_window (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  window_start INTEGER NOT NULL
);
```

## File: sql/seed.sql
```sql
PRAGMA foreign_keys = OFF;
DELETE FROM users;
DELETE FROM rooms;
DELETE FROM room_members;
DELETE FROM messages;
DELETE FROM tasks;
DELETE FROM checkins;
DELETE FROM devices;
DELETE FROM readings;
DELETE FROM suggestions;
DELETE FROM events;
DELETE FROM anon_users;
DELETE FROM presence;
DELETE FROM rl_window;
INSERT INTO users (id, email, pass_hash, role, created_at)
VALUES ('user-admin', 'admin@holo.work', 'pbkdf2$200000$kutwS1jQDWsYX0xQex7HSQ==$eMuaYN6F3q9ZAUVDt4U2JBDD7SxXkgkVlrJ12jFckO0=', 'admin', strftime('%s','now')*1000);
INSERT INTO rooms (id, name, slug, map_seed, created_at)
VALUES
  ('room-holo', 'Holo Hub', 'holo-hub', 'grid:16x16:hub', strftime('%s','now')*1000),
  ('room-lab', 'Lab Norte', 'lab-norte', 'grid:16x16:lab', strftime('%s','now')*1000);
INSERT INTO room_members (user_id, room_id, joined_at) VALUES
  ('user-admin', 'room-holo', strftime('%s','now')*1000),
  ('user-admin', 'room-lab', strftime('%s','now')*1000);
INSERT INTO devices (id, room_id, name, kind, secret_hash, created_at)
VALUES ('device-holo-01', 'room-holo', 'Env Beacon 01', 'environment', '92ae2a030fb7b169cf2612db1e8a4819fb03b9356f714be39c2a4ffe2d127f71', strftime('%s','now')*1000);
```

## File: worker/.wrangler/tmp/bundle-W7ZLgd/middleware-insertion-facade.js
```javascript
import worker, * as OTHER_EXPORTS from "/home/db/code/holo-work/core/worker/src/index.ts";
				import * as __MIDDLEWARE_0__ from "/home/db/code/holo-work/core/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "/home/db/code/holo-work/core/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				export * from "/home/db/code/holo-work/core/worker/src/index.ts";
				const MIDDLEWARE_TEST_INJECT = "__INJECT_FOR_TESTING_WRANGLER_MIDDLEWARE__";
				export const __INTERNAL_WRANGLER_MIDDLEWARE__ = [
					__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default
				]
				export default worker;
```

## File: worker/.wrangler/tmp/bundle-W7ZLgd/middleware-loader.entry.ts
```typescript
import ENTRY, { __INTERNAL_WRANGLER_MIDDLEWARE__ } from "/home/db/code/holo-work/core/worker/.wrangler/tmp/bundle-W7ZLgd/middleware-insertion-facade.js";
import { __facade_invoke__, __facade_register__, Dispatcher } from "/home/db/code/holo-work/core/node_modules/wrangler/templates/middleware/common.ts";
import type { WorkerEntrypointConstructor } from "/home/db/code/holo-work/core/worker/.wrangler/tmp/bundle-W7ZLgd/middleware-insertion-facade.js";
export * from "/home/db/code/holo-work/core/worker/.wrangler/tmp/bundle-W7ZLgd/middleware-insertion-facade.js";
class __Facade_ScheduledController__ implements ScheduledController {
	readonly #noRetry: ScheduledController["noRetry"];
	constructor(
		readonly scheduledTime: number,
		readonly cron: string,
		noRetry: ScheduledController["noRetry"]
	) {
		this.#noRetry = noRetry;
	}
	noRetry() {
		if (!(this instanceof __Facade_ScheduledController__)) {
			throw new TypeError("Illegal invocation");
		}
		this.#noRetry();
	}
}
function wrapExportedHandler(worker: ExportedHandler): ExportedHandler {
	if (
		__INTERNAL_WRANGLER_MIDDLEWARE__ === undefined ||
		__INTERNAL_WRANGLER_MIDDLEWARE__.length === 0
	) {
		return worker;
	}
	for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
		__facade_register__(middleware);
	}
	const fetchDispatcher: ExportedHandlerFetchHandler = function (
		request,
		env,
		ctx
	) {
		if (worker.fetch === undefined) {
			throw new Error("Handler does not export a fetch() function.");
		}
		return worker.fetch(request, env, ctx);
	};
	return {
		...worker,
		fetch(request, env, ctx) {
			const dispatcher: Dispatcher = function (type, init) {
				if (type === "scheduled" && worker.scheduled !== undefined) {
					const controller = new __Facade_ScheduledController__(
						Date.now(),
						init.cron ?? "",
						() => {}
					);
					return worker.scheduled(controller, env, ctx);
				}
			};
			return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
		},
	};
}
function wrapWorkerEntrypoint(
	klass: WorkerEntrypointConstructor
): WorkerEntrypointConstructor {
	// If we don't have any middleware defined, just return the handler as is
	if (
		__INTERNAL_WRANGLER_MIDDLEWARE__ === undefined ||
		__INTERNAL_WRANGLER_MIDDLEWARE__.length === 0
	) {
		return klass;
	}
	// Otherwise, register all middleware once
	for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
		__facade_register__(middleware);
	}
	// `extend`ing `klass` here so other RPC methods remain callable
	return class extends klass {
		#fetchDispatcher: ExportedHandlerFetchHandler<Record<string, unknown>> = (
			request,
			env,
			ctx
		) => {
			this.env = env;
			this.ctx = ctx;
			if (super.fetch === undefined) {
				throw new Error("Entrypoint class does not define a fetch() function.");
			}
			return super.fetch(request);
		};
		#dispatcher: Dispatcher = (type, init) => {
			if (type === "scheduled" && super.scheduled !== undefined) {
				const controller = new __Facade_ScheduledController__(
					Date.now(),
					init.cron ?? "",
					() => {}
				);
				return super.scheduled(controller);
			}
		};
		fetch(request: Request<unknown, IncomingRequestCfProperties>) {
			return __facade_invoke__(
				request,
				this.env,
				this.ctx,
				this.#dispatcher,
				this.#fetchDispatcher
			);
		}
	};
}
let WRAPPED_ENTRY: ExportedHandler | WorkerEntrypointConstructor | undefined;
if (typeof ENTRY === "object") {
	WRAPPED_ENTRY = wrapExportedHandler(ENTRY);
} else if (typeof ENTRY === "function") {
	WRAPPED_ENTRY = wrapWorkerEntrypoint(ENTRY);
}
export default WRAPPED_ENTRY;
```

## File: worker/.wrangler/tmp/dev-KeMLqf/index.js
```javascript
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var buckets =  new Map();
function allow(key, perMin = 60) {
  const now = Date.now();
  const window = Math.floor(now / 6e4);
  const bucketKey = `${key}:${window}`;
  let bucket = buckets.get(bucketKey);
  if (!bucket || bucket.window !== window) {
    bucket = { tokens: perMin, window };
  }
  if (bucket.tokens <= 0) {
    buckets.set(bucketKey, bucket);
    return false;
  }
  bucket.tokens -= 1;
  buckets.set(bucketKey, bucket);
  return true;
}
__name(allow, "allow");
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var HttpError = class extends Error {
  static {
    __name(this, "HttpError");
  }
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
};
function jsonResponse(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers
    },
    status: init.status ?? 200
  });
}
__name(jsonResponse, "jsonResponse");
function errorResponse(message, status = 400, details) {
  return jsonResponse({ error: message, details }, { status });
}
__name(errorResponse, "errorResponse");
async function readJson(request, limit = 32 * 1024) {
  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader && Number(lengthHeader) > limit) {
    throw new HttpError(413, "Payload too large");
  }
  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > limit) {
    throw new HttpError(413, "Payload too large");
  }
  if (!buffer.byteLength) {
    return {};
  }
  const text = decoder.decode(buffer);
  if (!text.trim()) {
    return {};
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new HttpError(400, "Invalid JSON");
  }
}
__name(readJson, "readJson");
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
}
__name(slugify, "slugify");
function escapeHtml(input) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
__name(escapeHtml, "escapeHtml");
function nowMs() {
  return Date.now();
}
__name(nowMs, "nowMs");
function randomId(prefix) {
  const fragment = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  return `${prefix}_${fragment}`;
}
__name(randomId, "randomId");
function getIp(request) {
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for") || "unknown";
}
__name(getIp, "getIp");
async function sha256Hex(input) {
  const bytes = encoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return bufferToHex(new Uint8Array(digest));
}
__name(sha256Hex, "sha256Hex");
async function etagHex(value) {
  return sha256Hex(value);
}
__name(etagHex, "etagHex");
function bufferToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(bufferToHex, "bufferToHex");
function base64UrlEncode(data) {
  let str = "";
  data.forEach((byte) => {
    str += String.fromCharCode(byte);
  });
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
__name(base64UrlEncode, "base64UrlEncode");
function encodeText(input) {
  return encoder.encode(input);
}
__name(encodeText, "encodeText");
function decodeBase64Url(input) {
  const padLength = (4 - input.length % 4) % 4;
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLength);
  const str = atob(normalized);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i += 1) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
__name(decodeBase64Url, "decodeBase64Url");
function ensure(condition, status, message) {
  if (!condition) {
    throw new HttpError(status, message);
  }
}
__name(ensure, "ensure");
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
__name(clamp, "clamp");
async function getUserRecord(env, id) {
  const result = await env.DB.prepare("SELECT id, email, role, created_at FROM users WHERE id = ?").bind(id).first();
  return result;
}
__name(getUserRecord, "getUserRecord");
function toBase64(bytes) {
  if (typeof btoa === "function") {
    let binary = "";
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary);
  }
  return Buffer.from(bytes).toString("base64");
}
__name(toBase64, "toBase64");
function fromBase64(input) {
  if (typeof atob === "function") {
    const binary = atob(input);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  const buf = Buffer.from(input, "base64");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}
__name(fromBase64, "fromBase64");
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}
__name(timingSafeEqual, "timingSafeEqual");
async function first(db, query, bindings = []) {
  const result = await db.prepare(query).bind(...bindings).first();
  return result ?? null;
}
__name(first, "first");
async function all(db, query, bindings = []) {
  const { results } = await db.prepare(query).bind(...bindings).all();
  return results;
}
__name(all, "all");
async function run(db, query, bindings = []) {
  return db.prepare(query).bind(...bindings).run();
}
__name(run, "run");
var PBKDF2_LENGTH = 32;
var textEncoder = new TextEncoder();
var ANON_HEADER = /^Bearer\s+anon:([a-z0-9_-]{8,64})$/i;
async function hashPassword(password, pepper) {
  const combined = password + pepper;
  const bytes = encodeText(combined);
  const ab = toArrayBuffer(bytes);
  const digest = await crypto.subtle.digest("SHA-256", ab);
  const hash = toBase64(new Uint8Array(digest));
  return `sha256:${hash}`;
}
__name(hashPassword, "hashPassword");
async function verifyPassword(password, pepper, hash) {
  if (hash.startsWith("sha256:")) {
    const stored = hash.slice(7);
    const combined = password + pepper;
    const bytes = encodeText(combined);
    const ab = toArrayBuffer(bytes);
    const digest = await crypto.subtle.digest("SHA-256", ab);
    const computed = toBase64(new Uint8Array(digest));
    return computed === stored;
  }
  const parts = hash.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") {
    return false;
  }
  const iterations = Number(parts[1]);
  if (!Number.isSafeInteger(iterations) || iterations <= 0) {
    return false;
  }
  const salt = fromBase64(parts[2]);
  const expected = fromBase64(parts[3]);
  const actual = await deriveKey(password, pepper, salt, iterations);
  return timingSafeEqual(actual, expected);
}
__name(verifyPassword, "verifyPassword");
async function handleRegister(ctx) {
  try {
    const body = await readJson(ctx.request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    ensure(email && email.includes("@"), 400, "Valid email required");
    ensure(password && password.length >= 6, 400, "Password must be at least 6 chars");
    const existing = await first(ctx.env.DB, "SELECT id FROM users WHERE email = ?", [email]);
    ensure(!existing, 409, "Email already registered");
    const id = crypto.randomUUID();
    const passHash = await hashPassword(password, ctx.env.PEPPER);
    const createdAt = Date.now();
    await ctx.env.DB.prepare("INSERT INTO users (id, email, pass_hash, role, created_at) VALUES (?, ?, ?, ?, ?)").bind(id, email, passHash, "user", createdAt).run();
    const user = { id, email, role: "user" };
    const jwt = await issueJwt(user, ctx.env);
    return jsonResponse({ user, jwt });
  } catch (err) {
    console.error("[register]", err);
    throw err;
  }
}
__name(handleRegister, "handleRegister");
async function handleLogin(ctx) {
  try {
    const body = await readJson(ctx.request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    ensure(email && password, 400, "Email and password required");
    const record = await first(
      ctx.env.DB,
      "SELECT id, email, role, pass_hash FROM users WHERE email = ?",
      [email]
    );
    ensure(record, 401, "Invalid credentials");
    const valid = await verifyPassword(password, ctx.env.PEPPER, record.pass_hash);
    ensure(valid, 401, "Invalid credentials");
    const user = { id: record.id, email: record.email, role: record.role };
    const jwt = await issueJwt(user, ctx.env);
    return jsonResponse({ user, jwt });
  } catch (err) {
    console.error("[login]", err);
    throw err;
  }
}
__name(handleLogin, "handleLogin");
async function handleMe(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const dbUser = await getUserRecord(ctx.env, ctx.user.id);
  ensure(dbUser, 401, "User not found");
  return jsonResponse({ user: { id: dbUser.id, email: dbUser.email, role: dbUser.role } });
}
__name(handleMe, "handleMe");
async function authenticateRequest(request, env) {
  const authHeader = request.headers.get("authorization");
  const anonId = parseAnonHeader(authHeader);
  if (anonId) {
    await ensureAnonIdentity(env, anonId);
    return { id: anonId, email: null, role: "anon" };
  }
  if (!authHeader) {
    return null;
  }
  const [, token] = authHeader.split(" ");
  if (!token) return null;
  const payload = await verifyJwt(token, env.JWT_SECRET);
  if (!payload) return null;
  return { id: payload.sub, email: payload.email, role: payload.role };
}
__name(authenticateRequest, "authenticateRequest");
function parseAnonHeader(header) {
  if (!header) return null;
  const match = ANON_HEADER.exec(header);
  return match ? match[1] : null;
}
__name(parseAnonHeader, "parseAnonHeader");
async function ensureAnonIdentity(env, id) {
  const now = nowMs();
  await run(env.DB, "INSERT OR IGNORE INTO users (id, role, created_at) VALUES (?, ?, ?)", [id, "anon", now]);
  await run(env.DB, "INSERT OR IGNORE INTO anon_users (id, created_at) VALUES (?, ?)", [id, now]);
}
__name(ensureAnonIdentity, "ensureAnonIdentity");
async function issueJwt(user, env) {
  const ttl = Number(env.JWT_TTL_MINUTES ?? "15");
  const now = Math.floor(Date.now() / 1e3);
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + ttl * 60
  };
  return signJwt(payload, env.JWT_SECRET);
}
__name(issueJwt, "issueJwt");
async function signJwt(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const headerBytes = encodeText(JSON.stringify(header));
  const payloadBytes = encodeText(JSON.stringify(payload));
  const encodedHeader = base64UrlEncode(headerBytes);
  const encodedPayload = base64UrlEncode(payloadBytes);
  const data = `${encodedHeader}.${encodedPayload}`;
  const keyBuffer = toArrayBuffer(encodeText(secret));
  const key = await crypto.subtle.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const dataBuffer = toArrayBuffer(encodeText(data));
  const signature = await crypto.subtle.sign("HMAC", key, dataBuffer);
  return `${data}.${base64UrlEncode(new Uint8Array(signature))}`;
}
__name(signJwt, "signJwt");
async function verifyJwt(token, secret) {
  const segments = token.split(".");
  if (segments.length !== 3) return null;
  const [encodedHeader, encodedPayload, encodedSignature] = segments;
  const data = `${encodedHeader}.${encodedPayload}`;
  const keyBuffer = toArrayBuffer(encodeText(secret));
  const key = await crypto.subtle.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const signatureBuffer = toArrayBuffer(decodeBase64Url(encodedSignature));
  const dataBuffer = toArrayBuffer(encodeText(data));
  const valid = await crypto.subtle.verify("HMAC", key, signatureBuffer, dataBuffer);
  if (!valid) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(encodedPayload)));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1e3)) {
      return null;
    }
    return payload;
  } catch (err) {
    console.error("jwt parse failed", err);
    return null;
  }
}
__name(verifyJwt, "verifyJwt");
function toArrayBuffer(bytes) {
  const ab = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(ab).set(bytes);
  return ab;
}
__name(toArrayBuffer, "toArrayBuffer");
async function deriveKey(password, pepper, salt, iterations) {
  const keyMaterial = await crypto.subtle.importKey("raw", toArrayBuffer(encodeText(password + pepper)), "PBKDF2", false, [
    "deriveBits"
  ]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: toArrayBuffer(salt),
      iterations
    },
    keyMaterial,
    PBKDF2_LENGTH * 8
  );
  return new Uint8Array(bits);
}
__name(deriveKey, "deriveKey");
async function requireRoomMembership(env, roomKey, userId) {
  const room = await first(env.DB, "SELECT id FROM rooms WHERE id = ? OR slug = ?", [roomKey, roomKey]);
  ensure(room, 404, "Room not found");
  const member = await first(
    env.DB,
    "SELECT user_id FROM room_members WHERE room_id = ? AND user_id = ?",
    [room.id, userId]
  );
  ensure(member, 403, "Join room first");
  return room.id;
}
__name(requireRoomMembership, "requireRoomMembership");
var READING_WINDOW_MS = 15 * 60 * 1e3;
var CHECKIN_WINDOW_MS = 30 * 60 * 1e3;
var DEDUPE_WINDOW_MS = 10 * 60 * 1e3;
async function computeSuggestions(env, roomId) {
  const now = nowMs();
  const readings = await all(
    env.DB,
    "SELECT t_c, noise_db, lux, created_at FROM readings WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 50",
    [roomId, now - READING_WINDOW_MS]
  );
  if (!readings.length) {
    return;
  }
  const checkins = await all(
    env.DB,
    "SELECT user_id, mood, energy, status, created_at FROM checkins WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC",
    [roomId, now - CHECKIN_WINDOW_MS]
  );
  const candidates = buildCandidates(readings, checkins);
  for (const suggestion of candidates) {
    const exists = await first(
      env.DB,
      "SELECT id FROM suggestions WHERE room_id = ? AND kind = ? AND created_at >= ? LIMIT 1",
      [roomId, suggestion.kind, now - DEDUPE_WINDOW_MS]
    );
    if (exists) continue;
    await run(
      env.DB,
      "INSERT INTO suggestions (id, room_id, user_id, kind, text, created_at) VALUES (?, ?, NULL, ?, ?, ?)",
      [crypto.randomUUID(), roomId, suggestion.kind, suggestion.text, now]
    );
  }
  await run(env.DB, "DELETE FROM suggestions WHERE created_at < ?", [now - 6 * 60 * 60 * 1e3]);
}
__name(computeSuggestions, "computeSuggestions");
function buildCandidates(readings, checkins) {
  const latest = readings[0];
  const lowEnergy = checkins.filter((c) => typeof c.energy === "number" && c.energy <= 2);
  const lowMood = checkins.filter((c) => typeof c.mood === "number" && c.mood <= 2);
  const focusCount = checkins.filter((c) => c.status === "focus").length;
  const candidates = [];
  if (typeof latest.noise_db === "number" && latest.noise_db > 65 && lowEnergy.length) {
    candidates.push({
      kind: "move",
      text: `Ru\xEDdo elevado (~${latest.noise_db.toFixed(0)} dB). Liberar sala alternativa ou oferecer fones.`
    });
  }
  if (typeof latest.t_c === "number" && latest.t_c > 27 && lowMood.length) {
    candidates.push({
      kind: "pause",
      text: `Temperatura em ${latest.t_c.toFixed(1)}\xB0C com humor baixo. Propor pausa r\xE1pida + hidrata\xE7\xE3o.`
    });
  }
  if (typeof latest.lux === "number" && latest.lux < 200) {
    candidates.push({
      kind: "environment",
      text: `Luminosidade baixa (${latest.lux.toFixed(0)} lux). Ajustar luz ou mover para \xE1rea mais iluminada.`
    });
  }
  if (focusCount >= 2 && readings.length && (!lowMood.length || !lowEnergy.length)) {
    candidates.push({
      kind: "pair",
      text: "H\xE1 v\xE1rias pessoas em foco por 30+ min. Sugerir pairing r\xE1pido para desbloquear tarefas cr\xEDticas."
    });
  }
  return candidates;
}
__name(buildCandidates, "buildCandidates");
async function handleGetSuggestions(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const suggestions = await all(
    ctx.env.DB,
    "SELECT id, kind, text, created_at FROM suggestions WHERE room_id = ? ORDER BY created_at DESC LIMIT 20",
    [resolvedRoomId]
  );
  return jsonResponse({ suggestions });
}
__name(handleGetSuggestions, "handleGetSuggestions");
async function handleListRooms(ctx) {
  const rooms = await all(
    ctx.env.DB,
    "SELECT id, name, slug, map_seed FROM rooms ORDER BY created_at ASC"
  );
  return jsonResponse({ rooms });
}
__name(handleListRooms, "handleListRooms");
async function handleGetRoom(ctx) {
  const { roomId } = ctx.params;
  const room = await first(
    ctx.env.DB,
    "SELECT id, name, slug, map_seed FROM rooms WHERE id = ? OR slug = ?",
    [roomId, roomId]
  );
  ensure(room, 404, "Room not found");
  return jsonResponse({ room });
}
__name(handleGetRoom, "handleGetRoom");
async function handleCreateRoom(ctx) {
  ensure(ctx.user && ctx.user.role === "admin", 403, "Admin only");
  const body = await readJson(ctx.request);
  const name = body.name?.trim();
  ensure(name && name.length >= 3, 400, "Room name required");
  const baseSlug = slugify(name) || `room-${randomId("slug").split("_")[1]}`;
  let slug = baseSlug;
  let attempt = 1;
  while (true) {
    const exists = await first(ctx.env.DB, "SELECT id FROM rooms WHERE slug = ?", [slug]);
    if (!exists) break;
    slug = `${baseSlug}-${attempt++}`;
  }
  const id = crypto.randomUUID();
  await run(
    ctx.env.DB,
    "INSERT INTO rooms (id, name, slug, map_seed, created_at) VALUES (?, ?, ?, ?, ?)",
    [id, name, slug, body.map_seed ?? null, nowMs()]
  );
  return jsonResponse({ room: { id, name, slug, map_seed: body.map_seed ?? null } }, { status: 201 });
}
__name(handleCreateRoom, "handleCreateRoom");
async function handleJoinRoom(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const room = await first(ctx.env.DB, "SELECT id FROM rooms WHERE id = ? OR slug = ?", [roomId, roomId]);
  ensure(room, 404, "Room not found");
  await run(
    ctx.env.DB,
    "INSERT OR IGNORE INTO room_members (user_id, room_id, joined_at) VALUES (?, ?, ?)",
    [ctx.user.id, room.id, nowMs()]
  );
  return jsonResponse({ joined: true });
}
__name(handleJoinRoom, "handleJoinRoom");
async function handleListMessages(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const url = new URL(ctx.request.url);
  const cursor = Number(url.searchParams.get("cursor") ?? "0");
  const limit = clamp(Number(url.searchParams.get("limit") ?? "50"), 1, 200);
  const rows = await all(
    ctx.env.DB,
    `SELECT m.id, m.body, m.created_at, u.id as user_id, u.email
     FROM messages m
     JOIN users u ON u.id = m.user_id
     WHERE m.room_id = ? AND m.created_at < CASE WHEN ? = 0 THEN 9223372036854775807 ELSE ? END
     ORDER BY m.created_at DESC
     LIMIT ?`,
    [resolvedRoomId, cursor, cursor, limit]
  );
  return jsonResponse({
    messages: rows.reverse(),
    nextCursor: rows.length ? rows[0].created_at : null
  });
}
__name(handleListMessages, "handleListMessages");
async function handlePostMessage(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const body = await readJson(ctx.request, 2 * 1024);
  const message = body.body?.trim();
  ensure(message && message.length, 400, "Message body required");
  ensure(message.length <= 512, 400, "Message too long");
  const throttleKey = `msg:${ctx.user.id}:${resolvedRoomId}`;
  const allowed = allow(throttleKey, 2);
  ensure(allowed, 429, "Slow down");
  const html = escapeHtml(message);
  const id = crypto.randomUUID();
  const createdAt = nowMs();
  await run(ctx.env.DB, "INSERT INTO messages (id, room_id, user_id, body, created_at) VALUES (?, ?, ?, ?, ?)", [
    id,
    resolvedRoomId,
    ctx.user.id,
    html,
    createdAt
  ]);
  return jsonResponse({ message: { id, body: html, created_at: createdAt } }, { status: 201 });
}
__name(handlePostMessage, "handlePostMessage");
async function handleListTasks(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const tasks = await all(
    ctx.env.DB,
    "SELECT id, title, status, assignee_id, created_at FROM tasks WHERE room_id = ? ORDER BY created_at DESC",
    [resolvedRoomId]
  );
  return jsonResponse({ tasks });
}
__name(handleListTasks, "handleListTasks");
async function handleCreateTask(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const body = await readJson(ctx.request);
  const title = body.title?.trim();
  ensure(title && title.length >= 3, 400, "Task title required");
  const id = crypto.randomUUID();
  await run(
    ctx.env.DB,
    "INSERT INTO tasks (id, room_id, title, status, assignee_id, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [id, resolvedRoomId, title, "todo", body.assignee_id ?? null, nowMs()]
  );
  return jsonResponse({ task: { id, title, status: "todo", assignee_id: body.assignee_id ?? null } }, { status: 201 });
}
__name(handleCreateTask, "handleCreateTask");
async function handleUpdateTask(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { taskId } = ctx.params;
  const task = await first(ctx.env.DB, "SELECT id, room_id FROM tasks WHERE id = ?", [taskId]);
  ensure(task, 404, "Task not found");
  await requireRoomMembership(ctx.env, task.room_id, ctx.user.id);
  const body = await readJson(ctx.request);
  const status = body.status ?? void 0;
  if (status) {
    ensure(["todo", "doing", "done"].includes(status), 400, "Invalid status");
  }
  await run(
    ctx.env.DB,
    "UPDATE tasks SET status = COALESCE(?, status), assignee_id = ? WHERE id = ?",
    [status ?? null, body.assignee_id ?? null, taskId]
  );
  const updated = await first(ctx.env.DB, "SELECT id, room_id, title, status, assignee_id FROM tasks WHERE id = ?", [taskId]);
  return jsonResponse({ task: updated });
}
__name(handleUpdateTask, "handleUpdateTask");
async function handlePostCheckin(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const body = await readJson(ctx.request);
  const mood = clamp(Number(body.mood ?? 3), 1, 5);
  const energy = clamp(Number(body.energy ?? 3), 1, 5);
  const status = body.status ?? "focus";
  ensure(["focus", "solo", "pair", "afk"].includes(status), 400, "Invalid status");
  const id = crypto.randomUUID();
  const createdAt = nowMs();
  await run(
    ctx.env.DB,
    "INSERT INTO checkins (id, user_id, room_id, mood, energy, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, ctx.user.id, resolvedRoomId, mood, energy, status, createdAt]
  );
  await run(
    ctx.env.DB,
    "INSERT INTO presence (user_id, room_id, status, mood, energy, updated_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(user_id, room_id) DO UPDATE SET status=excluded.status, mood=excluded.mood, energy=excluded.energy, updated_at=excluded.updated_at",
    [ctx.user.id, resolvedRoomId, status, mood, energy, createdAt]
  );
  ctx.waitUntil(computeSuggestions(ctx.env, resolvedRoomId));
  return jsonResponse({ ok: true });
}
__name(handlePostCheckin, "handlePostCheckin");
async function handleGetCheckins(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const url = new URL(ctx.request.url);
  const sinceMs = Number(url.searchParams.get("since") ?? 0);
  const windowStart = sinceMs || nowMs() - 30 * 60 * 1e3;
  const checkins = await all(
    ctx.env.DB,
    `SELECT c.id, c.user_id, u.email, c.mood, c.energy, c.status, c.created_at
     FROM checkins c
     JOIN users u ON u.id = c.user_id
     WHERE c.room_id = ? AND c.created_at >= ?
     ORDER BY c.created_at DESC`,
    [resolvedRoomId, windowStart]
  );
  return jsonResponse({ checkins });
}
__name(handleGetCheckins, "handleGetCheckins");
async function handleCreateDevice(ctx) {
  ensure(ctx.user && ctx.user.role === "admin", 403, "Admin only");
  const body = await readJson(ctx.request);
  const roomKey = body.room_id?.trim();
  const name = body.name?.trim() ?? "Env Beacon";
  ensure(roomKey, 400, "room_id required");
  const room = await first(ctx.env.DB, "SELECT id FROM rooms WHERE id = ? OR slug = ?", [roomKey, roomKey]);
  ensure(room, 404, "Room not found");
  const deviceId = `device_${crypto.randomUUID().split("-")[0]}`;
  const secretPlain = generateSecret();
  const secretHash = await hashDeviceSecret(secretPlain, ctx.env.PEPPER);
  await run(
    ctx.env.DB,
    "INSERT INTO devices (id, room_id, name, kind, secret_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [deviceId, room.id, name, body.kind ?? "environment", secretHash, nowMs()]
  );
  return jsonResponse({ device: { id: deviceId, room_id: room.id, name, kind: body.kind ?? "environment" }, secret: secretPlain }, { status: 201 });
}
__name(handleCreateDevice, "handleCreateDevice");
async function handleListDevices(ctx) {
  ensure(ctx.user && ctx.user.role === "admin", 403, "Admin only");
  const devices = await all(
    ctx.env.DB,
    "SELECT id, room_id, name, kind, created_at FROM devices ORDER BY created_at DESC"
  );
  return jsonResponse({ devices });
}
__name(handleListDevices, "handleListDevices");
async function handleIngest(ctx) {
  const secret = ctx.request.headers.get("x-device-secret");
  ensure(secret, 401, "Missing X-Device-Secret");
  const body = await readJson(ctx.request);
  const deviceId = body.device_id?.trim();
  ensure(deviceId, 400, "device_id required");
  const device = await first(
    ctx.env.DB,
    "SELECT id, room_id, secret_hash FROM devices WHERE id = ?",
    [deviceId]
  );
  ensure(device, 404, "Device not found");
  const hashed = await hashDeviceSecret(secret, ctx.env.PEPPER);
  ensure(hashed === device.secret_hash, 401, "Invalid device secret");
  const createdAt = Number(body.ts) || nowMs();
  const tC = body.t_c ?? null;
  const noise = body.noise_db ?? null;
  const lux = body.lux ?? null;
  await run(
    ctx.env.DB,
    "INSERT INTO readings (id, device_id, room_id, t_c, noise_db, lux, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [crypto.randomUUID(), device.id, device.room_id, tC, noise, lux, createdAt]
  );
  await run(ctx.env.DB, "DELETE FROM readings WHERE room_id = ? AND created_at < ?", [device.room_id, nowMs() - 15 * 60 * 1e3]);
  ctx.waitUntil(computeSuggestions(ctx.env, device.room_id));
  return jsonResponse({ stored: true });
}
__name(handleIngest, "handleIngest");
async function handleGetReadings(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const url = new URL(ctx.request.url);
  const minutes = clamp(Number(url.searchParams.get("window") ?? "15"), 5, 60);
  const windowStart = nowMs() - minutes * 60 * 1e3;
  const readings = await all(
    ctx.env.DB,
    "SELECT id, device_id, t_c, noise_db, lux, created_at FROM readings WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 200",
    [resolvedRoomId, windowStart]
  );
  const ordered = readings.reverse();
  const summary = summarizeReadings(ordered);
  return jsonResponse({ readings: ordered, summary });
}
__name(handleGetReadings, "handleGetReadings");
function summarizeReadings(readings) {
  if (!readings.length) return null;
  const sums = readings.reduce(
    (acc, row) => {
      if (typeof row.t_c === "number") {
        acc.t_c.count += 1;
        acc.t_c.sum += row.t_c;
      }
      if (typeof row.noise_db === "number") {
        acc.noise.count += 1;
        acc.noise.sum += row.noise_db;
      }
      if (typeof row.lux === "number") {
        acc.lux.count += 1;
        acc.lux.sum += row.lux;
      }
      return acc;
    },
    {
      t_c: { sum: 0, count: 0 },
      noise: { sum: 0, count: 0 },
      lux: { sum: 0, count: 0 }
    }
  );
  const avg =  __name((sum, count) => count ? Number((sum / count).toFixed(1)) : null, "avg");
  return {
    avg_t_c: avg(sums.t_c.sum, sums.t_c.count),
    avg_noise_db: avg(sums.noise.sum, sums.noise.count),
    avg_lux: avg(sums.lux.sum, sums.lux.count)
  };
}
__name(summarizeReadings, "summarizeReadings");
function generateSecret() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(generateSecret, "generateSecret");
async function hashDeviceSecret(secret, pepper) {
  return sha256Hex(`${secret}${pepper}`);
}
__name(hashDeviceSecret, "hashDeviceSecret");
var store =  new Map();
function cacheGet(key) {
  const entry = store.get(key);
  if (!entry) return void 0;
  if (entry.exp > Date.now()) {
    return entry.v;
  }
  store.delete(key);
  return void 0;
}
__name(cacheGet, "cacheGet");
function cacheSet(key, value, ttlMs = 1e4) {
  store.set(key, { v: value, exp: Date.now() + ttlMs });
}
__name(cacheSet, "cacheSet");
var CACHE_TTL = 1e4;
async function handleDashboard(ctx) {
  ensure(ctx.user, 401, "Unauthorized");
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user.id);
  const cacheKey = `dash:${resolvedRoomId}`;
  const cachedEntry = cacheGet(cacheKey);
  const ifNoneMatch = ctx.request.headers.get("if-none-match");
  if (cachedEntry) {
    if (ifNoneMatch && ifNoneMatch === cachedEntry.etag) {
      return new Response(null, { status: 304, headers: { ETag: cachedEntry.etag } });
    }
    const cachedResponse = jsonResponse(cachedEntry.body, {
      headers: { "Cache-Control": "public, max-age=10, stale-while-revalidate=300" }
    });
    cachedResponse.headers.set("ETag", cachedEntry.etag);
    return cachedResponse;
  }
  const since15 = nowMs() - 15 * 60 * 1e3;
  const since30 = nowMs() - 30 * 60 * 1e3;
  const [messages, tasks, readings, suggestions, presence] = await Promise.all([
    all(
      ctx.env.DB,
      `SELECT m.id, m.body, m.created_at, m.user_id, u.email
       FROM messages m
       JOIN users u ON u.id = m.user_id
       WHERE m.room_id = ?
       ORDER BY m.created_at DESC
       LIMIT 50`,
      [resolvedRoomId]
    ),
    all(
      ctx.env.DB,
      `SELECT id, title, status, assignee_id, created_at
       FROM tasks
       WHERE room_id = ?
       ORDER BY created_at DESC`,
      [resolvedRoomId]
    ),
    all(
      ctx.env.DB,
      `SELECT id, device_id, t_c, noise_db, lux, created_at
       FROM readings
       WHERE room_id = ? AND created_at >= ?
       ORDER BY created_at DESC
       LIMIT 200`,
      [resolvedRoomId, since15]
    ),
    all(
      ctx.env.DB,
      `SELECT id, kind, text, created_at
       FROM suggestions
       WHERE room_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [resolvedRoomId]
    ),
    all(
      ctx.env.DB,
      `SELECT p.user_id, u.email, p.status, p.mood, p.energy, p.updated_at
       FROM presence p
       LEFT JOIN users u ON u.id = p.user_id
       WHERE p.room_id = ? AND p.updated_at >= ?
       ORDER BY p.updated_at DESC`,
      [resolvedRoomId, since30]
    )
  ]);
  const orderedReadings = [...readings].reverse();
  const summary = summarizeReadings(orderedReadings);
  const payload = {
    messages: messages.reverse(),
    tasks,
    readings: { summary, readings: orderedReadings },
    suggestions,
    presence
  };
  const etag = await etagHex(JSON.stringify(payload));
  cacheSet(cacheKey, { etag, body: payload }, CACHE_TTL);
  if (ifNoneMatch && ifNoneMatch === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }
  const response = jsonResponse(payload, {
    headers: { "Cache-Control": "public, max-age=10, stale-while-revalidate=300" }
  });
  response.headers.set("ETag", etag);
  return response;
}
__name(handleDashboard, "handleDashboard");
var routes = [
  { method: "GET", pattern: "/health", handler: handleHealth, auth: "optional", skipRateLimit: true },
  { method: "POST", pattern: "/api/auth/register", handler: handleRegister, auth: "optional" },
  { method: "POST", pattern: "/api/auth/login", handler: handleLogin, auth: "optional" },
  { method: "GET", pattern: "/api/auth/me", handler: handleMe, auth: "user" },
  { method: "GET", pattern: "/api/rooms", handler: handleListRooms, auth: "optional" },
  { method: "GET", pattern: "/api/rooms/:roomId", handler: handleGetRoom, auth: "optional" },
  { method: "POST", pattern: "/api/rooms", handler: handleCreateRoom, auth: "user" },
  { method: "POST", pattern: "/api/rooms/:roomId/join", handler: handleJoinRoom, auth: "user" },
  { method: "GET", pattern: "/api/rooms/:roomId/dashboard", handler: handleDashboard, auth: "user" },
  { method: "GET", pattern: "/api/rooms/:roomId/messages", handler: handleListMessages, auth: "user" },
  { method: "POST", pattern: "/api/rooms/:roomId/messages", handler: handlePostMessage, auth: "user" },
  { method: "GET", pattern: "/api/rooms/:roomId/tasks", handler: handleListTasks, auth: "user" },
  { method: "POST", pattern: "/api/rooms/:roomId/tasks", handler: handleCreateTask, auth: "user" },
  { method: "PUT", pattern: "/api/tasks/:taskId", handler: handleUpdateTask, auth: "user" },
  { method: "POST", pattern: "/api/rooms/:roomId/checkins", handler: handlePostCheckin, auth: "user" },
  { method: "GET", pattern: "/api/rooms/:roomId/checkins", handler: handleGetCheckins, auth: "user" },
  { method: "GET", pattern: "/api/rooms/:roomId/readings", handler: handleGetReadings, auth: "user" },
  { method: "GET", pattern: "/api/rooms/:roomId/suggestions", handler: handleGetSuggestions, auth: "user" },
  { method: "POST", pattern: "/api/devices", handler: handleCreateDevice, auth: "user" },
  { method: "GET", pattern: "/api/devices", handler: handleListDevices, auth: "user" },
  { method: "POST", pattern: "/api/iot/ingest", handler: handleIngest, auth: "optional", skipRateLimit: true }
];
var corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,PUT,OPTIONS",
  "access-control-allow-headers": "content-type,authorization,x-device-secret"
};
var src_default = {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    try {
      const url = new URL(request.url);
      const match = findRoute(request.method, url.pathname);
      if (!match) {
        return withCors(errorResponse("Not Found", 404));
      }
      if (!match.route.skipRateLimit) {
        const ip = getIp(request);
        if (!allow(`rate:${ip}`, 60)) {
          return withCors(errorResponse("Too many requests", 429));
        }
      }
      const user = await authenticateRequest(request, env);
      if (match.route.auth === "user" && !user) {
        return withCors(errorResponse("Unauthorized", 401));
      }
      const ctxPayload = {
        env,
        request,
        params: match.params,
        user: user ?? null,
        waitUntil:  __name((promise) => ctx.waitUntil(promise), "waitUntil")
      };
      const response = await match.route.handler(ctxPayload);
      return withCors(response);
    } catch (err) {
      if (err instanceof HttpError) {
        return withCors(errorResponse(err.message, err.status, err.details));
      }
      console.error("Unhandled worker error", err);
      return withCors(errorResponse("Internal Error", 500));
    }
  }
};
function withCors(response) {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
  return new Response(response.body, { status: response.status, headers });
}
__name(withCors, "withCors");
function findRoute(method, pathname) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const params = matchPath(route.pattern, pathname);
    if (params) {
      return { route, params };
    }
  }
  return null;
}
__name(findRoute, "findRoute");
function matchPath(pattern, pathname) {
  const patternParts = trim(pattern).split("/");
  const pathParts = trim(pathname).split("/");
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const expected = patternParts[i];
    const actual = pathParts[i];
    if (expected.startsWith(":")) {
      params[expected.slice(1)] = decodeURIComponent(actual);
    } else if (expected !== actual) {
      return null;
    }
  }
  return params;
}
__name(matchPath, "matchPath");
function trim(path) {
  const clean = path.replace(/^\/+|\/+$|\s+/g, "");
  return clean ? clean : "";
}
__name(trim, "trim");
async function handleHealth(ctx) {
  return jsonResponse({ ok: true });
}
__name(handleHealth, "handleHealth");
var drainBody =  __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError =  __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher =  __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher =  __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher =  __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher =  __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
```

## File: worker/.wrangler/tmp/dev-KeMLqf/index.js.map
```
{
  "version": 3,
  "sources": ["../../../src/ratelimit.ts", "../../../src/utils.ts", "../../../src/db.ts", "../../../src/auth.ts", "../../../src/access.ts", "../../../src/agent.ts", "../../../src/rooms.ts", "../../../src/iot.ts", "../../../src/cache.ts", "../../../src/dashboard.ts", "../../../src/index.ts", "../../../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts", "../../../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts", "../bundle-W7ZLgd/middleware-insertion-facade.js", "../../../../node_modules/wrangler/templates/middleware/common.ts", "../bundle-W7ZLgd/middleware-loader.entry.ts"],
  "sourceRoot": "/home/db/code/holo-work/core/worker/.wrangler/tmp/dev-KeMLqf",
  "sourcesContent": ["const buckets = new Map<string, { tokens: number; window: number }>();\n\nexport function allow(key: string, perMin = 60): boolean {\n  const now = Date.now();\n  const window = Math.floor(now / 60_000);\n  const bucketKey = `${key}:${window}`;\n  let bucket = buckets.get(bucketKey);\n  if (!bucket || bucket.window !== window) {\n    bucket = { tokens: perMin, window };\n  }\n  if (bucket.tokens <= 0) {\n    buckets.set(bucketKey, bucket);\n    return false;\n  }\n  bucket.tokens -= 1;\n  buckets.set(bucketKey, bucket);\n  return true;\n}\n", "import { Env } from './types';\n\nconst encoder = new TextEncoder();\nconst decoder = new TextDecoder();\n\nexport class HttpError extends Error {\n  status: number;\n  details?: unknown;\n\n  constructor(status: number, message: string, details?: unknown) {\n    super(message);\n    this.status = status;\n    this.details = details;\n  }\n}\n\nexport function jsonResponse(data: unknown, init: ResponseInit = {}): Response {\n  return new Response(JSON.stringify(data), {\n    headers: {\n      'content-type': 'application/json; charset=utf-8',\n      ...init.headers,\n    },\n    status: init.status ?? 200,\n  });\n}\n\nexport function errorResponse(message: string, status = 400, details?: unknown): Response {\n  return jsonResponse({ error: message, details }, { status });\n}\n\nexport async function readJson<T>(request: Request, limit = 32 * 1024): Promise<T> {\n  const lengthHeader = request.headers.get('content-length');\n  if (lengthHeader && Number(lengthHeader) > limit) {\n    throw new HttpError(413, 'Payload too large');\n  }\n  const buffer = await request.arrayBuffer();\n  if (buffer.byteLength > limit) {\n    throw new HttpError(413, 'Payload too large');\n  }\n  if (!buffer.byteLength) {\n    return {} as T;\n  }\n  const text = decoder.decode(buffer);\n  if (!text.trim()) {\n    return {} as T;\n  }\n  try {\n    return JSON.parse(text);\n  } catch (err) {\n    throw new HttpError(400, 'Invalid JSON');\n  }\n}\n\nexport function slugify(input: string): string {\n  return input\n    .toLowerCase()\n    .trim()\n    .replace(/[^a-z0-9]+/g, '-')\n    .replace(/^-+|-+$/g, '')\n    .replace(/-{2,}/g, '-');\n}\n\nexport function escapeHtml(input: string): string {\n  return input\n    .replace(/&/g, '&amp;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\"/g, '&quot;')\n    .replace(/'/g, '&#039;');\n}\n\nexport function nowMs(): number {\n  return Date.now();\n}\n\nexport function randomId(prefix: string): string {\n  const fragment = crypto.randomUUID().replace(/-/g, '').slice(0, 8);\n  return `${prefix}_${fragment}`;\n}\n\nexport function getIp(request: Request): string {\n  return (\n    request.headers.get('cf-connecting-ip') ||\n    request.headers.get('x-real-ip') ||\n    request.headers.get('x-forwarded-for') ||\n    'unknown'\n  );\n}\n\nexport async function sha256Hex(input: string): Promise<string> {\n  const bytes = encoder.encode(input);\n  const digest = await crypto.subtle.digest('SHA-256', bytes);\n  return bufferToHex(new Uint8Array(digest));\n}\n\nexport async function etagHex(value: string): Promise<string> {\n  return sha256Hex(value);\n}\n\nexport function bufferToHex(bytes: Uint8Array): string {\n  return Array.from(bytes)\n    .map((b) => b.toString(16).padStart(2, '0'))\n    .join('');\n}\n\nexport function base64UrlEncode(data: Uint8Array): string {\n  let str = '';\n  data.forEach((byte) => {\n    str += String.fromCharCode(byte);\n  });\n  return btoa(str).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/g, '');\n}\n\nexport function encodeText(input: string): Uint8Array {\n  return encoder.encode(input);\n}\n\nexport function decodeBase64Url(input: string): Uint8Array {\n  const padLength = (4 - (input.length % 4)) % 4;\n  const normalized = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLength);\n  const str = atob(normalized);\n  const bytes = new Uint8Array(str.length);\n  for (let i = 0; i < str.length; i += 1) {\n    bytes[i] = str.charCodeAt(i);\n  }\n  return bytes;\n}\n\nexport function minutesToMs(minutes: number): number {\n  return minutes * 60 * 1000;\n}\n\nexport function ensure(condition: unknown, status: number, message: string): asserts condition {\n  if (!condition) {\n    throw new HttpError(status, message);\n  }\n}\n\nexport function parseNumber(input: string | null, fallback: number): number {\n  if (!input) return fallback;\n  const parsed = Number(input);\n  return Number.isFinite(parsed) ? parsed : fallback;\n}\n\nexport function clamp(value: number, min: number, max: number): number {\n  return Math.min(Math.max(value, min), max);\n}\n\nexport async function fetchJson<T>(request: Request): Promise<T> {\n  return readJson<T>(request);\n}\n\nexport async function getUserRecord(env: Env, id: string) {\n  const result = await env.DB.prepare('SELECT id, email, role, created_at FROM users WHERE id = ?').bind(id).first();\n  return result as { id: string; email?: string | null; role: 'user' | 'admin' | 'anon'; created_at: number } | null;\n}\n\nexport function toBase64(bytes: Uint8Array): string {\n  if (typeof btoa === 'function') {\n    let binary = '';\n    bytes.forEach((b) => {\n      binary += String.fromCharCode(b);\n    });\n    return btoa(binary);\n  }\n  // eslint-disable-next-line @typescript-eslint/ban-ts-comment\n  // @ts-ignore Buffer is available in Node (tests)\n  return Buffer.from(bytes).toString('base64');\n}\n\nexport function fromBase64(input: string): Uint8Array {\n  if (typeof atob === 'function') {\n    const binary = atob(input);\n    const bytes = new Uint8Array(binary.length);\n    for (let i = 0; i < binary.length; i += 1) {\n      bytes[i] = binary.charCodeAt(i);\n    }\n    return bytes;\n  }\n  // eslint-disable-next-line @typescript-eslint/ban-ts-comment\n  // @ts-ignore Buffer is available in Node (tests)\n  const buf = Buffer.from(input, 'base64');\n  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);\n}\n\nexport function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {\n  if (a.length !== b.length) return false;\n  let diff = 0;\n  for (let i = 0; i < a.length; i += 1) {\n    diff |= a[i] ^ b[i];\n  }\n  return diff === 0;\n}\n", "export async function first<T>(db: D1Database, query: string, bindings: unknown[] = []): Promise<T | null> {\n  const result = await db.prepare(query).bind(...bindings).first<T>();\n  return (result as T) ?? null;\n}\n\nexport async function all<T>(db: D1Database, query: string, bindings: unknown[] = []): Promise<T[]> {\n  const { results } = await db.prepare(query).bind(...bindings).all<T>();\n  return results as T[];\n}\n\nexport async function run(db: D1Database, query: string, bindings: unknown[] = []) {\n  return db.prepare(query).bind(...bindings).run();\n}\n", "import { HandlerContext, AuthUser, Env } from './types';\nimport {\n  readJson,\n  jsonResponse,\n  HttpError,\n  ensure,\n  encodeText,\n  base64UrlEncode,\n  decodeBase64Url,\n  getUserRecord,\n  toBase64,\n  fromBase64,\n  timingSafeEqual,\n  nowMs,\n} from './utils';\nimport { first, run } from './db';\n\nconst SALT_LENGTH = 16;\nconst PBKDF2_ITERATIONS = 200000;\nconst PBKDF2_LENGTH = 32;\nconst textEncoder = new TextEncoder();\n\ninterface JwtPayload {\n  sub: string;\n  email: string;\n  role: 'user' | 'admin';\n  exp: number;\n  iat: number;\n}\n\nconst ANON_HEADER = /^Bearer\\s+anon:([a-z0-9_-]{8,64})$/i;\n\nexport async function hashPassword(password: string, pepper: string): Promise<string> {\n  // Use simple SHA-256 instead of PBKDF2 for now\n  const combined = password + pepper;\n  const bytes = encodeText(combined);\n  const ab = toArrayBuffer(bytes);\n  const digest = await crypto.subtle.digest('SHA-256', ab);\n  const hash = toBase64(new Uint8Array(digest));\n  return `sha256:${hash}`;\n}\n\nexport async function verifyPassword(password: string, pepper: string, hash: string): Promise<boolean> {\n  // Handle new SHA-256 format\n  if (hash.startsWith('sha256:')) {\n    const stored = hash.slice(7);\n    const combined = password + pepper;\n    const bytes = encodeText(combined);\n    const ab = toArrayBuffer(bytes);\n    const digest = await crypto.subtle.digest('SHA-256', ab);\n    const computed = toBase64(new Uint8Array(digest));\n    return computed === stored;\n  }\n  \n  // Handle old PBKDF2 format for backward compat\n  const parts = hash.split('$');\n  if (parts.length !== 4 || parts[0] !== 'pbkdf2') {\n    return false;\n  }\n  const iterations = Number(parts[1]);\n  if (!Number.isSafeInteger(iterations) || iterations <= 0) {\n    return false;\n  }\n  const salt = fromBase64(parts[2]);\n  const expected = fromBase64(parts[3]);\n  const actual = await deriveKey(password, pepper, salt, iterations);\n  return timingSafeEqual(actual, expected);\n}\n\nexport async function handleRegister(ctx: HandlerContext): Promise<Response> {\n  try {\n    const body = await readJson<{ email?: string; password?: string }>(ctx.request);\n    const email = body.email?.trim().toLowerCase();\n    const password = body.password?.trim();\n    ensure(email && email.includes('@'), 400, 'Valid email required');\n    ensure(password && password.length >= 6, 400, 'Password must be at least 6 chars');\n\n    const existing = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM users WHERE email = ?', [email]);\n    ensure(!existing, 409, 'Email already registered');\n\n    const id = crypto.randomUUID();\n    const passHash = await hashPassword(password!, ctx.env.PEPPER);\n    const createdAt = Date.now();\n    await ctx.env.DB\n      .prepare('INSERT INTO users (id, email, pass_hash, role, created_at) VALUES (?, ?, ?, ?, ?)')\n      .bind(id, email, passHash, 'user', createdAt)\n      .run();\n\n    const user: AuthUser = { id, email, role: 'user' };\n    const jwt = await issueJwt(user, ctx.env);\n    return jsonResponse({ user, jwt });\n  } catch (err) {\n    console.error('[register]', err);\n    throw err;\n  }\n}\n\nexport async function handleLogin(ctx: HandlerContext): Promise<Response> {\n  try {\n    const body = await readJson<{ email?: string; password?: string }>(ctx.request);\n    const email = body.email?.trim().toLowerCase();\n    const password = body.password?.trim();\n    ensure(email && password, 400, 'Email and password required');\n\n    const record = await first<{ id: string; email: string; role: 'user' | 'admin'; pass_hash: string }>(\n      ctx.env.DB,\n      'SELECT id, email, role, pass_hash FROM users WHERE email = ?',\n      [email]\n    );\n    ensure(record, 401, 'Invalid credentials');\n    const valid = await verifyPassword(password!, ctx.env.PEPPER, record!.pass_hash);\n    ensure(valid, 401, 'Invalid credentials');\n\n    const user: AuthUser = { id: record!.id, email: record!.email, role: record!.role };\n    const jwt = await issueJwt(user, ctx.env);\n    return jsonResponse({ user, jwt });\n  } catch (err) {\n    console.error('[login]', err);\n    throw err;\n  }\n}\n\nexport async function handleMe(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const dbUser = await getUserRecord(ctx.env, ctx.user!.id);\n  ensure(dbUser, 401, 'User not found');\n  return jsonResponse({ user: { id: dbUser!.id, email: dbUser!.email, role: dbUser!.role } });\n}\n\nexport async function authenticateRequest(request: Request, env: Env): Promise<AuthUser | null> {\n  const authHeader = request.headers.get('authorization');\n  const anonId = parseAnonHeader(authHeader);\n  if (anonId) {\n    await ensureAnonIdentity(env, anonId);\n    return { id: anonId, email: null, role: 'anon' };\n  }\n  if (!authHeader) {\n    return null;\n  }\n  const [, token] = authHeader.split(' ');\n  if (!token) return null;\n  const payload = await verifyJwt(token, env.JWT_SECRET);\n  if (!payload) return null;\n  return { id: payload.sub, email: payload.email, role: payload.role };\n}\n\nfunction parseAnonHeader(header: string | null): string | null {\n  if (!header) return null;\n  const match = ANON_HEADER.exec(header);\n  return match ? match[1] : null;\n}\n\nasync function ensureAnonIdentity(env: Env, id: string) {\n  const now = nowMs();\n  await run(env.DB, 'INSERT OR IGNORE INTO users (id, role, created_at) VALUES (?, ?, ?)', [id, 'anon', now]);\n  await run(env.DB, 'INSERT OR IGNORE INTO anon_users (id, created_at) VALUES (?, ?)', [id, now]);\n}\n\nasync function issueJwt(user: AuthUser, env: Env): Promise<string> {\n  const ttl = Number(env.JWT_TTL_MINUTES ?? '15');\n  const now = Math.floor(Date.now() / 1000);\n  const payload: JwtPayload = {\n    sub: user.id,\n    email: user.email,\n    role: user.role,\n    iat: now,\n    exp: now + ttl * 60,\n  };\n  return signJwt(payload, env.JWT_SECRET);\n}\n\nasync function signJwt(payload: JwtPayload, secret: string): Promise<string> {\n  const header = { alg: 'HS256', typ: 'JWT' };\n  const headerBytes = encodeText(JSON.stringify(header));\n  const payloadBytes = encodeText(JSON.stringify(payload));\n  const encodedHeader = base64UrlEncode(headerBytes);\n  const encodedPayload = base64UrlEncode(payloadBytes);\n  const data = `${encodedHeader}.${encodedPayload}`;\n  const keyBuffer = toArrayBuffer(encodeText(secret));\n  const key = await crypto.subtle.importKey('raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);\n  const dataBuffer = toArrayBuffer(encodeText(data));\n  const signature = await crypto.subtle.sign('HMAC', key, dataBuffer);\n  return `${data}.${base64UrlEncode(new Uint8Array(signature))}`;\n}\n\nasync function verifyJwt(token: string, secret: string): Promise<JwtPayload | null> {\n  const segments = token.split('.');\n  if (segments.length !== 3) return null;\n  const [encodedHeader, encodedPayload, encodedSignature] = segments;\n  const data = `${encodedHeader}.${encodedPayload}`;\n  const keyBuffer = toArrayBuffer(encodeText(secret));\n  const key = await crypto.subtle.importKey('raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);\n  const signatureBuffer = toArrayBuffer(decodeBase64Url(encodedSignature));\n  const dataBuffer = toArrayBuffer(encodeText(data));\n  const valid = await crypto.subtle.verify('HMAC', key, signatureBuffer, dataBuffer);\n  if (!valid) return null;\n  try {\n    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(encodedPayload)));\n    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {\n      return null;\n    }\n    return payload as JwtPayload;\n  } catch (err) {\n    console.error('jwt parse failed', err);\n    return null;\n  }\n}\n\nfunction toArrayBuffer(bytes: Uint8Array): ArrayBuffer {\n  const ab = new ArrayBuffer(bytes.byteLength)\n  new Uint8Array(ab).set(bytes)\n  return ab\n}\n\nasync function deriveKey(password: string, pepper: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {\n  const keyMaterial = await crypto.subtle.importKey('raw', toArrayBuffer(encodeText(password + pepper)), 'PBKDF2', false, [\n    'deriveBits',\n  ]);\n  const bits = await crypto.subtle.deriveBits(\n    {\n      name: 'PBKDF2',\n      hash: 'SHA-256',\n      salt: toArrayBuffer(salt),\n      iterations,\n    },\n    keyMaterial,\n    PBKDF2_LENGTH * 8\n  );\n  return new Uint8Array(bits);\n}\n", "import { Env } from './types';\nimport { ensure } from './utils';\nimport { first } from './db';\n\nexport async function requireRoomMembership(env: Env, roomKey: string, userId: string): Promise<string> {\n  const room = await first<{ id: string }>(env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomKey, roomKey]);\n  ensure(room, 404, 'Room not found');\n  const member = await first<{ user_id: string }>(\n    env.DB,\n    'SELECT user_id FROM room_members WHERE room_id = ? AND user_id = ?',\n    [room!.id, userId]\n  );\n  ensure(member, 403, 'Join room first');\n  return room!.id;\n}\n", "import { HandlerContext, Env } from './types';\nimport { all, first, run } from './db';\nimport { jsonResponse, ensure, nowMs } from './utils';\nimport { requireRoomMembership } from './access';\n\nconst READING_WINDOW_MS = 15 * 60 * 1000;\nconst CHECKIN_WINDOW_MS = 30 * 60 * 1000;\nconst DEDUPE_WINDOW_MS = 10 * 60 * 1000;\n\ninterface ReadingRow {\n  t_c: number | null;\n  noise_db: number | null;\n  lux: number | null;\n  created_at: number;\n}\n\ninterface CheckinRow {\n  user_id: string;\n  mood: number | null;\n  energy: number | null;\n  status: string | null;\n  created_at: number;\n}\n\nexport async function computeSuggestions(env: Env, roomId: string): Promise<void> {\n  const now = nowMs();\n  const readings = await all<ReadingRow>(\n    env.DB,\n    'SELECT t_c, noise_db, lux, created_at FROM readings WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 50',\n    [roomId, now - READING_WINDOW_MS]\n  );\n  if (!readings.length) {\n    return;\n  }\n  const checkins = await all<CheckinRow>(\n    env.DB,\n    'SELECT user_id, mood, energy, status, created_at FROM checkins WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC',\n    [roomId, now - CHECKIN_WINDOW_MS]\n  );\n  const candidates = buildCandidates(readings, checkins);\n  for (const suggestion of candidates) {\n    const exists = await first<{ id: string }>(\n      env.DB,\n      'SELECT id FROM suggestions WHERE room_id = ? AND kind = ? AND created_at >= ? LIMIT 1',\n      [roomId, suggestion.kind, now - DEDUPE_WINDOW_MS]\n    );\n    if (exists) continue;\n    await run(\n      env.DB,\n      'INSERT INTO suggestions (id, room_id, user_id, kind, text, created_at) VALUES (?, ?, NULL, ?, ?, ?)',\n      [crypto.randomUUID(), roomId, suggestion.kind, suggestion.text, now]\n    );\n  }\n  await run(env.DB, 'DELETE FROM suggestions WHERE created_at < ?', [now - 6 * 60 * 60 * 1000]);\n}\n\nexport function buildCandidates(readings: ReadingRow[], checkins: CheckinRow[]) {\n  const latest = readings[0];\n  const lowEnergy = checkins.filter((c) => typeof c.energy === 'number' && c.energy! <= 2);\n  const lowMood = checkins.filter((c) => typeof c.mood === 'number' && c.mood! <= 2);\n  const focusCount = checkins.filter((c) => c.status === 'focus').length;\n  const candidates: Array<{ kind: string; text: string }> = [];\n\n  if (typeof latest.noise_db === 'number' && latest.noise_db > 65 && lowEnergy.length) {\n    candidates.push({\n      kind: 'move',\n      text: `Ru\u00EDdo elevado (~${latest.noise_db.toFixed(0)} dB). Liberar sala alternativa ou oferecer fones.`,\n    });\n  }\n\n  if (typeof latest.t_c === 'number' && latest.t_c > 27 && lowMood.length) {\n    candidates.push({\n      kind: 'pause',\n      text: `Temperatura em ${latest.t_c.toFixed(1)}\u00B0C com humor baixo. Propor pausa r\u00E1pida + hidrata\u00E7\u00E3o.`,\n    });\n  }\n\n  if (typeof latest.lux === 'number' && latest.lux < 200) {\n    candidates.push({\n      kind: 'environment',\n      text: `Luminosidade baixa (${latest.lux.toFixed(0)} lux). Ajustar luz ou mover para \u00E1rea mais iluminada.`,\n    });\n  }\n\n  if (focusCount >= 2 && readings.length && (!lowMood.length || !lowEnergy.length)) {\n    candidates.push({\n      kind: 'pair',\n      text: 'H\u00E1 v\u00E1rias pessoas em foco por 30+ min. Sugerir pairing r\u00E1pido para desbloquear tarefas cr\u00EDticas.',\n    });\n  }\n\n  return candidates;\n}\n\nexport async function handleGetSuggestions(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const suggestions = await all<{ id: string; kind: string; text: string; created_at: number }>(\n    ctx.env.DB,\n    'SELECT id, kind, text, created_at FROM suggestions WHERE room_id = ? ORDER BY created_at DESC LIMIT 20',\n    [resolvedRoomId]\n  );\n  return jsonResponse({ suggestions });\n}\n", "import { HandlerContext } from './types';\nimport { readJson, jsonResponse, ensure, slugify, randomId, escapeHtml, clamp, nowMs } from './utils';\nimport { all, first, run } from './db';\nimport { allow } from './ratelimit';\nimport { computeSuggestions } from './agent';\nimport { requireRoomMembership } from './access';\n\nexport async function handleListRooms(ctx: HandlerContext): Promise<Response> {\n  const rooms = await all<{ id: string; name: string; slug: string; map_seed: string }>(\n    ctx.env.DB,\n    'SELECT id, name, slug, map_seed FROM rooms ORDER BY created_at ASC'\n  );\n  return jsonResponse({ rooms });\n}\n\nexport async function handleGetRoom(ctx: HandlerContext): Promise<Response> {\n  const { roomId } = ctx.params;\n  const room = await first<{ id: string; name: string; slug: string; map_seed: string }>(\n    ctx.env.DB,\n    'SELECT id, name, slug, map_seed FROM rooms WHERE id = ? OR slug = ?',\n    [roomId, roomId]\n  );\n  ensure(room, 404, 'Room not found');\n  return jsonResponse({ room });\n}\n\nexport async function handleCreateRoom(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');\n  const body = await readJson<{ name?: string; map_seed?: string }>(ctx.request);\n  const name = body.name?.trim();\n  ensure(name && name.length >= 3, 400, 'Room name required');\n  const baseSlug = slugify(name) || `room-${randomId('slug').split('_')[1]}`;\n  let slug = baseSlug;\n  let attempt = 1;\n  // eslint-disable-next-line no-constant-condition\n  while (true) {\n    const exists = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE slug = ?', [slug]);\n    if (!exists) break;\n    slug = `${baseSlug}-${attempt++}`;\n  }\n  const id = crypto.randomUUID();\n  await run(\n    ctx.env.DB,\n    'INSERT INTO rooms (id, name, slug, map_seed, created_at) VALUES (?, ?, ?, ?, ?)',\n    [id, name, slug, body.map_seed ?? null, nowMs()]\n  );\n  return jsonResponse({ room: { id, name, slug, map_seed: body.map_seed ?? null } }, { status: 201 });\n}\n\nexport async function handleJoinRoom(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const room = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomId, roomId]);\n  ensure(room, 404, 'Room not found');\n  await run(\n    ctx.env.DB,\n    'INSERT OR IGNORE INTO room_members (user_id, room_id, joined_at) VALUES (?, ?, ?)',\n    [ctx.user!.id, room!.id, nowMs()]\n  );\n  return jsonResponse({ joined: true });\n}\n\nexport async function handleListMessages(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const url = new URL(ctx.request.url);\n  const cursor = Number(url.searchParams.get('cursor') ?? '0');\n  const limit = clamp(Number(url.searchParams.get('limit') ?? '50'), 1, 200);\n  const rows = await all<{\n    id: string;\n    body: string;\n    created_at: number;\n    user_id: string;\n    email: string;\n  }>(\n    ctx.env.DB,\n    `SELECT m.id, m.body, m.created_at, u.id as user_id, u.email\n     FROM messages m\n     JOIN users u ON u.id = m.user_id\n     WHERE m.room_id = ? AND m.created_at < CASE WHEN ? = 0 THEN 9223372036854775807 ELSE ? END\n     ORDER BY m.created_at DESC\n     LIMIT ?`,\n    [resolvedRoomId, cursor, cursor, limit]\n  );\n  return jsonResponse({\n    messages: rows.reverse(),\n    nextCursor: rows.length ? rows[0].created_at : null,\n  });\n}\n\nexport async function handlePostMessage(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const body = await readJson<{ body?: string }>(ctx.request, 2 * 1024);\n  const message = body.body?.trim();\n  ensure(message && message.length, 400, 'Message body required');\n  ensure(message.length <= 512, 400, 'Message too long');\n  const throttleKey = `msg:${ctx.user!.id}:${resolvedRoomId}`;\n  const allowed = allow(throttleKey, 2);\n  ensure(allowed, 429, 'Slow down');\n  const html = escapeHtml(message);\n  const id = crypto.randomUUID();\n  const createdAt = nowMs();\n  await run(ctx.env.DB, 'INSERT INTO messages (id, room_id, user_id, body, created_at) VALUES (?, ?, ?, ?, ?)', [\n    id,\n    resolvedRoomId,\n    ctx.user!.id,\n    html,\n    createdAt,\n  ]);\n  return jsonResponse({ message: { id, body: html, created_at: createdAt } }, { status: 201 });\n}\n\nexport async function handleListTasks(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const tasks = await all<{\n    id: string;\n    title: string;\n    status: string;\n    assignee_id: string | null;\n    created_at: number;\n  }>(\n    ctx.env.DB,\n    'SELECT id, title, status, assignee_id, created_at FROM tasks WHERE room_id = ? ORDER BY created_at DESC',\n    [resolvedRoomId]\n  );\n  return jsonResponse({ tasks });\n}\n\nexport async function handleCreateTask(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const body = await readJson<{ title?: string; assignee_id?: string }>(ctx.request);\n  const title = body.title?.trim();\n  ensure(title && title.length >= 3, 400, 'Task title required');\n  const id = crypto.randomUUID();\n  await run(\n    ctx.env.DB,\n    'INSERT INTO tasks (id, room_id, title, status, assignee_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',\n    [id, resolvedRoomId, title, 'todo', body.assignee_id ?? null, nowMs()]\n  );\n  return jsonResponse({ task: { id, title, status: 'todo', assignee_id: body.assignee_id ?? null } }, { status: 201 });\n}\n\nexport async function handleUpdateTask(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { taskId } = ctx.params;\n  const task = await first<{ id: string; room_id: string }>(ctx.env.DB, 'SELECT id, room_id FROM tasks WHERE id = ?', [taskId]);\n  ensure(task, 404, 'Task not found');\n  await requireRoomMembership(ctx.env, task!.room_id, ctx.user!.id);\n  const body = await readJson<{ status?: string; assignee_id?: string | null }>(ctx.request);\n  const status = body.status ?? undefined;\n  if (status) {\n    ensure(['todo', 'doing', 'done'].includes(status), 400, 'Invalid status');\n  }\n  await run(\n    ctx.env.DB,\n    'UPDATE tasks SET status = COALESCE(?, status), assignee_id = ? WHERE id = ?',\n    [status ?? null, body.assignee_id ?? null, taskId]\n  );\n  const updated = await first(ctx.env.DB, 'SELECT id, room_id, title, status, assignee_id FROM tasks WHERE id = ?', [taskId]);\n  return jsonResponse({ task: updated });\n}\n\nexport async function handlePostCheckin(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const body = await readJson<{ mood?: number; energy?: number; status?: string }>(ctx.request);\n  const mood = clamp(Number(body.mood ?? 3), 1, 5);\n  const energy = clamp(Number(body.energy ?? 3), 1, 5);\n  const status = body.status ?? 'focus';\n  ensure(['focus', 'solo', 'pair', 'afk'].includes(status), 400, 'Invalid status');\n  const id = crypto.randomUUID();\n  const createdAt = nowMs();\n  await run(\n    ctx.env.DB,\n    'INSERT INTO checkins (id, user_id, room_id, mood, energy, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',\n    [id, ctx.user!.id, resolvedRoomId, mood, energy, status, createdAt]\n  );\n  await run(\n    ctx.env.DB,\n    'INSERT INTO presence (user_id, room_id, status, mood, energy, updated_at) VALUES (?, ?, ?, ?, ?, ?) '\n      + 'ON CONFLICT(user_id, room_id) DO UPDATE SET status=excluded.status, mood=excluded.mood, energy=excluded.energy, updated_at=excluded.updated_at',\n    [ctx.user!.id, resolvedRoomId, status, mood, energy, createdAt]\n  );\n  ctx.waitUntil(computeSuggestions(ctx.env, resolvedRoomId));\n  return jsonResponse({ ok: true });\n}\n\nexport async function handleGetCheckins(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const url = new URL(ctx.request.url);\n  const sinceMs = Number(url.searchParams.get('since') ?? 0);\n  const windowStart = sinceMs || nowMs() - 30 * 60 * 1000;\n  const checkins = await all<{\n    id: string;\n    user_id: string;\n    email?: string | null;\n    mood: number;\n    energy: number;\n    status: string;\n    created_at: number;\n  }>(\n    ctx.env.DB,\n    `SELECT c.id, c.user_id, u.email, c.mood, c.energy, c.status, c.created_at\n     FROM checkins c\n     JOIN users u ON u.id = c.user_id\n     WHERE c.room_id = ? AND c.created_at >= ?\n     ORDER BY c.created_at DESC`,\n    [resolvedRoomId, windowStart]\n  );\n  return jsonResponse({ checkins });\n}\n", "import { HandlerContext } from './types';\nimport { readJson, jsonResponse, ensure, nowMs, sha256Hex, clamp } from './utils';\nimport { all, first, run } from './db';\nimport { computeSuggestions } from './agent';\nimport { requireRoomMembership } from './access';\n\nexport async function handleCreateDevice(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');\n  const body = await readJson<{ room_id?: string; name?: string; kind?: string }>(ctx.request);\n  const roomKey = body.room_id?.trim();\n  const name = body.name?.trim() ?? 'Env Beacon';\n  ensure(roomKey, 400, 'room_id required');\n  const room = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomKey, roomKey]);\n  ensure(room, 404, 'Room not found');\n  const deviceId = `device_${crypto.randomUUID().split('-')[0]}`;\n  const secretPlain = generateSecret();\n  const secretHash = await hashDeviceSecret(secretPlain, ctx.env.PEPPER);\n  await run(\n    ctx.env.DB,\n    'INSERT INTO devices (id, room_id, name, kind, secret_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)',\n    [deviceId, room!.id, name, body.kind ?? 'environment', secretHash, nowMs()]\n  );\n  return jsonResponse({ device: { id: deviceId, room_id: room!.id, name, kind: body.kind ?? 'environment' }, secret: secretPlain }, { status: 201 });\n}\n\nexport async function handleListDevices(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');\n  const devices = await all<{ id: string; room_id: string; name: string; kind: string; created_at: number }>(\n    ctx.env.DB,\n    'SELECT id, room_id, name, kind, created_at FROM devices ORDER BY created_at DESC'\n  );\n  return jsonResponse({ devices });\n}\n\nexport async function handleIngest(ctx: HandlerContext): Promise<Response> {\n  const secret = ctx.request.headers.get('x-device-secret');\n  ensure(secret, 401, 'Missing X-Device-Secret');\n  const body = await readJson<{ device_id?: string; t_c?: number; noise_db?: number; lux?: number; ts?: number }>(ctx.request);\n  const deviceId = body.device_id?.trim();\n  ensure(deviceId, 400, 'device_id required');\n  const device = await first<{ id: string; room_id: string; secret_hash: string }>(\n    ctx.env.DB,\n    'SELECT id, room_id, secret_hash FROM devices WHERE id = ?',\n    [deviceId]\n  );\n  ensure(device, 404, 'Device not found');\n  const hashed = await hashDeviceSecret(secret!, ctx.env.PEPPER);\n  ensure(hashed === device!.secret_hash, 401, 'Invalid device secret');\n  const createdAt = Number(body.ts) || nowMs();\n  const tC = body.t_c ?? null;\n  const noise = body.noise_db ?? null;\n  const lux = body.lux ?? null;\n  await run(\n    ctx.env.DB,\n    'INSERT INTO readings (id, device_id, room_id, t_c, noise_db, lux, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',\n    [crypto.randomUUID(), device!.id, device!.room_id, tC, noise, lux, createdAt]\n  );\n  await run(ctx.env.DB, 'DELETE FROM readings WHERE room_id = ? AND created_at < ?', [device!.room_id, nowMs() - 15 * 60 * 1000]);\n  ctx.waitUntil(computeSuggestions(ctx.env, device!.room_id));\n  return jsonResponse({ stored: true });\n}\n\nexport async function handleGetReadings(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const url = new URL(ctx.request.url);\n  const minutes = clamp(Number(url.searchParams.get('window') ?? '15'), 5, 60);\n  const windowStart = nowMs() - minutes * 60 * 1000;\n  const readings = await all<{\n    id: string;\n    device_id: string;\n    t_c: number;\n    noise_db: number;\n    lux: number;\n    created_at: number;\n  }>(\n    ctx.env.DB,\n    'SELECT id, device_id, t_c, noise_db, lux, created_at FROM readings WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 200',\n    [resolvedRoomId, windowStart]\n  );\n  const ordered = readings.reverse();\n  const summary = summarizeReadings(ordered);\n  return jsonResponse({ readings: ordered, summary });\n}\n\nexport function summarizeReadings(readings: Array<{ t_c: number; noise_db: number; lux: number }>) {\n  if (!readings.length) return null;\n  const sums = readings.reduce(\n    (acc, row) => {\n      if (typeof row.t_c === 'number') {\n        acc.t_c.count += 1;\n        acc.t_c.sum += row.t_c;\n      }\n      if (typeof row.noise_db === 'number') {\n        acc.noise.count += 1;\n        acc.noise.sum += row.noise_db;\n      }\n      if (typeof row.lux === 'number') {\n        acc.lux.count += 1;\n        acc.lux.sum += row.lux;\n      }\n      return acc;\n    },\n    {\n      t_c: { sum: 0, count: 0 },\n      noise: { sum: 0, count: 0 },\n      lux: { sum: 0, count: 0 },\n    }\n  );\n  const avg = (sum: number, count: number) => (count ? Number((sum / count).toFixed(1)) : null);\n  return {\n    avg_t_c: avg(sums.t_c.sum, sums.t_c.count),\n    avg_noise_db: avg(sums.noise.sum, sums.noise.count),\n    avg_lux: avg(sums.lux.sum, sums.lux.count),\n  };\n}\n\nfunction generateSecret(): string {\n  const bytes = crypto.getRandomValues(new Uint8Array(16));\n  return Array.from(bytes)\n    .map((b) => b.toString(16).padStart(2, '0'))\n    .join('');\n}\n\nasync function hashDeviceSecret(secret: string, pepper: string): Promise<string> {\n  return sha256Hex(`${secret}${pepper}`);\n}\n", "type Entry<T = unknown> = { v: T; exp: number };\nconst store = new Map<string, Entry>();\n\nexport function cacheGet<T = unknown>(key: string): T | undefined {\n  const entry = store.get(key);\n  if (!entry) return undefined;\n  if (entry.exp > Date.now()) {\n    return entry.v as T;\n  }\n  store.delete(key);\n  return undefined;\n}\n\nexport function cacheSet<T = unknown>(key: string, value: T, ttlMs = 10_000) {\n  store.set(key, { v: value, exp: Date.now() + ttlMs });\n}\n", "import { HandlerContext } from './types';\nimport { all } from './db';\nimport { ensure, nowMs, jsonResponse, etagHex } from './utils';\nimport { requireRoomMembership } from './access';\nimport { cacheGet, cacheSet } from './cache';\nimport { summarizeReadings } from './iot';\n\ntype DashboardPayload = {\n  messages: Array<{ id: string; body: string; created_at: number; user_id: string; email?: string | null }>;\n  tasks: Array<{ id: string; title: string; status: string; assignee_id: string | null; created_at: number }>;\n  readings: { summary: Record<string, unknown> | null; readings: Array<{ id: string; device_id: string; t_c: number | null; noise_db: number | null; lux: number | null; created_at: number }> };\n  suggestions: Array<{ id: string; kind: string; text: string; created_at: number }>;\n  presence: Array<{ user_id: string; email?: string | null; status: string; mood: number | null; energy: number | null; updated_at: number }>;\n};\n\nconst CACHE_TTL = 10_000;\n\nexport async function handleDashboard(ctx: HandlerContext): Promise<Response> {\n  ensure(ctx.user, 401, 'Unauthorized');\n  const { roomId } = ctx.params;\n  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);\n  const cacheKey = `dash:${resolvedRoomId}`;\n  const cachedEntry = cacheGet<{ etag: string; body: DashboardPayload }>(cacheKey);\n  const ifNoneMatch = ctx.request.headers.get('if-none-match');\n  if (cachedEntry) {\n    if (ifNoneMatch && ifNoneMatch === cachedEntry.etag) {\n      return new Response(null, { status: 304, headers: { ETag: cachedEntry.etag } });\n    }\n    const cachedResponse = jsonResponse(cachedEntry.body, {\n      headers: { 'Cache-Control': 'public, max-age=10, stale-while-revalidate=300' },\n    });\n    cachedResponse.headers.set('ETag', cachedEntry.etag);\n    return cachedResponse;\n  }\n\n  const since15 = nowMs() - 15 * 60 * 1000;\n  const since30 = nowMs() - 30 * 60 * 1000;\n  const [messages, tasks, readings, suggestions, presence] = await Promise.all([\n    all(ctx.env.DB,\n      `SELECT m.id, m.body, m.created_at, m.user_id, u.email\n       FROM messages m\n       JOIN users u ON u.id = m.user_id\n       WHERE m.room_id = ?\n       ORDER BY m.created_at DESC\n       LIMIT 50`,\n      [resolvedRoomId]\n    ),\n    all(ctx.env.DB,\n      `SELECT id, title, status, assignee_id, created_at\n       FROM tasks\n       WHERE room_id = ?\n       ORDER BY created_at DESC`,\n      [resolvedRoomId]\n    ),\n    all(ctx.env.DB,\n      `SELECT id, device_id, t_c, noise_db, lux, created_at\n       FROM readings\n       WHERE room_id = ? AND created_at >= ?\n       ORDER BY created_at DESC\n       LIMIT 200`,\n      [resolvedRoomId, since15]\n    ),\n    all(ctx.env.DB,\n      `SELECT id, kind, text, created_at\n       FROM suggestions\n       WHERE room_id = ?\n       ORDER BY created_at DESC\n       LIMIT 50`,\n      [resolvedRoomId]\n    ),\n    all(ctx.env.DB,\n      `SELECT p.user_id, u.email, p.status, p.mood, p.energy, p.updated_at\n       FROM presence p\n       LEFT JOIN users u ON u.id = p.user_id\n       WHERE p.room_id = ? AND p.updated_at >= ?\n       ORDER BY p.updated_at DESC`,\n      [resolvedRoomId, since30]\n    ),\n  ]);\n\n  const orderedReadings = [...readings].reverse();\n  const summary = summarizeReadings(orderedReadings);\n  const payload: DashboardPayload = {\n    messages: messages.reverse(),\n    tasks,\n    readings: { summary, readings: orderedReadings },\n    suggestions,\n    presence,\n  };\n  const etag = await etagHex(JSON.stringify(payload));\n  cacheSet(cacheKey, { etag, body: payload }, CACHE_TTL);\n  if (ifNoneMatch && ifNoneMatch === etag) {\n    return new Response(null, { status: 304, headers: { ETag: etag } });\n  }\n  const response = jsonResponse(payload, {\n    headers: { 'Cache-Control': 'public, max-age=10, stale-while-revalidate=300' },\n  });\n  response.headers.set('ETag', etag);\n  return response;\n}\n", "import { Env, Handler, HandlerContext } from './types';\nimport { allow } from './ratelimit';\nimport { jsonResponse, errorResponse, HttpError, getIp } from './utils';\nimport { handleRegister, handleLogin, handleMe, authenticateRequest } from './auth';\nimport {\n  handleListRooms,\n  handleGetRoom,\n  handleCreateRoom,\n  handleJoinRoom,\n  handleListMessages,\n  handlePostMessage,\n  handleListTasks,\n  handleCreateTask,\n  handleUpdateTask,\n  handlePostCheckin,\n  handleGetCheckins,\n} from './rooms';\nimport { handleCreateDevice, handleListDevices, handleIngest, handleGetReadings } from './iot';\nimport { handleGetSuggestions } from './agent';\nimport { handleDashboard } from './dashboard';\n\ninterface Route {\n  method: string;\n  pattern: string;\n  handler: Handler;\n  auth?: 'optional' | 'user';\n  skipRateLimit?: boolean;\n}\n\nconst routes: Route[] = [\n  { method: 'GET', pattern: '/health', handler: handleHealth, auth: 'optional', skipRateLimit: true },\n  { method: 'POST', pattern: '/api/auth/register', handler: handleRegister, auth: 'optional' },\n  { method: 'POST', pattern: '/api/auth/login', handler: handleLogin, auth: 'optional' },\n  { method: 'GET', pattern: '/api/auth/me', handler: handleMe, auth: 'user' },\n  { method: 'GET', pattern: '/api/rooms', handler: handleListRooms, auth: 'optional' },\n  { method: 'GET', pattern: '/api/rooms/:roomId', handler: handleGetRoom, auth: 'optional' },\n  { method: 'POST', pattern: '/api/rooms', handler: handleCreateRoom, auth: 'user' },\n  { method: 'POST', pattern: '/api/rooms/:roomId/join', handler: handleJoinRoom, auth: 'user' },\n  { method: 'GET', pattern: '/api/rooms/:roomId/dashboard', handler: handleDashboard, auth: 'user' },\n  { method: 'GET', pattern: '/api/rooms/:roomId/messages', handler: handleListMessages, auth: 'user' },\n  { method: 'POST', pattern: '/api/rooms/:roomId/messages', handler: handlePostMessage, auth: 'user' },\n  { method: 'GET', pattern: '/api/rooms/:roomId/tasks', handler: handleListTasks, auth: 'user' },\n  { method: 'POST', pattern: '/api/rooms/:roomId/tasks', handler: handleCreateTask, auth: 'user' },\n  { method: 'PUT', pattern: '/api/tasks/:taskId', handler: handleUpdateTask, auth: 'user' },\n  { method: 'POST', pattern: '/api/rooms/:roomId/checkins', handler: handlePostCheckin, auth: 'user' },\n  { method: 'GET', pattern: '/api/rooms/:roomId/checkins', handler: handleGetCheckins, auth: 'user' },\n  { method: 'GET', pattern: '/api/rooms/:roomId/readings', handler: handleGetReadings, auth: 'user' },\n  { method: 'GET', pattern: '/api/rooms/:roomId/suggestions', handler: handleGetSuggestions, auth: 'user' },\n  { method: 'POST', pattern: '/api/devices', handler: handleCreateDevice, auth: 'user' },\n  { method: 'GET', pattern: '/api/devices', handler: handleListDevices, auth: 'user' },\n  { method: 'POST', pattern: '/api/iot/ingest', handler: handleIngest, auth: 'optional', skipRateLimit: true },\n];\n\nconst corsHeaders = {\n  'access-control-allow-origin': '*',\n  'access-control-allow-methods': 'GET,POST,PUT,OPTIONS',\n  'access-control-allow-headers': 'content-type,authorization,x-device-secret',\n};\n\nexport default {\n  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {\n    if (request.method === 'OPTIONS') {\n      return new Response(null, { status: 204, headers: corsHeaders });\n    }\n    try {\n      const url = new URL(request.url);\n      const match = findRoute(request.method, url.pathname);\n      if (!match) {\n        return withCors(errorResponse('Not Found', 404));\n      }\n      if (!match.route.skipRateLimit) {\n        const ip = getIp(request);\n        if (!allow(`rate:${ip}`, 60)) {\n          return withCors(errorResponse('Too many requests', 429));\n        }\n      }\n      const user = await authenticateRequest(request, env);\n      if (match.route.auth === 'user' && !user) {\n        return withCors(errorResponse('Unauthorized', 401));\n      }\n      const ctxPayload: HandlerContext = {\n        env,\n        request,\n        params: match.params,\n        user: user ?? null,\n        waitUntil: (promise) => ctx.waitUntil(promise),\n      };\n      const response = await match.route.handler(ctxPayload);\n      return withCors(response);\n    } catch (err) {\n      if (err instanceof HttpError) {\n        return withCors(errorResponse(err.message, err.status, err.details));\n      }\n      console.error('Unhandled worker error', err);\n      return withCors(errorResponse('Internal Error', 500));\n    }\n  },\n};\n\nfunction withCors(response: Response): Response {\n  const headers = new Headers(response.headers);\n  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));\n  return new Response(response.body, { status: response.status, headers });\n}\n\nfunction findRoute(method: string, pathname: string) {\n  for (const route of routes) {\n    if (route.method !== method) continue;\n    const params = matchPath(route.pattern, pathname);\n    if (params) {\n      return { route, params };\n    }\n  }\n  return null;\n}\n\nfunction matchPath(pattern: string, pathname: string): Record<string, string> | null {\n  const patternParts = trim(pattern).split('/');\n  const pathParts = trim(pathname).split('/');\n  if (patternParts.length !== pathParts.length) return null;\n  const params: Record<string, string> = {};\n  for (let i = 0; i < patternParts.length; i += 1) {\n    const expected = patternParts[i];\n    const actual = pathParts[i];\n    if (expected.startsWith(':')) {\n      params[expected.slice(1)] = decodeURIComponent(actual);\n    } else if (expected !== actual) {\n      return null;\n    }\n  }\n  return params;\n}\n\nfunction trim(path: string): string {\n  const clean = path.replace(/^\\/+|\\/+$|\\s+/g, '');\n  return clean ? clean : '';\n}\n\nasync function handleHealth(ctx: HandlerContext): Promise<Response> {\n  return jsonResponse({ ok: true });\n}\n", "import type { Middleware } from \"./common\";\n\nconst drainBody: Middleware = async (request, env, _ctx, middlewareCtx) => {\n\ttry {\n\t\treturn await middlewareCtx.next(request, env);\n\t} finally {\n\t\ttry {\n\t\t\tif (request.body !== null && !request.bodyUsed) {\n\t\t\t\tconst reader = request.body.getReader();\n\t\t\t\twhile (!(await reader.read()).done) {}\n\t\t\t}\n\t\t} catch (e) {\n\t\t\tconsole.error(\"Failed to drain the unused request body.\", e);\n\t\t}\n\t}\n};\n\nexport default drainBody;\n", "import type { Middleware } from \"./common\";\n\ninterface JsonError {\n\tmessage?: string;\n\tname?: string;\n\tstack?: string;\n\tcause?: JsonError;\n}\n\nfunction reduceError(e: any): JsonError {\n\treturn {\n\t\tname: e?.name,\n\t\tmessage: e?.message ?? String(e),\n\t\tstack: e?.stack,\n\t\tcause: e?.cause === undefined ? undefined : reduceError(e.cause),\n\t};\n}\n\n// See comment in `bundle.ts` for details on why this is needed\nconst jsonError: Middleware = async (request, env, _ctx, middlewareCtx) => {\n\ttry {\n\t\treturn await middlewareCtx.next(request, env);\n\t} catch (e: any) {\n\t\tconst error = reduceError(e);\n\t\treturn Response.json(error, {\n\t\t\tstatus: 500,\n\t\t\theaders: { \"MF-Experimental-Error-Stack\": \"true\" },\n\t\t});\n\t}\n};\n\nexport default jsonError;\n", "\t\t\t\timport worker, * as OTHER_EXPORTS from \"/home/db/code/holo-work/core/worker/src/index.ts\";\n\t\t\t\timport * as __MIDDLEWARE_0__ from \"/home/db/code/holo-work/core/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts\";\nimport * as __MIDDLEWARE_1__ from \"/home/db/code/holo-work/core/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts\";\n\n\t\t\t\texport * from \"/home/db/code/holo-work/core/worker/src/index.ts\";\n\t\t\t\tconst MIDDLEWARE_TEST_INJECT = \"__INJECT_FOR_TESTING_WRANGLER_MIDDLEWARE__\";\n\t\t\t\texport const __INTERNAL_WRANGLER_MIDDLEWARE__ = [\n\t\t\t\t\t\n\t\t\t\t\t__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default\n\t\t\t\t]\n\t\t\t\texport default worker;", "export type Awaitable<T> = T | Promise<T>;\n// TODO: allow dispatching more events?\nexport type Dispatcher = (\n\ttype: \"scheduled\",\n\tinit: { cron?: string }\n) => Awaitable<void>;\n\nexport type IncomingRequest = Request<\n\tunknown,\n\tIncomingRequestCfProperties<unknown>\n>;\n\nexport interface MiddlewareContext {\n\tdispatch: Dispatcher;\n\tnext(request: IncomingRequest, env: any): Awaitable<Response>;\n}\n\nexport type Middleware = (\n\trequest: IncomingRequest,\n\tenv: any,\n\tctx: ExecutionContext,\n\tmiddlewareCtx: MiddlewareContext\n) => Awaitable<Response>;\n\nconst __facade_middleware__: Middleware[] = [];\n\n// The register functions allow for the insertion of one or many middleware,\n// We register internal middleware first in the stack, but have no way of controlling\n// the order that addMiddleware is run in service workers so need an internal function.\nexport function __facade_register__(...args: (Middleware | Middleware[])[]) {\n\t__facade_middleware__.push(...args.flat());\n}\nexport function __facade_registerInternal__(\n\t...args: (Middleware | Middleware[])[]\n) {\n\t__facade_middleware__.unshift(...args.flat());\n}\n\nfunction __facade_invokeChain__(\n\trequest: IncomingRequest,\n\tenv: any,\n\tctx: ExecutionContext,\n\tdispatch: Dispatcher,\n\tmiddlewareChain: Middleware[]\n): Awaitable<Response> {\n\tconst [head, ...tail] = middlewareChain;\n\tconst middlewareCtx: MiddlewareContext = {\n\t\tdispatch,\n\t\tnext(newRequest, newEnv) {\n\t\t\treturn __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);\n\t\t},\n\t};\n\treturn head(request, env, ctx, middlewareCtx);\n}\n\nexport function __facade_invoke__(\n\trequest: IncomingRequest,\n\tenv: any,\n\tctx: ExecutionContext,\n\tdispatch: Dispatcher,\n\tfinalMiddleware: Middleware\n): Awaitable<Response> {\n\treturn __facade_invokeChain__(request, env, ctx, dispatch, [\n\t\t...__facade_middleware__,\n\t\tfinalMiddleware,\n\t]);\n}\n", "// This loads all middlewares exposed on the middleware object and then starts\n// the invocation chain. The big idea is that we can add these to the middleware\n// export dynamically through wrangler, or we can potentially let users directly\n// add them as a sort of \"plugin\" system.\n\nimport ENTRY, { __INTERNAL_WRANGLER_MIDDLEWARE__ } from \"/home/db/code/holo-work/core/worker/.wrangler/tmp/bundle-W7ZLgd/middleware-insertion-facade.js\";\nimport { __facade_invoke__, __facade_register__, Dispatcher } from \"/home/db/code/holo-work/core/node_modules/wrangler/templates/middleware/common.ts\";\nimport type { WorkerEntrypointConstructor } from \"/home/db/code/holo-work/core/worker/.wrangler/tmp/bundle-W7ZLgd/middleware-insertion-facade.js\";\n\n// Preserve all the exports from the worker\nexport * from \"/home/db/code/holo-work/core/worker/.wrangler/tmp/bundle-W7ZLgd/middleware-insertion-facade.js\";\n\nclass __Facade_ScheduledController__ implements ScheduledController {\n\treadonly #noRetry: ScheduledController[\"noRetry\"];\n\n\tconstructor(\n\t\treadonly scheduledTime: number,\n\t\treadonly cron: string,\n\t\tnoRetry: ScheduledController[\"noRetry\"]\n\t) {\n\t\tthis.#noRetry = noRetry;\n\t}\n\n\tnoRetry() {\n\t\tif (!(this instanceof __Facade_ScheduledController__)) {\n\t\t\tthrow new TypeError(\"Illegal invocation\");\n\t\t}\n\t\t// Need to call native method immediately in case uncaught error thrown\n\t\tthis.#noRetry();\n\t}\n}\n\nfunction wrapExportedHandler(worker: ExportedHandler): ExportedHandler {\n\t// If we don't have any middleware defined, just return the handler as is\n\tif (\n\t\t__INTERNAL_WRANGLER_MIDDLEWARE__ === undefined ||\n\t\t__INTERNAL_WRANGLER_MIDDLEWARE__.length === 0\n\t) {\n\t\treturn worker;\n\t}\n\t// Otherwise, register all middleware once\n\tfor (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {\n\t\t__facade_register__(middleware);\n\t}\n\n\tconst fetchDispatcher: ExportedHandlerFetchHandler = function (\n\t\trequest,\n\t\tenv,\n\t\tctx\n\t) {\n\t\tif (worker.fetch === undefined) {\n\t\t\tthrow new Error(\"Handler does not export a fetch() function.\");\n\t\t}\n\t\treturn worker.fetch(request, env, ctx);\n\t};\n\n\treturn {\n\t\t...worker,\n\t\tfetch(request, env, ctx) {\n\t\t\tconst dispatcher: Dispatcher = function (type, init) {\n\t\t\t\tif (type === \"scheduled\" && worker.scheduled !== undefined) {\n\t\t\t\t\tconst controller = new __Facade_ScheduledController__(\n\t\t\t\t\t\tDate.now(),\n\t\t\t\t\t\tinit.cron ?? \"\",\n\t\t\t\t\t\t() => {}\n\t\t\t\t\t);\n\t\t\t\t\treturn worker.scheduled(controller, env, ctx);\n\t\t\t\t}\n\t\t\t};\n\t\t\treturn __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);\n\t\t},\n\t};\n}\n\nfunction wrapWorkerEntrypoint(\n\tklass: WorkerEntrypointConstructor\n): WorkerEntrypointConstructor {\n\t// If we don't have any middleware defined, just return the handler as is\n\tif (\n\t\t__INTERNAL_WRANGLER_MIDDLEWARE__ === undefined ||\n\t\t__INTERNAL_WRANGLER_MIDDLEWARE__.length === 0\n\t) {\n\t\treturn klass;\n\t}\n\t// Otherwise, register all middleware once\n\tfor (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {\n\t\t__facade_register__(middleware);\n\t}\n\n\t// `extend`ing `klass` here so other RPC methods remain callable\n\treturn class extends klass {\n\t\t#fetchDispatcher: ExportedHandlerFetchHandler<Record<string, unknown>> = (\n\t\t\trequest,\n\t\t\tenv,\n\t\t\tctx\n\t\t) => {\n\t\t\tthis.env = env;\n\t\t\tthis.ctx = ctx;\n\t\t\tif (super.fetch === undefined) {\n\t\t\t\tthrow new Error(\"Entrypoint class does not define a fetch() function.\");\n\t\t\t}\n\t\t\treturn super.fetch(request);\n\t\t};\n\n\t\t#dispatcher: Dispatcher = (type, init) => {\n\t\t\tif (type === \"scheduled\" && super.scheduled !== undefined) {\n\t\t\t\tconst controller = new __Facade_ScheduledController__(\n\t\t\t\t\tDate.now(),\n\t\t\t\t\tinit.cron ?? \"\",\n\t\t\t\t\t() => {}\n\t\t\t\t);\n\t\t\t\treturn super.scheduled(controller);\n\t\t\t}\n\t\t};\n\n\t\tfetch(request: Request<unknown, IncomingRequestCfProperties>) {\n\t\t\treturn __facade_invoke__(\n\t\t\t\trequest,\n\t\t\t\tthis.env,\n\t\t\t\tthis.ctx,\n\t\t\t\tthis.#dispatcher,\n\t\t\t\tthis.#fetchDispatcher\n\t\t\t);\n\t\t}\n\t};\n}\n\nlet WRAPPED_ENTRY: ExportedHandler | WorkerEntrypointConstructor | undefined;\nif (typeof ENTRY === \"object\") {\n\tWRAPPED_ENTRY = wrapExportedHandler(ENTRY);\n} else if (typeof ENTRY === \"function\") {\n\tWRAPPED_ENTRY = wrapWorkerEntrypoint(ENTRY);\n}\nexport default WRAPPED_ENTRY;\n"],
  "mappings": "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",
  "names": []
}
```

## File: worker/src/access.ts
```typescript
import { Env } from './types';
import { ensure } from './utils';
import { first } from './db';
export async function requireRoomMembership(env: Env, roomKey: string, userId: string): Promise<string> {
  const room = await first<{ id: string }>(env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomKey, roomKey]);
  ensure(room, 404, 'Room not found');
  const member = await first<{ user_id: string }>(
    env.DB,
    'SELECT user_id FROM room_members WHERE room_id = ? AND user_id = ?',
    [room!.id, userId]
  );
  ensure(member, 403, 'Join room first');
  return room!.id;
}
```

## File: worker/src/agent.ts
```typescript
import { HandlerContext, Env } from './types';
import { all, first, run } from './db';
import { jsonResponse, ensure, nowMs } from './utils';
import { requireRoomMembership } from './access';
const READING_WINDOW_MS = 15 * 60 * 1000;
const CHECKIN_WINDOW_MS = 30 * 60 * 1000;
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;
interface ReadingRow {
  t_c: number | null;
  noise_db: number | null;
  lux: number | null;
  created_at: number;
}
interface CheckinRow {
  user_id: string;
  mood: number | null;
  energy: number | null;
  status: string | null;
  created_at: number;
}
export async function computeSuggestions(env: Env, roomId: string): Promise<void> {
  const now = nowMs();
  const readings = await all<ReadingRow>(
    env.DB,
    'SELECT t_c, noise_db, lux, created_at FROM readings WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 50',
    [roomId, now - READING_WINDOW_MS]
  );
  if (!readings.length) {
    return;
  }
  const checkins = await all<CheckinRow>(
    env.DB,
    'SELECT user_id, mood, energy, status, created_at FROM checkins WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC',
    [roomId, now - CHECKIN_WINDOW_MS]
  );
  const candidates = buildCandidates(readings, checkins);
  for (const suggestion of candidates) {
    const exists = await first<{ id: string }>(
      env.DB,
      'SELECT id FROM suggestions WHERE room_id = ? AND kind = ? AND created_at >= ? LIMIT 1',
      [roomId, suggestion.kind, now - DEDUPE_WINDOW_MS]
    );
    if (exists) continue;
    await run(
      env.DB,
      'INSERT INTO suggestions (id, room_id, user_id, kind, text, created_at) VALUES (?, ?, NULL, ?, ?, ?)',
      [crypto.randomUUID(), roomId, suggestion.kind, suggestion.text, now]
    );
  }
  await run(env.DB, 'DELETE FROM suggestions WHERE created_at < ?', [now - 6 * 60 * 60 * 1000]);
}
export function buildCandidates(readings: ReadingRow[], checkins: CheckinRow[]) {
  const latest = readings[0];
  const lowEnergy = checkins.filter((c) => typeof c.energy === 'number' && c.energy! <= 2);
  const lowMood = checkins.filter((c) => typeof c.mood === 'number' && c.mood! <= 2);
  const focusCount = checkins.filter((c) => c.status === 'focus').length;
  const candidates: Array<{ kind: string; text: string }> = [];
  if (typeof latest.noise_db === 'number' && latest.noise_db > 65 && lowEnergy.length) {
    candidates.push({
      kind: 'move',
      text: `Ruído elevado (~${latest.noise_db.toFixed(0)} dB). Liberar sala alternativa ou oferecer fones.`,
    });
  }
  if (typeof latest.t_c === 'number' && latest.t_c > 27 && lowMood.length) {
    candidates.push({
      kind: 'pause',
      text: `Temperatura em ${latest.t_c.toFixed(1)}°C com humor baixo. Propor pausa rápida + hidratação.`,
    });
  }
  if (typeof latest.lux === 'number' && latest.lux < 200) {
    candidates.push({
      kind: 'environment',
      text: `Luminosidade baixa (${latest.lux.toFixed(0)} lux). Ajustar luz ou mover para área mais iluminada.`,
    });
  }
  if (focusCount >= 2 && readings.length && (!lowMood.length || !lowEnergy.length)) {
    candidates.push({
      kind: 'pair',
      text: 'Há várias pessoas em foco por 30+ min. Sugerir pairing rápido para desbloquear tarefas críticas.',
    });
  }
  return candidates;
}
export async function handleGetSuggestions(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const suggestions = await all<{ id: string; kind: string; text: string; created_at: number }>(
    ctx.env.DB,
    'SELECT id, kind, text, created_at FROM suggestions WHERE room_id = ? ORDER BY created_at DESC LIMIT 20',
    [resolvedRoomId]
  );
  return jsonResponse({ suggestions });
}
```

## File: worker/src/auth.ts
```typescript
import { HandlerContext, AuthUser, Env } from './types';
import {
  readJson,
  jsonResponse,
  HttpError,
  ensure,
  encodeText,
  base64UrlEncode,
  decodeBase64Url,
  getUserRecord,
  toBase64,
  fromBase64,
  timingSafeEqual,
  nowMs,
} from './utils';
import { first, run } from './db';
const SALT_LENGTH = 16;
const PBKDF2_ITERATIONS = 200000;
const PBKDF2_LENGTH = 32;
const textEncoder = new TextEncoder();
interface JwtPayload {
  sub: string;
  email: string;
  role: 'user' | 'admin';
  exp: number;
  iat: number;
}
const ANON_HEADER = /^Bearer\s+anon:([a-z0-9_-]{8,64})$/i;
export async function hashPassword(password: string, pepper: string): Promise<string> {
  const combined = password + pepper;
  const bytes = encodeText(combined);
  const ab = toArrayBuffer(bytes);
  const digest = await crypto.subtle.digest('SHA-256', ab);
  const hash = toBase64(new Uint8Array(digest));
  return `sha256:${hash}`;
}
export async function verifyPassword(password: string, pepper: string, hash: string): Promise<boolean> {
  if (hash.startsWith('sha256:')) {
    const stored = hash.slice(7);
    const combined = password + pepper;
    const bytes = encodeText(combined);
    const ab = toArrayBuffer(bytes);
    const digest = await crypto.subtle.digest('SHA-256', ab);
    const computed = toBase64(new Uint8Array(digest));
    return computed === stored;
  }
  const parts = hash.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') {
    return false;
  }
  const iterations = Number(parts[1]);
  if (!Number.isSafeInteger(iterations) || iterations <= 0) {
    return false;
  }
  const salt = fromBase64(parts[2]);
  const expected = fromBase64(parts[3]);
  const actual = await deriveKey(password, pepper, salt, iterations);
  return timingSafeEqual(actual, expected);
}
export async function handleRegister(ctx: HandlerContext): Promise<Response> {
  try {
    const body = await readJson<{ email?: string; password?: string }>(ctx.request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    ensure(email && email.includes('@'), 400, 'Valid email required');
    ensure(password && password.length >= 6, 400, 'Password must be at least 6 chars');
    const existing = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM users WHERE email = ?', [email]);
    ensure(!existing, 409, 'Email already registered');
    const id = crypto.randomUUID();
    const passHash = await hashPassword(password!, ctx.env.PEPPER);
    const createdAt = Date.now();
    await ctx.env.DB
      .prepare('INSERT INTO users (id, email, pass_hash, role, created_at) VALUES (?, ?, ?, ?, ?)')
      .bind(id, email, passHash, 'user', createdAt)
      .run();
    const user: AuthUser = { id, email, role: 'user' };
    const jwt = await issueJwt(user, ctx.env);
    return jsonResponse({ user, jwt });
  } catch (err) {
    console.error('[register]', err);
    throw err;
  }
}
export async function handleLogin(ctx: HandlerContext): Promise<Response> {
  try {
    const body = await readJson<{ email?: string; password?: string }>(ctx.request);
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    ensure(email && password, 400, 'Email and password required');
    const record = await first<{ id: string; email: string; role: 'user' | 'admin'; pass_hash: string }>(
      ctx.env.DB,
      'SELECT id, email, role, pass_hash FROM users WHERE email = ?',
      [email]
    );
    ensure(record, 401, 'Invalid credentials');
    const valid = await verifyPassword(password!, ctx.env.PEPPER, record!.pass_hash);
    ensure(valid, 401, 'Invalid credentials');
    const user: AuthUser = { id: record!.id, email: record!.email, role: record!.role };
    const jwt = await issueJwt(user, ctx.env);
    return jsonResponse({ user, jwt });
  } catch (err) {
    console.error('[login]', err);
    throw err;
  }
}
export async function handleMe(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const dbUser = await getUserRecord(ctx.env, ctx.user!.id);
  ensure(dbUser, 401, 'User not found');
  return jsonResponse({ user: { id: dbUser!.id, email: dbUser!.email, role: dbUser!.role } });
}
export async function authenticateRequest(request: Request, env: Env): Promise<AuthUser | null> {
  const authHeader = request.headers.get('authorization');
  const anonId = parseAnonHeader(authHeader);
  if (anonId) {
    await ensureAnonIdentity(env, anonId);
    return { id: anonId, email: null, role: 'anon' };
  }
  if (!authHeader) {
    return null;
  }
  const [, token] = authHeader.split(' ');
  if (!token) return null;
  const payload = await verifyJwt(token, env.JWT_SECRET);
  if (!payload) return null;
  return { id: payload.sub, email: payload.email, role: payload.role };
}
function parseAnonHeader(header: string | null): string | null {
  if (!header) return null;
  const match = ANON_HEADER.exec(header);
  return match ? match[1] : null;
}
async function ensureAnonIdentity(env: Env, id: string) {
  const now = nowMs();
  await run(env.DB, 'INSERT OR IGNORE INTO users (id, role, created_at) VALUES (?, ?, ?)', [id, 'anon', now]);
  await run(env.DB, 'INSERT OR IGNORE INTO anon_users (id, created_at) VALUES (?, ?)', [id, now]);
}
async function issueJwt(user: AuthUser, env: Env): Promise<string> {
  const ttl = Number(env.JWT_TTL_MINUTES ?? '15');
  const now = Math.floor(Date.now() / 1000);
  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + ttl * 60,
  };
  return signJwt(payload, env.JWT_SECRET);
}
async function signJwt(payload: JwtPayload, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerBytes = encodeText(JSON.stringify(header));
  const payloadBytes = encodeText(JSON.stringify(payload));
  const encodedHeader = base64UrlEncode(headerBytes);
  const encodedPayload = base64UrlEncode(payloadBytes);
  const data = `${encodedHeader}.${encodedPayload}`;
  const keyBuffer = toArrayBuffer(encodeText(secret));
  const key = await crypto.subtle.importKey('raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const dataBuffer = toArrayBuffer(encodeText(data));
  const signature = await crypto.subtle.sign('HMAC', key, dataBuffer);
  return `${data}.${base64UrlEncode(new Uint8Array(signature))}`;
}
async function verifyJwt(token: string, secret: string): Promise<JwtPayload | null> {
  const segments = token.split('.');
  if (segments.length !== 3) return null;
  const [encodedHeader, encodedPayload, encodedSignature] = segments;
  const data = `${encodedHeader}.${encodedPayload}`;
  const keyBuffer = toArrayBuffer(encodeText(secret));
  const key = await crypto.subtle.importKey('raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const signatureBuffer = toArrayBuffer(decodeBase64Url(encodedSignature));
  const dataBuffer = toArrayBuffer(encodeText(data));
  const valid = await crypto.subtle.verify('HMAC', key, signatureBuffer, dataBuffer);
  if (!valid) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(encodedPayload)));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload as JwtPayload;
  } catch (err) {
    console.error('jwt parse failed', err);
    return null;
  }
}
function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(ab).set(bytes)
  return ab
}
async function deriveKey(password: string, pepper: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey('raw', toArrayBuffer(encodeText(password + pepper)), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: toArrayBuffer(salt),
      iterations,
    },
    keyMaterial,
    PBKDF2_LENGTH * 8
  );
  return new Uint8Array(bits);
}
```

## File: worker/src/cache.ts
```typescript
type Entry<T = unknown> = { v: T; exp: number };
const store = new Map<string, Entry>();
export function cacheGet<T = unknown>(key: string): T | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (entry.exp > Date.now()) {
    return entry.v as T;
  }
  store.delete(key);
  return undefined;
}
export function cacheSet<T = unknown>(key: string, value: T, ttlMs = 10_000) {
  store.set(key, { v: value, exp: Date.now() + ttlMs });
}
```

## File: worker/src/dashboard.ts
```typescript
import { HandlerContext } from './types';
import { all } from './db';
import { ensure, nowMs, jsonResponse, etagHex } from './utils';
import { requireRoomMembership } from './access';
import { cacheGet, cacheSet } from './cache';
import { summarizeReadings } from './iot';
type DashboardPayload = {
  messages: Array<{ id: string; body: string; created_at: number; user_id: string; email?: string | null }>;
  tasks: Array<{ id: string; title: string; status: string; assignee_id: string | null; created_at: number }>;
  readings: { summary: Record<string, unknown> | null; readings: Array<{ id: string; device_id: string; t_c: number | null; noise_db: number | null; lux: number | null; created_at: number }> };
  suggestions: Array<{ id: string; kind: string; text: string; created_at: number }>;
  presence: Array<{ user_id: string; email?: string | null; status: string; mood: number | null; energy: number | null; updated_at: number }>;
};
const CACHE_TTL = 10_000;
export async function handleDashboard(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const cacheKey = `dash:${resolvedRoomId}`;
  const cachedEntry = cacheGet<{ etag: string; body: DashboardPayload }>(cacheKey);
  const ifNoneMatch = ctx.request.headers.get('if-none-match');
  if (cachedEntry) {
    if (ifNoneMatch && ifNoneMatch === cachedEntry.etag) {
      return new Response(null, { status: 304, headers: { ETag: cachedEntry.etag } });
    }
    const cachedResponse = jsonResponse(cachedEntry.body, {
      headers: { 'Cache-Control': 'public, max-age=10, stale-while-revalidate=300' },
    });
    cachedResponse.headers.set('ETag', cachedEntry.etag);
    return cachedResponse;
  }
  const since15 = nowMs() - 15 * 60 * 1000;
  const since30 = nowMs() - 30 * 60 * 1000;
  const [messages, tasks, readings, suggestions, presence] = await Promise.all([
    all(ctx.env.DB,
      `SELECT m.id, m.body, m.created_at, m.user_id, u.email
       FROM messages m
       JOIN users u ON u.id = m.user_id
       WHERE m.room_id = ?
       ORDER BY m.created_at DESC
       LIMIT 50`,
      [resolvedRoomId]
    ),
    all(ctx.env.DB,
      `SELECT id, title, status, assignee_id, created_at
       FROM tasks
       WHERE room_id = ?
       ORDER BY created_at DESC`,
      [resolvedRoomId]
    ),
    all(ctx.env.DB,
      `SELECT id, device_id, t_c, noise_db, lux, created_at
       FROM readings
       WHERE room_id = ? AND created_at >= ?
       ORDER BY created_at DESC
       LIMIT 200`,
      [resolvedRoomId, since15]
    ),
    all(ctx.env.DB,
      `SELECT id, kind, text, created_at
       FROM suggestions
       WHERE room_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [resolvedRoomId]
    ),
    all(ctx.env.DB,
      `SELECT p.user_id, u.email, p.status, p.mood, p.energy, p.updated_at
       FROM presence p
       LEFT JOIN users u ON u.id = p.user_id
       WHERE p.room_id = ? AND p.updated_at >= ?
       ORDER BY p.updated_at DESC`,
      [resolvedRoomId, since30]
    ),
  ]);
  const orderedReadings = [...readings].reverse();
  const summary = summarizeReadings(orderedReadings);
  const payload: DashboardPayload = {
    messages: messages.reverse(),
    tasks,
    readings: { summary, readings: orderedReadings },
    suggestions,
    presence,
  };
  const etag = await etagHex(JSON.stringify(payload));
  cacheSet(cacheKey, { etag, body: payload }, CACHE_TTL);
  if (ifNoneMatch && ifNoneMatch === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }
  const response = jsonResponse(payload, {
    headers: { 'Cache-Control': 'public, max-age=10, stale-while-revalidate=300' },
  });
  response.headers.set('ETag', etag);
  return response;
}
```

## File: worker/src/db.ts
```typescript
export async function first<T>(db: D1Database, query: string, bindings: unknown[] = []): Promise<T | null> {
  const result = await db.prepare(query).bind(...bindings).first<T>();
  return (result as T) ?? null;
}
export async function all<T>(db: D1Database, query: string, bindings: unknown[] = []): Promise<T[]> {
  const { results } = await db.prepare(query).bind(...bindings).all<T>();
  return results as T[];
}
export async function run(db: D1Database, query: string, bindings: unknown[] = []) {
  return db.prepare(query).bind(...bindings).run();
}
```

## File: worker/src/index.ts
```typescript
import { Env, Handler, HandlerContext } from './types';
import { allow } from './ratelimit';
import { jsonResponse, errorResponse, HttpError, getIp } from './utils';
import { handleRegister, handleLogin, handleMe, authenticateRequest } from './auth';
import {
  handleListRooms,
  handleGetRoom,
  handleCreateRoom,
  handleJoinRoom,
  handleListMessages,
  handlePostMessage,
  handleListTasks,
  handleCreateTask,
  handleUpdateTask,
  handlePostCheckin,
  handleGetCheckins,
} from './rooms';
import { handleCreateDevice, handleListDevices, handleIngest, handleGetReadings } from './iot';
import { handleGetSuggestions } from './agent';
import { handleDashboard } from './dashboard';
interface Route {
  method: string;
  pattern: string;
  handler: Handler;
  auth?: 'optional' | 'user';
  skipRateLimit?: boolean;
}
const routes: Route[] = [
  { method: 'GET', pattern: '/health', handler: handleHealth, auth: 'optional', skipRateLimit: true },
  { method: 'POST', pattern: '/api/auth/register', handler: handleRegister, auth: 'optional' },
  { method: 'POST', pattern: '/api/auth/login', handler: handleLogin, auth: 'optional' },
  { method: 'GET', pattern: '/api/auth/me', handler: handleMe, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms', handler: handleListRooms, auth: 'optional' },
  { method: 'GET', pattern: '/api/rooms/:roomId', handler: handleGetRoom, auth: 'optional' },
  { method: 'POST', pattern: '/api/rooms', handler: handleCreateRoom, auth: 'user' },
  { method: 'POST', pattern: '/api/rooms/:roomId/join', handler: handleJoinRoom, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/dashboard', handler: handleDashboard, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/messages', handler: handleListMessages, auth: 'user' },
  { method: 'POST', pattern: '/api/rooms/:roomId/messages', handler: handlePostMessage, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/tasks', handler: handleListTasks, auth: 'user' },
  { method: 'POST', pattern: '/api/rooms/:roomId/tasks', handler: handleCreateTask, auth: 'user' },
  { method: 'PUT', pattern: '/api/tasks/:taskId', handler: handleUpdateTask, auth: 'user' },
  { method: 'POST', pattern: '/api/rooms/:roomId/checkins', handler: handlePostCheckin, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/checkins', handler: handleGetCheckins, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/readings', handler: handleGetReadings, auth: 'user' },
  { method: 'GET', pattern: '/api/rooms/:roomId/suggestions', handler: handleGetSuggestions, auth: 'user' },
  { method: 'POST', pattern: '/api/devices', handler: handleCreateDevice, auth: 'user' },
  { method: 'GET', pattern: '/api/devices', handler: handleListDevices, auth: 'user' },
  { method: 'POST', pattern: '/api/iot/ingest', handler: handleIngest, auth: 'optional', skipRateLimit: true },
];
const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,PUT,OPTIONS',
  'access-control-allow-headers': 'content-type,authorization,x-device-secret',
};
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    try {
      const url = new URL(request.url);
      const match = findRoute(request.method, url.pathname);
      if (!match) {
        return withCors(errorResponse('Not Found', 404));
      }
      if (!match.route.skipRateLimit) {
        const ip = getIp(request);
        if (!allow(`rate:${ip}`, 60)) {
          return withCors(errorResponse('Too many requests', 429));
        }
      }
      const user = await authenticateRequest(request, env);
      if (match.route.auth === 'user' && !user) {
        return withCors(errorResponse('Unauthorized', 401));
      }
      const ctxPayload: HandlerContext = {
        env,
        request,
        params: match.params,
        user: user ?? null,
        waitUntil: (promise) => ctx.waitUntil(promise),
      };
      const response = await match.route.handler(ctxPayload);
      return withCors(response);
    } catch (err) {
      if (err instanceof HttpError) {
        return withCors(errorResponse(err.message, err.status, err.details));
      }
      console.error('Unhandled worker error', err);
      return withCors(errorResponse('Internal Error', 500));
    }
  },
};
function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
  return new Response(response.body, { status: response.status, headers });
}
function findRoute(method: string, pathname: string) {
  for (const route of routes) {
    if (route.method !== method) continue;
    const params = matchPath(route.pattern, pathname);
    if (params) {
      return { route, params };
    }
  }
  return null;
}
function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const patternParts = trim(pattern).split('/');
  const pathParts = trim(pathname).split('/');
  if (patternParts.length !== pathParts.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const expected = patternParts[i];
    const actual = pathParts[i];
    if (expected.startsWith(':')) {
      params[expected.slice(1)] = decodeURIComponent(actual);
    } else if (expected !== actual) {
      return null;
    }
  }
  return params;
}
function trim(path: string): string {
  const clean = path.replace(/^\/+|\/+$|\s+/g, '');
  return clean ? clean : '';
}
async function handleHealth(ctx: HandlerContext): Promise<Response> {
  return jsonResponse({ ok: true });
}
```

## File: worker/src/iot.ts
```typescript
import { HandlerContext } from './types';
import { readJson, jsonResponse, ensure, nowMs, sha256Hex, clamp } from './utils';
import { all, first, run } from './db';
import { computeSuggestions } from './agent';
import { requireRoomMembership } from './access';
export async function handleCreateDevice(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');
  const body = await readJson<{ room_id?: string; name?: string; kind?: string }>(ctx.request);
  const roomKey = body.room_id?.trim();
  const name = body.name?.trim() ?? 'Env Beacon';
  ensure(roomKey, 400, 'room_id required');
  const room = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomKey, roomKey]);
  ensure(room, 404, 'Room not found');
  const deviceId = `device_${crypto.randomUUID().split('-')[0]}`;
  const secretPlain = generateSecret();
  const secretHash = await hashDeviceSecret(secretPlain, ctx.env.PEPPER);
  await run(
    ctx.env.DB,
    'INSERT INTO devices (id, room_id, name, kind, secret_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [deviceId, room!.id, name, body.kind ?? 'environment', secretHash, nowMs()]
  );
  return jsonResponse({ device: { id: deviceId, room_id: room!.id, name, kind: body.kind ?? 'environment' }, secret: secretPlain }, { status: 201 });
}
export async function handleListDevices(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');
  const devices = await all<{ id: string; room_id: string; name: string; kind: string; created_at: number }>(
    ctx.env.DB,
    'SELECT id, room_id, name, kind, created_at FROM devices ORDER BY created_at DESC'
  );
  return jsonResponse({ devices });
}
export async function handleIngest(ctx: HandlerContext): Promise<Response> {
  const secret = ctx.request.headers.get('x-device-secret');
  ensure(secret, 401, 'Missing X-Device-Secret');
  const body = await readJson<{ device_id?: string; t_c?: number; noise_db?: number; lux?: number; ts?: number }>(ctx.request);
  const deviceId = body.device_id?.trim();
  ensure(deviceId, 400, 'device_id required');
  const device = await first<{ id: string; room_id: string; secret_hash: string }>(
    ctx.env.DB,
    'SELECT id, room_id, secret_hash FROM devices WHERE id = ?',
    [deviceId]
  );
  ensure(device, 404, 'Device not found');
  const hashed = await hashDeviceSecret(secret!, ctx.env.PEPPER);
  ensure(hashed === device!.secret_hash, 401, 'Invalid device secret');
  const createdAt = Number(body.ts) || nowMs();
  const tC = body.t_c ?? null;
  const noise = body.noise_db ?? null;
  const lux = body.lux ?? null;
  await run(
    ctx.env.DB,
    'INSERT INTO readings (id, device_id, room_id, t_c, noise_db, lux, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [crypto.randomUUID(), device!.id, device!.room_id, tC, noise, lux, createdAt]
  );
  await run(ctx.env.DB, 'DELETE FROM readings WHERE room_id = ? AND created_at < ?', [device!.room_id, nowMs() - 15 * 60 * 1000]);
  ctx.waitUntil(computeSuggestions(ctx.env, device!.room_id));
  return jsonResponse({ stored: true });
}
export async function handleGetReadings(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const url = new URL(ctx.request.url);
  const minutes = clamp(Number(url.searchParams.get('window') ?? '15'), 5, 60);
  const windowStart = nowMs() - minutes * 60 * 1000;
  const readings = await all<{
    id: string;
    device_id: string;
    t_c: number;
    noise_db: number;
    lux: number;
    created_at: number;
  }>(
    ctx.env.DB,
    'SELECT id, device_id, t_c, noise_db, lux, created_at FROM readings WHERE room_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 200',
    [resolvedRoomId, windowStart]
  );
  const ordered = readings.reverse();
  const summary = summarizeReadings(ordered);
  return jsonResponse({ readings: ordered, summary });
}
export function summarizeReadings(readings: Array<{ t_c: number; noise_db: number; lux: number }>) {
  if (!readings.length) return null;
  const sums = readings.reduce(
    (acc, row) => {
      if (typeof row.t_c === 'number') {
        acc.t_c.count += 1;
        acc.t_c.sum += row.t_c;
      }
      if (typeof row.noise_db === 'number') {
        acc.noise.count += 1;
        acc.noise.sum += row.noise_db;
      }
      if (typeof row.lux === 'number') {
        acc.lux.count += 1;
        acc.lux.sum += row.lux;
      }
      return acc;
    },
    {
      t_c: { sum: 0, count: 0 },
      noise: { sum: 0, count: 0 },
      lux: { sum: 0, count: 0 },
    }
  );
  const avg = (sum: number, count: number) => (count ? Number((sum / count).toFixed(1)) : null);
  return {
    avg_t_c: avg(sums.t_c.sum, sums.t_c.count),
    avg_noise_db: avg(sums.noise.sum, sums.noise.count),
    avg_lux: avg(sums.lux.sum, sums.lux.count),
  };
}
function generateSecret(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
async function hashDeviceSecret(secret: string, pepper: string): Promise<string> {
  return sha256Hex(`${secret}${pepper}`);
}
```

## File: worker/src/ratelimit.ts
```typescript
const buckets = new Map<string, { tokens: number; window: number }>();
export function allow(key: string, perMin = 60): boolean {
  const now = Date.now();
  const window = Math.floor(now / 60_000);
  const bucketKey = `${key}:${window}`;
  let bucket = buckets.get(bucketKey);
  if (!bucket || bucket.window !== window) {
    bucket = { tokens: perMin, window };
  }
  if (bucket.tokens <= 0) {
    buckets.set(bucketKey, bucket);
    return false;
  }
  bucket.tokens -= 1;
  buckets.set(bucketKey, bucket);
  return true;
}
```

## File: worker/src/rooms.ts
```typescript
import { HandlerContext } from './types';
import { readJson, jsonResponse, ensure, slugify, randomId, escapeHtml, clamp, nowMs } from './utils';
import { all, first, run } from './db';
import { allow } from './ratelimit';
import { computeSuggestions } from './agent';
import { requireRoomMembership } from './access';
export async function handleListRooms(ctx: HandlerContext): Promise<Response> {
  const rooms = await all<{ id: string; name: string; slug: string; map_seed: string }>(
    ctx.env.DB,
    'SELECT id, name, slug, map_seed FROM rooms ORDER BY created_at ASC'
  );
  return jsonResponse({ rooms });
}
export async function handleGetRoom(ctx: HandlerContext): Promise<Response> {
  const { roomId } = ctx.params;
  const room = await first<{ id: string; name: string; slug: string; map_seed: string }>(
    ctx.env.DB,
    'SELECT id, name, slug, map_seed FROM rooms WHERE id = ? OR slug = ?',
    [roomId, roomId]
  );
  ensure(room, 404, 'Room not found');
  return jsonResponse({ room });
}
export async function handleCreateRoom(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user && ctx.user.role === 'admin', 403, 'Admin only');
  const body = await readJson<{ name?: string; map_seed?: string }>(ctx.request);
  const name = body.name?.trim();
  ensure(name && name.length >= 3, 400, 'Room name required');
  const baseSlug = slugify(name) || `room-${randomId('slug').split('_')[1]}`;
  let slug = baseSlug;
  let attempt = 1;
  while (true) {
    const exists = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE slug = ?', [slug]);
    if (!exists) break;
    slug = `${baseSlug}-${attempt++}`;
  }
  const id = crypto.randomUUID();
  await run(
    ctx.env.DB,
    'INSERT INTO rooms (id, name, slug, map_seed, created_at) VALUES (?, ?, ?, ?, ?)',
    [id, name, slug, body.map_seed ?? null, nowMs()]
  );
  return jsonResponse({ room: { id, name, slug, map_seed: body.map_seed ?? null } }, { status: 201 });
}
export async function handleJoinRoom(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const room = await first<{ id: string }>(ctx.env.DB, 'SELECT id FROM rooms WHERE id = ? OR slug = ?', [roomId, roomId]);
  ensure(room, 404, 'Room not found');
  await run(
    ctx.env.DB,
    'INSERT OR IGNORE INTO room_members (user_id, room_id, joined_at) VALUES (?, ?, ?)',
    [ctx.user!.id, room!.id, nowMs()]
  );
  return jsonResponse({ joined: true });
}
export async function handleListMessages(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const url = new URL(ctx.request.url);
  const cursor = Number(url.searchParams.get('cursor') ?? '0');
  const limit = clamp(Number(url.searchParams.get('limit') ?? '50'), 1, 200);
  const rows = await all<{
    id: string;
    body: string;
    created_at: number;
    user_id: string;
    email: string;
  }>(
    ctx.env.DB,
    `SELECT m.id, m.body, m.created_at, u.id as user_id, u.email
     FROM messages m
     JOIN users u ON u.id = m.user_id
     WHERE m.room_id = ? AND m.created_at < CASE WHEN ? = 0 THEN 9223372036854775807 ELSE ? END
     ORDER BY m.created_at DESC
     LIMIT ?`,
    [resolvedRoomId, cursor, cursor, limit]
  );
  return jsonResponse({
    messages: rows.reverse(),
    nextCursor: rows.length ? rows[0].created_at : null,
  });
}
export async function handlePostMessage(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const body = await readJson<{ body?: string }>(ctx.request, 2 * 1024);
  const message = body.body?.trim();
  ensure(message && message.length, 400, 'Message body required');
  ensure(message.length <= 512, 400, 'Message too long');
  const throttleKey = `msg:${ctx.user!.id}:${resolvedRoomId}`;
  const allowed = allow(throttleKey, 2);
  ensure(allowed, 429, 'Slow down');
  const html = escapeHtml(message);
  const id = crypto.randomUUID();
  const createdAt = nowMs();
  await run(ctx.env.DB, 'INSERT INTO messages (id, room_id, user_id, body, created_at) VALUES (?, ?, ?, ?, ?)', [
    id,
    resolvedRoomId,
    ctx.user!.id,
    html,
    createdAt,
  ]);
  return jsonResponse({ message: { id, body: html, created_at: createdAt } }, { status: 201 });
}
export async function handleListTasks(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const tasks = await all<{
    id: string;
    title: string;
    status: string;
    assignee_id: string | null;
    created_at: number;
  }>(
    ctx.env.DB,
    'SELECT id, title, status, assignee_id, created_at FROM tasks WHERE room_id = ? ORDER BY created_at DESC',
    [resolvedRoomId]
  );
  return jsonResponse({ tasks });
}
export async function handleCreateTask(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const body = await readJson<{ title?: string; assignee_id?: string }>(ctx.request);
  const title = body.title?.trim();
  ensure(title && title.length >= 3, 400, 'Task title required');
  const id = crypto.randomUUID();
  await run(
    ctx.env.DB,
    'INSERT INTO tasks (id, room_id, title, status, assignee_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [id, resolvedRoomId, title, 'todo', body.assignee_id ?? null, nowMs()]
  );
  return jsonResponse({ task: { id, title, status: 'todo', assignee_id: body.assignee_id ?? null } }, { status: 201 });
}
export async function handleUpdateTask(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { taskId } = ctx.params;
  const task = await first<{ id: string; room_id: string }>(ctx.env.DB, 'SELECT id, room_id FROM tasks WHERE id = ?', [taskId]);
  ensure(task, 404, 'Task not found');
  await requireRoomMembership(ctx.env, task!.room_id, ctx.user!.id);
  const body = await readJson<{ status?: string; assignee_id?: string | null }>(ctx.request);
  const status = body.status ?? undefined;
  if (status) {
    ensure(['todo', 'doing', 'done'].includes(status), 400, 'Invalid status');
  }
  await run(
    ctx.env.DB,
    'UPDATE tasks SET status = COALESCE(?, status), assignee_id = ? WHERE id = ?',
    [status ?? null, body.assignee_id ?? null, taskId]
  );
  const updated = await first(ctx.env.DB, 'SELECT id, room_id, title, status, assignee_id FROM tasks WHERE id = ?', [taskId]);
  return jsonResponse({ task: updated });
}
export async function handlePostCheckin(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const body = await readJson<{ mood?: number; energy?: number; status?: string }>(ctx.request);
  const mood = clamp(Number(body.mood ?? 3), 1, 5);
  const energy = clamp(Number(body.energy ?? 3), 1, 5);
  const status = body.status ?? 'focus';
  ensure(['focus', 'solo', 'pair', 'afk'].includes(status), 400, 'Invalid status');
  const id = crypto.randomUUID();
  const createdAt = nowMs();
  await run(
    ctx.env.DB,
    'INSERT INTO checkins (id, user_id, room_id, mood, energy, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, ctx.user!.id, resolvedRoomId, mood, energy, status, createdAt]
  );
  await run(
    ctx.env.DB,
    'INSERT INTO presence (user_id, room_id, status, mood, energy, updated_at) VALUES (?, ?, ?, ?, ?, ?) '
      + 'ON CONFLICT(user_id, room_id) DO UPDATE SET status=excluded.status, mood=excluded.mood, energy=excluded.energy, updated_at=excluded.updated_at',
    [ctx.user!.id, resolvedRoomId, status, mood, energy, createdAt]
  );
  ctx.waitUntil(computeSuggestions(ctx.env, resolvedRoomId));
  return jsonResponse({ ok: true });
}
export async function handleGetCheckins(ctx: HandlerContext): Promise<Response> {
  ensure(ctx.user, 401, 'Unauthorized');
  const { roomId } = ctx.params;
  const resolvedRoomId = await requireRoomMembership(ctx.env, roomId, ctx.user!.id);
  const url = new URL(ctx.request.url);
  const sinceMs = Number(url.searchParams.get('since') ?? 0);
  const windowStart = sinceMs || nowMs() - 30 * 60 * 1000;
  const checkins = await all<{
    id: string;
    user_id: string;
    email?: string | null;
    mood: number;
    energy: number;
    status: string;
    created_at: number;
  }>(
    ctx.env.DB,
    `SELECT c.id, c.user_id, u.email, c.mood, c.energy, c.status, c.created_at
     FROM checkins c
     JOIN users u ON u.id = c.user_id
     WHERE c.room_id = ? AND c.created_at >= ?
     ORDER BY c.created_at DESC`,
    [resolvedRoomId, windowStart]
  );
  return jsonResponse({ checkins });
}
```

## File: worker/src/types.ts
```typescript
export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  PEPPER: string;
  JWT_TTL_MINUTES?: string;
  ZAI_API_KEY?: string;
}
export interface AuthUser {
  id: string;
  email?: string | null;
  role: 'user' | 'admin' | 'anon';
}
export interface HandlerContext {
  env: Env;
  request: Request;
  params: Record<string, string>;
  user: AuthUser | null;
  waitUntil: (promise: Promise<unknown>) => void;
}
export type Handler = (ctx: HandlerContext) => Promise<Response>;
```

## File: worker/src/utils.ts
```typescript
import { Env } from './types';
const encoder = new TextEncoder();
const decoder = new TextDecoder();
export class HttpError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
export function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers,
    },
    status: init.status ?? 200,
  });
}
export function errorResponse(message: string, status = 400, details?: unknown): Response {
  return jsonResponse({ error: message, details }, { status });
}
export async function readJson<T>(request: Request, limit = 32 * 1024): Promise<T> {
  const lengthHeader = request.headers.get('content-length');
  if (lengthHeader && Number(lengthHeader) > limit) {
    throw new HttpError(413, 'Payload too large');
  }
  const buffer = await request.arrayBuffer();
  if (buffer.byteLength > limit) {
    throw new HttpError(413, 'Payload too large');
  }
  if (!buffer.byteLength) {
    return {} as T;
  }
  const text = decoder.decode(buffer);
  if (!text.trim()) {
    return {} as T;
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new HttpError(400, 'Invalid JSON');
  }
}
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
export function nowMs(): number {
  return Date.now();
}
export function randomId(prefix: string): string {
  const fragment = crypto.randomUUID().replace(/-/g, '').slice(0, 8);
  return `${prefix}_${fragment}`;
}
export function getIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for') ||
    'unknown'
  );
}
export async function sha256Hex(input: string): Promise<string> {
  const bytes = encoder.encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return bufferToHex(new Uint8Array(digest));
}
export async function etagHex(value: string): Promise<string> {
  return sha256Hex(value);
}
export function bufferToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
export function base64UrlEncode(data: Uint8Array): string {
  let str = '';
  data.forEach((byte) => {
    str += String.fromCharCode(byte);
  });
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
export function encodeText(input: string): Uint8Array {
  return encoder.encode(input);
}
export function decodeBase64Url(input: string): Uint8Array {
  const padLength = (4 - (input.length % 4)) % 4;
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLength);
  const str = atob(normalized);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i += 1) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
export function minutesToMs(minutes: number): number {
  return minutes * 60 * 1000;
}
export function ensure(condition: unknown, status: number, message: string): asserts condition {
  if (!condition) {
    throw new HttpError(status, message);
  }
}
export function parseNumber(input: string | null, fallback: number): number {
  if (!input) return fallback;
  const parsed = Number(input);
  return Number.isFinite(parsed) ? parsed : fallback;
}
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
export async function fetchJson<T>(request: Request): Promise<T> {
  return readJson<T>(request);
}
export async function getUserRecord(env: Env, id: string) {
  const result = await env.DB.prepare('SELECT id, email, role, created_at FROM users WHERE id = ?').bind(id).first();
  return result as { id: string; email?: string | null; role: 'user' | 'admin' | 'anon'; created_at: number } | null;
}
export function toBase64(bytes: Uint8Array): string {
  if (typeof btoa === 'function') {
    let binary = '';
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Buffer is available in Node (tests)
  return Buffer.from(bytes).toString('base64');
}
export function fromBase64(input: string): Uint8Array {
  if (typeof atob === 'function') {
    const binary = atob(input);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
  const buf = Buffer.from(input, 'base64');
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}
export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}
```

## File: worker/test/test/agent.test.ts
```typescript
import { describe, expect, it } from 'vitest';
import { buildCandidates } from '../src/agent';
describe('agent heuristics', () => {
  it('suggests move when noise high + low energy', () => {
    const readings = [{ noise_db: 70, t_c: 25, lux: 400, created_at: Date.now() }];
    const checkins = [{ user_id: 'u1', energy: 2, mood: 3, status: 'focus', created_at: Date.now() }];
    const suggestions = buildCandidates(readings as any, checkins as any);
    expect(suggestions.some((s) => s.kind === 'move')).toBe(true);
  });
  it('suggests pause when temp high and mood low', () => {
    const readings = [{ noise_db: 50, t_c: 29, lux: 450, created_at: Date.now() }];
    const checkins = [{ user_id: 'u2', energy: 4, mood: 1, status: 'focus', created_at: Date.now() }];
    const suggestions = buildCandidates(readings as any, checkins as any);
    expect(suggestions.some((s) => s.kind === 'pause')).toBe(true);
  });
});
```

## File: worker/test/test/auth.test.ts
```typescript
import { webcrypto } from 'node:crypto';
import { describe, expect, it, beforeAll } from 'vitest';
import { hashPassword, verifyPassword } from '../src/auth';
beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true,
  });
});
describe('auth hashing', () => {
  it('hashes and verifies a password with pepper', async () => {
    const hash = await hashPassword('secret123', 'pepper');
    const valid = await verifyPassword('secret123', 'pepper', hash);
    expect(valid).toBe(true);
  });
  it('fails for wrong password', async () => {
    const hash = await hashPassword('secret123', 'pepper');
    const valid = await verifyPassword('secret124', 'pepper', hash);
    expect(valid).toBe(false);
  });
});
```

## File: worker/tsconfig.json
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src", "test"]
}
```

## File: worker/wrangler.toml
```toml
name = "holo-work-core"
main = "src/index.ts"
compatibility_date = "2025-11-10"

[[d1_databases]]
binding = "DB"
database_name = "holo_work"
database_id = "REPLACE"

[observability]
enabled = true
```

## File: package.json
```json
{
  "name": "holo-work-core",
  "version": "0.1.0",
  "description": "holo.work core: edge-first workspace hub with anonymous rooms, D1-only persistence, and no KV dependencies.",
  "type": "module",
  "main": "worker/src/index.ts",
  "scripts": {
    "dev": "wrangler dev --config worker/wrangler.toml",
    "deploy": "wrangler deploy --config worker/wrangler.toml",
    "typecheck": "tsc --noEmit --project worker/tsconfig.json",
    "test": "vitest run",
    "test:watch": "vitest watch"
  },
  "keywords": [
    "cloudflare",
    "workers",
    "iot",
    "agent",
    "anonymous"
  ],
  "author": "Daniel Alexandre Barcellos de Brito",
  "license": "MIT",
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240208.0",
    "@types/node": "^24.10.0",
    "typescript": "^5.4.0",
    "vitest": "^1.3.1",
    "wrangler": "^4.46.0"
  }
}
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020", "WebWorker"],
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["@cloudflare/workers-types"],
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "."
  },
  "include": ["worker/src", "worker/test"]
}
```
