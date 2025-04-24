# 🔐 User Management API

## 📋 Overview

This API provides user authentication, authorization, and management functionality with role-based access control.

## 🚀 API Endpoints

### 🔑 Authentication

- `POST /api/v1/users/register` - Register a new user
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "user" // Optional, defaults to "user"
  }
  ```

- `POST /api/v1/login` - User login
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
  Returns JWT token for authentication

- `POST /api/v1/forgot-password` - Request password reset
  ```json
  {
    "email": "john@example.com"
  }
  ```

- `POST /api/v1/reset-password/:token` - Reset password with token
  ```json
  {
    "password": "newpassword"
  }
  ```

### 👤 User Management

- `PATCH /api/v1/users/:id` - Update user information
- `DELETE /api/v1/users/:id` - Delete a user

### 🔒 Role-Based Access Routes

- `GET /api/v1/admin` - Admin only route
- `GET /api/v1/manager` - Admin and manager access
- `GET /api/v1/user` - All authenticated users access

## 🔐 Authentication

All protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👑 Role Hierarchy

- **Admin**: Full access to all routes
- **Manager**: Access to manager and user routes
- **User**: Access to user routes only

## ⚙️ Environment Variables

The application requires the following environment variables:
- `JWT_SECRET`: Secret key for JWT token generation
- Database configuration variables (see .env.example)

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with required environment variables
4. Start the server: `npm start`

## 💾 Database Schema

The user table contains the following fields:
- id: Primary key
- username: User's display name
- email: User's email (unique)
- password: Hashed password
- role: User role (admin, manager, or user)
