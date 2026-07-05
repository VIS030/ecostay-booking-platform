# EcoStay Database Schema Diagram

This document contains the Entity Relationship (ER) diagram and field specifications for the EcoStay PostgreSQL database.

## 1. Entity Relationship Diagram

```mermaid
erDiagram
    users {
        string id PK
        string email UK "Indexed"
        string password_hash
        string name
        string avatar
        string memberSince
        string location
        string bio
        json stats "trips, reviews, wishlist"
    }

    sessions {
        string token PK
        string user_id FK
        datetime created_at
    }

    properties {
        string id PK
        string slug UK "Indexed"
        string title
        json location "city, region, country"
        float price
        string currency
        float rating
        int reviewCount
        json images "list of URLs"
        string category
        string propertyType
        json amenities "list of string names"
        json ecoFeatures "list of eco features"
        json host "name, avatar, superhost status"
        string description
        int maxGuests
        int bedrooms
        int beds
        float bathrooms
        boolean featured
    }

    bookings {
        string id PK
        string userId FK
        string propertyId FK
        string propertyTitle
        string propertyImage
        string location
        string checkIn
        string checkOut
        int guests
        float total
        string status "pending, upcoming, completed, cancelled"
    }

    wishlists {
        string user_id PK, FK
        string property_id PK, FK
    }

    users ||--o{ sessions : "has sessions"
    users ||--o{ bookings : "makes bookings"
    properties ||--o{ bookings : "receives bookings"
    users ||--o{ wishlists : "wishlists property"
    properties ||--o{ wishlists : "wishlisted by user"
```

## 2. Table Specifications

### Users Table (`users`)
- Stores user profile metadata, encrypted authentication tokens, and trip counts.
- Relates to sessions (`sessions` table) and bookings (`bookings` table).

### Properties Table (`properties`)
- Stores details of all eco homestays located across India.
- Employs JSON/JSONB fields for flexibility with images, host metadata, locations, and amenities.

### Bookings Table (`bookings`)
- Tracks booking reservations, guest counts, check-in/out dates, and totals.
- Status states: `pending` (upon Razorpay order registration), `upcoming` (successful verification), and `cancelled`.

### Sessions Table (`sessions`)
- Persists active login session keys.

### Wishlist Association Table (`wishlists`)
- Association junction mapping saved properties to user IDs.
