// Mini calendar class
class MiniCalendar {
  constructor(container, onSelect) {
    // Accept either an element ID string or the actual element
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.onSelect = onSelect;

    // Set today's date with no time component
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    this.selected = new Date(this.today);

    // Start the calendar view on the current month and year
    this.viewMonth = this.today.getMonth();
    this.viewYear = this.today.getFullYear();

    this.render();
  }

  // Build and display the calendar HTML
  render() {
    const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsAr = ['\u064a\u0646\u0627\u064a\u0631', '\u0641\u0628\u0631\u0627\u064a\u0631', '\u0645\u0627\u0631\u0633', '\u0623\u0628\u0631\u064a\u0644', '\u0645\u0627\u064a\u0648', '\u064a\u0648\u0646\u064a\u0648', '\u064a\u0648\u0644\u064a\u0648', '\u0623\u063a\u0633\u0637\u0633', '\u0633\u0628\u062a\u0645\u0628\u0631', '\u0623\u0643\u062a\u0648\u0628\u0631', '\u0646\u0648\u0641\u0645\u0628\u0631', '\u062f\u064a\u0633\u0645\u0628\u0631'];
    const daysEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const daysAr = ['\u0627\u0644\u0623\u062d\u062f', '\u0627\u0644\u0627\u062b\u0646\u064a\u0646', '\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621', '\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621', '\u0627\u0644\u062e\u0645\u064a\u0633', '\u0627\u0644\u062c\u0645\u0639\u0629', '\u0627\u0644\u0633\u0628\u062a'];

    // Pick month/day names based on current language
    const lang = (window.i18n && window.i18n.getLang()) || 'en';
    const months = lang === 'ar' ? monthsAr : monthsEn;
    const days = lang === 'ar' ? daysAr : daysEn;

    const firstDay = new Date(this.viewYear, this.viewMonth, 1).getDay();
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();

    // Build calendar day cells
    let cells = '';

    // Empty cells before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      cells += '<div class="cal-cell cal-empty"></div>';
    }

    // Cells for each day
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.viewYear, this.viewMonth, d);
      date.setHours(0, 0, 0, 0);
      const dateStr = this.formatDate(date);

      const isPast = date < this.today;
      const isToday = date.getTime() === this.today.getTime();
      const isSelected = date.getTime() === this.selected.getTime();
      const isWithin30Days = date <= new Date(this.today.getTime() + 30 * 86400000);

      // Build class list
      let cls = 'cal-cell';
      if (isPast || !isWithin30Days) cls += ' cal-disabled';
      if (isToday) cls += ' cal-today';
      if (isSelected) cls += ' cal-selected';

      // Add click handler only for valid (non-past, within 30 days) cells
      let clickAttr = '';
      if (!isPast && isWithin30Days) {
        clickAttr = `data-date="${dateStr}" onclick="window._miniCalSelect('${dateStr}')"`;
      }

      cells += `<div class="${cls}" ${clickAttr}>${d}</div>`;
    }

    // Build day-of-week header row
    let dayHeaders = '';
    for (let i = 0; i < days.length; i++) {
      dayHeaders += `<div class="cal-cell cal-day-label">${days[i]}</div>`;
    }

    // Render the complete calendar
    this.container.innerHTML = `
      <div class="mini-calendar">
        <div class="cal-header">
          <button class="cal-nav" onclick="window._miniCalNav(-1)">&#8249;</button>
          <span class="cal-title">${months[this.viewMonth]} ${this.viewYear}</span>
          <button class="cal-nav" onclick="window._miniCalNav(1)">&#8250;</button>
        </div>
        <div class="cal-days">${dayHeaders}</div>
        <div class="cal-grid">${cells}</div>
      </div>
    `;

    // Set global handlers for calendar navigation and selection
    window._miniCalSelect = (dateStr) => {
      this.selected = new Date(dateStr + 'T00:00:00');
      this.render();
      if (this.onSelect) this.onSelect(dateStr);
    };

    window._miniCalNav = (dir) => {
      this.viewMonth += dir;
      if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++; }
      if (this.viewMonth < 0) { this.viewMonth = 11; this.viewYear--; }
      this.render();
    };
  }

  // Format a Date object as YYYY-MM-DD
  formatDate(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
}

// Create a small availability bar that shows slot stats
function initAvailabilityBar(containerId) {
  return {
    total: 0,
    booked: 0,
    render: function () {
      var pct = this.total > 0 ? Math.round((this.booked / this.total) * 100) : 0;
      var avail = this.total - this.booked;
      var el = document.getElementById(containerId);
      if (!el) return;

      var tFn = (window.i18n && window.i18n.t.bind(window.i18n)) || function (k) { return k; };

      el.innerHTML =
        '<div class="avail-bar">' +
        '<div class="avail-bar-fill" style="width: ' + pct + '%"></div>' +
        '</div>' +
        '<div class="avail-stats">' +
        '<span class="avail-stat"><span style="color:var(--success)">' + avail + '</span> ' + tFn('book.available') + '</span>' +
        '<span class="avail-stat"><span style="color:var(--danger)">' + this.booked + '</span> ' + tFn('book.booked') + '</span>' +
        '<span class="avail-stat"><span style="color:var(--text-muted)">' + this.total + '</span> ' + tFn('book.total') + '</span>' +
        '</div>';
    }
  };
}
