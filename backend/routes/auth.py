import uuid
import random
from datetime import date
from fastapi import APIRouter, HTTPException, Depends, Header, status
from typing import Optional
from sqlalchemy.orm import Session

from database import get_db
from models.db_models import User, Session as UserSession
from models.user_store import hash_password, verify_password
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

def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication credentials"
        )
    token = authorization.split(" ")[1]
    
    session_rec = db.query(UserSession).filter(UserSession.token == token).first()
    if not session_rec:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid"
        )
        
    user = db.query(User).filter(User.id == session_rec.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

@router.post("/register", response_model=TokenOut, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == payload.email.strip().lower()).first()
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

    new_user = User(
        id=user_id,
        email=payload.email.strip().lower(),
        password_hash=hash_password(payload.password),
        name=payload.name.strip(),
        avatar=avatar,
        memberSince=member_since,
        location=payload.location,
        bio="Passionate eco-traveler exploring sustainable stays across India.",
        stats={
            "trips": 0,
            "reviews": 0,
            "wishlist": 0
        }
    )
    db.add(new_user)

    # Generate session token
    token = str(uuid.uuid4())
    new_session = UserSession(token=token, user_id=user_id)
    db.add(new_session)
    db.commit()
    db.refresh(new_user)

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user
    }

@router.post("/login", response_model=TokenOut)
def login_user(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.strip().lower()).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email address or password"
        )

    # Generate session token
    token = str(uuid.uuid4())
    new_session = UserSession(token=token, user_id=user.id)
    db.add(new_session)
    db.commit()

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }

@router.post("/logout")
def logout_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Authorization header required"
        )
    token = authorization.split(" ")[1]
    
    session_rec = db.query(UserSession).filter(UserSession.token == token).first()
    if session_rec:
        db.delete(session_rec)
        db.commit()
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserOut)
def update_me(payload: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    update_data = payload.model_dump(exclude_unset=True)
    current_user.update(update_data)
    
    # flag stats or general fields as modified for JSON mapping columns if necessary
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.strip().lower()).first()
    if not user:
        return {"message": "If this email is registered, a reset code was sent."}
    
    code = str(random.randint(100000, 999999))
    password_resets_db[user.email] = code
    
    print(f"\n=======================================================")
    print(f" PASSWORD RESET REQUEST RECEIVED FOR: {user.email}")
    print(f" RESET CODE: {code}")
    print(f"=======================================================\n")
    
    return {
        "message": "Reset code generated and logged to backend stdout.",
        "code": code
    }

@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    if email not in password_resets_db or password_resets_db[email] != payload.code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset code"
        )
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.password_hash = hash_password(payload.newPassword)
    db.commit()
    
    del password_resets_db[email]
    return {"message": "Password has been successfully updated"}

@router.post("/change-password")
def change_password(payload: UpdatePasswordRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not verify_password(payload.currentPassword, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    current_user.password_hash = hash_password(payload.newPassword)
    db.commit()
    return {"message": "Password updated successfully"}
