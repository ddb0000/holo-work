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
