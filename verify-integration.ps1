# Integration Verification Script
Write-Host "🔍 Verifying Proteinbar Integration..." -ForegroundColor Cyan

# Check if API is running
Write-Host "`n1. Checking API Health..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:4000/health" -Method Get
    Write-Host "✅ API is running: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ API is not running. Start it with: cd apps/api && npm run dev" -ForegroundColor Red
}

# Check Web App
Write-Host "`n2. Checking Web App..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method Head -TimeoutSec 5
    Write-Host "✅ Web App is running on port 3000" -ForegroundColor Green
} catch {
    Write-Host "❌ Web App is not running. Start it with: cd apps/web && npm run dev" -ForegroundColor Red
}

# Check Admin App
Write-Host "`n3. Checking Admin App..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001" -Method Head -TimeoutSec 5
    Write-Host "✅ Admin App is running on port 3001" -ForegroundColor Green
} catch {
    Write-Host "❌ Admin App is not running. Start it with: cd apps/admin && npm run dev" -ForegroundColor Red
}

Write-Host "`n✨ Verification Complete!" -ForegroundColor Cyan
Write-Host "`nAccess Points:" -ForegroundColor White
Write-Host "  Web:   http://localhost:3000" -ForegroundColor Gray
Write-Host "  Admin: http://localhost:3001" -ForegroundColor Gray
Write-Host "  API:   http://localhost:4000" -ForegroundColor Gray
