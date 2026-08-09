// Book a slot: show equipment and the required 50% reservation deposit.
function bookSlot(slotId, courtName, timeBlock, date, pricePerHour) {
  var tFn = window.i18n
    ? window.i18n.t.bind(window.i18n)
    : function (k) {
        return k;
      };
  var total = Math.round((pricePerHour || 0) * 1.5 * 100) / 100;
  var deposit = Math.round((total / 2) * 100) / 100;

  // Build modal content with equipment dropdown
  var modalHTML =
    '<p style="color:var(--court-white);">' +
    tFn("book.bookAt", {
      court: escapeHtml(courtName),
      time: escapeHtml(timeBlock),
      date: escapeHtml(date),
    }) +
    "</p>" +
    '<div class="form-group mt-2">' +
    "<label>" +
    tFn("book.equipment") +
    "</label>" +
    '<select id="equipment-select" style="margin-bottom: 0;">' +
    '<option value="None">' +
    tFn("book.equipNone") +
    "</option>" +
    '<option value="2 Racquets & 1 Can of Balls">' +
    tFn("book.equip1") +
    "</option>" +
    '<option value="4 Racquets & 1 Can of Balls">' +
    tFn("book.equip2") +
    "</option>" +
    '<option value="2 Racquets & 2 Cans of Balls">' +
    tFn("book.equip3") +
    "</option>" +
    '<option value="4 Racquets & 2 Cans of Balls">' +
    tFn("book.equip4") +
    "</option>" +
    "</select>" +
    "</div>" +
    '<div class="payment-summary mt-2">' +
    "<h4>Reservation payment</h4>" +
    "<p>Total court price: <strong>EGP " +
    total +
    "</strong></p>" +
    "<p>Pay now (50%): <strong>EGP " +
    deposit +
    "</strong></p>" +
    "<p>Pay at the court in cash: <strong>EGP " +
    deposit +
    "</strong></p>" +
    "</div>" +
    '<div class="form-group mt-1">' +
    '<label for="card-name">Card holder name</label>' +
    '<input id="card-name" type="text" placeholder="Name on card" autocomplete="cc-name" pattern="[A-Za-z\\s\'-]+" oninput="this.value = this.value.replace(/[^A-Za-z\\s\'-]/g, \'\')">' +
    "</div>" +
    '<div class="form-group">' +
    '<label for="card-number">Card number</label>' +
    '<input id="card-number" type="text" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" autocomplete="cc-number">' +
    "</div>" +
    '<div class="policy-box">' +
    "<strong>Cancellation refund policy</strong>" +
    "<p>Cancel more than 2 hours before your match starts for a full deposit refund. Within 2 hours: 25% refunded. Once the match starts the deposit is not refunded.</p>" +
    "</div>";

  auth.showModal(tFn("book.confirmBooking"), modalHTML, async function () {
    var cardName = document.getElementById("card-name").value.trim();
    var cardNumber = document
      .getElementById("card-number")
      .value.replace(/\s/g, "");
    var NAME_REGEX = /^[A-Za-z\s'-]{2,50}$/;
    if (!NAME_REGEX.test(cardName)) {
      auth.showToast(
        "Card holder name can only contain letters, spaces, hyphens, and apostrophes.",
        "error",
      );
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      auth.showToast("Enter a valid 16-digit card number.", "error");
      return false;
    }

    var equipment = document.getElementById("equipment-select").value;
    var result = await db.bookSlot(slotId, equipment);
    if (!result.ok) {
      auth.showToast(result.message, "error");
      return false;
    }
    auth.showToast(
      "Deposit of EGP " +
        deposit +
        " paid. The remaining EGP " +
        deposit +
        " is due in cash at the court.",
    );
    fetchSlots(date);
  });
}

// Cancel a booked slot with confirmation
function cancelSlot(slotId) {
  var tFn = window.i18n
    ? window.i18n.t.bind(window.i18n)
    : function (k) {
        return k;
      };
  auth.showModal(
    tFn("modal.cancelBooking"),
    tFn("modal.cancelBookingMsg"),
    async function () {
      var result = await db.cancelSlot(slotId);
      if (!result.ok) {
        auth.showToast(result.message, "error");
        return;
      }
      auth.showToast(result.message);
      // Re-fetch slots for the currently selected date
      var dateEl = document.querySelector(".cal-selected");
      var date =
        dateEl && dateEl.dataset && dateEl.dataset.date
          ? dateEl.dataset.date
          : formatDate(new Date());
      fetchSlots(date);
    },
  );
}

// Calendar and availability bar references
var calendar;
var availBar;

// Guards against out-of-order slot responses when dates change quickly.
var slotRequestSeq = 0;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  auth.checkAuth("member");

  var today = formatDate(new Date());

  // Create the availability bar
  availBar = initAvailabilityBar("availability-summary");

  // Create the mini calendar with a callback for when a date is selected
  calendar = new MiniCalendar("mini-calendar", function (dateStr) {
    updateDateDisplay(dateStr);
    fetchSlots(dateStr);
  });

  // Show today's date and slots on load
  updateDateDisplay(today);
  fetchSlots(today);
  loadWeather();
});

async function loadWeather() {
  var widget = document.getElementById("weather-widget");
  if (!widget) return;
  try {
    var weather = await db.getWeather();
    var forecast = weather.forecast
      .map(function (day) {
        return (
          '<span style="margin-right:14px;">' +
          escapeHtml(day.date.slice(5)) +
          ": " +
          day.temperature +
          "°C, " +
          escapeHtml(day.description) +
          "</span>"
        );
      })
      .join("");
    widget.innerHTML =
      '<h3 style="margin-bottom:6px;">Weather at ' +
      escapeHtml(weather.location) +
      '</h3><p style="color:var(--text-muted);">Now: ' +
      weather.current.temperature +
      "°C, " +
      escapeHtml(weather.current.description) +
      '</p><p style="color:var(--text-muted);font-size:.9rem;">' +
      forecast +
      "</p>";
  } catch (error) {
    widget.innerHTML =
      '<p style="color:var(--text-muted);">Weather is temporarily unavailable. You can still reserve a court.</p>';
  }
}

// Update the date display text above the slot grid
function updateDateDisplay(dateStr) {
  var el = document.getElementById("selected-date-display");
  if (!el) return;
  var d = new Date(dateStr + "T00:00:00");
  var lang = (window.i18n && window.i18n.getLang()) || "en";
  var locale = lang === "ar" ? "ar-EG" : "en-US";
  el.textContent = d.toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Quick date shortcut: pick today
function pickToday() {
  var d = new Date();
  var dateStr = formatDate(d);
  calendar.selected = d;
  calendar.render();
  updateDateDisplay(dateStr);
  fetchSlots(dateStr);
}

// Quick date shortcut: pick tomorrow
function pickTomorrow() {
  var d = new Date();
  d.setDate(d.getDate() + 1);
  var dateStr = formatDate(d);
  calendar.selected = d;
  calendar.render();
  updateDateDisplay(dateStr);
  fetchSlots(dateStr);
}

// Quick date shortcut: pick N days from today
function pickNext(days) {
  var d = new Date();
  d.setDate(d.getDate() + days);
  var dateStr = formatDate(d);
  calendar.selected = d;
  calendar.viewMonth = d.getMonth();
  calendar.viewYear = d.getFullYear();
  calendar.render();
  updateDateDisplay(dateStr);
  fetchSlots(dateStr);
}

// Format a Date object as YYYY-MM-DD
function formatDate(d) {
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

// Fetch slots for a date and display them
async function fetchSlots(date) {
  var seq = ++slotRequestSeq;
  var container = document.getElementById("grid-container");
  container.innerHTML = '<div class="spinner"></div>';
  try {
    var slots = await db.getSlots(date);
    if (seq !== slotRequestSeq) return; // a newer request has superseded this one
    // Update availability bar
    availBar.total = slots.length;
    availBar.booked = 0;
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].isBooked) availBar.booked++;
    }
    availBar.render();
    renderGrid(slots, date);
  } catch (err) {
    if (seq !== slotRequestSeq) return;
    container.innerHTML =
      '<p class="text-center" style="color: var(--danger);">Failed to load slots.</p>';
  }
}

// Render the court/slot grid
function renderGrid(slots, date) {
  var container = document.getElementById("grid-container");
  var user = auth.getUser();

  // Group slots by court
  var courtsMap = {};
  for (var i = 0; i < slots.length; i++) {
    var slot = slots[i];
    var courtId = slot.courtId._id;
    if (!courtsMap[courtId]) {
      courtsMap[courtId] = {
        name: slot.courtId.name,
        description: slot.courtId.description,
        status: slot.courtId.status,
        image: slot.courtId.image,
        pricePerHour: slot.courtId.pricePerHour,
        discountPercent: slot.courtId.discountPercent || 0,
        effectivePrice:
          slot.courtId.effectivePrice !== undefined
            ? slot.courtId.effectivePrice
            : slot.courtId.pricePerHour,
        slots: [],
      };
    }
    courtsMap[courtId].slots.push(slot);
  }

  var courtIds = Object.keys(courtsMap);

  if (courtIds.length === 0) {
    container.innerHTML =
      '<div class="card text-center"><p style="color: var(--text-muted);">' +
      (window.i18n
        ? window.i18n.t("book.noSlots")
        : "No slots for this date.") +
      "</p></div>";
    return;
  }

  // Default court images if no image is set
  var courtPlaceholders = [
    "../assets/court-1.jpg",
    "../assets/court-2.jpg",
    "../assets/court-3.jpg",
  ];
  var borderColors = ["var(--padel-blue)", "var(--optic-yellow)", "#FF6B35"];

  var html = "";

  for (var k = 0; k < courtIds.length; k++) {
    var courtId = courtIds[k];
    var court = courtsMap[courtId];
    var isDown = court.status === "maintenance";
    var courtImg = court.image
      ? db.imageUrl(court.image)
      : courtPlaceholders[k % courtPlaceholders.length];
    var courtImgFallback = courtPlaceholders[k % courtPlaceholders.length];
    var borderColor = borderColors[k % borderColors.length];
    var courtNameHtml = escapeHtml(court.name || "");
    var courtNameSafe = (court.name || "").replace(/'/g, "\\'");

    // Count available slots for this court
    var courtAvail = 0;
    for (var m = 0; m < court.slots.length; m++) {
      if (!court.slots[m].isBooked) courtAvail++;
    }
    var courtTotal = court.slots.length;

    // Court card header
    html +=
      '<div class="court-card"' +
      (isDown ? ' style="opacity: 0.6;"' : "") +
      ">";
    html += '<div class="court-card-header">';
    html +=
      '<img src="' +
      courtImg +
      '" alt="' +
      courtNameHtml +
      '" onerror="this.onerror=null;this.src=\'' +
      courtImgFallback +
      '\';" style="width:100%;height:160px;object-fit:cover;">';
    var priceLine =
      court.discountPercent > 0
        ? '<span style="text-decoration:line-through;opacity:.7;margin-right:6px;">EGP ' +
          court.pricePerHour +
          "</span>" +
          '<span style="color:var(--optic-yellow);font-weight:700;">EGP ' +
          court.effectivePrice +
          "</span>" +
          " (" +
          court.discountPercent +
          "% " +
          (window.i18n ? window.i18n.t("courts.off") : "off") +
          ")"
        : "EGP " + court.pricePerHour;

    html +=
      '<div class="court-card-overlay"><h3 style="font-size:1.2rem;color:#fff;">' +
      courtNameHtml +
      "</h3>" +
      '<p style="font-size:0.85rem;color:#fff;margin:2px 0 0;">' +
      priceLine +
      " / 90 min</p>";

    // Badge showing court availability
    if (isDown) {
      html +=
        '<span class="badge badge-maintenance">' +
        (window.i18n ? window.i18n.t("book.outOfService") : "Out of Service") +
        "</span>";
    } else if (courtTotal > 0) {
      html +=
        '<span class="badge badge-active">' +
        courtAvail +
        "/" +
        courtTotal +
        " " +
        (window.i18n ? window.i18n.t("book.free") : "free") +
        "</span>";
    } else {
      html +=
        '<span class="badge badge-maintenance">' +
        (window.i18n ? window.i18n.t("book.noSlots") : "No slots") +
        "</span>";
    }

    html += "</div></div>";
    html +=
      '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 0.75rem 1.25rem 0;">' +
      escapeHtml(court.description || "") +
      "</p>";
    html += '<div class="slot-grid" style="padding: 0 1.25rem 1.25rem;">';

    // Slot buttons
    if (court.slots.length === 0) {
      html +=
        '<div class="text-center" style="padding:1rem;width:100%;"><p style="color:var(--text-muted);font-size:0.85rem;">' +
        (window.i18n
          ? window.i18n.t("book.noSlots")
          : "No slots for this date.") +
        "</p></div>";
    } else {
      for (var n = 0; n < court.slots.length; n++) {
        var s = court.slots[n];
        var stateClass, stateText, clickHandler;

        if (isDown) {
          // Court is under maintenance
          stateClass = "maintenance";
          stateText = window.i18n
            ? window.i18n.t("book.outOfService")
            : "Out of Service";
          clickHandler = "";
        } else if (!s.isBooked) {
          // Slot is available to book
          stateClass = "available";
          stateText =
            '<span style="font-size:0.75rem;color:var(--text-muted);display:block;margin-bottom:2px;">' +
            s.timeBlock +
            "</span>" +
            '<span style="color:var(--optic-yellow);font-weight:800;">' +
            (window.i18n ? window.i18n.t("book.smashIt") : "SMASH IT") +
            "</span>";
          clickHandler =
            "onclick=\"bookSlot('" +
            s._id +
            "', '" +
            courtNameSafe +
            "', '" +
            s.timeBlock +
            "', '" +
            date +
            "', " +
            (court.effectivePrice || 0) +
            ')"';
        } else if (s.bookedBy && s.bookedBy._id === user.id) {
          // This is the current user's own booking
          stateClass = "booked-self";
          stateText =
            '<span style="font-size:0.75rem;color:rgba(255,255,255,0.6);display:block;margin-bottom:2px;">' +
            s.timeBlock +
            "</span>" +
            (window.i18n ? window.i18n.t("book.yourBooking") : "Your Booking");
          clickHandler = "onclick=\"cancelSlot('" + s._id + "')\"";
        } else {
          // Slot is booked by someone else
          stateClass = "booked-other";
          stateText =
            '<span style="font-size:0.75rem;display:block;margin-bottom:2px;">' +
            s.timeBlock +
            "</span>" +
            (window.i18n ? window.i18n.t("book.courtInUse") : "Court in Use");
          clickHandler = "";
        }

        html +=
          '<div class="slot ' +
          stateClass +
          '" ' +
          clickHandler +
          ">" +
          stateText +
          "</div>";
      }
    }

    html += "</div></div>";
  }

  container.innerHTML = html;
}
