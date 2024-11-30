const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/generate-brief", async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const prompt = `
    Generate a detailed content brief for the topic: "${topic}".

    Include the following:
    1. Compelling headings and subheadings to structure the content effectively.
    2. Key points focusing on reader engagement.
    3. Include proper external links to authoritative sources to add credibility.
    4. Ensure the tone is natural, engaging, and hooks the reader from the beginning.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let content = result.response.text();

    // List of sections to remove
    const unwantedSections = [
      "Target Audience:",
      "Keywords:",
      "Tone:"
    ];

    

    res.json({ brief: content });
  } catch (error) {
    console.error("Error generating content:", error.message);
    res.status(500).json({ error: "Failed to generate content brief" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});