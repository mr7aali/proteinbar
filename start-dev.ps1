# PowerShell script to start all dev servers

Write-Host "🚀 Starting Proteinbar Development Servers..." -ForegroundColor Green
Write-Host ""

# Check if MongoDB is running
Write-Host "📊 Checking MongoDB..." -ForegroundColor Yellow
$mongoRunning = docker ps --filter "name=mongodb" --filter "status=running" --format "{{.Names}}"

if ($mongoRunning -eq "mongodb") {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB is not running. Starting MongoDB..." -ForegroundColor Yellow
    docker start mongodb 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "📦 Creating new MongoDB container..." -ForegroundColor Yellow
        docker run -d -p 27017:27017 --name mongodb mongo:latest
    }
    Start-Sleep -Seconds 2
    Write-Host "✅ MongoDB started" -ForegroundColor Green
}

Write-Host ""
Write-Host "🧹 Cleaning lock files..." -ForegroundColor Yellow
Remove-Item -Path "apps/web/.next/dev/lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "apps/admin/.next/dev/lock" -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "🔧 Starting development servers..." -ForegroundColor Yellow
Write-Host ""
Write-Host "This will open 3 terminal windows:" -ForegroundColor Cyan
Write-Host "  1. API Server (port 4000)" -ForegroundColor Cyan
Write-Host "  2. Web App (port 3000)" -ForegroundColor Cyan
Write-Host "  3. Admin Dashboard (port 3001)" -ForegroundColor Cyan
Write-Host ""

# Start API server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\apps\api'; Write-Host '🔌 Starting API Server...' -ForegroundColor Green; npm run dev"

# Wait a bit
Start-Sleep -Seconds 2

# Start Web app
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\apps\web'; Write-Host '🌐 Starting Web App...' -ForegroundColor Green; npm run dev"

# Wait a bit
Start-Sleep -Seconds 2

# Start Admin dashboard
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\apps\admin'; Write-Host '👨‍💼 Starting Admin Dashboard...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "✅ All servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Access your applications at:" -ForegroundColor Cyan
Write-Host "  🌐 Web:   http://localhost:3000" -ForegroundColor White
Write-Host "  👨‍💼 Admin: http://localhost:3001" -ForegroundColor White
Write-Host "  🔌 API:   http://localhost:4000" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in each terminal window to stop the servers" -ForegroundColor Yellow
