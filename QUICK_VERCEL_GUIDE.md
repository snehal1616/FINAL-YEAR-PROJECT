# 🚀 Quick Vercel Deployment (5 Minutes)

## What You Need
- ✅ Backend already on Render
- ✅ Your Render URL

---

## 3 Simple Steps

### Step 1: Update Config (1 minute)

Open `public/js/config.js` and add your Render URL:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3005' 
  : 'https://YOUR-RENDER-URL.onrender.com'; // ⬅️ YOUR URL HERE
```

Commit and push:
```bash
git add .
git commit -m "Update API URL"
git push origin main
```

---

### Step 2: Deploy to Vercel (2 minutes)

1. Go to **https://vercel.com**
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Select **"FINAL-YEAR-PROJECT"**
5. Click **"Import"**
6. Settings:
   - Framework: **Other**
   - Output Directory: **public**
7. Click **"Deploy"**

---

### Step 3: Test (2 minutes)

1. Open your Vercel URL
2. Click "Try Cureastic"
3. Login as Guest
4. Send a chatbot message
5. ✅ If it responds, you're done!

---

## That's It! 🎉

Your app is live:
- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://your-render-url.onrender.com`

---

## Troubleshooting

**Chatbot not working?**
- Check browser console (F12)
- Verify Render URL in `config.js`
- Wait 60s for Render to wake up (free tier)

**CORS error?**
- Update `server.js` on Render:
```javascript
app.use(cors({
  origin: ['https://your-vercel-url.vercel.app'],
  credentials: true
}));
```

---

## Done! Share Your App! 🌍

**Full Guide:** See `FRONTEND_VERCEL_STEPS.md`  
**Checklist:** See `VERCEL_DEPLOYMENT_CHECKLIST.md`
