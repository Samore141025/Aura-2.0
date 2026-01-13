# ✨ Aura 2.0 - AI-Powered Confidential Wellness Chatbot

Aura is a premium, empathetic mental health companion designed specifically for Indian youth. It provides a safe, non-judgmental space for emotional expression, crisis support, and wellness tools.

---

## 🌟 Key Features

- **🌙 Empathetic AI:** Powered by Google's **Gemini 2.0 / Flash**, providing warm, bilingual (English/Hinglish) support.
- **🛡️ Privacy-First Architecture:** Military-grade message encryption using **Fernet (AES)** ensures your conversations stay private and secure.
- **🚨 Intelligent Crisis Detection:** Real-time monitoring for self-harm keywords with instant Indian helpline (AASRA/iCall) escalation.
- **🧘 Wellness Toolkit:** Interactive mood sliders, grounding exercises (4-7-8 breathing timers), and culturally relevant metaphors.
- **✨ Premium UI/UX:** A stunning, modern interface built with **Glassmorphism**, smooth **Framer Motion** animations, and a responsive layout.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Python, Flask, Socket.io (Real-time) |
| **AI SDK** | Google GenAI SDK (Modern) |
| **Database** | MongoDB Atlas (Cloud Persistent) |
| **Security** | Fernet Encryption (AES-128) |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Python (3.11+)
- Gemini API Key ([Get it here](https://aistudio.google.com/))
- MongoDB Atlas URI

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and configure your environment:
   ```bash
   pip install -r requirements.txt
   ```
3. Update your `.env` file (renamed from `.env.example`):
   ```env
   GEMINI_API_KEY=your_key_here
   MONGODB_URI=your_mongodb_uri
   SECRET_KEY=your_secret_key
   ```
   *Note: Special characters in MongoDB passwords (like `@`) are automatically handled/escaped as `%40` in our connection logic.*

4. Start the backend:
   ```bash
   python app.py
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the application:
   ```bash
   npm run dev
   ```

---

## 🛡️ Security & Privacy
Aura is built with privacy at its core. Unlike traditional chatbots, every message you send is **encrypted locally** before being stored in our database. Only the active session can decrypt and display the messages, ensuring even database administrators cannot read your private thoughts.

---

## 🚑 Crisis Support
If you or someone you know is in distress, Aura is trained to recognize crisis patterns and provide immediate contact information for professional help:
- **AASRA:** 9820466726
- **iCall:** 9152987821

---

*Made with ❤️ for Mental Wellness.*
