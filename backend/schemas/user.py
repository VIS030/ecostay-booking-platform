from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict

class UserRegister(BaseModel):
    email: str
    password: str
    name: str
    location: Optional[str] = "India"

class UserLogin(BaseModel):
    email: str
    password: str

class UserStatsSchema(BaseModel):
    trips: int = 0
    reviews: int = 0
    wishlist: int = 0

class UserOut(BaseModel):
    id: str
    email: str
    name: str
    avatar: str
    memberSince: str
    location: str
    bio: str = ""
    stats: UserStatsSchema

class UserUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    code: str
    newPassword: str

class UpdatePasswordRequest(BaseModel):
    currentPassword: str
    newPassword: str
