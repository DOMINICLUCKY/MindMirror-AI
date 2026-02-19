# 🚀 How to Run MindMirror AI - Complete Guide

Choose your preferred method below:

---

## **Option 1: One-Click Batch File (⭐ Easiest for Windows)**

### On Windows PowerShell or Command Prompt:
```powershell
double-click: start-all.bat
```

**What it does:**
✅ Installs dependencies automatically
✅ Opens backend in new window (port 5000)
✅ Opens frontend in new window (port 3000)
✅ Browser opens automatically

---

## **Option 2: PowerShell Script**

### Right-click on PowerShell and run as Administrator:
```powershell
cd d:\MindMirrorAI
powershell -ExecutionPolicy Bypass -File start-all.ps1
```

**What it does:**
✅ Same as batch file but with colored output
✅ More flexible for advanced users

---

## **Option 3: Using NPM Concurrently (Recommended for Developers)**

### One-time setup (in PowerShell):
```powershell
cd d:\MindMirrorAI
npm install
```

### Then run both servers together:
```powershell
npm start
```

**What it does:**
✅ Runs backend and frontend in same terminal
✅ Color-coded output for each server
✅ Stop all with Ctrl+C

---

## **Option 4: Manual - Run Separately (Full Control)**

### Terminal 1 - Backend:
```powershell
cd d:\MindMirrorAI\backend
npm install
npm start
```

### Terminal 2 - Frontend (wait for "Compiled successfully"):
```powershell
cd d:\MindMirrorAI\frontend
npm install
npm start
```

---

## **Option 5: Quick Commands**

### Just Backend:
```powershell
cd d:\MindMirrorAI && npm --prefix ./backend start
```

### Just Frontend:
```powershell
cd d:\MindMirrorAI && npm --prefix ./frontend start
```

### Both Together:
```powershell
cd d:\MindMirrorAI && npm start
```

---

## 🎯 My Recommendation

**For fastest startup:** Double-click `start-all.bat` 

**For development:** Use Option 3 (concurrently) to see both outputs

**For troubleshooting:** Use Option 4 (separate terminals)

---

## ✅ How to Know It's Working

### Backend Ready:
```
✨ MindMirror AI Server running on http://localhost:5000
```

### Frontend Ready:
```
Compiled successfully!
You can now view mindmirror-frontend in the browser.
```

---

## 🔧 Troubleshooting

**"Port 5000 already in use"**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**"npm: The term 'npm' is not recognized"**
- Install Node.js: https://nodejs.org/
- Restart PowerShell after installation

**"Permission denied" when running .ps1**
```powershell
powershell -ExecutionPolicy Bypass -File start-all.ps1
```

---

## 🌐 Access Your App

After both servers start:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health

---

## 📋 What Gets Installed

First run automatically installs:
- **Backend:** Express, CORS, Axios, DotEnv
- **Frontend:** React, Chart.js, Axios, React Router

Next runs are instant since packages are cached.

---

## 💡 Pro Tips

1. **Keep terminals open** - Don't close them while developing
2. **Hot reload enabled** - Changes auto-refresh frontend
3. **Check network tab** - Browser DevTools (F12) to see API calls
4. **Clear cache** - Ctrl+Shift+Delete if seeing old data

---

**Ready? Pick your method above and start analyzing emotions!** 🧠✨
