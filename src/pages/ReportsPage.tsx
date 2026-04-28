import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { motion } from 'framer-motion';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  ChevronRight, 
  MoreHorizontal,
  Calendar,
  BarChart2
} from 'lucide-react';
import { formatDate } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    // Mock reports data
    setReports([
      { id: '1', breedName: 'Gir Cattle', confidence: 98.5, timestamp: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', status: 'Healthy' },
      { id: '2', breedName: 'Murrah Buffalo', confidence: 94.2, timestamp: new Date(Date.now() - 86400000).toISOString(), imageUrl: '/breeds/murrah.png', status: 'Healthy' },
      { id: '3', breedName: 'Sahiwal Cattle', confidence: 91.8, timestamp: new Date(Date.now() - 172800000).toISOString(), imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', status: 'At Risk' },
      { id: '4', breedName: 'Jaffrabadi Buffalo', confidence: 96.1, timestamp: new Date(Date.now() - 259200000).toISOString(), imageUrl: '/breeds/jaffrabadi.png', status: 'Healthy' },
      { id: '5', breedName: 'Tharparkar', confidence: 89.4, timestamp: new Date(Date.now() - 432000000).toISOString(), imageUrl: '/breeds/tharparkar.png', status: 'Healthy' },
    ]);
  }, []);

  const filteredReports = reports.filter(report => 
    report.breedName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-primary-600 mb-2">
            <History className="h-5 w-5" />
            <span className="font-bold uppercase tracking-widest text-xs">{t('reports.analytics_history')}</span>
          </div>
          <h1 className="text-4xl font-black dark:text-white">{t('reports.previous_reports')}</h1>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder={t('reports.search_placeholder')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 shadow-sm transition-all"
            />
          </div>
          <button className="px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="h-5 w-5" />
            {t('reports.filters')}
          </button>
          <button className="px-6 py-4 bg-primary-600 text-white rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">
            <Download className="h-5 w-5" />
            {t('reports.export_all')}
          </button>
        </div>

        {/* Reports Table/Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredReports.map((report) => (
            <motion.div 
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate('/results')}
              className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-premium-hover hover:border-primary-100 dark:hover:border-primary-900/50 transition-all cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <img 
                    src={report.imageUrl} 
                    alt={report.breedName} 
                    className="h-full w-full object-cover rounded-2xl"
                  />
                  <div className="absolute -top-2 -right-2 p-1.5 bg-white dark:bg-slate-800 rounded-full shadow-md">
                    <div className={cn(
                      "h-3 w-3 rounded-full",
                      report.status === 'Healthy' ? "bg-green-500" : "bg-red-500"
                    )} />
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-1">
                    <h3 className="font-black text-slate-900 dark:text-white text-lg">{t(`breeds.${report.breedName}`)}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t('reports.scientific_recognition')}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary-600">
                      <BarChart2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{t('reports.confidence')}</p>
                      <p className="font-bold text-slate-700 dark:text-slate-200">{report.confidence}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{t('reports.analysis_date')}</p>
                      <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{formatDate(report.timestamp)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button className="p-3 text-slate-400 hover:text-primary-600 transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-20">
            <div className="h-24 w-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <History className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold dark:text-white mb-2">{t('reports.no_reports')}</h3>
            <p className="text-slate-500">{t('reports.no_reports_desc')}</p>
          </div>
        )}
      </main>
    </div>
  );
};

// Helper function for conditional classes
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default ReportsPage;
