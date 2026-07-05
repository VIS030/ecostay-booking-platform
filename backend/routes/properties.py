import re
import uuid
from fastapi import APIRouter, HTTPException, Query, Response, status, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from database import get_db
from models.db_models import Property
from schemas.property import PropertyCreate, PropertyUpdate, PropertyOut

router = APIRouter(prefix="/properties", tags=["Properties"])

def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text)
    return text.strip('-')

@router.get("", response_model=List[PropertyOut])
def get_properties(
    category: Optional[str] = None,
    minPrice: Optional[float] = None,
    maxPrice: Optional[float] = None,
    minRating: Optional[float] = None,
    guests: Optional[int] = None,
    featured: Optional[bool] = None,
    amenities: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get all properties with optional query filters.
    """
    query = db.query(Property)
    
    if category:
        query = query.filter(
            (Property.category.ilike(category)) | 
            (Property.propertyType.ilike(category))
        )
        
    if minPrice is not None:
        query = query.filter(Property.price >= minPrice)
        
    if maxPrice is not None:
        query = query.filter(Property.price <= maxPrice)
        
    if minRating is not None:
        query = query.filter(Property.rating >= minRating)
        
    if guests is not None:
        query = query.filter(Property.maxGuests >= guests)
        
    if featured is not None:
        query = query.filter(Property.featured == featured)
        
    results = query.all()
        
    if amenities:
        amenity_list = [a.strip().lower() for a in amenities.split(",")]
        results = [
            p for p in results 
            if all(any(a == pa.lower() for pa in (p.amenities or [])) for a in amenity_list)
        ]
        
    return results

@router.get("/search", response_model=List[PropertyOut])
def search_properties(
    q: str = Query(..., description="Search query matching title, location, or description"),
    db: Session = Depends(get_db)
):
    """
    Search properties using a search string.
    """
    query = q.lower().strip()
    all_properties = db.query(Property).all()
    if not query:
        return all_properties

    results = []
    for p in all_properties:
        title_match = query in (p.title or "").lower()
        desc_match = query in (p.description or "").lower()
        
        loc = p.location or {}
        city_match = query in loc.get("city", "").lower()
        region_match = query in loc.get("region", "").lower()
        country_match = query in loc.get("country", "").lower()
        category_match = query in (p.category or "").lower()
        
        if title_match or desc_match or city_match or region_match or country_match or category_match:
            results.append(p)
            
    return results

@router.get("/{id}", response_model=PropertyOut)
def get_property(id: str, db: Session = Depends(get_db)):
    """
    Retrieve details of a specific property by ID or slug.
    """
    prop = db.query(Property).filter((Property.id == id) | (Property.slug == id)).first()
    if not prop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Property with ID or slug '{id}' not found"
        )
    return prop

@router.post("", response_model=PropertyOut, status_code=status.HTTP_201_CREATED)
def create_property(payload: PropertyCreate, db: Session = Depends(get_db)):
    """
    Create a new property listing.
    """
    new_id = str(uuid.uuid4())
    new_slug = slugify(payload.title)
    
    # Ensure slug is unique
    base_slug = new_slug
    counter = 1
    while db.query(Property).filter(Property.slug == new_slug).first():
        new_slug = f"{base_slug}-{counter}"
        counter += 1

    prop_data = payload.model_dump()
    new_property = Property(
        id=new_id,
        slug=new_slug,
        rating=0.0,
        reviewCount=0,
        **prop_data
    )
    
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    return new_property

@router.put("/{id}", response_model=PropertyOut)
def update_property(id: str, payload: PropertyUpdate, db: Session = Depends(get_db)):
    """
    Update details of an existing property by ID or slug.
    """
    prop = db.query(Property).filter((Property.id == id) | (Property.slug == id)).first()
    if not prop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Property with ID or slug '{id}' not found"
        )
        
    update_data = payload.model_dump(exclude_unset=True)
    
    # Handle nested Location object
    if "location" in update_data and update_data["location"] is not None:
        loc = dict(prop.location or {})
        loc.update(update_data["location"])
        prop.location = loc
        flag_modified(prop, "location")
        del update_data["location"]
        
    # Handle nested Host object
    if "host" in update_data and update_data["host"] is not None:
        host_dict = dict(prop.host or {})
        host_dict.update(update_data["host"])
        prop.host = host_dict
        flag_modified(prop, "host")
        del update_data["host"]

    # Handle update to title causing optional update to slug
    if "title" in update_data:
        new_slug = slugify(update_data["title"])
        base_slug = new_slug
        counter = 1
        while db.query(Property).filter(Property.slug == new_slug, Property.id != prop.id).first():
            new_slug = f"{base_slug}-{counter}"
            counter += 1
        prop.slug = new_slug

    for key, val in update_data.items():
        setattr(prop, key, val)
        
    db.commit()
    db.refresh(prop)
    return prop

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property(id: str, db: Session = Depends(get_db)):
    """
    Delete a specific property listing by ID or slug.
    """
    prop = db.query(Property).filter((Property.id == id) | (Property.slug == id)).first()
    if not prop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Property with ID or slug '{id}' not found"
        )
    db.delete(prop)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
