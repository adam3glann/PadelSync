// Keep the settings page small: load the user once, then save each form.
document.addEventListener('DOMContentLoaded', function () {
    auth.checkAuth('member');
    var user = auth.getUser();
    if (!user) return;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    name.value = user.fullName || user.name || '';
    email.value = user.email || '';

    async function save(data, success) {
        var result = await db.updateProfile(data);
        if (!result.ok) {
            auth.showToast(result.message, 'error');
            return false;
        }
        var updated = (result.data && result.data.user) ? result.data.user : user;
        localStorage.setItem('user', JSON.stringify(updated));
        user = updated;
        name.value = user.fullName || user.name || '';
        email.value = user.email || '';
        auth.showToast(success);
        return true;
    }

    document.getElementById('profile-form').addEventListener('submit', function (event) {
        event.preventDefault();
        save({ fullName: name.value, email: email.value }, 'Profile saved');
    });

    document.getElementById('password-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var current = document.getElementById('current-password').value;
        var next = document.getElementById('new-password').value;
        var confirm = document.getElementById('confirm-password').value;
        if (next !== confirm) return auth.showToast('New passwords do not match', 'error');
        save({ fullName: name.value, email: email.value, currentPassword: current, newPassword: next }, 'Password updated').then(function (saved) { if (saved) event.target.reset(); });
    });

    document.getElementById('theme-button').addEventListener('click', auth.toggleTheme);
});
