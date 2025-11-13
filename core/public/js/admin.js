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
