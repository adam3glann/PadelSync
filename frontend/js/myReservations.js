// Track current page
var reservationsPage = 1;
var RESERVATIONS_PER_PAGE = 6;

// Load reservations when the page is ready
document.addEventListener('DOMContentLoaded', function () {
  auth.checkAuth('member');
  fetchReservations(1);
});

// Fetch and display the user's reservations
async function fetchReservations(page) {
  reservationsPage = page || 1;
  var list = document.getElementById('reservations-list');
  list.innerHTML = '<div class="spinner"></div>';

<<<<<<< HEAD
  api.get('/reservations/my?page=' + reservationsPage + '&limit=' + RESERVATIONS_PER_PAGE)
    .then(function (result) {
      var bookings = result.data;
      var pagination = result.pagination;
=======
  try {
    var result = await db.getMyBookings(reservationsPage, RESERVATIONS_PER_PAGE);
    var bookings = result.data;
    var pagination = result.pagination;
>>>>>>> 906d52d (Implement authentication and authorization)

      // Show empty message if no reservations
      if (bookings.length === 0 && reservationsPage === 1) {
        list.innerHTML = '<div class="card" style="grid-column: 1 / -1; text-align: center;">' +
          '<h3 class="mb-1">' + (window.i18n ? window.i18n.t('res.noReservations') : 'No reservations yet') + '</h3>' +
          '<p style="color: var(--text-muted);">' + (window.i18n ? window.i18n.t('res.noReservationsDesc') : "You haven't booked any courts.") + '</p>' +
          '<a href="book.html" class="btn btn-primary mt-2">' + (window.i18n ? window.i18n.t('res.bookFirst') : 'Book Your First Court') + '</a>' +
          '</div>';
        return;
      }

<<<<<<< HEAD
      // Build reservation cards
      var html = '';
      for (var i = 0; i < bookings.length; i++) {
        var b = bookings[i];
        var gearLabel = window.i18n ? window.i18n.t('res.gear') : 'Gear:';
        var bookedAtLabel = window.i18n ? window.i18n.t('res.bookedAt') : 'Booked:';
        var cancelLabel = window.i18n ? window.i18n.t('bookings.cancel') : 'Cancel';

        var equipDisplay = '';
        if (b.equipment && b.equipment !== 'None') {
          equipDisplay = '<p style="font-size:0.85rem;margin-top:0.3rem;"><span style="color:var(--text-muted);">' + gearLabel + '</span> ' + b.equipment + '</p>';
        }

        var paymentDisplay = '';
        if (b.payment) {
          paymentDisplay = '<div class="payment-summary mt-1">' +
            '<p><strong>Online deposit paid:</strong> EGP ' + b.payment.depositAmount + '</p>' +
            '<p><strong>Cash due at court:</strong> EGP ' + b.payment.cashAmount + '</p>' +
            '</div>';
        }

        html += '<div class="card">' +
          '<h3 style="color: var(--padel-blue); font-size: 1.1rem; font-style: normal;">' + b.court.name + '</h3>' +
          '<p style="font-size:0.9rem;"><strong>' + b.date + '</strong> &mdash; ' + b.timeBlock + '</p>' +
          equipDisplay +
          paymentDisplay +
          '<p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">' + bookedAtLabel + ' ' + new Date(b.bookedAt).toLocaleString() + '</p>' +
          '<button class="btn btn-danger mt-1" style="width: 100%;" onclick="cancelBooking(\'' + b._id + '\')">' + cancelLabel + '</button>' +
          '</div>';
      }

      // Add pagination placeholder if needed
      if (pagination && pagination.totalPages > 1) {
        html += '<div id="reservations-pagination" style="grid-column:1/-1;"></div>';
      }
=======
      var paymentDisplay = '';
      if (b.depositAmount) {
        paymentDisplay = '<div class="payment-summary mt-1">' +
          '<p><strong>Online deposit paid:</strong> EGP ' + b.depositAmount + '</p>' +
          '<p><strong>Cash due at court:</strong> EGP ' + b.cashAmount + '</p>' +
          '</div>';
      }

      html += '<div class="card">' +
        '<h3 style="color: var(--padel-blue); font-size: 1.1rem; font-style: normal;">' + b.court.name + '</h3>' +
        '<p style="font-size:0.9rem;"><strong>' + b.date + '</strong> &mdash; ' + b.timeBlock + '</p>' +
        equipDisplay +
        paymentDisplay +
        '<p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">' + bookedAtLabel + ' ' + new Date(b.createdAt).toLocaleString() + '</p>' +
        '<button class="btn btn-danger mt-1" style="width: 100%;" onclick="cancelBooking(\'' + b._id + '\')">' + cancelLabel + '</button>' +
        '</div>';
    }
>>>>>>> 906d52d (Implement authentication and authorization)

      list.innerHTML = html;

      if (pagination && pagination.totalPages > 1) {
        renderPagination('reservations-pagination', pagination, fetchReservations);
      }
    })
    .catch(function () {
      list.innerHTML = '<p class="text-center" style="color: var(--danger);">Failed to load reservations.</p>';
    });
}

// Cancel a booking with confirmation
function cancelBooking(id) {
  var title = window.i18n ? window.i18n.t('modal.cancelBooking') : 'Cancel Booking';
  var msg = window.i18n ? window.i18n.t('modal.cancelBookingMsg') : 'Are you sure you want to cancel this reservation?';
<<<<<<< HEAD
  auth.showModal(title, msg, function () {
    api.del('/reservations/' + id).then(function (result) {
      auth.showToast(result.message);
      fetchReservations(reservationsPage);
    }).catch(function (err) {
      auth.showToast(err.message, 'error');
    });
=======
  auth.showModal(title, msg, async function () {
    var result = await db.cancelSlot(id);
    if (!result.ok) { auth.showToast(result.message, 'error'); return; }
    auth.showToast(result.message);
    fetchReservations(reservationsPage);
>>>>>>> 906d52d (Implement authentication and authorization)
  });
}
