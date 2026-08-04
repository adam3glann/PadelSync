// Track current page
var bookingsPage = 1;
var BOOKINGS_PER_PAGE = 10;

document.addEventListener('DOMContentLoaded', function () {
  auth.checkAuth('admin');

  // Set default date to today
  var now = new Date();
  var today = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  document.getElementById('filter-date').value = today;

  // Reload bookings when filter date changes
  document.getElementById('filter-date').addEventListener('change', function () {
    bookingsPage = 1;
    fetchBookings(this.value, 1);
  });

  // Load bookings for today on page load
  fetchBookings(today, 1);
  fetchCancelledSchedules();
});

// Fetch and display bookings for a specific date
async function fetchBookings(date, page) {
  bookingsPage = page || 1;
  var tbody = document.getElementById('bookings-table-body');

  // Show loading spinner
  tbody.innerHTML = '<tr><td colspan="7" class="text-center"><div class="spinner" style="margin: 0 auto;"></div></td></tr>';

  try {
    var result = await db.getAllBookings(date, bookingsPage, BOOKINGS_PER_PAGE);
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
      var courtName = slot.court ? slot.court.name : (window.i18n ? window.i18n.t('bookings.unknown') : 'Court unavailable');
      var equipmentDisplay;
      if (slot.equipment && slot.equipment !== 'None') {
        equipmentDisplay = '<span class="badge badge-equipment">' + escapeHtml(slot.equipment) + '</span>';
      } else {
        equipmentDisplay = '<span style="color: var(--text-muted);">' + (window.i18n ? window.i18n.t('bookings.none') : 'None') + '</span>';
      }

      var playerName = slot.user ? escapeHtml(slot.user.fullName) : (window.i18n ? window.i18n.t('bookings.unknown') : 'Unknown');
      var playerEmail = slot.user ? escapeHtml(slot.user.email) : '-';
      var cancelLabel = window.i18n ? window.i18n.t('bookings.cancel') : 'Cancel';

      rows += '<tr>' +
        '<td style="color: var(--padel-blue); font-weight: 500;">' + escapeHtml(courtName) + '</td>' +
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
    var pagEl = document.getElementById('bookings-pagination');
    if (pagEl) {
      if (pagination && pagination.totalPages > 1) {
        renderPagination('bookings-pagination', pagination, function (p) { fetchBookings(date, p); });
      } else {
        pagEl.innerHTML = '';
      }
    }
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center" style="color: var(--danger);">Failed to load bookings.</td></tr>';
  }
}

// Admin cancel a booking
function adminCancel(id) {
  var title = window.i18n ? window.i18n.t('modal.cancelMemberBooking') : 'Cancel Member Booking';
  var msg = window.i18n ? window.i18n.t('modal.cancelMemberMsg') : 'Are you sure you want to cancel this booking?';
  auth.showModal(title, msg, async function () {
    var result = await db.cancelSlot(id);
    if (!result.ok) { auth.showToast(result.message, 'error'); return; }
    auth.showToast(result.message);
    fetchBookings(document.getElementById('filter-date').value, bookingsPage);
    fetchCancelledSchedules();
  });
}

// Show the permanent cancellation history for the club manager.
async function fetchCancelledSchedules() {
  var body = document.getElementById('cancelled-table-body');
  var total = document.getElementById('cancelled-total');
  try {
    var records = await db.getCancellations();
    total.textContent = records.length + (records.length === 1 ? ' cancelled' : ' cancelled');

    if (records.length === 0) {
      body.innerHTML = '<tr><td colspan="7" class="text-center">No cancelled schedules yet.</td></tr>';
      return;
    }

    var rows = '';
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var courtName = record.court ? escapeHtml(record.court.name) : (window.i18n ? window.i18n.t('bookings.unknown') : 'Court unavailable');
      var memberName = record.user ? escapeHtml(record.user.fullName) : 'Unknown';
      var memberEmail = record.user ? escapeHtml(record.user.email) : '-';
      rows += '<tr>' +
        '<td style="color:var(--padel-blue);font-weight:bold;">' + courtName + '</td>' +
        '<td>' + record.date + '<br><span style="color:var(--text-muted);font-size:0.8rem;">' + record.timeBlock + '</span></td>' +
        '<td>' + memberName + '<br><span style="color:var(--text-muted);font-size:0.8rem;">' + memberEmail + '</span></td>' +
        '<td>EGP ' + record.depositAmount + '</td>' +
        '<td class="refund-value">EGP ' + record.refundAmount + '</td>' +
        '<td class="retained-value">EGP ' + ((record.depositAmount || 0) - (record.refundAmount || 0)) + '</td>' +
        '<td>' + (record.cancelledAt ? new Date(record.cancelledAt).toLocaleString() : '-') + '</td>' +
        '</tr>';
    }
    body.innerHTML = rows;
  } catch (error) {
    body.innerHTML = '<tr><td colspan="7" class="text-center" style="color: var(--danger);">Failed to load cancelled schedules.</td></tr>';
  }
}
