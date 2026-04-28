from google import genai
from google.genai import types
import json
import logging
import base64
from typing import List, Dict, Any, Optional
from config import settings
from .prompts import BREED_IDENTIFICATION_PROMPT

# Configure logging
logger = logging.getLogger(__name__)

class GeminiAnalyzer:
    def __init__(self):
        self.api_key = getattr(settings, "GEMINI_API_KEY", None)
        self.client = None
        if self.api_key:
            print(f">>> GEMINI INITIALIZED WITH KEY: {self.api_key[:5]}...{self.api_key[-5:]}")
            self.client = genai.Client(api_key=self.api_key, http_options={'api_version': 'v1'})
        else:
            print(">>> GEMINI INITIALIZED WITHOUT KEY!")
        self.model_id = "gemini-1.5-flash-latest"

    def analyze_images(self, images_bytes: List[bytes]) -> Optional[Dict[str, Any]]:
        """
        Analyzes multiple images using the new Gemini SDK.
        """
        print(">>> STARTING GEMINI ANALYSIS (NEW SDK)...")
        if not self.client:
            print(">>> GEMINI CLIENT NOT INITIALIZED!")
            return None

        try:
            # Prepare contents
            contents = []
            for img_bytes in images_bytes:
                contents.append(
                    types.Part.from_bytes(
                        data=img_bytes,
                        mime_type="image/jpeg"
                    )
                )

            contents.append(types.Part.from_text(text=BREED_IDENTIFICATION_PROMPT))

            response = self.client.models.generate_content(
                model=self.model_id,
                contents=contents
            )
            
            response_text = response.text
            logger.info(f"Gemini raw response: {response_text[:200]}...")

            result = json.loads(response_text)
            logger.info(f"✅ (Gemini) Breed identified: {result.get('breed')} ({result.get('confidence')}%)")
            return result

        except Exception as e:
            logger.error(f"Gemini API error: {str(e)}")
            print(f"!!! GEMINI API ERROR: {str(e)}")
            return None

gemini_analyzer = GeminiAnalyzer()
