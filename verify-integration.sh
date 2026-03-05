#!/bin/bash

echo "🔍 Verifying Proteinbar Integration..."

# Check if API is running
echo ""
echo "1. Checking API Health..."
if curl -s http://localhost:4000/health > /dev/null; then
    echo "✅ API is running"
else
    echo "❌ API is not running. Start it with: cd apps/api && npm run dev"
fi

# Check Web App
echo ""
echo "2. Checking Web App..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|301\|302"; then
    echo "✅ Web App is running on port 3000"
else
    echo "❌ Web App is not running. Start it with: cd apps/web && npm run dev"
fi

# Check Admin App
echo ""
echo "3. Checking Admin App..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 | grep -q "200\|301\|302"; then
    echo "✅ Admin App is running on port 3001"
else
    echo "❌ Admin App is not running. Start it with: cd apps/admin && npm run dev"
fi

echo ""
echo "✨ Verification Complete!"
echo ""
echo "Access Points:"
echo "  Web:   http://localhost:3000"
echo "  Admin: http://localhost:3001"
echo "  API:   http://localhost:4000"
