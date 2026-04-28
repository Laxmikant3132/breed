import anthropic
import base64
import json
import logging
from typing import List, Dict, Any, Optional
from config import settings
from .prompts import BREED_IDENTIFICATION_PROMPT

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ClaudeAnalyzer:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.model = "claude-3-5-sonnet-20240620"

    def _get_media_type(self, img_bytes: bytes) -> str:
        """Simple detection of image media type based on magic numbers."""
        if img_bytes.startswith(b'\xff\xd8'):
            return "image/jpeg"
        if img_bytes.startswith(b'\x89PNG\r\n\x1a\n'):
            return "image/png"
        if img_bytes.startswith(b'RIFF') and img_bytes[8:12] == b'WEBP':
            return "image/webp"
        return "image/jpeg"  # Default fallback

    def analyze_images(self, images_bytes: List[bytes]) -> Optional[Dict[str, Any]]:
        """
        Analyzes multiple images using Claude Vision API.
        Returns a structured JSON response.
        """
        try:
            content = []
            for img_bytes in images_bytes:
                base64_image = base64.b64encode(img_bytes).decode("utf-8")
                media_type = self._get_media_type(img_bytes)

                content.append({
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": media_type,
                        "data": base64_image,
                    },
                })

            content.append({
                "type": "text",
                "text": BREED_IDENTIFICATION_PROMPT
            })

            logger.info(f"Sending {len(images_bytes)} image(s) to Claude API...")

            message = self.client.messages.create(
                model=self.model,
                max_tokens=1024,
                messages=[
                    {
                        "role": "user",
                        "content": content,
                    }
                ],
            )

            response_text = message.content[0].text
            logger.info(f"Claude raw response: {response_text[:200]}...")

            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0].strip()
            elif "{" in response_text:
                response_text = response_text[response_text.find("{"):response_text.rfind("}")+1]

            result = json.loads(response_text)
            logger.info(f"✅ Breed identified: {result.get('breed')} ({result.get('confidence')}%)")
            return result

        except json.JSONDecodeError as e:
            logger.error(f"JSON parse error: {str(e)} | Response: {response_text}")
            return None
        except anthropic.RateLimitError as e:
            logger.error(f"Rate limit or balance error: {str(e)}")
            print(f"!!! CLAUDE API ERROR: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            print(f"!!! CLAUDE API ERROR: {str(e)}")
            return None

claude_analyzer = ClaudeAnalyzer()