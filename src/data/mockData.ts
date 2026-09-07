import { Restaurant, MenuItem, PromoCode, CurrencyConfig, LoyaltyReward } from '../types';

export const DEFAULT_LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-1',
    title: '$5 Off Next Order',
    description: 'Valid at all partner eateries with minimum $20 order.',
    pointsCost: 100,
    discountUSD: 5.0,
  },
  {
    id: 'rew-2',
    title: 'Free Express Delivery Pass',
    description: 'Waives delivery fee completely on your next order.',
    pointsCost: 150,
    discountUSD: 3.99,
  },
  {
    id: 'rew-3',
    title: '$12 VIP Dining Feast Credit',
    description: 'Instant credit applied automatically to cart subtotal.',
    pointsCost: 200,
    discountUSD: 12.0,
  },
  {
    id: 'rew-4',
    title: 'Free Artisan Dessert Voucher',
    description: 'Complimentary dessert with any main dish order.',
    pointsCost: 300,
    discountUSD: 8.5,
  },
];


export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateFromUSD: 1.0, name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rateFromUSD: 0.92, name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rateFromUSD: 0.79, name: 'British Pound' },
  INR: { code: 'INR', symbol: '₹', rateFromUSD: 86.5, name: 'Indian Rupee' },
  CAD: { code: 'CAD', symbol: 'CA$', rateFromUSD: 1.38, name: 'Canadian Dollar' },
  JPY: { code: 'JPY', symbol: '¥', rateFromUSD: 155.0, name: 'Japanese Yen' },
};

export const PROMO_CODES: PromoCode[] = [
  { code: 'ZEST30', discountPercent: 30, minSpend: 25, description: '30% off orders over $25 (max $12)' },
  { code: 'FREEDEL', discountPercent: 10, minSpend: 15, description: 'Free delivery on all meals above $15' },
  { code: 'FEAST20', discountPercent: 20, minSpend: 35, description: '20% off big family feasts' },
  { code: 'WELCOME5', discountPercent: 15, minSpend: 10, description: '15% off your first craving' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Bella Napoli Artisan Pizza',
    tagline: 'Wood-fired Neapolitan pizza, slow-fermented dough & buffalo mozzarella',
    cuisine: ['Italian', 'Fast Food'],
    rating: 4.8,
    totalReviews: 842,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 1.99,
    minOrder: 15,
    priceRange: '$$',
    isOpen: true,
    openingHours: '11:00 AM - 11:00 PM',
    address: '100 Feet Road, Indiranagar, Bengaluru, India',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80',
    distanceKm: 2.1,
    featured: true,
    tags: ['Wood-Fired', 'Vegetarian Friendly', 'Top Rated'],
    coordinates: { lat: 12.9784, lng: 77.6408 },
    reviews: [
      {
        id: 'rev-101',
        userName: 'Sophia Martinez',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Hands down the best crust in town! Smoked scamorza and hot honey were pure heaven.'
      },
      {
        id: 'rev-102',
        userName: 'David Chen',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Delivery was blazing fast (22 mins) and pizza was still bubbling hot.'
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'SmashCraft Prime Burgers',
    tagline: 'Handcrafted spiced chicken & crispy paneer patties smashed with caramelized onions on brioche',
    cuisine: ['American', 'Fast Food', 'Burgers'],
    rating: 4.9,
    totalReviews: 1240,
    deliveryTimeMin: 15,
    deliveryTimeMax: 25,
    deliveryFee: 0.99,
    minOrder: 12,
    priceRange: '$$',
    isOpen: true,
    openingHours: '11:30 AM - 12:00 AM',
    address: '5th Block, Koramangala, Bengaluru, India',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80',
    distanceKm: 1.4,
    featured: true,
    tags: ['Bestseller', 'Gourmet Smash', 'Late Night'],
    coordinates: { lat: 12.9352, lng: 77.6245 },
    reviews: [
      {
        id: 'rev-201',
        userName: 'Marcus Sterling',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: 'Yesterday',
        comment: 'Crispy lacy edges and house special truffle garlic mayo. 10/10 burger experience.'
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Kyoto Botan Sushi & Ramen',
    tagline: 'Fresh sashimi, hand-rolled temaki & 18-hour simmered tonkotsu ramen',
    cuisine: ['Japanese', 'Healthy'],
    rating: 4.8,
    totalReviews: 690,
    deliveryTimeMin: 25,
    deliveryTimeMax: 35,
    deliveryFee: 2.49,
    minOrder: 20,
    priceRange: '$$$',
    isOpen: true,
    openingHours: '12:00 PM - 10:30 PM',
    address: 'Lavelle Road, Central Bengaluru, India',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=200&q=80',
    distanceKm: 3.2,
    featured: true,
    tags: ['Sashimi Grade', 'Umami', 'Eco Packaging'],
    coordinates: { lat: 12.9719, lng: 77.5937 },
    reviews: [
      {
        id: 'rev-301',
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Packaging keeps the ramen broth separate from the noodles, perfectly firm!'
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'Verde Garden & Superfood Bowls',
    tagline: 'Organic grain bowls, avocado toast, cold-pressed elixirs & vegan delights',
    cuisine: ['Healthy', 'Desserts', 'Beverages'],
    rating: 4.7,
    totalReviews: 530,
    deliveryTimeMin: 15,
    deliveryTimeMax: 25,
    deliveryFee: 0,
    minOrder: 10,
    priceRange: '$$',
    isOpen: true,
    openingHours: '08:00 AM - 09:00 PM',
    address: 'HAL Old Airport Road, Indiranagar, Bengaluru, India',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80',
    distanceKm: 1.8,
    featured: false,
    tags: ['100% Organic', 'Gluten Free', 'Zero Waste'],
    coordinates: { lat: 12.9698, lng: 77.6499 },
    reviews: [
      {
        id: 'rev-401',
        userName: 'Liam Wright',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'Fresh, energizing, clean eating without sacrificing any flavor.'
      }
    ]
  },
  {
    id: 'rest-5',
    name: 'Cantina de Fuego Taqueria',
    tagline: 'Authentic Oaxacan street tacos, crispy birria quesatacos & fresh guacamole',
    cuisine: ['Mexican', 'Fast Food'],
    rating: 4.8,
    totalReviews: 915,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 1.49,
    minOrder: 14,
    priceRange: '$',
    isOpen: true,
    openingHours: '11:00 AM - 11:30 PM',
    address: '12th Main, BTM 2nd Stage, Bengaluru, India',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=200&q=80',
    distanceKm: 2.7,
    featured: false,
    tags: ['Slow Cooked', 'Spicy', 'House Salsas'],
    coordinates: { lat: 12.9166, lng: 77.6101 },
    reviews: [
      {
        id: 'rev-501',
        userName: 'Mateo Sanchez',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'The birria consommé dip is rich and soulful. Huge portions.'
      }
    ]
  },
  {
    id: 'rest-6',
    name: 'Sweet Haven Patisserie & Gelato',
    tagline: 'Freshly baked French macarons, warm molten lava cakes & Sicilian gelato',
    cuisine: ['Desserts', 'Beverages'],
    rating: 4.9,
    totalReviews: 760,
    deliveryTimeMin: 15,
    deliveryTimeMax: 20,
    deliveryFee: 1.99,
    minOrder: 12,
    priceRange: '$$',
    isOpen: true,
    openingHours: '09:00 AM - 10:00 PM',
    address: 'Church Street, Off MG Road, Bengaluru, India',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    logo: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=200&q=80',
    distanceKm: 1.2,
    featured: false,
    tags: ['Artisan', 'Sweet Tooth', 'Fresh Daily'],
    coordinates: { lat: 12.9754, lng: 77.6050 },
    reviews: [
      {
        id: 'rev-601',
        userName: 'Chloe Bennett',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '6 days ago',
        comment: 'Tiramisu is cloud-soft with authentic mascarpone and dark espresso.'
      }
    ]
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Bella Napoli (rest-1)
  {
    id: 'item-101',
    restaurantId: 'rest-1',
    name: 'Margherita Burrata D.O.P.',
    description: 'San Marzano tomatoes, fresh cream-filled burrata, sweet Genovese basil, cold-pressed olive oil',
    price: 16.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    isPopular: true,
    calories: 820,
    preparationTimeMinutes: 18,
    rating: 4.9,
    reviewsCount: 312,
    availableCustomizations: {
      sizes: [
        { name: '12" Regular Crust', extraPrice: 0 },
        { name: '14" Large Crust', extraPrice: 4.5 },
        { name: 'Gluten-Free Cauliflower Crust', extraPrice: 3.5 }
      ],
      addons: [
        { name: 'Double Burrata', price: 3.5 },
        { name: 'Spicy Calabrian Chili Hot Honey', price: 1.5 },
        { name: 'Wild Truffle Oil Drizzle', price: 2.0 }
      ]
    }
  },
  {
    id: 'item-102',
    restaurantId: 'rest-1',
    name: 'Truffle & Wild Forest Mushroom Pizza',
    description: 'Fior di latte, roasted shiitake, portobello mushrooms, fresh rosemary, black truffle cream',
    price: 18.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    isPopular: true,
    calories: 880,
    preparationTimeMinutes: 20,
    rating: 4.8,
    reviewsCount: 198,
    availableCustomizations: {
      sizes: [
        { name: '12" Regular Crust', extraPrice: 0 },
        { name: '14" Large Crust', extraPrice: 4.5 }
      ],
      addons: [
        { name: 'Prosciutto di Parma Crisps', price: 3.0 },
        { name: 'Shaved Aged Parmesan', price: 1.75 }
      ]
    }
  },
  {
    id: 'item-103',
    restaurantId: 'rest-1',
    name: 'Spicy Diavola & Pepperoni',
    description: 'Smoky artisanal pepperoni, spicy soppressata, chili flakes, red sauce, mozzarella',
    price: 17.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
    isSpicy: true,
    isPopular: true,
    calories: 940,
    preparationTimeMinutes: 18,
    rating: 4.9,
    reviewsCount: 420,
    availableCustomizations: {
      sizes: [
        { name: '12" Regular Crust', extraPrice: 0 },
        { name: '14" Large Crust', extraPrice: 4.5 }
      ],
      addons: [
        { name: 'Hot Honey Glaze', price: 1.5 },
        { name: 'Jalapeño Pickles', price: 1.0 }
      ]
    }
  },
  {
    id: 'item-104',
    restaurantId: 'rest-1',
    name: 'Crispy Truffle Polenta Fries',
    description: 'Hand-cut golden polenta sticks dusted with pecorino romano and garlic aioli dip',
    price: 8.99,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    calories: 420,
    preparationTimeMinutes: 12,
    rating: 4.7,
    reviewsCount: 115
  },

  // SmashCraft Prime Burgers (rest-2)
  {
    id: 'item-201',
    restaurantId: 'rest-2',
    name: 'The Signature Double Smash Burger',
    description: 'Two seared spiced chicken smash patties, American cheese, crispy caramelized onions, secret house sauce on brioche',
    price: 13.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    calories: 790,
    preparationTimeMinutes: 12,
    rating: 5.0,
    reviewsCount: 580,
    availableCustomizations: {
      sizes: [
        { name: 'Double Patty', extraPrice: 0 },
        { name: 'Triple Monster Patty', extraPrice: 3.5 }
      ],
      addons: [
        { name: 'Thick Applewood Smoked Bacon', price: 2.2 },
        { name: 'Smoked Jalapeño Relish', price: 1.2 },
        { name: 'Extra Cheddar Melt', price: 1.5 }
      ]
    }
  },
  {
    id: 'item-202',
    restaurantId: 'rest-2',
    name: 'Spicy Nashville Hot Chicken Sandwich',
    description: 'Crispy fried buttermilk chicken thigh dipped in fiery chili oil, slaw, dill pickles on toasted brioche',
    price: 14.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    isSpicy: true,
    isPopular: true,
    calories: 740,
    preparationTimeMinutes: 15,
    rating: 4.8,
    reviewsCount: 360,
    availableCustomizations: {
      sizes: [
        { name: 'Medium Heat', extraPrice: 0 },
        { name: 'Extra Fiery Reaper', extraPrice: 0 }
      ],
      addons: [
        { name: 'Extra Garlic Ranch Dip', price: 1.0 },
        { name: 'Cheddar Slice', price: 1.2 }
      ]
    }
  },
  {
    id: 'item-203',
    restaurantId: 'rest-2',
    name: 'Parmesan Herb Seasoned Fries',
    description: 'Fresh russet potatoes tossed in sea salt, rosemary, garlic flakes and grated parmesan',
    price: 5.99,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    calories: 380,
    preparationTimeMinutes: 8,
    rating: 4.7,
    reviewsCount: 220
  },
  {
    id: 'item-204',
    restaurantId: 'rest-2',
    name: 'Creamy Salted Caramel Thickshake',
    description: 'Spun Madagascar vanilla custard, sea salt ribbon, topped with toasted marshmallow',
    price: 6.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    calories: 520,
    preparationTimeMinutes: 5,
    rating: 4.9,
    reviewsCount: 180
  },

  // Kyoto Botan Sushi (rest-3)
  {
    id: 'item-301',
    restaurantId: 'rest-3',
    name: 'Flamed Salmon Dragon Roll (8 pcs)',
    description: 'Torched Atlantic salmon, tempura shrimp, avocado, tobiko, unagi glaze & spicy mayo drizzle',
    price: 17.50,
    category: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    calories: 510,
    preparationTimeMinutes: 16,
    rating: 4.9,
    reviewsCount: 310,
    availableCustomizations: {
      addons: [
        { name: 'Extra Wasabi & Pickled Ginger', price: 0.5 },
        { name: 'Spicy Crunch Flakes', price: 1.0 }
      ]
    }
  },
  {
    id: 'item-302',
    restaurantId: 'rest-3',
    name: 'Rich Tonkotsu Chashu Ramen',
    description: '18-hour broth, handmade wheat noodles, tender rolled pork belly chashu, soft-boiled ajitsuke egg, nori',
    price: 16.50,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    calories: 720,
    preparationTimeMinutes: 15,
    rating: 4.9,
    reviewsCount: 440,
    availableCustomizations: {
      addons: [
        { name: 'Extra Pork Chashu (2 pcs)', price: 3.5 },
        { name: 'Extra Seasoned Egg', price: 2.0 },
        { name: 'Spicy Chili Paste Ball', price: 1.0 }
      ]
    }
  },
  {
    id: 'item-303',
    restaurantId: 'rest-3',
    name: 'Pan-Fried Classic Chicken Gyoza (6 pcs)',
    description: 'Crispy lace dumpling skirts, filled with minced chicken & scallions, served with black vinegar dip',
    price: 9.99,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
    calories: 390,
    preparationTimeMinutes: 10,
    rating: 4.8,
    reviewsCount: 160
  },

  // Verde Garden & Superfood Bowls (rest-4)
  {
    id: 'item-401',
    restaurantId: 'rest-4',
    name: 'Rainbow Crunch Edamame Grain Bowl',
    description: 'Tricolor quinoa, Hass avocado, purple cabbage, edamame, roasted sweet potatoes, ginger tahini dressing',
    price: 14.25,
    category: 'Healthy Meals',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    isPopular: true,
    calories: 490,
    preparationTimeMinutes: 10,
    rating: 4.8,
    reviewsCount: 215,
    availableCustomizations: {
      addons: [
        { name: 'Grilled Herb Tofu', price: 2.5 },
        { name: 'Wild Alaskan Salmon Fillet', price: 5.0 },
        { name: 'Extra Avocado Mash', price: 2.0 }
      ]
    }
  },
  {
    id: 'item-402',
    restaurantId: 'rest-4',
    name: 'Green Goddess Detox Smoothie',
    description: 'Spinach, kale, green apple, cucumber, chia seeds, cold-pressed coconut water & lime',
    price: 7.50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    calories: 180,
    preparationTimeMinutes: 5,
    rating: 4.7,
    reviewsCount: 94
  },
  {
    id: 'item-403',
    restaurantId: 'rest-4',
    name: 'Wild Berry Organic Açaí Bowl',
    description: 'Thick organic açaí purée, gluten-free granola, blueberries, strawberries, chia seeds, cacao nibs',
    price: 11.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    calories: 360,
    preparationTimeMinutes: 8,
    rating: 4.9,
    reviewsCount: 180
  },

  // Cantina de Fuego (rest-5)
  {
    id: 'item-501',
    restaurantId: 'rest-5',
    name: 'Crispy Birria Quesatacos (3 pcs)',
    description: 'Slow-braised spiced lamb folded in corn tortillas with melted Chihuahua cheese, cilantro, onion & rich savory broth',
    price: 15.99,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    isSpicy: true,
    isPopular: true,
    calories: 780,
    preparationTimeMinutes: 14,
    rating: 4.9,
    reviewsCount: 460,
    availableCustomizations: {
      addons: [
        { name: 'Extra Consommé Dipping Broth', price: 2.0 },
        { name: 'Fresh Chunky Guacamole', price: 3.0 }
      ]
    }
  },
  {
    id: 'item-502',
    restaurantId: 'rest-5',
    name: 'Molcajete Guacamole & Tortilla Chips',
    description: 'Hand-mashed Hass avocados, charred jalapeños, red onions, cilantro, fresh lime with warm tortilla chips',
    price: 9.50,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    calories: 450,
    preparationTimeMinutes: 8,
    rating: 4.8,
    reviewsCount: 220
  },

  // Sweet Haven Patisserie (rest-6)
  {
    id: 'item-601',
    restaurantId: 'rest-6',
    name: 'Belgian Molten Chocolate Lava Cake',
    description: 'Warm dark chocolate soufflé with a molten Belgian ganache core, dusted with powdered sugar',
    price: 8.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    isPopular: true,
    calories: 540,
    preparationTimeMinutes: 10,
    rating: 4.9,
    reviewsCount: 280,
    availableCustomizations: {
      addons: [
        { name: 'Scoop of Madagascar Vanilla Gelato', price: 2.5 },
        { name: 'Warm Salted Caramel Drizzle', price: 1.0 }
      ]
    }
  },
  {
    id: 'item-602',
    restaurantId: 'rest-6',
    name: 'Artisan Parisian Macaron Box (6 pcs)',
    description: 'Assortment of Pistachio, Salted Caramel, Raspberry Rose, Dark Chocolate, Lemon Tart & Vanilla Bean',
    price: 13.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    calories: 420,
    preparationTimeMinutes: 5,
    rating: 4.8,
    reviewsCount: 195
  }
];

export const CATEGORIES: { name: string; icon: string; tag: string }[] = [
  { name: 'All', icon: 'Sparkles', tag: 'All' },
  { name: 'Pizza', icon: 'Pizza', tag: 'Pizza' },
  { name: 'Burgers', icon: 'Utensils', tag: 'Burgers' },
  { name: 'Fast Food', icon: 'Utensils', tag: 'Fast Food' },
  { name: 'Healthy Meals', icon: 'Salad', tag: 'Healthy Meals' },
  { name: 'Sushi', icon: 'Fish', tag: 'Sushi' },
  { name: 'Desserts', icon: 'Cake', tag: 'Desserts' },
  { name: 'Beverages', icon: 'Coffee', tag: 'Beverages' },
];
