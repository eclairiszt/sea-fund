const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Checks login or sign up
  const isLogin = document.querySelector('h2')?.innerText.toLowerCase().includes('log in');

  if (isLogin) {
    await handleLogin();
  } else {
    await handleRegistration();
  }
});

// Shared utility
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

async function handleRegistration() {
  let isValid = true;

  if (username.value.trim() === '') {
    setError(username, 'Username is required');
   isValid = false;
  } else {
  setSuccess(username);
  }

  if (email.value.trim() === '') {
   setError(email, 'Email is required');
   isValid = false;
  } else {
   setSuccess(email);
  }

  if (password.value.trim().length < 8) {
    setError(password, 'Password must be at least 8 characters');
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (isValid) {
    const hashedPassword = await hashPassword(password.value.trim());
    localStorage.setItem('username', username.value.trim());
    localStorage.setItem('email', email.value.trim());
    localStorage.setItem('passwordHash', hashedPassword);

    form.submit();
  }
}

async function handleLogin() {
  const storedUsername = localStorage.getItem('username');
  const storedEmail = localStorage.getItem('email');
  const storedHash = localStorage.getItem('passwordHash');

  const inputUsername = username.value.trim();
  const inputEmail = email.value.trim();
  const inputPassword = password.value.trim();
  const inputHash = await hashPassword(inputPassword);

  if (
  inputUsername === storedUsername &&
  inputEmail === storedEmail &&
  inputHash === storedHash
  ) {
  alert(' Login successful!');
  form.submit();
  } else {
  setError(password, 'Incorrect credentials');
  }
}