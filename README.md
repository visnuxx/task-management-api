# Task Management API

A REST API for managing tasks with role-based access control. Admins assign and update tasks, users can view their own profile and tasks.

## Features

- User registration and login with JWT authentication
- Role-based access control (admin / user)
- Admin can assign tasks to users and update task status
- Users can view their profile with assigned tasks
- Rate limiting on login and register endpoints
- Input validation on all routes
- Swagger API documentation
- Jest + Supertest integration tests
- Helmet for basic security headers

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL (via mysql2)
- **Auth:** JWT, bcryptjs
- **Docs:** Swagger (swagger-jsdoc + swagger-ui-express)
- **Security:** Helmet, express-rate-limit
- **Testing:** Jest, Supertest

## Project Structure

```
task-management-api/
├── server.js                  # Entry point
├── app.js                     # Express app setup
├── db.js                      # MySQL connection pool
├── swagger.js                 # Swagger config
├── Routes/
│   ├── usersRoutes.js         # User routes
│   └── adminRoutes.js         # Admin routes
├── Controller/
│   ├── userController.js      # User logic
│   └── adminController.js     # Admin logic
├── middleware/
│   ├── auth.js                # JWT verification
│   └── isAdmin.js             # Admin role check
├── validation/
│   ├── userValidate.js        # User input validation
│   ├── adminValidate.js       # Admin input validation
│   └── validation.js          # Rate limiter
├── errorHandler/
│   └── errorHandler.js        # Global error handler
└── tests/
    ├── auth.test.js            # Auth tests
    └── admin.test.js           # Admin tests
```

## Getting Started

### Prerequisites

- Node.js v18+
- MySQL database

### Installation

1. Clone the repository

```bash
git https://github.com/visnuxx/task-management-api.git
cd task-management-api
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables — create a `.env` file in the root:

```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_database_name
DB_PORT=3306
MY_SECRET_KEY=your_jwt_secret
```

4. Set up the database

> **You need to create the MySQL tables manually.** Run the following SQL in your database:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  status ENUM('pending', 'done') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

> To create an admin user, insert directly into the database and set `role = 'admin'`.

5. Start the server

```bash
npm start
```

Server runs on `http://localhost:8000`.

## API Endpoints

### User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register` | No | Register a new user |
| POST | `/api/login` | No | Login and receive JWT token |
| GET | `/api/profile` | Yes | Get logged-in user's profile and tasks |

### Admin

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/api/admin/create` | Yes | Admin | Assign a task to a user |
| GET | `/api/admin/view` | Yes | Admin | View all users with their tasks (paginated) |
| POST | `/api/admin/update-status` | Yes | Admin | Update a task's status |

### Auth Header Format

```
Authorization: Bearer <token>
```

### Pagination (admin view)

```
GET /api/admin/view?page=1&limit=10
```

Default: page `1`, limit `3`.

## Swagger Docs

Interactive API docs are available at:

```
http://localhost:8000/api-docs
```

## Running Tests

> **Note:** Tests use a live database connection. Make sure your `.env` is configured and the database is running before running tests. The test credentials in `tests/` are hardcoded — update them to match a valid user in your database.

```bash
npm test
```

Tests cover:
- Login success and failure cases
- Admin task creation with and without a token

## Rate Limiting

Login and register endpoints are limited to **5 requests per 15 minutes** per IP. Exceeding this returns a `429` response.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_DATABASE` | Database name |
| `DB_PORT` | MySQL port (default: 3306) |
| `MY_SECRET_KEY` | Secret key for signing JWT tokens |

## Notes

- JWT tokens expire after **1 hour**.
- The `.env` file is in `.gitignore` — never commit it with real credentials.