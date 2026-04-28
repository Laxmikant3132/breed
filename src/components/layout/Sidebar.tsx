import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  History, 
  Search, 
  Settings, 
  User, 
  LogOut, 
  Leaf,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { name: t('sidebar.dashboard'), icon: LayoutDashboard, path: '/dashboard' },
    { name: t('sidebar.analyze'), icon: Upload, path: '/dashboard/analyze' },
    { name: t('sidebar.reports'), icon: History, path: '/dashboard/reports' },
    { name: t('sidebar.catalog'), icon: Search, path: '/dashboard/catalog' },
  ];

  const bottomItems = [
    { name: t('sidebar.profile'), icon: User, path: '/dashboard/profile' },
    { name: t('sidebar.settings'), icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 h-screen sticky top-0 flex flex-col transition-colors">
      <div className="p-8">
        <Link to="/" className="flex items-center gap-2 group mb-10">
          <div className="p-2 bg-primary-600 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Leaf className="text-white h-6 w-6" />
          </div>
          <span className="font-bold text-2xl font-['Outfit'] tracking-tight dark:text-white">
            Breed<span className="text-primary-600">AI</span>
          </span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl transition-all duration-200 group",
                location.pathname === item.path 
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-bold shadow-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "h-5 w-5",
                  location.pathname === item.path ? "text-primary-600" : "text-slate-400 group-hover:text-primary-600"
                )} />
                <span>{item.name}</span>
              </div>
              {location.pathname === item.path && <ChevronRight className="h-4 w-4" />}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
        <div className="space-y-2">
          {bottomItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                location.pathname === item.path ? "bg-slate-50 dark:bg-slate-800" : ""
              )}
            >
              <item.icon className="h-5 w-5 text-slate-400" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-3 relative group overflow-hidden">
          <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold">
            {user?.fullName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.fullName}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="relative z-10 p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
