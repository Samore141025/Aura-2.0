import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertCircle, X } from 'lucide-react';

const helpLines = [
    { name: 'AASRA (24/7)', number: '9820466726' },
    { name: 'iCall (TISS)', number: '9152987821' },
    { name: 'Vandrevala Foundation', number: '18602662345' },
];

export default function CrisisModal({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-sm glass rounded-[32px] p-8 shadow-2xl border-t-4 border-red-500"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800">You are not alone.</h2>
                            <p className="text-slate-600 mt-2 text-sm">Help is just a call away. Please reach out to these certified professionals in India.</p>

                            <div className="w-full space-y-3 mt-6">
                                {helpLines.map((line, i) => (
                                    <a
                                        key={i}
                                        href={`tel:${line.number}`}
                                        className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-red-200 hover:bg-red-50 transition-all group"
                                    >
                                        <div className="text-left">
                                            <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{line.name}</div>
                                            <div className="text-lg font-bold text-slate-800">{line.number}</div>
                                        </div>
                                        <div className="w-10 h-10 bg-aura-50 text-aura-600 rounded-full flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                                            <Phone size={18} />
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <button
                                onClick={onClose}
                                className="mt-8 text-slate-400 font-bold text-sm hover:text-slate-600"
                            >
                                Close and go back
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
