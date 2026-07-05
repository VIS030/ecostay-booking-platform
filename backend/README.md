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
