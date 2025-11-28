import { Request, Response } from "express";
import { UserFormData } from "../types/index";
import { horoscopeQueue } from "../queues";

export const handleFormSubmit = async (req: Request, res: Response) => {
    try {
        const userData: UserFormData = req.body;

        // 1. Save user to mongoDB to future use
        console.log("Received user data:", userData);

        // 2. Add job to BullMQ queue for processing
        await horoscopeQueue.add("generate-horoscope", {
            userId: Math.random().toString(36).substring(2, 15),
            ...userData,
        })
        
        return res.send({
            statusCode: 200,
            success: true,
            message: "We are generating your horoscope. You will receive it shortly via WhatsApp.",
        });

    } catch (error: any) {
        console.error("Error handling form submission:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};