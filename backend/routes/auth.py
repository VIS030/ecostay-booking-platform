import uuid
from datetime import date
from fastapi import APIRouter, HTTPException, Depends, Header, status
from typing import Optional
from models.user_store import users_db, sessions_db, hash_password, verify_password, get_user_by_email
from schemas.user import (
    UserRegister,
    UserLogin,
    UserOut,
    UserUpdate,
    TokenOut,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    UpdatePasswordRequest
)

password_resets_db = {}

router = APIRouter(prefix="/auth", tags=["Authentication"])

def get_current_user(authorization: Optional[str] = Header(None)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication credentials"
        )
    token = authorization.split(" ")[1]
    if token not in sessions_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid"
        )
    user_id = sessions_db[token]
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

@router.post("/register", response_model=TokenOut, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserRegister):
    existing_user = get_user_by_email(payload.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address already registered"
        )

    user_id = str(uuid.uuid4())
    member_since = date.today().strftime("%B %Y")
    
    # Generate profile avatar based on name seed
    avatar_seed = payload.name.replace(" ", "")
    avatar = f"https://api.dicebear.com/7.x/avataaars/svg?seed={avatar_seed}"

    new_user = {
        "id": user_id,
        "email": payload.email.strip().lower(),
        "password_hash": hash_password(payload.password),
        "name": payload.name.strip(),
        "avatar": avatar,
        "memberSince": member_since,
        "location": payload.location,
        "bio": "Passionate eco-traveler exploring sustainable stays across India.",
        "stats": {
            "trips": 0,
            "reviews": 0,
            "wishlist": 0
        }
    }
    
    users_db[user_id] = new_user

    # Generate session token
    token = str(uuid.uuid4())
    sessions_db[token] = user_id

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user
    }

@router.post("/login", response_model=TokenOut)
def login_user(payload: UserLogin):
    user = get_user_by_email(payload.email)
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email address or password"
        )

    # Generate session token
    token = str(uuid.uuid4())
    sessions_db[token] = user["id"]

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/logout")
def logout_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Authorization header required"
        )
    token = authorization.split(" ")[1]
    if token in sessions_db:
        del sessions_db[token]
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserOut)
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserOut)
def update_me(payload: UserUpdate, current_user: dict = Depends(get_current_user)):
    update_data = payload.model_dump(exclude_unset=True)
    current_user.update(update_data)
    users_db[current_user["id"]] = current_user
    return current_user

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest):
    user = get_user_by_email(payload.email)
    if not user:
        return {"message": "If this email is registered, a reset code was sent."}
    
    import random
    code = str(random.randint(100000, 999999))
    password_resets_db[user["email"]] = code
    
    print(f"\n=======================================================")
    print(f" PASSWORD RESET REQUEST RECEIVED FOR: {user['email']}")
    print(f" RESET CODE: {code}")
    print(f"=======================================================\n")
    
    return {
        "message": "Reset code generated and logged to backend stdout.",
        "code": code
    }

@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest):
    email = payload.email.strip().lower()
    if email not in password_resets_db or password_resets_db[email] != payload.code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset code"
        )
    
    user = get_user_by_email(email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user["password_hash"] = hash_password(payload.newPassword)
    users_db[user["id"]] = user
    
    del password_resets_db[email]
    return {"message": "Password has been successfully updated"}

@router.post("/change-password")
def change_password(payload: UpdatePasswordRequest, current_user: dict = Depends(get_current_user)):
    if not verify_password(payload.currentPassword, current_user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    current_user["password_hash"] = hash_password(payload.newPassword)
    users_db[current_user["id"]] = current_user
    return {"message": "Password updated successfully"}
