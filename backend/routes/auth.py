import os
import jwt
import uuid
import random
import httpx
from datetime import date, datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends, Header, Request, status
from fastapi.responses import RedirectResponse, HTMLResponse
from typing import Optional
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

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

limiter = Limiter(key_func=get_remote_address)

JWT_SECRET = os.getenv("JWT_SECRET", "super_secret_ecostay_development_key_123456789")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID", "github_client_id_placeholder")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET", "github_client_secret_placeholder")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
BACKEND_CALLBACK_URL = "http://localhost:8000/api/auth/github/callback"

password_resets_db = {}

router = APIRouter(prefix="/auth", tags=["Authentication"])

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)  # 7-day expiration
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token
    except jwt.PyJWTError:
        return None

def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication credentials"
        )
    token = authorization.split(" ")[1]
    
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid token"
        )
        
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload is missing sub claim"
        )
        
    # Check session blacklist/active session database records
    session_rec = db.query(UserSession).filter(UserSession.token == token).first()
    if not session_rec:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session has been logged out"
        )
        
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

@router.post("/register", response_model=TokenOut, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def register_user(request: Request, payload: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == payload.email.strip().lower()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address already registered"
        )

    user_id = str(uuid.uuid4())
    member_since = date.today().strftime("%B %Y")
    
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

    # Generate standard JWT token with 7-day duration
    token = create_access_token(data={"sub": user_id})
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
@limiter.limit("5/minute")
def login_user(request: Request, payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.strip().lower()).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email address or password"
        )

    # Generate standard JWT token with 7-day duration
    token = create_access_token(data={"sub": user.id})
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

# ==================== GITHUB OAUTH 2.0 ====================

@router.get("/github/login")
def github_login():
    if GITHUB_CLIENT_ID == "github_client_id_placeholder":
        return RedirectResponse(url="http://localhost:8000/api/auth/github/mock-consent")
        
    github_oauth_url = (
        f"https://github.com/login/oauth/authorize?"
        f"client_id={GITHUB_CLIENT_ID}&"
        f"redirect_uri={BACKEND_CALLBACK_URL}&"
        f"scope=user:email"
    )
    return RedirectResponse(url=github_oauth_url)

@router.get("/github/mock-consent")
def github_mock_consent():
    html_content = """
    <html>
        <head>
            <title>GitHub - Authorize Application</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background-color: #f6f8fa; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .card { background: white; border: 1px solid #d0d7de; padding: 30px; border-radius: 6px; width: 400px; box-shadow: 0 3px 6px rgba(140,149,159,0.15); text-align: center; }
                .logo-container { display: flex; justify-content: center; align-items: center; gap: 15px; margin-bottom: 20px; }
                h2 { color: #24292f; font-size: 20px; margin-bottom: 10px; font-weight: 600; }
                p { color: #57606a; font-size: 14px; margin-bottom: 25px; line-height: 1.5; }
                .btn { background: #2da44e; color: white; border: 1px solid rgba(27,31,36,0.15); padding: 12px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px; width: 100%; transition: background 0.2s; }
                .btn:hover { background: #2c974b; }
                .cancel { display: block; margin-top: 15px; color: #0969da; text-decoration: none; font-size: 14px; }
                .cancel:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="logo-container">
                    <svg height="32" viewBox="0 0 16 16" width="32" style="fill: #24292f;">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.64.01 1.11.01 1.38 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8z"></path>
                    </svg>
                </div>
                <h2>Authorize EcoStay</h2>
                <p><strong>EcoStay sandbox mode</strong> requests read access to your public profile and primary email address.</p>
                <form action="/api/auth/github/callback" method="get">
                    <input type="hidden" name="code" value="mock_oauth_code_github_sandbox_456123" />
                    <button type="submit" class="btn">Authorize github-user</button>
                </form>
                <a href="http://localhost:5173/login" class="cancel">Cancel</a>
            </div>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@router.get("/github/callback")
async def github_callback(code: str, db: Session = Depends(get_db)):
    user_email = ""
    user_name = ""
    user_avatar = ""

    if code == "mock_oauth_code_github_sandbox_456123":
        user_email = "sandbox.github@gmail.com"
        user_name = "Sandbox GitHub User"
        user_avatar = "https://avatars.githubusercontent.com/u/9919?v=4"
    else:
        try:
            async with httpx.AsyncClient() as client:
                token_data = {
                    "code": code,
                    "client_id": GITHUB_CLIENT_ID,
                    "client_secret": GITHUB_CLIENT_SECRET,
                    "redirect_uri": BACKEND_CALLBACK_URL
                }
                token_res = await client.post(
                    "https://github.com/login/oauth/access_token",
                    data=token_data,
                    headers={"Accept": "application/json"}
                )
                token_res.raise_for_status()
                token_json = token_res.json()
                access_token = token_json.get("access_token")
                
                user_res = await client.get(
                    "https://api.github.com/user",
                    headers={
                        "Authorization": f"Bearer {access_token}",
                        "User-Agent": "EcoStay-OAuth"
                    }
                )
                user_res.raise_for_status()
                user_json = user_res.json()
                
                user_name = user_json.get("name") or user_json.get("login") or "GitHub User"
                user_avatar = user_json.get("avatar_url") or "https://api.dicebear.com/7.x/avataaars/svg?seed=GitHubUser"
                user_email = user_json.get("email")
                
                if not user_email:
                    emails_res = await client.get(
                        "https://api.github.com/user/emails",
                        headers={
                            "Authorization": f"Bearer {access_token}",
                            "User-Agent": "EcoStay-OAuth"
                        }
                    )
                    if emails_res.status_code == 200:
                        emails_json = emails_res.json()
                        for email_item in emails_json:
                            if email_item.get("primary"):
                                user_email = email_item.get("email")
                                break
                        if not user_email and emails_json:
                            user_email = emails_json[0].get("email")
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"GitHub OAuth token exchange failed: {e}"
            )
            
    if not user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to retrieve email profile from GitHub OAuth"
        )
        
    user = db.query(User).filter(User.email == user_email.strip().lower()).first()
    if not user:
        user_id = str(uuid.uuid4())
        member_since = date.today().strftime("%B %Y")
        user = User(
            id=user_id,
            email=user_email.strip().lower(),
            password_hash=hash_password(str(uuid.uuid4())),
            name=user_name,
            avatar=user_avatar,
            memberSince=member_since,
            location="India",
            bio="Sustainable traveler signed in via GitHub OAuth.",
            stats={
                "trips": 0,
                "reviews": 0,
                "wishlist": 0
            }
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
    jwt_token = create_access_token(data={"sub": user.id})
    
    new_session = UserSession(token=jwt_token, user_id=user.id)
    db.add(new_session)
    db.commit()
    
    return RedirectResponse(url=f"{FRONTEND_URL}/login?token={jwt_token}")
