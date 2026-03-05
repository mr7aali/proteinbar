# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB running on localhost:27017
- npm installed

## Start Everything in 3 Steps

### Step 1: Start MongoDB
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 2: Seed Database (First time only)
```bash
cd apps/api
npm run seed
cd ../..
```

### Step 3: Start All Services

**Windows (PowerShell):**
```powershell
.\start-dev.ps1
```

**Windows (CMD):**
```cmd
start-dev.bat
```

**Linux/Mac:**
```bash
./start-dev.sh
```

## Access Your Apps

- 🌐 **Web App**: http://localhost:3000
- 👨‍💼 **Admin Dashboard**: http://localhost:3001
- 🔌 **API**: http://localhost:4000
- 🧪 **Web Test Page**: http://localhost:3000/api-test
- 🧪 **Admin Test Page**: http://localhost:3001/api-test

## Verify Integration

**PowerShell:**
```powershell
.\verify-integration.ps1
```

**Linux/Mac:**
```bash
./verify-integration.sh
```

## Build All Apps
```bash
npm run build
```

## Common Commands

```bash
# Install dependencies
npm install

# Run dev servers
npm run dev

# Build all apps
npm run build

# Lint all apps
npm run lint

# Clean build artifacts
npm run clean
```

## Project Structure

```
proteinbar/
├── apps/
│   ├── web/          # Customer-facing Next.js app (port 3000)
│   ├── admin/        # Admin dashboard Next.js app (port 3001)
│   └── api/          # Express + MongoDB backend (port 4000)
├── packages/
│   ├── typescript-config/
│   └── eslint-config/
└── turbo.json        # Turborepo configuration
```

## Need Help?

- 📖 Full API docs: `API_DOCUMENTATION.md`
- 🔧 Integration guide: `API_INTEGRATION_COMPLETE.md`
- ✅ Status check: `INTEGRATION_STATUS.md`
- 🏗️ Architecture: `apps/api/ARCHITECTURE.md`

## Status: ✅ READY

All systems integrated and tested. Zero errors. Start building! 🎉
