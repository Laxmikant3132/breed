import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Moon, 
  Sun,
  Languages, 
  CreditCard,
  HelpCircle,
  ChevronRight,
  Database,
  Check,
  User,
  Trash2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  const sections = [
    {
      title: t('settings.general'),
      items: [
        { 
          icon: Bell, 
          name: t('settings.push_notifications'), 
          description: t('settings.push_desc'), 
          toggle: true, 
          value: notifications, 
          onToggle: () => setNotifications(!notifications) 
        },
        { 
          icon: theme === 'dark' ? Moon : Sun, 
          name: t('settings.dark_mode'), 
          description: t('settings.dark_desc'), 
          toggle: true, 
          value: theme === 'dark', 
          onToggle: toggleTheme 
        },
        { 
          icon: Languages, 
          name: t('settings.language'), 
          description: languages.find(l => l.code === language)?.name || 'English', 
          onClick: () => setShowLanguageModal(true) 
        },
      ]
    },
    {
      title: t('settings.privacy'),
      items: [
        { 
          icon: User, 
          name: t('sidebar.profile'), 
          description: t('settings.security_desc'), 
          onClick: () => navigate('/dashboard/profile') 
        },
        { 
          icon: Shield, 
          name: t('settings.security'), 
          description: "2FA & Security Keys", 
          onClick: () => alert("Security settings coming soon!") 
        },
        { 
          icon: Database, 
          name: t('settings.data_export'), 
          description: t('settings.export_desc'), 
          onClick: () => alert("Preparing your data for export...") 
        },
      ]
    },
    {
      title: t('settings.billing'),
      items: [
        { 
          icon: CreditCard, 
          name: t('settings.pro_plan'), 
          description: t('settings.pro_desc'), 
          badge: t('settings.upgrade'),
          onClick: () => navigate('/dashboard') 
        },
      ]
    },
    {
      title: t('settings.support'),
      items: [
        { 
          icon: HelpCircle, 
          name: t('settings.help'), 
          description: t('settings.help_desc'), 
          onClick: () => navigate('/learn') 
        },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
          <header className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-primary-600 mb-4"
            >
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <SettingsIcon className="h-5 w-5" />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-[10px]">{t('settings.configuration')}</span>
            </motion.div>
            <h1 className="text-5xl font-black dark:text-white tracking-tight">{t('settings.title')}</h1>
          </header>

          <div className="space-y-12">
            {sections.map((section, idx) => (
              <motion.section 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-6 ml-1">
                  {section.title}
                </h2>
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
                    {section.items.map((item, i) => {
                    const isToggle = !!item.toggle;
                    const ClickableWrapper = isToggle ? 'div' : 'button';
                    
                    return (
                      <div 
                        key={i}
                        onClick={() => {
                          if (isToggle) {
                            item.onToggle?.();
                          } else {
                            item.onClick?.();
                          }
                        }}
                        className={`w-full flex items-center justify-between p-7 border-b border-slate-50 dark:border-slate-800/50 last:border-0 text-left transition-all cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 active:scale-[0.995]`}
                      >
                        <div className="flex items-center gap-5">
                          <div className="h-14 w-14 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-black text-lg text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {item.badge && (
                            <span className="px-4 py-1.5 bg-primary-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-primary-500/20">
                              {item.badge}
                            </span>
                          )}
                          
                          {isToggle ? (
                            <div 
                              className={`w-14 h-7 rounded-full transition-all relative ${item.value ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                            >
                              <motion.div 
                                animate={{ x: item.value ? 28 : 4 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                              />
                            </div>
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-300 dark:text-slate-700" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            ))}

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 dark:text-slate-600 border-t border-slate-100 dark:border-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-xs font-bold tracking-wide">{t('settings.version')}</p>
              </div>
              <button className="flex items-center gap-2 text-xs font-black text-rose-600 hover:text-rose-500 transition-colors uppercase tracking-widest group">
                <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                {t('settings.delete_account')}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Language Selection Modal */}
        <AnimatePresence>
          {showLanguageModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowLanguageModal(false)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
              >
                <div className="p-10">
                  <h3 className="text-2xl font-black dark:text-white mb-2">{t('settings.language')}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{t('settings.language_desc')}</p>
                  
                  <div className="space-y-3">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setShowLanguageModal(false);
                        }}
                        className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${
                          language === lang.code 
                            ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-900/10' 
                            : 'border-slate-50 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-900/30'
                        }`}
                      >
                        <div className="flex flex-col items-start">
                          <span className={`font-black ${language === lang.code ? 'text-primary-700 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                            {lang.name}
                          </span>
                          <span className="text-xs text-slate-500 font-bold">{lang.native}</span>
                        </div>
                        {language === lang.code && (
                          <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                            <Check className="h-5 w-5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowLanguageModal(false)}
                    className="w-full mt-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SettingsPage;

