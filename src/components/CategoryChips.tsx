import React from 'react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { CATEGORIES } from '../data/mockData';

export const CategoryChips: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setSearchQuery } = useFoodDelivery();

  const categoryEmojis: Record<string, string> = {
    'All': '✨',
    'Pizza': '🍕',
    'Burgers': '🍔',
    'Fast Food': '🍟',
    'Healthy Meals': '🥗',
    'Sushi': '🍣',
    'Desserts': '🍰',
    'Beverages': '🧋',
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Craving by Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pick your mood or dietary style
          </p>
        </div>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-full"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.tag;
          return (
            <button
              key={cat.tag}
              id={`cat-chip-${cat.tag.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setSelectedCategory(cat.tag);
              }}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15 scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-xs'
              }`}
            >
              <span className="text-base leading-none">{categoryEmojis[cat.tag] || '🍽️'}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
