// Load member dashboard when page is ready
document.addEventListener('DOMContentLoaded', function () {
  auth.checkAuth('member');

  // Show welcome message with user's name
  var user = auth.getUser();
  if (user) {
    var welcomeText = (window.i18n ? window.i18n.t('dash.welcomeBack') : 'Welcome back') + ', <span class="gradient-text">' + user.name + '</span>!';
    document.getElementById('welcome-msg').innerHTML = welcomeText;
  }

  fetchDashboardData();
});

// Fetch and display dashboard stats and upcoming bookings
function fetchDashboardData() {
  try {
    // Show count of active courts
    var courts = db.getCourts(1, 50).data;
    var activeCourts = 0;
    for (var i = 0; i < courts.length; i++) {
      if (courts[i].status === 'active') activeCourts++;
    }
    document.getElementById('courts-count').textContent = activeCourts;

    // Show count of upcoming bookings
    var user = auth.getUser();
    var bookings = db.getMyBookings(user.id, 1, 50).data;
    var now = new Date();
    var today = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    var upcoming = [];
    for (var j = 0; j < bookings.length; j++) {
      if (bookings[j].date >= today) upcoming.push(bookings[j]);
    }
    document.getElementById('upcoming-count').textContent = upcoming.length;

    // Show up to 3 next upcoming bookings
    renderUpcoming(upcoming.slice(0, 3));
  } catch (error) {
    auth.showToast('Failed to load dashboard data', 'error');
  }
}

// Render the upcoming bookings list
function renderUpcoming(bookings) {
  var list = document.getElementById('upcoming-list');

  if (bookings.length === 0) {
    list.innerHTML = '<div class="card" style="grid-column: 1 / -1; text-align: center;">' +
      '<p style="color: var(--text-muted);">' + (window.i18n ? window.i18n.t('dash.noUpcoming') : 'No upcoming reservations.') + '</p>' +
      '<a href="book.html" class="btn btn-primary mt-1">' + (window.i18n ? window.i18n.t('dash.bookACourt') : 'Book a Court') + '</a>' +
      '</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < bookings.length; i++) {
    var b = bookings[i];
    var gearLabel = window.i18n ? window.i18n.t('res.gear') : 'Gear:';
    var cancelLabel = window.i18n ? window.i18n.t('bookings.cancel') : 'Cancel';

    var equipDisplay = '';
    if (b.equipment && b.equipment !== 'None') {
      equipDisplay = '<p style="font-size:0.85rem;margin-top:0.5rem;"><span style="color:var(--text-muted);">' + gearLabel + '</span> ' + b.equipment + '</p>';
    }

    var paymentDisplay = '';
    if (b.payment) {
      paymentDisplay = '<p style="font-size:0.85rem;margin-top:0.5rem;"><span style="color:var(--text-muted);">Deposit paid:</span> EGP ' + b.payment.depositAmount + ' <br><span style="color:var(--text-muted);">Cash due at court:</span> EGP ' + b.payment.cashAmount + '</p>';
    }

    html += '<div class="card">' +
      '<h4 style="color: var(--padel-blue); font-size: 1.1rem; font-style: normal;">' + b.courtId.name + '</h4>' +
      '<p style="font-size:0.9rem;"><strong>' + b.date + '</strong> &mdash; ' + b.timeBlock + '</p>' +
      equipDisplay +
      paymentDisplay +
      '<button class="btn btn-danger mt-1" style="width: 100%;" onclick="cancelBooking(\'' + b._id + '\')">' + cancelLabel + '</button>' +
      '</div>';
  }

  list.innerHTML = html;
}

// Cancel a booking with confirmation
function cancelBooking(id) {
  var title = window.i18n ? window.i18n.t('modal.cancelBooking') : 'Cancel Booking';
  var msg = window.i18n ? window.i18n.t('modal.cancelBookingMsg') : 'Are you sure you want to cancel this reservation?';
  auth.showModal(title, msg, function () {
    var user = auth.getUser();
    var result = db.cancelSlot(id, user.id, user.role);
    if (!result.ok) { auth.showToast(result.message, 'error'); return; }
    auth.showToast(result.message);
    fetchDashboardData();
  });
}
