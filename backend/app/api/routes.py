from fastapi import APIRouter, UploadFile, File, HTTPException, status
from typing import List
import time
import logging
from services.quality_checker import check_image_quality
from services.reference_matcher import reference_matcher
from services.breed_data import BREED_DATABASE
from config import settings

router = APIRouter()

@router.post("/predict")
async def predict_breed(images: List[UploadFile] = File(...)):
    """
    Deterministic reference image matching for demo purposes.
    """
    start_time = time.time()
    
    # 1. Basic Payload Validation
    if not (1 <= len(images) <= 5):
        raise HTTPException(status_code=400, detail="Upload between 1 and 5 images.")
        
    images_bytes = []
    for img in images:
        content = await img.read()
        if len(content) > settings.MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail=f"Image {img.filename} exceeds 10MB.")
        images_bytes.append(content)

    # 2. Quality Checks (Disabled for Demo Mode)
    # for idx, content in enumerate(images_bytes):
    #     is_ok, msg = check_image_quality(content)
    #     if not is_ok:
    #         raise HTTPException(status_code=400, detail=f"Image {idx+1} failed: {msg}")

    # 3. Exact Match Analysis (Deterministic Demo)
    engine_used = "Reference Matcher (Deterministic)"
    
    # We only use the first image for reference matching
    result = reference_matcher.match_image(images_bytes[0])
    
    if result:
        breed_name = result["breed"]
        
        if breed_name == "Unknown":
            return {
                "success": False,
                "error": "Not a cow or buffalo",
                "message": "The uploaded image is not a recognized cattle breed.",
                "engine": engine_used
            }
            
        details = BREED_DATABASE.get(breed_name, {})
        
        return {
            "success": True,
            "breed": breed_name,
            "category": details.get("category", "Unknown"),
            "confidence": result["confidence"],
            "confidenceLevel": result["confidenceLevel"],
            "imagesAnalyzed": len(images_bytes),
            "topPredictions": result["topPredictions"],
            "notes": result["notes"],
            "engine": engine_used,
            "breedDetails": details
        }
    
    # If no match is found, reject the image gracefully
    return {
        "success": False,
        "error": "Image not recognized",
        "message": "This image does not match any of the 20 verified reference images.",
        "engine": engine_used
    }

@router.get("/breeds")
async def get_all_breeds():
    return BREED_DATABASE

@router.get("/health")
async def health_check():
    return {
        "status": "online",
        "version": settings.VERSION,
        "primary_engine": "Reference Matcher",
        "fallback_engine": "None"
    }
