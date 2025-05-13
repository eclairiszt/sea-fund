const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

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
  } else {
    await handleRegistration();
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

function setSuccess(input) {
  const inputBox = input.parentElement;
  const errorDiv = inputBox.querySelector('.error');
  errorDiv.innerText = '';
  inputBox.classList.add('success');
  inputBox.classList.remove('error');
}

async function handleLogin() {
  const inputUsername = username.value.trim();
  const inputEmail = email.value.trim();
  const inputPassword = password.value.trim();

  const isAdminUser = isAdmin(inputUsername, inputEmail);
  const adminPassword = 'D3v3r1ck';

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

async function handleRegistration() {
  let isValid = true;

  const trimmedUsername = username.value.trim();
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();
  const confirmPassword = password2?.value.trim();

  if (trimmedUsername === '') {
    setError(username, 'Username is required');
    isValid = false;
  } else if (isAdmin(trimmedUsername, trimmedEmail)) {
    setError(username, 'This username is reserved for an admin.');
    isValid = false;
  } else {
    setSuccess(username);
  }

  if (trimmedEmail === '') {
    setError(email, 'Email is required');
    isValid = false;
  } else if (isAdmin(trimmedUsername, trimmedEmail)) {
    setError(email, 'This email is reserved for an admin.');
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (trimmedPassword.length < 8) {
    setError(password, 'Password must be at least 8 characters');
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (!confirmPassword || confirmPassword !== trimmedPassword) {
    setError(password2, 'Passwords do not match');
    isValid = false;
  } else {
    setSuccess(password2);
  }

  if (isValid) {
    const hashedPassword = await hashPassword(trimmedPassword);
    localStorage.setItem('username', trimmedUsername);
    localStorage.setItem('email', trimmedEmail);
    localStorage.setItem('passwordHash', hashedPassword);

    alert('Registration successful!');
    window.location.href = 'index.html';
  }
}

