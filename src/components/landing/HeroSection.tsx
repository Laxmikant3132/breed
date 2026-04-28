import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-soft-green min-h-screen flex items-center">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary-200/30 rounded-full blur-[100px] -z-10" />

      <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold text-sm mb-6 border border-primary-100 dark:border-primary-800">
            <Sparkles className="h-4 w-4" />
            <span>AI-Driven Precision Agriculture</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 dark:text-white">
            AI-Powered <span className="text-primary-600 italic">Breed Recognition</span> for Indian Cattle
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
            Identify 50+ Indian cattle and buffalo breeds instantly with 98% accuracy. Get milk production insights, health predictions, and market valuation in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/signup" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
              Start Recognition <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/learn" className="btn-secondary py-4 px-8 text-lg flex items-center justify-center gap-2 dark:bg-slate-800 dark:text-white dark:border-slate-700">
              Browse Breeds
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">98%</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Accuracy</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">50+</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Breeds</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">10K+</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Reports</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Indian Cattle" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 z-20 glass-card p-4 flex items-center gap-3 animate-float"
          >
            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Result</p>
              <p className="font-bold text-slate-900 dark:text-white">Gir Cattle Detected</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 z-20 glass-card p-4 flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Milk Potential</p>
              <p className="font-bold text-slate-900 dark:text-white">2000L - 2500L/Year</p>
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary-200/50 rounded-full -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary-100/30 rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
