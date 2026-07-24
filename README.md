# PadelSync

A simple front-end padel court booking website made with HTML, CSS, and JavaScript. It saves demonstration data in the browser's local storage, so no server or database installation is required.

## Open the project

Open `index.html` in a web browser. For the most reliable local-storage behaviour, run the folder with a simple local server such as VS Code Live Server.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Administrator | admin@padelsync.com | admin123 |
| Member | ali@example.com | member123 |

## Included validation

- Full name: required, at least 2 letters.
- Email: required and checked using an email pattern.
- Password: required, at least 6 characters, including a number.
- Confirm password: must match the password.
- Court name: required, 2 to 30 characters.

The project also prevents a court time block from being booked twice and allows an owner or administrator to cancel a booking.

## Reservation payment policy

- Court price: EGP 300.
- The member pays a 50% deposit (EGP 150) to reserve a court.
- The other EGP 150 is paid in cash at the court.
- Cancel within 2 hours of booking: 100% of the deposit is refunded.
- Cancel between 2 and 3 hours of booking: 25% of the deposit is refunded.
- Cancel after 3 hours: the deposit is not refunded.

This is a front-end demonstration only: card details are validated but never saved, and no real payment is charged.

## Admin finance and cancellation view

The administrator dashboard shows:

- Online deposits earned (including the retained part of cancelled deposits).
- Cash still due at the court for active reservations.
- Expected revenue for active reservations.
- Refunds issued and the number of cancelled schedules.

The Bookings page keeps a cancellation history with the court, member, schedule, deposit, refund, retained amount, and cancellation time.
