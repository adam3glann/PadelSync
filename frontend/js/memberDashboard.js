// Load member dashboard when page is ready
document.addEventListener("DOMContentLoaded", function () {
  auth.checkAuth("member");

  // Show welcome message with user's name
  var user = auth.getUser();
  if (user) {
    var welcomeText =
      (window.i18n ? window.i18n.t("dash.welcomeBack") : "Welcome back") +
      ', <span class="gradient-text">' +
      escapeHtml(user.fullName || user.name || "") +
      "</span>!";
    document.getElementById("welcome-msg").innerHTML = welcomeText;
  }

  fetchDashboardData();
});

// Fetch and display dashboard stats and upcoming bookings
async function fetchDashboardData() {
  try {
    // Show count of active courts
    var courts = (await db.getCourts(1, 50)).data;
    var activeCourts = 0;
    for (var i = 0; i < courts.length; i++) {
      if (courts[i].status === "active") activeCourts++;
    }
    document.getElementById("courts-count").textContent = activeCourts;

    // Show count of upcoming bookings
    var user = auth.getUser();
    var bookings = (await db.getMyBookings(1, 50)).data;
    var now = new Date();
    var today =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0");
    var upcoming = [];
    for (var j = 0; j < bookings.length; j++) {
      if (bookings[j].date >= today) upcoming.push(bookings[j]);
    }
    document.getElementById("upcoming-count").textContent = upcoming.length;

    // Show up to 3 next upcoming bookings
    renderUpcoming(upcoming.slice(0, 3));
  } catch (error) {
    auth.showToast("Failed to load dashboard data", "error");
  }
}

// Render the upcoming bookings list
function renderUpcoming(bookings) {
  var list = document.getElementById("upcoming-list");

  if (bookings.length === 0) {
    list.innerHTML =
      '<div class="card" style="grid-column: 1 / -1; text-align: center;">' +
      '<p style="color: var(--text-muted);">' +
      (window.i18n
        ? window.i18n.t("dash.noUpcoming")
        : "No upcoming reservations.") +
      "</p>" +
      '<a href="book.html" class="btn btn-primary mt-1">' +
      (window.i18n ? window.i18n.t("dash.bookACourt") : "Book a Court") +
      "</a>" +
      "</div>";
    return;
  }

  var html = "";
  for (var i = 0; i < bookings.length; i++) {
    var b = bookings[i];
    var gearLabel = window.i18n ? window.i18n.t("res.gear") : "Gear:";
    var cancelLabel = window.i18n ? window.i18n.t("bookings.cancel") : "Cancel";

    var equipDisplay = "";
    if (b.equipment && b.equipment !== "None") {
      equipDisplay =
        '<p style="font-size:0.85rem;margin-top:0.5rem;"><span style="color:var(--text-muted);">' +
        gearLabel +
        "</span> " +
        b.equipment +
        "</p>";
    }

    var paymentDisplay = "";
    if (b.depositAmount) {
      paymentDisplay =
        '<p style="font-size:0.85rem;margin-top:0.5rem;"><span style="color:var(--text-muted);">Deposit paid:</span> EGP ' +
        b.depositAmount +
        ' <br><span style="color:var(--text-muted);">Cash due at court:</span> EGP ' +
        b.cashAmount +
        "</p>";
    }

    html +=
      '<div><div class="ticket-card">' +
      '<div class="ticket-main">' +
      '<div class="ticket-title">' +
      escapeHtml(b.court ? b.court.name : "Court unavailable") +
      "</div>" +
      '<div class="ticket-datetime">' +
      b.date +
      " &mdash; " +
      b.timeBlock +
      "</div>" +
      '<div class="ticket-details">' +
      equipDisplay +
      paymentDisplay +
      "</div>" +
      "</div>" +
      '<div class="ticket-stub">' +
      '<button class="btn btn-danger" style="padding: 10px; width: 100%; font-size: 0.9rem;" onclick="cancelBooking(\'' +
      b._id +
      "')\">" +
      cancelLabel +
      "</button>" +
      "</div>" +
      "</div></div>";
  }

  list.innerHTML = html;
}

// Cancel a booking with confirmation
function cancelBooking(id) {
  auth.confirmCancelBooking(id, fetchDashboardData);
}
