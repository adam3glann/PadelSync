// Keep the settings page small: load the user once, then save each form.
document.addEventListener('DOMContentLoaded', function () {
    auth.checkAuth('member');
    var user = auth.getUser();
    if (!user) return;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    name.value = user.name;
    email.value = user.email;

    function save(data, success) {
        var result = db.updateProfile(user.id, data);
        if (!result.ok) {
            auth.showToast(result.message, 'error');
            return false;
        }
        localStorage.setItem('user', JSON.stringify(result.user));
        user = result.user;
        auth.showToast(success);
        return true;
    }

    document.getElementById('profile-form').addEventListener('submit', function (event) {
        event.preventDefault();
        save({ name: name.value, email: email.value }, 'Profile saved');
    });

    document.getElementById('password-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var current = document.getElementById('current-password').value;
        var next = document.getElementById('new-password').value;
        var confirm = document.getElementById('confirm-password').value;
        if (next !== confirm) return auth.showToast('New passwords do not match', 'error');
        if (save({ name: name.value, email: email.value, currentPassword: current, newPassword: next }, 'Password updated')) event.target.reset();
    });

    document.getElementById('theme-button').addEventListener('click', auth.toggleTheme);
    document.getElementById('language-button').addEventListener('click', function () {
        localStorage.setItem('padelsync_lang', window.i18n.getLang() === 'ar' ? 'en' : 'ar');
        window.location.reload();
    });
});
