import React, { useMemo } from 'react';
import { Sparkles, Utensils, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/mockData';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { FoodCard } from './FoodCard';

export const FeaturedFoodSection: React.FC = () => {
  const { searchQuery, selectedCategory, setSelectedCategory } = useFoodDelivery();

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="featured-food-section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
            <Utensils className="w-3.5 h-3.5" />
            <span>Top Rated Dishes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {selectedCategory === 'All' ? 'Featured Cravings Today' : `${selectedCategory} Specials`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Prepared to order by master kitchens with freshest ingredients
          </p>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-bold text-slate-600 hover:text-orange-600 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Dishes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-md mx-auto">
          <p className="text-base font-bold text-slate-800">No dishes found matching "{searchQuery}".</p>
          <p className="text-xs text-slate-500 mt-1">Try searching for "Pizza", "Burger", or "Salmon".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};
