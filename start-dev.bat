@echo off
echo.
echo ========================================
echo   Starting Proteinbar Dev Servers
echo ========================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB...
docker ps --filter "name=mongodb" --filter "status=running" | findstr mongodb >nul
if %errorlevel% equ 0 (
    echo [OK] MongoDB is running
) else (
    echo [!] Starting MongoDB...
    docker start mongodb 2>nul
    if %errorlevel% neq 0 (
        echo [!] Creating new MongoDB container...
        docker run -d -p 27017:27017 --name mongodb mongo:latest
    )
    timeout /t 2 /nobreak >nul
    echo [OK] MongoDB started
)

echo.
echo Cleaning lock files...
if exist "apps\web\.next\dev\lock" del /f /q "apps\web\.next\dev\lock" 2>nul
if exist "apps\admin\.next\dev\lock" del /f /q "apps\admin\.next\dev\lock" 2>nul

echo.
echo Starting development servers...
echo.
echo This will open 3 command windows:
echo   1. API Server (port 4000)
echo   2. Web App (port 3000)
echo   3. Admin Dashboard (port 3001)
echo.

REM Start API server
start "API Server" cmd /k "cd /d %~dp0apps\api && echo Starting API Server... && npm run dev"

REM Wait a bit
timeout /t 2 /nobreak >nul

REM Start Web app
start "Web App" cmd /k "cd /d %~dp0apps\web && echo Starting Web App... && npm run dev"

REM Wait a bit
timeout /t 2 /nobreak >nul

REM Start Admin dashboard
start "Admin Dashboard" cmd /k "cd /d %~dp0apps\admin && echo Starting Admin Dashboard... && npm run dev"

echo.
echo ========================================
echo   All servers are starting!
echo ========================================
echo.
echo Access your applications at:
echo   Web:   http://localhost:3000
echo   Admin: http://localhost:3001
echo   API:   http://localhost:4000
echo.
echo Press Ctrl+C in each window to stop
echo.
pause
