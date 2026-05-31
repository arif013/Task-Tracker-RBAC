# Task Management System API

A role-based Task Management System built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

---

## 📚 Table of Contents

- [Features](#features)
- [Authentication APIs](#authentication-apis)
  - [User Registration](#1-user-registration)
  - [User Login](#2-user-login)
  - [Refresh Access Token](#3-refresh-access-token)

- [User Management APIs](#user-management-apis)
  - [Get All Users](#1-get-all-users)
  - [Update User Role](#2-update-user-role)

- [Project Management APIs](#project-management-apis)
  - [Create Project](#1-create-project)
  - [Get All Projects](#2-get-all-projects)

- [Task Management APIs](#task-management-apis)
  - [Create Task](#1-create-task)
  - [Update Task Status](#2-update-task-status)

- [Task Workflow](#task-workflow)
- [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
  - [Member](#member)
  - [Manager](#manager)
  - [Admin](#admin)

- [Authentication Flow](#authentication-flow)
- [Tech Stack](#tech-stack)
- [Future Enhancements](#future-enhancements)
- [API Base URL](#api-base-url)

---

## Features

- JWT Authentication (Access Token + Refresh Token)
- Role-Based Access Control (RBAC)
- User Management
- Project Management
- Task Management
- Secure Refresh Token Flow
- Task Status Transition Validation

---

# Authentication APIs

## 1. User Registration

### Endpoint

```http
POST /api/signup
```

### Request Body

```json
{
  "name": "Arif",
  "email": "mdarif1@gmail.com",
  "password": "1234"
}
```

### Response

```json
{
  "accessToken": "JWT_ACCESS_TOKEN",
  "user": {
    "id": "6a1b2a0ae2c58634138cc343",
    "name": "Arif",
    "email": "mdarif1@gmail.com",
    "role": "member"
  }
}
```

### Notes

- Every newly registered user gets the default role **member**.
- A **Refresh Token** is automatically stored in an HTTP-only cookie.
- Access Token should be stored on the client side and sent in the Authorization header.

---

## 2. User Login

### Endpoint

```http
POST /api/login
```

### Request Body

```json
{
  "email": "mdarif1@gmail.com",
  "password": "1234"
}
```

### Response

```json
{
  "accessToken": "JWT_ACCESS_TOKEN",
  "user": {
    "id": "6a1b2a0ae2c58634138cc343",
    "name": "Arif",
    "email": "mdarif1@gmail.com",
    "role": "member"
  }
}
```

### Notes

- On successful login, a Refresh Token is stored in an HTTP-only cookie.
- Access Token is returned in the response body.

---

## 3. Refresh Access Token

### Endpoint

```http
POST /api/refresh-token
```

### When to Use

Whenever an API request returns:

```http
401 Unauthorized
```

or any token-expired related response, call this endpoint to generate a new Access Token.

### Response

```json
{
  "accessToken": "NEW_ACCESS_TOKEN"
}
```

### Internal Flow

1. Reads Refresh Token from HTTP-only cookie.
2. Verifies Refresh Token using `jwt.verify()`.
3. Generates a new Access Token.
4. Returns the new Access Token to the client.

---

# User Management APIs

## 1. Get All Users

### Endpoint

```http
GET /api/all-users
```

### Authorization

```text
Admin Only
```

### Description

Returns all registered users in the system.

---

## 2. Update User Role

### Endpoint

```http
PATCH /api/users/:id/role
```

### Description

Allows an Admin to promote a user from:

```text
member → manager
```

### Example

```http
PATCH /api/users/6a1b2a0ae2c58634138cc343/role
```

### Authorization

```text
Admin Only
```

### Notes

Role protection is implemented using:

```javascript
authorize("admin");
```

---

# Project Management APIs

## Roles Allowed

```text
Admin
Manager
```

---

## 1. Create Project

### Endpoint

```http
POST /api/projects/create-project
```

### Request Body

```json
{
  "title": "nxtwave",
  "createdBy": "manager"
}
```

### Response

```json
{
  "success": true,
  "message": "Project created successfully",
  "createProject": {
    "title": "nxtwave",
    "createdBy": "manager",
    "isActive": true,
    "_id": "6a1c10e98f3c2e44a57651af",
    "createdAt": "2026-05-31T10:43:53.179Z",
    "updatedAt": "2026-05-31T10:43:53.179Z"
  }
}
```

### Validation

Project titles must be unique.

Example:

```text
❌ Project A
❌ Project A
```

Duplicate project names are not allowed.

---

## 2. Get All Projects

### Endpoint

```http
GET /api/projects/all-projects
```

### Authorization

```text
Admin
Manager
```

### Description

Fetches all projects from the database.

---

# Task Management APIs

## Roles Allowed

```text
Admin
Manager
```

---

## 1. Create Task

### Endpoint

```http
POST /api/tasks/create-task
```

### Request Body

```json
{
  "title": "Task2",
  "description": "this is the description of task2",
  "priority": "HIGH",
  "assignee": "6a1b2a0ae2c58634138cc343",
  "project": "6a1c0fb5c4ca7455cd94a21f"
}
```

### Response

```json
{
  "success": true,
  "message": "Task created successfully",
  "createdTask": {
    "_id": "6a1ca470fafd49e559b8da06",
    "title": "Task2",
    "description": "this is the description of task2",
    "priority": "HIGH",
    "status": "TODO",
    "assignee": "6a1b2a0ae2c58634138cc343",
    "project": "6a1c0fb5c4ca7455cd94a21f",
    "createdBy": "6a1a90b62af0c6edf8f17b57",
    "createdAt": "2026-05-31T21:13:20.877Z",
    "updatedAt": "2026-05-31T21:13:20.877Z"
  }
}
```

### Default Status

Every newly created task starts with:

```text
TODO
```

---

## 2. Update Task Status

### Endpoint

```http
PATCH /api/tasks/:taskId/status
```

### Example

```http
PATCH /api/tasks/6a1ca470fafd49e559b8da06/status
```

### Request Body

```json
{
  "status": "IN_PROGRESS"
}
```

### Response

```json
{
  "success": true,
  "task": {
    "_id": "6a1ca470fafd49e559b8da06",
    "title": "Task2",
    "description": "this is the description of task2",
    "priority": "HIGH",
    "status": "IN_PROGRESS",
    "assignee": "6a1b2a0ae2c58634138cc343",
    "project": "6a1c0fb5c4ca7455cd94a21f",
    "createdBy": "6a1a90b62af0c6edf8f17b57",
    "createdAt": "2026-05-31T21:13:20.877Z",
    "updatedAt": "2026-05-31T21:16:36.370Z"
  }
}
```

---

# Task Workflow

Tasks cannot jump to arbitrary statuses.

Only valid transitions are allowed.

```text
TODO
  ↓
IN_PROGRESS
  ↓
DONE
```

### Valid Transitions

```text
TODO → IN_PROGRESS
IN_PROGRESS → DONE
```

### Invalid Transitions

```text
TODO → DONE ❌
DONE → TODO ❌
DONE → IN_PROGRESS ❌
```

This ensures a controlled task lifecycle.

---

# Role-Based Access Control (RBAC)

## Member

Allowed Actions:

- Login
- Refresh Token
- View Assigned Tasks (future implementation)

Not Allowed:

- Create Projects
- Create Tasks
- Manage Users

---

## Manager

Allowed Actions:

- Create Projects
- View Projects
- Create Tasks
- Manage Assigned Work

---

## Admin

Full System Access:

- Manage Users
- Promote Members to Managers
- Create Projects
- View Projects
- Create Tasks
- Manage Entire Platform

---

# Authentication Flow

```text
User Login
     │
     ▼
Access Token + Refresh Token
     │
     ▼
Access Token Sent With API Requests
     │
     ▼
Access Token Expires
     │
     ▼
Call /api/refresh-token
     │
     ▼
New Access Token Generated
     │
     ▼
Continue Using APIs
```

---

# Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT (Access Token)
- JWT (Refresh Token)
- HTTP-Only Cookies

### Authorization

- Role-Based Access Control (RBAC)

---

# Future Enhancements

- Assign multiple users to a task
- Project analytics dashboard
- Task comments
- Activity logs
- File attachments
- Email notifications
- Due dates and reminders
- Task filtering and search
- Pagination for users, projects, and tasks
- Soft delete functionality

---

# API Base URL

```http
http://localhost:3000/api
```
