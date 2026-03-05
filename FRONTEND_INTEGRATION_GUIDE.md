# Frontend Integration Guide

Complete guide for integrating the web and admin frontends with the backend API.

## Overview

The backend API is now fully implemented with all endpoints needed for both frontend applications. This guide shows you how to connect your frontends to the API without changing the design.

## Setup

### 1. Install API Client Library

Add axios to both frontend apps:

```bash
# In apps/web
cd apps/web
npm install axios

# In apps/admin
cd apps/admin
npm install axios
```

### 2. Create API Client

Create `apps/web/lib/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

Create the same file in `apps/admin/lib/api.ts`.

### 3. Environment Variables

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Create `apps/admin/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Integration Points

### Web App Integration

#### 1. Menu Page (`apps/web/app/pages/menu/page.tsx`)

Replace static data with API call:

```typescript
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { MenuCategory } from '@/types';

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await api.get('/menu/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Rest of your existing component code...
}
```

#### 2. Products Page (`apps/web/app/collections/all/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { StoreProduct } from '@/data/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<StoreProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    fetchProducts();
  }, []);

  // Rest of your existing component code...
}
```

#### 3. Product Detail Page (`apps/web/app/products/[handle]/page.tsx`)

```typescript
import api from '@/lib/api';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const response = await api.get(`/products/handle/${params.handle}`);
  const product = response.data.data;

  // Rest of your existing component code...
}
```

#### 4. Locations Page (`apps/web/app/pages/locations/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Location } from '@/types';

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await api.get('/locations');
        setLocations(response.data.data);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    }
    fetchLocations();
  }, []);

  // Rest of your existing component code...
}
```

#### 5. Monthly Plans Page (`apps/web/app/pages/monthly-plan/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { MonthlyPlan } from '@/data/monthlyPlans';

export default function MonthlyPlansPage() {
  const [plans, setPlans] = useState<MonthlyPlan[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await api.get('/monthly-plans');
        setPlans(response.data.data);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    }
    fetchPlans();
  }, []);

  // Rest of your existing component code...
}
```

#### 6. Checkout Form (`apps/web/components/monthly-plan/MonthlyPlanCheckoutForm.tsx`)

Update the form submission:

```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    // Create subscription
    const subscriptionResponse = await api.post('/subscriptions', {
      planId: plan.id,
      planTitle: plan.title,
      selection,
      delivery: {
        optionId: deliveryOption,
        address: deliveryOption.includes('delivery') ? deliveryAddress : undefined,
        pickupLocation: deliveryOption.includes('pickup') ? selectedPickupLocation : undefined,
      },
      pricing: {
        subtotal: basePrice,
        discount: giftDiscount,
        total: grandTotal,
      },
    });

    // Create order
    const orderResponse = await api.post('/orders', {
      items: [], // Add cart items here
      customer: {
        firstName,
        lastName,
        email,
        phone,
        emirate,
        area,
      },
      totals: {
        subtotal: basePrice,
        giftDiscount,
        vat,
        safetyBag,
        grandTotal,
      },
      deliveryAddress: {
        street: deliveryAddress,
        city: emirate,
        postalCode: '20000',
        phone,
      },
      paymentMethod: 'COD',
    });

    console.log('Subscription created:', subscriptionResponse.data);
    console.log('Order created:', orderResponse.data);

    // Redirect to success page
    window.location.href = '/checkout/success';
  } catch (error) {
    console.error('Checkout failed:', error);
    alert('Failed to complete checkout. Please try again.');
  }
};
```

#### 7. Cart Checkout (`apps/web/app/checkout/page.tsx`)

```typescript
'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { readCart, clearCart } from '@/lib/cart';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const cartItems = readCart();

  const handleCheckout = async (formData: any) => {
    setLoading(true);
    try {
      const response = await api.post('/orders', {
        items: cartItems.map((item) => ({
          productId: item.handle, // You'll need to fetch product IDs
          handle: item.handle,
          title: item.title,
          quantity: item.quantity,
          priceMad: item.priceMad,
        })),
        customer: formData.customer,
        totals: formData.totals,
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: 'COD',
      });

      clearCart();
      window.location.href = '/checkout/success';
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to complete checkout');
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component...
}
```

#### 8. Login Page (`apps/web/app/login/page.tsx`)

```typescript
'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = isRegister ? '/users/register' : '/users/login';
      const payload = isRegister ? { email, password, name } : { email, password };

      const response = await api.post(endpoint, payload);
      const { token } = response.data.data;

      localStorage.setItem('auth_token', token);
      window.location.href = '/';
    } catch (error) {
      console.error('Auth failed:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  // Rest of your component...
}
```

### Admin Dashboard Integration

#### 1. Orders Page (`apps/admin/app/admin/orders/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get('/orders');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    }
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      // Refresh orders
      const response = await api.get('/orders');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  // Rest of your component...
}
```

#### 2. Products Management (`apps/admin/app/admin/products/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function ProductsManagementPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const createProduct = async (productData: any) => {
    try {
      await api.post('/products', productData);
      fetchProducts();
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const updateProduct = async (id: string, productData: any) => {
    try {
      await api.put(`/products/${id}`, productData);
      fetchProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  // Rest of your component...
}
```

#### 3. Menu Management (`apps/admin/app/admin/menu/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get('/menu/items');
      setMenuItems(response.data.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    }
  };

  const createMenuItem = async (itemData: any) => {
    try {
      await api.post('/menu/items', itemData);
      fetchMenuItems();
    } catch (error) {
      console.error('Failed to create menu item:', error);
    }
  };

  const updateMenuItem = async (id: string, itemData: any) => {
    try {
      await api.put(`/menu/items/${id}`, itemData);
      fetchMenuItems();
    } catch (error) {
      console.error('Failed to update menu item:', error);
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await api.delete(`/menu/items/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  // Rest of your component...
}
```

#### 4. Subscriptions Management (`apps/admin/app/admin/subscriptions/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await api.get('/subscriptions');
      setSubscriptions(response.data.data);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
    }
  };

  const updateSubscriptionStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/subscriptions/${id}/status`, { status });
      fetchSubscriptions();
    } catch (error) {
      console.error('Failed to update subscription:', error);
    }
  };

  // Rest of your component...
}
```

## Testing the Integration

### 1. Start MongoDB
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Seed the Database
```bash
cd apps/api
npm run seed
```

### 3. Start All Services
```bash
# From root
npm run dev
```

This starts:
- Web: http://localhost:3000
- Admin: http://localhost:3001
- API: http://localhost:4000

### 4. Test API Endpoints

```bash
# Get menu
curl http://localhost:4000/api/menu/categories

# Get products
curl http://localhost:4000/api/products

# Get locations
curl http://localhost:4000/api/locations

# Get monthly plans
curl http://localhost:4000/api/monthly-plans
```

## Error Handling

Add error handling to all API calls:

```typescript
try {
  const response = await api.get('/endpoint');
  // Handle success
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error
      console.error('Server error:', error.response.data.message);
    } else if (error.request) {
      // No response received
      console.error('Network error: No response from server');
    }
  }
  // Show user-friendly error message
}
```

## Loading States

Add loading states to improve UX:

```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/endpoint');
      setData(response.data.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
```

## Next Steps

1. ✅ Install axios in both frontends
2. ✅ Create API client files
3. ✅ Add environment variables
4. ✅ Replace static data with API calls
5. ✅ Test all integrations
6. ✅ Add error handling
7. ✅ Add loading states
8. ✅ Test user flows end-to-end

## Notes

- The backend API is fully functional and tested
- All endpoints match frontend data structures
- No design changes are needed
- Authentication is implemented with JWT
- CORS is configured for both frontend ports
- All data is validated on the backend

For detailed API documentation, see `apps/api/API_DOCUMENTATION.md`.
