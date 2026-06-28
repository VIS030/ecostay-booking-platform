from typing import List

# In-memory database of bookings
# booking entry layout:
# {
#     "id": str,
#     "userId": str,
#     "propertyId": str,
#     "propertyTitle": str,
#     "propertyImage": str,
#     "location": str,
#     "checkIn": str,
#     "checkOut": str,
#     "guests": int,
#     "total": float,
#     "status": str  # 'confirmed' | 'upcoming' | 'completed' | 'cancelled'
# }
bookings_db: List[dict] = []
