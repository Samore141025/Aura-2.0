import os
from google import genai
from dotenv import load_dotenv

# Robust pathing for .env
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(env_path)

# Configure Gemini Client (New SDK)
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

# Using gemini-flash-latest as verified in test_new_sdk.py
MODEL_ID = "gemini-flash-latest"

CRISIS_KEYWORDS = [
    'suicide', 'खुदकुशी', 'kill myself', 'मरना', 'end my life', 'आत्महत्या', 
    'pankha', 'nas', 'zeher', 'poison', 'jump from building'
]

SYSTEM_PROMPT = """
You are 'Aura', a highly empathetic wellness chatbot designed specifically for Indian youth.
Your tone is warm, non-judgmental, and validating.
You use a mix of English and Hindi (Hinglish) if appropriate, or stay in the user's language.
Your goal is to provide mental health support, breathing exercises, and emotional validation.

IMPORTANT GUIDELINES:
1. If the user expresses extreme distress or self-harm, prioritize safety but do not sound like a robot.
2. Recommend grounding techniques like 4-7-8 breathing when they feel anxious.
3. Use culturally relevant metaphors (e.g., peace, 'sukoon', 'chai pe charcha' vibes).
4. Never provide medical prescriptions.
5. Keep your responses concise (2-4 sentences) to maintain a chat-like feel.
"""

def detect_crisis(text):
    text = text.lower()
    for word in CRISIS_KEYWORDS:
        if word in text:
            return True
    return False

def get_aura_response(user_input, chat_history=[]):
    if detect_crisis(user_input):
        return {
            "response": "I'm really concerned about what you're saying. Please know that you're not alone and there is help available. Aap akele nahi ho. Please reach out to AASRA (9820466726) or iCall (9152987821) or immediately. They are there to listen.",
            "crisis": True
        }

    try:
        # Using the new google-genai SDK 
        # config allows setting system instruction directly
        response = client.models.generate_content(
            model=MODEL_ID,
            contents=user_input,
            config={
                "system_instruction": SYSTEM_PROMPT,
            }
        )
        
        return {
            "response": response.text,
            "crisis": False
        }
    except Exception as e:
        print(f"Gemini Error: {e}")
        return {
            "response": "I'm having a little trouble connecting right now, but I'm here for you. Saans lijiye (Take a breath). How else can I help?",
            "crisis": False
        }
