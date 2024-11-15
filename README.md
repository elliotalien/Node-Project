# Employee Management System

A full-stack web application for managing employee information with image upload capabilities using Cloudinary.

## 🌟 Live Demo
[View Live Demo](https://employemanagement.vercel.app)

## ✨ Features

- 👥 Employee Management (CRUD Operations)
- 🖼️ Image Upload with Cloudinary Integration
- 🔍 Search Functionality
- 📱 Responsive Design
- 🔐 User Authentication
- 📧 Email Verification
- 📄 Pagination

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- EJS (Embedded JavaScript templates)
- jQuery

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary (Image Storage)

### Authentication & Security
- JWT (JSON Web Tokens)
- bcryptjs
- Express Session

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x)
- MongoDB
- Cloudinary Account
- Email Service (for notifications)

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
secret_key=your_session_secret
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/elliotalien/Node-Project.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. For production
```bash
npm start
```

## 📋 API Endpoints

### Employee Routes
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /search/:key` - Search employees

### User Routes
- `/register` - User registration
- `/` - Login
- `/verifyUserEmail` - Email verification

## 💡 Key Features Explained

### Image Upload
- Direct upload to Cloudinary
- Supports various image formats
- Secure URL generation
- Image optimization

### Search Functionality
- Real-time search
- Multiple parameter search
- Pagination support

### Authentication
- Secure password hashing
- Session management
- Email verification
- Protected routes

## 🔧 Configuration

### Vercel Configuration
The project includes a `vercel.json` for deployment settings:
```json
{
    "version": 2,
    "builds": [
        {
            "src": "index.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "index.js"
        }
    ]
}
```

## 📝 License
ISC

## 👨‍💻 Author
Abhijith

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
