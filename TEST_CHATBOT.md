# 🧪 Quick Test Guide for Healio Chatbot

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   node server.js
   ```

2. **Open browser:**
   ```
   http://localhost:3005
   ```

3. **You should see:**
   - Beautiful landing page with gradient background
   - "Healio" logo with heart icon
   - "AI-Powered Healthcare Assistant" heading
   - 6 feature cards including "Wellness"
   - "Try Healio" and "Launch Healio" buttons

## 🧪 Test Scenarios

### Test 1: Landing Page
- ✅ Visit `http://localhost:3005`
- ✅ Click "Try Healio" → Should go to login page
- ✅ Click "Launch Healio" → Should go to login page
- ✅ Click "Live Demo" → Should go to login page

### Test 2: Login & Access Chatbot
1. Click "Try Healio"
2. Click "Continue as Guest" (or signup)
3. Navigate to "AI Chatbot" from sidebar
4. You should see the chatbot interface

### Test 3: Basic Health Query
**Type:** "I have a headache"

**Expected Response Format:**
```
🔍 Direct Answer:
• Explanation of headache causes

⚠️ Health Risk:
• Weather-related risks (if applicable)

💡 Advice:
• Rest in a quiet, dark room
• Stay hydrated
• Apply cold compress

⚡ Quick Actions:
• Monitor symptoms
• Check if fever present

🏥 When to See a Doctor:
• Severe or sudden headache
• Vision changes
• Fever with stiff neck

⚕️ This is for awareness only. Please consult a healthcare professional.
```

### Test 4: Weather-Aware Query (Hot Day)
**Type:** "I feel tired"

**Expected:** Response should mention:
- Dehydration risk due to hot weather
- Heat exhaustion warning
- Drink plenty of water
- Avoid direct sunlight

### Test 5: Weather-Aware Query (Rainy Day)
**Type:** "I feel sick"

**Expected:** Response should mention:
- Dengue/malaria risk during rainy season
- Waterborne disease prevention
- Use mosquito repellent
- Avoid stagnant water

### Test 6: Disease Information
**Type:** "What are dengue symptoms?"

**Expected:** Response should include:
- High fever
- Severe headache
- Pain behind eyes
- Joint and muscle pain
- Rash
- Prevention tips
- When to see doctor

### Test 7: Child Care Mode
1. Click "Child Care" button in top bar
2. **Type:** "My baby has fever"

**Expected:** Response should be:
- Sweet and caring tone
- Use emojis (🧸, 🍼, 👶)
- Pediatric-specific advice
- Reassuring language
- Care tip at the end

### Test 8: Multi-Language
1. Select "Hindi (हिन्दी)" from language dropdown
2. **Type:** "I have fever"
3. **Expected:** Response in Hindi

### Test 9: Weather Widget
**Check sidebar:**
- Should show current weather
- Temperature and condition
- Health alert based on weather
- Location name

### Test 10: Image Analysis
1. Click camera icon
2. Upload a health-related image
3. **Expected:** AI analyzes and provides health insights

## ✅ Success Indicators

### Chatbot is Working Properly If:
1. ✅ Responses are detailed (not just 1-2 lines)
2. ✅ Includes all sections: Direct Answer, Health Risk, Advice, Quick Actions, When to See Doctor
3. ✅ Mentions weather conditions when relevant
4. ✅ Provides 2-3 practical tips
5. ✅ Includes medical disclaimer at end
6. ✅ Tone is friendly and helpful
7. ✅ No generic "I'm an AI" responses

### Weather Integration is Working If:
1. ✅ Weather widget appears in sidebar
2. ✅ Shows current temperature and condition
3. ✅ Displays health alert based on weather
4. ✅ Chatbot mentions weather in responses

### Landing Page is Working If:
1. ✅ Shows at root URL `/`
2. ✅ Has "Wellness" feature card (not "Vaccine Tracker")
3. ✅ All buttons redirect to `/login`
4. ✅ Responsive design works on mobile

## 🐛 Common Issues & Fixes

### Issue: Chatbot gives generic responses
**Fix:** 
- Check if GROQ_API_KEY is set in `.env`
- Restart server after updating `.env`
- Check server console for API errors

### Issue: Weather not showing
**Fix:**
- Add OPENWEATHER_API_KEY to `.env`
- Allow location access in browser
- Check browser console for errors

### Issue: "Connection error"
**Fix:**
- Ensure server is running
- Check if port 3005 is available
- Verify API keys are valid

### Issue: Responses not in selected language
**Fix:**
- This is expected for some languages (model limitation)
- English works best
- Hindi, Kannada, Telugu, Tamil have partial support

## 📊 Expected Behavior

### Normal Mode:
- Professional, clear health guidance
- Weather-aware advice
- Structured response format
- Medical disclaimer

### Child Care Mode:
- Sweet, caring tone
- Frequent emojis
- Pediatric-specific advice
- Reassuring language
- Daily care tips

## 🎯 Key Features to Test

1. **Weather Intelligence:**
   - Hot weather → Dehydration warnings
   - Rainy → Dengue/malaria alerts
   - Cold → Flu/respiratory warnings

2. **Disease Knowledge:**
   - Symptoms
   - Prevention
   - When to see doctor
   - Health risks

3. **Practical Advice:**
   - 2-3 actionable tips
   - Quick actions
   - Warning signs

4. **Safety:**
   - No medication recommendations
   - No final diagnosis
   - Always includes disclaimer

## 📝 Sample Test Queries

Copy and paste these into the chatbot:

```
1. I have fever and headache
2. How to prevent dengue?
3. I feel dizzy in this heat
4. What are malaria symptoms?
5. I have a cold
6. My throat is sore
7. I feel weak and tired
8. How to stay healthy in rainy season?
9. What to do for dehydration?
10. I have stomach pain
```

## ✨ Success Criteria

The chatbot is working perfectly if:
- ✅ Provides detailed, structured responses
- ✅ Considers weather in advice
- ✅ Gives practical, actionable tips
- ✅ Includes warning signs
- ✅ Has medical disclaimer
- ✅ Tone is friendly and helpful
- ✅ No generic AI responses

---

**Happy Testing! 🎉**
