# ✅ Vercel Frontend Deployment Checklist

## Before You Start

- [ ] Backend is deployed on Render
- [ ] You have your Render backend URL (e.g., `https://cureastic-app.onrender.com`)
- [ ] Backend is working (test by visiting the URL)

---

## Step-by-Step Checklist

### 1️⃣ Update Configuration

- [ ] Open `public/js/config.js`
- [ ] Replace `https://cureastic-app.onrender.com` with YOUR actual Render URL
- [ ] Save the file

### 2️⃣ Commit Changes

```bash
git add public/js/config.js
git commit -m "Update API URL for Render backend"
git push origin main
```

- [ ] Changes committed
- [ ] Changes pushed to GitHub

### 3️⃣ Sign Up for Vercel

- [ ] Go to https://vercel.com
- [ ] Click "Sign Up"
- [ ] Choose "Continue with GitHub"
- [ ] Authorize Vercel

### 4️⃣ Import Project

- [ ] Click "Add New..." → "Project"
- [ ] Find "FINAL-YEAR-PROJECT"
- [ ] Click "Import"

### 5️⃣ Configure Settings

- [ ] Framework Preset: **Other**
- [ ] Root Directory: `.` (leave as is)
- [ ] Build Command: (leave empty)
- [ ] Output Directory: `public`
- [ ] Install Command: (leave empty)

### 6️⃣ Deploy

- [ ] Click "Deploy" button
- [ ] Wait 1-2 minutes
- [ ] Deployment successful ✅

### 7️⃣ Get Your URL

- [ ] Copy your Vercel URL: `https://________.vercel.app`
- [ ] Click "Visit" to open your app

### 8️⃣ Test Your App

- [ ] Landing page loads
- [ ] Click "Try Cureastic" or "Live Demo"
- [ ] Login page works
- [ ] Can login as Guest
- [ ] Dashboard loads
- [ ] Chatbot page opens
- [ ] Send a message to chatbot
- [ ] Chatbot responds (API working!)
- [ ] Weather widget works
- [ ] All pages accessible

### 9️⃣ Update CORS (If Needed)

If you get CORS errors:

- [ ] Go to Render dashboard
- [ ] Open your service
- [ ] Update `server.js` CORS settings:
```javascript
app.use(cors({
  origin: [
    'https://your-vercel-url.vercel.app',
    'http://localhost:3005'
  ],
  credentials: true
}));
```
- [ ] Push changes to GitHub (Render auto-redeploys)

### 🔟 Share Your App

- [ ] Test all features one more time
- [ ] Share URL with friends/professors
- [ ] Add to your resume/portfolio
- [ ] Celebrate! 🎉

---

## Your Live URLs

**Frontend (Vercel):**
```
https://_________________.vercel.app
```

**Backend (Render):**
```
https://_________________.onrender.com
```

---

## Common Issues & Solutions

### ❌ "Failed to fetch" error
**Fix:** Check `public/js/config.js` has correct Render URL

### ❌ CORS error in console
**Fix:** Update CORS in `server.js` on Render

### ❌ Chatbot not responding
**Fix:** 
1. Check browser console for errors
2. Verify Render backend is awake (visit URL)
3. Check API_BASE_URL in config.js

### ❌ 404 on page refresh
**Fix:** Already handled by `vercel.json` ✅

### ❌ Slow first response
**Fix:** Render free tier sleeps after 15 min (normal behavior)

---

## Optional Enhancements

- [ ] Add custom domain on Vercel
- [ ] Set up UptimeRobot to keep Render awake
- [ ] Add Google Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Upgrade Render to paid plan ($7/month) for always-on

---

## 🎉 Success Criteria

✅ Frontend loads on Vercel  
✅ Backend responds from Render  
✅ Chatbot works  
✅ Login/signup works  
✅ All pages accessible  
✅ No CORS errors  

**You're done! Your app is live! 🚀**

---

## Need Help?

📖 Read: `FRONTEND_VERCEL_STEPS.md` for detailed instructions  
🏗️ Read: `DEPLOYMENT_ARCHITECTURE.md` for architecture overview  
🔧 Check: Browser console (F12) for error messages  
📊 Check: Vercel deployment logs  
📊 Check: Render service logs  

---

**Last Updated:** After backend deployed on Render
