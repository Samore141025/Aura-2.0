import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("Listing models...")
try:
    it = genai.list_models()
    count = 0
    for m in it:
        print(f"Model: {m.name}")
        count += 1
    print(f"Done listing. Total: {count}")
except Exception as e:
    print(f"Error: {e}")
