const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Instruct the SDK to use v1beta, where the newer gemini-2.0-flash models live
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }, { apiVersion: 'v1beta' });
  
  try {
    const result = await model.generateContent("Say 'Hello'");
    console.log("SUCCESS:", await result.response.text());
  } catch (e) {
    console.error("FAIL:", e.status, e.message);
  }
}

test();
