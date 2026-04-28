import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Crown, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for casual farmers",
      features: ["3 analyses / month", "Standard AI accuracy", "Basic breed info", "Email support"],
      popular: false,
      buttonText: "Current Plan",
      active: true
    },
    {
      name: "Pro",
      price: "₹99/mo",
      description: "Best for growing businesses",
      features: ["Unlimited analyses", "99.8% AI accuracy", "Historical data export", "Health consultations", "Priority support"],
      popular: true,
      buttonText: "Upgrade to Pro",
      active: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large scale operations",
      features: ["Multiple user accounts", "API access", "On-site consulting", "Custom AI training", "24/7 dedicated support"],
      popular: false,
      buttonText: "Contact Sales",
      active: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl bg-slate-50 dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full bg-slate-200/50 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors z-20"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="p-8 md:p-16">
              <header className="text-center mb-16">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-black uppercase tracking-widest mb-6"
                >
                  <Crown className="h-4 w-4" />
                  Subscription Plans
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black dark:text-white mb-4 tracking-tight leading-none italic">
                  Choose the right plan for <br />
                  <span className="text-primary-600">your livestock</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Unlock advanced features and get the most out of BreedAI.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative p-10 rounded-[3rem] border-2 transition-all flex flex-col ${
                      plan.popular 
                        ? 'border-primary-600 bg-white dark:bg-slate-800 shadow-2xl shadow-primary-500/10 scale-105 z-10' 
                        : 'border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl">
                        Most Popular
                      </div>
                    )}

                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-xl ${plan.popular ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                          {idx === 0 ? <Star className="h-5 w-5" /> : idx === 1 ? <Zap className="h-5 w-5" /> : <Crown className="h-5 w-5" />}
                        </div>
                        <h3 className="text-xl font-black dark:text-white italic">{plan.name}</h3>
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-black dark:text-white">{plan.price}</span>
                        {plan.price !== "Free" && plan.price !== "Custom" && (
                          <span className="text-slate-500 font-bold">/mo</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">{plan.description}</p>
                    </div>

                    <div className="flex-1 space-y-4 mb-10">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                            <Check className="h-3 w-3 stroke-[3px]" />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                        plan.active 
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default' 
                          : plan.popular 
                            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-xl shadow-primary-500/20' 
                            : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 shadow-xl'
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Secure payments via Razorpay & UPI. All prices in INR.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
