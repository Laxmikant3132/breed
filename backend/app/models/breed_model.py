import os
import numpy as np
# import * as fs from 'fs';



# const filePath: int = 'D:\Breed\backend\buffalo\';
# const content: string = fs.readFileSync(filePath, 'utf-8');
# console.log(content);
try:
    import tensorflow as tf
    HAS_TF = True
except ImportError:
    HAS_TF = False
    print("TensorFlow not found. Running in Morphology-dominant mode.")
import logging
import threading
from typing import List, Dict, Any, Tuple
from config import settings
from utils.preprocessing import preprocess_image
from services.morphology_engine import morphology_engine

# Structured Logging
logging.basicConfig(
    filename=settings.LOG_FILE,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class BreedEnsembleModel:
    """
    Core AI inference engine:
    - EfficientNetB0 (CNN)
    - GPU/CPU management
    - Thread-safe inference
    - Smart Fallback
    """
    
    def __init__(self):
        self.model = None
        self.lock = threading.Lock()
        self._load_model()

    def _load_model(self):
        """Loads model once at startup."""
        if not HAS_TF:
            logging.warning("TensorFlow not available. Model inference will be disabled.")
            return

        try:
            if os.path.exists(settings.CURRENT_MODEL_PATH):
                self.model = tf.keras.models.load_model(settings.CURRENT_MODEL_PATH)
                logging.info(f"Loaded primary model from {settings.CURRENT_MODEL_PATH}")
            elif os.path.exists(settings.ENSEMBLE_MODEL_PATH):
                self.model = tf.keras.models.load_model(settings.ENSEMBLE_MODEL_PATH)
                logging.info(f"Loaded ensemble model from {settings.ENSEMBLE_MODEL_PATH}")
            else:
                logging.warning("No .h5 model found. Initializing skeleton EfficientNetB0 for inference.")
                self._initialize_fallback_model()
        except Exception as e:
            logging.error(f"Failed to load model: {e}")
            self._initialize_fallback_model()

    def _initialize_fallback_model(self):
        """Creates a transfer learning architecture as fallback."""
        base_model = tf.keras.applications.EfficientNetB0(
            weights='imagenet', 
            include_top=False, 
            input_shape=(224, 224, 3)
        )
        model = tf.keras.models.Sequential([
            base_model,
            tf.keras.layers.GlobalAveragePooling2D(),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dense(10, activation='softmax')
        ])
        self.model = model
        logging.info("Fallback EfficientNetB0 architecture initialized.")

    def predict_single(self, image_bytes: bytes) -> Tuple[np.ndarray, np.ndarray, float]:
        """
        Runs CNN inference + Morphology feature extraction.
        Thread-safe using lock.
        """
        try:
            # 1. Preprocess
            processed_img = preprocess_image(image_bytes)
            img_batch = np.expand_dims(processed_img, axis=0)
            
            # 2. CNN Prediction (Thread Safe)
            cnn_probs = np.ones(10) / 10 # Default neutral
            if HAS_TF and self.model:
                with self.lock:
                    cnn_probs = self.model.predict(img_batch)[0]
                
            # 3. Morphology Extraction
            morph_features, availability = morphology_engine.extract_features(image_bytes)
            morph_scores = morphology_engine.compute_morphology_scores(morph_features, image_bytes)
            
            return cnn_probs, morph_scores, availability
            
        except Exception as e:
            logging.error(f"Inference error: {e}")
            # Safe return on failure
            return np.ones(10) / 10, np.zeros(10), 0.0

# Singleton instance
breed_model = BreedEnsembleModel()
