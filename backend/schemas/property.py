from pydantic import BaseModel, Field
from typing import List, Optional

class LocationSchema(BaseModel):
    city: str
    region: str
    country: str

class HostSchema(BaseModel):
    name: str
    avatar: str
    joinedYear: int
    superhost: bool = False

class PropertyBase(BaseModel):
    title: str
    location: LocationSchema
    price: float
    currency: str = "USD"
    images: List[str] = []
    category: str
    propertyType: str
    amenities: List[str] = []
    ecoFeatures: List[str] = []
    host: HostSchema
    description: str
    maxGuests: int
    bedrooms: int
    beds: int
    bathrooms: float
    featured: bool = False

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[LocationSchema] = None
    price: Optional[float] = None
    currency: Optional[str] = None
    images: Optional[List[str]] = None
    category: Optional[str] = None
    propertyType: Optional[str] = None
    amenities: Optional[List[str]] = None
    ecoFeatures: Optional[List[str]] = None
    host: Optional[HostSchema] = None
    description: Optional[str] = None
    maxGuests: Optional[int] = None
    bedrooms: Optional[int] = None
    beds: Optional[int] = None
    bathrooms: Optional[float] = None
    featured: Optional[bool] = None

class PropertyOut(PropertyBase):
    id: str
    slug: str
    rating: float = 0.0
    reviewCount: int = 0
