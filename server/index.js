import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";

const app = express();
app.use(express.json());

app.post("/api", async (req, res) => {
  const { prompt } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let answer = null;
  try {
    const result = await model.generateContent(prompt);
    res.json(result.response.text());
  } catch (e) {
    console.log(e.details);
    res.json(e.details);
  }
});

app.listen(8080, () => {
  console.log("Listening on port no. 8080");
});
