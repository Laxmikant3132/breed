import numpy as np
from typing import List, Dict, Any, Tuple
from config import settings
import cv2

class MultiImageAnalyzer:
    """
    Handles:
    - Consistency check (Cosine Similarity)
    - Ensemble aggregation (CNN + Morphology)
    - Confidence level mapping
    """
    
    def check_consistency(self, images_bytes: List[bytes]) -> Tuple[bool, str, List[float]]:
        """
        Extracts features (using ORB/SIFT as fallback if no ResNet50) 
        and computes similarity between images.
        """
        if len(images_bytes) < 2:
            return True, "", []

        orb = cv2.ORB_create()
        descriptors = []
        
        for img_bytes in images_bytes:
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
            _, desc = orb.detectAndCompute(img, None)
            if desc is not None:
                descriptors.append(desc)
            else:
                descriptors.append(np.zeros((1, 32), dtype=np.uint8))

        similarity_scores = []
        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        
        # Compare first image with all others
        for i in range(1, len(descriptors)):
            matches = bf.match(descriptors[0], descriptors[i])
            # Score based on number of matches / total features
            score = len(matches) / 500 # ORB typically finds up to 500
            similarity_scores.append(round(min(score * 2, 1.0), 2)) # Heuristic scaling

        # In a real scenario, use ResNet50 embeddings for true cosine similarity
        avg_sim = np.mean(similarity_scores) if similarity_scores else 1.0
        
        if avg_sim < settings.SIMILARITY_THRESHOLD:
            return False, "Images appear to be different animals", similarity_scores
            
        return True, "", similarity_scores

    def get_confidence_level(self, confidence: float) -> str:
        if confidence >= 90: return "High"
        if confidence >= 75: return "Good"
        if confidence >= 60: return "Medium"
        return "Low"

    def aggregate_results(self, cnn_probs_list: List[np.ndarray], morphology_scores_list: List[np.ndarray], morphology_avail_list: List[float]) -> Dict[str, Any]:
        """
        Ensemble formula:
        0.7 * CNN + 0.3 * Morphology
        """
        avg_cnn = np.mean(cnn_probs_list, axis=0)
        
        # Weighted average of morphology based on availability
        total_avail = sum(morphology_avail_list)
        if total_avail > 0:
            avg_morph = np.zeros(10)
            for score, avail in zip(morphology_scores_list, morphology_avail_list):
                avg_morph += score * (avail / total_avail)
        else:
            avg_morph = np.zeros(10)

        # Ensemble
        final_scores = (settings.CNN_WEIGHT * avg_cnn * 100) + (settings.MORPHOLOGY_WEIGHT * avg_morph)
        
        # If morphology was mostly unavailable (> 50% failed)
        avg_availability = np.mean(morphology_avail_list)
        notes = ""
        if avg_availability < 0.5:
            final_scores = avg_cnn * 100
            notes = "Limited angles available, using primary model"

        # Final Ranking
        top_indices = np.argsort(final_scores)[::-1]
        top_predictions = []
        for idx in top_indices[:3]:
            top_predictions.append({
                "breed": settings.BREEDS[idx],
                "score": int(final_scores[idx])
            })
            
        best_idx = top_indices[0]
        confidence = int(final_scores[best_idx])
        
        return {
            "breed": settings.BREEDS[best_idx],
            "confidence": confidence,
            "confidenceLevel": self.get_confidence_level(confidence),
            "topPredictions": top_predictions,
            "notes": notes
        }

multi_image_analyzer = MultiImageAnalyzer()
