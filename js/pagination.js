// Render pagination buttons inside a container
function renderPagination(containerId, pagination, onPageChange) {
  var container = document.getElementById(containerId);
  
  // If no container or less than 2 pages, don't show pagination
  if (!container || !pagination || pagination.totalPages <= 1) {
    if (container) container.innerHTML = '';
    return;
  }

  var page = pagination.page;
  var totalPages = pagination.totalPages;
  var total = pagination.total;
  var limit = pagination.limit;
  
  var from = (page - 1) * limit + 1;
  var to = Math.min(page * limit, total);

  // Calculate which page buttons to show (max 5 buttons)
  var maxVisible = 5;
  var start = Math.max(1, page - Math.floor(maxVisible / 2));
  var end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  // Build the individual page buttons
  var pagesHTML = '';
  for (var i = start; i <= end; i++) {
    var activeClass = i === page ? ' pag-active' : '';
    pagesHTML += '<button class="pag-btn' + activeClass + '" data-page="' + i + '">' + i + '</button>';
  }

  // Build the whole pagination HTML
  var infoText = window.i18n ? window.i18n.t('pag.showing', { from: from, to: to, total: total }) : 'Showing ' + from + '-' + to + ' of ' + total;
  var prevLabel = window.i18n ? window.i18n.t('pag.prev') : 'Prev';
  var nextLabel = window.i18n ? window.i18n.t('pag.next') : 'Next';

  var prevDisabled = page <= 1 ? 'disabled' : '';
  var nextDisabled = page >= totalPages ? 'disabled' : '';

  container.innerHTML = 
    '<div class="pagination">' +
      '<span class="pag-info">' + infoText + '</span>' +
      '<div class="pag-controls">' +
        '<button class="pag-btn" data-page="' + (page - 1) + '" ' + prevDisabled + '>&#8249; ' + prevLabel + '</button>' +
        pagesHTML +
        '<button class="pag-btn" data-page="' + (page + 1) + '" ' + nextDisabled + '>' + nextLabel + ' &#8250;</button>' +
      '</div>' +
    '</div>';

  // Attach click events to all active buttons
  var buttons = container.querySelectorAll('.pag-btn:not([disabled])');
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener('click', function() {
      var p = parseInt(this.getAttribute('data-page'), 10);
      if (p >= 1 && p <= totalPages) {
        onPageChange(p);
      }
    });
  }
}

// Make the function available globally
window.renderPagination = renderPagination;
