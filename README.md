# 🐄 BreedAI — Indian Livestock Breed Recognition Platform

> A production-grade, AI-powered platform for identifying and analyzing Indian cattle and buffalo breeds. Built for farmers, dairy owners, veterinarians, and agricultural researchers.

### 🌐 Live Demo

| | URL |
|---|---|
| **Frontend** | [https://breed-frontend.onrender.com](https://breed-frontend.onrender.com) |
| **Backend API** | [https://breed-2.onrender.com](https://breed-2.onrender.com) |
| **API Docs** | [https://breed-2.onrender.com/docs](https://breed-2.onrender.com/docs) |

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧠 **AI Breed Recognition** | Multi-engine identification using Gemini Vision, Claude Vision, and perceptual hash matching against a verified reference database |
| 📊 **Detailed Analytics** | In-depth reports covering milk production potential, regional origin, breed strengths, and physical characteristics |
| 💰 **Market Valuation** | Real-time price estimates (₹ INR) based on breed traits and market trends |
| 🏥 **Health Predictions** | Breed-specific disease vulnerability analysis and preventative care recommendations |
| 📚 **Breed Catalog** | Searchable database of 10 Indian cattle and buffalo breeds with detailed profiles |
| 🌐 **Multilingual Support** | Full UI translations in English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ) |
| 🔐 **Firebase Auth** | Secure user authentication, profile management, and report history via Firestore |
| 🌓 **Dark Mode** | Premium dark-themed UI with smooth animations and responsive design |

---

## 🧬 Supported Breeds

| Cattle (Cow) | Buffalo |
|---|---|
| Gir | Murrah |
| Red Sindhi | Pandharpuri |
| Sahiwal | Jaffrabadi |
| Tharparkar | Surti |
| Kankrej | Mehsana |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript 6, Vite 8
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM 7
- **Forms**: React Hook Form
- **Auth & DB**: Firebase (Authentication, Firestore, Storage, Analytics)
- **i18n**: Custom context-based system (EN / HI / KN)

### Backend
- **Framework**: FastAPI + Uvicorn
- **AI Engines**:
  - Google Gemini 1.5 Flash (primary vision analysis)
  - Anthropic Claude 3.5 Sonnet (fallback vision analysis)
  - Perceptual Hash Matching (deterministic reference matching via ImageHash)
- **Computer Vision**: OpenCV, scikit-image, Pillow, imutils
- **ML**: NumPy, SciPy, scikit-learn
- **Morphology Engine**: Custom feature extraction (horn shape, ear droop, hump size, body frame ratios)
- **Config**: Pydantic Settings + `.env`
- **Deployment**: Docker + Docker Compose

---

## 📂 Project Structure

```
breed/
├── src/                          # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── dashboard/            # Upload & analytics widgets
│   │   ├── landing/              # Hero, Features, CTA sections
│   │   ├── layout/               # Navbar, Footer, Sidebar, ProtectedRoute
│   │   └── ui/                   # Reusable UI (Buttons, Cards, Loaders)
│   ├── context/                  # AuthContext, LanguageContext
│   ├── firebase/                 # Firebase SDK config
│   ├── hooks/                    # Custom React hooks
│   ├── i18n/                     # Translation files (en, hi, kn)
│   ├── pages/                    # Page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx / SignupPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── AnalyzePage.tsx
│   │   ├── ResultsPage.tsx
│   │   ├── CatalogPage.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── LearnMorePage.tsx
│   ├── routes/                   # Centralized routing
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # Helpers & formatters
│
├── backend/                      # Backend (FastAPI + Python)
│   ├── app/
│   │   ├── main.py               # FastAPI entry point
│   │   ├── config.py             # Pydantic settings (.env loader)
│   │   ├── api/
│   │   │   └── routes.py         # /predict, /breeds, /health endpoints
│   │   ├── models/
│   │   │   └── breed_model.py    # EfficientNetB0 ensemble (TF optional)
│   │   ├── services/
│   │   │   ├── gemini_analyzer.py      # Google Gemini Vision
│   │   │   ├── claude_analyzer.py      # Anthropic Claude Vision
│   │   │   ├── reference_matcher.py    # Perceptual hash matching
│   │   │   ├── morphology_engine.py    # Classical CV feature extraction
│   │   │   ├── multi_image_analyzer.py # Multi-angle aggregation
│   │   │   ├── quality_checker.py      # Image quality validation
│   │   │   ├── breed_data.py           # Breed database & metadata
│   │   │   └── prompts.py             # AI prompt templates
│   │   └── utils/
│   │       └── preprocessing.py  # Image preprocessing pipeline
│   ├── data/
│   │   └── reference_images/     # Verified breed reference photos + mapping.json
│   ├── models/                   # Saved ML model weights (.h5)
│   ├── logs/                     # Prediction logs
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── requirements.txt
│
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- **Python** 3.11+
- API keys for [Google Gemini](https://aistudio.google.com/) and/or [Anthropic Claude](https://console.anthropic.com/)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd breed
```

### 2. Frontend Setup

```bash
npm install
npm run dev
```

The frontend dev server runs at `http://localhost:5173`.

### 3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `backend/.env` file with your API keys:

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
GEMINI_API_KEY=AIzaSyxxxxx
```

Start the backend server:

```bash
cd backend/app
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

The API runs at `http://localhost:8080` with Swagger docs at `http://localhost:8080/docs`.

### 4. Docker Deployment (Backend)

```bash
cd backend
docker-compose up --build
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/predict` | Upload 1–5 images for breed identification |
| `GET` | `/api/breeds` | Get the full breed database |
| `GET` | `/api/health` | Backend health check |
| `GET` | `/docs` | Interactive Swagger API documentation |

### Example: Predict Breed

```bash
curl -X POST http://localhost:8080/api/predict \
  -F "images=@cow_photo.jpg"
```

---

## 🏗️ Build for Production

### Frontend

```bash
npm run build
```

Output is generated in the `dist/` directory, ready for static hosting (Vercel, Netlify, Firebase Hosting, etc.).

### Backend

The included `Dockerfile` builds a production-ready container image using Python 3.11-slim.

---

## 📜 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ for the Indian Agricultural Community</p>
