import React from 'react';
import { Home, Compass, ShoppingBag, Heart, Bike, Store } from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';

interface MobileNavProps {
  onOpenCart?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenCart }) => {
  const { 
    activeTab, 
    setActiveTab, 
    cartCount, 
    setIsCartOpen, 
    activeOrder,
    favorites 
  } = useFoodDelivery();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-4 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-3 text-[11px] font-semibold transition-colors ${
            activeTab === 'home' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Explore</span>
        </button>

        {/* Restaurants */}
        <button
          onClick={() => setActiveTab('restaurants')}
          className={`flex flex-col items-center py-1 px-3 text-[11px] font-semibold transition-colors ${
            activeTab === 'restaurants' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Restaurants</span>
        </button>

        {/* Live Tracking (if order exists) or Partner Hub */}
        {activeOrder ? (
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex flex-col items-center py-1 px-3 text-[11px] font-semibold transition-colors relative ${
              activeTab === 'tracking' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="relative">
              <Bike className="w-5 h-5 mb-0.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <span>Tracking</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('partner_dashboard')}
            className={`flex flex-col items-center py-1 px-3 text-[11px] font-semibold transition-colors ${
              activeTab === 'partner_dashboard' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Store className="w-5 h-5 mb-0.5" />
            <span>Partner</span>
          </button>
        )}

        {/* Favorites */}
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center py-1 px-3 text-[11px] font-semibold relative ${
            activeTab === 'favorites' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {(favorites || []).length > 0 && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </div>
          <span>Wishlist</span>
        </button>

        {/* Bag */}
        <button
          onClick={() => {
            if (typeof onOpenCart === 'function') {
              onOpenCart();
            } else {
              setIsCartOpen(true);
            }
          }}
          className="flex flex-col items-center py-1 px-3 text-[11px] font-semibold text-orange-600 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span>Bag</span>
        </button>

      </div>
    </div>
  );
};
