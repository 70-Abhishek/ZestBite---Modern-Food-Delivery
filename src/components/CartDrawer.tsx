import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  Clock, 
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { PROMO_CODES } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout,
}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    tip,
    setTip,
    discount,
    total,
    appliedPromo,
    applyPromo,
    removePromo,
    formatPrice,
    currentRestaurant,
    loyalty
  } = useFoodDelivery();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isConfirmClear, setIsConfirmClear] = useState(false);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  const freeDeliveryThreshold = 25.0;
  const freeDeliveryDiff = Math.max(0, freeDeliveryThreshold - subtotal);
  const earnedZestPoints = Math.round(subtotal * 10);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Your Craving Bag</h2>
                {currentRestaurant && (
                  <p className="text-xs text-slate-500 truncate max-w-[200px]">
                    From {currentRestaurant.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={() => setIsConfirmClear(true)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Clear Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Confirm Clear Alert Dialog */}
          {isConfirmClear && (
            <div className="bg-rose-50 border-b border-rose-100 p-3 flex items-center justify-between text-xs text-rose-900 animate-in fade-in">
              <span>Are you sure you want to empty the bag?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { clearCart(); setIsConfirmClear(false); }}
                  className="font-bold text-rose-700 hover:underline"
                >
                  Yes, Clear
                </button>
                <button
                  onClick={() => setIsConfirmClear(false)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400 mb-4 shadow-inner">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Your bag is hungry</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Explore delicious artisan pizzas, juicy smashed burgers, and fresh bowls to start your order.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                Browse Delicious Meals
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Free delivery progress bar */}
              <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-3">
                <div className="flex items-center justify-between text-xs font-bold text-orange-950 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    {freeDeliveryDiff > 0 
                      ? `Add ${formatPrice(freeDeliveryDiff)} more for Free Delivery`
                      : 'You unlocked Free Delivery! 🎉'
                    }
                  </span>
                  <span>{Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100))}%</span>
                </div>
                <div className="w-full h-1.5 bg-orange-200/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex gap-3 items-center group"
                  >
                    <img 
                      src={item.menuItem.image} 
                      alt="" 
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.menuItem.name}
                        </h4>
                        <span className="text-xs font-black text-slate-900">
                          {formatPrice(item.itemTotalPrice)}
                        </span>
                      </div>

                      {/* Customization labels */}
                      {item.selectedOptions && (
                        <div className="text-[10px] text-slate-500 mt-0.5 space-y-0.5">
                          {item.selectedOptions.size && (
                            <p className="truncate">• {item.selectedOptions.size}</p>
                          )}
                          {item.selectedOptions.addons && item.selectedOptions.addons.length > 0 && (
                            <p className="truncate">• {item.selectedOptions.addons.join(', ')}</p>
                          )}
                          {item.selectedOptions.instructions && (
                            <p className="italic text-slate-400 truncate">"{item.selectedOptions.instructions}"</p>
                          )}
                        </div>
                      )}

                      {/* Stepper & remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white border border-slate-200 rounded-full px-1 py-0.5 gap-2 shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-extrabold text-slate-900 min-w-3 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[11px] font-semibold text-rose-600 hover:text-rose-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Entry & Suggestions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-orange-600" />
                    Coupon or Voucher
                  </span>
                  {appliedPromo && (
                    <button
                      onClick={removePromo}
                      className="text-[11px] font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {appliedPromo ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-bold">{appliedPromo.code} Applied</p>
                        <p className="text-[10px] text-emerald-700">{appliedPromo.description}</p>
                      </div>
                    </div>
                    <span className="font-black text-emerald-700">-{formatPrice(discount)}</span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError(''); }}
                        placeholder="Enter code e.g. ZEST30"
                        className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 uppercase font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {promoError}
                      </p>
                    )}
                  </form>
                )}

                {/* Quick available codes */}
                {!appliedPromo && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {PROMO_CODES.slice(0, 2).map(p => (
                      <button
                        key={p.code}
                        type="button"
                        onClick={() => applyPromo(p.code)}
                        className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 border border-slate-200 px-2 py-1 rounded-md transition-colors"
                      >
                        {p.code} ({p.discountPercent}% off)
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Courier Tip Selector */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Support your courier tip</span>
                  <span className="text-orange-600 font-extrabold">{formatPrice(tip)}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1.50, 2.50, 3.50, 5.00].map(val => (
                    <button
                      key={val}
                      onClick={() => setTip(val)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        tip === val
                          ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {formatPrice(val)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill Details Breakdown */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <h4 className="font-bold text-slate-800 mb-2">Order Breakdown</h4>
                
                <div className="flex justify-between text-slate-600">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Estimated Taxes & Fees</span>
                  <span className="font-semibold text-slate-900">{formatPrice(tax)}</span>
                </div>

                {tip > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Courier Gratuity</span>
                    <span className="font-semibold text-slate-900">{formatPrice(tip)}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Voucher Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-orange-600 text-base">{formatPrice(total)}</span>
                </div>

                {/* Loyalty points earned */}
                <div className="mt-2 pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[11px] text-amber-700 font-bold bg-amber-50/70 p-2 rounded-xl">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    ZestPoints earned:
                  </span>
                  <span>+{earnedZestPoints} pts</span>
                </div>
              </div>

            </div>
          )}

          {/* Drawer Footer CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3">
              <button
                id="checkout-cta-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-600/25 active:scale-98 transition-all flex items-center justify-between group"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-2">
                  <span>{formatPrice(total)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <p className="text-center text-[11px] text-slate-400">
                🔒 256-Bit Encrypted & Contactless Delivery
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
