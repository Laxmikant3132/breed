import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { 
  History, 
  TrendingUp, 
  ChevronRight, 
  Search,
  LayoutGrid,
  List,
  Bell,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    // Mock recent reports
    setRecentReports([
      { id: '1', breedName: 'Gir Cattle', confidence: 98.5, timestamp: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { id: '2', breedName: 'Murrah Buffalo', confidence: 94.2, timestamp: new Date(Date.now() - 86400000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1545468835-0552467d5830?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
      { id: '3', breedName: 'Sahiwal Cattle', confidence: 91.8, timestamp: new Date(Date.now() - 172800000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    ]);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold dark:text-white mb-2">{t('dashboard.welcome', { name: user?.fullName.split(' ')[0] || '' })}</h1>
            <p className="text-slate-500 dark:text-slate-400">{t('dashboard.subtitle')}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative z-50">
              <button 
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-colors flex items-center gap-2"
                title="Change Language"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-semibold hidden sm:block">
                  {language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'ಕನ್ನಡ'}
                </span>
              </button>
              
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 top-full">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिंदी' },
                    { code: 'kn', label: 'ಕನ್ನಡ' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        language === lang.code 
                          ? 'text-primary-600 font-bold bg-primary-50 dark:bg-primary-900/10' 
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                placeholder={t('dashboard.search')} 
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 w-64"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-agriculture-gradient p-10 rounded-[2.5rem] text-white shadow-lg shadow-primary-500/20 relative overflow-hidden group min-h-[240px] flex flex-col justify-center">
                <div className="relative z-10">
                  <TrendingUp className="h-10 w-10 mb-6 opacity-80" />
                  <p className="text-primary-100 font-bold mb-2 uppercase tracking-widest text-xs">{t('dashboard.total_analyses')}</p>
                  <h3 className="text-5xl font-black mb-6">124</h3>
                  <div className="flex items-center gap-2 text-sm text-primary-100">
                    <span className="px-3 py-1 bg-white/20 rounded-lg font-bold">+12%</span>
                    <span>{t('dashboard.growth')}</span>
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </div>

              <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800 flex flex-col justify-center min-h-[240px]">
                <div>
                  <div className="h-14 w-14 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                    <History className="h-7 w-7" />
                  </div>
                  <p className="text-slate-400 dark:text-slate-500 font-bold mb-2 uppercase tracking-widest text-xs">{t('dashboard.recent_accuracy')}</p>
                  <h3 className="text-5xl font-black dark:text-white mb-6">96.8%</h3>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[96.8%]" />
                </div>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-premium border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-3xl text-primary-600">
                  <Sparkles className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black dark:text-white mb-2 italic">{t('dashboard.ready_analysis')}</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed">{t('dashboard.ready_desc')}</p>
                  <button 
                    onClick={() => navigate('/dashboard/analyze')}
                    className="btn-primary py-4 px-8 flex items-center gap-2 shadow-xl shadow-primary-500/20"
                  >
                    {t('dashboard.launch_analyzer')} <Zap className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 dark:bg-primary-900/10 rounded-full -mr-16 -mt-16" />
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-lg dark:text-white">{t('dashboard.recent_reports')}</h3>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400">
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-lg text-primary-600">
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div 
                    key={report.id}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer"
                  >
                    <img 
                      src={report.imageUrl} 
                      alt={report.breedName} 
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{t(`breeds.${report.breedName}`)}</h4>
                      <p className="text-xs text-slate-500">{formatDate(report.timestamp)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-bold text-primary-600">{report.confidence}%</span>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/dashboard/reports')}
                className="w-full mt-8 py-3 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                {t('dashboard.view_all_reports')} <ChevronRight className="h-4 w-4" />
              </button>
            </section>

            <section className="bg-primary-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">{t('dashboard.go_premium')}</h3>
                <p className="text-primary-200 text-sm mb-6 leading-relaxed">
                  {t('dashboard.premium_desc')}
                </p>
                <button className="w-full bg-white text-primary-900 font-bold py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-xl">
                  {t('dashboard.upgrade_now')}
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-800 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-800 rounded-full -ml-12 -mb-12 opacity-50" />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
