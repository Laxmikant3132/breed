import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import UploadBox from '../components/dashboard/UploadBox';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    const preview = URL.createObjectURL(file);
    try {
      const formData = new FormData();
      formData.append('images', file); // Currently only sending 1, but backend supports 1-5

      const response = await fetch('http://localhost:8080/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Analysis failed');
      }

      const data = await response.json();
      navigate('/results', { 
        state: { 
          analysisResult: data,
          imagePreview: preview
        } 
      });
    } catch (error: any) {
      console.error('Analysis error:', error.message);
      // Removed alert to prevent the popup
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 text-primary-600 mb-2">
              <Upload className="h-5 w-5" />
              <span className="font-bold uppercase tracking-widest text-xs">{t('analyze.ai_core')}</span>
            </div>
            <h1 className="text-4xl font-black dark:text-white">{t('analyze.new_recognition')}</h1>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-bold text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('analyze.back_to_home')}
          </button>
        </header>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left side: Upload area */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-premium border border-slate-100 dark:border-slate-800">
                <UploadBox onUpload={handleUpload} isAnalyzing={isAnalyzing} />
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800 flex items-center gap-6">
                <div className="h-16 w-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-600 flex-shrink-0">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold dark:text-white">{t('analyze.privacy')}</h3>
                  <p className="text-sm text-slate-500">{t('analyze.privacy_desc')}</p>
                </div>
              </div>
            </motion.div>

            {/* Right side: Instructions & Tips */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-8"
            >
              <section className="bg-agriculture-gradient p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6 italic">{t('analyze.best_practices')}</h3>
                  <ul className="space-y-6">
                    {[
                      { icon: Zap, text: t('analyze.tip_1') },
                      { icon: Info, text: t('analyze.tip_2') },
                      { icon: Sparkles, text: t('analyze.tip_3') }
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="mt-1 p-1 bg-white/20 rounded-lg">
                          <tip.icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-primary-50">{tip.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
              </section>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800">
                <h4 className="font-black text-sm uppercase tracking-widest mb-6 dark:text-white">{t('analyze.supported_species')}</h4>
                <div className="flex flex-wrap gap-3">
                  {['Gir Cattle', 'Sahiwal', 'Murrah Buffalo', 'Ongole', 'Kankrej', 'Hallikar', 'Jaffrabadi'].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-xl border border-slate-100 dark:border-slate-700">
                      {t(`breeds.${tag}`)}
                    </span>
                  ))}
                  <span className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-xs font-bold rounded-xl border border-primary-100 dark:border-primary-800">
                    {t('analyze.more')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyzePage;
