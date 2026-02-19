# MindMirror AI - Vercel Deployment Guide

## Quick Start Deployment

Your MindMirror AI project is now ready to deploy on Vercel!

### Prerequisites
- GitHub account (already connected ✅)
- Vercel account (free at https://vercel.com)

### Deployment Steps

#### Step 1: Create a Render Account (for Backend)
1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Click "New +"
4. Select "Web Service"
5. Connect your GitHub repository (DOMINICLUCKY/MindMirror-AI)
6. Configure:
   - **Name**: `mindmirror-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
7. Click "Create Web Service"
8. **Wait for deployment** (takes ~2-3 minutes)
9. Copy the URL (looks like `https://mindmirror-backend.onrender.com`)

#### Step 2: Update vercel.json with Backend URL
Once your Render backend is deployed:
1. Open `vercel.json` in the project root
2. Replace `https://mindmirror-backend.onrender.com` with your actual Render URL
3. Save and push to GitHub:
   ```bash
   git add vercel.json
   git commit -m "Update backend URL for Vercel deployment"
   git push
   ```

#### Step 3: Deploy to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Search and select "MindMirror-AI" from DOMINICLUCKY
5. Configure:
   - **Framework**: React
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
6. Click "Deploy"
7. **Wait for build** (takes ~3-5 minutes)

#### Step 4: Verify Deployment
- Your app will be live at: `https://mindmirror-ai.vercel.app` (or custom domain)
- Check if it loads correctly
- Test the journal entry feature
- Test emotion analysis

### Environment Variables (if needed)

If you want to add environment variables:
1. In Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add any secrets your backend needs

### Troubleshooting

**Frontend won't load?**
- Check Vercel build logs for errors
- Ensure all dependencies are installed
- Verify React build is successful

**Backend API calls fail?**
- Check Render backend is running
- Update the backend URL in `vercel.json`
- Check CORS headers in backend

**Render backend spins down?**
- Free tier on Render spins down after 15 min inactivity
- Upgrade to paid tier or use alternative (Railway, Hatch)

### Alternative Backend Hosting

If Render doesn't work, try:
- **Railway**: https://railway.app (includes $5 monthly credit)
- **Heroku**: https://www.heroku.com (free tier removed, but cheapest is $7/month)
- **Cyclic**: https://cyclic.sh (free serverless)

### Your Vercel URL
Once deployed, your app will be at:
🌐 `https://mindmirror-ai.vercel.app`

### Support
For issues, check:
- Vercel Documentation: https://vercel.com/docs
- Render Documentation: https://render.com/docs
