# ZestBite - Modern Food Delivery

ZestBite is a modern food delivery web application built with React and Vite. It gives customers a complete ordering experience across restaurant discovery, menu browsing, cart management, checkout, order tracking, favorites, profile settings, and loyalty rewards. It also includes a restaurant partner dashboard for managing incoming orders and viewing mock sales analytics.

## Features

### Customer experience

- Home page with a promotional hero section, featured dishes, food categories, and nearby restaurants.
- Restaurant discovery with text search, cuisine filters, rating filters, delivery-time filters, free-delivery filtering, and sorting by popularity, rating, speed, or delivery fee.
- Restaurant detail modal with cover image, restaurant information, delivery details, menu search, vegetarian-only filtering, and customer reviews.
- Food cards with pricing, ratings, preparation time, dietary badges, spicy and bestseller labels, favorites, quantity controls, and add-to-cart actions.
- Item customization for supported dishes, including portion or size selection, add-ons, special instructions, and quantity selection.
- Cart drawer with item editing, removal, clear-cart confirmation, subtotal, delivery fee, tax, tip, discount, free-delivery progress, and coupon handling.
- Checkout form with contact information, saved delivery presets, apartment or floor details, delivery notes, payment method selection, validation, and order confirmation feedback.
- Live order tracking with delivery status milestones, simulated driver movement, ETA updates, driver contact actions, in-app driver messaging, receipt printing, and order-stage controls for demonstration.
- Order history with order status, item summaries, order totals, live tracking access, and reorder actions.
- Favorites view for quickly revisiting saved restaurants and dishes.
- Profile settings for personal information, dietary preferences, saved addresses, delivery location, and display currency.
- Loyalty rewards with points, membership tier progress, redeemable vouchers, tier perks, and referral-link copying.
- Notification center for promotions, rewards, profile updates, order events, and driver messages.

### Restaurant partner experience

- Partner Hub with restaurant status controls and a kitchen-oriented order terminal.
- Incoming order list with order details, customer information, kitchen notes, status updates, and stage filters.
- Mock sales and demand analytics with weekly revenue and order trends.
- Add-dish flow that publishes a demo menu notification.
- Restaurant performance indicators such as revenue, live orders, preparation speed, and quality score.

## How the application works

The application is a client-side demo powered by mock restaurant, menu, order, profile, loyalty, and notification data in `src/data/mockData.ts`. Shared application state is managed by `FoodDeliveryContext` and consumed by the page and modal components.

The following state is persisted in the browser's local storage:

- Cart contents
- Favorites
- Order history
- Loyalty account
- User profile and saved addresses

Checkout, payments, restaurant operations, GPS tracking, notifications, and analytics are simulated locally for demonstration purposes. No real payment, delivery, authentication, or backend order service is connected.

## Technology stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4 with the Vite plugin
- Lucide React icons
- Motion animations
- Canvas Confetti for order confirmation
- Unsplash image URLs for demo food and profile imagery

## Project structure

```text
src/
	App.tsx                    Main application shell and view routing
	types.ts                   Shared TypeScript models
	index.css                  Global styles and Tailwind entry styles
	components/                Customer, partner, modal, and navigation UI
	context/                   Shared cart, order, profile, and app state
	data/                      Mock restaurants, menu items, rewards, and coupons
```

## Run Locally

Prerequisites: Node.js 18 or newer

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available scripts

```bash
npm run dev       # Start the Vite development server on port 3000
npm run lint      # Run the TypeScript compiler without emitting files
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
```

## Development notes

- The development server listens on `0.0.0.0:3000`, making it accessible from other devices on the local network.
- Food and restaurant images are loaded from Unsplash and require an internet connection.
- The app starts with sample favorites, loyalty points, notifications, and an active order so the main workflows are visible immediately.
- Browser local storage can be cleared to reset the demo state.
