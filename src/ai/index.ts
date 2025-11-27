import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT } from "../prompt";
import { ENV } from "../config/env";
import { UserFormData } from "../types";

export const generateAIResponse = async (userData: UserFormData): Promise<string> => {
  try {
    const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({
      model: ENV.GEMINI_MODEL_NAME as string,
    });
    const finalPrompt = `
${PROMPT}

User Data:
${JSON.stringify(userData, null, 2)}
`;
    const response = await model.generateContent(finalPrompt);

    const aiOutput = response.response.text();

    return aiOutput || "No response generated.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "Something went wrong while generating the AI response.";
  }
};
