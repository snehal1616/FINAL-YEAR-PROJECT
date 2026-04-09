const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Groq } = require("groq-sdk");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_KEY");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "YOUR_KEY" });

const CHILD_PROMPT = `
You are a very sweet, specialized Child Care Assistant for children aged 1-8 years. 
Mode: Child Care Mode. 🧸🍼👶

## 🧠 BEHAVIOR:
- Act as a sweet, caring, and highly reassuring guardian.
- Focus: Fever, Stomach pain, Crying, Sleep, Feeding, Hygiene.
- Special Focus: Calm crying babies, provide nutrition-rich feeding tips, and daily care.
- Tone: Extremely gentle, using frequent emojis (🧸, 🍼, 👶, ❤️, 🍭) to make parents feel safe.

## 📌 RESPONSE FORMAT:
Direct Answer: • Sweet, caring explanation 👶
Key Points: • What to watch for 🧸
Advice: • Actionable care steps (calming, feeding, etc.) 🍼
Extra: • Specific Vaccination reminders if relevant.
When to See a Doctor: • Clear pediatric warning signs ⚠️

Care Tip 💡: • Add a unique, sweet daily care tip at the very end.

## ⚠️ SAFETY:
- NO medications. Always include mandatory disclaimer.
`;

const NORMAL_PROMPT = `
You are Cureastic, an AI-powered public health assistant.
Mode: Normal Health Mode. 🩺

## 🧠 BEHAVIOR:
- Answer health questions clearly, simply, and practically.
- Focus on preventive healthcare and awareness.
- Avoid medical jargon — keep it easy to understand.
- Tone: Friendly, helpful, slightly professional, practical, and actionable.

## 🌦️ WEATHER-BASED INTELLIGENCE:
If weather data is provided in the user's message context:
- Rainy/Drizzle/Rain/Thunderstorm → Mention risk of dengue, malaria, waterborne diseases, leptospirosis.
- Hot/Sunny/Clear (temp > 30°C) → Mention dehydration, heatstroke, heat exhaustion, sunburn.
- Cold/Snow/Fog (temp < 15°C) → Mention cold, flu, respiratory issues, hypothermia.
- Humid (humidity > 80%) → Mention fungal infections, skin rashes, heat-related issues.
- Windy/Dust → Mention allergies, eye irritation, respiratory issues.

IMPORTANT: Always consider the weather data when crafting your health advice, even if the user doesn't explicitly mention weather. Weave it naturally into your response.

## 📌 RESPONSE FORMAT (STRICTLY follow this structure):

**🔍 Direct Answer:**
• Short, clear explanation of the health concern.

**⚠️ Health Risk:**
• Weather-related health risks based on current conditions.
• If no weather data, mention general seasonal risks.

**💡 Advice:**
• 2–3 practical prevention or care tips.

**⚡ Quick Actions:**
• 1–2 immediate, useful action steps (e.g., stay hydrated, check symptoms, find nearby hospitals).

**🏥 When to See a Doctor:**
• Clear warning signs that need professional attention.

---
⚕️ *This is for awareness only. Please consult a healthcare professional for proper diagnosis and treatment.*

## ⚠️ SAFETY RULES:
- Do NOT suggest specific medicines or prescriptions.
- Do NOT give a final diagnosis.
- Always end responses with the disclaimer above.
`;

// Weather condition categorizer
function categorizeWeather(weather) {
    if (!weather) return null;
    
    const condition = (weather.condition || '').toLowerCase();
    const temp = parseFloat(weather.temp) || 25;
    const humidity = parseFloat(weather.humidity) || 50;
    
    let category = 'moderate';
    
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder') || condition.includes('shower')) {
        category = 'rainy';
    } else if (condition.includes('snow') || condition.includes('blizzard') || temp < 15) {
        category = 'cold';
    } else if (condition.includes('sunny') || condition.includes('clear') || condition.includes('hot') || temp > 32) {
        category = 'hot';
    } else if (condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) {
        category = 'foggy';
    } else if (condition.includes('dust') || condition.includes('sand')) {
        category = 'dusty';
    }

    return {
        category,
        temp,
        humidity,
        condition: weather.condition,
        location: weather.location || 'Unknown'
    };
}

async function processQuery(message, userId, lang = 'en', mode = 'normal', weather = null) {
    try {
        const langMap = {
            'en': 'English', 'hi': 'Hindi', 'kn': 'Kannada', 'te': 'Telugu', 'ta': 'Tamil',
            'bn': 'Bengali', 'mr': 'Marathi', 'gu': 'Gujarati', 'ml': 'Malayalam',
            'pa': 'Punjabi', 'ur': 'Urdu'
        };
        const langName = langMap[lang] || 'English';
        const basePrompt = mode === 'child' ? CHILD_PROMPT : NORMAL_PROMPT;
        let systemPrompt = basePrompt + `\nSTRICT REQUIREMENT: You MUST respond entirely in ${langName}. Do not use English unless necessary for medical terms.`;

        // Build user message with weather context
        let userMessage = message;
        if (mode === 'normal' && weather && !weather.error) {
            const weatherInfo = categorizeWeather(weather);
            if (weatherInfo) {
                userMessage = `[CURRENT WEATHER CONTEXT — Use this to give weather-aware health advice]
Location: ${weatherInfo.location}
Condition: ${weatherInfo.condition}
Temperature: ${weatherInfo.temp}°C
Humidity: ${weatherInfo.humidity}%
Category: ${weatherInfo.category}

User's health query: ${message}`;
            }
        }
        
        console.log(`[ChatEngine] Processing query for User: ${userId} in Language: ${langName} (${lang})`);

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { 
                    role: "user", 
                    content: `[USER_LANGUAGE_PREFERENCE: ${langName}] Ensure your entire clinical response is in ${langName}. \n\nUser Query: ${userMessage}` 
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.5,
        });

        return { text: chatCompletion.choices[0].message.content, topic: mode === 'child' ? "Child Care" : "General Health" };
    } catch (error) {
        console.error("Groq Error:", error);
        console.error("Error details:", error.message);
        console.error("API Key present:", !!process.env.GROQ_API_KEY);
        return { text: "I encountered an error. Please try again.", topic: "Error" };
    }
}

async function processImage(imageBuffer, mimeType, userId, lang = 'en', mode = 'normal') {
    const langMap = {
        'en': 'English', 'hi': 'Hindi', 'kn': 'Kannada', 'te': 'Telugu', 'ta': 'Tamil',
        'bn': 'Bengali', 'mr': 'Marathi', 'gu': 'Gujarati', 'ml': 'Malayalam',
        'pa': 'Punjabi', 'ur': 'Urdu'
    };
    const langName = langMap[lang] || 'English';
    const systemPrompt = (mode === 'child' ? CHILD_PROMPT : NORMAL_PROMPT) + 
        ` \n[IMAGE_ANALYSIS_CONTEXT]\nThe user has provided an image for analysis. \nAnalyze this health-related image (mode: ${mode}). Explain the visual signs of any symptoms seen.\nCRITICAL: Respond COMPLETELY in it ${langName}. Do not use English unless required for medical terminology.`;

    const base64Data = imageBuffer.toString("base64");

    // Unified Groq-Only Vision Engine (Bypassing Gemini)
    try {
        console.log(`[Vision] Analyzing via Groq Llama-4-Scout (April 2026 Edition)...`);
        const groqResponse = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user",
                    content: [
                        { type: "text", text: `Analyze this photo in ${langName}.` },
                        { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Data}` } }
                    ]
                }
            ],
            // Use the definitively active Llama 4 Scout model with full meta-llama prefix
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            temperature: 0.1,
            max_tokens: 1024,
        });

        const text = groqResponse.choices[0].message.content;
        return { text, topic: "Health Vision (Llama-4)" };
    } catch (e) {
        console.error("Groq Vision Engine Error:", e.message);
        return { 
            text: `Image analysis module is currently unavailable. \n\n**Common Reasons:**\n- High image resolution (please try a smaller file)\n- Unsupported image format\n- Daily API quota reached\n\nPlease describe your clinical symptoms in text for now.`, 
            topic: "Vision Error" 
        };
    }
}

async function generateWellnessTasks(history = [], weather = null, mode = 'normal', lang = 'en') {
    const langMap = {
        'en': 'English', 'hi': 'Hindi', 'kn': 'Kannada', 'te': 'Telugu', 'ta': 'Tamil',
        'bn': 'Bengali', 'mr': 'Marathi', 'gu': 'Gujarati', 'ml': 'Malayalam',
        'pa': 'Punjabi', 'ur': 'Urdu'
    };
    const langName = langMap[lang] || 'English';

    const systemPrompt = `
You are an AI health assistant that generates daily health and fitness tasks for users.

## 🧠 Instructions:
* User query history: ${JSON.stringify(history.slice(-3))}
* Current weather: ${JSON.stringify(weather)}
* Mode: ${mode} (normal / child)
* Language: ${langName}

* Generate 4–6 simple daily health tasks
* Tasks should be practical and easy to follow
* Keep language simple and clear
* Make tasks relevant to:
  • User health concerns (if available from history)
  • Weather conditions
  • Mode (normal or child)

## 🎯 Task Guidelines:
### For Normal Mode:
Include tasks like: Drink enough water, Exercise or walking, Healthy eating, Sleep routine.

### For Child Mode:
Include: Feeding schedule, Sleep routine, Hygiene care, Vaccine reminders (if relevant).

## 🌦️ Weather-Based Tasks:
* Hot → hydration, avoid heat
* Rainy → hygiene, mosquito prevention
* Cold → warm clothing, immunity care

## 📌 Output Format (STRICT):
Daily Health Tasks:
• Task 1
• Task 2
• Task 3
• Task 4
• Task 5

Add 1 motivational line at the end.

## 🎨 Tone: Simple, Encouraging, Friendly.
## ⚠️ Rules:
* Keep tasks short (1 line each)
* Avoid medical jargon
* Respond COMPLETELY in ${langName}
* Focus on prevention and routine
`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }, { role: "user", content: "Generate today's wellness tasks." }],
            model: "llama-3.1-8b-instant",
            temperature: 0.6,
        });
        return chatCompletion.choices[0].message.content;
    } catch (e) {
        console.error("Wellness Task Generation Error:", e);
        return "Stay active, drink water, and get plenty of rest!";
    }
}

module.exports = { processQuery, processImage, generateWellnessTasks };
