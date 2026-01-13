import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, HeartPulse, Zap } from 'lucide-react';

const moods = [
    { icon: Frown, label: 'Sad', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Meh, label: 'Okay', color: 'text-slate-500', bg: 'bg-slate-50' },
    { icon: Smile, label: 'Happy', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: Zap, label: 'Energetic', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { icon: HeartPulse, label: 'Anxious', color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function MoodCheckin() {
    const [selected, setSelected] = useState(null);
    const [intensity, setIntensity] = useState(5);

    return (
        <div className="glass rounded-3xl p-6 mt-4">
            <h2 className="text-xl font-bold text-slate-800 mb-2">How are you feeling?</h2>
            <p className="text-slate-500 text-sm mb-6">Tracking your mood helps Aura understand you better.</p>

            <div className="grid grid-cols-5 gap-2 mb-8">
                {moods.map((mood, i) => (
                    <button
                        key={i}
                        onClick={() => setSelected(mood.label)}
                        className={`flex flex-col items-center gap-2 p-2 rounded-2xl transition-all ${selected === mood.label
                                ? `${mood.bg} ${mood.color} scale-110 ring-2 ring-current`
                                : 'text-slate-400 hover:bg-slate-50'
                            }`}
                    >
                        <mood.icon size={28} />
                        <span className="text-[10px] font-bold uppercase">{mood.label}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                    <span>Intensity</span>
                    <span className="text-aura-600 font-bold">{intensity}/10</span>
                </div>
                <input
                    type="range" min="1" max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-aura-600"
                />
            </div>

            <button className="w-full mt-8 bg-aura-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-aura-200 hover:bg-aura-700 transition-all">
                Save Mood Entry
            </button>
        </div>
    );
}
