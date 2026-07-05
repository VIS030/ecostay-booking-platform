import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, JSON, DateTime, Table
from sqlalchemy.orm import relationship
from database import Base

# Wishlist Join Association (User <-> Property)
wishlist_association = Table(
    "wishlists",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
    Column("property_id", String, ForeignKey("properties.id", ondelete="CASCADE"), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    name = Column(String)
    avatar = Column(String)
    memberSince = Column(String)
    location = Column(String)
    bio = Column(String)
    stats = Column(JSON) # e.g. {"trips": 0, "reviews": 0, "wishlist": 0}

    # Relationships
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    bookings = relationship("Booking", back_populates="user", cascade="all, delete-orphan")
    wishlisted_properties = relationship("Property", secondary=wishlist_association, back_populates="wishlisted_by")

    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        setattr(self, key, value)

    def get(self, key, default=None):
        return getattr(self, key, default)

    def update(self, dct):
        for k, v in dct.items():
            setattr(self, k, v)

class Session(Base):
    __tablename__ = "sessions"

    token = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="sessions")

class Property(Base):
    __tablename__ = "properties"

    id = Column(String, primary_key=True)
    slug = Column(String, unique=True, index=True)
    title = Column(String)
    location = Column(JSON) # Dict {"city": ..., "region": ..., "country": ...}
    price = Column(Float)
    currency = Column(String)
    rating = Column(Float)
    reviewCount = Column(Integer)
    images = Column(JSON) # List of image URLs
    category = Column(String)
    propertyType = Column(String)
    amenities = Column(JSON) # List of amenities
    ecoFeatures = Column(JSON) # List of eco features
    host = Column(JSON) # Dict {"name": ..., "avatar": ..., "joinedYear": ..., "superhost": ...}
    description = Column(String)
    maxGuests = Column(Integer)
    bedrooms = Column(Integer)
    beds = Column(Integer)
    bathrooms = Column(Float)
    featured = Column(Boolean, default=False)

    # Relationships
    wishlisted_by = relationship("User", secondary=wishlist_association, back_populates="wishlisted_properties")
    bookings = relationship("Booking", back_populates="property", cascade="all, delete-orphan")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(String, primary_key=True)
    userId = Column(String, ForeignKey("users.id", ondelete="CASCADE"))
    propertyId = Column(String, ForeignKey("properties.id", ondelete="CASCADE"))
    propertyTitle = Column(String)
    propertyImage = Column(String)
    location = Column(String)
    checkIn = Column(String)
    checkOut = Column(String)
    guests = Column(Integer)
    total = Column(Float)
    status = Column(String) # pending, upcoming, completed, cancelled

    # Relationships
    user = relationship("User", back_populates="bookings")
    property = relationship("Property", back_populates="bookings")
