import React, { useState, useMemo } from 'react';
import { Filter, ArrowUpDown, Clock, Star, Sparkles, Check } from 'lucide-react';
import { Restaurant } from '../types';
import { RESTAURANTS } from '../data/mockData';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantListProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({ onSelectRestaurant }) => {
  const { searchQuery, selectedCategory } = useFoodDelivery();

  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxTime, setMaxTime] = useState<number>(60);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'fastest' | 'fee'>('popular');

  const cuisinesList = ['All', 'Italian', 'American', 'Japanese', 'Mexican', 'Healthy', 'Desserts', 'Fast Food'];

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesCuisine = r.cuisine.some(c => c.toLowerCase().includes(q));
        const matchesTag = r.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCuisine && !matchesTag) return false;
      }

      // Cuisine filter
      if (selectedCuisine !== 'All') {
        if (!r.cuisine.includes(selectedCuisine as any)) return false;
      }

      // Rating filter
      if (minRating > 0 && r.rating < minRating) return false;

      // Delivery time
      if (r.deliveryTimeMax > maxTime) return false;

      // Free delivery
      if (freeDeliveryOnly && r.deliveryFee > 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fastest') return a.deliveryTimeMin - b.deliveryTimeMin;
      if (sortBy === 'fee') return a.deliveryFee - b.deliveryFee;
      return b.totalReviews - a.totalReviews; // default popular
    });
  }, [searchQuery, selectedCuisine, minRating, maxTime, freeDeliveryOnly, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="restaurants-section">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Eateries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Restaurants Nearby
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover top-rated kitchens delivering fresh in your zone
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated (4.8+)</option>
            <option value="fastest">Fastest Delivery</option>
            <option value="fee">Lowest Delivery Fee</option>
          </select>
        </div>
      </div>

      {/* Filter Bar Chips */}
      <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-slate-100">
        
        {/* Cuisine Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {cuisinesList.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCuisine(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedCuisine === c
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Rating filter */}
        <button
          onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border transition-colors ${
            minRating === 4.8 
              ? 'bg-amber-50 text-amber-800 border-amber-300' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>Top Rated (4.8+)</span>
        </button>

        {/* Free delivery filter */}
        <button
          onClick={() => setFreeDeliveryOnly(!freeDeliveryOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border transition-colors ${
            freeDeliveryOnly 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Check className={`w-3 h-3 ${freeDeliveryOnly ? 'text-emerald-600' : 'text-slate-400'}`} />
          <span>Free Delivery</span>
        </button>

        {/* Under 30 mins */}
        <button
          onClick={() => setMaxTime(maxTime === 25 ? 60 : 25)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border transition-colors ${
            maxTime === 25 
              ? 'bg-orange-50 text-orange-800 border-orange-300' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-3 h-3 text-orange-500" />
          <span>Under 25 mins</span>
        </button>

      </div>

      {/* Restaurant Grid */}
      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-lg mx-auto">
          <p className="text-base font-bold text-slate-800">No restaurants match your filters.</p>
          <p className="text-xs text-slate-500 mt-1">Try relaxing your delivery time or cuisine preference.</p>
          <button
            onClick={() => {
              setSelectedCuisine('All');
              setMinRating(0);
              setMaxTime(60);
              setFreeDeliveryOnly(false);
            }}
            className="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-orange-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(r => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onSelect={onSelectRestaurant}
            />
          ))}
        </div>
      )}

    </section>
  );
};
