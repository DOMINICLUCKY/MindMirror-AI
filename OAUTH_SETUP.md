# OAuth Integration Setup Guide

This guide walks you through setting up real OAuth integration for Google, GitHub, and Apple with MindMirror AI.

## Overview

The application supports three OAuth providers:
- **Google** - OAuth 2.0
- **GitHub** - OAuth 2.0
- **Apple** - Sign in with Apple

Currently, the application runs in **Demo Mode** (no OAuth configured), but is production-ready for OAuth integration.

---

## Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Google+ API**

### Step 2: Create OAuth 2.0 Credentials

1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
2. Configure the OAuth consent screen:
   - Choose "External" as user type
   - Fill in app name: "MindMirror AI"
   - Add test users (your email)
3. Create credentials:
   - Application type: **Web application**
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://mind-mirror-ai-gd64.vercel.app` (production)
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback`
     - `https://mind-mirror-ai-gd64.vercel.app/auth/google/callback`

### Step 3: Add Credentials to Environment

```bash
# frontend/.env.local
REACT_APP_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
REACT_APP_GOOGLE_CLIENT_SECRET=your-client-secret

# backend/.env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

## GitHub OAuth Setup

### Step 1: Register OAuth App

1. Go to GitHub → **Settings** → **Developer settings** → **OAuth Apps**
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: MindMirror AI
   - **Homepage URL**: `https://mind-mirror-ai-gd64.vercel.app`
   - **Authorization callback URL**: 
     - `http://localhost:3000/auth/github/callback` (dev)
     - `https://mind-mirror-ai-gd64.vercel.app/auth/github/callback` (prod)

### Step 2: Add Credentials to Environment

```bash
# frontend/.env.local
REACT_APP_GITHUB_CLIENT_ID=your-client-id
REACT_APP_GITHUB_CLIENT_SECRET=your-client-secret

# backend/.env
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

---

## Apple OAuth Setup

### Step 1: Register Apple Developer Account

1. Go to [Apple Developer](https://developer.apple.com/)
2. Create/sign into your account
3. Go to **Certificates, Identifiers & Profiles**

### Step 2: Create App ID

1. Click **Identifiers** → **App IDs**
2. Click "+" and create new App ID
3. Enable "Sign in with Apple"

### Step 3: Create Service ID

1. Click **Identifiers** → **Service IDs**
2. Click "+" and create new Service ID
3. Enable "Sign in with Apple"
4. Configure Return URLs:
   - `http://localhost:3000/auth/apple/callback`
   - `https://mind-mirror-ai-gd64.vercel.app/auth/apple/callback`

### Step 4: Create Private Key

1. Go to **Keys**
2. Create new key with "Sign in with Apple" enabled
3. Download and save the private key

### Step 5: Add Credentials to Environment

```bash
# frontend/.env.local
REACT_APP_APPLE_TEAM_ID=your-team-id
REACT_APP_APPLE_CLIENT_ID=your-service-id
REACT_APP_APPLE_KEY_ID=your-key-id

# backend/.env
APPLE_TEAM_ID=your-team-id
APPLE_CLIENT_ID=your-service-id
APPLE_KEY_ID=your-key-id
APPLE_PRIVATE_KEY_PATH=/path/to/private/key.p8
```

---

## Environment Variables Setup

### Frontend (.env.local)

```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_GOOGLE_CLIENT_SECRET=your-google-client-secret
REACT_APP_GITHUB_CLIENT_ID=your-github-client-id
REACT_APP_GITHUB_CLIENT_SECRET=your-github-client-secret
REACT_APP_APPLE_TEAM_ID=your-apple-team-id
REACT_APP_APPLE_CLIENT_ID=your-apple-client-id
REACT_APP_APPLE_KEY_ID=your-apple-key-id
REACT_APP_API_URL=http://localhost:5000
```

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
NODE_ENV=development

# OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
APPLE_TEAM_ID=your-apple-team-id
APPLE_CLIENT_ID=your-apple-client-id
APPLE_KEY_ID=your-apple-key-id

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

---

## Deployment Environment Variables

### Vercel (Frontend)

1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Add all `REACT_APP_*` variables:

```
REACT_APP_GOOGLE_CLIENT_ID
REACT_APP_GOOGLE_CLIENT_SECRET
REACT_APP_GITHUB_CLIENT_ID
REACT_APP_GITHUB_CLIENT_SECRET
REACT_APP_APPLE_TEAM_ID
REACT_APP_APPLE_CLIENT_ID
REACT_APP_APPLE_KEY_ID
REACT_APP_API_URL=https://mindmirror-ai-backend.onrender.com
```

### Render (Backend)

1. Go to your Render service
2. **Environment** → **Add environment variable**
3. Add all backend environment variables

---

## Testing OAuth Locally

1. **Start Frontend**:
   ```bash
   cd frontend
   npm start
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```

3. **Test Login**:
   - Visit `http://localhost:3000`
   - Click "Continue with Google/GitHub/Apple"
   - You should be redirected to the OAuth provider
   - After authorization, you'll be redirected back to the app

---

## Demo Mode vs Production

### Demo Mode (Current)
- ✅ Works without OAuth credentials
- ✅ Instant login with demo accounts
- ✅ Full app functionality
- ✅ Perfect for testing/development

### Production Mode
- ✅ Real user authentication
- ✅ Store user data in database
- ✅ Secure token-based sessions
- ✅ User data persistence

---

## Troubleshooting

### "Invalid client_id" Error
- Check if credentials are in the correct environment file
- Make sure you're using the right application type
- Verify the callback URL matches your configuration

### "Redirect URI mismatch" Error
- Check OAuth provider settings
- Ensure callback URLs are registered exactly as configured
- Include protocol and port in localhost

### OAuth Provider Not Responding
- Check internet connection
- Verify credentials are correct
- Check if OAuth service is available
- Look for any rate limiting issues

---

## Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` only
2. **Use HTTPS in production** - OAuth requires secure connections
3. **Validate tokens** - Always validate JWT tokens on the backend
4. **Refresh tokens** - Implement token refresh for long sessions
5. **Store securely** - Use secure cookies/storage for tokens

---

## Next Steps

1. Choose which OAuth providers you want to enable
2. Follow the setup steps for each provider
3. Test locally with demo accounts first
4. Deploy to production when ready
5. Monitor OAuth logs for any issues

For more information, refer to official provider documentation:
- [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Docs](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Apple Sign In Docs](https://developer.apple.com/sign-in-with-apple/)
