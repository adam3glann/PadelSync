// Get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Get user object from localStorage
function getUser() {
  try {
    var u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  } catch (e) {
    localStorage.removeItem("user");
    return null;
  }
}

// Save login data (token + user) to localStorage
function saveAuth(data) {
  if (!data || !data.token || !data.user) return;
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

// Escape a string for safe insertion into innerHTML
function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

// Check whether the stored JWT has expired (without trusting it).
function isTokenExpired(token) {
  try {
    var payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (!payload || typeof payload.exp !== "number") return false;
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return false;
  }
}

// Apply the saved colour theme. Dark is the default theme.
function applyTheme(theme) {
  theme = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  if (localStorage.getItem("padelsync_theme") !== theme) {
    localStorage.setItem("padelsync_theme", theme);
  }
}

function toggleTheme() {
  var current = document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
  updateThemeButton();
}

function renderThemeButton() {
  return '<button type="button" class="theme-toggle" onclick="auth.toggleTheme()" aria-label="Change colour theme"><span class="theme-icon"></span><span class="theme-label"></span></button>';
}

function updateThemeButton() {
  var button = document.querySelector(".theme-toggle");
  if (!button) return;
  var isLight = document.documentElement.getAttribute("data-theme") === "light";
  button.querySelector(".theme-icon").textContent = isLight ? "☾" : "☀";
  button.querySelector(".theme-label").textContent = isLight ? "Dark" : "Light";
}

// Check if we are inside admin/ or member/ subfolder
function isInSubdir() {
  var path = window.location.pathname;
  return path.indexOf("/admin/") !== -1 || path.indexOf("/member/") !== -1;
}

// Get the path to login.html based on current location
function getLoginPath() {
  return isInSubdir() ? "../login.html" : "login.html";
}

// Logout: clear localStorage and go to login
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = getLoginPath();
}

// Check if user is logged in and has the right role
function checkAuth(requiredRole) {
  var token = getToken();
  var user = getUser();
  if (!token || !user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = getLoginPath();
    return;
  }
  if (isTokenExpired(token)) {
    logout();
    return;
  }
  if (requiredRole && user.role !== requiredRole) {
    // Send the user to the dashboard that matches the account role.
    var base = isInSubdir() ? "../" : "";
    window.location.href =
      base +
      (user.role === "admin"
        ? "admin/dashboard.html"
        : "member/dashboard.html");
    return;
  }
}

// Show a toast notification
function showToast(message, type) {
  type = type || "success";
  var container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  var toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(function () {
    toast.remove();
  }, 3000);
}

// Show a confirmation modal
function showModal(title, message, onConfirm) {
  var overlay = document.getElementById("modal-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    overlay.className = "modal-overlay";
    overlay.innerHTML =
      '<div class="modal"><h3 id="modal-title"></h3><div id="modal-message" class="mt-1"></div><div class="modal-actions"><button class="btn btn-outline" id="modal-cancel">Cancel</button><button class="btn btn-primary" id="modal-confirm">Confirm</button></div></div>';
    document.body.appendChild(overlay);
  }

  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-message").innerHTML = message;

  // Replace buttons to remove old event listeners
  var cancelBtn = document.getElementById("modal-cancel");
  var confirmBtn = document.getElementById("modal-confirm");
  var newCancel = cancelBtn.cloneNode(true);
  cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
  var newConfirm = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);

  document
    .getElementById("modal-cancel")
    .addEventListener("click", function () {
      overlay.classList.remove("active");
    });
  document
    .getElementById("modal-confirm")
    .addEventListener("click", function () {
      // A callback can return false to keep the modal open after a validation error.
      var closeModal = !onConfirm || onConfirm() !== false;
      if (closeModal) overlay.classList.remove("active");
    });

  overlay.classList.add("active");
}

// Confirm-and-cancel a booking (shared by the member dashboard and the
// reservations list, which otherwise duplicated this exact flow).
function confirmCancelBooking(id, onSuccess) {
  var title = window.i18n
    ? window.i18n.t("modal.cancelBooking")
    : "Cancel Booking";
  var msg = window.i18n
    ? window.i18n.t("modal.cancelBookingMsg")
    : "Are you sure you want to cancel this reservation?";
  showModal(title, msg, async function () {
    var result = await db.cancelSlot(id);
    if (!result.ok) {
      showToast(result.message, "error");
      return;
    }
    showToast(result.message);
    if (onSuccess) onSuccess();
  });
}

// Add hamburger mobile menu (idempotent, safe to call after nav is rebuilt)
function initHamburger() {
  var navLinks = document.querySelector(".nav-links");
  if (!navLinks) return;

  var closeMenu = function () {
    var hamburger = document.querySelector(".hamburger");
    var overlay = document.querySelector(".nav-overlay");
    if (hamburger) hamburger.classList.remove("active");
    navLinks.classList.remove("open");
    if (overlay) overlay.classList.remove("active");
  };

  var hamburger = document.querySelector(".hamburger");
  if (!hamburger) {
    hamburger = document.createElement("button");
    hamburger.className = "hamburger";
    hamburger.setAttribute("aria-label", "Menu");
    hamburger.innerHTML = "<span></span><span></span><span></span>";

    var overlay = document.createElement("div");
    overlay.className = "nav-overlay";

    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", closeMenu);

    var brand = document.querySelector(".navbar .container");
    if (brand) brand.appendChild(hamburger);
    document.body.appendChild(overlay);
  }

  // Rebind close-on-link for any (rebuilt) nav links.
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
}

// Expose auth functions globally
window.auth = {
  getToken: getToken,
  getUser: getUser,
  saveAuth: saveAuth,
  logout: logout,
  checkAuth: checkAuth,
  showToast: showToast,
  showModal: showModal,
  confirmCancelBooking: confirmCancelBooking,
  toggleTheme: toggleTheme,
  renderThemeButton: renderThemeButton,
  initHamburger: initHamburger,
};

window.escapeHtml = escapeHtml;

// Set the theme as early as possible to avoid a visible colour flash.
applyTheme(localStorage.getItem("padelsync_theme") || "dark");

// Add hamburger mobile menu and theme button on page load
document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelector(".nav-links");
  if (links && !links.querySelector(".theme-toggle"))
    links.insertAdjacentHTML("afterbegin", renderThemeButton());
  updateThemeButton();
  initHamburger();
});
