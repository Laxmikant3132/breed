# BreedAI Production Backend

High-accuracy ensemble recognition system for Indian Cattle and Buffalo breeds.

## 🌟 Advanced Features

- **Ensemble Engine**: Combines Deep Learning (EfficientNetB0) with Classical Computer Vision (Morphology Engine).
- **Morphology Features**: Analyzes horn shape, ear droop, hump size, and body frame ratios.
- **Animal Consistency**: Uses ORB/SIFT descriptors to ensure all uploaded images are of the same animal.
- **Multi-Image Reliability**: Aggregates data from up to 5 angles (front, side, rear) for maximum confidence.
- **Production Guard**: Real-time quality checks for blur, lighting, and resolution.
- **Thread-Safe**: Designed for concurrent requests with model locking and structured logging.

## 🧬 Supported Breeds

- **Cattle**: Gir, Red Sindhi, Sahiwal, Tharparkar, Kankrej
- **Buffalo**: Murrah, Pandharpuri, Jaffrabadi, Surti, Mehsana

## 🚀 Setup & Deployment

### Local Development

1. **Install Dependencies**:
   ```bash
   cd backend
   python -m pip install -r requirements.txt
   ```
2. **Launch Server**:
   ```bash
   cd app
   python -m uvicorn main:app --reload --port 8000
   ```

### Logs & Monitoring
Real-time prediction logs are stored in `backend/logs/predictions.log`.

## 🔌 API Documentation
Visit `http://localhost:8000/docs` for interactive Swagger documentation.
