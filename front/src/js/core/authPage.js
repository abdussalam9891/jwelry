import Auth from '../js/auth.js';

const params = new URLSearchParams(window.location.search);
const token = params.get('token');
const userParam = params.get('user');
const error = params.get('error');

if (token && userParam) {
  try {
    let user;

    try {
      // Try single decode
      user = JSON.parse(decodeURIComponent(userParam));
    } catch {
      // Fallback: double decode (your current case)
      user = JSON.parse(decodeURIComponent(decodeURIComponent(userParam)));
    }

    Auth.save(token, user);

    window.history.replaceState({}, '', window.location.pathname);
    window.location.href = '/';

  } catch (err) {
    console.error('Invalid user data from Google', err);
  }
}

if (error) {
  console.error('Google login failed');
}

document.getElementById('google-btn')?.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/api/v1/auth/google';
});
