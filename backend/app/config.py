import os
from pydantic_settings import BaseSettings
from typing import List, Optional

# Resolve the .env path relative to the backend directory (one level up from app/)
_ENV_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")

class Settings(BaseSettings):
    APP_NAME: str = "BreedAI Production"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api"
    ANTHROPIC_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    
    # Paths
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_DIR: str = os.path.join(BASE_DIR, "models")
    LOG_DIR: str = os.path.join(BASE_DIR, "logs")
    
    # Model Paths
    CURRENT_MODEL_PATH: str = os.path.join(MODEL_DIR, "current_model.h5")
    ENSEMBLE_MODEL_PATH: str = os.path.join(MODEL_DIR, "ensemble_breed_model.h5")
    LOG_FILE: str = os.path.join(LOG_DIR, "predictions.log")
    
    # Quality Thresholds
    BLUR_THRESHOLD: float = 100.0
    MIN_BRIGHTNESS: int = 50
    MAX_BRIGHTNESS: int = 200
    MIN_RESOLUTION: int = 100  # Resetting to 500 for production accuracy
    MAX_FILE_SIZE: int = 10 * 1024 * 1024
    MAX_PAYLOAD_SIZE: int = 30 * 1024 * 1024
    
    # Consistency
    SIMILARITY_THRESHOLD: float = 0.6
    
    # Weights
    CNN_WEIGHT: float = 0.7
    MORPHOLOGY_WEIGHT: float = 0.3
    
    # Breeds
    BREEDS: List[str] = [
        "Gir", "Red Sindhi", "Sahiwal", "Tharparkar", "Kankrej",
        "Murrah", "Pandharpuri", "Jaffrabadi", "Surti", "Mehsana"
    ]
    
    class Config:
        env_file = _ENV_FILE

settings = Settings()

# Ensure directories exist
os.makedirs(settings.MODEL_DIR, exist_ok=True)
os.makedirs(settings.LOG_DIR, exist_ok=True)
