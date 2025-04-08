# 🎓 Student Course Registration System

A simple web-based system for managing students, courses, and enrollments built using **Express.js**, **MySQL**, and **HTML/CSS/JS**.

---

## 📁 Project Structure

```
student-course-registration/
│
├── public/               # Frontend (static HTML/CSS/JS)
│   ├── index.html
│   ├── view.html
│   ├── students.html
│   ├── courses.html
│   ├── enrollments.html
│   ├── view.js
│   └── ...etc
│
├── routes/               # Express route handlers (API)
│   ├── students.js
│   ├── courses.js
│   ├── enrollments.js
│   └── auth.js (optional login/signup)
│
├── db.js                 # MySQL database connection
├── app.js                # Express app setup
├── package.json
└── README.md             # You're here!
```

---

## 🚀 Features

- Add, update, delete **students**
- Add, update, delete **courses**
- Enroll students in courses
- View and filter all enrollments
- Sort by student or course
- Optional: Login/Signup authentication

---

## 🛠 Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Frontend**: HTML, CSS, Vanilla JS (no frameworks)
- **Other**: RESTful APIs, SQL Joins

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/student-course-registration.git
cd student-course-registration
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MySQL

- Make sure **MySQL Server** is running.
- Create a database and required tables.

Example SQL schema:

```sql
CREATE DATABASE registration;

USE registration;

CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

Update `db.js` with your MySQL credentials:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'registration'
});
```

### 4. Run the server

```bash
node app.js
```

Server will start on `http://localhost:3000`

---

## 🔗 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | /api/students       | List all students        |
| POST   | /api/students       | Add or update a student  |
| DELETE | /api/students/:id   | Delete a student         |
| GET    | /api/courses        | List all courses         |
| POST   | /api/courses        | Add or update a course   |
| DELETE | /api/courses/:id    | Delete a course          |
| GET    | /api/enrollments    | List all enrollments     |
| POST   | /api/enrollments    | Enroll student to course |
| DELETE | /api/enrollments    | Remove enrollment        |

---

## ✨ Screenshots

_Add screenshots of your UI here if needed_

---

## 🙌 Acknowledgements

Made with ❤️ using Node.js, Express.js, and MySQL

---

## 📜 License

MIT License