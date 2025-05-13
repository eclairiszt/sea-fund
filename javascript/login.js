const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

const admins = [
  { username: 'king', email: 'kingaustria314@gmail.com' },
  { username: 'mika', email: 'mkla.qns@gmail.com' }
];

function isAdmin(user, mail) {
  return admins.some(
    admin =>
      admin.username.toLowerCase().trim() === user.toLowerCase().trim() &&
      admin.email.toLowerCase().trim() === mail.toLowerCase().trim()
  );
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isLogin = document.querySelector('h2')?.innerText.toLowerCase().includes('log in');

  if (isLogin) {
    await handleLogin();
  }
});

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function setError(input, message) {
  const inputBox = input.parentElement;
  const errorDiv = inputBox.querySelector('.error');
  errorDiv.innerText = message;
  inputBox.classList.add('error');
  inputBox.classList.remove('success');
}

async function handleLogin() {
  const inputUsername = username.value.trim();
  const inputEmail = email.value.trim();
  const inputPassword = password.value.trim();

  const isAdminUser = isAdmin(inputUsername, inputEmail);
  const adminPassword = 'D3v3r1ck';

  //transfer to admin page
  if (isAdminUser && inputPassword === adminPassword) {
    alert('Admin login successful!');
    window.location.href = 'admin-page.html';
    return;
  }

  const storedUsername = localStorage.getItem('username');
  const storedEmail = localStorage.getItem('email');
  const storedHash = localStorage.getItem('passwordHash');
  const inputHash = await hashPassword(inputPassword);

  const isValidUser =
    inputUsername === storedUsername &&
    inputEmail === storedEmail &&
    inputHash === storedHash;

  if (isValidUser) {
    alert('Login successful!');
    window.location.href = 'index.html';
  } else {
    setError(password, 'Incorrect credentials');
  }
}