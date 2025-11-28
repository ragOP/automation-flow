import path from "node:path";
import fs, { link } from "node:fs";

import { Worker } from "bullmq";
import IORedis from "ioredis";

import { ENV } from "../config/env";

import { generateAIResponse } from "../ai";
import { generatePDF } from "../utils";
import { uploadPDF } from "../utils/upload_pdf";
import { UserFormData } from "../types/index";
import { waTemplate } from "../template/wa";


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

        // 2. Generate PDF based on AI JSON
        const pdfBuffer = await generatePDF(JSON.parse(cleaned));

        // 3. Upload PDF to Cloudinary and get URL
        const tempPdfPath = path.join(__dirname, `../downloads/${Date.now()}_horoscope.pdf`);
        fs.writeFileSync(tempPdfPath, pdfBuffer);

        const pdfUrl = await uploadPDF(tempPdfPath, 'horoscopes');

        console.log("Uploaded PDF URL:", pdfUrl);

        // 4. Prepare WhatsApp message template
        const message = waTemplate({ fullName: `${userData.firstName} ${userData.lastName}`, zodiacSign: JSON.parse(cleaned).zodiacSign, link: pdfUrl });

        console.log("message <<<<", message);

        // 5. Send the pre-built message template with the PDF URL on whatsapp
        // await sendWhatsAppMessage(userData.phoneNumber, message);

        // 6. Add the PDF URL to job the user data in mongoDB for future reference
        // await saveUserHoroscopeToDB(userData.userId, pdfUrl);

        console.log(`Processed job for ${userData.firstName} ${userData.lastName}, PDF URL: ${pdfUrl}`);
    },
    { connection }
);