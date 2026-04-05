require('dotenv').config();
const { processQuery } = require('./chatbot-engine');

async function testGroq() {
    console.log("🧪 Testing Groq AI Connection...");
    try {
        const result = await processQuery("What are the symptoms of common cold?", "test-user", "en");
        console.log("✅ AI Response Received:");
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("❌ AI Error During Test:", error.message);
    }
}

testGroq();
