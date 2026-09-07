import React from 'react';
import { Sparkles, Clock, ShieldCheck, Tag, ArrowRight, Star, ChefHat } from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';

export const HeroBanner: React.FC = () => {
  const { applyPromo, appliedPromo, setActiveTab, setSelectedCategory } = useFoodDelivery();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-white pt-8 pb-10 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
              <span>Delivering Across India • Express Food Delivery</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Crave it. Tap it. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                Savor the moment.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Order artisanal wood-fired pizzas, handcrafted smash burgers, fresh sushi, and nourishing superfood bowls delivered to your doorstep in 25 minutes or less.
            </p>

            {/* Promo Code Badges with 1-click apply */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-orange-500" />
                Featured Offers:
              </span>
              
              <button
                onClick={() => applyPromo('ZEST30')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold border transition-all flex items-center gap-1.5 ${
                  appliedPromo?.code === 'ZEST30'
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                    : 'bg-white hover:bg-orange-50 text-slate-800 border-slate-200 hover:border-orange-300'
                }`}
              >
                <span>Code <strong className="text-orange-600">ZEST30</strong> (30% OFF)</span>
              </button>

              <button
                onClick={() => applyPromo('FREEDEL')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold border transition-all flex items-center gap-1.5 ${
                  appliedPromo?.code === 'FREEDEL'
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                    : 'bg-white hover:bg-orange-50 text-slate-800 border-slate-200 hover:border-orange-300'
                }`}
              >
                <span>Code <strong className="text-orange-600">FREEDEL</strong> (Free Delivery)</span>
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('restaurants');
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/25 flex items-center gap-2 group transition-all"
              >
                <span>Explore Restaurants</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('Pizza');
                  setActiveTab('home');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs transition-all"
              >
                Popular Pizzas 🍕
              </button>
            </div>

            {/* Trust micro-stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/70 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">22 Mins</p>
                  <p className="text-[11px] text-slate-500">Average ETA</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <Star className="w-4 h-4 fill-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">4.8 / 5.0</p>
                  <p className="text-[11px] text-slate-500">Foodie Rating</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">100% Sealed</p>
                  <p className="text-[11px] text-slate-500">Thermal Fresh</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Floating Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border-4 border-white aspect-[4/3] group">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                  alt="Delicious gourmet dishes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-300 mb-1">
                    <ChefHat className="w-4 h-4" /> Handcrafted by Top Chefs
                  </div>
                  <h3 className="text-lg font-bold">Bella Napoli & SmashCraft</h3>
                  <p className="text-xs text-slate-200">Fresh artisanal favorites ready in under 25 mins</p>
                </div>
              </div>

              {/* Floating Badge 1: Delivery Tracker Status */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900">Live GPS Order Tracking</p>
                  <p className="text-[10px] text-slate-500">Real-time driver updates on map</p>
                </div>
              </div>

              {/* Floating Badge 2: Reward points */}
              <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-lg border border-slate-100 flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <div>
                  <p className="text-xs font-bold text-slate-900">10 pts / $1</p>
                  <p className="text-[10px] text-amber-600 font-semibold">ZestRewards Included</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
