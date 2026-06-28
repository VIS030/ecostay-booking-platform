from pydantic import BaseModel
from typing import List

class BookingCreate(BaseModel):
    propertyId: str
    checkIn: str
    checkOut: str
    guests: int

class BookingOut(BaseModel):
    id: str
    propertyId: str
    propertyTitle: str
    propertyImage: str
    location: str
    checkIn: str
    checkOut: str
    guests: int
    total: float
    status: str

class BookingOrderOut(BaseModel):
    booking: BookingOut
    razorpayOrderId: str
    amount: int
    currency: str
    razorpayKey: str

class PaymentVerify(BaseModel):
    bookingId: str
    razorpayOrderId: str
    razorpayPaymentId: str
    razorpaySignature: str
