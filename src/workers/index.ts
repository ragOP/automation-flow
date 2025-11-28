import path from "node:path";
import fs from "node:fs";

import { Worker } from "bullmq";
import IORedis from "ioredis";

import { ENV } from "../config/env";

import { generateAIResponse } from "../ai";
import { generatePDF } from "../utils";
import { uploadPDF } from "../utils/upload_pdf";
import { UserFormData } from "../types/index";


const connection = new IORedis(ENV.REDIS_URL as string, {
  maxRetriesPerRequest: null,
  tls: {
    rejectUnauthorized: false
  }
});

export const horoscopeWorker = new Worker(
    "horoscopeQueue",
    async (job) => {
        const {userId, ...userData} = job.data as UserFormData & { userId: string };
        
        console.log(`Processing job for user: ${userData.firstName} ${userData.lastName}`);

        // 1. Call AI to get structured JSON
        const aiResponse = await generateAIResponse(userData);
        const cleaned = aiResponse.replace(/```json|```/g, "").trim();

        console.log("AI Response JSON:", cleaned);

        // 2. Generate PDF based on AI JSON
        const pdfBuffer = await generatePDF(JSON.parse(cleaned));

        // 3. Upload PDF to Cloudinary and get URL
        const tempPdfPath = path.join(__dirname, `../downloads/${Date.now()}_horoscope.pdf`);
        fs.writeFileSync(tempPdfPath, pdfBuffer);

        const pdfUrl = await uploadPDF(tempPdfPath, 'horoscopes');

        // 4. Send the pre-built message template with the PDF URL on whatsapp
        // await sendWhatsAppMessage(userData.phoneNumber, pdfUrl);

        // 5. Add the PDF URL to job the user data in mongoDB for future reference
        // await saveUserHoroscopeToDB(userData.userId, pdfUrl);

        console.log(`Processed job for ${userData.firstName} ${userData.lastName}, PDF URL: ${pdfUrl}`);
    },
    { connection }
);