# Proteinbar Monorepo

A Turborepo monorepo containing the Proteinbar frontend, admin dashboard, and backend API.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- Docker (for MongoDB)
- npm >= 10

### Start Development

**Windows:**
```bash
.\start-dev.bat
# or
.\start-dev.ps1
```

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

This will automatically:
- ✅ Start MongoDB
- ✅ Clean lock files
- ✅ Open 3 terminal windows
- ✅ Start all services

### Access Applications

- 🌐 Web: http://localhost:3000
- 👨‍💼 Admin: http://localhost:3001
- 🔌 API: http://localhost:4000

## 📁 Structure

```
├── apps
│   ├── web                 # Customer-facing Next.js app (port 3000)
│   ├── admin              # Admin dashboard Next.js app (port 3001)
│   └── api                # Express/MongoDB/TypeScript backend (port 4000)
├── packages
│   ├── typescript-config  # Shared TypeScript configurations
│   └── eslint-config      # Shared ESLint configurations
└── turbo.json            # Turborepo configuration
```

## 🛠️ Commands

```bash
# Development
npm run dev              # Start all apps
npm run build            # Build all apps
npm run lint             # Lint all apps
npm run clean            # Clean build artifacts

# Database
cd apps/api
npm run seed             # Seed database with sample data

# Individual apps
cd apps/web && npm run dev      # Web only
cd apps/admin && npm run dev    # Admin only
cd apps/api && npm run dev      # API only
```

## 📚 Documentation

- **FINAL_SOLUTION.md** - Complete setup solution
- **API_DOCUMENTATION.md** - Complete API reference
- **FRONTEND_INTEGRATION_GUIDE.md** - Frontend integration guide
- **TROUBLESHOOTING.md** - Common issues and solutions
- **QUICK_REFERENCE.md** - Quick reference card

## 🔧 First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. **Seed database:**
   ```bash
   cd apps/api
   npm run seed
   cd ../..
   ```

4. **Start development:**
   ```bash
   .\start-dev.bat  # Windows
   ./start-dev.sh   # Linux/Mac
   ```

## 🎯 Features

### Backend API
- ✅ 7 modules (Users, Products, Menu, Locations, Plans, Subscriptions, Orders)
- ✅ 40+ REST API endpoints
- ✅ JWT authentication
- ✅ MongoDB with Mongoose
- ✅ TypeScript throughout
- ✅ Modular architecture

### Frontend Apps
- ✅ Next.js 16 with React 19
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Responsive design
- ✅ Ready for API integration

## 🧪 Testing

```bash
# Test API
curl http://localhost:4000/health
curl http://localhost:4000/api/products
curl http://localhost:4000/api/menu/categories

# Build all apps
npm run build
```

## 📖 Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 🆘 Troubleshooting

See `TROUBLESHOOTING.md` for common issues and solutions.

**Quick fixes:**
- Port conflict: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
- MongoDB not running: `docker start mongodb`
- Lock files: Delete `.next` folders and restart

---

Happy coding! 🎉
