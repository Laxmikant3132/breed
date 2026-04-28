import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Phone, 
  Camera, 
  ShieldCheck, 
  Edit3,
  ExternalLink,
  Award
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-primary-600 mb-2">
            <UserIcon className="h-5 w-5" />
            <span className="font-bold uppercase tracking-widest text-xs">Identity</span>
          </div>
          <h1 className="text-4xl font-black dark:text-white">My Profile</h1>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="xl:col-span-1 space-y-8"
          >
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-premium border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-agriculture-gradient -z-0" />
              
              <div className="relative z-10 pt-10">
                <div className="relative inline-block group">
                  <div className="h-32 w-32 rounded-full border-4 border-white dark:border-slate-900 bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-4xl font-black overflow-hidden">
                    {user?.fullName.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg text-primary-600 border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <h2 className="text-2xl font-black mt-6 dark:text-white">{user?.fullName}</h2>
                <p className="text-slate-500 font-medium text-sm mb-6 italic">Cattle Health Specialist</p>

                <div className="flex justify-center gap-3">
                  <span className="px-4 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-[10px] font-black rounded-full uppercase tracking-wider border border-primary-100 dark:border-primary-800">
                    Premium Member
                  </span>
                  <span className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-wider border border-slate-100 dark:border-slate-700">
                    Admin Access
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-lg mb-6 dark:text-white">Achievements</h3>
              <div className="space-y-4">
                {[
                  { name: "Top Contributor", date: "Jan 2026", icon: Award, color: "text-amber-500", bg: "bg-amber-50" },
                  { name: "Verified Expert", date: "Dec 2025", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" }
                ].map((ach, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 dark:border-slate-800">
                    <div className={`h-10 w-10 ${ach.bg} dark:bg-opacity-10 rounded-xl flex items-center justify-center ${ach.color}`}>
                      <ach.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm dark:text-white">{ach.name}</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-black">{ach.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-2 space-y-8"
          >
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-premium border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black dark:text-white">Profile Details</h3>
                <button className="flex items-center gap-2 px-6 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors uppercase tracking-wider">
                  <Edit3 className="h-4 w-4" />
                  Edit Info
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <UserIcon className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Full Name</span>
                  </div>
                  <p className="font-bold dark:text-white text-lg">{user?.fullName}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Email Address</span>
                  </div>
                  <p className="font-bold dark:text-white text-lg">{user?.email}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Contact Number</span>
                  </div>
                  <p className="font-bold dark:text-white text-lg">+91 98765 43210</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Location</span>
                  </div>
                  <p className="font-bold dark:text-white text-lg">Ahmedabad, Gujarat</p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700/50">
                <h4 className="font-black text-sm uppercase tracking-widest mb-4 dark:text-white">Bio Information</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Passionate about livestock health and dairy technology. Over 8 years of experience in managing high-yield cattle farms in Saurashtra region. Early adopter of AI technologies in Indian agriculture.
                </p>
              </div>
            </div>

            <div className="bg-primary-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black italic">Specialized Certifications</h3>
                  <ExternalLink className="h-6 w-6 text-primary-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <p className="text-xs font-black text-primary-300 uppercase mb-2">NDDB Certified</p>
                    <p className="font-bold text-lg">Bovine Breed Specialist</p>
                  </div>
                  <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <p className="text-xs font-black text-primary-300 uppercase mb-2">Amul Dairy</p>
                    <p className="font-bold text-lg">Supply Chain Auditor</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800 rounded-full -mr-32 -mt-32 opacity-50" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
