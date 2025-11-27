import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT,
    ENVIRONMENT: process.env.ENVIRONMENT,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL_NAME: process.env.GEMINI_MODEL_NAME,
};