// Redirect to dashboard if already logged in
var _user = auth.getUser();
if (_user && _user.role && auth.getToken()) {
  window.location.href = _user.role === 'admin' ? 'admin/dashboard.html' : 'member/dashboard.html';
}
document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('loginForm');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var showPassword = document.getElementById('show-login-password');

  var loginCard = document.getElementById('loginCard');
  var resetCard = document.getElementById('resetCard');
  var loginHeader = document.getElementById('loginHeader');
  var resetHeader = document.getElementById('resetHeader');
  var showResetBtn = document.getElementById('showResetBtn');
  var showLoginBtn = document.getElementById('showLoginBtn');

  var resetForm = document.getElementById('resetForm');
  var resetEmail = document.getElementById('resetEmail');
  var resetPassword = document.getElementById('resetPassword');
  var showResetPassword = document.getElementById('show-reset-password');

  showPassword.addEventListener('change', function () {
    passwordInput.type = showPassword.checked ? 'text' : 'password';
  });

  showResetPassword.addEventListener('change', function () {
    resetPassword.type = showResetPassword.checked ? 'text' : 'password';
  });

  showResetBtn.addEventListener('click', function (e) {
    e.preventDefault();
    loginCard.style.display = 'none';
    loginHeader.style.display = 'none';
    resetCard.style.display = 'block';
    resetHeader.style.display = 'block';
  });

  showLoginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    resetCard.style.display = 'none';
    resetHeader.style.display = 'none';
    loginCard.style.display = 'block';
    loginHeader.style.display = 'block';
  });

  // Validate fields when user leaves them
  emailInput.addEventListener('blur', function () {
    validateField(emailInput, validationRules.email);
  });
  resetEmail.addEventListener('blur', function () {
    validateField(resetEmail, validationRules.email);
  });
  resetPassword.addEventListener('blur', function () {
    validateField(resetPassword, validationRules.password);
  });

  // Clear error styling when user types
  emailInput.addEventListener('input', function () {
    emailInput.style.borderColor = '';
  });
  passwordInput.addEventListener('input', function () {
    passwordInput.style.borderColor = '';
  });
  resetEmail.addEventListener('input', function () {
    resetEmail.style.borderColor = '';
  });
  resetPassword.addEventListener('input', function () {
    resetPassword.style.borderColor = '';
  });

  // Handle form submission
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validate both fields before submitting
    if (!validateForm(loginForm, { email: validationRules.email, password: validationRules.password })) return;

    // Disable the button and show loading text
    var btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.textContent = window.i18n ? window.i18n.t('auth.signingIn') : 'Signing in...';

    // Try to log in
    var result = await db.login(emailInput.value.trim(), passwordInput.value);
    if (!result.ok) {
      auth.showToast(result.message, 'error');
      btn.disabled = false;
      btn.textContent = window.i18n ? window.i18n.t('auth.signIn') : 'Sign In';
      return;
    }

    // Save login data and redirect
    auth.saveAuth(result.data);
    auth.showToast(window.i18n ? window.i18n.t('toast.signedIn') : 'Signed in successfully');
    setTimeout(function () {
      window.location.href = result.data.user.role === 'admin' ? 'admin/dashboard.html' : 'member/dashboard.html';
    }, 800);
  });

  // Handle reset form submission
  resetForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm(resetForm, { resetEmail: validationRules.email, resetPassword: validationRules.password })) return;

    auth.showToast('For security, change your password from Settings after signing in.', 'error');
  });
});
