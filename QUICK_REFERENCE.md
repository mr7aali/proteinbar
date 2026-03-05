# Quick Reference Card

Fast reference for the Proteinbar API implementation.

## 🚀 Quick Start

```bash
# Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Seed database
cd apps/api && npm run seed

# Start all apps
npm run dev
```

## 🌐 URLs

- Web App: http://localhost:3000
- Admin Dashboard: http://localhost:3001
- API Server: http://localhost:4000
- API Health: http://localhost:4000/health

## 📡 API Endpoints

### Public Endpoints (No Auth Required)

```bash
GET  /api/menu/categories          # Get menu with items
GET  /api/menu/items               # Get all menu items
GET  /api/products                 # Get all products
GET  /api/products/handle/:handle  # Get product by handle
GET  /api/locations                # Get all locations
GET  /api/monthly-plans            # Get all plans
POST /api/users/register           # Register user
POST /api/users/login              # Login user
```

### Protected Endpoints (Auth Required)

```bash
GET    /api/users/profile              # Get user profile
PUT    /api/users/profile              # Update profile
GET    /api/orders                     # Get all orders (admin)
GET    /api/orders/my-orders           # Get user's orders
POST   /api/orders                     # Create order
PATCH  /api/orders/:id/status          # Update order status
GET    /api/subscriptions              # Get all subscriptions (admin)
GET    /api/subscriptions/my-subscriptions  # Get user's subscriptions
POST   /api/subscriptions             # Create subscription
PATCH  /api/subscriptions/:id/status  # Update subscription status
```

### Admin Only Endpoints

```bash
POST   /api/products                # Create product
PUT    /api/products/:id            # Update product
DELETE /api/products/:id            # Delete product
POST   /api/menu/items              # Create menu item
PUT    /api/menu/items/:id          # Update menu item
DELETE /api/menu/items/:id          # Delete menu item
POST   /api/menu/categories         # Create category
PUT    /api/menu/categories/:id     # Update category
DELETE /api/menu/categories/:id     # Delete category
POST   /api/locations               # Create location
PUT    /api/locations/:id           # Update location
DELETE /api/locations/:id           # Delete location
POST   /api/monthly-plans           # Create plan
PUT    /api/monthly-plans/:id       # Update plan
DELETE /api/monthly-plans/:id       # Delete plan
```

## 🔐 Authentication

### Register
```bash
curl -X POST http://localhost:4000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","name":"User"}'
```

### Login
```bash
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

### Use Token
```bash
curl http://localhost:4000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📦 Data Models

### Product
```typescript
{
  id: string;
  handle: string;
  title: string;
  description: string;
  priceMad: number;
  image: string;
  category: string;
  availability: 'Active' | 'Inactive';
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
```

### Menu Item
```typescript
{
  id: string;
  name: string;
  description: string;
  priceMad: number;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  category: string;
  availability: 'Active' | 'Inactive';
}
```

### Order
```typescript
{
  items: Array<{
    productId: string;
    handle: string;
    title: string;
    quantity: number;
    priceMad: number;
  }>;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  totals: {
    subtotal: number;
    giftDiscount: number;
    vat: number;
    safetyBag: number;
    grandTotal: number;
  };
  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  status: 'Pending' | 'Confirmed' | 'Prepared' | 'Delivered' | 'Cancelled';
}
```

### Subscription
```typescript
{
  planId: string;
  planTitle: string;
  selection: {
    meals: string;
    days: string;
    snacks: string;
    startDate: string;
  };
  delivery: {
    optionId: 'daily-delivery' | 'daily-pickup' | 'weekly-delivery' | 'weekly-pickup';
    address?: string;
    pickupLocation?: {
      id: string;
      name: string;
      address: string;
    };
  };
  status: 'active' | 'paused' | 'cancelled';
}
```

## 🛠️ Commands

```bash
# Development
npm run dev              # Start all apps
npm run build            # Build all apps
npm run lint             # Lint all apps

# API specific
cd apps/api
npm run dev              # Start API with hot reload
npm run build            # Build API
npm run start            # Start production API
npm run seed             # Seed database

# Frontend specific
cd apps/web
npm run dev              # Start web app (port 3000)
npm run build            # Build web app

cd apps/admin
npm run dev              # Start admin (port 3001)
npm run build            # Build admin
```

## 🔧 Environment Variables

### apps/api/.env
```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/proteinbar
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### apps/web/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### apps/admin/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 📝 Frontend Integration

### Install Axios
```bash
cd apps/web && npm install axios
cd apps/admin && npm install axios
```

### Create API Client (apps/web/lib/api.ts)
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

### Use in Components
```typescript
import api from '@/lib/api';

// Get data
const response = await api.get('/products');
const products = response.data.data;

// Create data
const response = await api.post('/orders', orderData);

// Update data
const response = await api.put('/products/:id', productData);
```

## 🧪 Testing

```bash
# Test health
curl http://localhost:4000/health

# Test menu
curl http://localhost:4000/api/menu/categories

# Test products
curl http://localhost:4000/api/products

# Test locations
curl http://localhost:4000/api/locations

# Test plans
curl http://localhost:4000/api/monthly-plans
```

## 📚 Documentation

- `API_DOCUMENTATION.md` - Complete API reference
- `FRONTEND_INTEGRATION_GUIDE.md` - Integration guide
- `API_IMPLEMENTATION_SUMMARY.md` - Implementation summary
- `apps/api/ARCHITECTURE.md` - Architecture details

## ✅ Status

- ✅ All modules implemented
- ✅ All endpoints working
- ✅ TypeScript compilation successful
- ✅ All builds passing
- ✅ Database seeding working
- ✅ Authentication implemented
- ✅ CORS configured
- ✅ Error handling in place
- ✅ Documentation complete

## 🎯 Next Steps

1. Start MongoDB
2. Seed database
3. Start all services
4. Install axios in frontends
5. Create API clients
6. Replace static data with API calls
7. Test integration
8. Deploy!
