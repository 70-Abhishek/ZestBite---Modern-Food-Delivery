export type CuisineType = 
  | 'All'
  | 'Italian'
  | 'American'
  | 'Burgers'
  | 'Japanese'
  | 'Mexican'
  | 'Indian'
  | 'Healthy'
  | 'Desserts'
  | 'Beverages'
  | 'Fast Food';

export type FoodCategory =
  | 'All'
  | 'Pizza'
  | 'Burgers'
  | 'Fast Food'
  | 'Desserts'
  | 'Beverages'
  | 'Healthy Meals'
  | 'Pasta'
  | 'Sushi'
  | 'Bowls';

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number; // base price in USD
  category: FoodCategory;
  image: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  calories?: number;
  preparationTimeMinutes?: number;
  rating?: number;
  reviewsCount?: number;
  availableCustomizations?: {
    sizes?: { name: string; extraPrice: number }[];
    addons?: { name: string; price: number }[];
  };
}

export interface RestaurantReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  cuisine: CuisineType[];
  rating: number;
  totalReviews: number;
  deliveryTimeMin: number; // in minutes e.g. 25
  deliveryTimeMax: number; // e.g. 35
  deliveryFee: number; // in USD e.g. 1.99, 0 for free
  minOrder: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  isOpen: boolean;
  openingHours: string;
  address: string;
  image: string;
  logo: string;
  distanceKm: number;
  featured?: boolean;
  tags: string[];
  reviews: RestaurantReview[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface CartItemOption {
  size?: string;
  addons?: string[];
  instructions?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  menuItem: MenuItem;
  quantity: number;
  selectedOptions?: CartItemOption;
  itemTotalPrice: number;
}

export type OrderStatus = 
  | 'placed'
  | 'accepted'
  | 'preparing'
  | 'ready_for_pickup'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface OrderCustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  deliveryNotes?: string;
  paymentMethod: 'card' | 'apple_pay' | 'google_pay' | 'cash_on_delivery';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  restaurant: Restaurant;
  customer: OrderCustomerInfo;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  tip: number;
  discount: number;
  total: number;
  currency: CurrencyCode;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: string; note: string }[];
  estimatedDeliveryTime: string;
  driver?: {
    name: string;
    phone: string;
    photo: string;
    vehicle: string;
    rating: number;
    currentPositionPercent: number; // 0 to 100 for tracking animation
  };
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number;
  name: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  minSpend: number;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'promo' | 'reward' | 'info';
  read: boolean;
}

export type ActiveTab = 'home' | 'restaurants' | 'menu' | 'tracking' | 'partner' | 'partner_dashboard' | 'orders' | 'favorites';

export interface UserSavedAddress {
  id: string;
  label: string;
  address: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  dietaryPreferences?: string[];
  savedAddresses?: UserSavedAddress[];
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  discountUSD: number;
}

export interface LoyaltyAccount {
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalOrders: number;
  savedAmount: number;
  availableRewards?: LoyaltyReward[];
}

