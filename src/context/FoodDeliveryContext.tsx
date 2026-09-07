import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  CartItem, 
  CartItemOption, 
  Order, 
  OrderCustomerInfo, 
  Restaurant, 
  CurrencyCode, 
  PromoCode, 
  NotificationItem, 
  LoyaltyAccount,
  LoyaltyReward,
  OrderStatus,
  UserProfile,
  ActiveTab
} from '../types';
import { RESTAURANTS, MENU_ITEMS, CURRENCIES, PROMO_CODES, DEFAULT_LOYALTY_REWARDS } from '../data/mockData';

interface FoodDeliveryContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, options?: CartItemOption, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  tip: number;
  setTip: (amount: number) => void;
  discount: number;
  total: number;
  currentRestaurant: Restaurant | null;

  // Promo code
  appliedPromo: PromoCode | null;
  applyPromo: (codeStr: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (customer: OrderCustomerInfo) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceActiveOrderSim: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;
  dismissNotification: (id: string) => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;

  // Loyalty
  loyalty: LoyaltyAccount;
  redeemPoints: (points: number, discountUSD: number) => boolean;
  redeemReward: (rewardId: string) => { success: boolean; message: string };

  // Navigation & Modals
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (r: Restaurant | null) => void;
  deliveryLocation: string;
  setDeliveryLocation: (loc: string) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const FoodDeliveryContext = createContext<FoodDeliveryContextType | undefined>(undefined);

export const FoodDeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & filtering state
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<string>('100 Feet Road, Indiranagar, Bengaluru, India');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const defaultProfile: UserProfile = {
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      phone: '+91 98765 43210',
      address: '100 Feet Road, Indiranagar, Bengaluru, India',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
      savedAddresses: [
        { id: 'addr-1', label: 'Home', address: '100 Feet Road, Indiranagar, Bengaluru' },
        { id: 'addr-2', label: 'Office', address: '5th Block, Koramangala, Bengaluru' },
        { id: 'addr-3', label: "Mom's Place", address: 'Connaught Place, New Delhi' },
      ],
    };

    const saved = localStorage.getItem('zestbite_user');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return {
          ...defaultProfile,
          ...parsed,
          savedAddresses: parsed.savedAddresses || defaultProfile.savedAddresses,
          dietaryPreferences: parsed.dietaryPreferences || defaultProfile.dietaryPreferences,
        };
      } catch (e) { /* ignore */ }
    }
    return defaultProfile;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zestbite_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [tip, setTip] = useState<number>(3.00);

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('zestbite_favorites');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['rest-1', 'item-101', 'item-201'];
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Welcome to ZestBite! 🎉',
      message: 'Use code ZEST30 for 30% off your first delicious order.',
      time: 'Just now',
      type: 'promo',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Double Points Weekend ⚡',
      message: 'Earn 2x ZestPoints on all pizza & burger orders today.',
      time: '2 hours ago',
      type: 'reward',
      read: false,
    }
  ]);

  // Loyalty account
  const [loyalty, setLoyalty] = useState<LoyaltyAccount>(() => {
    const defaultLoyalty: LoyaltyAccount = {
      points: 240,
      tier: 'Gold',
      totalOrders: 6,
      savedAmount: 34.50,
      availableRewards: DEFAULT_LOYALTY_REWARDS,
    };
    const saved = localStorage.getItem('zestbite_loyalty');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return {
          ...defaultLoyalty,
          ...parsed,
          availableRewards: parsed.availableRewards || DEFAULT_LOYALTY_REWARDS,
        };
      } catch (e) { /* ignore */ }
    }
    return defaultLoyalty;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('zestbite_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default initial mock active order to show real-time tracking out-of-the-box!
    const defaultRest = RESTAURANTS[0];
    const defaultItem = MENU_ITEMS[0];
    const initialOrder: Order = {
      id: 'ord-84920',
      orderNumber: '#ZB-84920',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [
        {
          id: 'ci-init-1',
          menuItem: defaultItem,
          quantity: 1,
          selectedOptions: { size: '12" Regular Crust', addons: ['Spicy Calabrian Chili Hot Honey'] },
          itemTotalPrice: 18.49,
        },
        {
          id: 'ci-init-2',
          menuItem: MENU_ITEMS[3], // polenta fries
          quantity: 1,
          itemTotalPrice: 8.99,
        }
      ],
      restaurant: defaultRest,
      customer: {
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        phone: '+91 98765 43210',
        address: '100 Feet Road, Indiranagar, Bengaluru, India',
        deliveryNotes: 'Ring bell #4, leave by door',
        paymentMethod: 'apple_pay',
      },
      subtotal: 27.48,
      deliveryFee: 1.99,
      tax: 2.45,
      tip: 3.50,
      discount: 5.00,
      total: 30.42,
      currency: 'INR',
      status: 'on_the_way',
      statusHistory: [
        { status: 'placed', timestamp: '12:15 PM', note: 'Order confirmed by customer' },
        { status: 'accepted', timestamp: '12:17 PM', note: 'Bella Napoli kitchen accepted order' },
        { status: 'preparing', timestamp: '12:20 PM', note: 'Wood-fired oven baking your pizza' },
        { status: 'ready_for_pickup', timestamp: '12:32 PM', note: 'Packed fresh in thermal bag' },
        { status: 'on_the_way', timestamp: '12:35 PM', note: 'Driver Rajesh picked up order' },
      ],
      estimatedDeliveryTime: '12:50 PM (15 mins)',
      driver: {
        name: 'Rajesh Kumar',
        phone: '+91 98201 54321',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        vehicle: 'Ather 450X EV • KA-03-EB-2024',
        rating: 4.95,
        currentPositionPercent: 62,
      },
    };
    return [initialOrder];
  });

  const [activeOrderId, setActiveOrderId] = useState<string | null>(() => {
    return orders.length > 0 ? orders[0].id : null;
  });

  const activeOrder = orders.find(o => o.id === activeOrderId) || (orders.length > 0 ? orders[0] : null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('zestbite_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zestbite_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('zestbite_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zestbite_loyalty', JSON.stringify(loyalty));
  }, [loyalty]);

  useEffect(() => {
    localStorage.setItem('zestbite_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Helper to get active restaurant in cart
  const currentRestaurantId = cart.length > 0 ? cart[0].menuItem.restaurantId : null;
  const currentRestaurant = currentRestaurantId ? RESTAURANTS.find(r => r.id === currentRestaurantId) || null : null;

  // Cart operations
  const addToCart = (item: MenuItem, options?: CartItemOption, quantity: number = 1) => {
    // If cart has items from another restaurant, confirm reset
    if (cart.length > 0 && cart[0].menuItem.restaurantId !== item.restaurantId) {
      const restName = currentRestaurant?.name || 'another restaurant';
      const confirmReset = window.confirm(`Your cart contains meals from ${restName}. Would you like to start a new order with ${item.name}?`);
      if (!confirmReset) return;
      setCart([]);
    }

    let extraCost = 0;
    if (options?.size && item.availableCustomizations?.sizes) {
      const matched = item.availableCustomizations.sizes.find(s => s.name === options.size);
      if (matched) extraCost += matched.extraPrice;
    }
    if (options?.addons && item.availableCustomizations?.addons) {
      options.addons.forEach(addonName => {
        const matched = item.availableCustomizations?.addons?.find(a => a.name === addonName);
        if (matched) extraCost += matched.price;
      });
    }

    const unitPrice = item.price + extraCost;
    const instanceKey = `${item.id}-${options?.size || 'base'}-${(options?.addons || []).sort().join(',')}`;

    setCart(prev => {
      const existingIdx = prev.findIndex(ci => ci.id === instanceKey);
      if (existingIdx >= 0) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: newQty,
          itemTotalPrice: Number((unitPrice * newQty).toFixed(2))
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: instanceKey,
          menuItem: item,
          quantity,
          selectedOptions: options,
          itemTotalPrice: Number((unitPrice * quantity).toFixed(2))
        };
        return [...prev, newItem];
      }
    });

    addNotification('Added to Bag 🛍️', `${quantity}x ${item.name} added to your craving list.`, 'order');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const unitPrice = item.itemTotalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotalPrice: Number((unitPrice * newQty).toFixed(2))
          };
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Calculations
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = Number(cart.reduce((acc, curr) => acc + curr.itemTotalPrice, 0).toFixed(2));
  const deliveryFee = subtotal === 0 ? 0 : (currentRestaurant ? currentRestaurant.deliveryFee : 1.99);
  const tax = Number((subtotal * 0.088).toFixed(2)); // ~8.8% tax

  let discount = 0;
  if (appliedPromo && subtotal >= appliedPromo.minSpend) {
    discount = Number(((subtotal * appliedPromo.discountPercent) / 100).toFixed(2));
    if (appliedPromo.code === 'ZEST30' && discount > 12) {
      discount = 12;
    }
  }

  const total = Number(Math.max(0, subtotal + deliveryFee + tax + tip - discount).toFixed(2));

  // Promos
  const applyPromo = (codeStr: string) => {
    const cleaned = codeStr.trim().toUpperCase();
    const promo = PROMO_CODES.find(p => p.code === cleaned);
    if (!promo) {
      return { success: false, message: 'Invalid promo code. Try ZEST30 or FREEDEL.' };
    }
    if (subtotal < promo.minSpend) {
      return { success: false, message: `Minimum order of $${promo.minSpend} required for code ${promo.code}.` };
    }
    setAppliedPromo(promo);
    addNotification('Promo Applied! 🏷️', `Saved ${promo.discountPercent}% with ${promo.code}!`, 'promo');
    return { success: true, message: `Code ${promo.code} applied successfully!` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Currency
  const formatPrice = (amountInUSD: number) => {
    const conf = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = amountInUSD * conf.rateFromUSD;
    if (currency === 'INR') {
      return `${conf.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${conf.symbol}${converted.toFixed(2)}`;
  };

  // Favorites
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // Notifications
  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Loyalty
  const redeemPoints = (pointsToRedeem: number, discountUSD: number) => {
    if (loyalty.points < pointsToRedeem) return false;
    setLoyalty(prev => {
      const updated = {
        ...prev,
        points: prev.points - pointsToRedeem,
        savedAmount: Number((prev.savedAmount + discountUSD).toFixed(2))
      };
      localStorage.setItem('zestbite_loyalty', JSON.stringify(updated));
      return updated;
    });
    addNotification('Points Redeemed! 🎁', `Redeemed ${pointsToRedeem} ZestPoints for $${discountUSD} credit!`, 'reward');
    return true;
  };

  const redeemReward = (rewardId: string): { success: boolean; message: string } => {
    const rewards = loyalty.availableRewards || DEFAULT_LOYALTY_REWARDS;
    const targetReward = rewards.find(r => r.id === rewardId);
    if (!targetReward) {
      return { success: false, message: 'Reward not found.' };
    }
    if (loyalty.points < targetReward.pointsCost) {
      return { success: false, message: `Need ${targetReward.pointsCost} points to claim this reward.` };
    }

    setLoyalty(prev => {
      const updated = {
        ...prev,
        points: prev.points - targetReward.pointsCost,
        savedAmount: Number((prev.savedAmount + targetReward.discountUSD).toFixed(2)),
        availableRewards: prev.availableRewards || DEFAULT_LOYALTY_REWARDS,
      };
      localStorage.setItem('zestbite_loyalty', JSON.stringify(updated));
      return updated;
    });

    addNotification('Voucher Claimed! 🎁', `Successfully redeemed ${targetReward.title}!`, 'reward');
    return { success: true, message: 'Voucher claimed successfully!' };
  };

  // User Profile updates
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('zestbite_user', JSON.stringify(updated));
      return updated;
    });
    addNotification('Profile Updated ✅', 'Your user preferences were saved successfully.', 'info');
  };

  // Place Order
  const placeOrder = (customer: OrderCustomerInfo): Order => {
    const newOrderId = `ord-${Math.floor(10000 + Math.random() * 90000)}`;
    const targetRest = currentRestaurant || RESTAURANTS[0];
    const earnedPoints = Math.round(subtotal * 10);

    const newOrder: Order = {
      id: newOrderId,
      orderNumber: `#ZB-${newOrderId.split('-')[1]}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      restaurant: targetRest,
      customer,
      subtotal,
      deliveryFee,
      tax,
      tip,
      discount,
      total,
      currency,
      status: 'placed',
      statusHistory: [
        {
          status: 'placed',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: `Order placed and transmitted to ${targetRest.name}`
        }
      ],
      estimatedDeliveryTime: `${targetRest.deliveryTimeMin + 5}-${targetRest.deliveryTimeMax + 5} mins`,
      driver: {
        name: 'Arjun Singh',
        phone: '+91 98450 67890',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        vehicle: 'Ola S1 Pro Electric • KA-01-EV-4421',
        rating: 4.92,
        currentPositionPercent: 10,
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrderId);
    clearCart();
    setIsCartOpen(false);
    setActiveTab('tracking');

    // Update loyalty
    setLoyalty(prev => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalOrders: prev.totalOrders + 1,
    }));

    addNotification(
      'Order Confirmed! 🚀',
      `Your order ${newOrder.orderNumber} is placed with ${targetRest.name}. Earned +${earnedPoints} ZestPoints!`,
      'order'
    );

    return newOrder;
  };

  // Update order status (used by restaurant partner dashboard or live tracking sim)
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const statusNotes: Record<OrderStatus, string> = {
          placed: 'Order submitted to restaurant',
          accepted: `${o.restaurant.name} accepted your order`,
          preparing: 'Chefs are crafting your dish with fresh ingredients',
          ready_for_pickup: 'Order packed in sealed thermal insulation',
          on_the_way: `${o.driver?.name || 'Driver'} is en route to your location`,
          delivered: 'Package delivered at your doorstep. Bon appétit!',
          cancelled: 'Order was cancelled',
        };
        const posPercents: Record<OrderStatus, number> = {
          placed: 5,
          accepted: 15,
          preparing: 30,
          ready_for_pickup: 50,
          on_the_way: 75,
          delivered: 100,
          cancelled: 0,
        };

        const updatedHistory = [...o.statusHistory];
        if (!updatedHistory.some(h => h.status === status)) {
          updatedHistory.push({
            status,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: statusNotes[status] || status
          });
        }

        const updatedDriver = o.driver ? {
          ...o.driver,
          currentPositionPercent: posPercents[status] ?? o.driver.currentPositionPercent
        } : undefined;

        return {
          ...o,
          status,
          statusHistory: updatedHistory,
          driver: updatedDriver
        };
      }
      return o;
    }));

    const statusDisplay = status.replace(/_/g, ' ');
    addNotification('Order Status Update 🛵', `Order is now ${statusDisplay}!`, 'order');
  };

  // Simulates moving driver position forward
  const advanceActiveOrderSim = () => {
    if (!activeOrder) return;
    const flow: OrderStatus[] = ['placed', 'accepted', 'preparing', 'ready_for_pickup', 'on_the_way', 'delivered'];
    const currentIdx = flow.indexOf(activeOrder.status);
    if (currentIdx < flow.length - 1) {
      updateOrderStatus(activeOrder.id, flow[currentIdx + 1]);
    }
  };

  return (
    <FoodDeliveryContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        deliveryFee,
        tax,
        tip,
        setTip,
        discount,
        total,
        currentRestaurant,

        appliedPromo,
        applyPromo,
        removePromo,

        currency,
        setCurrency,
        formatPrice,

        orders,
        activeOrder,
        setActiveOrder: (order) => setActiveOrderId(order?.id || null),
        placeOrder,
        updateOrderStatus,
        advanceActiveOrderSim,

        favorites,
        toggleFavorite,
        isFavorite,

        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        dismissNotification,
        addNotification,

        loyalty,
        redeemPoints,
        redeemReward,

        activeTab,
        setActiveTab,
        selectedRestaurant,
        setSelectedRestaurant,
        deliveryLocation,
        setDeliveryLocation,
        userProfile,
        setUserProfile,
        updateUserProfile,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </FoodDeliveryContext.Provider>
  );
};

export const useFoodDelivery = () => {
  const context = useContext(FoodDeliveryContext);
  if (!context) {
    throw new Error('useFoodDelivery must be used within a FoodDeliveryProvider');
  }
  return context;
};
