# EcoStay FastAPI Backend

Persistent PostgreSQL-backed FastAPI Backend for the EcoStay Homestay Booking Platform.

## Requirements

- Python 3.8+
- PostgreSQL database (local or via Supabase)

## Installation

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install Python packages:
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and configure your credentials:
   - **`DATABASE_URL`**: Set this to your PostgreSQL connection string.
     - Example local: `postgresql://postgres:password@localhost:5432/ecostay`
     - Example Supabase: `postgresql://postgres.[ref]:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require`
   - **`RAZORPAY_KEY_ID`**: Your Razorpay API Key ID (or sandbox dummy keys).
   - **`RAZORPAY_KEY_SECRET`**: Your Razorpay API Key Secret (or sandbox dummy keys).

## Running the Server

Start the FastAPI application with Uvicorn:
```bash
uvicorn main:app --reload
```
The server runs at `http://localhost:8000`. Documentation will be auto-generated at `http://localhost:8000/docs`.

### Database Lifecycles
- Table creation: Tables are automatically synchronized and created on startup if they do not exist.
- Seeding: Stays are automatically seeded with 62 properties from `property_store.py` when the server starts if the properties table is empty.

## Security & Authentication (Week 6)

- **Bcrypt Hashing**: User registration securely hashes passwords with bcrypt (12 rounds) before persisting them.
- **JWT Session Tokens**: Session management runs on HS256 JWT access tokens with a 7-day expiration period. Set `JWT_SECRET` in `.env`.
- **Rate Limiting**: Rate limiting restricts registration and login attempts to 5 requests per minute using `slowapi`. Exceeding this limit returns HTTP `429 Too Many Requests`.
- **Input Validation**: Request bodies validate strict email regex patterns and enforce a minimum password length of 8 characters, returning HTTP `400 Bad Request` on failure.
- **GitHub OAuth 2.0**:
  - Redirects users to GitHub's consent screen via `/api/auth/github/login`.
  - If no developer credentials are configured in `.env`, the server automatically provides a mock authorization callback simulation, enabling full end-to-end testing.
  - Redirects validated sessions back to the React UI dashboard with the signed JWT token.

