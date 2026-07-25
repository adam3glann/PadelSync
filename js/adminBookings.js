// Track current page
var bookingsPage = 1;
var BOOKINGS_PER_PAGE = 10;

document.addEventListener('DOMContentLoaded', function() {
  auth.checkAuth('admin');

  // Set default date to today
  var now = new Date();
  var today = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  document.getElementById('filter-date').value = today;

  // Reload bookings when filter date changes
  document.getElementById('filter-date').addEventListener('change', function() {
    bookingsPage = 1;
    fetchBookings(this.value, 1);
  });

  // Load bookings for today on page load
  fetchBookings(today, 1);
  fetchCancelledSchedules();
});

// Fetch and display bookings for a specific date
function fetchBookings(date, page) {
  bookingsPage = page || 1;
  var tbody = document.getElementById('bookings-table-body');

  // Show loading spinner
  tbody.innerHTML = '<tr><td colspan="7" class="text-center"><div class="spinner" style="margin: 0 auto;"></div></td></tr>';

  try {
    var result = db.getAllBookings(date, bookingsPage, BOOKINGS_PER_PAGE);
    var slots = result.data;
    var pagination = result.pagination;

    // Show empty message if no bookings
    if (slots.length === 0 && bookingsPage === 1) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">' + (window.i18n ? window.i18n.t('bookings.noBookings') : 'No bookings found for this date.') + '</td></tr>';
      return;
    }

    // Build table rows
    var rows = '';
    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      var equipmentDisplay;
      if (slot.equipment && slot.equipment !== 'None') {
        equipmentDisplay = '<span class="badge badge-equipment">' + slot.equipment + '</span>';
      } else {
        equipmentDisplay = '<span style="color: var(--text-muted);">' + (window.i18n ? window.i18n.t('bookings.none') : 'None') + '</span>';
      }

      var playerName = slot.bookedBy ? slot.bookedBy.name : (window.i18n ? window.i18n.t('bookings.unknown') : 'Unknown');
      var playerEmail = slot.bookedBy ? slot.bookedBy.email : '-';
      var cancelLabel = window.i18n ? window.i18n.t('bookings.cancel') : 'Cancel';

      rows += '<tr>' +
        '<td style="color: var(--padel-blue); font-weight: 500;">' + slot.courtId.name + '</td>' +
        '<td>' + slot.date + '</td>' +
        '<td>' + slot.timeBlock + '</td>' +
        '<td>' + playerName + '</td>' +
        '<td style="color: var(--text-muted);">' + playerEmail + '</td>' +
        '<td>' + equipmentDisplay + '</td>' +
        '<td><button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="adminCancel(\'' + slot._id + '\')">' + cancelLabel + '</button></td>' +
        '</tr>';
    }
    tbody.innerHTML = rows;

    // Render pagination if needed
    if (pagination && pagination.totalPages > 1) {
      var pagEl = document.getElementById('bookings-pagination');
      if (pagEl) renderPagination('bookings-pagination', pagination, function(p) { fetchBookings(date, p); });
    }
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center" style="color: var(--danger);">Failed to load bookings.</td></tr>';
  }
}

// Admin cancel a booking
function adminCancel(id) {
  var title = window.i18n ? window.i18n.t('modal.cancelMemberBooking') : 'Cancel Member Booking';
  var msg = window.i18n ? window.i18n.t('modal.cancelMemberMsg') : 'Are you sure you want to cancel this booking?';
  auth.showModal(title, msg, function() {
    var user = auth.getUser();
    var result = db.cancelSlot(id, user.id, user.role);
    if (!result.ok) { auth.showToast(result.message, 'error'); return; }
    auth.showToast(result.message);
    fetchBookings(document.getElementById('filter-date').value, bookingsPage);
    fetchCancelledSchedules();
  });
}

// Show the permanent cancellation history for the club manager.
function fetchCancelledSchedules() {
  var body = document.getElementById('cancelled-table-body');
  var total = document.getElementById('cancelled-total');
  var records = db.getCancellations();
  total.textContent = records.length + (records.length === 1 ? ' cancelled' : ' cancelled');

  if (records.length === 0) {
    body.innerHTML = '<tr><td colspan="7" class="text-center">No cancelled schedules yet.</td></tr>';
    return;
  }

  var rows = '';
  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    rows += '<tr>' +
      '<td style="color:var(--padel-blue);font-weight:bold;">' + record.courtName + '</td>' +
      '<td>' + record.date + '<br><span style="color:var(--text-muted);font-size:0.8rem;">' + record.timeBlock + '</span></td>' +
      '<td>' + record.memberName + '<br><span style="color:var(--text-muted);font-size:0.8rem;">' + record.memberEmail + '</span></td>' +
      '<td>EGP ' + record.depositAmount + '</td>' +
      '<td class="refund-value">EGP ' + record.refundAmount + '</td>' +
      '<td class="retained-value">EGP ' + record.retainedAmount + '</td>' +
      '<td>' + new Date(record.cancelledAt).toLocaleString() + '</td>' +
      '</tr>';
  }
  body.innerHTML = rows;
}
