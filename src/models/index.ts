import mongoose from "mongoose";
import { OrderDocument } from "../types/index";

const OrderSchema = new mongoose.Schema<OrderDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    pdfUrl: { type: String },
    isWhatsAppSent: { type: Boolean },
}, {
    timestamps: true,
});

export const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);