import React, { useState } from 'react';
import { Plus, Minus, Flame, Star, Clock, Heart, SlidersHorizontal } from 'lucide-react';
import { MenuItem } from '../types';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { ItemCustomizeModal } from './ItemCustomizeModal';

interface FoodCardProps {
  item: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    formatPrice, 
    toggleFavorite, 
    isFavorite 
  } = useFoodDelivery();

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Check if this item is in the cart
  const cartItemsForThisFood = cart.filter(ci => ci.menuItem.id === item.id);
  const totalQuantityInCart = cartItemsForThisFood.reduce((sum, ci) => sum + ci.quantity, 0);

  const hasCustomizations = 
    Boolean(item.availableCustomizations?.sizes?.length) || 
    Boolean(item.availableCustomizations?.addons?.length);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasCustomizations) {
      setIsCustomizeOpen(true);
    } else {
      addToCart(item);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemsForThisFood.length > 0) {
      updateQuantity(cartItemsForThisFood[0].id, 1);
    } else {
      addToCart(item);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemsForThisFood.length > 0) {
      updateQuantity(cartItemsForThisFood[0].id, -1);
    }
  };

  const isFav = isFavorite(item.id);
  const optimizedImage = item.image
    .replace(/([?&])w=\d+/, '$1w=640')
    .replace(/([?&])q=\d+/, '$1q=70');

  return (
    <>
      <div 
        id={`food-card-${item.id}`}
        className="group bg-white rounded-2xl border border-slate-200/80 hover:border-orange-300 shadow-xs hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-200 overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={() => hasCustomizations && setIsCustomizeOpen(true)}
      >
        {/* Top Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={optimizedImage}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          {/* Badges on Top-Left */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center">
            {item.isVegetarian && (
              <div 
                className="w-5 h-5 bg-white rounded-md border-2 border-emerald-600 flex items-center justify-center shadow-xs" 
                title="100% Vegetarian"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
              </div>
            )}
            {item.isSpicy && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center gap-0.5 shadow-xs">
                <Flame className="w-3 h-3 fill-white" /> Spicy
              </span>
            )}
            {item.isPopular && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center gap-0.5 shadow-xs">
                <Star className="w-3 h-3 fill-white" /> Bestseller
              </span>
            )}
          </div>

          {/* Favorite Heart Button Top-Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isFav 
                ? 'bg-white text-rose-500 shadow-md scale-110' 
                : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Prep time chip bottom-left */}
          {item.preparationTimeMinutes && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{item.preparationTimeMinutes}m prep</span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-orange-600 transition-colors">
                {item.name}
              </h3>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base whitespace-nowrap text-right text-orange-600">
                {formatPrice(item.price)}
              </span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {item.description}
            </p>

            {item.calories && (
              <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                {item.calories} kcal
              </p>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {item.rating && (
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{item.rating.toFixed(1)}</span>
                {item.reviewsCount && (
                  <span className="text-slate-400 font-normal text-[11px]">({item.reviewsCount})</span>
                )}
              </div>
            )}

            {/* Stepper or Add Button */}
            {totalQuantityInCart > 0 && !hasCustomizations ? (
              <div 
                className="flex items-center bg-orange-50 border border-orange-200 rounded-full px-1.5 py-0.5 gap-2 shadow-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleDecrement}
                  className="w-6 h-6 rounded-full bg-white hover:bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-extrabold text-orange-800 min-w-4 text-center">
                  {totalQuantityInCart}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-6 h-6 rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center text-white font-bold text-xs transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs transition-all duration-150 shadow-xs active:scale-95 ml-auto"
              >
                {hasCustomizations ? (
                  <>
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>Customize</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Item Customization Modal */}
      {isCustomizeOpen && (
        <ItemCustomizeModal
          item={item}
          onClose={() => setIsCustomizeOpen(false)}
        />
      )}
    </>
  );
};
