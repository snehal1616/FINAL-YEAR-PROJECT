const axios = require('axios');
require('dotenv').config();

async function checkKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  try {
    const res = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    console.log("SUCCESS. Models found:", res.data.models.map(m => m.name).slice(0, 5));
  } catch (err) {
    console.error("ERROR from Google API:");
    console.error(err.response ? err.response.data : err.message);
  }
}

checkKey();
