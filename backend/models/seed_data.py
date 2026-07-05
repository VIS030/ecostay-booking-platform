from sqlalchemy.orm import Session
from models.db_models import Property
from models.property_store import properties_db

def seed_properties(db: Session):
    count = db.query(Property).count()
    if count > 0:
        print(f"Properties table already contains {count} items. Skipping seeding.")
        return
    
    print("Seeding properties database with default EcoStay stays...")
    seeded_count = 0
    for item in properties_db:
        prop = Property(
            id=str(item["id"]),
            slug=item["slug"],
            title=item["title"],
            location=item["location"],
            price=float(item["price"]),
            currency=item["currency"],
            rating=float(item.get("rating", 4.5)),
            reviewCount=int(item.get("reviewCount", 0)),
            images=item["images"],
            category=item["category"],
            propertyType=item["propertyType"],
            amenities=item["amenities"],
            ecoFeatures=item["ecoFeatures"],
            host=item["host"],
            description=item["description"],
            maxGuests=int(item["maxGuests"]),
            bedrooms=int(item["bedrooms"]),
            beds=int(item["beds"]),
            bathrooms=float(item["bathrooms"]),
            featured=bool(item.get("featured", False))
        )
        db.add(prop)
        seeded_count += 1
        
    db.commit()
    print(f"Successfully seeded {seeded_count} homestay property records!")
