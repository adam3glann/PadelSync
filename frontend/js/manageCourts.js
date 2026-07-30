// Track current page for court list
var courtsPage = 1;
var COURTS_PER_PAGE = 6;

document.addEventListener('DOMContentLoaded', function () {
  auth.checkAuth('admin');
  fetchCourts(1);

  // Validate court name field on blur
  var courtName = document.getElementById('court-name');
  if (courtName) {
    courtName.addEventListener('blur', function () {
      validateField(courtName, validationRules['court-name']);
    });
    courtName.addEventListener('input', function () {
      courtName.style.borderColor = '';
      var err = courtName.parentElement.querySelector('.field-error');
      if (err) err.remove();
    });
  }

  // Handle new court form submission
  document.getElementById('create-court-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate court name field
    if (!validateForm(this, { 'court-name': validationRules['court-name'] })) return;

    var name = document.getElementById('court-name').value;
    var description = document.getElementById('court-desc').value;
    var imageFile = document.getElementById('court-image').files[0];

    if (!name.trim()) return;

    // If an image was uploaded, read it as base64 first
    if (imageFile) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        doCreateCourt(name, description, ev.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      doCreateCourt(name, description, null);
    }
  });
});

// Create the court and refresh the list
function doCreateCourt(name, description, imageData) {
  var result = db.createCourt(name, description, imageData);
  if (!result.ok) { auth.showToast(result.message, 'error'); return; }
  auth.showToast(window.i18n ? window.i18n.t('toast.courtAdded') : 'Court added');
  document.getElementById('create-court-form').reset();
  fetchCourts(courtsPage);
}

// Fetch and display courts with pagination
function fetchCourts(page) {
  courtsPage = page;
  var list = document.getElementById('courts-list');
  list.innerHTML = '<div class="spinner"></div>';

  try {
    var result = db.getCourts(page, COURTS_PER_PAGE);
    var courts = result.data;
    var pagination = result.pagination;

    // Show empty message if no courts
    if (courts.length === 0 && page === 1) {
      list.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">' + (window.i18n ? window.i18n.t('courts.noCourts') : 'No courts yet.') + '</p>';
      return;
    }

    // Build court cards
    var html = '';
    for (var i = 0; i < courts.length; i++) {
      var court = courts[i];
      var isActive = court.status === 'active';
      var borderColor = isActive ? 'var(--padel-blue)' : 'var(--warning)';
      var badgeClass = isActive ? 'badge-active' : 'badge-maintenance';
      var statusLabel = isActive ? (window.i18n ? window.i18n.t('courts.active') : 'Active') : (window.i18n ? window.i18n.t('courts.outOfService') : 'Out of Service');
      var toggleLabel = isActive ? (window.i18n ? window.i18n.t('courts.outOfService') : 'Out of Service') : (window.i18n ? window.i18n.t('courts.setActive') : 'Set Active');
      var toggleStatus = isActive ? 'maintenance' : 'active';
      var deleteLabel = window.i18n ? window.i18n.t('courts.delete') : 'Delete';
      var noImgLabel = window.i18n ? window.i18n.t('courts.noImage') : 'No Image';
      var descText = court.description || (window.i18n ? window.i18n.t('courts.noDescription') : 'No description');
      var courtNameSafe = court.name.replace(/'/g, "\\'");

      var imgHtml;
      if (court.image) {
        imgHtml = '<img src="' + court.image + '" alt="' + court.name + '" style="width:100%;height:160px;object-fit:cover;border-radius:var(--radius-sm) var(--radius-sm) 0 0;">';
      } else {
        imgHtml = '<div style="width:100%;height:160px;background:var(--frost);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:0.85rem;">' + noImgLabel + '</div>';
      }

      html += '<div class="card" style="padding:0;overflow:hidden;border-left:3px solid ' + borderColor + ';">' +
        imgHtml +
        '<div style="padding:1.25rem;">' +
        '<div class="d-flex justify-between align-center mb-1">' +
        '<h3 style="color:var(--court-white);font-size:1.1rem;font-style:normal;">' + court.name + '</h3>' +
        '<span class="badge ' + badgeClass + '">' + statusLabel + '</span>' +
        '</div>' +
        '<p style="color:var(--text-muted);min-height:36px;font-size:0.9rem;">' + descText + '</p>' +
        '<div class="d-flex justify-between mt-2" style="gap:10px;">' +
        '<button class="btn btn-outline" style="flex:1;" onclick="toggleStatus(\'' + court._id + '\', \'' + toggleStatus + '\')">' + toggleLabel + '</button>' +
        '<button class="btn btn-danger" style="padding:0.75rem;" onclick="deleteCourt(\'' + court._id + '\', \'' + courtNameSafe + '\')">' + deleteLabel + '</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    }

    list.innerHTML = html;

    // Add pagination if needed
    if (pagination && pagination.totalPages > 1) {
      list.innerHTML += '<div id="courts-pagination" style="grid-column:1/-1;"></div>';
      renderPagination('courts-pagination', pagination, fetchCourts);
    }
  } catch (error) {
    list.innerHTML = '<p class="text-center" style="color: var(--danger);">Failed to load courts.</p>';
  }
}

// Toggle a court between active and maintenance
function toggleStatus(id, newStatus) {
  var result = db.updateCourt(id, { status: newStatus });
  if (!result.ok) { auth.showToast(result.message, 'error'); return; }
  fetchCourts(courtsPage);
}

// Delete a court after confirmation
function deleteCourt(id, name) {
  var title = window.i18n ? window.i18n.t('modal.deleteCourt') : 'Delete Court';
  var msg = window.i18n ? window.i18n.t('modal.deleteCourtMsg', { name: name }) : 'Delete <strong>' + name + '</strong> and all its time slots?';
  auth.showModal(title, msg, function () {
    var result = db.deleteCourt(id);
    if (!result.ok) { auth.showToast(result.message, 'error'); return; }
    auth.showToast(window.i18n ? window.i18n.t('toast.courtDeleted') : 'Court deleted');
    fetchCourts(courtsPage);
  });
}
