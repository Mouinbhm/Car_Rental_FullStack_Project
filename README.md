# 🚗 Drive Safe Rentals - Car Rental System

A full-stack car rental management system built with React.js frontend and Node.js backend with MongoDB database.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 User Features

- **Browse Cars**: View available vehicles by category (Economy, Compact, Midsize, Fullsize, SUV, Van, Pickup, Luxury, Sport)
- **Car Details**: Detailed information including specifications, features, and pricing
- **Booking System**: Complete rental booking with pickup/dropoff locations and dates
- **User Authentication**: Register and login functionality
- **Booking Management**: View and manage rental bookings
- **Contact Support**: Contact form for customer support
- **Destinations**: Explore popular rental destinations

### 🔧 Admin Features

- **Dashboard**: Analytics and overview of rental operations
- **Vehicle Fleet Management**: Add, edit, and manage car inventory
- **Booking Management**: View and manage all customer bookings
- **User Management**: Admin user authentication and management
- **Contact Messages**: View and respond to customer inquiries

### 🎨 UI/UX Features

- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Clean and professional interface with Tailwind CSS
- **Animations**: Smooth animations using AOS (Animate On Scroll)
- **Interactive Elements**: Hover effects and smooth transitions
- **Print Support**: Printable booking confirmations

## 🛠 Tech Stack

### Frontend

- **React.js 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **AOS** - Animate On Scroll library
- **React Icons** - Icon library
- **Chart.js & Recharts** - Data visualization
- **Framer Motion** - Animation library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
Car_Rental_FullStack_Project/
├── Frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── assets/          # Static assets (images, logos)
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── public/              # Public assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── Backend/                  # Node.js backend application
│   ├── routes/              # API route definitions
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── middlewares/         # Custom middleware
│   ├── services/            # Business logic services
│   ├── config/              # Configuration files
│   ├── public/              # Static files
│   ├── app.js               # Express application setup
│   └── package.json         # Backend dependencies
└── README.md                # Project documentation
```

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see Environment Variables section)

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📖 Usage

### Development Mode

- Backend runs on: `http://localhost:5000`
- Frontend runs on: `http://localhost:5173`

### Production Build

```bash
# Frontend build
cd Frontend
npm run build

# Backend start
cd Backend
npm start
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login

### Cars

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `GET /api/cars/category/:category` - Get cars by category
- `POST /api/cars` - Add new car (Admin)
- `PUT /api/cars/:id` - Update car (Admin)
- `DELETE /api/cars/:id` - Delete car (Admin)

### Bookings

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact messages (Admin)

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car_rental
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend

The frontend uses the backend URL defined in API calls. Update the `API_BASE_URL` in components if needed.

## 🎨 Customization

### Logo Customization

1. Replace `Frontend/src/assets/logo.png` with your logo
2. Recommended size: 40x40 pixels minimum
3. Supported formats: PNG, SVG, JPG

### Styling

- Modify `Frontend/src/index.css` for global styles
- Update `Frontend/tailwind.config.js` for Tailwind customization
- Component-specific styles are in individual component files

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check connection string in .env file

2. **Port Already in Use**

   - Change PORT in .env file
   - Kill existing processes on the port

3. **CORS Errors**

   - Verify backend CORS configuration
   - Check frontend API base URL

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check for dependency conflicts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Drive Safe Rentals Team** - _Initial work_

## 🙏 Acknowledgments

- React.js community
- Tailwind CSS team
- MongoDB documentation
- Express.js framework

---

**Drive Safe Rentals** - Making car rental simple and secure! 🚗✨
