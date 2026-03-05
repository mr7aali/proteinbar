# Quick Start Guide

Your Turborepo monorepo is now set up! Here's how to get started.

## ✅ What's Been Done

1. ✅ Created Turborepo monorepo structure
2. ✅ Moved `proteinbar` → `apps/web`
3. ✅ Moved `proteinbar_admin_dashboard` → `apps/admin`
4. ✅ Created Express/MongoDB/TypeScript backend at `apps/api`
5. ✅ Set up shared packages for TypeScript configs
6. ✅ Installed all dependencies

## 🚀 Getting Started

### 1. Set Up MongoDB

You need MongoDB running. Choose one option:

**Option A: Docker (Recommended)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: Local Installation**
Download from: https://www.mongodb.com/try/download/community

### 2. Configure Environment

The `.env` file has been created at `apps/api/.env`. Update it if needed:

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/proteinbar
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### 3. Start Development

Run all apps simultaneously:

```bash
npm run dev
```

This starts:
- 🌐 Web App: http://localhost:3000
- 👨‍💼 Admin Dashboard: http://localhost:3001
- 🔌 API Server: http://localhost:4000

### 4. Test the API

Health check:
```bash
curl http://localhost:4000/health
```

Register a user:
```bash
curl -X POST http://localhost:4000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## 📁 Project Structure

```
proteinbar-monorepo/
├── apps/
│   ├── web/                    # Customer-facing Next.js app (port 3000)
│   ├── admin/                  # Admin dashboard Next.js app (port 3001)
│   └── api/                    # Express backend (port 4000)
│       ├── src/
│       │   ├── config/         # Configuration
│       │   ├── middlewares/    # Express middlewares
│       │   ├── modules/        # Feature modules
│       │   │   ├── products/   # Product CRUD
│       │   │   ├── orders/     # Order management
│       │   │   └── users/      # User auth
│       │   └── routes/         # Route aggregation
│       └── package.json
├── packages/
│   └── typescript-config/      # Shared TS configs
├── package.json                # Root workspace config
└── turbo.json                  # Turborepo pipeline config
```

## 🛠️ Available Commands

```bash
# Development (all apps)
npm run dev

# Build all apps
npm run build

# Lint all apps
npm run lint

# Clean build artifacts
npm run clean

# Format code
npm run format
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get profile (requires auth)
- `PUT /api/users/profile` - Update profile (requires auth)

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Orders
- `GET /api/orders` - List all orders (requires auth)
- `GET /api/orders/my-orders` - Get user's orders (requires auth)
- `GET /api/orders/:id` - Get order details (requires auth)
- `POST /api/orders` - Create order (requires auth)
- `PATCH /api/orders/:id/status` - Update order status (requires auth)

## 🔐 Authentication

The API uses JWT tokens. After login/register, you'll receive a token:

```json
{
  "status": "success",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

Include this token in subsequent requests:

```bash
curl http://localhost:4000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📝 Next Steps

1. **Connect Frontend to Backend**: Update your Next.js apps to call the API endpoints
2. **Add More Features**: Extend the modules with additional functionality
3. **Set Up CI/CD**: Configure deployment pipelines
4. **Add Tests**: Write unit and integration tests
5. **Environment Variables**: Set up production environment configs

## 🐛 Troubleshooting

### Port Already in Use
Change ports in package.json scripts or .env file

### MongoDB Connection Failed
- Check if MongoDB is running: `docker ps` or check local service
- Verify connection string in `apps/api/.env`

### TypeScript Errors
Run `npm run build` to see detailed errors

### Module Not Found
Run `npm install` from the root directory

## 📚 Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

Happy coding! 🎉
