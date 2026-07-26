// Validate a single input field against a list of rules
function validateField(input, rules) {
  var value = input.value.trim();

  // Remove any existing error message
  var errorEl = input.parentElement.querySelector('.field-error');
  if (errorEl) errorEl.remove();
  input.style.borderColor = '';

  // Check each rule one by one
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];

    if (rule.required && !value) {
      showFieldError(input, rule.getMessage());
      return false;
    }
    if (rule.minLength && value.length < rule.minLength) {
      showFieldError(input, rule.getMessage());
      return false;
    }
    if (rule.maxLength && value.length > rule.maxLength) {
      showFieldError(input, rule.getMessage());
      return false;
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      showFieldError(input, rule.getMessage());
      return false;
    }
    if (rule.custom && !rule.custom(value)) {
      showFieldError(input, rule.getMessage());
      return false;
    }
  }

  // Show green border if all rules pass
  input.style.borderColor = 'rgba(46, 213, 115, 0.5)';
  return true;
}

// Show an error message below an input field
function showFieldError(input, message) {
  var previousError = input.parentElement.querySelector('.field-error');
  if (previousError) previousError.remove();
  input.style.borderColor = 'rgba(255, 71, 87, 0.6)';
  var error = document.createElement('span');
  error.className = 'field-error';
  error.textContent = message;
  input.parentElement.appendChild(error);
}

// Validate an entire form by checking each field against its rules
function validateForm(form, rulesMap) {
  var valid = true;
  var fields = Object.keys(rulesMap);
  for (var i = 0; i < fields.length; i++) {
    var name = fields[i];
    var rules = rulesMap[name];
    var input = form.querySelector('[name="' + name + '"], #' + name);
    if (input && !validateField(input, rules)) {
      valid = false;
    }
  }
  return valid;
}

// Helper to get a translated message
function _vmsg(key) {
  return (window.i18n && window.i18n.t) ? window.i18n.t(key) : key;
}

// Validation rules for each type of field
var validationRules = {
  name: [
    { required: true, getMessage: function () { return _vmsg('val.nameRequired'); } },
    { minLength: 2, getMessage: function () { return _vmsg('val.nameMin'); } },
    { pattern: /^[a-zA-Z\u0600-\u06FF\s]+$/, getMessage: function () { return _vmsg('val.namePattern'); } }
  ],
  email: [
    { required: true, getMessage: function () { return _vmsg('val.emailRequired'); } },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, getMessage: function () { return _vmsg('val.emailInvalid'); } }
  ],
  password: [
    { required: true, getMessage: function () { return _vmsg('val.passwordRequired'); } },
    { minLength: 6, getMessage: function () { return _vmsg('val.passwordMin'); } },
    { custom: function (v) { return /\d/.test(v); }, getMessage: function () { return _vmsg('val.passwordNumber'); } }
  ],
  confirmPassword: [
    { required: true, getMessage: function () { return _vmsg('val.confirmRequired'); } }
  ],
  'court-name': [
    { required: true, getMessage: function () { return _vmsg('val.courtNameRequired'); } },
    { minLength: 2, getMessage: function () { return _vmsg('val.courtNameMin'); } },
    { maxLength: 30, getMessage: function () { return _vmsg('val.courtNameMax'); } },
    { pattern: /^[a-zA-Z0-9\u0600-\u06FF\s\-]+$/, getMessage: function () { return _vmsg('val.courtNamePattern'); } }
  ]
};

// Make these functions available globally
window.validateField = validateField;
window.validateForm = validateForm;
window.validationRules = validationRules;
