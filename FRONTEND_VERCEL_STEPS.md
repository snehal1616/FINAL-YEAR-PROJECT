# 🎯 Deploy Frontend to Vercel (Backend Already on Render)

## Prerequisites ✅
- Backend already deployed on Render
- Render backend URL (e.g., `https://cureastic-app.onrender.com`)

---

## Step 1: Get Your Render Backend URL

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your deployed service (cureastic-app)
3. Copy the URL at the top (looks like: `https://cureastic-app.onrender.com`)
4. **Keep this URL handy - you'll need it!**

---

## Step 2: Update Frontend Configuration

Update the API configuration file to point to your Render backend:

**File: `public/js/config.js`**

Replace the URL with your actual Render URL:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3005' 
  : 'https://YOUR-RENDER-APP.onrender.com'; // ⬅️ PUT YOUR RENDER URL HERE
```

**Example:**
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3005' 
  : 'https://cureastic-app.onrender.com';
```

---

## Step 3: Update CORS on Backend (Important!)

Your Render backend needs to allow requests from Vercel.

**Option A: Allow all origins (for testing)**

In your `server.js` on Render, the CORS is already set to:
```javascript
app.use(cors());
```
This allows all origins - good for testing!

**Option B: Restrict to your Vercel domain (more secure)**

After you get your Vercel URL, update `server.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:3005'
  ],
  credentials: true
}));
```

Then redeploy on Render.

---

## Step 4: Commit Your Changes

```bash
git add public/js/config.js
git commit -m "Update API URL to point to Render backend"
git push origin main
```

---

## Step 5: Deploy to Vercel

### 5.1: Go to Vercel
1. Open https://vercel.com
2. Click **"Sign Up"** (if new) or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

### 5.2: Import Your Project
1. Click **"Add New..."** button (top right)
2. Select **"Project"**
3. Find **"FINAL-YEAR-PROJECT"** in the repository list
4. Click **"Import"**

### 5.3: Configure Project Settings

**Framework Preset:** Select **"Other"**

**Root Directory:** Leave as `.` (root)

**Build & Development Settings:**
- Build Command: Leave empty or `echo "No build needed"`
- Output Directory: `public`
- Install Command: Leave empty

### 5.4: Environment Variables (Optional)

You can add this if you want:
```
VITE_API_URL = https://your-render-app.onrender.com
```

But it's not required since we hardcoded it in config.js

### 5.5: Deploy!

1. Click **"Deploy"** button
2. Wait 1-2 minutes
3. Watch the deployment logs

---

## Step 6: Get Your Vercel URL

Once deployment completes:

1. You'll see **"Congratulations!"** message
2. Your frontend URL will be shown: `https://your-project.vercel.app`
3. Click **"Visit"** to open your live app

---

## Step 7: Test Your App

1. Open your Vercel URL: `https://your-project.vercel.app`
2. Test the landing page ✅
3. Click "Try Cureastic" or "Live Demo"
4. Try logging in (Guest Demo or create account)
5. Test the chatbot - send a message
6. Check if API calls work (chatbot should respond)

---

## Step 8: Update CORS (If Needed)

If you get CORS errors:

1. Go to your Render dashboard
2. Open your service
3. Go to **"Shell"** tab
4. Or update `server.js` locally and push to GitHub (Render auto-redeploys)

Update CORS to include your Vercel URL:
```javascript
app.use(cors({
  origin: [
    'https://your-actual-vercel-url.vercel.app',
    'http://localhost:3005'
  ],
  credentials: true
}));
```

---

## 🎉 You're Live!

Your app is now deployed:

- **Frontend (Vercel):** `https://your-project.vercel.app`
- **Backend (Render):** `https://cureastic-app.onrender.com`

---

## 🔄 Auto-Deploy Setup

Both platforms auto-deploy on git push:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main
```

- Vercel: Redeploys frontend automatically
- Render: Redeploys backend automatically

---

## 📊 What You Get (Free Tier)

### Vercel Frontend:
- ✅ Global CDN (super fast)
- ✅ Automatic HTTPS
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Preview deployments for PRs

### Render Backend:
- ✅ 750 hours/month free
- ⚠️ Sleeps after 15 min inactivity
- ⚠️ 30-60s wake-up time on first request

---

## 🐛 Troubleshooting

### Issue: "Failed to fetch" or CORS error
**Solution:** 
1. Check `public/js/config.js` has correct Render URL
2. Update CORS in `server.js` on Render
3. Make sure Render backend is awake (visit the URL)

### Issue: 404 on page refresh
**Solution:** Already handled by `vercel.json` rewrites ✅

### Issue: Chatbot not responding
**Solution:**
1. Open browser console (F12)
2. Check Network tab for failed API calls
3. Verify Render backend URL is correct
4. Check if Render service is running

### Issue: Render backend sleeping
**Solution:**
1. First request takes 30-60s (normal on free tier)
2. Upgrade to paid plan ($7/month) for always-on
3. Or use UptimeRobot to ping every 10 minutes

---

## 🎨 Custom Domain (Optional)

### On Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `cureastic.com`)
3. Update DNS records as instructed
4. Wait for DNS propagation (5-30 minutes)

### On Render:
1. Go to your service → Settings
2. Add custom domain
3. Update DNS records
4. Wait for SSL certificate

---

## 📈 Monitor Your App

### Vercel Dashboard:
- Real-time analytics
- Deployment logs
- Performance metrics

### Render Dashboard:
- Server logs (console.log output)
- Metrics (CPU, memory)
- Deployment history

---

## 🚀 Next Steps

1. ✅ Share your live URL with friends/professors
2. ✅ Test all features thoroughly
3. ✅ Monitor logs for any errors
4. ✅ Consider upgrading Render for better performance
5. ✅ Add custom domain (optional)

---

## 💡 Pro Tips

- **Keep Render awake:** Use UptimeRobot (free) to ping your backend every 10 minutes
- **Monitor uptime:** Set up status page with Upptime (free)
- **Analytics:** Add Google Analytics to track visitors
- **Performance:** Use Lighthouse to check performance scores

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Check deployment logs for detailed errors

---

**Congratulations! Your Cureastic app is now live! 🎉**

Share it with the world! 🌍
