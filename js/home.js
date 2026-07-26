// Update the home page navbar and CTA button based on login status
document.addEventListener('DOMContentLoaded', function () {
  var user = auth.getUser();
  var ctaContainer = document.getElementById('cta-container');
  var navLinks = document.querySelector('.nav-links');

  if (user) {
    // If logged in, show dashboard link and logout button
    var dashLink = user.role === 'admin' ? 'admin/dashboard.html' : 'member/dashboard.html';
    navLinks.innerHTML =
      auth.renderThemeButton() +
      '<a href="' + dashLink + '" data-i18n="nav.dashboard">Dashboard</a>' +
      '<a href="#" onclick="auth.logout()" data-i18n="nav.logout">Logout</a>';

    // Show "Go to Dashboard" button in hero
    ctaContainer.innerHTML = '<a href="' + dashLink + '" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2.5rem;" data-i18n="hero.goDashboard">Go to Dashboard</a>';
  } else {
    // If not logged in, show register and login buttons
    ctaContainer.innerHTML =
      '<a href="register.html" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2.5rem; margin-right: 1rem;" data-i18n="hero.getStarted">Get Started</a>' +
      '<a href="login.html" class="btn btn-outline" style="font-size: 1.1rem; padding: 1rem 2.5rem;" data-i18n="hero.login">Login</a>';
  }

  // The navigation is rebuilt above, so refresh the light/dark button label.
  if (auth.toggleTheme) {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    var themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
      themeButton.querySelector('.theme-icon').textContent = isLight ? '☾' : '☀';
      themeButton.querySelector('.theme-label').textContent = isLight ? 'Dark' : 'Light';
    }
  }
});
