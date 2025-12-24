import express from "express";
const chatbotRouter = express.Router();
import { handleChatbotRequest } from "../controllers/chatbot.controller.js";

chatbotRouter.post("/", handleChatbotRequest)

export default chatbotRouter