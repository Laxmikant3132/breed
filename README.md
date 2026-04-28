# BreedAI: Premium Indian Livestock Recognition Platform

BreedAI is a state-of-the-art, AI-powered agricultural platform designed to identify and analyze Indian cattle and buffalo breeds. Built with a premium aesthetic, it provides farmers, dairy owners, and veterinarians with instant breed identification, market valuation, and disease risk assessments.

![Dashboard Preview](https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Features

- **🚀 AI Breed Recognition**: High-confidence identification of 50+ Indian cattle and buffalo breeds using advanced computer vision.
- **📊 Detailed Analytics**: In-depth reports including milk production potential, regional origin, and breed strengths.
- **💰 Market Valuation**: Real-time price estimates (INR) based on breed characteristics and market trends.
- **🏥 Health Predictions**: Predictive analysis of breed-specific disease vulnerabilities and preventative care tips.
- **📚 Breed Catalog**: A comprehensive, searchable database of Indian livestock breeds.
- **🛡️ Secure Dashboard**: A protected workspace for managing previous reports, user profile, and platform settings.
- **🌓 Dark Mode**: Fully responsive, sleek dark mode for a comfortable user experience in all lighting conditions.
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Backend/Auth**: Firebase (Authentication, Firestore, Storage)
- **Forms**: React Hook Form

## 📂 Project Structure

```text
src/
├── components/
│   ├── dashboard/   # Analytics & Upload components
│   ├── landing/     # Hero, Features, CTA sections
│   ├── layout/      # Navbar, Footer, Sidebar, ProtectedRoute
│   └── ui/          # Reusable UI components (Buttons, Cards, Loaders)
├── context/         # AuthContext for user session management
├── firebase/        # Firebase SDK initialization & configuration
├── pages/           # Main page components (Home, Dashboard, Analyze, etc.)
├── routes/          # Centralized routing configuration
├── types/           # TypeScript interfaces and types
└── utils/           # Helper functions & formatters
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd breed-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   The project is pre-configured with the `breed-jainmca` Firebase credentials. If you wish to use your own, update the `src/firebase/firebase.ts` file.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for the Indian Agricultural Community.
