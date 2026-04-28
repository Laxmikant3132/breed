import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import BreedCard from '../components/ui/BreedCard';
import { 
  Search, 
  SlidersHorizontal, 
  BookMarked, 
  Sparkles, 
  LayoutGrid, 
  List,
  Info
} from 'lucide-react';
import type { BreedInfo } from '../types';
import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';

const CatalogPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Cattle' | 'Buffalo'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const breeds: BreedInfo[] = [
    {
      id: '1',
      name: 'Gir Cattle',
      type: 'Cattle',
      milkProduction: '1500 - 2500 kg/lactation',
      region: 'Gujarat (Saurashtra)',
      strengths: ['Heat Tolerance', 'Disease Resistance', 'High Milk Fat'],
      useCases: ['Commercial Dairy', 'Breeding', 'Drought Power'],
      description: 'Famous for its tolerance to tropical diseases and high heat.',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      advantages: [], disadvantages: []
    },
    {
      id: '2',
      name: 'Murrah Buffalo',
      type: 'Buffalo',
      milkProduction: '2000 - 3000 kg/lactation',
      region: 'Haryana & Punjab',
      strengths: ['High Fat Content', 'Adaptability', 'Draft Power'],
      useCases: ['Premium Milk Production', 'Ghee Manufacturing'],
      description: 'The most popular buffalo breed in India for dairy.',
      image: '/breeds/murrah.png',
      advantages: [], disadvantages: []
    },
    {
      id: '3',
      name: 'Sahiwal Cattle',
      type: 'Cattle',
      milkProduction: '2000 - 3000 kg/lactation',
      region: 'Punjab & Rajasthan',
      strengths: ['High Milk Yield', 'Ticks Resistance', 'Longevity'],
      useCases: ['Large Scale Dairy', 'Household Milk'],
      description: 'One of the best dairy breeds in India.',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      advantages: [], disadvantages: []
    },
    {
      id: '4',
      name: 'Red Sindhi',
      type: 'Cattle',
      milkProduction: '1700 - 2200 kg/lactation',
      region: 'Sindh (orig.), across India',
      strengths: ['Hardiness', 'Drought Resistance', 'Consistent Yield'],
      useCases: ['Drought Farming', 'Dairy'],
      description: 'Very hardy and adaptable to different climatic conditions.',
      image: '/breeds/red_sindhi.png',
      advantages: [], disadvantages: []
    },
    {
      id: '5',
      name: 'Jaffrabadi Buffalo',
      type: 'Buffalo',
      milkProduction: '1800 - 2500 kg/lactation',
      region: 'Gujarat (Saurashtra)',
      strengths: ['Heavy Body', 'High Fat %', 'Heat Tolerance'],
      useCases: ['Industrial Dairy', 'Ghee'],
      description: 'Known for being one of the largest buffalo breeds.',
      image: '/breeds/jaffrabadi.png',
      advantages: [], disadvantages: []
    },
    {
      id: '6',
      name: 'Tharparkar',
      type: 'Cattle',
      milkProduction: '1800 - 2200 kg/lactation',
      region: 'Rajasthan (Thar Desert)',
      strengths: ['Arid Survival', 'Low Maintenance', 'Dual Purpose'],
      useCases: ['Desert Farming', 'Low Input Dairy'],
      description: 'Excellent dual-purpose breed for arid regions.',
      image: '/breeds/tharparkar.png',
      advantages: [], disadvantages: []
    }
  ];

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || breed.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-primary-600 mb-2">
              <BookMarked className="h-5 w-5" />
              <span className="font-bold uppercase tracking-widest text-xs">{t('catalog.knowledge_center')}</span>
            </div>
            <h1 className="text-4xl font-black dark:text-white">{t('catalog.breed_catalog')}</h1>
          </div>
          
          <div className="flex items-center gap-3 p-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                viewMode === 'grid' ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                viewMode === 'list' ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-lg mb-6 dark:text-white">{t('catalog.search_filters')}</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{t('catalog.search_keywords')}</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder={t('catalog.search_placeholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{t('catalog.animal_type')}</label>
                  <div className="flex flex-col gap-2">
                    {['All', 'Cattle', 'Buffalo'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setActiveFilter(type as any)}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl text-sm font-bold text-left transition-all",
                          activeFilter === type 
                            ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20" 
                            : "bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                        )}
                      >
                        {t(`catalog.${type}`)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-400">
                    <span>{t('catalog.advanced_filters')}</span>
                    <SlidersHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-primary-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-primary-300">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t('catalog.premium_insight')}</span>
                </div>
                <h4 className="text-xl font-bold mb-4">{t('catalog.export_catalog')}</h4>
                <p className="text-primary-200 text-xs mb-6 leading-relaxed">
                  {t('catalog.export_desc')}
                </p>
                <button className="w-full bg-white text-primary-900 font-bold py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-xl text-sm">
                  {t('catalog.download_db')}
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-800 rounded-full -mr-16 -mt-16" />
            </div>
          </div>

          {/* Results Area */}
          <div className="xl:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <div className="h-10 w-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary-600">
                <Info className="h-5 w-5" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('catalog.showing')} <span className="font-black text-slate-900 dark:text-white">{filteredBreeds.length}</span> {t('catalog.verified_breeds')}
              </p>
            </div>

            {filteredBreeds.length > 0 ? (
              <motion.div 
                layout
                className={cn(
                  "grid gap-8",
                  viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3" : "grid-cols-1"
                )}
              >
                {filteredBreeds.map((breed) => (
                  <BreedCard key={breed.id} breed={breed} />
                ))}
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] py-20 text-center border border-slate-100 dark:border-slate-800">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white mb-2">{t('catalog.no_results')}</h3>
                <p className="text-slate-500">{t('catalog.no_results_desc')}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CatalogPage;
