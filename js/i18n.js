// All translations for English and Arabic
var I18N = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.courts': 'Courts',
    'nav.bookings': 'Bookings',
    'nav.bookCourt': 'Book Court',
    'nav.reservations': 'Reservations',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.admin': 'Admin',
    // Role switcher
    'role.switchToAdmin': 'Switch to Admin',
    'role.switchToMember': 'Switch to Member',
    'role.switchedTo': 'Switched to {role} view',
    // Home page
    'hero.title': 'The Glass Court',
    'hero.subtitle': 'Reserve your padel court. Pre-order your gear. Walk in and smash it.',
    'hero.getStarted': 'Get Started',
    'hero.login': 'Login',
    'hero.goDashboard': 'Go to Dashboard',
    'hero.feature1Title': '90-Min Blocks',
    'hero.feature1Desc': 'Fixed time slots. No overflows, no surprises. You get the court for a full match window.',
    'hero.feature2Title': 'Gear Ready',
    'hero.feature2Desc': 'Order racquets and balls with your booking. Equipment prepped before you step on court.',
    'hero.feature3Title': 'No Double Bookings',
    'hero.feature3Desc': 'The schedule checks each court and time block before saving a booking.',
    'footer.rights': 'All rights reserved.',
    // Auth pages
    'auth.welcomeBack': 'Welcome Back',
    'auth.signInSubtitle': 'Sign in to your PadelSync account.',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.signIn': 'Sign In',
    'auth.signingIn': 'Signing in...',
    'auth.noAccount': 'No account?',
    'auth.joinTitle': 'Join PadelSync',
    'auth.registerSubtitle': 'Create your account and start booking.',
    'auth.fullName': 'Full Name',
    'auth.confirmPassword': 'Confirm Password',
    'auth.createAccount': 'Create Account',
    'auth.creatingAccount': 'Creating account...',
    'auth.hasAccount': 'Already a member?',
    'auth.signInLink': 'Sign in',
    // Member dashboard
    'dash.welcomeBack': 'Welcome back',
    'dash.smashIt': 'Smash It',
    'dash.upcoming': 'Upcoming',
    'dash.activeCourts': 'Active Courts',
    'dash.nextReservations': 'Next Reservations',
    'dash.noUpcoming': 'No upcoming reservations.',
    'dash.bookACourt': 'Book a Court',
    // Admin dashboard
    'admin.title': 'Admin Dashboard',
    'admin.courtsActive': 'Courts ({active} active)',
    'admin.todaysBookings': "Today's Bookings",
    'admin.members': 'Members',
    'admin.manageCourts': 'Manage Courts',
    'admin.viewBookings': 'View Bookings',
    // Courts management
    'courts.addNew': 'Add New Court',
    'courts.name': 'Court Name',
    'courts.namePlaceholder': 'e.g., Court 5',
    'courts.description': 'Description',
    'courts.descPlaceholder': 'Surface / description',
    'courts.photo': 'Court Photo',
    'courts.addCourt': 'Add Court',
    'courts.title': 'Courts',
    'courts.active': 'Active',
    'courts.outOfService': 'Out of Service',
    'courts.noDescription': 'No description',
    'courts.setActive': 'Set Active',
    'courts.delete': 'Delete',
    'courts.noImage': 'No Image',
    'courts.noCourts': 'No courts yet.',
    // Bookings
    'bookings.generateSlots': 'Generate Slots',
    'bookings.generateDesc': 'Create 90-minute time blocks for all active courts on a given date.',
    'bookings.generate': 'Generate',
    'bookings.scheduleTitle': 'Schedule & Equipment Orders',
    'bookings.date': 'Date:',
    'bookings.court': 'Court',
    'bookings.dateHeader': 'Date',
    'bookings.timeBlock': 'Time Block',
    'bookings.player': 'Player',
    'bookings.email': 'Email',
    'bookings.equipmentOrder': 'Equipment Order',
    'bookings.actions': 'Actions',
    'bookings.cancel': 'Cancel',
    'bookings.noBookings': 'No bookings found for this date.',
    'bookings.unknown': 'Unknown',
    'bookings.none': 'None',
    'bookings.generating': 'Generating...',
    // Booking page
    'book.pickDate': 'Pick a Date',
    'book.today': 'Today',
    'book.tomorrow': 'Tomorrow',
    'book.plus3Days': '+3 Days',
    'book.matchDay': 'Match Day:',
    'book.timeBlocks': '90-minute padel time blocks',
    'book.smashIt': 'SMASH IT',
    'book.yourBooking': 'Your Booking',
    'book.courtInUse': 'Court in Use',
    'book.outOfService': 'Out of Service',
    'book.free': 'free',
    'book.confirmBooking': 'Confirm Booking',
    'book.cancelBooking': 'Cancel Booking',
    'book.bookAt': 'Book {court} at {time} on {date}?',
    'book.equipment': 'Rental Equipment',
    'book.equipNone': 'None (Bring my own gear)',
    'book.equip1': '2 Racquets & 1 Can of Balls',
    'book.equip2': '4 Racquets & 1 Can of Balls',
    'book.equip3': '2 Racquets & 2 Cans of Balls',
    'book.equip4': '4 Racquets & 2 Cans of Balls',
    'book.noSlots': 'No slots for this date. Ask an admin to generate them.',
    'book.available': 'available',
    'book.booked': 'booked',
    'book.total': 'total',
    // Reservations
    'res.title': 'My Reservations',
    'res.noReservations': 'No reservations yet',
    'res.noReservationsDesc': "You haven't booked any courts.",
    'res.bookFirst': 'Book Your First Court',
    'res.bookedAt': 'Booked:',
    'res.gear': 'Gear:',
    // Validation messages
    'val.nameRequired': 'Name is required',
    'val.nameMin': 'Name must be at least 2 characters',
    'val.namePattern': 'Name must contain only letters',
    'val.emailRequired': 'Email is required',
    'val.emailInvalid': 'Enter a valid email address',
    'val.passwordRequired': 'Password is required',
    'val.passwordMin': 'Password must be at least 6 characters',
    'val.passwordNumber': 'Password must contain at least one number',
    'val.confirmRequired': 'Please confirm your password',
    'val.courtNameRequired': 'Court name is required',
    'val.courtNameMin': 'Name must be at least 2 characters',
    'val.courtNameMax': 'Name must be under 30 characters',
    'val.courtNamePattern': 'Only letters, numbers, spaces, and hyphens',
    // Toast messages
    'toast.signedIn': 'Signed in successfully',
    'toast.accountCreated': 'Account created!',
    'toast.courtAdded': 'Court added',
    'toast.courtDeleted': 'Court deleted',
    'toast.booked': 'Court booked! Go smash it.',
    'toast.bookingCancelled': 'Booking cancelled',
    'toast.adminCancelled': 'Booking cancelled by admin',
    'toast.selectDate': 'Please select a date',
    'toast.slotsGenerated': 'Slots generated: {created} created, {skipped} skipped',
    // Modal labels
    'modal.cancel': 'Cancel',
    'modal.confirm': 'Confirm',
    'modal.deleteCourt': 'Delete Court',
    'modal.deleteCourtMsg': 'Delete <strong>{name}</strong> and all its time slots?',
    'modal.cancelBooking': 'Cancel Booking',
    'modal.cancelBookingMsg': 'Are you sure you want to cancel this reservation?',
    'modal.cancelMemberBooking': 'Cancel Member Booking',
    'modal.cancelMemberMsg': 'Are you sure you want to cancel this booking? The slot will become available again.',
    // Pagination
    'pag.prev': 'Previous',
    'pag.next': 'Next',
    'pag.page': 'Page {page} of {total}',
    'pag.showing': 'Showing {from}-{to} of {total}',
    // Language toggle
    'lang.en': 'EN',
    'lang.ar': 'AR'
  },
  ar: {
    'nav.dashboard': '\u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645',
    'nav.courts': '\u0627\u0644\u0645\u0639\u0627\u0631\u0636',
    'nav.bookings': '\u0627\u0644\u062d\u062c\u0632\u0627\u062a',
    'nav.bookCourt': '\u062d\u062c\u0632 \u0645\u0639\u0631\u0636',
    'nav.reservations': '\u0627\u0644\u062d\u062c\u0632\u0627\u062a\u064a',
    'nav.logout': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c',
    'nav.login': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
    'nav.register': '\u062a\u0633\u062c\u064a\u0644',
    'nav.admin': '\u0645\u0633\u0626\u0648\u0644',
    'role.switchToAdmin': '\u0627\u0646\u062a\u0642\u0627\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0633\u0626\u0648\u0644',
    'role.switchToMember': '\u0627\u0646\u062a\u0642\u0627\u0644 \u0625\u0644\u0649 \u0627\u0644\u0639\u0636\u0648\u064a\u0629',
    'role.switchedTo': '\u062a\u0645 \u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 \u0639\u0631\u0636 {role}',
    'hero.title': '\u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0632\u062c\u0627\u062c\u064a',
    'hero.subtitle': '\u062d\u062c\u0632 \u0645\u0639\u0631\u0636 \u0628\u0627\u062f\u0644\u0643. \u0627\u0637\u0644\u0628 \u0645\u0639\u062f\u062a\u0643 \u0645\u0633\u0628\u0642\u0627\u064b\u060c \u0648\u0627\u062f\u062e\u0644 \u0648\u0627\u0636\u0631\u0628.',
    'hero.getStarted': '\u0628\u062f\u0623',
    'hero.login': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
    'hero.goDashboard': '\u0627\u0644\u0630\u0647\u0627\u0628 \u0625\u0644\u0649 \u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645',
    'hero.feature1Title': '\u0641\u062a\u0631\u0627\u062a 90 \u062f\u0642\u064a\u0642\u0629',
    'hero.feature1Desc': '\u0645\u0648\u0627\u0642\u0639 \u0632\u0645\u0646\u064a\u0629 \u062b\u0627\u0628\u062a\u0629. \u0644\u0627 \u062a\u062c\u0627\u0648\u0632 \u0648\u0644\u0627 \u0645\u0641\u0627\u062c\u0624\u0627\u062a.',
    'hero.feature2Title': '\u0645\u0639\u062f\u0627\u062a \u062c\u0627\u0647\u0632\u0629',
    'hero.feature2Desc': '\u0627\u0637\u0644\u0628 \u0631\u0627\u0636\u064a\u0627\u062a \u0648\u0643\u0631\u0627\u062a \u0645\u0639 \u062d\u062c\u0632\u0643.',
    'hero.feature3Title': '\u0635\u0641\u0631 \u0645\u0637\u0644\u0642',
    'hero.feature3Desc': '\u062a\u0648\u0641\u0631 \u0641\u0639\u0627\u0644 \u0628\u0641\u0648\u0631\u064a\u0627\u064b. \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0645\u062a\u0627\u062d\u0629\u060c \u0647\u064a \u062e\u0627\u0635\u062a\u0643.',
    'footer.rights': '\u0643\u0644 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.',
    'auth.welcomeBack': '\u0645\u0631\u062d\u0628\u064b\u0627 \u0628\u0643',
    'auth.signInSubtitle': '\u062a\u0633\u062c\u064a\u0644 \u062f\u062e\u0648\u0644\u0643 \u0625\u0644\u0649 \u062d\u0633\u0627\u0628 PadelSync.',
    'auth.email': '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
    'auth.password': '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
    'auth.signIn': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
    'auth.signingIn': '\u062c\u0627\u0631\u064a \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644...',
    'auth.noAccount': '\u0644\u0627 \u064a\u0648\u062c\u062f \u062d\u0633\u0627\u0628\u061f',
    'auth.joinTitle': '\u0627\u0646\u0636\u0645 \u0625\u0644\u0649 PadelSync',
    'auth.registerSubtitle': '\u0623\u0646\u0634\u0626 \u062d\u0633\u0627\u0628\u0643 \u0628\u062f\u0621 \u0627\u0644\u062d\u062c\u0632.',
    'auth.fullName': '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644',
    'auth.confirmPassword': '\u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
    'auth.createAccount': '\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628',
    'auth.creatingAccount': '\u062c\u0627\u0631\u064a \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628...',
    'auth.hasAccount': '\u0644\u062f\u064a\u0643 \u062d\u0633\u0627\u0628 \u0628\u0627\u0644\u0641\u0639\u0644\u061f',
    'auth.signInLink': '\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644',
    'dash.welcomeBack': '\u0645\u0631\u062d\u0628\u064b\u0627 \u0628\u0643',
    'dash.smashIt': '\u0627\u0636\u0631\u0628',
    'dash.upcoming': '\u0627\u0644\u0642\u0627\u062f\u0645',
    'dash.activeCourts': '\u0627\u0644\u0645\u0639\u0627\u0631\u0636 \u0627\u0644\u0646\u0634\u0637\u0629',
    'dash.nextReservations': '\u0627\u0644\u062d\u062c\u0632\u0627\u062a \u0627\u0644\u0642\u0627\u062f\u0645\u0629',
    'dash.noUpcoming': '\u0644\u0627 \u062a\u0648\u062c\u062f \u062d\u062c\u0632\u0627\u062a \u0642\u0627\u062f\u0645\u0629.',
    'dash.bookACourt': '\u062d\u062c\u0632 \u0645\u0639\u0631\u0636',
    'admin.title': '\u0644\u0648\u062d\u0629 \u062a\u062d\u0643\u0645 \u0627\u0644\u0645\u0633\u0626\u0648\u0644',
    'admin.courtsActive': '\u0627\u0644\u0645\u0639\u0627\u0631\u0636 ({active} \u0646\u0634\u0637)',
    'admin.todaysBookings': '\u062d\u062c\u0632\u0627\u062a \u0627\u0644\u064a\u0648\u0645',
    'admin.members': '\u0627\u0644\u0639\u0636\u0648\u0627\u0621',
    'admin.manageCourts': '\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0627\u0631\u0636',
    'admin.viewBookings': '\u0639\u0631\u0636 \u0627\u0644\u062d\u062c\u0632\u0627\u062a',
    'courts.addNew': '\u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u0631\u0636 \u062c\u062f\u064a\u062f',
    'courts.name': '\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u0631\u0636',
    'courts.namePlaceholder': '\u0645\u0639\u062b\u0644: \u0645\u0639\u0631\u0636 5',
    'courts.description': '\u0627\u0644\u0648\u0635\u0641',
    'courts.descPlaceholder': '\u0627\u0644\u0633\u0637\u062d / \u0627\u0644\u0648\u0635\u0641',
    'courts.photo': '\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0639\u0631\u0636',
    'courts.addCourt': '\u0625\u0636\u0627\u0641\u0629 \u0645\u0639\u0631\u0636',
    'courts.title': '\u0627\u0644\u0645\u0639\u0627\u0631\u0636',
    'courts.active': '\u0646\u0634\u0637',
    'courts.outOfService': '\u063a\u064a\u0631 \u0645\u062a\u062d\u0648\u0644',
    'courts.noDescription': '\u0628\u062f\u0648\u0646 \u0648\u0635\u0641',
    'courts.setActive': '\u062a\u0641\u0639\u064a\u0644',
    'courts.delete': '\u062d\u0630\u0641',
    'courts.noImage': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0635\u0648\u0631\u0629',
    'courts.noCourts': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0639\u0627\u0631\u0636 \u0628\u0639\u062f.',
    'bookings.generateSlots': '\u062a\u0648\u0644\u064a\u062f \u0627\u0644\u0645\u0648\u0627\u0642\u0639',
    'bookings.generateDesc': '\u0625\u0646\u0634\u0627\u0621 \u0641\u062a\u0631\u0627\u062a 90 \u062f\u0642\u064a\u0642\u0629 \u0644\u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0639\u0627\u0631\u0636 \u0627\u0644\u0646\u0634\u0637\u0629.',
    'bookings.generate': '\u062a\u0648\u0644\u064a\u062f',
    'bookings.scheduleTitle': '\u0627\u0644\u062c\u062f\u0648\u0644 \u0648\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0639\u062f\u0627\u062a',
    'bookings.date': '\u0627\u0644\u062a\u0627\u0631\u064a\u062e:',
    'bookings.court': '\u0627\u0644\u0645\u0639\u0631\u0636',
    'bookings.dateHeader': '\u0627\u0644\u062a\u0627\u0631\u064a\u062e',
    'bookings.timeBlock': '\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0632\u0645\u0646\u064a',
    'bookings.player': '\u0627\u0644\u0644\u0627\u0639\u0628',
    'bookings.email': '\u0627\u0644\u0628\u0631\u064a\u062f',
    'bookings.equipmentOrder': '\u0637\u0644\u0628 \u0627\u0644\u0645\u0639\u062f\u0627\u062a',
    'bookings.actions': '\u0625\u062c\u0631\u0627\u0621\u0627\u062a',
    'bookings.cancel': '\u0625\u0644\u063a\u0627\u0621',
    'bookings.noBookings': '\u0644\u0627 \u062a\u0648\u062c\u062f \u062d\u062c\u0632\u0627\u062a \u0644\u0647\u0630\u0627 \u0627\u0644\u062a\u0627\u0631\u064a\u062e.',
    'bookings.unknown': '\u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641',
    'bookings.none': '\u0644\u0627',
    'bookings.generating': '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u0648\u0644\u064a\u062f...',
    'book.pickDate': '\u0627\u062e\u062a\u0631 \u062a\u0627\u0631\u064a\u062e',
    'book.today': '\u0627\u0644\u064a\u0648\u0645',
    'book.tomorrow': '\u063a\u062f\u064b\u0627',
    'book.plus3Days': '+3 \u0623\u064a\u0627\u0645',
    'book.matchDay': '\u064a\u0648\u0645 \u0627\u0644\u0645\u0628\u0627\u0631\u0627\u0629:',
    'book.timeBlocks': '\u0641\u062a\u0631\u0627\u062a 90 \u062f\u0642\u064a\u0642\u0629 \u0644\u0644\u0628\u0627\u062f\u0644',
    'book.smashIt': '\u0627\u0636\u0631\u0628',
    'book.yourBooking': '\u062d\u062c\u0632\u062a\u0643',
    'book.courtInUse': '\u0627\u0644\u0645\u0639\u0631\u0636 \u0645\u0634\u063a\u0648\u0644',
    'book.outOfService': '\u063a\u064a\u0631 \u0645\u062a\u062d\u0648\u0644',
    'book.free': '\u0645\u062a\u0627\u062d',
    'book.confirmBooking': '\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632',
    'book.cancelBooking': '\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632',
    'book.bookAt': '\u062d\u062c\u0632 {court} \u0633\u0627\u0639\u0629 {time} \u064a\u0648\u0645 {date}?',
    'book.equipment': '\u0627\u0644\u0645\u0639\u062f\u0627\u062a \u0627\u0644\u0645\u0639\u064a\u0648\u0646\u0629',
    'book.equipNone': '\u0644\u0627 (\u0623\u062d\u0636\u0631 \u0645\u0639\u062f\u0627\u062a\u064a)',
    'book.equip1': '2 \u0631\u0627\u0636\u064a\u0627\u062a \u0648\u0639\u0644\u0628\u0629 \u0643\u0631\u0627\u062a \u0648\u0627\u062d\u062f\u0629',
    'book.equip2': '4 \u0631\u0627\u0636\u064a\u0627\u062a \u0648\u0639\u0644\u0628\u0629 \u0643\u0631\u0627\u062a \u0648\u0627\u062d\u062f\u0629',
    'book.equip3': '2 \u0631\u0627\u0636\u064a\u0627\u062a \u0648\u0639\u0644\u0628\u062a\u064a \u0643\u0631\u0627\u062a',
    'book.equip4': '4 \u0631\u0627\u0636\u064a\u0627\u062a \u0648\u0639\u0644\u0628\u062a\u064a \u0643\u0631\u0627\u062a',
    'book.noSlots': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0648\u0627\u0642\u0639 \u0644\u0647\u0630\u0627 \u0627\u0644\u062a\u0627\u0631\u064a\u062e. \u0627\u0637\u0644\u0628 \u0627\u0644\u0645\u0633\u0626\u0648\u0644 \u0625\u0646\u0634\u0627\u0621\u0647\u0627.',
    'book.available': '\u0645\u062a\u0627\u062d',
    'book.booked': '\u0645\u062d\u062c\u0632',
    'book.total': '\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a',
    'res.title': '\u062d\u062c\u0632\u0627\u062a\u064a',
    'res.noReservations': '\u0644\u0627 \u062a\u0648\u062c\u062f \u062d\u062c\u0632\u0627\u062a \u0628\u0639\u062f',
    'res.noReservationsDesc': '\u0644\u0645 \u062a\u062d\u062c\u0632 \u0623\u064a \u0645\u0639\u0627\u0631\u0636 \u0628\u0639\u062f.',
    'res.bookFirst': '\u062d\u062c\u0632 \u0623\u0648\u0644 \u0645\u0639\u0631\u0636 \u0644\u0643',
    'res.bookedAt': '\u062a\u0645 \u0627\u0644\u062d\u062c\u0632:',
    'res.gear': '\u0627\u0644\u0645\u0639\u062f\u0627\u062a:',
    'val.nameRequired': '\u0627\u0644\u0627\u0633\u0645 \u0645\u0637\u0644\u0648\u0628',
    'val.nameMin': '\u064a\u062c\u0628 \u0623\u0646 \u064a\u0643\u0648\u0646 \u0627\u0644\u0627\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 2 \u0623\u062d\u0631\u0641',
    'val.namePattern': '\u064a\u062c\u0628 \u0623\u0646 \u064a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u062d\u0631\u0648\u0641 \u0641\u0642\u0637',
    'val.emailRequired': '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0645\u0637\u0644\u0648\u0628',
    'val.emailInvalid': '\u0623\u062f\u062e\u0644 \u0639\u0646\u0648\u0627\u0646 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u0627\u0644\u062d',
    'val.passwordRequired': '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0637\u0644\u0648\u0628\u0629',
    'val.passwordMin': '\u064a\u062c\u0628 \u0623\u0646 \u062a\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 6 \u0623\u062d\u0631\u0641',
    'val.passwordNumber': '\u064a\u062c\u0628 \u0623\u0646 \u062a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u0631\u0642\u0645 \u0648\u0627\u062d\u062f \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644',
    'val.confirmRequired': '\u064a\u0631\u062c\u0649 \u062a\u0623\u0643\u064a\u062f \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
    'val.courtNameRequired': '\u0627\u0633\u0645 \u0627\u0644\u0645\u0639\u0631\u0636 \u0645\u0637\u0644\u0648\u0628',
    'val.courtNameMin': '\u064a\u062c\u0628 \u0623\u0646 \u064a\u0643\u0648\u0646 \u0627\u0644\u0627\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 2 \u0623\u062d\u0631\u0641',
    'val.courtNameMax': '\u064a\u062c\u0628 \u0623\u0646 \u064a\u0643\u0648\u0646 \u0627\u0644\u0627\u0633\u0645 \u0623\u0642\u0644 \u0645\u0646 30 \u062d\u0631\u0641',
    'val.courtNamePattern': '\u0623\u062d\u0631\u0641 \u0648\u0623\u0631\u0642\u0627\u0645 \u0648\u0645\u0633\u0627\u0641\u0627\u062a \u0641\u0642\u0637',
    'toast.signedIn': '\u062a\u0645 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0646\u062c\u0627\u062d',
    'toast.accountCreated': '\u062a\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062d\u0633\u0627\u0628!',
    'toast.courtAdded': '\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0639\u0631\u0636',
    'toast.courtDeleted': '\u062a\u0645 \u062d\u0630\u0641 \u0627\u0644\u0645\u0639\u0631\u0636',
    'toast.booked': '\u062a\u0645 \u062d\u062c\u0632 \u0627\u0644\u0645\u0639\u0631\u0636! \u0627\u0636\u0631\u0628.',
    'toast.bookingCancelled': '\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632',
    'toast.adminCancelled': '\u062a\u0645 \u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0645\u0633\u0626\u0648\u0644',
    'toast.selectDate': '\u064a\u0631\u062c\u0649 \u062a\u062e\u0635\u064a\u0635 \u062a\u0627\u0631\u064a\u062e',
    'toast.slotsGenerated': '\u062a\u0645 \u062a\u0648\u0644\u064a\u062f \u0627\u0644\u0645\u0648\u0627\u0642\u0639: {created} \u062a\u0645 \u0625\u0646\u0634\u0627\u0621\u0647\u0627\u060c {skipped} \u0645\u062a\u062c\u0627\u0648\u0632\u0629',
    'modal.cancel': '\u0625\u0644\u063a\u0627\u0621',
    'modal.confirm': '\u062a\u0623\u0643\u064a\u062f',
    'modal.deleteCourt': '\u062d\u0630\u0641 \u0627\u0644\u0645\u0639\u0631\u0636',
    'modal.deleteCourtMsg': '\u062d\u0630\u0641 <strong>{name}</strong> \u0648\u062c\u0645\u064a\u0639 \u0645\u0648\u0627\u0642\u0639\u0647 \u0627\u0644\u0632\u0645\u0646\u064a\u0629?',
    'modal.cancelBooking': '\u0625\u0644\u063a\u0627\u0621 \u0627\u0644\u062d\u062c\u0632',
    'modal.cancelBookingMsg': '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u0625\u0644\u063a\u0627\u0621 \u0647\u0630\u0647 \u0627\u0644\u062d\u062c\u0632\u061f',
    'modal.cancelMemberBooking': '\u0625\u0644\u063a\u0627\u0621 \u062d\u062c\u0632 \u0627\u0644\u0639\u0636\u0648\u064a\u0629',
    'modal.cancelMemberMsg': '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u0625\u0644\u063a\u0627\u0621 \u0647\u0630\u0647 \u0627\u0644\u062d\u062c\u0632\u061f \u0633\u064a\u0639\u0648\u062f \u0627\u0644\u0645\u0648\u0642\u0639 \u0639\u0646 \u0627\u0644\u062a\u062d\u0642\u064b.',
    'pag.prev': '\u0627\u0644\u0633\u0627\u0628\u0642',
    'pag.next': '\u0627\u0644\u062a\u0627\u0644\u064a',
    'pag.page': '\u0635\u0641\u062d\u0629 {page} \u0645\u0646 {total}',
    'pag.showing': '\u0639\u0631\u0636 {from}-{to} \u0645\u0646 {total}',
    'lang.en': 'EN',
    'lang.ar': '\u0639\u0631\u0628\u064a'
  }
};

// Get the current language from localStorage (default: English)
function getLang() {
  return localStorage.getItem('padelsync_lang') || 'en';
}

// Set and apply a language
function setLang(lang) {
  localStorage.setItem('padelsync_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyTranslations();
}

// Translate a key, optionally replacing placeholders with params
function t(key, params) {
  var lang = getLang();
  var str = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  if (params) {
    var keys = Object.keys(params);
    for (var i = 0; i < keys.length; i++) {
      str = str.replace(new RegExp('\\{' + keys[i] + '\\}', 'g'), params[keys[i]]);
    }
  }
  return str;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
  // Translate text content
  var els = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var key = el.getAttribute('data-i18n');
    var text = t(key);
    if (el.tagName === 'INPUT' && el.type !== 'submit') {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  }

  // Translate placeholders
  var placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
  for (var j = 0; j < placeholderEls.length; j++) {
    placeholderEls[j].placeholder = t(placeholderEls[j].getAttribute('data-i18n-placeholder'));
  }

  // Translate title attributes
  var titleEls = document.querySelectorAll('[data-i18n-title]');
  for (var k = 0; k < titleEls.length; k++) {
    titleEls[k].title = t(titleEls[k].getAttribute('data-i18n-title'));
  }
}

// Render the language toggle button HTML
function renderLangToggle() {
  var current = getLang();
  var next = current === 'en' ? 'ar' : 'en';
  var label = current === 'en' ? 'AR' : 'EN';
  return '<button class="lang-toggle-btn" onclick="switchLang(\'' + next + '\')" title="Switch language">' + label + '</button>';
}

// Switch language and reload the page
function switchLang(lang) {
  setLang(lang);
  window.location.reload();
}

// Apply language settings when the page loads
document.addEventListener('DOMContentLoaded', function() {
  var lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  applyTranslations();
});

// Expose i18n functions globally
window.i18n = { t: t, setLang: setLang, getLang: getLang, applyTranslations: applyTranslations, renderLangToggle: renderLangToggle, switchLang: switchLang };
