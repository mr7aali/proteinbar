# Command Reference

Quick reference for all available commands in the monorepo.

## Root Level Commands

### Development
```bash
# Start all apps in development mode
npm run dev

# Start specific app
npm run dev --filter=@proteinbar/web
npm run dev --filter=@proteinbar/admin
npm run dev --filter=@proteinbar/api
```

### Build
```bash
# Build all apps
npm run build

# Build specific app
npm run build --filter=@proteinbar/web
npm run build --filter=@proteinbar/admin
npm run build --filter=@proteinbar/api
```

### Lint
```bash
# Lint all apps
npm run lint

# Lint specific app
npm run lint --filter=@proteinbar/web
```

### Clean
```bash
# Clean all build artifacts
npm run clean

# Clean specific app
npm run clean --filter=@proteinbar/web
```

### Format
```bash
# Format all code with Prettier
npm run format
```

## App-Specific Commands

### Web App (apps/web)
```bash
cd apps/web

# Development
npm run dev

# Build
npm run build

# Start production server
npm run start

# Lint
npm run lint

# Clean
npm run clean
```

### Admin Dashboard (apps/admin)
```bash
cd apps/admin

# Development (runs on port 3001)
npm run dev

# Build
npm run build

# Start production server (port 3001)
npm run start

# Lint
npm run lint

# Clean
npm run clean
```

### API Server (apps/api)
```bash
cd apps/api

# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm run start

# Lint
npm run lint

# Clean
npm run clean
```

## Turborepo Commands

### Run Tasks
```bash
# Run a task across all workspaces
turbo run <task>

# Run with filter
turbo run build --filter=@proteinbar/web

# Run with dependencies
turbo run build --filter=@proteinbar/web...

# Force run (ignore cache)
turbo run build --force

# Run in parallel
turbo run lint test --parallel
```

### Cache Management
```bash
# Clear Turbo cache
turbo run build --force

# View cache status
turbo run build --dry-run
```

## npm Workspace Commands

### Install Dependencies
```bash
# Install all dependencies
npm install

# Install in specific workspace
npm install <package> --workspace=@proteinbar/web

# Install in all workspaces
npm install <package> --workspaces
```

### Run Scripts
```bash
# Run script in specific workspace
npm run dev --workspace=@proteinbar/api

# Run script in all workspaces
npm run lint --workspaces
```

### List Workspaces
```bash
# List all workspaces
npm ls --workspaces

# List workspace info
npm query .workspace
```

## MongoDB Commands

### Using Docker
```bash
# Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Stop MongoDB
docker stop mongodb

# Start existing container
docker start mongodb

# Remove container
docker rm mongodb

# View logs
docker logs mongodb

# Access MongoDB shell
docker exec -it mongodb mongosh
```

### Local MongoDB
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Stop MongoDB service (Windows)
net stop MongoDB

# Access MongoDB shell
mongosh
```

## Git Commands

### Monorepo Git Workflow
```bash
# Status
git status

# Add all changes
git add .

# Commit
git commit -m "feat: your message"

# Push
git push

# Create branch
git checkout -b feature/your-feature

# View changed files
git diff --name-only
```

## Testing API Endpoints

### Health Check
```bash
curl http://localhost:4000/health
```

### Register User
```bash
curl -X POST http://localhost:4000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Products
```bash
curl http://localhost:4000/api/products
```

### Create Product (with auth)
```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Protein Bowl",
    "description": "High protein meal",
    "price": 15.99,
    "category": "meals",
    "image": "/images/bowl.jpg",
    "inStock": true
  }'
```

### Get User Profile (with auth)
```bash
curl http://localhost:4000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Order (with auth)
```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "items": [
      {
        "productId": "PRODUCT_ID",
        "quantity": 2,
        "price": 15.99
      }
    ],
    "totalAmount": 31.98,
    "deliveryAddress": {
      "street": "123 Main St",
      "city": "Dubai",
      "postalCode": "12345",
      "phone": "+971501234567"
    }
  }'
```

## Troubleshooting Commands

### Check Ports
```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :3001
netstat -ano | findstr :4000

# Kill process by PID
taskkill /PID <PID> /F
```

### Check Node/npm Versions
```bash
node --version
npm --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Remove all node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Remove package-lock files
rm -rf package-lock.json apps/*/package-lock.json

# Reinstall
npm install
```

### View Logs
```bash
# View Turbo logs
cat .turbo/turbo-*.log

# View npm logs
npm config get cache
```

## Environment Variables

### Set Environment Variables (Windows PowerShell)
```powershell
$env:NODE_ENV="development"
$env:PORT="4000"
```

### Set Environment Variables (Windows CMD)
```cmd
set NODE_ENV=development
set PORT=4000
```

### Load from .env File
```bash
# Already configured in apps/api
# Just edit apps/api/.env
```

## Production Commands

### Build for Production
```bash
npm run build
```

### Start Production Servers
```bash
# Start all in production mode
npm run start --workspaces

# Or individually
cd apps/web && npm run start
cd apps/admin && npm run start
cd apps/api && npm run start
```

## Useful Aliases

Add these to your shell profile for quick access:

```bash
# Development
alias dev="npm run dev"
alias build="npm run build"

# App-specific
alias dev:web="npm run dev --filter=@proteinbar/web"
alias dev:admin="npm run dev --filter=@proteinbar/admin"
alias dev:api="npm run dev --filter=@proteinbar/api"

# MongoDB
alias mongo:start="docker start mongodb"
alias mongo:stop="docker stop mongodb"
alias mongo:shell="docker exec -it mongodb mongosh"
```

## Quick Tips

1. Always run commands from the root directory unless working on a specific app
2. Use `--filter` to target specific workspaces
3. Turbo caches builds - use `--force` to bypass cache
4. Check `.turbo` directory for cache and logs
5. Use `npm run dev` to start all apps simultaneously
6. MongoDB must be running before starting the API
7. Set JWT_SECRET in production environment
8. Use environment variables for sensitive data

---

For more information, see:
- README.md - Main documentation
- QUICK_START.md - Getting started guide
- apps/api/ARCHITECTURE.md - Backend architecture
