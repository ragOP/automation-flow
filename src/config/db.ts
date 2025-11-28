import mongoose from "mongoose";
import { ENV } from "../config/env";

export const handleConnectToDB = async () => {
  try {
    const connection = await mongoose.connect(ENV.MONGODB_URI as string);
    console.log("Connected to MongoDB:", connection.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};