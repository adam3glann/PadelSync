# 🎾 PadelSync

::: {align="center"}
# 🎾 PadelSync

**A Full-Stack Padel Court Reservation & Management Platform**

Built for **SWE230 -- Web Application Development**\
**Faculty of Computer Science -- Misr International University (MIU)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
:::

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

![](PadelSync/PadelSync/frontend/screenshots/home.png)

## Login

![](PadelSync/PadelSync/frontend/screenshots/login.png)

## Register

![](PadelSync/PadelSync/frontend/screenshots/register.png)

## Member Dashboard

![](PadelSync/PadelSync/frontend/screenshots/member-dashboard.png)

## Reservations

![](PadelSync/PadelSync/frontend/screenshots/reservations.png)

## Book Court

![](PadelSync/PadelSync/frontend/screenshots/book-court.png)

## Admin Dashboard

![](PadelSync/PadelSync/frontend/screenshots/admin-dashboard.png)

## Manage Users

![](PadelSync/PadelSync/frontend/screenshots/manage-users.png)

## Manage Bookings

![](PadelSync/PadelSync/frontend/screenshots/manage-bookings.png)

## Manage Courts

![](PadelSync/PadelSync/frontend/screenshots/manage-courts.png)

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

# 👥 Team

  Name            Contribution
  --------------- --------------------
  Adam Adel       Frontend & Backend
  Omar Yassien    Frontend & Backend
  Mafdy Nader     Frontend & Backend
  Sayed Said      Frontend & Backend

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
