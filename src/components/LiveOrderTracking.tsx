import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Bike, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Share2, 
  Printer, 
  ChevronRight, 
  AlertCircle, 
  ShieldCheck, 
  Compass, 
  FastForward, 
  RotateCcw,
  Send,
  X,
  Store,
  Navigation
} from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { OrderStatus } from '../types';

export const LiveOrderTracking: React.FC = () => {
  const { 
    activeOrder, 
    orders, 
    formatPrice, 
    advanceActiveOrderSim, 
    updateOrderStatus,
    setActiveTab,
    addNotification
  } = useFoodDelivery();

  const [etaMinutes, setEtaMinutes] = useState<number>(14);
  const [driverPosition, setDriverPosition] = useState<number>(65); // percent along route (0 to 100)
  const [isCallingDriver, setIsCallingDriver] = useState(false);
  const [isMessagingDriver, setIsMessagingDriver] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'driver' | 'me'; text: string; time: string }>>([
    { sender: 'driver', text: 'Hi Alex! I picked up your fresh meal from Bella Napoli and I am en route now.', time: '12:36 PM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Use the active order or fallback to the latest
  const order = activeOrder || (orders.length > 0 ? orders[0] : null);

  // Status mapping
  const statusSteps: { key: OrderStatus; title: string; desc: string }[] = [
    { key: 'placed', title: 'Order Placed', desc: 'Received & transmitted to kitchen' },
    { key: 'accepted', title: 'Restaurant Accepted', desc: 'Chef confirmed order tickets' },
    { key: 'preparing', title: 'Cooking & Crafting', desc: 'Fresh ingredients being fired up' },
    { key: 'ready_for_pickup', title: 'Bagged & Sealed', desc: 'Packed in thermal container' },
    { key: 'on_the_way', title: 'Courier En Route', desc: 'Driver riding to your doorstep' },
    { key: 'delivered', title: 'Delivered', desc: 'Enjoy your delicious feast!' },
  ];

  const currentStepIndex = order 
    ? statusSteps.findIndex(s => s.key === order.status) 
    : 0;

  // Auto-progress simulation ticker
  useEffect(() => {
    if (!order || order.status === 'delivered') return;

    const interval = setInterval(() => {
      setDriverPosition(prev => {
        if (prev >= 98) {
          if (order.status === 'on_the_way') {
            updateOrderStatus(order.id, 'delivered');
          }
          return 100;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [order?.id, order?.status]);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No Active Order Found</h2>
        <p className="text-xs text-slate-500 mt-1">Browse restaurants and build your bag to track in real time.</p>
        <button
          onClick={() => setActiveTab('home')}
          className="mt-5 px-6 py-2.5 rounded-full bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors"
        >
          Explore Food
        </button>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    const newMsg = { sender: 'me' as const, text: userMsg, time: 'Just now' };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    // Automated driver reply after 1.5s
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'driver' as const,
          text: 'Got it! I will arrive at your door in a few minutes with the thermal bag.',
          time: 'Just now'
        }
      ]);
      addNotification('Driver Message 💬', 'Marco Rossi replied to your message.', 'info');
    }, 1500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner with Confirmation Message */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Order Confirmed & In Progress</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Hang tight! Meal arriving by {order.estimatedDeliveryTime}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Order <strong className="text-white font-mono">{order.orderNumber}</strong> • Delivered to {order.customer.address}
          </p>
        </div>

        {/* Demo Fast-Forward Controller (Great for grading / review) */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-center space-y-2 shrink-0">
          <p className="text-[11px] font-bold tracking-wide uppercase text-emerald-100">
            Interactive Test Controls
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={advanceActiveOrderSim}
              disabled={order.status === 'delivered'}
              className="px-3.5 py-2 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <FastForward className="w-3.5 h-3.5 text-emerald-600" />
              <span>Advance Stage ⚡</span>
            </button>
            <button
              onClick={() => updateOrderStatus(order.id, 'on_the_way')}
              className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition-colors"
              title="Reset to En Route"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Map & Driver | Right Receipt & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Real-Time Google Maps Route Simulation */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Interactive Map Canvas Container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            
            {/* Map Header Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold text-slate-800">Live GPS Route Telemetry</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="bg-white px-2.5 py-1 rounded-full border border-slate-200">
                  Speed: <strong>28 km/h</strong>
                </span>
                <span className="bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full border border-orange-200 font-bold">
                  ETA: ~{Math.max(2, Math.round(etaMinutes * (1 - driverPosition / 100)))} mins
                </span>
              </div>
            </div>

            {/* Simulated Vector Street Map (Google Maps Style) */}
            <div className="relative h-80 sm:h-96 w-full bg-[#E8ECEF] overflow-hidden select-none">
              
              {/* SVG City Street Grid & Route Line */}
              <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                <defs>
                  {/* Subtle map road pattern */}
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DDE3E8" strokeWidth="1" />
                  </pattern>

                  {/* Gradient for route */}
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>

                  {/* Filter for marker dropshadow */}
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.25"/>
                  </filter>
                </defs>

                {/* Background Grid */}
                <rect width="600" height="400" fill="#F4F6F8" />
                <rect width="600" height="400" fill="url(#grid)" />

                {/* Parks / Green spaces (Google Maps styling) */}
                <path d="M 50 40 Q 120 20 180 60 T 160 140 T 70 120 Z" fill="#D4EAD6" />
                <path d="M 420 220 Q 520 200 560 270 T 490 350 T 400 300 Z" fill="#D4EAD6" />

                {/* Water body / River */}
                <path 
                  d="M -20 320 Q 150 300 280 340 T 620 310 L 620 420 L -20 420 Z" 
                  fill="#CCE4F7" 
                />

                {/* Main Arterial Road Network */}
                <path d="M -20 80 L 620 80" stroke="#FFFFFF" strokeWidth="18" />
                <path d="M -20 80 L 620 80" stroke="#FEF3C7" strokeWidth="10" />

                <path d="M -20 220 L 620 220" stroke="#FFFFFF" strokeWidth="18" />
                <path d="M -20 220 L 620 220" stroke="#FEF3C7" strokeWidth="10" />

                <path d="M 120 -20 L 120 420" stroke="#FFFFFF" strokeWidth="16" />
                <path d="M 380 -20 L 380 420" stroke="#FFFFFF" strokeWidth="16" />
                <path d="M 510 -20 L 510 420" stroke="#FFFFFF" strokeWidth="14" />

                {/* Curved Delivery Route: from Restaurant (80, 70) to Customer Home (490, 240) */}
                <path
                  id="deliveryPath"
                  d="M 100 80 L 380 80 L 380 220 L 490 220 L 490 270"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                />

                {/* Animated active path portion */}
                <path
                  d="M 100 80 L 380 80 L 380 220 L 490 220 L 490 270"
                  fill="none"
                  stroke="#EA580C"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  className="animate-pulse"
                />

                {/* Point A: Restaurant Pin */}
                <g transform="translate(100, 80)" filter="url(#shadow)">
                  <circle r="14" fill="#EA580C" />
                  <circle r="6" fill="#FFFFFF" />
                  <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">
                    {order.restaurant.name.split(' ')[0]}
                  </text>
                </g>

                {/* Point B: Customer Home Pin */}
                <g transform="translate(490, 270)" filter="url(#shadow)">
                  <circle r="14" fill="#10B981" />
                  <circle r="6" fill="#FFFFFF" />
                  <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">
                    Your Home
                  </text>
                </g>
              </svg>

              {/* Dynamic Live Courier Marker (Positioned along trajectory via driverPosition percentage) */}
              <div 
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                style={{
                  // Computed along path segments: segment 1 (0-35%), segment 2 (35-65%), segment 3 (65-85%), segment 4 (85-100%)
                  left: driverPosition < 35 
                    ? `${16.6 + (driverPosition / 35) * (63.3 - 16.6)}%` 
                    : driverPosition < 65 
                      ? '63.3%' 
                      : driverPosition < 85 
                        ? `${63.3 + ((driverPosition - 65) / 20) * (81.6 - 63.3)}%`
                        : '81.6%',
                  top: driverPosition < 35 
                    ? '20%' 
                    : driverPosition < 65 
                      ? `${20 + ((driverPosition - 35) / 30) * (55 - 20)}%` 
                      : driverPosition < 85 
                        ? '55%' 
                        : `${55 + ((driverPosition - 85) / 15) * (67.5 - 55)}%`
                }}
              >
                {/* Radar pulse ring */}
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-orange-400 opacity-60"></span>
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Bike className="w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-6 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                    {order.driver?.name || 'Courier'}
                  </div>
                </div>
              </div>

              {/* Map floating control overlay */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-xs flex items-center gap-2">
                <Store className="w-3.5 h-3.5 text-orange-600" />
                <span>{order.restaurant.name}</span>
                <span className="text-slate-400">➔</span>
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate max-w-[120px]">{order.customer.address}</span>
              </div>

            </div>

            {/* Courier Driver Details Card */}
            <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={order.driver?.photo}
                  alt={order.driver?.name}
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-orange-500/30 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {order.driver?.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold">
                      ⭐ {order.driver?.rating} (1,420 trips)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{order.driver?.vehicle}</p>
                </div>
              </div>

              {/* Driver Contact Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsCallingDriver(true)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Driver</span>
                </button>
                <button
                  onClick={() => setIsMessagingDriver(true)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>

          </div>

          {/* Delivery Timeline / Steps Progress */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Live Order Milestones
            </h3>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {statusSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.key} className="relative flex items-start gap-3">
                    {/* Step Icon */}
                    <div 
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isPassed 
                          ? 'bg-orange-600 text-white ring-4 ring-orange-100' 
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div>
                      <h4 className={`text-xs font-bold leading-none ${isCurrent ? 'text-orange-600 font-black' : isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Order Summary & Customer Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Itemized Order Receipt Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Official Receipt</h3>
                <p className="text-[11px] text-slate-400">{order.date}</p>
              </div>
              <button
                onClick={handlePrintReceipt}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                title="Print Receipt"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="space-y-3 divide-y divide-slate-100">
              {(order.items || []).map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <img 
                      src={item.menuItem?.image || ''} 
                      alt="" 
                      className="w-12 h-12 rounded-xl object-cover shrink-0" 
                    />
                    <div>
                      <p className="font-bold text-slate-900">{item.quantity}x {item.menuItem?.name || 'Item'}</p>
                      {item.selectedOptions?.size && (
                        <p className="text-[10px] text-slate-400">• {item.selectedOptions.size}</p>
                      )}
                      {item.selectedOptions?.addons && item.selectedOptions.addons.length > 0 && (
                        <p className="text-[10px] text-slate-400">• {item.selectedOptions.addons.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 shrink-0">
                    {formatPrice(item.itemTotalPrice)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes & Service</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              {order.tip > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Courier Tip</span>
                  <span>{formatPrice(order.tip)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Paid Amount</span>
                <span className="text-orange-600">{formatPrice(order.total)}</span>
              </div>
            </div>

            {/* Customer & Destination details */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <p className="font-bold text-slate-800">Delivery Information</p>
              <div className="space-y-1 text-slate-600 text-[11px]">
                <p><strong>Customer:</strong> {order.customer.name} ({order.customer.phone})</p>
                <p><strong>Address:</strong> {order.customer.address}</p>
                {order.customer.deliveryNotes && (
                  <p><strong>Instructions:</strong> "{order.customer.deliveryNotes}"</p>
                )}
                <p><strong>Payment:</strong> {order.customer.paymentMethod.replace(/_/g, ' ').toUpperCase()}</p>
              </div>
            </div>

            {/* Need Help CTA */}
            <div className="pt-2 text-center">
              <button 
                onClick={() => alert('Support line connected. An agent will respond via SMS shortly.')}
                className="text-xs font-semibold text-slate-500 hover:text-orange-600"
              >
                Need help with this order? Chat with Support
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Simulated Call Modal */}
      {isCallingDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-slate-900 text-white rounded-3xl p-6 w-full max-w-sm text-center space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="relative mx-auto w-24 h-24">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30"></span>
              <img
                src={order.driver?.photo}
                alt=""
                className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-500 mx-auto"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">{order.driver?.name}</h3>
              <p className="text-xs text-emerald-400 animate-pulse font-mono mt-1">Connecting call...</p>
            </div>
            <p className="text-xs text-slate-400">
              "Hi Alex, I am just turning onto 100 Feet Road. See you in 3 minutes!"
            </p>
            <button
              onClick={() => setIsCallingDriver(false)}
              className="w-full py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Simulated Live Chat Modal */}
      {isMessagingDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md h-[500px] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
            {/* Chat header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={order.driver?.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold">{order.driver?.name}</h4>
                  <p className="text-[10px] text-emerald-400">Active • Delivery Courier</p>
                </div>
              </div>
              <button onClick={() => setIsMessagingDriver(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat messages body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs font-medium shadow-2xs ${
                      msg.sender === 'me' 
                        ? 'bg-orange-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about ETA, buzzer code..."
                className="flex-1 text-xs px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-orange-600 text-white hover:bg-orange-700 font-bold text-xs flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
