import React, { useState, useEffect } from 'react';
import Chatbot from './components/Chatbot';
import MoodCheckin from './components/MoodCheckin';
import BreathingTimer from './components/BreathingTimer';
import CrisisModal from './components/CrisisModal';
import { Heart, Wind, MessageCircle, BarChart3, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [activeTab, setActiveTab] = useState('chat');
    const [showCrisis, setShowCrisis] = useState(false);

    return (
        <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden">
            {/* Header */}
            <header className="p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-aura-600 rounded-full flex items-center justify-center shadow-lg shadow-aura-200">
                        <Heart className="text-white w-6 h-6" fill="currentColor" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-aura-800 to-indigo-800 bg-clip-text text-transparent">
                        Aura
                    </h1>
                </div>
                <button
                    onClick={() => setShowCrisis(true)}
                    className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold border border-red-100 hover:bg-red-100 transition-colors"
                >
                    I need help now
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 px-4 pb-24 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'chat' && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="h-full"
                        >
                            <Chatbot onCrisis={() => setShowCrisis(true)} />
                        </motion.div>
                    )}

                    {activeTab === 'mood' && (
                        <motion.div
                            key="mood"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <MoodCheckin />
                        </motion.div>
                    )}

                    {activeTab === 'breathe' && (
                        <motion.div
                            key="breathe"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <BreathingTimer />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Navigation */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm glass rounded-full p-2 flex justify-around shadow-2xl z-20 safe-bottom">
                <NavButton
                    active={activeTab === 'chat'}
                    onClick={() => setActiveTab('chat')}
                    icon={<MessageCircle size={24} />}
                    label="Chat"
                />
                <NavButton
                    active={activeTab === 'mood'}
                    onClick={() => setActiveTab('mood')}
                    icon={<BarChart3 size={24} />}
                    label="Mood"
                />
                <NavButton
                    active={activeTab === 'breathe'}
                    onClick={() => setActiveTab('breathe')}
                    icon={<Wind size={24} />}
                    label="Breathe"
                />
            </nav>

            {/* Privacy Badge */}
            <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-2 pointer-events-none">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                    <ShieldCheck size={10} />
                    End-to-End Encrypted & Private
                </div>
            </div>

            <CrisisModal isOpen={showCrisis} onClose={() => setShowCrisis(false)} />
        </div>
    );
}

function NavButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${active
                ? 'bg-aura-600 text-white shadow-lg scale-110'
                : 'text-slate-400 hover:text-aura-500'
                }`}
        >
            {icon}
            {active && <span className="text-[10px] font-bold uppercase">{label}</span>}
        </button>
    );
}

export default App;
