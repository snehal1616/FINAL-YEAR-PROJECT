const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listAllModels() {
    console.log("Checking API access...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    try {
        // Some SDKs use a different method to list. Let's try to probe common ones.
        const flashModels = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash-exp', 'gemini-flash-pro'];
        for (const m of flashModels) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                await model.generateContent("Hi");
                console.log(`✅ ${m} works!`);
                return;
            } catch (e) {
                console.log(`❌ ${m} failed: ${e.message}`);
            }
        }
    } catch (e) {
        console.error(e.message);
    }
}

listAllModels();
