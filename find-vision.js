const { Groq } = require("groq-sdk");
require('dotenv').config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function find() {
    const models = await groq.models.list();
    models.data.forEach(m => {
        if (m.id.toLowerCase().includes("scout") || m.id.toLowerCase().includes("vision")) {
           console.log("VISION_MODEL_FOUND: " + m.id);
        }
    });
}
find();
