# MindMirror AI - PowerShell Startup Script
# Run this script to start both servers at once

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MindMirror AI - Starting All Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    node --version | Out-Null
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Start Backend Server
Write-Host "Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\MindMirrorAI\backend'; npm install 2>&1 | Out-Null; npm start"

# Wait for backend to start
Start-Sleep -Seconds 2

# Start Frontend Server
Write-Host "Starting Frontend Server (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\MindMirrorAI\frontend'; npm install 2>&1 | Out-Null; npm start"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Both servers are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "The browser should open automatically." -ForegroundColor Yellow
Write-Host "If not, manually visit http://localhost:3000" -ForegroundColor Yellow
