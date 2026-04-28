import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Globe, MessageSquare, Share2, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Leaf className="text-white h-5 w-5" />
              </div>
              <span className="font-bold text-xl font-['Outfit'] dark:text-white">
                Breed<span className="text-primary-600">AI</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Revolutionizing Indian agriculture with AI-powered breed recognition and health predictions for cattle and buffaloes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:text-primary-600 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:text-primary-600 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:text-primary-600 transition-colors">
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 dark:text-white">Platform</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-primary-600 transition-colors">Home</Link></li>
              <li><Link to="/learn" className="hover:text-primary-600 transition-colors">Breed Catalog</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary-600 transition-colors">How it Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 dark:text-white">Support</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 dark:text-white">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary-600" />
                <span>support@breedai.in</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-600" />
                <span>+91 98765 43210</span>
              </li>
              <li className="mt-4">
                <div className="bg-primary-600/10 p-4 rounded-xl border border-primary-600/20">
                  <p className="text-xs font-semibold text-primary-700 dark:text-primary-400 mb-2">Subscribe to our Newsletter</p>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="bg-white dark:bg-slate-800 border-none rounded-lg text-xs p-2 w-full focus:ring-1 focus:ring-primary-500"
                    />
                    <button className="bg-primary-600 text-white p-2 rounded-lg">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © 2026 BreedAI Platform. All rights reserved. Built with ❤️ in India.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
