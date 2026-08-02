# EcoStay – AI-Powered Homestay Booking Platform 🌿🏡

[![React](https://img.shields.io/badge/React-18.x-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![Groq AI](https://img.shields.io/badge/Groq%20AI-Llama%203.3-f3603f?style=for-the-badge&logo=openai&logoColor=white)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT Auth](https://img.shields.io/badge/JWT-Protected-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=a5915f)](https://jwt.io/)
[![GitHub OAuth](https://img.shields.io/badge/GitHub%20OAuth-2.0-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

**EcoStay** is a production-grade, full-stack AI-powered eco-tourism homestay booking platform designed for discovering and reserving sustainable homestays, mountain chalets, riverside lodges, and eco-villas across 31+ major tourist destinations in India.

Built with a high-performance **React + Vite** frontend and a **PostgreSQL-backed FastAPI** backend, EcoStay integrates real-time Groq Llama-3.3 AI travel planning, secure JWT authentication with bcrypt hashing, GitHub OAuth 2.0 single sign-on, Razorpay payment verification, rate limiting, and an intuitive user dashboard with gallery profile photo uploads.

---

## 🌐 Live Demo

- **Frontend Application (Vercel)**: [https://YOUR-VERCEL-URL](https://YOUR-VERCEL-URL)
- **Backend API & Swagger Docs (Render)**: [https://YOUR-RENDER-URL](https://YOUR-RENDER-URL)
- **API Interactive Swagger Documentation**: [https://YOUR-RENDER-URL/docs](https://YOUR-RENDER-URL/docs)

---

## 📸 Screenshots Section

| Home Page Hero & Showcase | User Dashboard & Gallery Upload |
|:---:|:---:|
| ![Home Page](./screenshots_placeholder/home_page.png) | ![Dashboard](./screenshots_placeholder/dashboard.png) |

| Authentication (Login & Register) | Full CRUD Property Management |
|:---:|:---:|
| ![Login Page](./screenshots_placeholder/login.png) | ![CRUD Management](./screenshots_placeholder/crud.png) |

| AI Travel Assistant (Groq Powered) | Mobile Responsive Layout (375px) |
|:---:|:---:|
| ![AI Assistant](./screenshots_placeholder/ai_assistant.png) | ![Responsive Design](./screenshots_placeholder/responsive.png) |

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation & Local Setup](#-installation--local-setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints Reference](#-api-endpoints-reference)
- [AI Integration (Groq Llama-3.3)](#-ai-integration-groq-llama-33)
- [Database & ER Diagram](#-database--er-diagram)
- [Security Features](#-security-features)
- [Performance Optimizations](#-performance-optimizations)
- [Deployment Guide](#-deployment-guide)
- [Known Limitations](#-known-limitations)
- [Future Improvements](#-future-improvements)
- [Contributors & License](#-contributors--license)

---

## 🌟 Project Overview

### Introduction
The eco-tourism sector in India is rapidly expanding, yet travelers face significant challenges finding genuinely verified, sustainable accommodations. **EcoStay** bridges this gap by combining modern web architecture with artificial intelligence to deliver a seamless search, booking, and travel-planning experience.

### Purpose
Created as a comprehensive full-stack internship project (spanning Weeks 1 through 9), EcoStay demonstrates end-to-end software development lifecycle practices — from initial UI wireframing and FastAPI endpoint design to PostgreSQL database management, OAuth 2.0 integrations, Groq LLM assistance, and cloud deployment.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Secure Registration & Login**: User registration with instant bcrypt password hashing (`salt_rounds = 12`).
- **Stateless JWT Authorization**: Cryptographically signed access tokens using `HS256` with a 7-day expiration window.
- **GitHub OAuth 2.0 Integration**: Single Sign-On flow with automatic profile initialization and primary email resolution.
- **Protected Routes & Guards**: Client-side React Router guards (`/dashboard`, `/my-bookings`) and backend middleware token enforcement.
- **Session Revocation & Logout**: Server-side session blacklist management with database storage.

### 🏡 Property Management (Complete CRUD)
- **Create**: Add new eco-homestays with location metadata, pricing, capacity, amenities, eco-credentials, and image galleries.
- **Read**: Advanced filtering by city, region, price range, min rating, max guests, category, and amenities.
- **Update**: Full property details modification via authenticated endpoints.
- **Delete**: Property deletion with relational cascade cleanup.

### 🧳 Booking System & Wishlists
- **Real-Time Reservations**: Nightly rate computation, guest count checks, and status tracking (`confirmed`, `upcoming`, `completed`, `cancelled`).
- **Razorpay Integration**: Server-side order creation and signature verification flow.
- **Trip Cancellation with Confirmation**: Interactive confirmation dialogs preventing accidental cancellations.
- **Wishlist Management**: One-click favorite toggling backed by a PostgreSQL junction table (`wishlists`).

### 🤖 AI Travel Assistant (Groq LLM)
- **Natural Language Travel Assistant**: Powered by Groq's `llama-3.3-70b-versatile` model.
- **Context-Aware Recommendations**: System prompt injects real database properties so the AI suggests active EcoStay listings first.
- **Floating Chat Widget & Full Page AI Planner**: Interactive chat available everywhere on the platform.
- **Markdown Response Rendering**: Clean rendering of AI itineraries, budget advice, packing lists, and destination tips.

### 👤 User Dashboard & Profile Management
- **Local Photo Upload**: Direct device gallery photo upload (`FileReader` to base64) with instant PostgreSQL persistence.
- **Avatar Fallback**: Initials-based gradient badge fallback for accounts without custom images.
- **Stats Dashboard**: Live tracking of trips booked, saved wishlist stays, and written reviews.
- **Account Settings**: Password change panel with current password verification.

### 🎨 UI Polish, Loading, Error & Empty States
- **React Error Boundary**: Catches unexpected render crashes gracefully without blank screens.
- **Polished Empty States**: `<EmptyStateBlock>` with custom icons, action buttons, and clear guidance for zero-result states.
- **Toast Notifications**: System-wide feedback for successful actions and error handling.
- **100% Responsive Layouts**: Tested across 375px mobile, 768px tablet, and 1440px desktop breakpoints using Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Vanilla CSS design system, dark mode support)
- **Routing**: React Router v6
- **Icons & Assets**: Custom SVG design system + Lucide icons
- **HTTP Client**: Custom Fetch wrapper (`apiClient`) with automatic JWT header injection

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **ORM**: SQLAlchemy
- **Data Validation**: Pydantic v2
- **Password Hashing**: Passlib + Bcrypt
- **Rate Limiting**: SlowAPI (limiter middleware)
- **WSGI/ASGI Server**: Uvicorn

### Database
- **Primary Database**: PostgreSQL hosted on Supabase (with transaction pooling on port 6543)
- **Failsafe Storage**: SQLite (`ecostay.db`) automatic fallback for offline development

### Authentication & Security
- PyJWT (JSON Web Tokens)
- GitHub OAuth 2.0
- Bcrypt Hashing
- SlowAPI Rate Limiter

### AI & External APIs
- **LLM Engine**: Groq SDK (`llama-3.3-70b-versatile`)
- **Payment Gateway**: Razorpay Test Mode SDK

### Deployment
- **Frontend**: Vercel
- **Backend**: Render (Web Service)

---

## 📁 Folder Structure

```text
EcoStay/
├── ecostay-frontend/
│   ├── backend/
│   │   ├── models/
│   │   │   ├── db_models.py       # SQLAlchemy ORM Table definitions (User, Session, Property, Booking, Wishlist)
│   │   │   ├── property_store.py  # 62 curated Indian homestay records with location photos
│   │   │   ├── seed_data.py       # Database auto-seeding logic
│   │   │   └── user_store.py      # Password hashing & verification utilities
│   │   ├── routes/
│   │   │   ├── ai.py              # Groq AI travel assistant endpoint (/api/ai/travel-assistant)
│   │   │   ├── auth.py            # Authentication, profile update, password change & OAuth endpoints
│   │   │   ├── bookings.py        # Booking creation, retrieval, payment verification & cancellation
│   │   │   └── properties.py      # Property CRUD & search endpoints
│   │   ├── schemas/
│   │   │   ├── booking.py         # Pydantic schemas for booking payloads
│   │   │   ├── property.py        # Pydantic schemas for property requests/responses
│   │   │   └── user.py            # Pydantic schemas for auth & user profiles
│   │   ├── .env.example           # Backend environment configuration template
│   │   ├── database.py            # SQLAlchemy database engine & pooler initialization
│   │   ├── main.py                # FastAPI entry point, CORS middleware & exception handlers
│   │   └── requirements.txt       # Backend Python dependencies
│   ├── src/
│   │   ├── assets/                # High-res local destination photography (Shimla, Kasol, Rishikesh, etc.)
│   │   ├── components/
│   │   │   ├── ai/                # Message bubbles, typing indicator & AI empty state
│   │   │   ├── auth/              # Protected route wrappers
│   │   │   ├── chat/              # Floating ChatWidget component
│   │   │   ├── destination/       # Destination cards
│   │   │   ├── layout/            # Navbar, Footer & ThemeToggle
│   │   │   ├── listings/          # FilterSidebar & category scroller
│   │   │   ├── property/          # PropertyCard & BookingCard
│   │   │   ├── search/            # SearchBar component
│   │   │   └── ui/                # Button, Input, Loader, Modal, Toast, ErrorBoundary & UserAvatar
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # React Authentication state & token persistence
│   │   │   ├── ThemeContext.jsx   # Dark/Light mode theme state
│   │   │   └── ToastContext.jsx   # Global toast notifications context
│   │   ├── pages/
│   │   │   ├── AboutPage.jsx      # About EcoStay mission
│   │   │   ├── AIChatPage.jsx     # Dedicated Groq AI Travel Assistant workspace
│   │   │   ├── DashboardPage.jsx  # User Profile, gallery upload, bookings, wishlist & settings
│   │   │   ├── DestinationsPage.jsx# Destination catalog across India
│   │   │   ├── ExperiencesPage.jsx # Sustainable travel activities
│   │   │   ├── HomePage.jsx       # Hero section, showcase grid & featured stays
│   │   │   ├── ListingsPage.jsx   # Property search with pagination & filters
│   │   │   ├── LoginPage.jsx      # User login form & GitHub OAuth trigger
│   │   │   ├── PropertyDetailsPage.jsx # Complete property information & booking card
│   │   │   └── RegisterPage.jsx   # Account creation form
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx      # React Router configuration
│   │   ├── services/
│   │   │   ├── aiService.js       # Groq AI backend API client
│   │   │   ├── api.js             # Base Fetch client with JWT interceptor
│   │   │   ├── destinationsData.js# Destinations list & image mappings
│   │   │   └── propertyService.js # Property API service calls
│   │   ├── App.jsx                # Application root with ErrorBoundary
│   │   ├── index.css              # Tailwind CSS imports & animations
│   │   └── main.jsx               # React DOM render entry point
│   ├── package.json               # Frontend dependencies & scripts
│   ├── tailwind.config.js         # Tailwind configuration
│   └── vite.config.js             # Vite build configuration
└── README.md                      # Master Project Documentation
```

---

## ⚡ Installation & Local Setup

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **Python**: `3.10` or higher
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/VIS030/EcoStay.git
cd EcoStay
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd ecostay-frontend/backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment configuration:
   ```bash
   cp .env.example .env
   ```
5. Update your `.env` file with appropriate keys (database URL, JWT secret, Groq API key).
6. Start the FastAPI backend server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The backend server will run at `http://localhost:8000`. Access Swagger UI docs at `http://localhost:8000/docs`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the project root:
   ```bash
   cd ecostay-frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

---

## 🔑 Environment Variables

### Backend Configuration (`ecostay-frontend/backend/.env`)

| Variable Name | Description | Example / Default Value |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Supabase) | `postgresql://user:pass@ep-pooler.supabase.com:6543/postgres` |
| `JWT_SECRET` | Secret key for signing session JWT tokens | `super_secret_ecostay_development_key_123456789` |
| `JWT_ALGORITHM` | Algorithm used for token signing | `HS256` |
| `GITHUB_CLIENT_ID` | OAuth Client ID from GitHub Developer settings | `Ov23linuVplrefPiySnz` |
| `GITHUB_CLIENT_SECRET` | OAuth Client Secret from GitHub | `8ec19bee3520be942d40b88188056721b2bca2bd` |
| `GROQ_API_KEY` | API Key from Groq Cloud Console | `gsk_XTzwzw0KGilZV6DWydPeWGdyb...` |
| `GROQ_MODEL` | Groq Llama LLM model ID | `llama-3.3-70b-versatile` |
| `RAZORPAY_KEY_ID` | Razorpay Key ID for payments | `rzp_test_EcoStayKey123` |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret for payments | `EcoStaySecret456789` |
| `FRONTEND_URL` | Client URL for CORS and OAuth redirects | `http://localhost:5173` |
| `PORT` | Backend server port | `8000` |

### Frontend Configuration (`ecostay-frontend/.env`)

| Variable Name | Description | Example / Default Value |
|---|---|---|
| `VITE_API_URL` | Base API URL pointing to the FastAPI server | `http://localhost:8000/api` |

---

## 📡 API Endpoints Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account | No (Rate-limited) |
| `POST` | `/api/auth/login` | Authenticate user and return JWT token | No (Rate-limited) |
| `POST` | `/api/auth/logout` | Revoke current user session token | Yes |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes |
| `PUT` | `/api/auth/me` | Update profile information (name, location, bio, avatar) | Yes |
| `POST` | `/api/auth/change-password` | Change account password | Yes |
| `POST` | `/api/auth/forgot-password` | Generate password reset code | No |
| `POST` | `/api/auth/reset-password` | Reset password using verified code | No |
| `GET` | `/api/auth/github/login` | Initiate GitHub OAuth 2.0 login flow | No |
| `GET` | `/api/auth/github/callback` | OAuth redirect callback handler | No |

### Properties (`/api/properties`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/properties` | Fetch list of properties with filters & pagination | No |
| `GET` | `/api/properties/search` | Full-text search across properties | No |
| `GET` | `/api/properties/{id}` | Get property details by ID | No |
| `POST` | `/api/properties` | Create a new property listing | Yes |
| `PUT` | `/api/properties/{id}` | Update existing property listing | Yes |
| `DELETE` | `/api/properties/{id}` | Delete a property listing | Yes |

### Bookings (`/api/bookings`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/api/bookings` | Create a new homestay reservation | Yes |
| `GET` | `/api/bookings/my-bookings` | Retrieve authenticated user's bookings | Yes |
| `POST` | `/api/bookings/{id}/cancel` | Cancel an active booking request | Yes |
| `POST` | `/api/bookings/create-razorpay-order` | Generate Razorpay payment order | Yes |
| `POST` | `/api/bookings/verify-payment` | Verify Razorpay payment signature | Yes |

### Wishlist (`/api/wishlist`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `GET` | `/api/wishlist` | Get user's saved wishlist properties | Yes |
| `POST` | `/api/wishlist/{property_id}` | Toggle property in wishlist | Yes |

### AI Assistant (`/api/ai`)
| Method | Endpoint | Description | Protected |
|---|---|---|---|
| `POST` | `/api/ai/travel-assistant` | Generate AI travel recommendations via Groq | No |

---

## 🤖 AI Integration (Groq Llama-3.3)

EcoStay features a custom travel assistant powered by the **Groq Llama-3.3-70b-versatile** model.

### How It Works:
1. **Dynamic Database System Prompt**: When a user submits a prompt, the backend queries active properties from PostgreSQL and dynamically constructs a context-aware system prompt containing titles, locations, categories, prices, amenities, and slugs.
2. **Preference Priority**: The AI prioritizes recommending real EcoStay homestays when a user asks for stays in Indian destinations (e.g., *"Suggest a 3-day trip to Shimla under ₹8000"*).
3. **Structured Response**: Outputs formatted markdown responses covering itineraries, budget tips, eco-friendly transport, packing lists, and homestay suggestions.
4. **Resilient Fallback Handling**: Handles rate limits (`429`), gateway timeouts (`504`), and invalid API keys gracefully without crashing.

---

## 📊 Database & ER Diagram

EcoStay uses **PostgreSQL on Supabase** with SQLAlchemy ORM schemas. Below is the relational entity-relationship structure:

```mermaid
erDiagram
    users {
        string id PK
        string email UK
        string password_hash
        string name
        string avatar
        string memberSince
        string location
        string bio
        json stats
    }

    sessions {
        string token PK
        string user_id FK
        datetime created_at
    }

    properties {
        string id PK
        string slug UK
        string title
        json location
        float price
        string currency
        float rating
        int reviewCount
        json images
        string category
        string propertyType
        json amenities
        json ecoFeatures
        json host
        string description
        int maxGuests
        int bedrooms
        int beds
        float bathrooms
        boolean featured
    }

    bookings {
        string id PK
        string userId FK
        string propertyId FK
        string propertyTitle
        string propertyImage
        string location
        string checkIn
        string checkOut
        int guests
        float total
        string status
    }

    wishlists {
        string user_id PK, FK
        string property_id PK, FK
    }

    users ||--o{ sessions : "maintains"
    users ||--o{ bookings : "places"
    properties ||--o{ bookings : "receives"
    users ||--o{ wishlists : "saves"
    properties ||--o{ wishlists : "saved_in"
```

---

## 🛡️ Security Features

- **Bcrypt Password Hashing**: Passwords stored exclusively as salted bcrypt hashes (`passlib`).
- **Stateless JWT Tokens**: Signed using `HS256` with 7-day validity and Bearer authorization headers.
- **OAuth 2.0 Integration**: Secure GitHub single sign-on without storing external credentials.
- **SlowAPI Rate Limiting**: Auth endpoints restricted to 5 attempts per minute per IP to prevent brute-force attacks.
- **Input Validation**: Strict email syntax verification and 8+ character password rules using Pydantic.
- **CORS Protection**: Explicit cross-origin request headers configured in FastAPI.

---

## ⚡ Performance Optimizations

- **React Memoization**: `useCallback` and `useMemo` hooks used across `DashboardPage`, `ListingsPage`, and `AIChatPage` to prevent unnecessary component re-renders.
- **Lazy Image Loading**: Images styled with CSS transitions and optimized dimension specs (`w=800&q=80`).
- **Production Bundle Optimization**: Built using Vite's tree-shaking compiler (dist output built in under 1 second).
- **PostgreSQL Connection Pooling**: Configured via Supabase pooler (port `6543`) to manage concurrent database sessions efficiently.

---

## 🚀 Deployment Guide

### Deploying Frontend to Vercel
1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the repository and select `ecostay-frontend` as the Root Directory.
4. Set Build Command: `npm run build` and Output Directory: `dist`.
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend.onrender.com/api`
6. Deploy!

### Deploying Backend to Render
1. Log in to [Render](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Set Root Directory to `ecostay-frontend/backend`.
4. Environment: `Python 3`.
5. Build Command: `pip install -r requirements.txt`.
6. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
7. Add your Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `GROQ_API_KEY`, `FRONTEND_URL`, etc.).
8. Deploy Service!

---

## ⚠️ Known Limitations

- **Render Cold Starts**: Because the backend is hosted on Render's free tier, the web service spins down after 15 minutes of inactivity. Initial API requests after spin-down may take **30 to 60 seconds** to warm up.
- **Database Connection Caps**: Free Supabase tier limits active pooling connections; retry handlers are in place.

---

## 🔮 Future Improvements

- [ ] **WebSocket Host Chat**: Real-time direct messaging between guests and homestay hosts.
- [ ] **AWS S3 Image Storage**: Direct image uploads to Amazon S3 buckets.
- [ ] **Multi-Currency Support**: Automated currency conversion (INR, USD, EUR).
- [ ] **Host Management Portal**: Dedicated dashboard for hosts to manage property availability calendars.

---

## 👤 Author & Contributors

**Vishav Rana**  
- **GitHub**: [@VIS030](https://github.com/VIS030)  
- **LinkedIn**: [Vishav Rana](https://www.linkedin.com/in/vishav-rana-19a242371/)  
- *Built as part of the Full-Stack Internship Deliverables (Weeks 1 – 9)*

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- **Groq API**: For providing ultrafast Llama-3.3 inference for the AI Travel Assistant.
- **Supabase**: For hosted PostgreSQL database infrastructure.
- **FastAPI & React Teams**: For outstanding developer frameworks.
