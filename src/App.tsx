import React, { useState } from 'react';
import { FoodDeliveryProvider, useFoodDelivery } from './context/FoodDeliveryContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { HeroBanner } from './components/HeroBanner';
import { CategoryChips } from './components/CategoryChips';
import { FeaturedFoodSection } from './components/FeaturedFoodSection';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveOrderTracking } from './components/LiveOrderTracking';
import { PartnerDashboard } from './components/PartnerDashboard';
import { OrdersHistory } from './components/OrdersHistory';
import { FavoritesView } from './components/FavoritesView';
import { UserProfileModal } from './components/UserProfileModal';
import { LoyaltyRewardsModal } from './components/LoyaltyRewardsModal';
import { NotificationToastContainer } from './components/NotificationToast';
import { Footer } from './components/Footer';
import { Restaurant } from './types';
import { Clock, Sparkles } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isCartOpen, 
    setIsCartOpen,
    activeOrder
  } = useFoodDelivery();

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Notification Announcement Bar if order is active */}
      {activeOrder && activeOrder.status !== 'delivered' && activeTab !== 'tracking' && (
        <div 
          onClick={() => setActiveTab('tracking')}
          className="bg-slate-900 text-white px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-orange-600 transition-colors z-30"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Order #{activeOrder.orderNumber}: {activeOrder.status.replace(/_/g, ' ')} • Arriving in ~14 mins</span>
          <span className="underline ml-1">Track Live Route →</span>
        </div>
      )}

      {/* Primary Navigation Bar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onOpenHistory={() => setActiveTab('orders')}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'home' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <HeroBanner />
            <CategoryChips />
            <FeaturedFoodSection />
            <RestaurantList onSelectRestaurant={(r) => setSelectedRestaurant(r)} />
          </div>
        )}

        {activeTab === 'restaurants' && (
          <div className="animate-in fade-in duration-300">
            <RestaurantList onSelectRestaurant={(r) => setSelectedRestaurant(r)} />
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="animate-in fade-in duration-300">
            <LiveOrderTracking />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-in fade-in duration-300">
            <OrdersHistory />
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="animate-in fade-in duration-300">
            <FavoritesView onSelectRestaurant={(r) => setSelectedRestaurant(r)} />
          </div>
        )}

        {(activeTab === 'partner' || activeTab === 'partner_dashboard') && (
          <div className="animate-in fade-in duration-300">
            <PartnerDashboard />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Navigation Bottom Bar */}
      <MobileNav onOpenCart={() => setIsCartOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Loyalty Rewards Modal */}
      <LoyaltyRewardsModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
      />

      {/* Global Notification Toasts */}
      <NotificationToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <FoodDeliveryProvider>
      <MainAppContent />
    </FoodDeliveryProvider>
  );
}
