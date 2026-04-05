const { Groq } = require("groq-sdk");
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function listModels() {
    try {
        const models = await groq.models.list();
        console.log("ALL AVAILABLE MODELS:");
        models.data.forEach(m => console.log("- " + m.id));
    } catch (e) {
        console.error("GROQ LIST ERROR:", e.message);
    }
}

listModels();
