# 🚀 Deploy Cureastic to Vercel - Complete Guide

## Overview

You have two deployment options:

### Option 1: Full-Stack on Vercel (Recommended for simplicity)
Deploy both frontend and backend on Vercel

### Option 2: Split Deployment (Recommended for production)
- Frontend on Vercel (fast, global CDN)
- Backend on Render (better for Node.js servers)

---

## 🎯 Option 1: Full-Stack Deployment on Vercel

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard

1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

### Step 3: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find **"FINAL-YEAR-PROJECT"** in the list
3. Click **"Import"**

### Step 4: Configure Project

**Framework Preset**: Select **"Other"**

**Root Directory**: Leave as `.` (root)

**Build Settings**:
- Build Command: `npm install` (or leave empty)
- Output Directory: `public`
- Install Command: `npm install`

### Step 5: Add Environment Variables

Click **"Environment Variables"** and add:

```
GROQ_API_KEY = your_groq_api_key
GEMINI_API_KEY = your_gemini_api_key
GOOGLE_MAPS_API_KEY = your_google_maps_key
OPENWEATHER_API_KEY = your_openweather_key
SESSION_SECRET = your_session_secret
NODE_ENV = production
```

### Step 6: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. Your app will be live at: `https://your-project.vercel.app`

---

## 🎯 Option 2: Split Deployment (Frontend on Vercel + Backend on Render)

This is the BEST approach for production apps!

### Why Split?
- ✅ Vercel: Lightning-fast static file serving with global CDN
- ✅ Render: Better for Node.js backend with persistent connections
- ✅ Scalability: Scale frontend and backend independently

### Step 1: Deploy Backend to Render First

Follow the `RENDER_DEPLOYMENT_GUIDE.md` to deploy your backend.

You'll get a URL like: `https://cureastic-app.onrender.com`

### Step 2: Update Frontend API Calls

We need to point your frontend to the Render backend URL.

Create a config file for API endpoints:

**File: `public/js/config.js`**
```javascript
const API_BASE_URL = 'https://cureastic-app.onrender.com';
```

Then update all fetch calls in your HTML files to use this URL.

### Step 3: Create Vercel-Only Configuration

**File: `vercel-frontend.json`** (rename to `vercel.json` when deploying)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ],
  "rewrites": [
    { "source": "/", "destination": "/public/index.html" },
    { "source": "/login", "destination": "/public/login.html" },
    { "source": "/signup", "destination": "/public/signup.html" },
    { "source": "/dashboard", "destination": "/public/dashboard.html" },
    { "source": "/chatbot", "destination": "/public/chatbot.html" },
    { "source": "/wellness", "destination": "/public/wellness.html" },
    { "source": "/reports", "destination": "/public/reports.html" },
    { "source": "/profile", "destination": "/public/profile.html" }
  ]
}
```

### Step 4: Deploy Frontend to Vercel

1. Go to **https://vercel.com**
2. Import your GitHub repository
3. Configure:
   - Framework: **Other**
   - Root Directory: `.`
   - Build Command: (leave empty)
   - Output Directory: `public`
4. Add environment variable:
   ```
   VITE_API_URL = https://cureastic-app.onrender.com
   ```
5. Click **Deploy**

### Step 5: Configure CORS on Backend

Update your `server.js` CORS settings to allow Vercel domain:

```javascript
app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:3005'
  ],
  credentials: true
}));
```

---

## 🔧 Quick Deploy via CLI

If you have Vercel CLI installed:

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🌐 Your Live URLs

After deployment:

- **Vercel Frontend**: `https://your-project.vercel.app`
- **Render Backend**: `https://cureastic-app.onrender.com`

---

## ⚙️ Important Vercel Settings

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Environment Variables
- Go to Project Settings → Environment Variables
- Add/edit variables
- Redeploy for changes to take effect

### Auto-Deploy
- Vercel auto-deploys on every `git push` to main branch
- Preview deployments for pull requests

---

## 🐛 Troubleshooting

### Issue: API calls failing
**Solution**: Check CORS settings and API_BASE_URL configuration

### Issue: 404 on page refresh
**Solution**: Vercel.json rewrites should handle this (already configured)

### Issue: Environment variables not working
**Solution**: 
- Make sure they're added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

### Issue: Build fails
**Solution**: 
- Check build logs in Vercel dashboard
- Verify package.json is correct
- Make sure all dependencies are listed

---

## 📊 Vercel Free Tier Limits

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ⚠️ Serverless functions: 100 GB-hours/month

---

## 🎉 Success!

Your Cureastic app is now deployed with:
- **Frontend**: Blazing fast on Vercel's global CDN
- **Backend**: Reliable Node.js server on Render

Share your live URL with the world! 🌍

---

## 📚 Resources

- Vercel Docs: https://vercel.com/docs
- Vercel CLI: https://vercel.com/docs/cli
- Vercel Support: https://vercel.com/support

---

**Need help? Check the Vercel dashboard logs for detailed error messages.**
