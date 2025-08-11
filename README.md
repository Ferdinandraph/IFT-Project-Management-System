# Undergraduate Project Repository and Management System for IFT Department

## System Overview
This system enables the Department of IFT admin to assign supervisors to students. Students can upload their projects and view feedback. Supervisors can review submissions, provide feedback, and approve or reject student projects.

## Technology Stack

- **Frontend**: React.js with Tailwind CSS  
  - Single-page application with responsive UI and reusable components.
- **Backend**: Node.js with Express.js  
  - RESTful API for user, supervisor, and project management.
- **Database**: MongoDB  
  - Stores users, supervisors, students, and project data.
- **Authentication**:  
  - JSON Web Tokens (JWT) for secure authentication.

## System Features

### 1. Admin Dashboard
**Purpose**: Manage supervisors, students, and project assignments.  
**Key Features**:
- Add, update, or remove supervisors and students.
- Assign supervisors to students.
- View overall project submission status.
- Manage user roles and permissions.

### 2. Supervisor Dashboard
**Purpose**: Review and manage assigned student projects.  
**Key Features**:
- View list of assigned students and their submissions.
- Download/Review submitted projects.
- Provide feedback
- Approve or reject student projects.

### 3. Student Dashboard
**Purpose**: Submit and manage project uploads, and view feedback.  
**Key Features**:
- Upload project Chapter 0ne to three and descriptions then later chapter four and five.
- View submission status and supervisor feedback.
- Track approval or rejection of submissions.

### 4. Authentication & Authorization
- Secure login system for admin, supervisors, and students.
- Role-based access controls to restrict features per user type.

## Sample Database Schema (MongoDB)

- **Admins**
  ```json
  {
    _id: ObjectId,
    name: String,
    email: String,
    password: String (hashed),
    role: "admin"
  }
  ```
- **Supervisors**
  ```json
  {
    _id: ObjectId,
    name: String,
    email: String,
    password: String (hashed),
    department: String,
    role: "supervisor"
  }
  ```
- **Students**
  ```json
  {
    _id: ObjectId,
    name: String,
    email: String,
    matricNumber: String,
    password: String (hashed),
    supervisorId: ObjectId,
    role: "student"
  }
  ```
- **Projects**
  ```json
  {
    _id: ObjectId,
    studentId: ObjectId,
    supervisorId: ObjectId,
    title: String,
    description: String,
    fileUrl: String,
    feedback: String,
    status: String, // "pending", "approved", "rejected"
    submittedAt: Date,
    updatedAt: Date
  }
  ```

## Security Considerations
- **Authentication**: All passwords are hashed using Bcrypt.
- **Authorization**: JWT for session management; role-based permissions.
- **Data Privacy**: Sensitive data encrypted where necessary.
- **Access Control**: Only admins can assign supervisors, only supervisors can approve/reject projects.

## Deployment
- **Frontend**: Vercel or Netlify
- **Backend**: Heroku or Render
- **Database**: MongoDB Atlas (cloud-based)

## Project Notes
- **Branding**: FUTO green/white color scheme, logo, and departmental branding.
- **Cost**: Built using free-tier cloud services for education and demo purposes.