# Architecture Overview

Visual overview of the Proteinbar monorepo architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Turborepo Monorepo                        │
│                     (proteinbar-monorepo)                        │
└─────────────────────────────────────────────────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │   apps/web   │ │  apps/admin  │ │   apps/api   │
        │  (Next.js)   │ │  (Next.js)   │ │  (Express)   │
        │  Port 3000   │ │  Port 3001   │ │  Port 4000   │
        └──────────────┘ └──────────────┘ └──────────────┘
                │                │                │
                └────────────────┼────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │    MongoDB      │
                        │   Port 27017    │
                        └─────────────────┘
```

## Application Flow

```
┌──────────────┐
│   Customer   │
└──────┬───────┘
       │
       │ HTTP Request
       ▼
┌──────────────────────────────────────────────────────────┐
│                    apps/web (Next.js)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│  │   Pages    │  │ Components │  │    Data    │         │
│  │  (Routes)  │  │   (UI)     │  │  (Static)  │         │
│  └────────────┘  └────────────┘  └────────────┘         │
└──────────────────────────┬───────────────────────────────┘
                           │
                           │ API Calls
                           ▼
┌──────────────────────────────────────────────────────────┐
│                   apps/api (Express)                      │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Middleware Layer                    │    │
│  │  • CORS  • Helmet  • Auth  • Error Handler      │    │
│  └─────────────────────────────────────────────────┘    │
│                           │                              │
│  ┌────────────────────────┼──────────────────────────┐  │
│  │                    Routes                         │  │
│  │  /api/users  /api/products  /api/orders          │  │
│  └────────────────────────┼──────────────────────────┘  │
│                           │                              │
│  ┌────────────────────────┼──────────────────────────┐  │
│  │                   Controllers                     │  │
│  │  • Handle HTTP  • Validate  • Format Response    │  │
│  └────────────────────────┼──────────────────────────┘  │
│                           │                              │
│  ┌────────────────────────┼──────────────────────────┐  │
│  │                    Services                       │  │
│  │  • Business Logic  • Data Processing             │  │
│  └────────────────────────┼──────────────────────────┘  │
│                           │                              │
│  ┌────────────────────────┼──────────────────────────┐  │
│  │                     Models                        │  │
│  │  • Schema  • Validation  • DB Operations         │  │
│  └────────────────────────┼──────────────────────────┘  │
└────────────────────────────┼──────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    MongoDB      │
                    │  • Users        │
                    │  • Products     │
                    │  • Orders       │
                    └─────────────────┘
```

## Admin Dashboard Flow

```
┌──────────────┐
│    Admin     │
└──────┬───────┘
       │
       │ HTTP Request
       ▼
┌──────────────────────────────────────────────────────────┐
│                  apps/admin (Next.js)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│  │   Admin    │  │ Components │  │    Data    │         │
│  │   Pages    │  │   (UI)     │  │Management  │         │
│  └────────────┘  └────────────┘  └────────────┘         │
└──────────────────────────┬───────────────────────────────┘
                           │
                           │ API Calls
                           ▼
                    apps/api (Express)
                           │
                           ▼
                       MongoDB
```

## Module Structure (Backend)

```
apps/api/src/
│
├── config/
│   ├── index.ts              # Environment configuration
│   └── database.ts           # MongoDB connection
│
├── middlewares/
│   ├── index.ts              # Middleware setup
│   ├── auth.ts               # JWT authentication
│   └── errorHandler.ts       # Error handling
│
├── modules/
│   ├── users/
│   │   ├── model.ts          # User schema & methods
│   │   ├── service.ts        # User business logic
│   │   ├── controller.ts     # HTTP handlers
│   │   └── routes.ts         # User endpoints
│   │
│   ├── products/
│   │   ├── model.ts          # Product schema
│   │   ├── service.ts        # Product logic
│   │   ├── controller.ts     # HTTP handlers
│   │   └── routes.ts         # Product endpoints
│   │
│   └── orders/
│       ├── model.ts          # Order schema
│       ├── service.ts        # Order logic
│       ├── controller.ts     # HTTP handlers
│       └── routes.ts         # Order endpoints
│
├── routes/
│   └── index.ts              # Route aggregation
│
└── index.ts                  # Application entry point
```

## Request Flow (Detailed)

```
1. Client Request
   │
   ▼
2. Express Middleware
   ├─ CORS Check
   ├─ Helmet Security Headers
   ├─ Body Parser
   └─ Authentication (if required)
   │
   ▼
3. Route Handler
   │
   ▼
4. Controller
   ├─ Extract request data
   ├─ Validate input
   └─ Call service
   │
   ▼
5. Service
   ├─ Business logic
   ├─ Data processing
   └─ Call model
   │
   ▼
6. Model
   ├─ Schema validation
   ├─ Database operation
   └─ Return data
   │
   ▼
7. Response Flow (reverse)
   Model → Service → Controller → Client
   │
   ▼
8. Error Handler (if error occurs)
   └─ Format error response
```

## Authentication Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ POST /api/users/register or /api/users/login
       ▼
┌──────────────────────────────────────────┐
│         User Controller                   │
│  • Validate credentials                   │
│  • Call user service                      │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│         User Service                      │
│  • Check user exists                      │
│  • Hash password (register)               │
│  • Compare password (login)               │
│  • Generate JWT token                     │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│         User Model                        │
│  • Save to MongoDB                        │
│  • Return user data                       │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│         Response                          │
│  {                                        │
│    "status": "success",                   │
│    "data": {                              │
│      "user": { ... },                     │
│      "token": "eyJhbGc..."                │
│    }                                      │
│  }                                        │
└──────┬───────────────────────────────────┘
       │
       ▼
┌─────────────┐
│   Client    │
│ Stores Token│
└──────┬──────┘
       │
       │ Subsequent requests with:
       │ Authorization: Bearer <token>
       ▼
┌──────────────────────────────────────────┐
│      Auth Middleware                      │
│  • Extract token from header              │
│  • Verify JWT signature                   │
│  • Decode user ID                         │
│  • Attach to request                      │
└──────┬───────────────────────────────────┘
       │
       ▼
   Protected Route
```

## Data Models

```
┌─────────────────────────────────────────┐
│              User Model                  │
├─────────────────────────────────────────┤
│ • _id: ObjectId                          │
│ • email: String (unique)                 │
│ • password: String (hashed)              │
│ • name: String                           │
│ • role: 'customer' | 'admin'             │
│ • phone: String (optional)               │
│ • address: Object (optional)             │
│ • createdAt: Date                        │
│ • updatedAt: Date                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│            Product Model                 │
├─────────────────────────────────────────┤
│ • _id: ObjectId                          │
│ • name: String                           │
│ • description: String                    │
│ • price: Number                          │
│ • category: String                       │
│ • image: String                          │
│ • inStock: Boolean                       │
│ • nutritionalInfo: Object (optional)     │
│   ├─ calories: Number                    │
│   ├─ protein: Number                     │
│   ├─ carbs: Number                       │
│   └─ fat: Number                         │
│ • createdAt: Date                        │
│ • updatedAt: Date                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│             Order Model                  │
├─────────────────────────────────────────┤
│ • _id: ObjectId                          │
│ • userId: ObjectId (ref: User)           │
│ • items: Array                           │
│   ├─ productId: ObjectId (ref: Product)  │
│   ├─ quantity: Number                    │
│   └─ price: Number                       │
│ • totalAmount: Number                    │
│ • status: String                         │
│   ('pending' | 'confirmed' |             │
│    'preparing' | 'delivered' |           │
│    'cancelled')                          │
│ • deliveryAddress: Object                │
│   ├─ street: String                      │
│   ├─ city: String                        │
│   ├─ postalCode: String                  │
│   └─ phone: String                       │
│ • createdAt: Date                        │
│ • updatedAt: Date                        │
└─────────────────────────────────────────┘
```

## Shared Packages

```
packages/
│
├── typescript-config/
│   ├── base.json          # Base TS config
│   ├── nextjs.json        # Next.js specific
│   └── node.json          # Node.js specific
│
└── eslint-config/
    └── package.json       # ESLint config
```

## Technology Stack

```
┌─────────────────────────────────────────┐
│            Frontend Stack                │
├─────────────────────────────────────────┤
│ • Next.js 16.1.6                         │
│ • React 19.2.3                           │
│ • TypeScript 5.x                         │
│ • Tailwind CSS 4.x                       │
│ • ESLint 9.x                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│            Backend Stack                 │
├─────────────────────────────────────────┤
│ • Express.js 4.18.x                      │
│ • TypeScript 5.x                         │
│ • MongoDB (Mongoose 8.x)                 │
│ • JWT (jsonwebtoken 9.x)                 │
│ • bcryptjs 2.4.x                         │
│ • Helmet 7.x                             │
│ • CORS 2.8.x                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          Build & Dev Tools               │
├─────────────────────────────────────────┤
│ • Turborepo 2.x                          │
│ • npm workspaces                         │
│ • tsx (TypeScript execution)             │
│ • Prettier 3.x                           │
└─────────────────────────────────────────┘
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                         │
└────────────┬────────────────────────────┬────────────────┘
             │                            │
    ┌────────▼────────┐          ┌───────▼────────┐
    │   Web Server    │          │  Admin Server  │
    │   (Vercel)      │          │   (Vercel)     │
    └────────┬────────┘          └───────┬────────┘
             │                            │
             └────────────┬───────────────┘
                          │
                 ┌────────▼────────┐
                 │   API Server    │
                 │  (AWS/Heroku)   │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │  MongoDB Atlas  │
                 │    (Cloud)      │
                 └─────────────────┘
```

## Security Layers

```
1. Network Layer
   └─ HTTPS/TLS encryption

2. Application Layer
   ├─ Helmet security headers
   ├─ CORS configuration
   └─ Rate limiting (future)

3. Authentication Layer
   ├─ JWT tokens
   ├─ Password hashing (bcrypt)
   └─ Token expiration

4. Authorization Layer
   ├─ Role-based access
   └─ Resource ownership checks

5. Data Layer
   ├─ Input validation
   ├─ Schema validation
   └─ SQL injection prevention (NoSQL)
```

## Performance Optimization

```
┌─────────────────────────────────────────┐
│         Turborepo Caching                │
│  • Build cache                           │
│  • Task dependency graph                 │
│  • Parallel execution                    │
└─────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│         Next.js Optimization             │
│  • Static generation                     │
│  • Image optimization                    │
│  • Code splitting                        │
│  • Tree shaking                          │
└─────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│         Database Optimization            │
│  • Indexes on queries                    │
│  • Connection pooling                    │
│  • Query optimization                    │
└─────────────────────────────────────────┘
```

---

This architecture provides:
- ✅ Scalability
- ✅ Maintainability
- ✅ Type safety
- ✅ Security
- ✅ Performance
- ✅ Developer experience
