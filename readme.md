```md
# 🌌 AI-Powered Horoscope Automation System

![Node](https://img.shields.io/badge/Node.js-18+-green)
![TS](https://img.shields.io/badge/TypeScript-Enabled-blue)
![BullMQ](https://img.shields.io/badge/BullMQ-Queue-red)
![Redis](https://img.shields.io/badge/Upstash-Redis-orange)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Uploads-purple)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Automation-brightgreen)

## ✨ Overview

This project is a **complete AI-powered horoscope automation system**.  
It collects user details → generates a personalized horoscope using AI → converts it into a **luxury PDF** → uploads it to **Cloudinary** → sends it to the user via **WhatsApp**.

All heavy tasks run asynchronously with **BullMQ** + **Upstash Redis**.

---

## 🚀 Features
- ⚡ Fast API responses  
- 🧵 Background job processing  
- 🔮 AI horoscope generation  
- 📦 Structured JSON output  
- 🖨️ HTML → Luxury PDF  
- ☁️ Cloudinary hosting  
- 📲 WhatsApp automation  
- 🚀 Fully deployable on Render  

---

## 🧰 Tech Stack

- Node.js  
- Express  
- TypeScript  
- BullMQ  
- Upstash Redis  
- OpenAI / Gemini  
- html-pdf-node  
- Cloudinary  
- WhatsApp API  
- Render  

---

## 📁 Project Structure

│
├── src
│ ├── ai/ # AI generation logic
│ ├── config/ # ENV configuration
│ ├── queues/ # BullMQ queues
│ ├── workers/ # Background workers
│ ├── utils/ # PDF + WhatsApp + Upload helpers
│ ├── template/ # HTML templates for PDF
│ ├── server.ts # API entry point
│ └── types/ # TypeScript types
│
├── dist/
├── package.json
├── tsconfig.json
└── README.md


---

## 🔐 Environment Variables

Create `.env`:

PORT=3000
REDIS_URL=rediss://default:xxxxx@upstash-url:6379
OPENAI_API_KEY=your-openai-key
CLOUDINARY_URL=cloudinary://api-key:secret@cloud
WHATSAPP_API_KEY=your-whatsapp-api-key


**Upstash Notes**
- Must use `rediss://`
- TLS enabled
- `maxRetriesPerRequest: null`

---

## ⚙️ How It Works

### 1️⃣ API Layer
- Receives user data  
- Saves to DB  
- Pushes job → BullMQ  
- Returns instant response  

### 2️⃣ Worker Layer
- Consumes job  
- Generates horoscope JSON  
- Creates luxury PDF  
- Uploads to Cloudinary  
- Sends to WhatsApp  
- (Optional) Saves PDF link to DB  

### 3️⃣ Delivery
User receives their **personalized horoscope PDF** via WhatsApp.
