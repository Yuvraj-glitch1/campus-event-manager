# Campus Event & Club Manager

A backend REST API built with **Node.js, Express and MongoDB (Mongoose)** for managing campus events and organizer accounts. It follows a Controller-Route-Model architecture using ES Modules.

## Features
- Organizer registration, login and logout (passwords hashed with `bcrypt`)
- Full CRUD for campus events
- Mongoose validation and timestamps

## Tech Stack
- Node.js (ES Modules)
- Express
- MongoDB + Mongoose
- dotenv, bcrypt
- nodemon (dev)

## Project Structure
```
campus-event-manager/
├── src/
│   ├── config/        (constants.js, database.js)
│   ├── controllers/   (user.controller.js, event.controller.js)
│   ├── models/        (user.model.js, event.model.js)
│   ├── routes/        (user.route.js, event.route.js)
│   ├── app.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

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
