# Healio AI - Setup & Fix Guide

## 🎉 What Was Fixed

### 1. **Landing Page Created**
- Created a modern, professional landing page at `/public/index.html`
- Replaced "Vaccine Tracker" with "Wellness" feature
- All "Try Healio" and "Launch Healio" buttons redirect to `/login`

### 2. **Chatbot Health Intelligence Enhanced**
- Updated chatbot prompts to provide detailed health guidance
- Added weather-based health intelligence
- Created WHO dataset with disease information (`data/who_dataset.json`)

### 3. **Weather Integration**
- Weather API endpoint added to server
- Frontend automatically fetches weather on page load
- Chatbot uses weather data to provide context-aware health advice

### 4. **Health Response Format**
The chatbot now follows this structure:
```
🔍 Direct Answer: Short explanation
⚠️ Health Risk: Weather-related risks
💡 Advice: 2-3 practical tips
⚡ Quick Actions: Immediate steps
🏥 When to See a Doctor: Warning signs
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Keys

Edit `.env` file and add your API keys:

```env
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

**Get Free API Keys:**
- **Groq API**: https://console.groq.com/ (Free tier available)
- **Gemini API**: https://makersuite.google.com/app/apikey (Free tier available)
- **OpenWeather API**: https://openweathermap.org/api (Free tier: 1000 calls/day)

### 3. Start the Server
```bash
node server.js
```

The server will run at: `http://localhost:3005`

## 📋 Testing the Chatbot

### Test Queries for Health Intelligence:

1. **General Health Query:**
   - "I feel tired"
   - "I have a headache"
   - "What are dengue symptoms?"

2. **Weather-Aware Queries:**
   - "I feel sick" (chatbot will consider current weather)
   - "How to stay healthy?" (gets weather-specific advice)

3. **Child Care Mode:**
   - Switch to "Child Care" mode in the chatbot
   - Ask: "My baby has fever"
   - Ask: "Feeding tips for toddlers"

## 🌐 Page Routes

- `/` - Landing page (new!)
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - User dashboard
- `/chatbot` - AI Chatbot interface
- `/profile` - User profile
- `/reports` - Health reports

## 🔧 Troubleshooting

### Issue: Chatbot not responding properly
**Solution:** 
- Check if GROQ_API_KEY is valid in `.env`
- Restart the server after updating `.env`
- Check browser console for errors

### Issue: Weather not showing
**Solution:**
- Add OPENWEATHER_API_KEY to `.env`
- Allow location access in browser
- Server falls back to default weather if API fails

### Issue: "Connection error" in chatbot
**Solution:**
- Ensure server is running on port 3005
- Check if API keys are valid
- Look at server console for error messages

## 📊 WHO Dataset

The `data/who_dataset.json` file contains:
- Disease information (symptoms, prevention, severity)
- Weather-based health tips
- General wellness advice

The chatbot uses this data along with AI to provide comprehensive health guidance.

## 🎨 Features

### Landing Page
- Modern, gradient design
- 6 feature cards (including Wellness)
- Responsive layout
- Direct links to login

### Chatbot
- Normal Mode: General health assistance
- Child Care Mode: Specialized for children 1-8 years
- Weather-aware responses
- Multi-language support (English, Hindi, Kannada, Telugu, Tamil)
- Image analysis for health photos
- Hospital finder with maps

### Weather Intelligence
- Automatic location detection
- Real-time weather data
- Health alerts based on conditions:
  - Hot weather → Dehydration, heatstroke warnings
  - Rainy weather → Dengue, malaria alerts
  - Cold weather → Flu, respiratory issue warnings

## 💡 Usage Tips

1. **For Best Results:**
   - Allow location access for weather-based advice
   - Be specific in your health queries
   - Use Child Care mode for pediatric questions

2. **Privacy:**
   - Guest mode available (no signup required)
   - Chat history saved only for registered users
   - Location data used only for weather/hospitals

3. **Limitations:**
   - Chatbot provides awareness, not diagnosis
   - Always consult healthcare professionals for serious issues
   - No prescription or medication recommendations

## 📝 Notes

- The chatbot is powered by Groq's Llama 3.1 model
- Image analysis uses Llama 4 Scout vision model
- Weather data refreshes every 15 minutes
- All responses include mandatory medical disclaimer

## 🆘 Support

If you encounter issues:
1. Check server console for errors
2. Verify all API keys are valid
3. Ensure Node.js version is 14+ 
4. Clear browser cache and cookies

---

**Built with ❤️ for public health awareness**
