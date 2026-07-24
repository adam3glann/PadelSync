// Get token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Get user object from localStorage
function getUser() {
  try {
    var u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  } catch (e) {
    localStorage.removeItem('user');
    return null;
  }
}

// Save login data (token + user) to localStorage
function saveAuth(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
}

// Apply the saved colour theme. Dark is the default theme.
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('padelsync_theme', theme);
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
  updateThemeButton();
}

function renderThemeButton() {
  return '<button type="button" class="theme-toggle" onclick="auth.toggleTheme()" aria-label="Change colour theme"><span class="theme-icon"></span><span class="theme-label"></span></button>';
}

function updateThemeButton() {
  var button = document.querySelector('.theme-toggle');
  if (!button) return;
  var isLight = document.documentElement.getAttribute('data-theme') === 'light';
  button.querySelector('.theme-icon').textContent = isLight ? '☾' : '☀';
  button.querySelector('.theme-label').textContent = isLight ? 'Dark' : 'Light';
}

// Check if we are inside admin/ or member/ subfolder
function isInSubdir() {
  var path = window.location.pathname;
  return path.indexOf('/admin/') !== -1 || path.indexOf('/member/') !== -1;
}

// Get the path to login.html based on current location
function getLoginPath() {
  return isInSubdir() ? '../login.html' : 'login.html';
}

// Logout: clear localStorage and go to login
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = getLoginPath();
}

// Return empty headers (placeholder for future use)
function authHeaders() {
  return {};
}

// Check if user is logged in and has the right role
function checkAuth(requiredRole) {
  var token = getToken();
  var user = getUser();
  // Confirm that the saved session still belongs to a real account.
  var storedUser = (window.db && user) ? db.getUser(user.id) : null;
  var validToken = user && token === 'fake_token_' + user.id;
  if (!token || !user || !storedUser || storedUser.role !== user.role || !validToken) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = getLoginPath();
    return;
  }
  if (requiredRole && user.role !== requiredRole) {
    // Send the user to the dashboard that matches the account role.
    // Redirecting to dashboard.html here would keep a member on an admin page.
    var base = isInSubdir() ? '../' : '';
    window.location.href = base + (user.role === 'admin' ? 'admin/dashboard.html' : 'member/dashboard.html');
    return;
  }
}

// Show a toast notification
function showToast(message, type) {
  type = type || 'success';
  var container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  var toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3000);
}

// Show a confirmation modal
function showModal(title, message, onConfirm) {
  var overlay = document.getElementById('modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal"><h3 id="modal-title"></h3><div id="modal-message" class="mt-1"></div><div class="modal-actions"><button class="btn btn-outline" id="modal-cancel">Cancel</button><button class="btn btn-primary" id="modal-confirm">Confirm</button></div></div>';
    document.body.appendChild(overlay);
  }

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-message').innerHTML = message;

  // Replace buttons to remove old event listeners
  var cancelBtn = document.getElementById('modal-cancel');
  var confirmBtn = document.getElementById('modal-confirm');
  var newCancel = cancelBtn.cloneNode(true);
  cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
  var newConfirm = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);

  document.getElementById('modal-cancel').addEventListener('click', function() {
    overlay.classList.remove('active');
  });
  document.getElementById('modal-confirm').addEventListener('click', function() {
    // A callback can return false to keep the modal open after a validation error.
    var closeModal = !onConfirm || onConfirm() !== false;
    if (closeModal) overlay.classList.remove('active');
  });

  overlay.classList.add('active');
}

// Expose auth functions globally
window.auth = {
  getToken: getToken,
  getUser: getUser,
  saveAuth: saveAuth,
  logout: logout,
  authHeaders: authHeaders,
  checkAuth: checkAuth,
  showToast: showToast,
  showModal: showModal,
  toggleTheme: toggleTheme,
  renderThemeButton: renderThemeButton
};

// Set the theme as early as possible to avoid a visible colour flash.
applyTheme(localStorage.getItem('padelsync_theme') || 'dark');

// Add hamburger mobile menu on page load
document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelector('.nav-links');
  if (links && !links.querySelector('.theme-toggle')) links.insertAdjacentHTML('afterbegin', renderThemeButton());
  updateThemeButton();

  var navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  if (navLinks.querySelector('.hamburger')) return;

  // Create hamburger button
  var hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.setAttribute('aria-label', 'Menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  // Create overlay for closing menu when clicking outside
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  // Close menu when clicking the overlay
  overlay.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
  });

  // Close menu when clicking any nav link
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
    });
  });

  var brand = document.querySelector('.navbar .container');
  if (brand) brand.appendChild(hamburger);
  document.body.appendChild(overlay);
});
