import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Lock,
  User,
  Phone,
  Mail,
  Home,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { OrderCustomerInfo } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    subtotal,
    deliveryFee,
    tax,
    tip,
    discount,
    total,
    formatPrice,
    placeOrder,
    userProfile,
    deliveryLocation,
    currentRestaurant,
  } = useFoodDelivery();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(deliveryLocation);
  const [apartment, setApartment] = useState('Apt 4B');
  const [deliveryNotes, setDeliveryNotes] = useState('Please leave at the front door and ring buzzer.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'cash_on_delivery'>('card');

  // Card details
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Form error states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    if (!address.trim()) errs.address = 'Delivery address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const customer: OrderCustomerInfo = {
        name,
        email,
        phone,
        address: `${address}${apartment ? `, ${apartment}` : ''}`,
        deliveryNotes,
        paymentMethod,
      };

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EA580C', '#F97316', '#10B981', '#3B82F6', '#F59E0B']
        });
      } catch (err) {
        // Fallback gracefully
      }

      placeOrder(customer);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Secure Food Ordering Checkout</h2>
              <p className="text-xs text-slate-500">256-bit SSL encrypted • Contactless delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handlePlaceOrder} className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          
          {/* Section 1: Customer Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-orange-600" />
              1. Customer Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                {errors.name && <p className="text-[10px] text-rose-600 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-rose-600 mt-0.5">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address for Receipt</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.j@example.com"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                {errors.email && <p className="text-[10px] text-rose-600 mt-0.5">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Location & Instructions */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                2. Delivery Destination
              </h3>
              
              {/* Presets */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => { setAddress('100 Feet Road, Indiranagar, Bengaluru'); setApartment('Flat 402'); }}
                  className="text-[10px] font-bold text-slate-600 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-1"
                >
                  <Home className="w-3 h-3" /> Home
                </button>
                <button
                  type="button"
                  onClick={() => { setAddress('5th Block, Koramangala, Bengaluru'); setApartment('Tower B, 4th Floor'); }}
                  className="text-[10px] font-bold text-slate-600 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-1"
                >
                  <Building className="w-3.5 h-3.5" /> Office
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street name & number"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
                {errors.address && <p className="text-[10px] text-rose-600 mt-0.5">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Apt / Suite / Floor</label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="e.g. Apt 4B"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Delivery Drop-off Notes</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Gate code, drop at door, call when arrived..."
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-orange-600" />
              3. Payment Gateway & Security
            </h3>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <label
                className={`p-3 rounded-2xl border cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-orange-500 bg-orange-50/40 text-orange-900 ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="sr-only"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <CreditCard className="w-5 h-5 mb-1 text-orange-600" />
                <span className="text-xs font-bold">Credit Card</span>
                <span className="text-[10px] text-slate-400">Visa, MC, Amex</span>
              </label>

              <label
                className={`p-3 rounded-2xl border cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'border-orange-500 bg-orange-50/40 text-orange-900 ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="sr-only"
                  checked={paymentMethod === 'apple_pay'}
                  onChange={() => setPaymentMethod('apple_pay')}
                />
                <Smartphone className="w-5 h-5 mb-1 text-slate-900" />
                <span className="text-xs font-bold">Apple / Google Pay</span>
                <span className="text-[10px] text-slate-400">One-tap instant</span>
              </label>

              <label
                className={`p-3 rounded-2xl border cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                  paymentMethod === 'cash_on_delivery'
                    ? 'border-orange-500 bg-orange-50/40 text-orange-900 ring-2 ring-orange-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="sr-only"
                  checked={paymentMethod === 'cash_on_delivery'}
                  onChange={() => setPaymentMethod('cash_on_delivery')}
                />
                <Banknote className="w-5 h-5 mb-1 text-emerald-600" />
                <span className="text-xs font-bold">Cash on Delivery</span>
                <span className="text-[10px] text-slate-400">Pay at doorstep</span>
              </label>
            </div>

            {/* If Credit Card, display simulated card fields */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Card Credentials</span>
                  <div className="flex gap-1 text-[10px] font-bold text-slate-400">
                    <span>VISA</span> • <span>MASTERCARD</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      value={cardCvc}
                      maxLength={4}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Review Order Summary Box */}
          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200/60 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 pb-2 border-b border-orange-200/50">
              <span>{cart.reduce((s, i) => s + i.quantity, 0)} Items from {currentRestaurant?.name || 'Restaurant'}</span>
              <span className="text-orange-700">{formatPrice(total)}</span>
            </div>

            <div className="space-y-1 text-slate-600 text-[11px] max-h-24 overflow-y-auto">
              {cart.map(c => (
                <div key={c.id} className="flex justify-between">
                  <span>{c.quantity}x {c.menuItem.name}</span>
                  <span className="font-semibold">{formatPrice(c.itemTotalPrice)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-orange-200/40 flex justify-between text-xs font-bold text-slate-800">
              <span>Final Total (incl. delivery, fees, tip & promo)</span>
              <span className="text-base text-orange-600">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-600/25 active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Confirming Order with Kitchen...
              </span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Place Food Order • {formatPrice(total)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-slate-400">
            By placing this order you agree to ZestBite delivery terms and contactless drop-off protocol.
          </p>

        </form>

      </div>
    </div>
  );
};
