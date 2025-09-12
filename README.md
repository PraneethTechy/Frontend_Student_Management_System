# 🎓 Student Attendance Management System - Frontend



This is the **Frontend** of the Student Attendance Management System, built with **React** and **Tailwind CSS**.  
It provides a user-friendly interface for teachers to manage classes, students, and attendance also offers you to **create multiple classes under one teacher account**.

---





**Frontend Deployed Link** : https://frontend-student-management-system-eight.vercel.app/login 


**Backend Deployed Link** : https://backend-student-attendence-managment.onrender.com/ 

---

## ⚡ API Endpoints

### 🔐 Auth
- `POST /api/auth/register` → Register teacher.  
- `POST /api/auth/login` → Login teacher & get token.  

### 🏫 Classes
- `POST /api/classes` → Create a new class.  
- `GET /api/classes` → Get all classes of a teacher.  

### 👨‍🎓 Students
- `POST /api/students` → Add a student.  
- `GET /api/students?classId=123` → Get students by class.  
- `PUT /api/students/:id` → Update student details.  
- `DELETE /api/students/:id` → Remove student.  

### 📋 Attendance
- `POST /api/attendance` → Take attendance for a class.  
- `GET /api/attendance?classId=123&date=2025-09-12` → View attendance records.  

---

## ⚡ Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/backend-student-management.git
   cd backend-student-management
