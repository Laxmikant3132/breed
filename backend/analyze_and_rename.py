import os
import sys

# Add app directory to path so we can import services
base_dir = os.path.dirname(os.path.abspath(__file__))
app_dir = os.path.join(base_dir, "app")
if app_dir not in sys.path:
    sys.path.insert(0, app_dir)

try:
    from services.gemini_analyzer import gemini_analyzer
except ImportError:
    if base_dir not in sys.path:
        sys.path.insert(0, base_dir)
    from app.services.gemini_analyzer import gemini_analyzer
import json

def process_images():
    img_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "reference_images")
    if not os.path.exists(img_dir):
        print(f"Directory not found: {img_dir}")
        return

    for filename in os.listdir(img_dir):
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            continue
            
        # Skip if already renamed properly (doesn't have "WhatsApp" or "images")
        if "whatsapp" not in filename.lower() and "images" not in filename.lower() and "adult-buffalo" not in filename.lower() and "indian-buffalo" not in filename.lower() and "mediterranean" not in filename.lower():
            continue

        filepath = os.path.join(img_dir, filename)
        
        try:
            with open(filepath, "rb") as f:
                img_bytes = f.read()
                
            print(f"\nAnalyzing {filename}...")
            result = gemini_analyzer.analyze_images([img_bytes])
            
            if result and "breed" in result:
                breed_name = result["breed"]
                
                # Create safe filename
                safe_breed = breed_name.replace(" ", "")
                new_filename = f"{safe_breed}_{filename.replace(' ', '_')}"
                new_filepath = os.path.join(img_dir, new_filename)
                
                # Rename the file
                os.rename(filepath, new_filepath)
                print(f"✅ Renamed to: {new_filename} (Breed: {breed_name})")
            else:
                print(f"❌ Failed to identify breed for {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    process_images()
