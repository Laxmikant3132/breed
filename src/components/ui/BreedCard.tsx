import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Droplets, ArrowRight } from 'lucide-react';
import type { BreedInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface BreedCardProps {
  breed: BreedInfo;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-premium border border-slate-100 dark:border-slate-800 group hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={breed.image} 
          alt={breed.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black text-primary-700 uppercase tracking-widest border border-white/50">
            {t(`catalog.${breed.type}`)}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <button className="w-full py-3 bg-white text-primary-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2">
            {t('catalog.view_details')} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold dark:text-white mb-2 group-hover:text-primary-600 transition-colors">{t(`breeds.${breed.name}`)}</h3>
        
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span className="font-medium truncate">{t(`catalog.${breed.region}`)}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="font-medium truncate">{t('catalog.milk')} {breed.milkProduction}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {breed.strengths.slice(0, 2).map((strength, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-[10px] font-bold rounded-lg border border-primary-100 dark:border-primary-800"
            >
              {t(`catalog.${strength}`)}
            </span>
          ))}
          {breed.strengths.length > 2 && (
            <span className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 text-[10px] font-bold rounded-lg">
              +{breed.strengths.length - 2} {t('catalog.more')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BreedCard;
