import numpy as np
from typing import List, Dict, Any
from .quality_checker import check_image_quality
from utils.preprocessing import preprocess_image
from models.breed_model import classifier
from config import settings
from .breed_data import BREED_DATABASE

def get_confidence_level(confidence: float) -> str:
    if confidence >= 90: return "High"
    if confidence >= 75: return "Good"
    if confidence >= 60: return "Medium"
    return "Low"

async def aggregate_predictions(images_bytes: List[bytes]) -> Dict[str, Any]:
    """
    1. Run quality checks on all images
    2. Run prediction on each
    3. Aggregate by averaging confidence
    4. Return final results
    """
    all_probs = []
    
    # 1. Quality Checks & Individual Predictions
    for idx, img_bytes in enumerate(images_bytes):
        is_ok, msg = check_image_quality(img_bytes)
        if not is_ok:
            raise ValueError(f"Image {idx+1} failed quality check: {msg}")
            
        # Preprocess
        processed_img = preprocess_image(img_bytes)
        
        # Predict
        probs = classifier.predict(processed_img, img_bytes)
        all_probs.append(probs)
        
    # 2. Average Confidence per Breed
    avg_probs = np.mean(all_probs, axis=0)
    max_idx = np.argmax(avg_probs)
    max_conf = avg_probs[max_idx] * 100
    breed_name = settings.BREEDS[max_idx]
    
    # 3. Handle Low Confidence / Conflicts
    # If top breed has low confidence or is close to second breed
    sorted_indices = np.argsort(avg_probs)[::-1]
    top_conf = avg_probs[sorted_indices[0]]
    second_conf = avg_probs[sorted_indices[1]]
    
    suggestion = ""
    if top_conf < 0.6: # Less than 60%
        suggestion = "The AI is uncertain about the breed. For better results, please upload 3 clear images: front, side, and back view of the animal."
    elif (top_conf - second_conf) < 0.1: # Very close match (within 10%)
        suggestion = f"Results are close between {settings.BREEDS[sorted_indices[0]]} and {settings.BREEDS[sorted_indices[1]]}. A side-profile image might help distinguish them."

    # 4. Fetch Breed Details
    details = BREED_DATABASE.get(breed_name, {})
    
    return {
        "success": True,
        "breed": breed_name,
        "category": details.get("category", "Unknown"),
        "confidence": round(max_conf, 2),
        "confidenceLevel": get_confidence_level(max_conf),
        "imagesAnalyzed": len(images_bytes),
        "suggestion": suggestion,
        "breedDetails": {
            "price": details.get("price"),
            "milkYield": details.get("milkYield"),
            "state": details.get("state"),
            "advantages": details.get("advantages"),
            "disadvantages": details.get("disadvantages"),
            "similarBreeds": details.get("similarBreeds")
        }
    }
