# 🎾 PadelSync

::: {align="center"}
# 🎾 PadelSync

**A Full-Stack Padel Court Reservation & Management Platform**

Built for **SWE230 -- Web Application Development**\
**Faculty of Computer Science -- Misr International University (MIU)**

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv

------------------------------------------------------------------------

# 📑 Table of Contents

-   Overview
-   Features
-   Tech Stack
-   Architecture
-   Project Structure
-   Screenshots
-   Backend
-   Frontend
-   Installation
-   Environment Variables
-   Git Workflow
-   Team
-   Future Improvements

------------------------------------------------------------------------

# 📖 Overview

PadelSync is a full-stack web application that allows users to discover,
reserve and manage padel courts through a modern web interface.

The project is organized into two major modules:

-   **frontend/** -- HTML, CSS and JavaScript user interface.
-   **backend/** -- Express REST API with MongoDB.

The application supports two user roles:

-   👤 Member
-   🛠 Administrator

------------------------------------------------------------------------

# ✨ Features

## Member

-   User registration
-   Secure login
-   Browse courts
-   Court reservation
-   Reservation management
-   Account settings
-   Responsive dashboard

## Administrator

-   Dashboard
-   Manage users
-   Manage bookings
-   Manage courts

------------------------------------------------------------------------

# 🏗 Architecture

``` text
Browser
   │
Frontend (HTML/CSS/JavaScript)
   │
Fetch API
   │
Express.js REST API
   │
MongoDB (Mongoose)
```

------------------------------------------------------------------------

# 🛠 Tech Stack

## Frontend

-   HTML5
-   CSS3
-   JavaScript (ES6)

## Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   bcrypt
-   dotenv

------------------------------------------------------------------------

# 📂 Project Structure

``` text
PadelSync/
├── frontend/
│   ├── admin/
│   ├── member/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── screenshots/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── 404.html
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
├── README.md
└── .gitignore
```

------------------------------------------------------------------------

# 📸 Screenshots

## Home

![](frontend/screenshots/home.png)

## Login

![](frontend/screenshots/login.png)

## Register

![](frontend/screenshots/register.png)

## Member Dashboard

![](frontend/screenshots/member-dashboard.png)

## Reservations

![](frontend/screenshots/reservations.png)

## Book Court

![](frontend/screenshots/book-court.png)

## Admin Dashboard

![](frontend/screenshots/admin-dashboard.png)

## Manage Users

![](frontend/screenshots/manage-users.png)

## Manage Bookings

![](frontend/screenshots/manage-bookings.png)

## Manage Courts

![](frontend/screenshots/manage-courts.png)
------------------------------------------------------------------------

# 🔐 Backend

The backend follows an MVC architecture.

### Main Components

-   Configuration
-   Controllers
-   Models
-   Routes
-   Middleware
-   Utilities

Authentication uses JWT tokens and bcrypt password hashing.

------------------------------------------------------------------------

# 🎨 Frontend

The frontend includes:

-   Responsive layout
-   Client-side validation
-   Authentication pages
-   Member pages
-   Administrator pages
-   Reusable assets
-   Modular JavaScript

------------------------------------------------------------------------

# 🚀 Installation

``` bash
git clone https://github.com/adam3glann/PadelSync.git
cd PadelSync
```

## Backend

``` bash
cd backend
npm install
npm run dev
```

## Environment Variables

``` env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/padelsync
JWT_SECRET=your_secret
```

## Frontend

Open:

``` text
frontend/index.html
```

or use Live Server.

------------------------------------------------------------------------

# 🌿 Git Workflow

-   main
-   adam
-   omar
-   mafdy
-   sayed


1.  Pull latest changes.
2.  Develop on your branch.
3.  Commit.
4.  Push.
5.  Open Pull Request.
6.  Merge after review.

------------------------------------------------------------------------

# 👥 Team Members

| Team Member | Responsibility |
|--------------|----------------|
| **Adam Adel** | Full-Stack Development (Frontend & Backend) |
| **Omar Yassien** |  Full-Stack Development (Frontend & Backend) |
| **Mafdy Nader** |  Full-Stack Development (Frontend & Backend) |
| **Sayed Said** |  Full-Stack Development (Frontend & Backend)|

------------------------------------------------------------------------

# 🚀 Future Improvements

-   Online payment
-   Email notifications
-   Booking history
-   Analytics dashboard
-   Real-time availability
-   Notifications

------------------------------------------------------------------------

# 🎓 Academic Information

**Course:** SWE230 -- Web Application Development

**University:** Misr International University (MIU)

**Faculty:** Computer Science

------------------------------------------------------------------------

# 📄 License

Developed for educational purposes as part of the SWE230 course at MIU.
