import os
from google import genai
from dotenv import load_dotenv

env_path = os.path.join('backend', '.env')
load_dotenv(env_path)

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

print(f"Testing with API Key: {api_key[:4]}...{api_key[-4:]}")
print("Model: gemini-flash-latest")

try:
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents="Hello, are you working?"
    )
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error detail: {e}")
