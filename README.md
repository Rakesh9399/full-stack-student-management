# Student Management System

A full-stack student management system built with React, TypeScript, Node.js, Express, and MongoDB.

---

# Screenshots

## Login Page

![Login Page](./screenshots/login.image.png)

---

## Register Page

![Register Page](./screenshots/register.image.png)

---

## Dashboard

![Dashboard](./screenshots/dashboard.image.png)

---

## Edit Modal

![Edit Modal](./screenshots/edit.image.png)

---

# Tech Stack

## Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT Authentication
- CryptoJS

---

# Features

- Student Registration
- Student Login
- JWT Authentication
- Protected Routes
- CRUD Operations
- Search Functionality
- Modal Popup Editing
- Frontend Encryption
- Backend Encryption
- Double Encryption Architecture
- Responsive Dashboard UI

---

# Setup Instructions

## Backend

```bash
cd Backend

npm install

npm run dev
```

### Frontend

cd Frontend

npm install

npm run dev

---

## Environment Variables

### Backend .env

PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/studentdb

SECRET_KEY=mySuperSecretKey

JWT_SECRET=myJWTSuperSecretKey

JWT_EXPIRES_IN=1d

---

### Frontend .env

VITE_API_URL=http://localhost:5000/api

---

## API Routes

POST /api/register

POST /api/login

GET /api/students

PUT /api/student/:id

DELETE /api/student/:id

---

## Encryption Flow

Frontend Encrypt -> Backend Encrypt -> MongoDB Store -> MongoDB -> Backend Decrypt -> Frontend Decrypt -> Display Data