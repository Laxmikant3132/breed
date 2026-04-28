import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BreedCard from '../components/ui/BreedCard';
import { Search, SlidersHorizontal, BookMarked, Sparkles } from 'lucide-react';
import type { BreedInfo } from '../types';
import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';

const LearnMorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Cattle' | 'Buffalo'>('All');

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
      image: 'https://images.unsplash.com/photo-1545468835-0552467d5830?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1545468835-0552467d5830?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      advantages: [], disadvantages: []
    }
  ];

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || breed.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Header Section */}
        <div className="section-padding mb-12">
          <div className="bg-soft-green p-12 rounded-[3rem] border border-primary-100 dark:border-primary-900/30 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
                <BookMarked className="h-4 w-4" />
                Knowledge Base
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 dark:text-white">Breed Catalog</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Discover the diverse world of Indian cattle and buffalo breeds. Learn about their origins, production capabilities, and unique characteristics.
              </p>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-secondary-200/20 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="section-padding mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-premium border border-slate-100 dark:border-slate-800">
            <div className="relative w-full lg:w-1/2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search breeds (e.g. Gir, Murrah, Sahiwal)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-700 w-full lg:w-auto">
                {['All', 'Cattle', 'Buffalo'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter as any)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex-1 lg:flex-none",
                      activeFilter === filter 
                        ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-slate-500 hover:text-primary-600 transition-colors">
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="section-padding">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
              {filteredBreeds.length} Breeds Found
              {searchTerm && <span className="text-slate-400 font-normal text-sm italic">for "{searchTerm}"</span>}
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg border border-primary-100 dark:border-primary-800">
              <Sparkles className="h-3 w-3" />
              AI Verified Data
            </div>
          </div>

          {filteredBreeds.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBreeds.map((breed) => (
                <BreedCard key={breed.id} breed={breed} />
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-2">No breeds found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveFilter('All');}}
                className="mt-8 text-primary-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearnMorePage;
