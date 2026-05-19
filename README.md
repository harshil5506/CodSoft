# HYPERFIT — Premium Fitness & Health E-Commerce Platform

A production-ready full-stack e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js), featuring a premium Gen-Z monochrome design inspired by OUTFIT®.

## Key Features

- **Authentication**: JWT-based authentication, user register/login, forgot password, cookie-based session management, and protected routes.
- **Shop & Catalog**: Dynamic products lists, keyword-based search filters, categories filtering sidebar, and clean product details page with option selector.
- **Cart & Checkout**: Interactive client-side cart logic with customizable attributes (Size/Flavor), and mock checkout workflow connected to orders database.
- **Admin Dashboard**: Comprehensive systems control panel for managing products, tracking customer orders, reviewing user list, and viewing aggregate sales stats.
- **Database Architecture**: Structured schemas for users, products, orders, cart state, reviews, coupons, and wishlist.

---

## Folder Structure

```text
hyperfit/
├── frontend/             # Vite + React + Tailwind + Redux
│   ├── src/
│   │   ├── components/   # UI elements, Navbar, Footer
│   │   ├── pages/        # Shop, Cart, Checkout, Auth, Admin
│   │   ├── store/        # Redux Toolkit config & slices
│   │   ├── services/     # Axios API connection instances
│   │   └── App.jsx       # App router mapping
│   └── tailwind.config.js
└── backend/              # Node.js + Express API server
    ├── server.js
    └── src/
        ├── config/       # MongoDB configurations
        ├── models/       # Mongoose Schemas
        ├── controllers/  # API business logic
        └── routes/       # Express route handlers
```

---

## Local Development Setup

### Prerequisite
Make sure MongoDB is running locally on your computer at `mongodb://localhost:27017/hyperfit`.

### Backend Setup
1. Open a terminal in `backend/` directory.
2. Install packages:
   ```bash
   npm install
   ```
3. Run the database seed script to populate products:
   ```bash
   npm run seed
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a terminal in `frontend/` directory.
2. Install packages:
   ```bash
   npm install
   ```
3. Start the UI development server:
   ```bash
   npm run dev
   ```

---

## API Documentation

### Auth Endpoints (`/api/auth`)
- `POST /register` — Register a new user
- `POST /login` — Authenticate user and return cookie
- `POST /logout` — Clear active cookie session
- `GET /profile` — Retrieve current user profile (requires auth header)

### Product Endpoints (`/api/products`)
- `GET /` — Fetch all products with search & category filters
- `GET /slug/:slug` — Retrieve single product details by slug

### Cart Endpoints (`/api/cart`)
- `GET /` — Get user cart state
- `POST /add` — Add an item to user cart

### Order Endpoints (`/api/orders`)
- `POST /` — Create a new customer order
- `GET /my-orders` — Retrieve active user's order history

### Admin Endpoints (`/api/admin`)
- `GET /dashboard` — System statistics for administrative users
- `POST /products` — Add a new product to inventory
- `DELETE /products/:id` — Remove a product
- `GET /users` — Get list of all registered users
