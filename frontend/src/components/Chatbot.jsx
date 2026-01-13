import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const socket = io('http://localhost:5000');

export default function Chatbot({ onCrisis }) {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Aura. How are you feeling today? Aaj aapka mood kaisa hai?", sender: 'aura' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        socket.on('response', (data) => {
            setIsTyping(false);
            setMessages(prev => [...prev, { text: data.text, sender: 'aura' }]);
            if (data.crisis) onCrisis();
        });

        return () => socket.off('response');
    }, [onCrisis]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        socket.emit('message', { text: input, session_id: 'user123' });
        setInput('');
        setIsTyping(true);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide py-4">
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-aura'}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="chat-bubble-aura flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={sendMessage} className="mt-4 relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full glass rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-aura-400 border-none shadow-lg text-slate-700"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 w-10 bg-aura-600 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-aura-700 transition-all hover:scale-105"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
