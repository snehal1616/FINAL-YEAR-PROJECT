# 🔧 Troubleshooting "Express access failed"

## Current Issue
Frontend can't connect to backend when clicking "Guest Demo"

---

## Quick Diagnostic Steps

### Step 1: Check if Render Backend is Awake

Open this URL in a new tab:
```
https://final-year-project-bms9.onrender.com/
```

**Expected:** Should show the landing page (same as Vercel)  
**If you see:** Landing page = Backend is running ✅  
**If you see:** Error or loading forever = Backend is sleeping ⚠️

---

### Step 2: Test the Guest API Endpoint Directly

Open this URL in a new tab:
```
https://final-year-project-bms9.onrender.com/api/guest
```

**Expected:** Should return JSON like:
```json
{"success":true,"user":{"id":"guest-...","name":"Guest User","email":"guest@demo.com"}}
```

**If you see:** JSON response = API is working ✅  
**If you see:** Error or CORS error = Problem identified ⚠️

---

### Step 3: Check Browser Console

1. On your Vercel site, press **F12**
2. Go to **Console** tab
3. Click "Guest Demo" button
4. Look for errors

**Common errors:**

❌ **"CORS policy"** error:
- Render hasn't redeployed with CORS fix yet
- Wait 2-3 more minutes

❌ **"Failed to fetch"** error:
- Backend is sleeping
- Visit backend URL to wake it up

❌ **"Network error"** or timeout:
- Backend is starting up
- Wait 60 seconds and try again

---

### Step 4: Check Render Deployment Status

1. Go to https://dashboard.render.com
2. Click on your service (srv-d78lgd5m5p6s73ep0i90)
3. Check deployment status

**Look for:**
- ✅ Green "Live" badge = Deployed successfully
- 🔄 Yellow "Deploying" = Still deploying (wait)
- ❌ Red "Failed" = Deployment error (check logs)

**Latest commit should be:** "Fix CORS to allow Vercel frontend domain"

---

### Step 5: Check Render Logs

In Render dashboard:
1. Click "Logs" tab
2. Look for these messages:

✅ **Good signs:**
```
✅ Cureastic Server running at http://localhost:3005
```

❌ **Bad signs:**
```
Error: ...
Cannot find module ...
Port already in use ...
```

---

## Manual Wake-Up Procedure

If backend is sleeping:

1. Open: https://final-year-project-bms9.onrender.com/
2. Wait 30-60 seconds for page to load
3. Then try Guest Demo again on Vercel site

---

## Force Redeploy on Render

If deployment seems stuck:

1. Go to Render dashboard
2. Click your service
3. Click "Manual Deploy" button
4. Select "Clear build cache & deploy"
5. Wait 3-5 minutes
6. Try again

---

## Check CORS Configuration

The CORS fix should be in your `server.js`:

```javascript
app.use(cors({
    origin: [
        'https://final-year-project-rjja.vercel.app',
        'http://localhost:3005'
    ],
    credentials: true
}));
```

**To verify:**
1. Check your GitHub repo
2. Open `server.js`
3. Look around line 17-18
4. Should see the CORS config above

---

## Test with cURL (Advanced)

Open terminal and run:

```bash
curl -X POST https://final-year-project-bms9.onrender.com/api/guest \
  -H "Origin: https://final-year-project-rjja.vercel.app" \
  -v
```

**Look for:**
- `Access-Control-Allow-Origin: https://final-year-project-rjja.vercel.app` ✅
- `200 OK` status ✅

---

## Common Solutions

### Solution 1: Wait for Render
- Render free tier takes time to wake up
- First request: 30-60 seconds
- Be patient!

### Solution 2: Clear Browser Cache
1. Press Ctrl+Shift+Delete
2. Clear cached images and files
3. Refresh page
4. Try again

### Solution 3: Try Incognito Mode
- Open Vercel site in incognito/private window
- This bypasses cache
- Try Guest Demo

### Solution 4: Check Environment Variables
In Render dashboard:
1. Go to "Environment" tab
2. Verify these exist:
   - GROQ_API_KEY
   - GEMINI_API_KEY
   - SESSION_SECRET
   - NODE_ENV=production

---

## Still Not Working?

### Get Detailed Error Info:

1. Open browser console (F12)
2. Go to **Network** tab
3. Click "Guest Demo"
4. Look for failed request (red)
5. Click on it
6. Check "Response" tab
7. Share the error message

### Check Render Logs:

1. Render dashboard → Logs
2. Look for errors when you click Guest Demo
3. Share any error messages

---

## Expected Behavior (When Working)

1. Click "Guest Demo"
2. Button shows loading state
3. Wait 2-60 seconds (depending on backend state)
4. Redirects to dashboard
5. Dashboard loads with your name "Guest User"

---

## Quick Test Script

Paste this in browser console on your Vercel site:

```javascript
fetch('https://final-year-project-bms9.onrender.com/api/guest', {
  method: 'POST',
  credentials: 'include'
})
.then(r => r.json())
.then(d => console.log('✅ Success:', d))
.catch(e => console.error('❌ Error:', e));
```

**Expected output:** `✅ Success: {success: true, user: {...}}`

---

## Contact Info

If still stuck, provide:
1. Screenshot of browser console errors
2. Screenshot of Render logs
3. Render deployment status (Live/Deploying/Failed)

---

**Most likely cause:** Render backend is still sleeping or hasn't redeployed yet.  
**Solution:** Wait 2-3 more minutes, then try again!
