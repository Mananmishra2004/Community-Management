# Community Management Web Application

A full-stack Community Management Web Application built to manage community profiles with **secure authentication, authorization, and role-based access control**. The system allows administrators to perform complete CRUD operations, while regular users have read-only access to community information.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure user authentication using JWT
- Role-based access control (Admin & User)
- Protected routes for admin-only operations

### 👨‍💼 Admin Capabilities
- Create community profiles
- Update community details
- Delete community records
- Manage community data securely

### 👥 User Capabilities
- View community profiles
- Read-only access to public community information

### 📦 CRUD Operations
- Create, Read, Update, Delete community data
- RESTful API design
- Proper error handling and validation

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt.js

---

## 📁 Project Structure

backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js

frontend/
├── components/
├── pages/
├── services/
└── App.js


---

## 🔒 Role-Based Access Logic

| Role  | Permissions |
|------|-------------|
| Admin | Full CRUD access |
| User  | Read-only access |

---

## 📡 API Endpoints (Sample)

| Method | Endpoint | Access |
|------|---------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/community | User/Admin |
| POST | /api/community | Admin |
| PUT | /api/community/:id | Admin |
| DELETE | /api/community/:id | Admin |

---



