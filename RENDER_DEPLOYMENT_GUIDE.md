# 🚀 Deploy Cureastic to Render - Complete Guide

## Prerequisites
- GitHub account (you already have this ✅)
- Your project pushed to GitHub (done ✅)
- Render account (free)

---

## Step 1: Create Render Account

1. Go to **https://render.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (easiest option)
4. Authorize Render to access your GitHub repositories

---

## Step 2: Create New Web Service

1. Once logged in, click the **"New +"** button (top right)
2. Select **"Web Service"**
3. You'll see a list of your GitHub repositories
4. Find **"FINAL-YEAR-PROJECT"** and click **"Connect"**

---

## Step 3: Configure Your Service

Fill in the following settings:

### Basic Settings:
- **Name**: `cureastic-app` (or any name you prefer)
- **Region**: Choose closest to your location (e.g., Singapore, Frankfurt, Oregon)
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`

### Build & Deploy Settings:
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Instance Type:
- Select **"Free"** (this gives you 750 hours/month free)

---

## Step 4: Add Environment Variables

This is CRITICAL - your app won't work without these!

Scroll down to **"Environment Variables"** section and click **"Add Environment Variable"**

Add each of these (copy the actual values from your local `.env` file):

```
GROQ_API_KEY = your_actual_groq_api_key_here
GEMINI_API_KEY = your_actual_gemini_api_key_here
GOOGLE_MAPS_API_KEY = your_google_maps_api_key_here
OPENWEATHER_API_KEY = your_openweather_api_key_here
SESSION_SECRET = your_session_secret_here
NODE_ENV = production
```

**⚠️ IMPORTANT**: Use your actual API keys from your local `.env` file, not the placeholder text above!

**Important**: Click **"Add"** after each variable!

---

## Step 5: Deploy

1. Click **"Create Web Service"** button at the bottom
2. Render will start building your app (this takes 2-5 minutes)
3. Watch the logs - you'll see:
   - Installing dependencies
   - Building the app
   - Starting the server

---

## Step 6: Access Your Live App

Once deployment succeeds:

1. You'll see **"Live"** status with a green dot
2. Your app URL will be: `https://cureastic-app.onrender.com` (or whatever name you chose)
3. Click the URL to open your live website!

---

## 🎉 Your App is Live!

Your Cureastic app is now accessible worldwide at:
**https://your-app-name.onrender.com**

---

## Important Notes

### Free Tier Limitations:
- App "sleeps" after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free (enough for testing/demos)

### To Keep App Always Active:
- Upgrade to paid plan ($7/month)
- Or use a service like UptimeRobot to ping your app every 10 minutes

### Custom Domain (Optional):
- Go to Settings → Custom Domain
- Add your own domain (e.g., cureastic.com)
- Follow DNS configuration instructions

---

## Troubleshooting

### If Build Fails:
1. Check the logs for errors
2. Make sure `package.json` has all dependencies
3. Verify environment variables are set correctly

### If App Crashes:
1. Check logs in Render dashboard
2. Look for missing environment variables
3. Verify PORT is set to `process.env.PORT` in server.js ✅ (already fixed)

### Database/File Storage:
- Render's free tier has ephemeral storage
- Files (like `users.json`) will reset on each deploy
- For production, consider using a database (MongoDB Atlas, PostgreSQL)

---

## Auto-Deploy on Git Push

Render automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render detects the push and redeploys automatically! 🚀

---

## Next Steps After Deployment

1. Test all features on the live URL
2. Share the link with friends/professors
3. Monitor logs for any errors
4. Consider upgrading for better performance

---

## Need Help?

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- Check deployment logs in Render dashboard

---

**Good luck with your deployment! 🎉**
