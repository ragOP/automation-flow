import { Request, Response } from "express";
import { UserFormData } from "../types/index";
import { generateAIResponse } from "../ai";
import { generatePDF } from "../utils";

export const handleFormSubmit = async (req: Request, res: Response) => {
    try {
        const userData: UserFormData = req.body;

        console.log("Received user data:", userData);

        // 1. Call AI to get structured JSON
        const aiResponse = await generateAIResponse(userData);
        const cleaned = aiResponse.replace(/```json|```/g, "").trim();

        console.log("Cleaned AI Response:", cleaned);
        console.log("AI Response:", JSON.parse(cleaned));

        // 2. Generate PDF based on AI JSON
        const pdfBuffer = await generatePDF(JSON.parse(cleaned));

        
        // 3. Return the PDF as a file download
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=horoscope.pdf");
        
        return res.send(pdfBuffer);

    } catch (error: any) {
        console.error("Error handling form submission:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};