import cv2
import numpy as np
from PIL import Image
import io

def preprocess_image(image_bytes: bytes, target_size=(224, 224)) -> np.ndarray:
    """
    Standard preprocessing for CNN inference:
    - RGB conversion
    - CLAHE contrast enhancement
    - Resize to target size
    - Normalize [0, 1]
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise ValueError("Invalid image format")

    # RGB Conversion
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Resize
    img_resized = cv2.resize(img_rgb, target_size)
    
    # CLAHE Enhancement
    lab = cv2.cvtColor(img_resized, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    limg = cv2.merge((cl, a, b))
    img_enhanced = cv2.cvtColor(limg, cv2.COLOR_LAB2RGB)
    
    # Normalization
    img_normalized = img_enhanced.astype(np.float32) / 255.0
    
    return img_normalized

def remove_background(img: np.ndarray) -> np.ndarray:
    """Optional background reduction using GrabCut or simple thresholding."""
    mask = np.zeros(img.shape[:2], np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    rect = (10, 10, img.shape[1]-10, img.shape[0]-10)
    
    try:
        cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
        mask2 = np.where((mask==2)|(mask==0), 0, 1).astype('uint8')
        img = img * mask2[:,:,np.newaxis]
    except:
        pass # Fallback to original if GrabCut fails
        
    return img
