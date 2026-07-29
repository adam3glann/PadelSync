// Database key and version for localStorage
var DB_KEY = 'padelsync_db';
var DB_VERSION = 4;
var COURT_PRICE = 300;

// All 90-minute time blocks
var TIME_BLOCKS = [
  "09:00 - 10:30",
  "10:30 - 12:00",
  "12:00 - 13:30",
  "16:30 - 18:00",
  "18:00 - 19:30",
  "19:30 - 21:00"
];

// Generate a random ID
function genId() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
}

// Get today's date as a string (YYYY-MM-DD)
function todayStr() {
  var today = new Date();
  return today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
}

// Load the database from localStorage
function getDB() {
  try {
    var raw = localStorage.getItem(DB_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed._version === DB_VERSION) {
        // Keep the booking window rolling: top up any missing slots
        // for the next 7 days on every load, so it never runs dry.
        if (ensureUpcomingSlots(parsed)) saveDB(parsed);
        return parsed;
      }
    }
  } catch (e) { }
  return seedDB();
}

// Make sure every active court has slots for today through the next 6 days.
// Returns true if any slots were added.
function ensureUpcomingSlots(db) {
  var existing = {};
  for (var i = 0; i < db.slots.length; i++) {
    var s = db.slots[i];
    existing[s.courtId + '|' + s.date + '|' + s.timeBlock] = true;
  }

  var changed = false;
  for (var c = 0; c < db.courts.length; c++) {
    if (db.courts[c].status !== 'active') continue;
    var courtId = db.courts[c]._id;

    for (var i2 = 0; i2 < 7; i2++) {
      var d = new Date();
      d.setDate(d.getDate() + i2);
      var dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

      for (var t = 0; t < TIME_BLOCKS.length; t++) {
        var key = courtId + '|' + dateStr + '|' + TIME_BLOCKS[t];
        if (!existing[key]) {
          db.slots.push({ _id: genId(), courtId: courtId, date: dateStr, timeBlock: TIME_BLOCKS[t], isBooked: false, bookedBy: null, bookedAt: null, equipment: 'None', payment: null });
          existing[key] = true;
          changed = true;
        }
      }
    }
  }
  return changed;
}

// Save the database to localStorage
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// Create initial/seed data for the database
function seedDB() {
  var db = {
    _version: DB_VERSION,
    users: [],
    courts: [],
    slots: [],
    cancellations: [],
    nextId: 1000
  };

  // Add default users
  db.users.push(
    { _id: genId(), name: 'Club Manager', email: 'admin@padelsync.com', password: 'admin123', role: 'admin', createdAt: new Date().toISOString() },
    { _id: genId(), name: 'Ali Hassan', email: 'ali@example.com', password: 'member123', role: 'member', createdAt: new Date().toISOString() },
    { _id: genId(), name: 'Sara Ahmed', email: 'sara@example.com', password: 'member123', role: 'member', createdAt: new Date().toISOString() }
  );

  // Add default courts
  var courts = [
    { _id: genId(), name: 'Court 1', description: 'Indoor glass court, premium artificial turf', status: 'active', image: '../assets/court-1.jpg', createdAt: new Date().toISOString() },
    { _id: genId(), name: 'Court 2', description: 'Indoor standard court with LED lighting', status: 'active', image: '../assets/court-2.jpg', createdAt: new Date().toISOString() },
    { _id: genId(), name: 'Court 3', description: 'Outdoor panoramic court, windscreens installed', status: 'active', image: '../assets/court-3.jpg', createdAt: new Date().toISOString() }
  ];
  db.courts = courts;

  // Generate slots for the next 7 days
  var slots = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() + i);
    var dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

    for (var c = 0; c < courts.length; c++) {
      for (var t = 0; t < TIME_BLOCKS.length; t++) {
        slots.push({
          _id: genId(),
          courtId: courts[c]._id,
          date: dateStr,
          timeBlock: TIME_BLOCKS[t],
          isBooked: false,
          bookedBy: null,
          bookedAt: null,
          equipment: 'None',
          payment: null
        });
      }
    }
  }
  db.slots = slots;

  saveDB(db);
  return db;
}

// Reset the database
function resetDB() {
  localStorage.removeItem(DB_KEY);
  return getDB();
}

// Find a user by email
function findUser(email) {
  var db = getDB();
  for (var i = 0; i < db.users.length; i++) {
    if (db.users[i].email === email) return db.users[i];
  }
  return null;
}

// Login function
function dbLogin(email, password) {
  var user = findUser(email);
  if (!user) return { ok: false, message: 'Invalid credentials' };
  if (user.password !== password) return { ok: false, message: 'Invalid credentials' };
  return {
    ok: true,
    data: {
      token: 'fake_token_' + user._id,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    }
  };
}

// Register a new user
function dbRegister(name, email, password) {
  var existing = findUser(email);
  if (existing) return { ok: false, message: 'User already exists with this email' };
  var db = getDB();
  var user = { _id: genId(), name: name, email: email, password: password, role: 'member', createdAt: new Date().toISOString() };
  db.users.push(user);
  saveDB(db);
  return {
    ok: true,
    data: {
      token: 'fake_token_' + user._id,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    }
  };
}

// Reset password
function dbResetPassword(email, newPassword) {
  var db = getDB();
  for (var i = 0; i < db.users.length; i++) {
    if (db.users[i].email === email) {
      if (db.users[i].password === newPassword) {
        return { ok: false, errorType: 'same_password', message: 'You already used this password' };
      }
      db.users[i].password = newPassword;
      saveDB(db);
      return { ok: true, message: 'Password reset successfully' };
    }
  }
  return { ok: false, errorType: 'not_found', message: 'User not found' };
}


// Get a user by ID
function dbGetUser(userId) {
  var db = getDB();
  for (var i = 0; i < db.users.length; i++) {
    if (db.users[i]._id === userId) {
      var u = db.users[i];
      return { id: u._id, name: u.name, email: u.email, role: u.role };
    }
  }
  return null;
}

// Get all courts with pagination
function dbGetCourts(page, limit) {
  var db = getDB();
  var all = db.courts;
  var total = all.length;
  page = page || 1;
  limit = limit || 50;
  var start = (page - 1) * limit;
  var data = all.slice(start, start + limit);
  return { data: data, pagination: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) } };
}

// Get only active courts
function dbGetAllActiveCourts() {
  var db = getDB();
  var active = [];
  for (var i = 0; i < db.courts.length; i++) {
    if (db.courts[i].status === 'active') {
      active.push(db.courts[i]);
    }
  }
  return active;
}

// Create a new court and automatically generate its time slots for the next 7 days
function dbCreateCourt(name, description, image) {
  var db = getDB();
  var court = { _id: genId(), name: name, description: description || '', status: 'active', image: image || null, createdAt: new Date().toISOString() };
  db.courts.push(court);
  ensureUpcomingSlots(db);
  saveDB(db);
  return { ok: true, court: court };
}

// Update a court's data
function dbUpdateCourt(id, data) {
  var db = getDB();
  for (var i = 0; i < db.courts.length; i++) {
    if (db.courts[i]._id === id) {
      if (data.status) db.courts[i].status = data.status;
      if (data.name) db.courts[i].name = data.name;
      if (data.description !== undefined) db.courts[i].description = data.description;
      if (data.image !== undefined) db.courts[i].image = data.image;
      saveDB(db);
      return { ok: true, court: db.courts[i] };
    }
  }
  return { ok: false, message: 'Court not found' };
}

// Delete a court and all its slots
function dbDeleteCourt(id) {
  var db = getDB();
  var found = false;
  var newCourts = [];
  for (var i = 0; i < db.courts.length; i++) {
    if (db.courts[i]._id === id) {
      found = true;
    } else {
      newCourts.push(db.courts[i]);
    }
  }
  db.courts = newCourts;

  var newSlots = [];
  for (var j = 0; j < db.slots.length; j++) {
    if (db.slots[j].courtId !== id) {
      newSlots.push(db.slots[j]);
    }
  }
  db.slots = newSlots;

  saveDB(db);
  return { ok: found, message: found ? 'Deleted' : 'Court not found' };
}

// Get all slots for a specific date
function dbGetSlots(date) {
  var db = getDB();

  // Build court and user lookup maps
  var courtMap = {};
  for (var i = 0; i < db.courts.length; i++) {
    courtMap[db.courts[i]._id] = db.courts[i];
  }
  var userMap = {};
  for (var j = 0; j < db.users.length; j++) {
    userMap[db.users[j]._id] = db.users[j];
  }

  // Filter slots by date and add court/user info
  var slots = [];
  for (var k = 0; k < db.slots.length; k++) {
    if (db.slots[k].date !== date) continue;
    var s = db.slots[k];
    var court = courtMap[s.courtId] || { _id: s.courtId, name: 'Unknown', description: '', status: 'active', image: null };
    var user = s.bookedBy ? userMap[s.bookedBy] : null;
    slots.push({
      _id: s._id,
      courtId: { _id: court._id, name: court.name, description: court.description, status: court.status, image: court.image },
      date: s.date,
      timeBlock: s.timeBlock,
      isBooked: s.isBooked,
      bookedBy: user ? { _id: user._id, name: user.name, email: user.email } : null,
      bookedAt: s.bookedAt,
      equipment: s.equipment,
      payment: s.payment || null
    });
  }

  slots.sort(function (a, b) { return a.timeBlock.localeCompare(b.timeBlock); });
  return slots;
}

// Get all bookings (admin view) with optional date filter and pagination
function dbGetAllBookings(date, page, limit) {
  var db = getDB();

  // Build lookup maps
  var courtMap = {};
  for (var i = 0; i < db.courts.length; i++) {
    courtMap[db.courts[i]._id] = db.courts[i];
  }
  var userMap = {};
  for (var j = 0; j < db.users.length; j++) {
    userMap[db.users[j]._id] = db.users[j];
  }

  // Filter to booked slots
  var all = [];
  for (var k = 0; k < db.slots.length; k++) {
    var s = db.slots[k];
    if (!s.isBooked) continue;
    if (date && s.date !== date) continue;
    var court = courtMap[s.courtId] || { _id: s.courtId, name: 'Unknown' };
    var user = s.bookedBy ? userMap[s.bookedBy] : null;
    all.push({
      _id: s._id,
      courtId: { _id: court._id, name: court.name, description: court.description },
      date: s.date,
      timeBlock: s.timeBlock,
      isBooked: s.isBooked,
      bookedBy: user ? { _id: user._id, name: user.name, email: user.email } : null,
      bookedAt: s.bookedAt,
      equipment: s.equipment,
      payment: s.payment || null
    });
  }

  all.sort(function (a, b) { return (a.date + a.timeBlock).localeCompare(b.date + b.timeBlock); });

  page = page || 1;
  limit = limit || 20;
  var total = all.length;
  var start = (page - 1) * limit;
  return { data: all.slice(start, start + limit), pagination: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) } };
}

// Get bookings for a specific member with pagination
function dbGetMyBookings(userId, page, limit) {
  var db = getDB();

  var courtMap = {};
  for (var i = 0; i < db.courts.length; i++) {
    courtMap[db.courts[i]._id] = db.courts[i];
  }

  var all = [];
  for (var j = 0; j < db.slots.length; j++) {
    var s = db.slots[j];
    if (!s.isBooked || s.bookedBy !== userId) continue;
    var court = courtMap[s.courtId] || { _id: s.courtId, name: 'Unknown' };
    all.push({
      _id: s._id,
      courtId: { _id: court._id, name: court.name, description: court.description },
      date: s.date,
      timeBlock: s.timeBlock,
      isBooked: true,
      bookedAt: s.bookedAt,
      equipment: s.equipment,
      payment: s.payment || null
    });
  }

  all.sort(function (a, b) { return (a.date + a.timeBlock).localeCompare(b.date + b.timeBlock); });

  page = page || 1;
  limit = limit || 20;
  var total = all.length;
  var start = (page - 1) * limit;
  return { data: all.slice(start, start + limit), pagination: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) } };
}

// Book a slot
function dbBookSlot(slotId, userId, equipment, payment) {
  var db = getDB();
  for (var i = 0; i < db.slots.length; i++) {
    if (db.slots[i]._id === slotId) {
      if (db.slots[i].isBooked) return { ok: false, message: 'This slot is already booked' };

      // Check if court is in maintenance
      var court = null;
      for (var j = 0; j < db.courts.length; j++) {
        if (db.courts[j]._id === db.slots[i].courtId) {
          court = db.courts[j];
          break;
        }
      }
      if (court && court.status === 'maintenance') return { ok: false, message: 'This court is currently out of service' };

      // The payment object contains only booking amounts. Card details are never saved.
      if (!payment || payment.depositAmount !== COURT_PRICE / 2) {
        return { ok: false, message: 'The 50% reservation deposit is required' };
      }

      db.slots[i].isBooked = true;
      db.slots[i].bookedBy = userId;
      db.slots[i].bookedAt = new Date().toISOString();
      db.slots[i].equipment = equipment || 'None';
      db.slots[i].payment = {
        totalAmount: COURT_PRICE,
        depositAmount: COURT_PRICE / 2,
        cashAmount: COURT_PRICE / 2,
        paidAt: new Date().toISOString()
      };
      saveDB(db);
      return { ok: true, message: 'Deposit paid and court booked successfully!' };
    }
  }
  return { ok: false, message: 'Slot not found' };
}

// Cancel a slot booking
function dbCancelSlot(slotId, userId, userRole) {
  var db = getDB();
  for (var i = 0; i < db.slots.length; i++) {
    if (db.slots[i]._id === slotId) {
      if (!db.slots[i].isBooked) return { ok: false, message: 'This slot is not booked' };
      if (db.slots[i].bookedBy !== userId && userRole !== 'admin') return { ok: false, message: 'You can only cancel your own bookings' };
      var payment = db.slots[i].payment;
      var refundAmount = 0;
      if (payment && db.slots[i].bookedAt) {
        var hoursSinceBooking = (new Date().getTime() - new Date(db.slots[i].bookedAt).getTime()) / 3600000;
        if (hoursSinceBooking <= 2) {
          refundAmount = payment.depositAmount;
        } else if (hoursSinceBooking <= 3) {
          refundAmount = payment.depositAmount * 0.25;
        }
      }

      // Keep a permanent cancellation record for the administrator dashboard.
      var cancelledCourt = null;
      var cancelledUser = null;
      for (var c = 0; c < db.courts.length; c++) {
        if (db.courts[c]._id === db.slots[i].courtId) cancelledCourt = db.courts[c];
      }
      for (var u = 0; u < db.users.length; u++) {
        if (db.users[u]._id === db.slots[i].bookedBy) cancelledUser = db.users[u];
      }
      db.cancellations.push({
        _id: genId(),
        slotId: db.slots[i]._id,
        courtName: cancelledCourt ? cancelledCourt.name : 'Unknown court',
        memberName: cancelledUser ? cancelledUser.name : 'Unknown member',
        memberEmail: cancelledUser ? cancelledUser.email : '',
        date: db.slots[i].date,
        timeBlock: db.slots[i].timeBlock,
        depositAmount: payment ? payment.depositAmount : 0,
        refundAmount: refundAmount,
        retainedAmount: payment ? payment.depositAmount - refundAmount : 0,
        cancelledAt: new Date().toISOString(),
        cancelledBy: userRole
      });

      db.slots[i].isBooked = false;
      db.slots[i].bookedBy = null;
      db.slots[i].bookedAt = null;
      db.slots[i].equipment = 'None';
      db.slots[i].payment = null;
      saveDB(db);
      return { ok: true, refundAmount: refundAmount, message: refundAmount > 0 ? 'Booking cancelled. Refund: EGP ' + refundAmount : 'Booking cancelled. The deposit is not refundable after 3 hours.' };
    }
  }
  return { ok: false, message: 'Slot not found' };
}

// Get all users with pagination, including how many active bookings each has
function dbGetUsers(page, limit) {
  var db = getDB();

  var activeCounts = {};
  for (var i = 0; i < db.slots.length; i++) {
    if (db.slots[i].isBooked && db.slots[i].bookedBy) {
      activeCounts[db.slots[i].bookedBy] = (activeCounts[db.slots[i].bookedBy] || 0) + 1;
    }
  }

  var all = [];
  for (var j = 0; j < db.users.length; j++) {
    var u = db.users[j];
    all.push({
      _id: u._id,
      name: u.name,
      email: u.email,
      password: u.password,
      role: u.role,
      createdAt: u.createdAt,
      activeBookings: activeCounts[u._id] || 0
    });
  }

  all.sort(function (a, b) { return (a.createdAt || '').localeCompare(b.createdAt || ''); });

  page = page || 1;
  limit = limit || 20;
  var total = all.length;
  var start = (page - 1) * limit;
  return { data: all.slice(start, start + limit), pagination: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) } };
}

// Update a user's name, email, password, or role
function dbUpdateUser(id, data, actingUserId) {
  var db = getDB();
  for (var i = 0; i < db.users.length; i++) {
    if (db.users[i]._id !== id) continue;

    if (data.email !== undefined && data.email !== db.users[i].email) {
      for (var e = 0; e < db.users.length; e++) {
        if (db.users[e]._id !== id && db.users[e].email === data.email) {
          return { ok: false, message: 'Another user already has this email' };
        }
      }
      db.users[i].email = data.email;
    }

    if (data.name !== undefined) db.users[i].name = data.name;
    if (data.password !== undefined) db.users[i].password = data.password;

    if (data.role !== undefined && data.role !== db.users[i].role) {
      if (id === actingUserId) return { ok: false, message: 'You cannot change your own role' };
      if (db.users[i].role === 'admin' && data.role !== 'admin') {
        var otherAdmins = 0;
        for (var a = 0; a < db.users.length; a++) {
          if (db.users[a].role === 'admin' && db.users[a]._id !== id) otherAdmins++;
        }
        if (otherAdmins === 0) return { ok: false, message: 'There must be at least one administrator' };
      }
      db.users[i].role = data.role;
    }

    saveDB(db);
    return { ok: true, user: { id: db.users[i]._id, name: db.users[i].name, email: db.users[i].email, role: db.users[i].role } };
  }
  return { ok: false, message: 'User not found' };
}

// Update the signed-in member's own details. Password changes require the current password.
function dbUpdateProfile(id, data) {
  var db = getDB();
  var user = null;
  for (var i = 0; i < db.users.length; i++) {
    if (db.users[i]._id === id) user = db.users[i];
  }
  if (!user) return { ok: false, message: 'User not found' };

  var name = (data.name || '').trim();
  var email = (data.email || '').trim().toLowerCase();
  if (name.length < 2) return { ok: false, message: 'Name must be at least 2 characters' };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, message: 'Enter a valid email address' };

  for (var j = 0; j < db.users.length; j++) {
    if (db.users[j]._id !== id && db.users[j].email === email) return { ok: false, message: 'Another user already has this email' };
  }

  if (data.newPassword) {
    if (user.password !== data.currentPassword) return { ok: false, message: 'Your current password is incorrect' };
    if (data.newPassword.length < 6) return { ok: false, message: 'New password must be at least 6 characters' };
    user.password = data.newPassword;
  }

  user.name = name;
  user.email = email;
  saveDB(db);
  return { ok: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

// Delete a user account. Any courts they currently have booked are freed up.
function dbDeleteUser(id, actingUserId) {
  if (id === actingUserId) return { ok: false, message: 'You cannot delete your own account' };

  var db = getDB();
  var target = null;
  for (var i = 0; i < db.users.length; i++) {
    if (db.users[i]._id === id) target = db.users[i];
  }
  if (!target) return { ok: false, message: 'User not found' };

  if (target.role === 'admin') {
    var otherAdmins = 0;
    for (var a = 0; a < db.users.length; a++) {
      if (db.users[a].role === 'admin' && db.users[a]._id !== id) otherAdmins++;
    }
    if (otherAdmins === 0) return { ok: false, message: 'There must be at least one administrator' };
  }

  // Free up any slots this user currently has booked
  for (var s = 0; s < db.slots.length; s++) {
    if (db.slots[s].isBooked && db.slots[s].bookedBy === id) {
      db.slots[s].isBooked = false;
      db.slots[s].bookedBy = null;
      db.slots[s].bookedAt = null;
      db.slots[s].equipment = 'None';
      db.slots[s].payment = null;
    }
  }

  var newUsers = [];
  for (var u = 0; u < db.users.length; u++) {
    if (db.users[u]._id !== id) newUsers.push(db.users[u]);
  }
  db.users = newUsers;

  saveDB(db);
  return { ok: true, message: 'User deleted' };
}

// Get site statistics
function dbGetStats() {
  var db = getDB();
  var today = todayStr();
  var activeCourts = 0;
  for (var i = 0; i < db.courts.length; i++) {
    if (db.courts[i].status === 'active') activeCourts++;
  }
  var todayBookings = 0;
  var totalBookings = 0;
  var onlineDeposits = 0;
  var cashDue = 0;
  for (var j = 0; j < db.slots.length; j++) {
    if (db.slots[j].isBooked) {
      totalBookings++;
      if (db.slots[j].date === today) todayBookings++;
      if (db.slots[j].payment) {
        onlineDeposits += db.slots[j].payment.depositAmount;
        cashDue += db.slots[j].payment.cashAmount;
      }
    }
  }
  var totalMembers = 0;
  for (var k = 0; k < db.users.length; k++) {
    if (db.users[k].role === 'member') totalMembers++;
  }
  var refundTotal = 0;
  var retainedCancelledDeposits = 0;
  for (var m = 0; m < db.cancellations.length; m++) {
    refundTotal += db.cancellations[m].refundAmount;
    retainedCancelledDeposits += db.cancellations[m].retainedAmount;
  }
  return {
    totalCourts: db.courts.length,
    activeCourts: activeCourts,
    todayBookings: todayBookings,
    totalBookings: totalBookings,
    totalMembers: totalMembers,
    totalEarned: onlineDeposits + retainedCancelledDeposits,
    cashDue: cashDue,
    expectedRevenue: onlineDeposits + cashDue,
    cancelledCount: db.cancellations.length,
    refundTotal: refundTotal
  };
}

// Get cancelled reservations for the administrator record.
function dbGetCancellations() {
  var db = getDB();
  var records = db.cancellations.slice();
  records.sort(function (a, b) { return b.cancelledAt.localeCompare(a.cancelledAt); });
  return records;
}

// Expose all db functions to the global window object
window.db = {
  reset: resetDB,
  login: dbLogin,
  register: dbRegister,
  resetPassword: dbResetPassword,
  getUser: dbGetUser,
  getUsers: dbGetUsers,
  updateUser: dbUpdateUser,
  updateProfile: dbUpdateProfile,
  deleteUser: dbDeleteUser,
  getCourts: dbGetCourts,
  getAllActiveCourts: dbGetAllActiveCourts,
  createCourt: dbCreateCourt,
  updateCourt: dbUpdateCourt,
  deleteCourt: dbDeleteCourt,
  getSlots: dbGetSlots,
  getAllBookings: dbGetAllBookings,
  getMyBookings: dbGetMyBookings,
  bookSlot: dbBookSlot,
  cancelSlot: dbCancelSlot,
  getStats: dbGetStats,
  getCancellations: dbGetCancellations,
  courtPrice: COURT_PRICE,
  _getDB: getDB
};
