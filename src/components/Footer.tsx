import React from 'react';
import { Utensils, Heart, ShieldCheck, Sparkles, Store, Compass, ArrowUp } from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';

export const Footer: React.FC = () => {
  const { setActiveTab, currency, setCurrency } = useFoodDelivery();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Zest<span className="text-orange-500">Bite</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Artisan food delivery connecting neighborhood kitchens to culinary enthusiasts. Fresh ingredients, zero compromise.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Quality & Timely Guarantee</span>
            </div>
          </div>

          {/* Quick Discover */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Top Cuisines</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-white transition-colors">Neapolitan Pizza</button></li>
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-white transition-colors">Smashed Cheeseburgers</button></li>
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-white transition-colors">Japanese Tonkotsu & Sushi</button></li>
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-white transition-colors">Healthy Grain Bowls</button></li>
              <li><button onClick={() => { setActiveTab('home'); }} className="hover:text-white transition-colors">Mexican Birria Tacos</button></li>
            </ul>
          </div>

          {/* For Partners & Riders */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kitchen & Partners</h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => { setActiveTab('partner'); scrollToTop(); }} 
                  className="hover:text-orange-400 text-orange-500 font-bold transition-colors flex items-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Restaurant Partner Portal</span>
                </button>
              </li>
              <li><button onClick={() => alert('Courier application: You must have a clean bicycle or scooter license.')} className="hover:text-white transition-colors">Deliver with ZestBite</button></li>
              <li><button onClick={() => alert('Corporate catering inquiries: catering@zestbite.app')} className="hover:text-white transition-colors">ZestBite for Enterprise</button></li>
            </ul>
          </div>

          {/* Apps & Currency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Preferences</h4>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-slate-800 text-white rounded-lg px-2.5 py-1 text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-2 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} ZestBite Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
