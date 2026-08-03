// Keep the settings page small: load the user once, then save each form.
document.addEventListener('DOMContentLoaded', function () {

    auth.checkAuth('member');

    var user = auth.getUser();

    if (!user) return;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
<<<<<<< HEAD
    name.value = user.fullName;
    email.value = user.email;

    // Persist the updated user object returned by the API and refresh the form
    function applyUpdatedUser(updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        user = updatedUser;
        name.value = user.fullName;
        email.value = user.email;
=======

    name.value = user.fullName || user.name;
    email.value = user.email;

    async function save(data, success) {

        var result = await db.updateProfile(data);

        if (!result.ok) {
            auth.showToast(result.message, 'error');
            return false;
        }

        // Update localStorage without logging the user out
        if (result.data && result.data.user) {

           const currentToken = localStorage.getItem("token");

if (currentToken && currentToken !== "undefined") {
    auth.saveAuth({
        token: currentToken,
        user: result.data.user
    });


            user = result.data.user;

            name.value = user.fullName;
            email.value = user.email;
        }

        auth.showToast(success);

        return true;
>>>>>>> 906d52d (Implement authentication and authorization)
    }

    document.getElementById('profile-form').addEventListener('submit', function (event) {

        event.preventDefault();
<<<<<<< HEAD
        api.put('/users/profile', { fullName: name.value, email: email.value })
            .then(function (result) {
                applyUpdatedUser(result.user);
                auth.showToast('Profile saved');
            })
            .catch(function (err) {
                auth.showToast(err.message, 'error');
            });
=======

        save({
            fullName: name.value.trim(),
            email: email.value.trim()
        }, 'Profile updated successfully.');

>>>>>>> 906d52d (Implement authentication and authorization)
    });

    document.getElementById('password-form').addEventListener('submit', function (event) {

        event.preventDefault();

        var current = document.getElementById('current-password').value;
        var next = document.getElementById('new-password').value;
        var confirm = document.getElementById('confirm-password').value;
<<<<<<< HEAD
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
=======

        if (next !== confirm) {
            auth.showToast('New passwords do not match.', 'error');
            return;
        }

        save({
            fullName: name.value.trim(),
            email: email.value.trim(),
            currentPassword: current,
            newPassword: next
        }, 'Password updated successfully.')
        .then(function (saved) {

            if (saved) {
                event.target.reset();
            }

        });

>>>>>>> 906d52d (Implement authentication and authorization)
    });

    document.getElementById('theme-button').addEventListener('click', auth.toggleTheme);

}});
