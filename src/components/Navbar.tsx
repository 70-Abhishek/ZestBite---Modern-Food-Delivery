import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Heart, 
  Bell, 
  User, 
  Store, 
  Award, 
  ChevronDown, 
  X, 
  Compass, 
  UtensilsCrossed, 
  Flame,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { CURRENCIES } from '../data/mockData';
import { CurrencyCode } from '../types';

interface NavbarProps {
  onOpenCart?: () => void;
  onOpenCheckout?: () => void;
  onOpenLoyalty?: () => void;
  onOpenHistory?: () => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenCheckout,
  onOpenLoyalty,
  onOpenHistory,
  onOpenProfile,
}) => {
  const {
    cartCount,
    setIsCartOpen,
    total,
    formatPrice,
    currency,
    setCurrency,
    activeTab,
    setActiveTab,
    deliveryLocation,
    setDeliveryLocation,
    notifications,
    unreadNotificationCount,
    markNotificationsAsRead,
    favorites,
    userProfile,
    searchQuery,
    setSearchQuery,
    activeOrder,
  } = useFoodDelivery();

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(deliveryLocation);

  const popularLocations = [
    '100 Feet Road, Indiranagar, Bengaluru',
    '5th Block, Koramangala, Bengaluru',
    'Connaught Place, New Delhi',
    'Bandra West, Mumbai',
    'Cyber Hub, DLF Phase 2, Gurugram',
    'Jubilee Hills, Hyderabad',
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => { setActiveTab('home'); }}
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
                <Flame className="w-6 h-6 fill-white stroke-none" />
              </div>
              <div className="text-left">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1 font-sans">
                  Zest<span className="text-orange-600">Bite</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                  Fresh • Fast • Delivered
                </span>
              </div>
            </button>

            {/* Location Selector */}
            <div className="relative hidden md:block">
              <button
                id="location-picker-btn"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full text-xs font-medium text-slate-700 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span className="max-w-[150px] truncate text-slate-900 font-semibold">{deliveryLocation.split(',')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Select Delivery Location</span>
                    <button onClick={() => setIsLocationDropdownOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {popularLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setDeliveryLocation(loc);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center gap-2 transition-colors ${
                          deliveryLocation === loc ? 'bg-orange-50 text-orange-700 font-semibold' : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{loc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <input
                      type="text"
                      placeholder="Type street or apartment..."
                      value={tempLocation}
                      onChange={(e) => setTempLocation(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && tempLocation.trim()) {
                          setDeliveryLocation(tempLocation);
                          setIsLocationDropdownOpen(false);
                        }
                      }}
                      className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Search Bar (Center, Clean Google Style) */}
          <div className="flex-1 max-w-md mx-2 hidden sm:block">
            <div className="relative">
              <input
                id="main-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food, cuisines, or restaurants..."
                className="w-full bg-slate-50/80 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-10 pr-9 py-2.5 rounded-full border border-slate-200/90 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">

            {/* Navigation Tabs (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                id="nav-explore-btn"
                onClick={() => setActiveTab('home')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'home' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Explore
              </button>
              <button
                id="nav-restaurants-btn"
                onClick={() => setActiveTab('restaurants')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'restaurants' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Restaurants
              </button>
              {activeOrder && (
                <button
                  id="nav-tracking-btn"
                  onClick={() => setActiveTab('tracking')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors relative ${
                    activeTab === 'tracking' ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Order
                </button>
              )}
              <button
                id="nav-partner-btn"
                onClick={() => setActiveTab('partner_dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  activeTab === 'partner_dashboard' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                Partner Hub
              </button>
            </nav>

            {/* Currency Selector */}
            <div className="relative">
              <select
                id="currency-selector"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                id="notifications-btn"
                onClick={() => {
                  setIsNotifDropdownOpen(!isNotifDropdownOpen);
                  if (!isNotifDropdownOpen) markNotificationsAsRead();
                }}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-bold text-slate-900">Alerts & Updates</span>
                    </div>
                    <button 
                      onClick={() => setIsNotifDropdownOpen(false)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Close
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-2">
                    {(notifications || []).map((n) => (
                      <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Favorites Icon */}
            <button
              id="favorites-btn"
              onClick={() => setActiveTab('favorites')}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors hidden sm:flex"
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
              {(favorites || []).length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Profile Avatar with Dropdown */}
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-1.5 p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/30"
                />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{userProfile.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{userProfile.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onOpenProfile?.();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Account Settings
                    </button>
                    <button
                      onClick={() => {
                        if (typeof onOpenHistory === 'function') {
                          onOpenHistory();
                        } else {
                          setActiveTab('orders');
                        }
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5 text-slate-400" />
                      Order History
                    </button>
                    <button
                      onClick={() => {
                        onOpenLoyalty?.();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      ZestRewards Club
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('partner_dashboard');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Store className="w-3.5 h-3.5 text-orange-500" />
                      Partner Merchant Portal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button (Always visible, prominent, animated) */}
            <button
              id="open-cart-drawer-btn"
              onClick={() => {
                if (typeof onOpenCart === 'function') {
                  onOpenCart();
                } else {
                  setIsCartOpen(true);
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-white text-orange-600 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartCount === 0 ? 'Bag' : formatPrice(total)}
              </span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
