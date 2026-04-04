# 🏗️ Cureastic Deployment Architecture

## Recommended Setup: Split Deployment

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
│                  (Anywhere in the world)                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS
                     │
        ┌────────────▼────────────┐
        │                         │
        │   VERCEL (Frontend)     │
        │   Global CDN            │
        │                         │
        │  • Landing Page         │
        │  • Login/Signup         │
        │  • Dashboard UI         │
        │  • Chatbot UI           │
        │  • Static Assets        │
        │                         │
        └────────────┬────────────┘
                     │
                     │ API Calls
                     │ (HTTPS)
                     │
        ┌────────────▼────────────┐
        │                         │
        │   RENDER (Backend)      │
        │   Node.js Server        │
        │                         │
        │  • Express API          │
        │  • AI Chatbot Engine    │
        │  • Authentication       │
        │  • Session Management   │
        │  • Database (JSON)      │
        │  • External APIs        │
        │    - Groq AI            │
        │    - Gemini AI          │
        │    - Weather API        │
        │    - Maps API           │
        │                         │
        └─────────────────────────┘
```

---

## Why This Architecture?

### Vercel (Frontend)
✅ **Ultra-fast**: Global CDN with edge caching  
✅ **Free tier**: Generous limits for static sites  
✅ **Auto-deploy**: Push to GitHub = instant deploy  
✅ **HTTPS**: Automatic SSL certificates  
✅ **Zero config**: Works out of the box  

### Render (Backend)
✅ **Node.js optimized**: Better for Express servers  
✅ **Persistent connections**: WebSocket support  
✅ **File system**: Can store users.json  
✅ **Environment variables**: Secure API key storage  
✅ **Free tier**: 750 hours/month  

---

## Alternative: All-in-One Deployment

### Option A: Everything on Vercel
```
┌─────────────────────────────────┐
│         VERCEL                  │
│  ┌──────────────────────────┐   │
│  │  Frontend (Static)       │   │
│  └──────────────────────────┘   │
│  ┌──────────────────────────┐   │
│  │  Backend (Serverless)    │   │
│  │  - API Routes            │   │
│  │  - Limited to 10s timeout│   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

**Pros**: Single deployment, simpler setup  
**Cons**: Serverless limitations, cold starts, no persistent storage

### Option B: Everything on Render
```
┌─────────────────────────────────┐
│         RENDER                  │
│  ┌──────────────────────────┐   │
│  │  Node.js Server          │   │
│  │  - Express               │   │
│  │  - Static files          │   │
│  │  - API routes            │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

**Pros**: Simple, everything in one place  
**Cons**: Slower static file serving, no CDN

---

## Deployment Steps Summary

### 1. Deploy Backend to Render
```bash
# Already configured in RENDER_DEPLOYMENT_GUIDE.md
# Result: https://cureastic-app.onrender.com
```

### 2. Update Frontend Config
```javascript
// public/js/config.js
const API_BASE_URL = 'https://cureastic-app.onrender.com';
```

### 3. Deploy Frontend to Vercel
```bash
# Follow VERCEL_DEPLOYMENT_GUIDE.md
# Result: https://cureastic.vercel.app
```

### 4. Configure CORS
```javascript
// server.js
app.use(cors({
  origin: ['https://cureastic.vercel.app'],
  credentials: true
}));
```

---

## Environment Variables

### Vercel (Frontend)
```
VITE_API_URL = https://cureastic-app.onrender.com
```

### Render (Backend)
```
GROQ_API_KEY = your_key
GEMINI_API_KEY = your_key
GOOGLE_MAPS_API_KEY = your_key
OPENWEATHER_API_KEY = your_key
SESSION_SECRET = your_secret
NODE_ENV = production
```

---

## Cost Breakdown (Free Tier)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Vercel | ✅ Free | 100GB bandwidth/month |
| Render | ✅ Free | 750 hours/month, sleeps after 15min |
| **Total** | **$0/month** | Perfect for demos & projects |

### Upgrade Options
- Vercel Pro: $20/month (more bandwidth)
- Render Starter: $7/month (no sleep, always on)

---

## Performance Expectations

### With Split Deployment:
- **Landing page load**: < 1 second (Vercel CDN)
- **API response**: 200-500ms (Render)
- **First load after sleep**: 30-60s (Render free tier)

### With Paid Render:
- **API response**: 100-300ms (always on)
- **No cold starts**: Instant responses

---

## Security Considerations

✅ **HTTPS everywhere**: Both Vercel and Render provide SSL  
✅ **API keys hidden**: Environment variables, not in code  
✅ **CORS configured**: Only your frontend can access backend  
✅ **Session security**: HTTP-only cookies  
✅ **No secrets in Git**: .env excluded  

---

## Monitoring & Logs

### Vercel Dashboard
- Real-time deployment logs
- Analytics (page views, performance)
- Error tracking

### Render Dashboard
- Server logs (console.log output)
- Metrics (CPU, memory usage)
- Deployment history

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Get backend URL
3. ✅ Update `public/js/config.js` with backend URL
4. ✅ Deploy frontend to Vercel
5. ✅ Test all features
6. ✅ Share your live app!

---

**Your app will be live at:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://cureastic-app.onrender.com`

🎉 **Ready to deploy!**
