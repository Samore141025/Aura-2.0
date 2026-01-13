import google.generativeai as genai

KEY = "AIzaSyBeeUo8B4HCPo4NFpBYJy9j-0rLd3OViaU"
genai.configure(api_key=KEY)

print("Listing supported models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
except Exception as e:
    print(f"Error: {e}")
