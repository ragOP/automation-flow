import { Request, Response } from "express";
import { UserFormData } from "../types/index";
import { horoscopeQueue } from "../queues";
import { OrderModel } from "../models";

export const handleFormSubmit = async (req: Request, res: Response) => {
    try {
        const userData: UserFormData = req.body;

        if(!userData.firstName || !userData.lastName || !userData.dob || !userData.placeOfBirth || !userData.phoneNumber) {
            return res.status(400).json({
                message: "Please Fill all required fields.",
            });
        }

        const order = await OrderModel.create({
            ...userData,
        })

        if(!order) {
            return res.status(500).json({
                message: "Please Fill all required fields and try again.",
            });
        }

        // 2. Add job to BullMQ queue for processing
        await horoscopeQueue.add("generate-horoscope", {
            userId: order._id.toString(),
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