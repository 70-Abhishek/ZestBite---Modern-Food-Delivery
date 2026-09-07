import React, { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Plus, 
  Eye, 
  BarChart3, 
  Users, 
  ChefHat, 
  Bike,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { RESTAURANTS } from '../data/mockData';
import { OrderStatus } from '../types';

export const PartnerDashboard: React.FC = () => {
  const { orders, updateOrderStatus, formatPrice, addNotification } = useFoodDelivery();

  const [isOnline, setIsOnline] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'orders' | 'analytics' | 'menu'>('orders');
  const [filterStage, setFilterStage] = useState<'all' | 'pending' | 'kitchen' | 'ready'>('all');
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);

  // New dish form state
  const [newDishName, setNewDishName] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('14.99');
  const [newDishCategory, setNewDishCategory] = useState('Pizza');

  const partnerRestaurant = RESTAURANTS[0]; // Bella Napoli

  // Filter orders relevant to this restaurant
  const partnerOrders = orders;

  const handleStatusAdvance = (orderId: string, nextStatus: OrderStatus, actionTitle: string) => {
    updateOrderStatus(orderId, nextStatus);
    addNotification('Kitchen Update 👨‍🍳', `${actionTitle} for order #${orderId.replace('ord-', '')}`, 'order');
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;
    setIsAddDishOpen(false);
    setNewDishName('');
    addNotification('Dish Published! 🍕', `${newDishName} is now live on your digital menu.`, 'info');
  };

  // Mock analytics data for sales trend
  const weeklySales = [
    { day: 'Mon', revenue: 920, orders: 34 },
    { day: 'Tue', revenue: 1040, orders: 39 },
    { day: 'Wed', revenue: 1180, orders: 42 },
    { day: 'Thu', revenue: 1310, orders: 48 },
    { day: 'Fri', revenue: 2150, orders: 76 },
    { day: 'Sat', revenue: 2480, orders: 89 },
    { day: 'Sun', revenue: 1980, orders: 71 },
  ];

  const maxRevenue = Math.max(...weeklySales.map(d => d.revenue));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header bar */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 overflow-hidden shrink-0 shadow-md">
            <img src={partnerRestaurant.logo} alt="" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{partnerRestaurant.name}</h1>
              <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Partner Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Store ID: #REST-NAPOLI • Kitchen Terminal v3.4
            </p>
          </div>
        </div>

        {/* Online Status Toggle & Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
              isOnline 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            <span>{isOnline ? 'Accepting Live Orders' : 'Store Paused'}</span>
          </button>

          <button
            onClick={() => setIsAddDishOpen(true)}
            className="px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-orange-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Dish</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">$1,482.50</p>
          <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs last week
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Live Orders</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">46 tickets</p>
          <p className="text-[11px] font-semibold text-slate-500 mt-1">
            4 in kitchen queue right now
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Prep Speed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">13.8 mins</p>
          <p className="text-[11px] font-semibold text-emerald-600 mt-1">
            Faster than 92% of eateries
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Quality Score</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">4.92 / 5.0</p>
          <p className="text-[11px] font-semibold text-slate-500 mt-1">
            Based on 842 food lover ratings
          </p>
        </div>

      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setSelectedTab('orders')}
          className={`pb-3 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-colors ${
            selectedTab === 'orders'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ChefHat className="w-4 h-4" />
          <span>Incoming Orders Terminal ({partnerOrders.length})</span>
        </button>

        <button
          onClick={() => setSelectedTab('analytics')}
          className={`pb-3 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-colors ${
            selectedTab === 'analytics'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Sales & Demand Analytics</span>
        </button>
      </div>

      {/* Content Section */}
      {selectedTab === 'orders' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Real-Time Kitchen Orders</h2>
            <div className="flex gap-2">
              {(['all', 'pending', 'kitchen', 'ready'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilterStage(f)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize transition-colors ${
                    filterStage === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(partnerOrders || []).map(ord => (
              <div 
                key={ord.id} 
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-slate-900">{ord.orderNumber}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-orange-100 text-orange-800">
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Customer: <strong>{ord.customer?.name || 'Guest'}</strong> • {ord.customer?.phone || ''}
                      </p>
                    </div>
                    <span className="text-base font-black text-slate-900">
                      {formatPrice(ord.total)}
                    </span>
                  </div>

                  {/* Items list */}
                  <div className="py-3 space-y-1.5 text-xs text-slate-700">
                    {(ord.items || []).map(item => (
                      <div key={item.id} className="flex justify-between font-medium">
                        <span>{item.quantity}x {item.menuItem?.name || 'Item'}</span>
                        <span className="text-slate-400">{formatPrice(item.itemTotalPrice)}</span>
                      </div>
                    ))}
                    {ord.customer.deliveryNotes && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-2 font-semibold">
                        Kitchen Note: "{ord.customer.deliveryNotes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Advancement Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    Target ETA: <strong>{ord.estimatedDeliveryTime}</strong>
                  </span>

                  <div className="flex gap-2">
                    {ord.status === 'placed' && (
                      <button
                        onClick={() => handleStatusAdvance(ord.id, 'accepted', 'Accepted')}
                        className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
                      >
                        Accept Order Ticket
                      </button>
                    )}
                    {ord.status === 'accepted' && (
                      <button
                        onClick={() => handleStatusAdvance(ord.id, 'preparing', 'Started Cooking')}
                        className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs"
                      >
                        Start Cooking
                      </button>
                    )}
                    {ord.status === 'preparing' && (
                      <button
                        onClick={() => handleStatusAdvance(ord.id, 'ready_for_pickup', 'Packed in Thermal Bag')}
                        className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                      >
                        Mark Ready for Courier
                      </button>
                    )}
                    {ord.status === 'ready_for_pickup' && (
                      <button
                        onClick={() => handleStatusAdvance(ord.id, 'on_the_way', 'Handed to Courier')}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                      >
                        Hand to Courier
                      </button>
                    )}
                    {ord.status === 'on_the_way' && (
                      <button
                        onClick={() => handleStatusAdvance(ord.id, 'delivered', 'Order Delivered')}
                        className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs"
                      >
                        Confirm Delivery
                      </button>
                    )}
                    {ord.status === 'delivered' && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Analytics Tool View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sales performance chart (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">7-Day Sales Trend</h3>
                  <p className="text-xs text-slate-400">Total weekly revenue: $10,060</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  +24.2% Growth
                </span>
              </div>

              {/* Bar Chart Visualizer */}
              <div className="pt-8 pb-2 flex items-end justify-between gap-3 h-52">
                {weeklySales.map((item) => {
                  const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                  return (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${item.revenue}
                      </div>
                      <div 
                        className="w-full bg-slate-100 group-hover:bg-orange-500 rounded-t-xl transition-all duration-300 relative overflow-hidden"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-600 to-amber-400 opacity-80 group-hover:opacity-100" />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard dishes (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900">Top Performing Dishes</h3>
              <div className="space-y-3">
                {[
                  { name: 'Margherita Burrata D.O.P.', sales: 312, rev: '$5,300', tag: 'Pizza' },
                  { name: 'The Signature Double Smash Burger', sales: 284, rev: '$3,973', tag: 'Burgers' },
                  { name: 'Truffle Mushroom Pizza', sales: 198, rev: '$3,663', tag: 'Pizza' },
                  { name: 'Flamed Salmon Dragon Roll', sales: 164, rev: '$2,870', tag: 'Sushi' },
                ].map((dish, i) => (
                  <div key={dish.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-white font-black text-slate-700 flex items-center justify-center shadow-xs">
                        #{i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900 truncate max-w-[170px]">{dish.name}</p>
                        <p className="text-[10px] text-slate-400">{dish.sales} orders placed</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-orange-600">{dish.rev}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add New Dish Modal */}
      {isAddDishOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <form 
            onSubmit={handleCreateDish}
            className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">Add New Seasonal Dish</h3>
              <button type="button" onClick={() => setIsAddDishOpen(false)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dish Name</label>
              <input
                type="text"
                value={newDishName}
                onChange={(e) => setNewDishName(e.target.value)}
                placeholder="e.g. Gorgonzola & Fig Flatbread"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Price ($ USD)</label>
                <input
                  type="text"
                  value={newDishPrice}
                  onChange={(e) => setNewDishPrice(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newDishCategory}
                  onChange={(e) => setNewDishCategory(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Pizza">Pizza</option>
                  <option value="Burgers">Burgers</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Healthy Meals">Healthy Meals</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Publish to Menu
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
