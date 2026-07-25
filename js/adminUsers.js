// Track current page and which passwords are currently revealed
var usersPage = 1;
var USERS_PER_PAGE = 10;
var revealedPasswords = {};

document.addEventListener('DOMContentLoaded', function() {
  auth.checkAuth('admin');
  fetchUsers(1);
});

// Fetch and display users
function fetchUsers(page) {
  usersPage = page || 1;
  var tbody = document.getElementById('users-table-body');
  tbody.innerHTML = '<tr><td colspan="7" class="text-center"><div class="spinner" style="margin: 0 auto;"></div></td></tr>';

  try {
    var result = db.getUsers(usersPage, USERS_PER_PAGE);
    var users = result.data;
    var pagination = result.pagination;
    var me = auth.getUser();

    if (users.length === 0 && usersPage === 1) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">' + (window.i18n ? window.i18n.t('users.noUsers') : 'No users found.') + '</td></tr>';
      return;
    }

    var rows = '';
    for (var i = 0; i < users.length; i++) {
      var u = users[i];
      var isSelf = u._id === me.id;
      var isAdmin = u.role === 'admin';

      var roleBadgeClass = isAdmin ? 'badge-admin' : 'badge-member';
      var roleLabel = isAdmin ? (window.i18n ? window.i18n.t('nav.admin') : 'Admin') : (window.i18n ? window.i18n.t('users.member') : 'Member');

      var isRevealed = !!revealedPasswords[u._id];
      var passwordDisplay = isRevealed ? escapeHtml(u.password) : '••••••••';
      var toggleLabel = isRevealed ? (window.i18n ? window.i18n.t('users.hide') : 'Hide') : (window.i18n ? window.i18n.t('users.show') : 'Show');

      var joined = u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-';

      var roleBtnHtml = isSelf
        ? ''
        : '<button class="btn btn-outline" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="toggleUserRole(\'' + u._id + '\', \'' + u.role + '\')">' +
          (isAdmin ? (window.i18n ? window.i18n.t('users.makeMember') : 'Make Member') : (window.i18n ? window.i18n.t('users.makeAdmin') : 'Make Admin')) +
          '</button>';

      var deleteBtnHtml = isSelf
        ? ''
        : '<button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="deleteUserAccount(\'' + u._id + '\', \'' + escapeHtml(u.name).replace(/'/g, "\\'") + '\')">' + (window.i18n ? window.i18n.t('users.delete') : 'Delete') + '</button>';

      rows += '<tr>' +
        '<td>' + escapeHtml(u.name) + (isSelf ? ' <span style="color: var(--text-muted); font-size: 0.75rem;">(' + (window.i18n ? window.i18n.t('users.you') : 'you') + ')</span>' : '') + '</td>' +
        '<td style="color: var(--text-muted);">' + escapeHtml(u.email) + '</td>' +
        '<td><span class="user-password" style="font-family: monospace;">' + passwordDisplay + '</span> ' +
          '<button class="btn btn-outline" style="padding: 0.15rem 0.5rem; font-size: 0.75rem;" onclick="togglePasswordVisible(\'' + u._id + '\')">' + toggleLabel + '</button></td>' +
        '<td><span class="badge ' + roleBadgeClass + '">' + roleLabel + '</span></td>' +
        '<td>' + joined + '</td>' +
        '<td class="text-center">' + u.activeBookings + '</td>' +
        '<td><div class="d-flex" style="gap: 8px; flex-wrap: wrap;">' +
          '<button class="btn btn-outline" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="openChangePassword(\'' + u._id + '\', \'' + escapeHtml(u.name).replace(/'/g, "\\'") + '\')">' + (window.i18n ? window.i18n.t('users.changePassword') : 'Change Password') + '</button>' +
          roleBtnHtml +
          deleteBtnHtml +
        '</div></td>' +
        '</tr>';
    }
    tbody.innerHTML = rows;

    if (pagination && pagination.totalPages > 1) {
      renderPagination('users-pagination', pagination, function(p) { fetchUsers(p); });
    } else {
      var pagEl = document.getElementById('users-pagination');
      if (pagEl) pagEl.innerHTML = '';
    }
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center" style="color: var(--danger);">Failed to load users.</td></tr>';
  }
}

// Show or hide a single user's plaintext password
function togglePasswordVisible(id) {
  revealedPasswords[id] = !revealedPasswords[id];
  fetchUsers(usersPage);
}

// Open a modal to set a new password for a user
function openChangePassword(id, name) {
  var title = window.i18n ? window.i18n.t('users.changePassword') : 'Change Password';
  var msg = '<p style="margin-bottom: 10px;">' + (window.i18n ? window.i18n.t('users.newPasswordFor', { name: name }) : 'New password for <strong>' + name + '</strong>') + '</p>' +
    '<div class="form-group" style="margin-bottom: 0;">' +
    '<input type="password" id="modal-new-password" placeholder="At least 6 characters, with a number">' +
    '</div>';

  auth.showModal(title, msg, function() {
    var input = document.getElementById('modal-new-password');
    var rules = validationRules.password;
    if (!validateField(input, rules)) return false;

    var result = db.updateUser(id, { password: input.value });
    if (!result.ok) { auth.showToast(result.message, 'error'); return false; }
    auth.showToast(window.i18n ? window.i18n.t('users.passwordChanged') : 'Password updated');
    fetchUsers(usersPage);
  });
}

// Promote/demote a user between member and admin
function toggleUserRole(id, currentRole) {
  var newRole = currentRole === 'admin' ? 'member' : 'admin';
  var title = window.i18n ? window.i18n.t('users.changeRole') : 'Change Role';
  var msg = newRole === 'admin'
    ? (window.i18n ? window.i18n.t('users.confirmMakeAdmin') : 'Give this user administrator access?')
    : (window.i18n ? window.i18n.t('users.confirmMakeMember') : 'Remove administrator access from this user?');

  auth.showModal(title, msg, function() {
    var me = auth.getUser();
    var result = db.updateUser(id, { role: newRole }, me.id);
    if (!result.ok) { auth.showToast(result.message, 'error'); return false; }
    auth.showToast(window.i18n ? window.i18n.t('users.roleChanged') : 'Role updated');
    fetchUsers(usersPage);
  });
}

// Delete a user account after confirmation
function deleteUserAccount(id, name) {
  var title = window.i18n ? window.i18n.t('users.deleteAccount') : 'Delete Account';
  var msg = window.i18n ? window.i18n.t('users.deleteAccountMsg', { name: name }) : 'Delete <strong>' + name + '</strong>\'s account? Any courts they currently have booked will be freed up. This cannot be undone.';

  auth.showModal(title, msg, function() {
    var me = auth.getUser();
    var result = db.deleteUser(id, me.id);
    if (!result.ok) { auth.showToast(result.message, 'error'); return false; }
    auth.showToast(window.i18n ? window.i18n.t('users.accountDeleted') : 'Account deleted');
    delete revealedPasswords[id];
    fetchUsers(usersPage);
  });
}

// Escape a string for safe insertion into innerHTML
function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}
