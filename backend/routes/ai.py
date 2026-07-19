import os
import time
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from sqlalchemy.orm import Session
from database import get_db
from models.db_models import Property

import groq
from groq import Groq

router = APIRouter(prefix="/ai", tags=["AI Integration"])

class ChatMessage(BaseModel):
    role: str  # user or assistant
    content: str

class TravelAssistantRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=1500)
    history: Optional[List[ChatMessage]] = None

def build_system_prompt(db: Session) -> str:
    properties = db.query(Property).all()
    stays_info = []
    for p in properties:
        loc = p.location or {}
        city = loc.get("city", "India")
        stays_info.append(
            f"- '{p.title}' in {city}: a {p.propertyType} category stay. Price: ${p.price}/night. Slug: {p.slug}. Amenities: {', '.join(p.amenities or [])}."
        )
    stays_context = "\n".join(stays_info)

    system_prompt = f"""You are "EcoStay AI Assistant", an experienced, friendly, and practical travel planner specializing in Indian eco-tourism.
Your goal is to help users plan sustainable trips, suggest budgets, give packing tips, and recommend eco-friendly accommodations.

Here are the actual homestays available on the EcoStay platform. ALWAYS prioritize recommending these properties first when suggesting accommodation in their respective cities:
{stays_context}

When recommending, include the property name, location, and key amenities. Keep your tone encouraging, eco-conscious, budget-smart, and structured (using clean bullet points and bold headings). Avoid recommending properties not listed above if a matching stay is available in that city. Keep responses detailed, yet practical. Avoid unsafe, toxic, or non-travel related topics.
"""
    return system_prompt

def simulate_travel_planner(prompt: str, db: Session) -> str:
    prompt_lower = prompt.lower()
    properties = db.query(Property).all()
    
    recommended_stays = []
    found_city = "India"
    for p in properties:
        loc = p.location or {}
        city = loc.get("city", "").lower()
        if city and city in prompt_lower:
            found_city = loc.get("city")
            recommended_stays.append(p)
            
    if not recommended_stays:
        recommended_stays = [p for p in properties if p.featured][:2]
        if not recommended_stays:
            recommended_stays = properties[:2]
            
    stays_text = ""
    for r in recommended_stays:
        stays_text += f"\n🏡 **{r.title}** ({r.propertyType} in {r.location.get('city')})\n"
        stays_text += f"   - Price: ${r.price}/night\n"
        stays_text += f"   - Key Features: {', '.join(r.amenities[:3]) if r.amenities else 'Eco-friendly environment'}\n"
        stays_text += f"   - Booking: Search for this homestay on our platform to book instantly!\n"

    mock_response = f"""### 🌿 EcoStay Travel Planner (Simulation Mode)
*Note: The assistant is currently running in Sandbox simulation mode because a valid Groq API key was not configured in `.env`.*

Thank you for your question! Here is an eco-friendly travel recommendation:

#### 📍 Destination: {found_city}
#### 🎒 Suggested Itinerary & Planning
1. **Eco-Conscious Exploration**: Seek local walking trails and avoid single-use plastics during your visit.
2. **Transportation**: Opt for shared public transit, local electric rickshaws, or bicycles to reduce carbon output.
3. **Dining**: Support the local community by eating at family-run organic kitchens.

#### 🏡 Recommended Sustainable Homestays:
{stays_text}

#### 📦 Packing Checklist
*   Reusable water bottle & steel straw
*   Biodegradable toiletries and bamboo toothbrush
*   Comfortable walking shoes & thermal wear (if visiting cold regions)

Let me know if you would like details on other Indian cities, budgeting advice, or packing lists!
"""
    return mock_response

@router.post("/travel-assistant")
def travel_assistant(payload: TravelAssistantRequest, db: Session = Depends(get_db)):
    prompt_stripped = payload.prompt.strip()
    if not prompt_stripped:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Prompt cannot be empty or whitespace only"
        )

    # Read env vars at request time (after dotenv has loaded in main.py)
    api_key = os.getenv("GROQ_API_KEY", "")
    model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    is_placeholder = (
        not api_key or 
        "placeholder" in api_key or 
        api_key == "gsk_test_placeholder_key_for_ecostay_assistant"
    )
    
    if is_placeholder:
        time.sleep(1.0)
        mock_reply = simulate_travel_planner(prompt_stripped, db)
        return {"success": True, "response": mock_reply}
        
    try:
        client = Groq(api_key=api_key, timeout=30.0)
        
        system_prompt = build_system_prompt(db)
        messages = [{"role": "system", "content": system_prompt}]
        
        if payload.history:
            for msg in payload.history:
                messages.append({"role": msg.role, "content": msg.content})
                
        messages.append({"role": "user", "content": prompt_stripped})
        
        completion = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        
        response_text = completion.choices[0].message.content
        return {"success": True, "response": response_text}

    except groq.AuthenticationError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Groq API authentication failed. Please verify your GROQ_API_KEY in .env: {e}"
        )
    except groq.RateLimitError as e:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Groq API rate limit reached. Please try again in a few moments: {e}"
        )
    except groq.APITimeoutError as e:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail=f"Connection to Groq API timed out: {e}"
        )
    except (groq.APIConnectionError, groq.APIStatusError) as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Network error communicating with Groq API gateway: {e}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred during travel assistant generation: {e}"
        )
