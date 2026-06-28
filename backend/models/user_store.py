import hashlib
import uuid
from typing import Dict, Optional

# In-memory stores
users_db: Dict[str, dict] = {}       # maps user_id -> user details dict
sessions_db: Dict[str, str] = {}    # maps token -> user_id

def hash_password(password: str) -> str:
    """Hash password using SHA-256 for a secure, database-compatible storage format."""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, password_hash: str) -> bool:
    """Verify password matches hash."""
    return hash_password(password) == password_hash

def get_user_by_email(email: str) -> Optional[dict]:
    """Retrieve user details by email."""
    normalized_email = email.strip().lower()
    for user in users_db.values():
        if user["email"].strip().lower() == normalized_email:
            return user
    return None
