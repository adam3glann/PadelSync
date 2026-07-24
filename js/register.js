// Redirect to dashboard if already logged in
var _user = auth.getUser();
if (_user && _user.role) {
  window.location.href = _user.role === 'admin' ? 'admin/dashboard.html' : 'member/dashboard.html';
}

document.addEventListener('DOMContentLoaded', function() {
  var registerForm = document.getElementById('registerForm');
  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var confirmInput = document.getElementById('confirmPassword');

  // Validate fields when the user leaves them
  nameInput.addEventListener('blur', function() {
    validateField(nameInput, validationRules.name);
  });
  emailInput.addEventListener('blur', function() {
    validateField(emailInput, validationRules.email);
  });
  passwordInput.addEventListener('blur', function() {
    validateField(passwordInput, validationRules.password);
  });
  confirmInput.addEventListener('blur', function() {
    if (!confirmInput.value.trim()) {
      showFieldError(confirmInput, _vmsg('val.confirmRequired'));
    } else if (confirmInput.value !== passwordInput.value) {
      showFieldError(confirmInput, 'Passwords do not match');
    }
  });

  // Clear errors when user starts typing
  var allInputs = [nameInput, emailInput, passwordInput, confirmInput];
  for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('input', function() {
      this.style.borderColor = '';
      var err = this.parentElement.querySelector('.field-error');
      if (err) err.remove();
    });
  }

  // Handle form submission
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    if (!validateForm(registerForm, {
      name: validationRules.name,
      email: validationRules.email,
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword
    })) return;

    // Make sure passwords match
    if (passwordInput.value !== confirmInput.value) {
      showFieldError(confirmInput, 'Passwords do not match');
      return;
    }

    // Disable button and show loading text
    var btn = document.getElementById('regBtn');
    btn.disabled = true;
    btn.textContent = window.i18n ? window.i18n.t('auth.creatingAccount') : 'Creating account...';

    // Try to register
    var result = db.register(nameInput.value.trim(), emailInput.value.trim(), passwordInput.value);
    if (!result.ok) {
      auth.showToast(result.message, 'error');
      btn.disabled = false;
      btn.textContent = window.i18n ? window.i18n.t('auth.createAccount') : 'Create Account';
      return;
    }

    // Save login data and go to member dashboard
    auth.saveAuth(result.data);
    auth.showToast(window.i18n ? window.i18n.t('toast.accountCreated') : 'Account created!');
    setTimeout(function() {
      window.location.href = 'member/dashboard.html';
    }, 800);
  });
});
