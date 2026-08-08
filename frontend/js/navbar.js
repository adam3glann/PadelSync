(function () {
  function getPageName() {
    var parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function isAdminArea() {
    return window.location.pathname.indexOf("/admin/") !== -1;
  }

  function isMemberArea() {
    return window.location.pathname.indexOf("/member/") !== -1;
  }

  function link(href, i18nKey, text, page) {
    var active = page === href ? ' class="active"' : "";
    return (
      '<a href="' +
      href +
      '"' +
      active +
      ' data-i18n="' +
      i18nKey +
      '">' +
      text +
      "</a>"
    );
  }

  function logoutLink() {
    return (
      '<a href="#" onclick="auth.logout()" class="btn btn-outline" data-i18n="nav.logout">Logout</a>'
    );
  }

  function render() {
    var mount = document.getElementById("navbar");
    if (!mount) return;

    var page = getPageName();
    var isAdmin = isAdminArea();
    var isMember = isMemberArea();
    var brandHref = isAdmin || isMember ? "dashboard.html" : "index.html";
    var linksHtml = "";
    var logoutHtml = "";
    var adminBadge = "";

    if (isAdmin) {
      mount.style.borderBottomColor = "#005bc5";
      adminBadge =
        ' <span class="badge badge-admin" data-i18n="nav.admin">Admin</span>';
      linksHtml =
        link("dashboard.html", "nav.dashboard", "Dashboard", page) +
        link("courts.html", "nav.courts", "Courts", page) +
        link("bookings.html", "nav.bookings", "Bookings", page) +
        link("users.html", "nav.users", "Users", page);
      logoutHtml = logoutLink();
    } else if (isMember) {
      linksHtml =
        link("dashboard.html", "nav.dashboard", "Dashboard", page) +
        link("book.html", "nav.bookCourt", "Book Court", page) +
        link("reservations.html", "nav.reservations", "Reservations", page) +
        link("settings.html", "nav.settings", "Settings", page);
      logoutHtml = logoutLink();
    } else if (page !== "404.html") {
      linksHtml =
        link("login.html", "nav.login", "Login", page) +
        link("register.html", "nav.register", "Register", page);
    }

    var navLinks =
      linksHtml || logoutHtml
        ? '<div class="nav-links">' + linksHtml + logoutHtml + "</div>"
        : "";

    mount.innerHTML =
      '<div class="container d-flex justify-between align-center">' +
      '<a href="' +
      brandHref +
      '" class="navbar-brand">PadelSync<span class="ball"></span>' +
      adminBadge +
      "</a>" +
      navLinks +
      "</div>";
  }

  render();
})();
