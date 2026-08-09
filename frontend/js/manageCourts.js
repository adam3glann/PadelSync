// Track current page for court list
var courtsPage = 1;
var COURTS_PER_PAGE = 6;

document.addEventListener("DOMContentLoaded", function () {
  auth.checkAuth("admin");
  fetchCourts(1);

  // Validate court name field on blur
  var courtName = document.getElementById("court-name");
  if (courtName) {
    courtName.addEventListener("blur", function () {
      validateField(courtName, validationRules["court-name"]);
    });
    courtName.addEventListener("input", function () {
      courtName.style.borderColor = "";
      var err = courtName.parentElement.querySelector(".field-error");
      if (err) err.remove();
    });
  }

  // Handle new court form submission
  document
    .getElementById("create-court-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate court name field
      if (!validateForm(this, { "court-name": validationRules["court-name"] }))
        return;

      var name = document.getElementById("court-name").value;
      var description = document.getElementById("court-desc").value;
      var imageFile = document.getElementById("court-image").files[0];
      var price = document.getElementById("court-price").value;
      var discount = document.getElementById("court-discount").value;

      if (!name.trim()) return;

      doCreateCourt(name, description, imageFile, price, discount);
    });

  // Handle the "apply to all courts" bulk pricing form
  var bulkForm = document.getElementById("bulk-pricing-form");
  if (bulkForm) {
    bulkForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var price = document.getElementById("bulk-price").value;
      var discount = document.getElementById("bulk-discount").value;
      doBulkPricing(price, discount);
    });
  }
});

// Create the court and refresh the list
async function doCreateCourt(name, description, imageFile, price, discount) {
  var result = await db.createCourt(
    name,
    description,
    imageFile,
    price,
    discount,
  );
  if (!result.ok) {
    auth.showToast(result.message, "error");
    return;
  }
  auth.showToast(
    window.i18n ? window.i18n.t("toast.courtAdded") : "Court added",
  );
  document.getElementById("create-court-form").reset();
  fetchCourts(courtsPage);
}

// Apply a price and/or discount to every court in one call
async function doBulkPricing(price, discount) {
  if (
    (price === "" || price == null) &&
    (discount === "" || discount == null)
  ) {
    auth.showToast(
      window.i18n
        ? window.i18n.t("val.bulkPricingRequired")
        : "Enter a price and/or a discount to apply.",
      "error",
    );
    return;
  }
  if (discount !== "" && discount != null) {
    var d = Number(discount);
    if (!Number.isFinite(d) || d < 0 || d > 100) {
      auth.showToast(
        window.i18n
          ? window.i18n.t("val.discountInvalid")
          : "Discount must be between 0 and 100.",
        "error",
      );
      return;
    }
  }

  var result = await db.bulkUpdatePricing(price, discount);
  if (!result.ok) {
    auth.showToast(result.message, "error");
    return;
  }
  auth.showToast(
    window.i18n
      ? window.i18n.t("toast.bulkPriceApplied")
      : "Pricing applied to all courts",
  );
  document.getElementById("bulk-pricing-form").reset();
  fetchCourts(courtsPage);
}

// Open a small modal to edit one court's price and discount
function editCourtPricing(id, name, currentPrice, currentDiscount) {
  var tFn = window.i18n
    ? window.i18n.t.bind(window.i18n)
    : function (k) {
        return k;
      };
  var title = tFn("courts.editPrice") + " — " + escapeHtml(name);
  var modalHTML =
    '<div class="form-group">' +
    "<label>" +
    tFn("courts.price") +
    "</label>" +
    '<input type="number" id="edit-price-input" min="0" step="1" value="' +
    currentPrice +
    '">' +
    "</div>" +
    '<div class="form-group">' +
    "<label>" +
    tFn("courts.discount") +
    "</label>" +
    '<input type="number" id="edit-discount-input" min="0" max="100" step="1" value="' +
    (currentDiscount || 0) +
    '">' +
    "</div>";

  auth.showModal(title, modalHTML, function () {
    var priceVal = document.getElementById("edit-price-input").value;
    var discountVal = document.getElementById("edit-discount-input").value;
    var price = Number(priceVal);
    var discount = Number(discountVal);

    if (!Number.isFinite(price) || price < 0) {
      auth.showToast(
        tFn("val.priceInvalid") === "val.priceInvalid"
          ? "Enter a valid price."
          : tFn("val.priceInvalid"),
        "error",
      );
      return false;
    }
    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
      auth.showToast(
        tFn("val.discountInvalid") === "val.discountInvalid"
          ? "Discount must be between 0 and 100."
          : tFn("val.discountInvalid"),
        "error",
      );
      return false;
    }

    db.updateCourt(id, { pricePerHour: price, discountPercent: discount }).then(
      function (result) {
        if (!result.ok) {
          auth.showToast(result.message, "error");
          return;
        }
        auth.showToast(
          tFn("toast.priceUpdated") === "toast.priceUpdated"
            ? "Price updated"
            : tFn("toast.priceUpdated"),
        );
        fetchCourts(courtsPage);
      },
    );
  });
}

// Fetch and display courts with pagination
async function fetchCourts(page) {
  courtsPage = page;
  var list = document.getElementById("courts-list");
  list.innerHTML = '<div class="spinner"></div>';

  try {
    var result = await db.getCourts(page, COURTS_PER_PAGE);
    var courts = result.data;
    var pagination = result.pagination;

    // Show empty message if no courts
    if (courts.length === 0 && page === 1) {
      list.innerHTML =
        '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">' +
        (window.i18n ? window.i18n.t("courts.noCourts") : "No courts yet.") +
        "</p>";
      return;
    }

    // Build court cards
    var html = "";
    for (var i = 0; i < courts.length; i++) {
      var court = courts[i];
      var isActive = court.status === "active";
      var borderColor = isActive ? "var(--padel-blue)" : "var(--warning)";
      var badgeClass = isActive ? "badge-active" : "badge-maintenance";
      var statusLabel = isActive
        ? window.i18n
          ? window.i18n.t("courts.active")
          : "Active"
        : window.i18n
          ? window.i18n.t("courts.outOfService")
          : "Out of Service";
      var toggleLabel = isActive
        ? window.i18n
          ? window.i18n.t("courts.outOfService")
          : "Out of Service"
        : window.i18n
          ? window.i18n.t("courts.setActive")
          : "Set Active";
      var toggleStatus = isActive ? "maintenance" : "active";
      var deleteLabel = window.i18n ? window.i18n.t("courts.delete") : "Delete";
      var noImgLabel = window.i18n
        ? window.i18n.t("courts.noImage")
        : "No Image";
      var descText =
        court.description ||
        (window.i18n
          ? window.i18n.t("courts.noDescription")
          : "No description");
      var courtNameHtml = escapeHtml(court.name || "");
      var courtNameSafe = (court.name || "").replace(/'/g, "\\'");

      // Price / discount display
      var price = court.pricePerHour || 0;
      var discount = court.discountPercent || 0;
      var effectivePrice =
        court.effectivePrice !== undefined
          ? court.effectivePrice
          : Math.round(price * (1 - discount / 100) * 100) / 100;
      var priceHtml;
      if (discount > 0) {
        priceHtml =
          '<span style="text-decoration:line-through;color:var(--text-muted);margin-right:6px;">EGP ' +
          price +
          "</span>" +
          '<span style="color:var(--optic-yellow);font-weight:700;">EGP ' +
          effectivePrice +
          "</span>" +
          '<span class="badge badge-active" style="margin-left:6px;">' +
          discount +
          "% " +
          (window.i18n ? window.i18n.t("courts.off") : "off") +
          "</span>";
      } else {
        priceHtml = "EGP " + price;
      }

      var imgHtml;
      if (court.image) {
        imgHtml =
          '<img src="' +
          db.imageUrl(court.image) +
          '" alt="' +
          courtNameHtml +
          '" onerror="this.onerror=null;this.src=\'../assets/court-' +
          ((i % 3) + 1) +
          '.jpg\';" style="width:100%;height:160px;object-fit:cover;border-radius:var(--radius-sm) var(--radius-sm) 0 0;">';
      } else {
        imgHtml =
          '<div style="width:100%;height:160px;background:var(--frost);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:0.85rem;">' +
          noImgLabel +
          "</div>";
      }

      html +=
        '<div class="card" style="padding:0;overflow:hidden;border-left:3px solid ' +
        borderColor +
        ';">' +
        imgHtml +
        '<div style="padding:1.25rem;">' +
        '<div class="d-flex justify-between align-center mb-1">' +
        '<h3 style="color:var(--court-white);font-size:1.1rem;font-style:normal;">' +
        courtNameHtml +
        "</h3>" +
        '<span class="badge ' +
        badgeClass +
        '">' +
        statusLabel +
        "</span>" +
        "</div>" +
        '<p style="color:var(--text-muted);min-height:36px;font-size:0.9rem;">' +
        escapeHtml(descText) +
        "</p>" +
        '<p style="font-size:0.95rem;margin-bottom:0.5rem;">' +
        priceHtml +
        "</p>" +
        '<div class="d-flex justify-between mt-1" style="gap:10px;">' +
        '<button class="btn btn-outline" style="flex:1;" onclick="editCourtPricing(\'' +
        court._id +
        "', '" +
        courtNameSafe +
        "', " +
        price +
        ", " +
        discount +
        ')">' +
        (window.i18n ? window.i18n.t("courts.editPrice") : "Edit Price") +
        "</button>" +
        "</div>" +
        '<div class="d-flex justify-between mt-1" style="gap:10px;">' +
        '<button class="btn btn-outline" style="flex:1;" onclick="toggleStatus(\'' +
        court._id +
        "', '" +
        toggleStatus +
        "')\">" +
        toggleLabel +
        "</button>" +
        '<button class="btn btn-danger" style="padding:0.75rem;" onclick="deleteCourt(\'' +
        court._id +
        "', '" +
        courtNameSafe +
        "')\">" +
        deleteLabel +
        "</button>" +
        "</div>" +
        "</div>" +
        "</div>";
    }

    list.innerHTML = html;

    // Render pagination into the existing container, clearing it when there is only one page
    var pagEl = document.getElementById("courts-pagination");
    if (pagEl) {
      if (pagination && pagination.totalPages > 1) {
        renderPagination("courts-pagination", pagination, fetchCourts);
      } else {
        pagEl.innerHTML = "";
      }
    }
  } catch (error) {
    list.innerHTML =
      '<p class="text-center" style="color: var(--danger);">Failed to load courts.</p>';
  }
}

// Toggle a court between active and maintenance
async function toggleStatus(id, newStatus) {
  var result = await db.updateCourt(id, { status: newStatus });
  if (!result.ok) {
    auth.showToast(result.message, "error");
    return;
  }
  fetchCourts(courtsPage);
}

// Delete a court after confirmation
function deleteCourt(id, name) {
  var title = window.i18n ? window.i18n.t("modal.deleteCourt") : "Delete Court";
  var msg = window.i18n
    ? window.i18n.t("modal.deleteCourtMsg", { name: escapeHtml(name) })
    : "Delete <strong>" +
      escapeHtml(name) +
      "</strong> and all its time slots?";
  auth.showModal(title, msg, async function () {
    var result = await db.deleteCourt(id);
    if (!result.ok) {
      auth.showToast(result.message, "error");
      return;
    }
    auth.showToast(
      window.i18n ? window.i18n.t("toast.courtDeleted") : "Court deleted",
    );
    fetchCourts(courtsPage);
  });
}
