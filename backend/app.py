import os
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from pymongo import MongoClient
from cryptography.fernet import Fernet
from dotenv import load_dotenv
from chatbot import get_aura_response
import datetime

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "aura-super-secret")
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Database Setup
try:
    client = MongoClient(os.getenv("MONGODB_URI"))
    db = client['aura_wellness']
    chats_collection = db['chats']
    print("Connected to MongoDB Atlas")
except Exception as e:
    print(f"MongoDB Connection Error: {e}")

# Encryption Setup
# In production, store this key securely!
ENCRYPTION_KEY = Fernet.generate_key() 
fernet = Fernet(ENCRYPTION_KEY)

def encrypt_message(message):
    return fernet.encrypt(message.encode()).decode()

def decrypt_message(token):
    return fernet.decrypt(token.encode()).decode()

@app.route('/')
def home():
    return jsonify({"status": "Aura Backend is running", "version": "1.0.0"})

@socketio.on('message')
def handle_message(data):
    user_input = data.get('text')
    session_id = data.get('session_id', 'anonymous')
    
    # Get Gemini Response
    result = get_aura_response(user_input)
    aura_text = result['response']
    is_crisis = result['crisis']
    
    # Encrypt and Store in DB
    chat_entry = {
        "session_id": session_id,
        "user_msg": encrypt_message(user_input),
        "aura_msg": encrypt_message(aura_text),
        "timestamp": datetime.datetime.utcnow(),
        "is_crisis": is_crisis
    }
    
    try:
        chats_collection.insert_one(chat_entry)
    except:
        pass # Handle DB failure silently for demo

    emit('response', {
        "text": aura_text,
        "crisis": is_crisis,
        "sender": "aura"
    })

@app.route('/api/mood', methods=['POST'])
def track_mood():
    data = request.json
    # Logic to store mood logs
    return jsonify({"status": "success", "message": "Mood recorded"})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
