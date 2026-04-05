const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('Using Key:', apiKey.substring(0, 7) + '...');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });
  
  try {
    const result = await model.generateContent("Say 'Hello'");
    const response = await result.response;
    console.log('Response:', response.text());
  } catch (e) {
    console.error('Test Failed!');
    console.error(e);
  }
}

test();
