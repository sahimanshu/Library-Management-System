# Library-Management-System

# Library Management System Backend

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** for managing books, students, book issuance, and returns in a library.

## Features

* Add and view books
* Add and view students
* Issue books to students
* Return issued books
* Track issued and returned books
* MySQL database integration
* MVC architecture (Routes + Controllers)
* Environment variable support with dotenv

## Tech Stack

* Node.js
* Express.js
* MySQL
* mysql2
* dotenv
* cors

## Project Structure

```text
project/
│
├── controllers/
│   ├── bookController.js
│   ├── studentController.js
│   ├── issuedBookController.js
│   └── returnBookController.js
│
├── routes/
│   ├── bookRoutes.js
│   ├── studentRoutes.js
│   ├── issuedBookRoutes.js
│   └── returnBookRoutes.js
│
├── database/
│   ├── db.js
│   └── schema.sql
│
├── .env
├── package.json
└── server.js
```

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd library-management-system
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=9999

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=library_management
```

### Create Database

Open MySQL and execute the contents of `database/schema.sql`.

```sql
CREATE DATABASE library_management;
USE library_management;
```

After selecting the database, run all table creation queries from `schema.sql`.

### Start the Server

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

Server runs on:

```text
http://localhost:9999
```

## Database Schema

### Books

| Column           | Type         |
| ---------------- | ------------ |
| book_id          | INT          |
| title            | VARCHAR(255) |
| author           | VARCHAR(255) |
| category         | VARCHAR(100) |
| available_copies | INT          |

### Students

| Column     | Type         |
| ---------- | ------------ |
| student_id | INT          |
| name       | VARCHAR(255) |
| email      | VARCHAR(255) |

### Issued Books

| Column      | Type |
| ----------- | ---- |
| issue_id    | INT  |
| student_id  | INT  |
| book_id     | INT  |
| issue_date  | DATE |
| return_date | DATE |
| status      | ENUM |

### Return Books

| Column         | Type |
| -------------- | ---- |
| return_book_id | INT  |
| student_id     | INT  |
| book_id        | INT  |
| return_date    | DATE |

## API Endpoints

### Books

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| POST   | /api/books | Add Book      |
| GET    | /api/books | Get All Books |

### Students

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| POST   | /api/students | Add Student      |
| GET    | /api/students | Get All Students |

### Issued Books

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | /api/issued-books | Issue Book       |
| GET    | /api/issued-books | Get Issued Books |

### Return Books

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | /api/return-books | Return Book        |
| GET    | /api/return-books | Get Returned Books |

## Sample Request

### Add Book

```http
POST /api/books
```

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "category": "Self Help",
  "available_copies": 10
}
```

### Add Student

```http
POST /api/students
```

```json
{
  "name": "Hemant",
  "email": "hemant@example.com"
}
```

## Future Improvements

* Authentication and Authorization
* Fine Calculation for Late Returns
* Search Books by Title or Author
* Pagination
* Dashboard Analytics
* Role-Based Access Control
* Docker Support
* Unit and Integration Testing

## Author

Hemant Sah

## License

This project is licensed under the MIT License.
