# PowerShell setup script for Windows

Write-Host "🚀 Setting up Turborepo Monorepo..." -ForegroundColor Green

# Check if apps directory exists
if (-not (Test-Path "apps")) {
    New-Item -ItemType Directory -Path "apps" | Out-Null
    Write-Host "✅ Created apps directory" -ForegroundColor Green
}

# Move proteinbar to apps/web if it exists
if ((Test-Path "proteinbar") -and -not (Test-Path "apps/web")) {
    Write-Host "📦 Moving proteinbar to apps/web..." -ForegroundColor Yellow
    Move-Item -Path "proteinbar" -Destination "apps/web"
    Write-Host "✅ Moved proteinbar to apps/web" -ForegroundColor Green
}

# Move proteinbar_admin_dashboard to apps/admin if it exists
if ((Test-Path "proteinbar_admin_dashboard") -and -not (Test-Path "apps/admin")) {
    Write-Host "📦 Moving proteinbar_admin_dashboard to apps/admin..." -ForegroundColor Yellow
    Move-Item -Path "proteinbar_admin_dashboard" -Destination "apps/admin"
    Write-Host "✅ Moved proteinbar_admin_dashboard to apps/admin" -ForegroundColor Green
}

# Create .env file for API if it doesn't exist
if (-not (Test-Path "apps/api/.env")) {
    Write-Host "📝 Creating .env file for API..." -ForegroundColor Yellow
    Copy-Item -Path "apps/api/.env.example" -Destination "apps/api/.env"
    Write-Host "✅ Created apps/api/.env" -ForegroundColor Green
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update apps/api/.env with your MongoDB connection string"
Write-Host "2. Make sure MongoDB is running"
Write-Host "3. Run 'npm run dev' to start all apps"
Write-Host ""
Write-Host "Apps will be available at:" -ForegroundColor Cyan
Write-Host "  - Web: http://localhost:3000"
Write-Host "  - Admin: http://localhost:3001"
Write-Host "  - API: http://localhost:4000"
