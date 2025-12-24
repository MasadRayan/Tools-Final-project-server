import { generateResponse } from "../service/chatbot.service.js";

export async function handleChatbotRequest(req, res) {
  const { question } = req.body;
  if (!question) return res.status(400).json({ message: "Question is required" });

  const response = await generateResponse(question);
  res.send(response);
}