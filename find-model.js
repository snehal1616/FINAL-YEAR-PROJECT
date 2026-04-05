const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function findWorkingModel() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Typical model names in early-mid 2026
    const potentialModels = [
        'gemini-2.0-flash', 
        'gemini-1.5-flash', 
        'gemini-1.5-flash-8b', 
        'gemini-2.0-pro-exp',
        'gemini-pro'
    ];

    for (const m of potentialModels) {
        try {
            console.log(`Checking ${m}...`);
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Say 'Ready'");
            console.log(`✅ ${m} is working!`);
            return m;
        } catch (e) {
            console.log(`❌ ${m} failed: ${e.status || e.message}`);
        }
    }
}

findWorkingModel();
