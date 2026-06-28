import re
import uuid
from fastapi import APIRouter, HTTPException, Query, Response, status
from typing import List, Optional
from models.property_store import properties_db
from schemas.property import PropertyCreate, PropertyUpdate, PropertyOut

router = APIRouter(prefix="/properties", tags=["Properties"])

def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text)
    return text.strip('-')

def find_property_index(id_or_slug: str) -> int:
    for idx, prop in enumerate(properties_db):
        if prop["id"] == id_or_slug or prop["slug"] == id_or_slug:
            return idx
    return -1

@router.get("", response_model=List[PropertyOut])
def get_properties(
    category: Optional[str] = None,
    minPrice: Optional[float] = None,
    maxPrice: Optional[float] = None,
    minRating: Optional[float] = None,
    guests: Optional[int] = None,
    featured: Optional[bool] = None,
    amenities: Optional[str] = None,  # comma-separated amenities list
):
    """
    Get all properties with optional query filters.
    """
    results = properties_db
    
    if category:
        results = [p for p in results if p["propertyType"].lower() == category.lower() or p.get("category", "").lower() == category.lower()]
        
    if minPrice is not None:
        results = [p for p in results if p["price"] >= minPrice]
        
    if maxPrice is not None:
        results = [p for p in results if p["price"] <= maxPrice]
        
    if minRating is not None:
        results = [p for p in results if p.get("rating", 0) >= minRating]
        
    if guests is not None:
        results = [p for p in results if p["maxGuests"] >= guests]
        
    if featured is not None:
        results = [p for p in results if p["featured"] == featured]
        
    if amenities:
        amenity_list = [a.strip().lower() for a in amenities.split(",")]
        results = [
            p for p in results 
            if all(any(a == pa.lower() for pa in p.get("amenities", [])) for a in amenity_list)
        ]
        
    return results

@router.get("/search", response_model=List[PropertyOut])
def search_properties(q: str = Query(..., description="Search query matching title, location, or description")):
    """
    Search properties using a search string.
    """
    query = q.lower().strip()
    if not query:
        return properties_db

    results = []
    for p in properties_db:
        title_match = query in p["title"].lower()
        desc_match = query in p["description"].lower()
        city_match = query in p["location"]["city"].lower()
        region_match = query in p["location"]["region"].lower()
        country_match = query in p["location"]["country"].lower()
        category_match = query in p.get("category", "").lower()
        
        if title_match or desc_match or city_match or region_match or country_match or category_match:
            results.append(p)
            
    return results

@router.get("/{id}", response_model=PropertyOut)
def get_property(id: str):
    """
    Retrieve details of a specific property by ID or slug.
    """
    idx = find_property_index(id)
    if idx == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Property with ID or slug '{id}' not found"
        )
    return properties_db[idx]

@router.post("", response_model=PropertyOut, status_code=status.HTTP_201_CREATED)
def create_property(payload: PropertyCreate):
    """
    Create a new property listing.
    """
    new_id = str(len(properties_db) + 1)  # Or use str(uuid.uuid4())
    # Ensure ID is unique
    while any(p["id"] == new_id for p in properties_db):
        new_id = str(uuid.uuid4())

    new_slug = slugify(payload.title)
    # Ensure slug is unique
    base_slug = new_slug
    counter = 1
    while any(p["slug"] == new_slug for p in properties_db):
        new_slug = f"{base_slug}-{counter}"
        counter += 1

    new_property = payload.model_dump()
    new_property["id"] = new_id
    new_property["slug"] = new_slug
    new_property["rating"] = 0.0
    new_property["reviewCount"] = 0
    
    properties_db.append(new_property)
    return new_property

@router.put("/{id}", response_model=PropertyOut)
def update_property(id: str, payload: PropertyUpdate):
    """
    Update details of an existing property by ID or slug.
    """
    idx = find_property_index(id)
    if idx == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Property with ID or slug '{id}' not found"
        )
        
    current_property = properties_db[idx]
    update_data = payload.model_dump(exclude_unset=True)
    
    # Handle nested Location object
    if "location" in update_data and update_data["location"] is not None:
        location_data = update_data["location"]
        current_property["location"].update(location_data)
        del update_data["location"]
        
    # Handle nested Host object
    if "host" in update_data and update_data["host"] is not None:
        host_data = update_data["host"]
        current_property["host"].update(host_data)
        del update_data["host"]

    # Handle update to title causing optional update to slug
    if "title" in update_data:
        new_slug = slugify(update_data["title"])
        base_slug = new_slug
        counter = 1
        # Check slug uniqueness excluding this specific property
        while any(p["slug"] == new_slug and p["id"] != current_property["id"] for p in properties_db):
            new_slug = f"{base_slug}-{counter}"
            counter += 1
        current_property["slug"] = new_slug

    current_property.update(update_data)
    properties_db[idx] = current_property
    return current_property

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property(id: str):
    """
    Delete a specific property listing by ID or slug.
    """
    idx = find_property_index(id)
    if idx == -1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Property with ID or slug '{id}' not found"
        )
    properties_db.pop(idx)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
