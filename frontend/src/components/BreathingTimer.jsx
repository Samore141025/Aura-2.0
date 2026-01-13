import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BreathingTimer() {
    const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale
    const [count, setCount] = useState(4);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    if (phase === 'Inhale') { setPhase('Hold'); return 7; }
                    if (phase === 'Hold') { setPhase('Exhale'); return 8; }
                    if (phase === 'Exhale') { setPhase('Inhale'); return 4; }
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [phase]);

    return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={{ scale: phase === 'Inhale' ? [1, 1.5] : phase === 'Exhale' ? [1.5, 1] : 1.5 }}
                    transition={{ duration: phase === 'Inhale' ? 4 : phase === 'Exhale' ? 8 : 7, ease: "linear" }}
                    className="w-48 h-48 bg-aura-200 rounded-full opacity-30 shadow-2xl"
                />
                <motion.div
                    animate={{ scale: phase === 'Inhale' ? [1, 1.3] : phase === 'Exhale' ? [1.3, 1] : 1.3 }}
                    transition={{ duration: phase === 'Inhale' ? 4 : phase === 'Exhale' ? 8 : 7, ease: "linear" }}
                    className="absolute w-32 h-32 bg-aura-500 rounded-full flex items-center justify-center text-white"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold">{count}</span>
                        <span className="text-xs font-medium uppercase tracking-widest">{phase}</span>
                    </div>
                </motion.div>
            </div>

            <div className="mt-12 text-center">
                <h3 className="text-xl font-bold text-slate-800">4-7-8 Technique</h3>
                <p className="text-slate-500 mt-2 text-sm max-w-[250px]">
                    Follow the circle to calm your nervous system and reduce anxiety.
                </p>
            </div>
        </div>
    );
}
