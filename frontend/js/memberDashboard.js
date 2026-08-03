// Load member dashboard when page is ready
document.addEventListener('DOMContentLoaded', function () {
  auth.checkAuth('member');

  // Show welcome message with user's name
  var user = auth.getUser();
  if (user) {
    var welcomeText = (window.i18n ? window.i18n.t('dash.welcomeBack') : 'Welcome back') + ', <span class="gradient-text">' + user.fullName + '</span>!';
    document.getElementById('welcome-msg').innerHTML = welcomeText;
  }

  fetchDashboardData();
});

// Format a Date object as YYYY-MM-DD
function formatDate(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// Fetch and display dashboard stats and upcoming bookings
<<<<<<< HEAD
function fetchDashboardData() {
  Promise.all([
    api.get('/courts'),
    api.get('/reservations/my?limit=50')
  ]).then(function (results) {
    var courts = results[0];
    var reservations = results[1].data;

    // Show count of active courts
=======
async function fetchDashboardData() {
  try {
    // Show count of active courts
    var courts = (await db.getCourts(1, 50)).data;
>>>>>>> 906d52d (Implement authentication and authorization)
    var activeCourts = 0;
    for (var i = 0; i < courts.length; i++) {
      if (courts[i].isAvailable) activeCourts++;
    }
    document.getElementById('courts-count').textContent = activeCourts;

<<<<<<< HEAD
    // Show count of upcoming bookings (today or later), soonest first
    var today = formatDate(new Date());
    var upcoming = reservations.filter(function (b) { return b.date >= today; });
    upcoming.sort(function (a, b) { return (a.date + a.timeBlock).localeCompare(b.date + b.timeBlock); });

=======
    // Show count of upcoming bookings
    var user = auth.getUser();
    var bookings = (await db.getMyBookings(1, 50)).data;
    var now = new Date();
    var today = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    var upcoming = [];
    for (var j = 0; j < bookings.length; j++) {
      if (bookings[j].date >= today) upcoming.push(bookings[j]);
    }
>>>>>>> 906d52d (Implement authentication and authorization)
    document.getElementById('upcoming-count').textContent = upcoming.length;

    // Show up to 3 next upcoming bookings
    renderUpcoming(upcoming.slice(0, 3));
  }).catch(function () {
    auth.showToast('Failed to load dashboard data', 'error');
  });
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
    if (b.depositAmount) {
      paymentDisplay = '<p style="font-size:0.85rem;margin-top:0.5rem;"><span style="color:var(--text-muted);">Deposit paid:</span> EGP ' + b.depositAmount + ' <br><span style="color:var(--text-muted);">Cash due at court:</span> EGP ' + b.cashAmount + '</p>';
    }

    html += '<div><div class="ticket-card">' +
      '<div class="ticket-main">' +
      '<div class="ticket-title">' + b.court.name + '</div>' +
      '<div class="ticket-datetime">' + b.date + ' &mdash; ' + b.timeBlock + '</div>' +
      '<div class="ticket-details">' +
      equipDisplay +
      paymentDisplay +
      '</div>' +
      '</div>' +
      '<div class="ticket-stub">' +
      '<button class="btn btn-danger" style="padding: 10px; width: 100%; font-size: 0.9rem;" onclick="cancelBooking(\'' + b._id + '\')">' + cancelLabel + '</button>' +
      '</div>' +
      '</div></div>';
  }

  list.innerHTML = html;
}

// Cancel a booking with confirmation
function cancelBooking(id) {
  var title = window.i18n ? window.i18n.t('modal.cancelBooking') : 'Cancel Booking';
  var msg = window.i18n ? window.i18n.t('modal.cancelBookingMsg') : 'Are you sure you want to cancel this reservation?';
<<<<<<< HEAD
  auth.showModal(title, msg, function () {
    api.del('/reservations/' + id).then(function (result) {
      auth.showToast(result.message);
      fetchDashboardData();
    }).catch(function (err) {
      auth.showToast(err.message, 'error');
    });
=======
  auth.showModal(title, msg, async function () {
    var result = await db.cancelSlot(id);
    if (!result.ok) { auth.showToast(result.message, 'error'); return; }
    auth.showToast(result.message);
    fetchDashboardData();
>>>>>>> 906d52d (Implement authentication and authorization)
  });
}
