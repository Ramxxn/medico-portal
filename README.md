# ICRB Doctor Appointment System

A comprehensive full-stack web application for managing doctor appointments with separate interfaces for patients, doctors, and administrators. Built with modern web technologies to provide a seamless healthcare appointment booking experience.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Key Techniques & Methods](#key-techniques--methods)
- [Development Effort](#development-effort)
- [Demo Links](#demo-links)

## 🎯 Project Overview

ICRB Doctor Appointment System is a three-tier application consisting of:
- **Frontend**: Patient-facing web application for browsing doctors, booking appointments, and managing profiles
- **Admin Panel**: Administrative dashboard for managing doctors, appointments, and system oversight
- **Backend**: RESTful API server handling authentication, data management, and business logic

The system supports multiple user roles (Patients, Doctors, Administrators) with role-based access control and secure authentication mechanisms.

## ✨ Features

### Patient Features (Frontend)
- 🔍 Browse doctors by specialty
- 👨‍⚕️ View detailed doctor profiles
- 📅 Book appointments with date and time slot selection
- 📋 View and manage personal appointments
- 👤 Update user profile with image upload
- 🔐 Secure user authentication and registration
- 💳 Payment integration ready (Razorpay configured)

### Doctor Features (Admin Panel - Doctor Section)
- 📊 Doctor dashboard with earnings, patients, and appointment statistics
- 📅 View all appointments assigned to the doctor
- ✅ Mark appointments as completed
- ❌ Cancel appointments
- 👤 View and update doctor profile
- 🔐 Secure doctor authentication

### Admin Features (Admin Panel)
- 📊 Comprehensive dashboard with system statistics
- ➕ Add new doctors to the system
- 📋 View all appointments across the platform
- 👥 Manage doctor list and availability
- ❌ Cancel appointments on behalf of users
- 🔐 Secure admin authentication

## 🛠 Tech Stack

### Frontend & Admin Panel
- **React 19.1.0** - Modern UI library
- **React Router DOM 7.7.0** - Client-side routing
- **Vite 7.0.4** - Fast build tool and dev server
- **Tailwind CSS 3.4.x** - Utility-first CSS framework
- **Axios 1.11.0** - HTTP client for API calls
- **React Toastify 11.0.5** - Toast notifications
- **ESLint** - Code linting and quality

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.5** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **Bcrypt 6.0.0** - Password hashing
- **Multer 2.0.2** - File upload handling
- **Cloudinary 2.7.0** - Cloud image storage
- **Razorpay 2.9.6** - Payment gateway integration
- **Validator 13.15.15** - Input validation
- **CORS 2.8.5** - Cross-origin resource sharing
- **Dotenv 17.2.1** - Environment variable management

## 📁 Project Structure

```
ICRB_DOCTOR/
├── FRONTEND/                 # Patient-facing application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Banner.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RelatedDoctor.jsx
│   │   │   ├── SpecialityMenu.jsx
│   │   │   └── TopDoctors.jsx
│   │   ├── context/         # React Context for state management
│   │   │   └── AppContext.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── About.jsx
│   │   │   ├── Appointment.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   └── MyProfile.jsx
│   │   └── assets/         # Static assets
│   └── package.json
│
├── ADMIN/                    # Admin & Doctor panel
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/        # Context providers
│   │   │   ├── AdminContext.jsx
│   │   │   ├── AppContext.jsx
│   │   │   └── DoctorContext.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Admin/
│   │   │   │   ├── AddDoctor.jsx
│   │   │   │   ├── AllAppointments.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── DoctorsList.jsx
│   │   │   ├── Doctor/
│   │   │   │   ├── DoctorAppointment.jsx
│   │   │   │   ├── DoctorDashboard.jsx
│   │   │   │   └── DoctorProfile.jsx
│   │   │   └── Login.jsx
│   │   └── assets/         # Static assets
│   └── package.json
│
└── BACKEND/                  # API server
    ├── config/             # Configuration files
    │   ├── cloudinary.js   # Cloudinary setup
    │   └── mongodb.js      # MongoDB connection
    ├── controllers/        # Business logic
    │   ├── adminController.js
    │   ├── doctorController.js
    │   └── userController.js
    ├── middlewares/        # Express middlewares
    │   ├── authAdmin.js    # Admin authentication
    │   ├── authDoctor.js   # Doctor authentication
    │   ├── authUser.js     # User authentication
    │   └── multer.js       # File upload handling
    ├── models/             # Database schemas
    │   ├── appointmentModel.js
    │   ├── doctorModel.js
    │   └── userModel.js
    ├── routes/             # API routes
    │   ├── adminRoute.js
    │   ├── doctorRoute.js
    │   └── userRoute.js
    ├── server.js           # Entry point
    └── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- Git

### Environment Variables

Create a `.env` file in the `BACKEND` directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/icrb

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key

# Payment Gateway (Optional)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
CURRENCY=INR
```

Create a `.env` file in both `FRONTEND` and `ADMIN` directories:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ICRB_DOCTOR
   ```

2. **Backend Setup**
   ```bash
   cd BACKEND
   npm install
   npm start
   # or for development with auto-reload
   npm run server
   ```

3. **Frontend Setup**
   ```bash
   cd FRONTEND
   npm install
   npm run dev
   ```

4. **Admin Panel Setup**
   ```bash
   cd ADMIN
   npm install
   npm run dev
   ```

The applications will be available at:
- Backend API: `http://localhost:3000`
- Frontend: `http://localhost:5173` (default Vite port)
- Admin Panel: `http://localhost:5174` (or next available port)

## 📡 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /get-profile` - Get user profile (Protected)
- `POST /update-profile` - Update user profile (Protected)
- `POST /book-appointment` - Book appointment (Protected)
- `GET /appointments` - List user appointments (Protected)
- `POST /cancel-appointment` - Cancel appointment (Protected)

### Doctor Routes (`/api/doctor`)
- `GET /list` - Get all doctors (Public)
- `POST /login` - Doctor login
- `GET /doctor-appointments` - Get doctor's appointments (Protected)
- `POST /complete-appointment` - Mark appointment complete (Protected)
- `POST /cancel-appointment` - Cancel appointment (Protected)
- `GET /dashboard` - Get doctor dashboard data (Protected)
- `GET /profile` - Get doctor profile (Protected)
- `POST /update-profile` - Update doctor profile (Protected)

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /add-doctor` - Add new doctor (Protected)
- `POST /all-doctors` - Get all doctors (Protected)
- `POST /change-availability` - Toggle doctor availability (Protected)
- `GET /appointment-list` - Get all appointments (Protected)
- `POST /cancel-appointment` - Cancel appointment (Protected)
- `GET /dashboard` - Get admin dashboard data (Protected)

## 🔧 Key Techniques & Methods

### Authentication & Security
- **JWT (JSON Web Tokens)**: Secure token-based authentication for all user types
- **Bcrypt Password Hashing**: Passwords are hashed with salt rounds (10) before storage
- **Role-Based Access Control**: Separate middleware for admin, doctor, and user authentication
- **Token Validation**: Middleware checks token validity and user permissions before route access

### Database Design
- **MongoDB with Mongoose**: Flexible NoSQL database with schema validation
- **Embedded Documents**: User and doctor data embedded in appointment documents for quick access
- **Slot Management**: Dynamic slot booking system using nested objects (`slots_booked` in doctor model)
- **Indexing**: Unique email constraints and optimized queries

### File Upload & Storage
- **Multer**: Handles multipart/form-data for file uploads
- **Cloudinary Integration**: Cloud-based image storage and CDN delivery
- **Image Optimization**: Automatic image optimization and transformation via Cloudinary

### State Management
- **React Context API**: Centralized state management for user data, doctors list, and admin data
- **Local Storage**: Token persistence for maintaining user sessions
- **Context Providers**: Separate contexts for Admin, Doctor, and User states

### API Design
- **RESTful Architecture**: Standard HTTP methods (GET, POST) with clear resource naming
- **Error Handling**: Consistent error response format with success flags
- **Middleware Chain**: Request validation, authentication, and authorization middleware
- **Async/Await**: Modern asynchronous JavaScript for database operations

### Frontend Architecture
- **Component-Based Design**: Reusable React components for UI elements
- **React Router**: Client-side routing with protected routes
- **Responsive Design**: Tailwind CSS utility classes for mobile-first responsive design
- **Toast Notifications**: User feedback for actions using react-toastify

### Business Logic
- **Slot Availability Check**: Real-time slot availability validation before booking
- **Appointment Status Management**: Track appointment states (pending, completed, cancelled)
- **Earnings Calculation**: Aggregate earnings from completed appointments
- **Patient Counting**: Unique patient tracking for doctor statistics

## 💪 Development Effort

This project represents a comprehensive full-stack development effort with the following highlights:

### Backend Development
- ✅ RESTful API design with 20+ endpoints
- ✅ Three-tier authentication system (Admin, Doctor, User)
- ✅ Secure password hashing and JWT implementation
- ✅ File upload handling with cloud storage integration
- ✅ Complex slot booking algorithm with conflict prevention
- ✅ Payment gateway integration (Razorpay) setup
- ✅ Comprehensive error handling and validation

### Frontend Development
- ✅ Patient portal with 8+ pages
- ✅ Doctor browsing and filtering by specialty
- ✅ Appointment booking interface with date/time selection
- ✅ User profile management with image upload
- ✅ Responsive design for all screen sizes
- ✅ Real-time appointment status updates

### Admin Panel Development
- ✅ Dual-interface system (Admin + Doctor views)
- ✅ Dashboard with real-time statistics
- ✅ Doctor management system (CRUD operations)
- ✅ Appointment oversight and management
- ✅ Availability toggle system
- ✅ Latest bookings display with quick actions

### Database Design
- ✅ Three main models (User, Doctor, Appointment)
- ✅ Optimized schema with embedded documents
- ✅ Slot management system using nested objects
- ✅ Relationship mapping between entities

### Security Implementation
- ✅ JWT-based authentication
- ✅ Password encryption with bcrypt
- ✅ Role-based access control
- ✅ Input validation and sanitization
- ✅ Protected routes and API endpoints

### Integration & Configuration
- ✅ MongoDB connection and configuration
- ✅ Cloudinary image storage setup
- ✅ Environment variable management
- ✅ CORS configuration for cross-origin requests
- ✅ Payment gateway integration (ready for use)

## 🔗 Demo Links

### Live Demo
- **Frontend Application**: [Add your frontend deployment URL here]
- **Admin Panel**: [Add your admin panel deployment URL here]
- **API Documentation**: [Add your API documentation URL here]

### Video Demo
- **Full System Walkthrough**: [Add your video demo link here]
- **Patient Features Demo**: [Add patient demo link here]
- **Admin Features Demo**: [Add admin demo link here]
- **Doctor Features Demo**: [Add doctor demo link here]

### Screenshots
- **Homepage**: [Add screenshot link]
- **Doctor Listing**: [Add screenshot link]
- **Appointment Booking**: [Add screenshot link]
- **Admin Dashboard**: [Add screenshot link]
- **Doctor Dashboard**: [Add screenshot link]

## 📝 Notes

- The payment integration (Razorpay) is configured but commented out in the code. Uncomment and configure Razorpay credentials to enable payment functionality.
- Ensure MongoDB is running before starting the backend server.
- Cloudinary account is required for image upload functionality.
- All three applications (Frontend, Admin, Backend) need to run simultaneously for full functionality.

## 👨‍💻 Author

Developed with dedication and attention to detail, implementing modern web development best practices and security standards.

---

**Note**: Remember to update the demo links section with your actual deployment URLs and demo videos once the project is deployed.

