import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

try:
    print("Listing models...")
    models = list(genai.list_models())
    if not models:
        print("No models found.")
    for m in models:
        print(f"Model: {m.name}")
except Exception as e:
    print(f"List Models Error: {e}")
