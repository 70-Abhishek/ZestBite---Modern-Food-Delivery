import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { RESTAURANTS } from '../data/mockData';
import { RestaurantCard } from './RestaurantCard';
import { Restaurant } from '../types';

interface FavoritesViewProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({ onSelectRestaurant }) => {
  const { favorites, setActiveTab } = useFoodDelivery();

  const favoriteRestaurants = RESTAURANTS.filter(r => favorites.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span>Saved Eateries</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Favorite Restaurants
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Quickly re-visit kitchens you love and order your staple treats.
        </p>
      </div>

      {favoriteRestaurants.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Favorites Saved Yet</h3>
          <p className="text-xs text-slate-500">
            Tap the heart icon on any restaurant card to keep track of your go-to places.
          </p>
          <button
            onClick={() => setActiveTab('home')}
            className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-md"
          >
            Explore Restaurants
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRestaurants.map(r => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onSelect={onSelectRestaurant}
            />
          ))}
        </div>
      )}
    </div>
  );
};
