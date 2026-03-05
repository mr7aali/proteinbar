#!/bin/bash

# Bash script to start all dev servers

echo "🚀 Starting Proteinbar Development Servers..."
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB..."
if docker ps --filter "name=mongodb" --filter "status=running" | grep -q mongodb; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is not running. Starting MongoDB..."
    docker start mongodb 2>/dev/null || docker run -d -p 27017:27017 --name mongodb mongo:latest
    sleep 2
    echo "✅ MongoDB started"
fi

echo ""
echo "🧹 Cleaning lock files..."
rm -f apps/web/.next/dev/lock
rm -f apps/admin/.next/dev/lock

echo ""
echo "🔧 Starting development servers..."
echo ""
echo "Opening 3 terminal windows:"
echo "  1. API Server (port 4000)"
echo "  2. Web App (port 3000)"
echo "  3. Admin Dashboard (port 3001)"
echo ""

# Start API server in new terminal
gnome-terminal -- bash -c "cd apps/api && echo '🔌 Starting API Server...' && npm run dev; exec bash" 2>/dev/null || \
xterm -e "cd apps/api && echo '🔌 Starting API Server...' && npm run dev" 2>/dev/null || \
echo "Please run 'cd apps/api && npm run dev' in a new terminal"

sleep 2

# Start Web app in new terminal
gnome-terminal -- bash -c "cd apps/web && echo '🌐 Starting Web App...' && npm run dev; exec bash" 2>/dev/null || \
xterm -e "cd apps/web && echo '🌐 Starting Web App...' && npm run dev" 2>/dev/null || \
echo "Please run 'cd apps/web && npm run dev' in a new terminal"

sleep 2

# Start Admin dashboard in new terminal
gnome-terminal -- bash -c "cd apps/admin && echo '👨‍💼 Starting Admin Dashboard...' && npm run dev; exec bash" 2>/dev/null || \
xterm -e "cd apps/admin && echo '👨‍💼 Starting Admin Dashboard...' && npm run dev" 2>/dev/null || \
echo "Please run 'cd apps/admin && npm run dev' in a new terminal"

echo ""
echo "✅ All servers are starting!"
echo ""
echo "Access your applications at:"
echo "  🌐 Web:   http://localhost:3000"
echo "  👨‍💼 Admin: http://localhost:3001"
echo "  🔌 API:   http://localhost:4000"
echo ""
echo "Press Ctrl+C in each terminal window to stop the servers"
