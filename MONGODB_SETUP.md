# MongoDB Setup & Deployment Guide

## What Was Added:

✅ **MongoDB Database** - Persistent data storage  
✅ **User Authentication** - Register/Login system  
✅ **Per-User Data** - Each user's journal entries are private and persistent  
✅ **History Tracking** - Weekly analysis, daily trends, progress tracking  
✅ **Secure Password Storage** - Bcrypt encryption for user passwords  

---

## Backend API Endpoints (NEW):

### **Authentication**
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login

### **Journal Entries** (Now with userId requirement)
- `POST /api/journal/analyze` - Save & analyze journal entry (requires userId)
- `GET /api/journal/user/:userId` - Get all entries for user
- `GET /api/journal/history/:userId` - Get user history & statistics

### **Analysis & Dashboard**
- `GET /api/analysis/dashboard/:userId` - Get dashboard data for user
- `GET /api/analysis/trends/:userId` - Get emotion trends for user

---

## Step 1: Add Environment Variables to Render

**⚠️ YOUR MONGODB CONNECTION STRING IS ALREADY HIDDEN IN .env**

1. Go to Render Dashboard
2. Select your **mindmirror-backend** service
3. Click **Environment** (in the left sidebar)
4. Add these variables:

```
MONGODB_URI=mongodb+srv://adarshmund07_db_user:l3As71JrjawDbALJ@mindmirrorai.qcuc1al.mongodb.net/?appName=MindMirrorAI
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=production
```

5. **Save** and Render will **automatically redeploy**

---

## Step 2: Test Backend Locally (Optional)

```bash
cd backend
npm install
node server.js
```

You should see:
```
✅ MongoDB Connected Successfully
✨ MindMirror AI Server running on http://localhost:5000
```

---

## Step 3: Update Frontend to Use Authentication

The frontend needs to be updated to:
1. Send `userId` with journal submission requests
2. Store user login session
3. Display user's personal history & analytics

**Suggested Frontend Changes:**

### Update HomePage.js to send userId:
```javascript
const response = await axios.post(`${API_BASE_URL}/api/journal/analyze`, {
  userId: localStorage.getItem('userId'), // Get from login
  text: journalText,
  date: new Date().toISOString()
});
```

### Update api.js to expose auth endpoints:
```javascript
export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  ANALYZE_ENTRY: `${API_BASE_URL}/api/journal/analyze`,
  GET_ENTRIES: `${API_BASE_URL}/api/journal/user/:userId`,
  GET_HISTORY: `${API_BASE_URL}/api/journal/history/:userId`,
  // ...
};
```

---

## Step 4: Current Status

✅ **Backend**: MongoDB connected and ready  
✅ **Authentication**: Register/Login routes created  
✅ **Data Storage**: User journals stored in MongoDB  
✅ **History**: Weekly/daily analytics available  

⏳ **Pending**: Frontend updates to integrate authentication

---

## Example API Usage:

### Register a User:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "confirmPassword": "secure123"
  }'
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "67a8c9...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Analyze Entry (with userId):
```bash
curl -X POST http://localhost:5000/api/journal/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "67a8c9...",
    "text": "Today I felt stressed because of work deadlines..."
  }'
```

### Get User History:
```bash
curl http://localhost:5000/api/journal/history/67a8c9...
```

---

## Security Notes:

✅ Passwords are **hashed** with bcrypt  
✅ `.env` file with connection string is **NOT** on GitHub  
✅ Each user's data is **isolated** in the database  
✅ User IDs are required to access personal data  

---

## Next Steps:

1. Add the environment variables to Render (Step 1 above)
2. Update frontend to handle user authentication
3. Add login/signup functionality to frontend pages
4. Send `userId` with journal submission requests
5. Display user history and analytics on dashboard

**Would you like me to update the frontend to integrate with these new authentication and database features?**
