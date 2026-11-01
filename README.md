# 🎓 Campus Event & Club Manager API

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

A RESTful Backend API built with **Node.js**, **Express.js**, and **MongoDB Atlas** designed to manage university club events, hackathons, and student organizer authentication. Built using modern ES Modules (`import`/`export`) and the **Model-Route-Controller (MRC)** architecture.

---

## ✨ Key Features

* **🔐 Organizer Authentication:** Secure registration, login, and logout workflows for student club organizers.
* **🛡️ Password Security:** Automatic password hashing before database storage using `bcrypt` (`pre-save` Mongoose hooks) and encrypted credential comparison.
* **📅 Full CRUD Operations:** Create, Read, Update (`PATCH`), and Delete campus events stored on **MongoDB Atlas**.
* **🧱 Modular Architecture:** Clean separation of concerns across `models`, `controllers`, `routes`, and `config`.

---

## 📂 Project Architecture

```text
campus-event-manager/
├── src/
│   ├── config/
│   │   ├── constants.js       # Database name & global constants
│   │   └── database.js        # MongoDB Atlas connection logic
│   ├── controllers/
│   │   ├── user.controller.js # Auth logic (Register, Login, Logout)
│   │   └── event.controller.js# Event CRUD operations
│   ├── models/
│   │   ├── user.model.js      # Organizer schema & bcrypt methods
│   │   └── event.model.js     # Campus Event schema & validations
│   ├── routes/
│   │   ├── user.route.js      # /api/v1/users endpoints
│   │   └── event.route.js     # /api/v1/events endpoints
│   ├── app.js                 # Express app & middleware configuration
│   └── index.js               # Server entry point
├── .env.example               # Environment variables template
├── .gitignore                 # Ignored files (node_modules, .env)
├── package.json               # Dependencies & scripts
└── README.md                  # Project documentation


## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your environment file:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env`:
   ```
   PORT=8000
   MONGODB_URI=mongodb://127.0.0.1:27017
   ```
   The database name `campus_events_db` is appended automatically.
3. Make sure MongoDB is running locally (or use a MongoDB Atlas URI without a trailing slash or database name).
4. Start the server:
   ```bash
   npm run dev     # development with nodemon
   npm start       # production
   ```

Base URL: `http://localhost:8000`

## API Endpoints

### Users (`/api/v1/users`)

**POST** `/api/v1/users/register`
```json
{
  "username": "clubadmin",
  "email": "admin@campus.edu",
  "password": "secret123"
}
```
Response `201`:
```json
{
  "message": "User registered successfully",
  "user": { "id": "...", "username": "clubadmin", "email": "admin@campus.edu" }
}
```

**POST** `/api/v1/users/login`
```json
{
  "email": "admin@campus.edu",
  "password": "secret123"
}
```

**POST** `/api/v1/users/logout`
```json
{
  "email": "admin@campus.edu"
}
```
Response `200`: `{ "message": "Logout successful" }`

### Events (`/api/v1/events`)

**POST** `/api/v1/events/create`
```json
{
  "eventName": "Hackathon 2026",
  "organizerClub": "Coding Club",
  "venue": "Main Auditorium",
  "maxParticipants": 200,
  "registrationFee": 100
}
```
Response `201`: `{ "message": "Event created successfully", "event": { ... } }`

**GET** `/api/v1/events/getEvents` returns an array of all events.

**PATCH** `/api/v1/events/update/:id`
```json
{
  "venue": "Seminar Hall B",
  "maxParticipants": 150
}
```
An empty body returns `400` with `"No data provided for update"`; an unknown id returns `404`.

**DELETE** `/api/v1/events/delete/:id`
Response `200`: `{ "message": "Event successfully deleted" }`

## Validation Rules
| Field | Rule |
|---|---|
| username | required, unique, lowercase, 3-30 chars |
| email | required, unique, lowercase |
| password | required, 6-50 chars (stored hashed) |
| maxParticipants | required, 5-2000 |
| registrationFee | default 0, min 0 |
