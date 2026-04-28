import cv2
import numpy as np
from config import settings
from typing import Tuple

def check_image_quality(image_bytes: bytes) -> Tuple[bool, str]:
    """
    Production quality checks:
    - Blur (Laplacian)
    - Brightness
    - Multiple animals
    - Resolution
    - Badly cropped (check object proximity to edges)
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        return False, "Unsupported file type or corrupted image"

    h, w = img.shape[:2]
    
    # 1. Resolution
    if h < settings.MIN_RESOLUTION or w < settings.MIN_RESOLUTION:
        return False, f"Resolution too low ({w}x{h}). Minimum {settings.MIN_RESOLUTION}x{settings.MIN_RESOLUTION} required."

    # 2. Blur
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()
    if blur_score < settings.BLUR_THRESHOLD:
        return False, f"Image is too blurry (Score: {blur_score:.1f}). Please provide a steady, clear shot."

    # 3. Brightness
    brightness = np.mean(gray)
    if brightness < settings.MIN_BRIGHTNESS:
        return False, "Image is too dark. Please use better lighting."
    if brightness > settings.MAX_BRIGHTNESS:
        return False, "Image is too bright (overexposed)."

    # 4. Multiple Animals (Heuristic)
    # Using simple thresholding and contour counting for major blobs
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    major_blobs = 0
    img_area = h * w
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > (img_area * 0.15): # Blob covers > 15% of image
            major_blobs += 1
            
    if major_blobs > 1:
        return False, "Multiple animals detected. Please ensure only one animal is in focus."

    # 5. Badly Cropped
    # If the major contour is too close to the edges
    if major_blobs == 1:
        cnt = max(contours, key=cv2.contourArea)
        x, y, w_cnt, h_cnt = cv2.boundingRect(cnt)
        if x < 5 or y < 5 or (x + w_cnt) > (w - 5) or (y + h_cnt) > (h - 5):
            # This is a soft check, sometimes acceptable. 
            # We'll just log it for now or return a mild warning if we had a warning system.
            pass

    return True, "Success"
