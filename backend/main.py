from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.properties import router as properties_router
from routes.auth import router as auth_router
from routes.bookings import router as bookings_router

from database import engine, SessionLocal, Base
from models.seed_data import seed_properties

# Auto-create tables in PostgreSQL database
Base.metadata.create_all(bind=engine)

# Seed property records on startup if needed
db = SessionLocal()
try:
    seed_properties(db)
finally:
    db.close()

from slowapi.errors import RateLimitExceeded
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from routes.auth import limiter

app = FastAPI(
    title="EcoStay API",
    description="Persistent PostgreSQL-backed FastAPI Backend for EcoStay Homestay Platform",
    version="1.0.0"
)

app.state.limiter = limiter

@app.exception_handler(RateLimitExceeded)
def rate_limit_exceeded_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Please try again later."}
    )

@app.exception_handler(RequestValidationError)
def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"detail": "Input validation failed", "errors": exc.errors()}
    )

# Configure CORS origins
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes under the /api prefix
app.include_router(properties_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(bookings_router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "message": "Welcome to EcoStay API!",
        "documentation": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
