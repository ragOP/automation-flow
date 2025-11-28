import path from "node:path";
import fs from "node:fs";
import { Request, Response } from "express";
import { UserFormData } from "../types/index";
import { generateAIResponse } from "../ai";
import { generatePDF } from "../utils";

export const handleFormSubmit = async (req: Request, res: Response) => {
    try {
        const userData: UserFormData = req.body;

        // 1. Save user to mongoDB to future use

        console.log("Received user data:", userData);

        // 2. Call AI to get structured JSON
        const aiResponse = await generateAIResponse(userData);
        const cleaned = aiResponse.replace(/```json|```/g, "").trim();

        console.log("Cleaned AI Response:", cleaned);
        console.log("AI Response:", JSON.parse(cleaned));

        // 3. Generate PDF based on AI JSON
        const pdfBuffer = await generatePDF(JSON.parse(cleaned));

        // 4. Save PDF to a file (optional)
        const downloadPath =  path.join(__dirname, "../downloads/horoscope.pdf");
        fs.writeFileSync(downloadPath, pdfBuffer);

        console.log(`PDF saved to ${downloadPath}`);

        // 5. Return the PDF as a file download
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