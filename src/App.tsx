import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import AppRoutes from './routes/AppRoutes';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AppRoutes />
            </motion.div>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
