import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  MapPin, 
  Bike, 
  Heart, 
  Search, 
  Sparkles, 
  MessageSquare, 
  Send,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Restaurant, MenuItem, RestaurantReview } from '../types';
import { MENU_ITEMS } from '../data/mockData';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { FoodCard } from './FoodCard';

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({ restaurant, onClose }) => {
  const { formatPrice, toggleFavorite, isFavorite, addNotification } = useFoodDelivery();
  
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews'>('menu');
  const [searchInMenu, setSearchInMenu] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  
  // Reviews state
  const [reviewsList, setReviewsList] = useState<RestaurantReview[]>(restaurant.reviews || []);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const isFav = isFavorite(restaurant.id);

  // Filter items for this restaurant
  const items = MENU_ITEMS.filter(item => item.restaurantId === restaurant.id);
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchInMenu.toLowerCase()) || 
      item.description.toLowerCase().includes(searchInMenu.toLowerCase());
    const matchesVeg = vegOnly ? item.isVegetarian : true;
    return matchesSearch && matchesVeg;
  });

  // Extract unique categories for this restaurant
  const uniqueCategories = Array.from(new Set(items.map(i => i.category)));

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const newRev: RestaurantReview = {
      id: `rev-user-${Date.now()}`,
      userName: 'Alex Johnson (You)',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim()
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewComment('');
    addNotification('Review Posted! ⭐', `Thank you for reviewing ${restaurant.name}.`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FCFBF9] rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cover Photo Header */}
        <div className="relative h-52 sm:h-64 bg-slate-200 shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite heart */}
          <button
            onClick={() => toggleFavorite(restaurant.id)}
            className={`absolute top-4 right-15 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isFav ? 'bg-white text-rose-500 shadow-md' : 'bg-black/60 text-white hover:bg-black/80'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Restaurant identity overlay */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 flex items-end justify-between gap-4 text-white">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-white overflow-hidden shadow-lg bg-white shrink-0">
                <img src={restaurant.logo} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">{restaurant.name}</h1>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-1">{restaurant.tagline}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {restaurant.rating.toFixed(1)} ({restaurant.totalReviews} ratings)
                  </span>
                  <span>•</span>
                  <span>{restaurant.priceRange}</span>
                  <span>•</span>
                  <span>{restaurant.openingHours}</span>
                </div>
              </div>
            </div>

            <div className="hidden sm:block text-right shrink-0">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold">
                {restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} min delivery
              </div>
            </div>
          </div>
        </div>

        {/* Info badges bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Bike className="w-4 h-4 text-emerald-600" />
              <span>
                {restaurant.deliveryFee === 0 ? 'Free Delivery' : `${formatPrice(restaurant.deliveryFee)} Delivery`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-1.5 rounded-full font-bold transition-colors ${
                activeTab === 'menu' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Menu Items ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-1.5 rounded-full font-bold transition-colors ${
                activeTab === 'reviews' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Reviews ({reviewsList.length})
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {activeTab === 'menu' ? (
            <div className="space-y-6">
              
              {/* Menu Search and Veg-Only Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchInMenu}
                    onChange={(e) => setSearchInMenu(e.target.value)}
                    placeholder={`Search within ${restaurant.name}...`}
                    className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                  {searchInMenu && (
                    <button
                      onClick={() => setSearchInMenu('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200 w-fit">
                  <input
                    type="checkbox"
                    checked={vegOnly}
                    onChange={(e) => setVegOnly(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="w-3.5 h-3.5 border-2 border-emerald-600 rounded-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                  </div>
                  <span>Vegetarian Only</span>
                </label>
              </div>

              {/* Items Grid */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/60 p-6">
                  <p className="text-sm font-bold text-slate-700">No menu items matched your filter.</p>
                  <p className="text-xs text-slate-400 mt-1">Try clearing the vegetarian toggle or search term.</p>
                  <button
                    onClick={() => { setSearchInMenu(''); setVegOnly(false); }}
                    className="mt-3 text-xs font-bold text-orange-600 hover:underline"
                  >
                    Reset Menu Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.map(item => (
                    <FoodCard key={item.id} item={item} />
                  ))}
                </div>
              )}

            </div>
          ) : (
            /* Reviews Tab */
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Rating summary hero */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">{restaurant.rating.toFixed(1)}</span>
                    <span className="text-xs text-slate-400 font-medium">out of 5.0</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Based on {restaurant.totalReviews} verified orders</p>
                </div>

                <div className="text-right text-xs space-y-1 text-slate-500">
                  <p className="font-semibold text-emerald-600 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 98% Food Quality
                  </p>
                  <p className="font-semibold text-emerald-600 flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 96% On-Time Delivery
                  </p>
                </div>
              </div>

              {/* Add a review form */}
              <form onSubmit={handleAddReview} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                  Leave a Feedback & Rating
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-medium">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1"
                      >
                        <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share details about the crust, temperature, speed, or flavor..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  required
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {(reviewsList || []).map(review => (
                  <div key={review.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {review.userAvatar ? (
                          <img src={review.userAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
                            {review.userName[0]}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-slate-900">{review.userName}</p>
                          <p className="text-[10px] text-slate-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-9">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
