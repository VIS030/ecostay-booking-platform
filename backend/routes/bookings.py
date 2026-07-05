import os
import uuid
import razorpay
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from database import get_db
from models.db_models import User, Property, Booking
from routes.auth import get_current_user
from schemas.booking import BookingCreate, BookingOut, BookingOrderOut, PaymentVerify
from schemas.property import PropertyOut

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "rzp_test_EcoStayKey123")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "EcoStaySecret456789")

is_dummy_credentials = (RAZORPAY_KEY_ID == "rzp_test_EcoStayKey123") or (not RAZORPAY_KEY_ID)

try:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
except Exception:
    razorpay_client = None

router = APIRouter(tags=["Bookings & Wishlist"])

def find_property_by_id(property_id: str, db: Session) -> Property:
    return db.query(Property).filter((Property.id == property_id) | (Property.slug == property_id)).first()

# ==================== BOOKINGS SYSTEM ====================

@router.post("/bookings", response_model=BookingOrderOut, status_code=status.HTTP_201_CREATED)
def create_booking(payload: BookingCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    property_item = find_property_by_id(payload.propertyId, db)
    if not property_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
        
    try:
        date_in = datetime.strptime(payload.checkIn, "%Y-%m-%d")
        date_out = datetime.strptime(payload.checkOut, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dates must be in YYYY-MM-DD format"
        )

    if date_out <= date_in:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Check-out date must be after check-in date"
        )

    if payload.guests <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Guests count must be at least 1"
        )

    if payload.guests > property_item.maxGuests:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Number of guests exceeds property max capacity of {property_item.maxGuests}"
        )

    nights = (date_out - date_in).days
    total_price = property_item.price * nights
    amount_inr = int(total_price * 83) # 1 USD = 83 INR

    booking_id = f"b-{str(uuid.uuid4())[:8]}"
    
    razorpay_order_id = f"order_dummy_{str(uuid.uuid4())[:12]}"
    if not is_dummy_credentials and razorpay_client:
        try:
            order_data = {
                "amount": amount_inr * 100, # paise
                "currency": "INR",
                "receipt": booking_id
            }
            order = razorpay_client.order.create(data=order_data)
            razorpay_order_id = order["id"]
        except Exception as e:
            print(f"Razorpay API call failed, using dummy order id. Error: {e}")
    
    new_booking = Booking(
        id=booking_id,
        userId=current_user.id,
        propertyId=property_item.id,
        propertyTitle=property_item.title,
        propertyImage=property_item.images[0] if property_item.images else "",
        location=f"{property_item.location['city']}, {property_item.location['country']}",
        checkIn=payload.checkIn,
        checkOut=payload.checkOut,
        guests=payload.guests,
        total=float(total_price),
        status="pending"
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    
    return {
        "booking": new_booking,
        "razorpayOrderId": razorpay_order_id,
        "amount": amount_inr * 100,
        "currency": "INR",
        "razorpayKey": RAZORPAY_KEY_ID
    }

@router.post("/bookings/verify-payment", response_model=BookingOut)
def verify_payment(payload: PaymentVerify, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == payload.bookingId, Booking.userId == current_user.id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )

    if booking.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking has already been processed"
        )

    is_dummy = payload.razorpayOrderId.startswith("order_dummy_") or RAZORPAY_KEY_ID == "rzp_test_EcoStayKey123"

    if not is_dummy and razorpay_client:
        try:
            params_dict = {
                'razorpay_order_id': payload.razorpayOrderId,
                'razorpay_payment_id': payload.razorpayPaymentId,
                'razorpay_signature': payload.razorpaySignature
            }
            razorpay_client.utility.verify_payment_signature(params_dict)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Payment signature verification failed: {e}"
            )

    booking.status = "upcoming"
    
    # Adjust trips count
    stats = dict(current_user.stats)
    stats["trips"] = stats.get("trips", 0) + 1
    current_user.stats = stats
    flag_modified(current_user, "stats")
    
    db.commit()
    db.refresh(booking)
    return booking

@router.get("/bookings/my-bookings", response_model=List[BookingOut])
def get_my_bookings(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Booking).filter(Booking.userId == current_user.id).all()

@router.get("/bookings/{id}", response_model=BookingOut)
def get_booking_by_id(id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == id, Booking.userId == current_user.id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    return booking

@router.post("/bookings/{id}/cancel", response_model=BookingOut)
def cancel_booking(id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == id, Booking.userId == current_user.id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found or access denied"
        )

    if booking.status == "cancelled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking is already cancelled"
        )

    booking.status = "cancelled"
    
    # Adjust statistics
    stats = dict(current_user.stats)
    if stats.get("trips", 0) > 0:
        stats["trips"] -= 1
    current_user.stats = stats
    flag_modified(current_user, "stats")
    
    db.commit()
    db.refresh(booking)
    return booking

# ==================== WISHLIST SYSTEM ====================

@router.get("/wishlist", response_model=List[PropertyOut])
def get_my_wishlist(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return current_user.wishlisted_properties

@router.post("/wishlist/{property_id}", response_model=List[PropertyOut])
def toggle_wishlist(property_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    property_item = find_property_by_id(property_id, db)
    if not property_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    if property_item in current_user.wishlisted_properties:
        current_user.wishlisted_properties.remove(property_item)
    else:
        current_user.wishlisted_properties.append(property_item)
        
    # Sync statistic count
    stats = dict(current_user.stats)
    stats["wishlist"] = len(current_user.wishlisted_properties)
    current_user.stats = stats
    flag_modified(current_user, "stats")
    
    db.commit()
    db.refresh(current_user)
    
    return current_user.wishlisted_properties
