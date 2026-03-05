# Proteinbar API Documentation

Complete API reference for the Proteinbar backend.

## Base URL
```
http://localhost:4000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Users API

### Register User
```http
POST /api/users/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "...",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login User
```http
POST /api/users/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get User Profile
```http
GET /api/users/profile
```
**Auth Required:** Yes

### Update User Profile
```http
PUT /api/users/profile
```
**Auth Required:** Yes

**Body:**
```json
{
  "name": "John Updated",
  "phone": "+212-123-456-789",
  "address": {
    "street": "123 Main St",
    "city": "Casablanca",
    "postalCode": "20000"
  }
}
```

---

## Products API

### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "compose-plate",
      "handle": "im-composing",
      "title": "I'm composing!",
      "description": "Build your own protein plate",
      "priceMad": 0,
      "image": "/food/food.png",
      "category": "custom",
      "availability": "Active",
      "nutritionalInfo": {
        "calories": 500,
        "protein": 40,
        "carbs": 50,
        "fat": 15
      }
    }
  ]
}
```

### Get Product by ID
```http
GET /api/products/:id
```

### Get Product by Handle
```http
GET /api/products/handle/:handle
```

### Create Product
```http
POST /api/products
```
**Auth Required:** Yes

**Body:**
```json
{
  "id": "new-product",
  "handle": "new-product-handle",
  "title": "New Product",
  "description": "Product description",
  "priceMad": 90,
  "image": "/food/food.png",
  "category": "Lunch",
  "nutritionalInfo": {
    "calories": 450,
    "protein": 35,
    "carbs": 40,
    "fat": 12
  },
  "allergens": ["dairy"],
  "tags": ["high-protein"]
}
```

### Update Product
```http
PUT /api/products/:id
```
**Auth Required:** Yes

### Delete Product
```http
DELETE /api/products/:id
```
**Auth Required:** Yes

---

## Menu API

### Get All Menu Items
```http
GET /api/menu/items
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "leggs-day",
      "name": "L'EGGS DAY",
      "description": "Omelette with spinach and cherry tomatoes",
      "priceMad": 45,
      "calories": 794,
      "protein": 48,
      "carbs": 52,
      "fat": 38,
      "category": "Breakfast",
      "availability": "Active"
    }
  ]
}
```

### Get Menu Item by ID
```http
GET /api/menu/items/:id
```

### Create Menu Item
```http
POST /api/menu/items
```
**Auth Required:** Yes

### Update Menu Item
```http
PUT /api/menu/items/:id
```
**Auth Required:** Yes

### Delete Menu Item
```http
DELETE /api/menu/items/:id
```
**Auth Required:** Yes

### Get All Categories
```http
GET /api/menu/categories
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "high-protein-breakfast",
      "name": "BREAKFAST",
      "description": "Petits Déjeuners",
      "items": [...],
      "displayOrder": 1,
      "isVisible": true
    }
  ]
}
```

### Get Category by ID
```http
GET /api/menu/categories/:id
```

### Create Category
```http
POST /api/menu/categories
```
**Auth Required:** Yes

### Update Category
```http
PUT /api/menu/categories/:id
```
**Auth Required:** Yes

### Delete Category
```http
DELETE /api/menu/categories/:id
```
**Auth Required:** Yes

---

## Locations API

### Get All Locations
```http
GET /api/locations
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "anfa-casablanca",
      "name": "PROTEINBAR - Bourgone",
      "address": "7 Rue Ibnou Jahir, Casablanca",
      "phone": "0520-206366",
      "mapUrl": "https://maps.google.com/?q=...",
      "city": "Casablanca",
      "isActive": true
    }
  ]
}
```

### Get Location by ID
```http
GET /api/locations/:id
```

### Create Location
```http
POST /api/locations
```
**Auth Required:** Yes

**Body:**
```json
{
  "id": "new-location",
  "name": "PROTEINBAR - New Branch",
  "address": "123 Street Name, City",
  "phone": "0520-123456",
  "mapUrl": "https://maps.google.com/?q=...",
  "city": "Casablanca",
  "deliveryZones": ["Zone A", "Zone B"],
  "timeSlots": ["12:00-14:00", "18:00-20:00"]
}
```

### Update Location
```http
PUT /api/locations/:id
```
**Auth Required:** Yes

### Delete Location
```http
DELETE /api/locations/:id
```
**Auth Required:** Yes

---

## Monthly Plans API

### Get All Plans
```http
GET /api/monthly-plans
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "custom-plan",
      "title": "Custom Plan",
      "description": "Build your own monthly subscription",
      "image": "/food/food.png",
      "pricing": {
        "basePrice": 0,
        "mealPrice": 18,
        "snackPrice": 8
      },
      "isActive": true
    }
  ]
}
```

### Get Plan by ID
```http
GET /api/monthly-plans/:id
```

### Create Plan
```http
POST /api/monthly-plans
```
**Auth Required:** Yes

**Body:**
```json
{
  "id": "new-plan",
  "title": "New Plan",
  "description": "Plan description",
  "image": "/food/food.png",
  "badge": "NEW",
  "pricing": {
    "basePrice": 100,
    "mealPrice": 20,
    "snackPrice": 10
  },
  "features": ["Feature 1", "Feature 2"]
}
```

### Update Plan
```http
PUT /api/monthly-plans/:id
```
**Auth Required:** Yes

### Delete Plan
```http
DELETE /api/monthly-plans/:id
```
**Auth Required:** Yes

---

## Subscriptions API

All subscription endpoints require authentication.

### Get All Subscriptions
```http
GET /api/subscriptions
```
**Auth Required:** Yes (Admin)

### Get User's Subscriptions
```http
GET /api/subscriptions/my-subscriptions
```
**Auth Required:** Yes

### Get Subscription by ID
```http
GET /api/subscriptions/:id
```
**Auth Required:** Yes

### Create Subscription
```http
POST /api/subscriptions
```
**Auth Required:** Yes

**Body:**
```json
{
  "planId": "custom-plan",
  "planTitle": "Custom Plan",
  "selection": {
    "meals": "2",
    "days": "7",
    "snacks": "1",
    "startDate": "2026-03-10",
    "planType": "custom"
  },
  "delivery": {
    "optionId": "daily-delivery",
    "address": "123 Main St, Casablanca"
  },
  "pricing": {
    "subtotal": 308,
    "discount": 0,
    "total": 308
  }
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "...",
    "userId": "...",
    "planId": "custom-plan",
    "status": "active",
    "createdAt": "2026-03-06T..."
  }
}
```

### Update Subscription
```http
PUT /api/subscriptions/:id
```
**Auth Required:** Yes

### Update Subscription Status
```http
PATCH /api/subscriptions/:id/status
```
**Auth Required:** Yes

**Body:**
```json
{
  "status": "paused"
}
```

### Delete Subscription
```http
DELETE /api/subscriptions/:id
```
**Auth Required:** Yes

---

## Orders API

All order endpoints require authentication.

### Get All Orders
```http
GET /api/orders
```
**Auth Required:** Yes (Admin)

### Get User's Orders
```http
GET /api/orders/my-orders
```
**Auth Required:** Yes

### Get Order by ID
```http
GET /api/orders/:id
```
**Auth Required:** Yes

### Create Order
```http
POST /api/orders
```
**Auth Required:** Yes

**Body:**
```json
{
  "items": [
    {
      "productId": "...",
      "handle": "keto-avocado-burger",
      "title": "Keto avocado burger",
      "quantity": 2,
      "priceMad": 90
    }
  ],
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+212-123-456-789",
    "emirate": "Casablanca",
    "area": "Anfa"
  },
  "totals": {
    "subtotal": 180,
    "giftDiscount": 0,
    "vat": 18,
    "safetyBag": 5,
    "grandTotal": 203
  },
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Casablanca",
    "postalCode": "20000",
    "phone": "+212-123-456-789"
  },
  "paymentMethod": "COD"
}
```

### Update Order Status
```http
PATCH /api/orders/:id/status
```
**Auth Required:** Yes

**Body:**
```json
{
  "status": "Confirmed"
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Data Seeding

To populate the database with initial data, run:

```bash
npm run seed
```

This will create:
- Sample menu items and categories
- Store products
- Locations
- Monthly plans

---

## Testing with cURL

### Register and Login
```bash
# Register
curl -X POST http://localhost:4000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:4000/api/products
```

### Get Menu
```bash
curl http://localhost:4000/api/menu/categories
```

### Get Locations
```bash
curl http://localhost:4000/api/locations
```

### Create Order (with auth)
```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "items": [...],
    "customer": {...},
    "totals": {...},
    "deliveryAddress": {...}
  }'
```

---

## Frontend Integration

### Web App Integration Points

1. **Menu Page** → `GET /api/menu/categories`
2. **Products Page** → `GET /api/products`
3. **Product Detail** → `GET /api/products/handle/:handle`
4. **Locations** → `GET /api/locations`
5. **Monthly Plans** → `GET /api/monthly-plans`
6. **Checkout** → `POST /api/orders`
7. **Subscription** → `POST /api/subscriptions`

### Admin Dashboard Integration Points

1. **Orders Management** → `GET /api/orders`
2. **Products Management** → CRUD on `/api/products`
3. **Menu Management** → CRUD on `/api/menu/items` and `/api/menu/categories`
4. **Subscriptions** → `GET /api/subscriptions`
5. **Locations** → CRUD on `/api/locations`

---

## Environment Variables

Required in `apps/api/.env`:

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/proteinbar
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```
