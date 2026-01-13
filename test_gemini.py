import os
import sys
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from chatbot import get_aura_response

print("Testing Gemini Response...")
response = get_aura_response("Hello!")
print(f"Response: {response}")
