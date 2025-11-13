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
