const { Groq } = require("groq-sdk");
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function test() {
    try {
        console.log("Testing Groq Vision (Llama-3.2-11b)...");
        const groqResponse = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What's in this image?" },
                        { type: "image_url", image_url: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg" } }
                    ]
                }
            ],
            model: "llama-3.2-11b-vision-preview",
        });
        console.log("Success! Response:", groqResponse.choices[0].message.content);
    } catch (e) {
        console.error("GROQ ERROR DETAILS:");
        console.error("Message:", e.message);
    }
}

test();
