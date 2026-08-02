// Keep the settings page small: load the user once, then save each form.
document.addEventListener('DOMContentLoaded', function () {
    auth.checkAuth('member');
    var user = auth.getUser();
    if (!user) return;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    name.value = user.fullName;
    email.value = user.email;

    // Persist the updated user object returned by the API and refresh the form
    function applyUpdatedUser(updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        user = updatedUser;
        name.value = user.fullName;
        email.value = user.email;
    }

    document.getElementById('profile-form').addEventListener('submit', function (event) {
        event.preventDefault();
        api.put('/users/profile', { fullName: name.value, email: email.value })
            .then(function (result) {
                applyUpdatedUser(result.user);
                auth.showToast('Profile saved');
            })
            .catch(function (err) {
                auth.showToast(err.message, 'error');
            });
    });

    document.getElementById('password-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var current = document.getElementById('current-password').value;
        var next = document.getElementById('new-password').value;
        var confirm = document.getElementById('confirm-password').value;
        if (next !== confirm) return auth.showToast('New passwords do not match', 'error');

        api.put('/users/profile', { currentPassword: current, newPassword: next })
            .then(function (result) {
                applyUpdatedUser(result.user);
                auth.showToast('Password updated');
                event.target.reset();
            })
            .catch(function (err) {
                auth.showToast(err.message, 'error');
            });
    });

    document.getElementById('theme-button').addEventListener('click', auth.toggleTheme);
    document.getElementById('language-button').addEventListener('click', function () {
        localStorage.setItem('padelsync_lang', window.i18n.getLang() === 'ar' ? 'en' : 'ar');
        window.location.reload();
    });
});
