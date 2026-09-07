import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame, Clock } from 'lucide-react';
import { MenuItem, CartItemOption } from '../types';
import { useFoodDelivery } from '../context/FoodDeliveryContext';

interface ItemCustomizeModalProps {
  item: MenuItem;
  onClose: () => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({ item, onClose }) => {
  const { addToCart, formatPrice } = useFoodDelivery();

  const defaultSize = item.availableCustomizations?.sizes?.[0]?.name;
  const [selectedSize, setSelectedSize] = useState<string | undefined>(defaultSize);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Calculate calculated single unit price with selected options
  let extraCost = 0;
  if (selectedSize && item.availableCustomizations?.sizes) {
    const matched = item.availableCustomizations.sizes.find(s => s.name === selectedSize);
    if (matched) extraCost += matched.extraPrice;
  }
  selectedAddons.forEach(addonName => {
    const matched = item.availableCustomizations?.addons?.find(a => a.name === addonName);
    if (matched) extraCost += matched.price;
  });

  const singleUnitPrice = item.price + extraCost;
  const totalCost = singleUnitPrice * quantity;

  const toggleAddon = (addonName: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonName) 
        ? prev.filter(a => a !== addonName) 
        : [...prev, addonName]
    );
  };

  const handleConfirm = () => {
    const options: CartItemOption = {
      size: selectedSize,
      addons: selectedAddons,
      instructions: instructions.trim() || undefined,
    };
    addToCart(item, options, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Photo */}
        <div className="relative h-48 sm:h-56 bg-slate-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>Ready in {item.preparationTimeMinutes || 15} mins</span>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">{item.name}</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
              </div>
              <span className="text-lg font-black text-orange-600 shrink-0">
                {formatPrice(item.price)}
              </span>
            </div>
            {item.calories && (
              <p className="text-xs font-semibold text-slate-400 mt-1">{item.calories} kcal</p>
            )}
          </div>

          {/* Size Choices */}
          {item.availableCustomizations?.sizes && item.availableCustomizations.sizes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Choose Portion / Size
                </h3>
                <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                  Required
                </span>
              </div>
              <div className="space-y-1.5">
                {(item.availableCustomizations?.sizes || []).map((s) => (
                  <label
                    key={s.name}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                      selectedSize === s.name
                        ? 'border-orange-500 bg-orange-50/50 text-slate-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="item-size"
                        checked={selectedSize === s.name}
                        onChange={() => setSelectedSize(s.name)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span>{s.name}</span>
                    </div>
                    {s.extraPrice > 0 ? (
                      <span className="text-xs font-bold text-slate-500">
                        +{formatPrice(s.extraPrice)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Included</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons / Extras */}
          {item.availableCustomizations?.addons && item.availableCustomizations.addons.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Select Add-ons & Extras
                </h3>
                <span className="text-[11px] font-medium text-slate-400">Optional</span>
              </div>
              <div className="space-y-1.5">
                {(item.availableCustomizations?.addons || []).map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <label
                      key={addon.name}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-orange-500 bg-orange-50/40 text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.name)}
                          className="rounded text-orange-600 focus:ring-orange-500"
                        />
                        <span>{addon.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        +{formatPrice(addon.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Cooking Instructions */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Special Cooking Instructions
            </h3>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra dressing on side, no onions, extra crispy crust..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Footer with Quantity and Add Button */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center bg-white border border-slate-200 rounded-full p-1 gap-3 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-black text-slate-900 min-w-4 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-6 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/20 active:scale-98 transition-all flex items-center justify-between"
          >
            <span>Add to Bag</span>
            <span>{formatPrice(totalCost)}</span>
          </button>

        </div>
      </div>
    </div>
  );
};
