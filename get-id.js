const { Groq } = require("groq-sdk");
require('dotenv').config();
const fs = require('fs');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function find() {
    const models = await groq.models.list();
    const result = models.data.filter(m => m.id.toLowerCase().includes("scout")).map(m => m.id);
    fs.writeFileSync("model_id.txt", result.join("\n"));
    console.log("Found: " + result.length);
}
find();
