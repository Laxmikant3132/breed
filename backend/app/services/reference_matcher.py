import os
import imagehash
from PIL import Image
import io
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class ReferenceMatcher:
    def __init__(self):
        # We assume reference images are stored in backend/data/reference_images/
        # with filenames like "murrah_1.jpg", "gir_front.png", etc.
        # The breed name is the text before the first underscore or dot.
        self.reference_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
            "data", "reference_images"
        )
        self.reference_hashes = {}
        self.load_references()

    def load_references(self):
        """Loads and hashes all reference images."""
        if not os.path.exists(self.reference_dir):
            os.makedirs(self.reference_dir, exist_ok=True)
            logger.info(f"Created reference directory: {self.reference_dir}")
            return

        mapping_file = os.path.join(self.reference_dir, "mapping.json")
        manual_mapping = {}
        if os.path.exists(mapping_file):
            try:
                import json
                with open(mapping_file, 'r') as f:
                    manual_mapping = json.load(f)
            except Exception as e:
                logger.error(f"Error loading mapping.json: {e}")

        loaded_count = 0
        for filename in os.listdir(self.reference_dir):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                if filename in manual_mapping:
                    breed_key = manual_mapping[filename]
                else:
                    # Fallback to extracting from filename
                    breed_key = filename.split('_')[0].split('.')[0].title()
                    if breed_key.lower() == "redsindhi": breed_key = "Red Sindhi"
                    if breed_key.lower() == "images" or breed_key.lower() == "whatsapp":
                        breed_key = "Unknown" # Need manual mapping
                
                filepath = os.path.join(self.reference_dir, filename)
                try:
                    img = Image.open(filepath)
                    # pHash (perceptual hash) is robust to resizing/compression
                    img_hash = imagehash.phash(img)
                    
                    self.reference_hashes[filename] = {
                        "hash": img_hash,
                        "breed": breed_key
                    }
                    loaded_count += 1
                except Exception as e:
                    logger.error(f"Error loading reference image {filename}: {e}")
                    
        logger.info(f"Loaded {loaded_count} reference images for exact matching.")

    def match_image(self, image_bytes: bytes) -> Optional[Dict[str, Any]]:
        """
        Compares uploaded image against reference images.
        Returns breed info if a match is found.
        """
        if not self.reference_hashes:
            self.load_references() # Try loading again if it was empty

        if not self.reference_hashes:
            return None # Still no images provided

        try:
            uploaded_img = Image.open(io.BytesIO(image_bytes))
            uploaded_hash = imagehash.phash(uploaded_img)
            
            # Find best match
            best_match = None
            best_diff = float('inf')
            
            for filename, data in self.reference_hashes.items():
                ref_hash = data["hash"]
                diff = uploaded_hash - ref_hash # Difference between hashes
                
                if diff < best_diff:
                    best_diff = diff
                    best_match = data
                    
            # If difference is 0, it's the exact same image
            # We allow a small difference (e.g., <= 4) to account for slight resizing by the browser
            if best_diff <= 8 and best_match:
                logger.info(f"✅ Exact match found! Matches reference {best_match['breed']} (Diff: {best_diff})")
                return {
                    "breed": best_match["breed"],
                    "confidence": 100,
                    "confidenceLevel": "High",
                    "topPredictions": [{"breed": best_match["breed"], "score": 100}],
                    "notes": "Exact match with verified reference database."
                }
            
            logger.info(f"No match found. Closest diff was {best_diff}.")
            return None

        except Exception as e:
            logger.error(f"Error in reference matching: {e}")
            return None

reference_matcher = ReferenceMatcher()
