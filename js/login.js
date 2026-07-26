// Redirect to dashboard if already logged in
var _user = auth.getUser();
if (_user && _user.role) {
  window.location.href = _user.role === 'admin' ? 'admin/dashboard.html' : 'member/dashboard.html';
}

document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('loginForm');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var showPassword = document.getElementById('show-login-password');

  showPassword.addEventListener('change', function () {
    passwordInput.type = showPassword.checked ? 'text' : 'password';
  });

  // Validate fields when user leaves them
  emailInput.addEventListener('blur', function () {
    validateField(emailInput, validationRules.email);
  });
  // Clear error styling when user types
  emailInput.addEventListener('input', function () {
    emailInput.style.borderColor = '';
  });
  passwordInput.addEventListener('input', function () {
    passwordInput.style.borderColor = '';
  });


  // Handle form submission
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate both fields before submitting
    if (!validateForm(loginForm, { email: validationRules.email, password: validationRules.password })) return;

    // Disable the button and show loading text
    var btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.textContent = window.i18n ? window.i18n.t('auth.signingIn') : 'Signing in...';

    // Try to log in
    var result = db.login(emailInput.value.trim(), passwordInput.value);
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
});
