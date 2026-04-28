import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Moon, 
  Languages, 
  CreditCard,
  HelpCircle,
  ChevronRight,
  Database
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  interface SettingItem {
    icon: any;
    name: string;
    description: string;
    toggle?: boolean;
    value?: boolean;
    setter?: (val: boolean) => void;
    action?: boolean;
    badge?: string;
  }

  const sections: { title: string, items: SettingItem[] }[] = [
    {
      title: "General Settings",
      items: [
        { icon: Bell, name: "Push Notifications", description: "Get alerts for report completion", toggle: true, value: notifications, setter: setNotifications },
        { icon: Moon, name: "Dark Appearance", description: "Switch between light and dark themes", toggle: true, value: darkMode, setter: setDarkMode },
        { icon: Languages, name: "Language", description: "English (India)", action: true },
      ]
    },
    {
      title: "Privacy & Data",
      items: [
        { icon: Shield, name: "Account Security", description: "Two-factor authentication and passwords", action: true },
        { icon: Database, name: "Data Export", description: "Download all your recognition history", action: true },
      ]
    },
    {
      title: "Billing & Subscription",
      items: [
        { icon: CreditCard, name: "Pro Plan", description: "Currently on Free Tier", action: true, badge: "Upgrade" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, name: "Help Center", description: "FAQs and troubleshooting", action: true },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-primary-600 mb-2">
            <SettingsIcon className="h-5 w-5" />
            <span className="font-bold uppercase tracking-widest text-xs">Configuration</span>
          </div>
          <h1 className="text-4xl font-black dark:text-white">Settings</h1>
        </header>

        <div className="max-w-4xl space-y-10">
          {sections.map((section, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 ml-1">{section.title}</h2>
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
                {section.items.map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-6 border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                        <p className="text-xs text-slate-500">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {item.badge && (
                        <span className="px-3 py-1 bg-primary-600 text-white text-[10px] font-black rounded-lg uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                      
                      {item.toggle ? (
                        <button 
                          onClick={() => item.setter && item.setter(!item.value)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${item.value ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.value ? 'left-7' : 'left-1'}`} />
                        </button>
                      ) : (
                        <ChevronRight className="h-5 w-5 text-slate-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}

          <div className="pt-10 flex justify-between items-center text-slate-400">
            <p className="text-xs font-medium">BreedAI Dashboard Version 1.0.4 (Stable)</p>
            <button className="text-xs font-bold text-red-600 hover:underline">Delete Account</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
