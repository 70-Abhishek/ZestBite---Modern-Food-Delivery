import React from 'react';
import { 
  Clock, 
  ShoppingBag, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw, 
  Star, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { Order } from '../types';

export const OrdersHistory: React.FC = () => {
  const { 
    orders, 
    formatPrice, 
    setActiveTab, 
    setActiveOrder, 
    reorderItems, 
    addNotification 
  } = useFoodDelivery();

  const handleTrack = (order: Order) => {
    setActiveOrder(order);
    setActiveTab('tracking');
  };

  const handleReorder = (order: Order) => {
    reorderItems(order);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>My Activity</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Order History
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Track active orders, re-order your favorite dishes, or download receipts.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-500">
            Browse through top-rated local eateries and savor your first craving.
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="px-6 py-2.5 rounded-full bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors shadow-md"
          >
            Explore Restaurants
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {(orders || []).map((order) => {
            const isOngoing = order.status !== 'delivered';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img 
                      src={order.restaurant?.logo || ''} 
                      alt="" 
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200" 
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {order.restaurant?.name || 'Restaurant'}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Order #{order.orderNumber} • {order.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-start sm:self-auto">
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isOngoing 
                          ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-base font-black text-slate-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {(order.items || []).map((item) => (
                    <div 
                      key={item.id} 
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2"
                    >
                      <span className="font-extrabold text-orange-600">{item.quantity}x</span>
                      <span className="font-medium text-slate-700">{item.menuItem?.name || 'Dish'}</span>
                    </div>
                  ))}
                </div>

                {/* Footer action buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[200px]">{order.customer.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isOngoing ? (
                      <button
                        onClick={() => handleTrack(order)}
                        className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-600/20 transition-all"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Track Live Route</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleTrack(order)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <span>View Details</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Dishes</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
