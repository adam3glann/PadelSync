// English-only text helper. Keeping page labels in one place makes them easy to edit.
var TEXT = {
  'nav.dashboard': 'Dashboard', 'nav.courts': 'Courts', 'nav.bookings': 'Bookings',
  'nav.bookCourt': 'Book Court', 'nav.reservations': 'Reservations', 'nav.logout': 'Logout',
  'nav.login': 'Login', 'nav.register': 'Register', 'nav.admin': 'Admin', 'nav.users': 'Users',
  'hero.title': 'The Glass Court', 'hero.subtitle': 'Reserve your padel court. Pre-order your gear. Walk in and smash it.',
  'hero.getStarted': 'Get Started', 'hero.login': 'Login', 'hero.goDashboard': 'Go to Dashboard',
  'hero.feature1Title': '90-Min Blocks', 'hero.feature1Desc': 'Fixed time slots. No overflows, no surprises. You get the court for a full match window.',
  'hero.feature2Title': 'Gear Ready', 'hero.feature2Desc': 'Order racquets and balls with your booking. Equipment prepared before you step on court.',
  'hero.feature3Title': 'No Double Bookings', 'hero.feature3Desc': 'The schedule checks each court and time block before saving a booking.',
  'footer.rights': 'All rights reserved.',
  'auth.welcomeBack': 'Welcome Back', 'auth.signInSubtitle': 'Sign in to your PadelSync account.',
  'auth.email': 'Email', 'auth.password': 'Password', 'auth.signIn': 'Sign In', 'auth.signingIn': 'Signing in...',
  'auth.noAccount': 'No account?', 'auth.joinTitle': 'Join PadelSync', 'auth.registerSubtitle': 'Create your account and start booking.',
  'auth.fullName': 'Full Name', 'auth.confirmPassword': 'Confirm Password', 'auth.createAccount': 'Create Account',
  'auth.creatingAccount': 'Creating account...', 'auth.hasAccount': 'Already a member?', 'auth.signInLink': 'Sign in',
  'auth.forgotPassword': 'Forgot Password?', 'auth.resetPasswordTitle': 'Reset Password', 'auth.resetPasswordSubtitle': 'Enter your email to set a new password.',
  'auth.newPassword': 'New Password', 'auth.resetAction': 'Reset Password', 'auth.backToLogin': 'Back to Login',
  'dash.welcomeBack': 'Welcome back', 'dash.smashIt': 'Smash It', 'dash.upcoming': 'Upcoming',
  'dash.activeCourts': 'Active Courts', 'dash.nextReservations': 'Next Reservations', 'dash.noUpcoming': 'No upcoming reservations.',
  'dash.bookACourt': 'Book a Court', 'admin.title': 'Admin Dashboard', 'admin.todaysBookings': "Today's Bookings",
  'admin.members': 'Members', 'admin.manageCourts': 'Manage Courts', 'admin.viewBookings': 'View Bookings',
  'courts.addNew': 'Add New Court', 'courts.name': 'Court Name', 'courts.description': 'Description',
  'courts.photo': 'Court Photo', 'courts.addCourt': 'Add Court', 'courts.title': 'Courts', 'courts.active': 'Active',
  'courts.outOfService': 'Out of Service', 'courts.noDescription': 'No description', 'courts.setActive': 'Set Active',
  'courts.delete': 'Delete', 'courts.noImage': 'No Image', 'courts.noCourts': 'No courts yet.',
  'bookings.scheduleTitle': 'Schedule & Equipment Orders',
  'bookings.date': 'Date:', 'bookings.court': 'Court', 'bookings.dateHeader': 'Date', 'bookings.timeBlock': 'Time Block',
  'bookings.player': 'Player', 'bookings.email': 'Email', 'bookings.equipmentOrder': 'Equipment Order',
  'bookings.actions': 'Actions', 'bookings.cancel': 'Cancel', 'bookings.noBookings': 'No bookings found for this date.',
  'bookings.unknown': 'Unknown', 'bookings.none': 'None',
  'users.title': 'Users', 'users.name': 'Name', 'users.email': 'Email', 'users.password': 'Password',
  'users.role': 'Role', 'users.joined': 'Joined', 'users.activeBookings': 'Active Bookings',
  'users.noUsers': 'No users found.', 'users.member': 'Member', 'users.show': 'Show', 'users.hide': 'Hide',
  'users.you': 'you', 'users.changePassword': 'Change Password', 'users.newPasswordFor': 'New password for {name}',
  'users.passwordChanged': 'Password updated', 'users.makeAdmin': 'Make Admin', 'users.makeMember': 'Make Member',
  'users.changeRole': 'Change Role', 'users.confirmMakeAdmin': 'Give this user administrator access?',
  'users.confirmMakeMember': 'Remove administrator access from this user?', 'users.roleChanged': 'Role updated',
  'users.delete': 'Delete', 'users.deleteAccount': 'Delete Account',
  'users.deleteAccountMsg': 'Delete <strong>{name}</strong>\'s account? Any courts they currently have booked will be freed up. This cannot be undone.',
  'users.accountDeleted': 'Account deleted',
  'book.pickDate': 'Pick a Date', 'book.today': 'Today', 'book.tomorrow': 'Tomorrow', 'book.plus3Days': '+3 Days',
  'book.matchDay': 'Match Day:', 'book.timeBlocks': '90-minute padel time blocks', 'book.smashIt': 'SMASH IT',
  'book.yourBooking': 'Your Booking', 'book.courtInUse': 'Court in Use', 'book.outOfService': 'Out of Service',
  'book.free': 'free', 'book.confirmBooking': 'Confirm Booking',
  'book.bookAt': 'Book {court} at {time} on {date}?', 'book.equipment': 'Rental Equipment',
  'book.equipNone': 'None (Bring my own gear)', 'book.equip1': '2 Racquets & 1 Can of Balls',
  'book.equip2': '4 Racquets & 1 Can of Balls', 'book.equip3': '2 Racquets & 2 Cans of Balls',
  'book.equip4': '4 Racquets & 2 Cans of Balls', 'book.noSlots': 'No slots for this date.',
  'book.available': 'available', 'book.booked': 'booked', 'book.total': 'total',
  'res.title': 'My Reservations', 'res.noReservations': 'No reservations yet',
  'res.noReservationsDesc': "You haven't booked any courts.", 'res.bookFirst': 'Book Your First Court',
  'res.bookedAt': 'Booked:', 'res.gear': 'Gear:',
  'val.nameRequired': 'Name is required', 'val.nameMin': 'Name must be at least 2 characters',
  'val.namePattern': 'Name must contain only letters', 'val.emailRequired': 'Email is required',
  'val.emailInvalid': 'Enter a valid email address', 'val.passwordRequired': 'Password is required',
  'val.passwordMin': 'Password must be at least 6 characters', 'val.passwordNumber': 'Password must contain at least one number',
  'val.confirmRequired': 'Please confirm your password', 'val.courtNameRequired': 'Court name is required',
  'val.courtNameMin': 'Name must be at least 2 characters', 'val.courtNameMax': 'Name must be under 30 characters',
  'val.courtNamePattern': 'Only letters, numbers, spaces, and hyphens', 'val.userNotFound': 'User not found',
  'val.samePassword': 'You cannot use your previous password',
  'toast.signedIn': 'Signed in successfully', 'toast.accountCreated': 'Account created!', 'toast.courtAdded': 'Court added',
  'toast.courtDeleted': 'Court deleted', 'toast.passwordReset': 'Password reset successfully',
  'modal.deleteCourt': 'Delete Court',
  'modal.deleteCourtMsg': 'Delete <strong>{name}</strong> and all its time slots?',
  'modal.cancelBooking': 'Cancel Booking', 'modal.cancelBookingMsg': 'Are you sure you want to cancel this reservation?',
  'modal.cancelMemberBooking': 'Cancel Member Booking', 'modal.cancelMemberMsg': 'Are you sure you want to cancel this booking? The slot will become available again.',
  'pag.prev': 'Previous', 'pag.next': 'Next', 'pag.showing': 'Showing {from}-{to} of {total}'
};

function t(key, params) {
  var text = TEXT[key] || key;
  if (params) {
    for (var name in params) {
      if (Object.prototype.hasOwnProperty.call(params, name)) {
        text = text.replace(new RegExp('\\{' + name + '\\}', 'g'), params[name]);
      }
    }
  }
  return text;
}



document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
});

window.i18n = { t: t, getLang: function () { return 'en'; },  };
