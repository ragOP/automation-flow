import { Request, Response } from "express";
import { UserFormData } from "../types/index";
import { generateAIResponse } from "../ai";

export const handleFormSubmit = async (req: Request, res: Response) => {
    try {
        const userData: UserFormData = req.body;

        // Save the user data to the database
        console.log("Received user data:", userData);

         res.status(200).json({ message: "Form submission successful", data: userData });


        // Call the LLM API with the user data
        const aiResponse: string = await generateAIResponse(userData);

        console.log("AI Response:", aiResponse);

        // append the json reponse with the pre-built template

        res.status(200).json({ message: "Final PDF sent to the user", aiResponse  });
    } catch (error: any) {
        console.error("Error handling form submission:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}