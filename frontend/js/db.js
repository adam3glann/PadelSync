var API_URL = 'https://padelsync-production.up.railway.app/api';
var UPLOADS_URL = 'https://padelsync-production.up.railway.app/uploads/';

async function request(path, options) {
  options = options || {};
  options.headers = options.headers || {};
  var token = localStorage.getItem('token');
  if (token) options.headers.Authorization = 'Bearer ' + token;
  if (!(options.body instanceof FormData) && options.body) options.headers['Content-Type'] = 'application/json';
  var response = await fetch(API_URL + path, options);
  var data = await response.json().catch(function () { return {}; });

  // A rejected token means the session is no longer valid: clear it and send
  // the user back to the login page. This is skipped when no token was stored
  // (e.g. a failed login attempt for a fresh visitor).
  if (response.status === 401 && localStorage.getItem('token')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    var loginPath = window.location.pathname.indexOf('/admin/') !== -1 || window.location.pathname.indexOf('/member/') !== -1
      ? '../login.html'
      : 'login.html';
    window.location.href = loginPath;
    throw new Error(data.message || 'Session expired.');
  }

  if (!response.ok) throw new Error(data.message || 'Request failed.');
  return data;
}

function result(task) {
  return task.then(function (data) { return { ok: true, data: data, message: data.message }; })
    .catch(function (error) { return { ok: false, message: error.message }; });
}

function splitSlot(slotId) {
  var parts = String(slotId).split('|');
  return { courtId: parts[0], date: parts[1], timeBlock: parts.slice(2).join('|') };
}

// Build a URL for a court image. Handles both bare filenames (new uploads) and
// legacy values that already carry a "/uploads/" or full http prefix.
function imageUrl(image) {
  if (!image) return '';
  if (/^https?:\/\//i.test(image)) return image;
  if (image.charAt(0) === '/') return 'http://localhost:3000' + image;
  return UPLOADS_URL + image;
}

window.db = {
  imageUrl: imageUrl,
  login: function (email, password) { return result(request('/auth/login', { method: 'POST', body: JSON.stringify({ email: email, password: password }) })); },
  register: function (name, email, password) { return result(request('/auth/register', { method: 'POST', body: JSON.stringify({ fullName: name, email: email, password: password }) })); },
  getCourts: function (page, limit) { return request('/courts?page=' + (page || 1) + '&limit=' + (limit || 50)); },
  getAllActiveCourts: function () { return request('/courts?page=1&limit=50').then(function (data) { return data.data.filter(function (court) { return court.status === 'active'; }); }); },
  createCourt: function (name, description, imageFile) { var form = new FormData(); form.append('name', name); form.append('description', description || ''); if (imageFile) form.append('image', imageFile); return result(request('/courts', { method: 'POST', body: form })); },
  updateCourt: function (id, data) { return result(request('/courts/' + id, { method: 'PUT', body: JSON.stringify(data) })); },
  deleteCourt: function (id) { return result(request('/courts/' + id, { method: 'DELETE' })); },
  getSlots: function (date) { return request('/bookings/slots?date=' + encodeURIComponent(date)); },
  bookSlot: function (slotId, equipment) { var slot = splitSlot(slotId); return result(request('/bookings', { method: 'POST', body: JSON.stringify({ courtId: slot.courtId, date: slot.date, timeBlock: slot.timeBlock, equipment: equipment }) })); },
  cancelSlot: function (id) { return result(request('/bookings/' + id + '/cancel', { method: 'PUT' })); },
  getMyBookings: function (page, limit) { return request('/bookings/mine?page=' + (page || 1) + '&limit=' + (limit || 20)); },
  getAllBookings: function (date, page, limit) { return request('/bookings?status=confirmed&date=' + encodeURIComponent(date || '') + '&page=' + (page || 1) + '&limit=' + (limit || 20)); },
  getCancellations: function () { return request('/bookings?status=cancelled&page=1&limit=50').then(function (data) { return data.data; }); },
  getUsers: function (page, limit) { return request('/users?page=' + (page || 1) + '&limit=' + (limit || 20)); },
  updateUser: function (id, data) { return result(request('/users/' + id, { method: 'PUT', body: JSON.stringify(data) })); },
  deleteUser: function (id) { return result(request('/users/' + id, { method: 'DELETE' })); },
  updateProfile: function (data) { return result(request('/users/profile', { method: 'PUT', body: JSON.stringify(data) })); },
  getStats: function () { return request('/bookings/stats'); },
  getWeather: function () { return request('/weather'); }
};
