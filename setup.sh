#!/bin/bash

echo "🚀 Setting up Turborepo Monorepo..."

# Check if apps directory exists
if [ ! -d "apps" ]; then
    mkdir apps
    echo "✅ Created apps directory"
fi

# Move proteinbar to apps/web if it exists
if [ -d "proteinbar" ] && [ ! -d "apps/web" ]; then
    echo "📦 Moving proteinbar to apps/web..."
    mv proteinbar apps/web
    echo "✅ Moved proteinbar to apps/web"
fi

# Move proteinbar_admin_dashboard to apps/admin if it exists
if [ -d "proteinbar_admin_dashboard" ] && [ ! -d "apps/admin" ]; then
    echo "📦 Moving proteinbar_admin_dashboard to apps/admin..."
    mv proteinbar_admin_dashboard apps/admin
    echo "✅ Moved proteinbar_admin_dashboard to apps/admin"
fi

# Create .env file for API if it doesn't exist
if [ ! -f "apps/api/.env" ]; then
    echo "📝 Creating .env file for API..."
    cp apps/api/.env.example apps/api/.env
    echo "✅ Created apps/api/.env"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update apps/api/.env with your MongoDB connection string"
echo "2. Make sure MongoDB is running"
echo "3. Run 'npm run dev' to start all apps"
echo ""
echo "Apps will be available at:"
echo "  - Web: http://localhost:3000"
echo "  - Admin: http://localhost:3001"
echo "  - API: http://localhost:4000"
