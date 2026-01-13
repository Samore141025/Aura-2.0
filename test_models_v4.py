import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("GEMINI_API_KEY")
if key:
    print(f"API Key: {key[:4]}...{key[-4:]}")
else:
    print("API Key NOT FOUND in environment.")

genai.configure(api_key=key)

print("Listing models...")
try:
    models = genai.list_models()
    for m in models:
        print(f"Model: {m.name}")
    print("Loop finished.")
except Exception as e:
    print(f"Error: {e}")
