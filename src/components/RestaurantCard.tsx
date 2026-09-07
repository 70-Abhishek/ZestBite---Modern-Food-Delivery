import React from 'react';
import { Star, Clock, Bike, Heart, MapPin, CheckCircle2 } from 'lucide-react';
import { Restaurant } from '../types';
import { useFoodDelivery } from '../context/FoodDeliveryContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelect }) => {
  const { formatPrice, toggleFavorite, isFavorite } = useFoodDelivery();
  const isFav = isFavorite(restaurant.id);

  return (
    <div
      id={`restaurant-card-${restaurant.id}`}
      onClick={() => onSelect(restaurant)}
      className="group bg-white rounded-3xl border border-slate-200/80 hover:border-orange-300 shadow-xs hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(restaurant.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isFav 
              ? 'bg-white text-rose-500 shadow-md scale-110' 
              : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
          }`}
          title="Save Restaurant"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Delivery Time and Free Delivery Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>{restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} min</span>
          </div>

          {restaurant.deliveryFee === 0 ? (
            <div className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold shadow-xs">
              Free Delivery
            </div>
          ) : (
            <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
              {formatPrice(restaurant.deliveryFee)} Delivery
            </div>
          )}
        </div>

        {/* Logo overlay on bottom-right */}
        <div className="absolute -bottom-4 right-4 w-12 h-12 rounded-2xl border-2 border-white overflow-hidden shadow-md bg-white">
          <img src={restaurant.logo} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 pt-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-orange-600 transition-colors">
              {restaurant.name}
            </h3>
          </div>

          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {restaurant.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {(restaurant.cuisine || []).map((c) => (
              <span key={c} className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                {c}
              </span>
            ))}
            <span className="text-[11px] font-semibold text-slate-400">
              • {restaurant.priceRange}
            </span>
          </div>
        </div>

        {/* Bottom ratings & distance row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 font-bold text-slate-900">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-400">({restaurant.totalReviews})</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{restaurant.distanceKm} km away</span>
          </div>
        </div>
      </div>
    </div>
  );
};
