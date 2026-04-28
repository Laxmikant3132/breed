import React, { useState } from 'react';
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
  Award,
  Save,
  X
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for demo fields (normally these would be in the database)
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Ahmedabad, Gujarat');
  const [bio, setBio] = useState('Passionate about livestock health and dairy technology. Over 8 years of experience in managing high-yield cattle farms in Saurashtra region. Early adopter of AI technologies in Indian agriculture.');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateUserProfile(fullName);
      // In a real app, we'd also send phone, location, bio to the backend here
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8 lg:p-12">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-primary-600 mb-2">
                <UserIcon className="h-5 w-5" />
                <span className="font-bold uppercase tracking-widest text-xs">Identity</span>
              </div>
              <h1 className="text-5xl font-black dark:text-white tracking-tight">My Profile</h1>
            </div>
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all uppercase tracking-widest ${
                isEditing 
                ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 border border-rose-100 dark:border-rose-800' 
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4" />
                  Cancel Edit
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </button>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="xl:col-span-1 space-y-10"
            >
              <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-premium border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-40 bg-agriculture-gradient opacity-90 transition-opacity group-hover:opacity-100" />
                
                <div className="relative z-10 pt-10">
                  <div className="relative inline-block">
                    <div className="h-40 w-40 rounded-full border-8 border-white dark:border-slate-900 bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-5xl font-black overflow-hidden shadow-2xl">
                      {fullName.charAt(0)}
                    </div>
                    <button className="absolute bottom-2 right-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl text-primary-600 border border-slate-100 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all">
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>

                  <h2 className="text-3xl font-black mt-8 dark:text-white tracking-tight leading-tight">{fullName}</h2>
                  <p className="text-slate-500 font-bold text-sm mb-8 italic">Livestock Health Specialist</p>

                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-5 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-[10px] font-black rounded-xl uppercase tracking-[0.15em] border border-primary-100 dark:border-primary-800 shadow-sm">
                      Premium Member
                    </span>
                    <span className="px-5 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 text-[10px] font-black rounded-xl uppercase tracking-[0.15em] border border-slate-100 dark:border-slate-700 shadow-sm">
                      Admin Access
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-premium border border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-lg mb-8 dark:text-white flex items-center gap-2 uppercase tracking-widest text-xs text-slate-400">
                  <Award className="h-4 w-4" />
                  Achievements
                </h3>
                <div className="space-y-6">
                  {[
                    { name: "Top Contributor", date: "Jan 2026", icon: Award, color: "text-amber-500", bg: "bg-amber-50" },
                    { name: "Verified Expert", date: "Dec 2025", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" }
                  ].map((ach, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 rounded-[2rem] border border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className={`h-12 w-12 ${ach.bg} dark:bg-opacity-10 rounded-2xl flex items-center justify-center ${ach.color}`}>
                        <ach.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-sm dark:text-white">{ach.name}</h4>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">{ach.date}</p>
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
              className="xl:col-span-2 space-y-10"
            >
              <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-premium border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-2xl font-black dark:text-white">Profile Details</h3>
                  {isEditing && (
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="btn-primary py-3 px-8 rounded-2xl flex items-center gap-2 shadow-xl shadow-primary-500/20 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save Changes
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                      <UserIcon className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Full Name</span>
                    </div>
                    {isEditing ? (
                      <input 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-lg focus:ring-4 ring-primary-500/10 outline-none transition-all dark:text-white"
                      />
                    ) : (
                      <p className="font-bold dark:text-white text-xl px-1">{fullName}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                      <Mail className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Email Address</span>
                    </div>
                    <p className="font-bold dark:text-white text-xl px-1 opacity-60 cursor-not-allowed">{user?.email}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                      <Phone className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Number</span>
                    </div>
                    {isEditing ? (
                      <input 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-lg focus:ring-4 ring-primary-500/10 outline-none transition-all dark:text-white"
                      />
                    ) : (
                      <p className="font-bold dark:text-white text-xl px-1">{phone}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                      <MapPin className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Location</span>
                    </div>
                    {isEditing ? (
                      <input 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-lg focus:ring-4 ring-primary-500/10 outline-none transition-all dark:text-white"
                      />
                    ) : (
                      <p className="font-bold dark:text-white text-xl px-1">{location}</p>
                    )}
                  </div>
                </div>

                <div className="mt-12 p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50">
                  <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-6 dark:text-slate-400">Bio Information</h4>
                  {isEditing ? (
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 font-medium text-sm leading-relaxed focus:ring-4 ring-primary-500/10 outline-none transition-all dark:text-white resize-none"
                    />
                  ) : (
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium italic">
                      "{bio}"
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-primary-950 rounded-[3.5rem] p-12 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-3xl font-black italic tracking-tight">Professional Certifications</h3>
                    <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                      <ExternalLink className="h-6 w-6 text-primary-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 hover:border-primary-500/30 transition-colors">
                      <p className="text-xs font-black text-primary-400 uppercase tracking-widest mb-3">NDDB Certified</p>
                      <p className="font-black text-xl tracking-tight leading-tight">Bovine Breed Specialist</p>
                    </div>
                    <div className="p-8 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 hover:border-primary-500/30 transition-colors">
                      <p className="text-xs font-black text-primary-400 uppercase tracking-widest mb-3">Amul Dairy</p>
                      <p className="font-black text-xl tracking-tight leading-tight">Supply Chain Auditor</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/10 rounded-full -mr-40 -mt-40 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full -ml-32 -mb-32 blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

