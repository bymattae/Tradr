'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultScreenProps {
  isCorrect: boolean;
  onNext: () => void;
  xpGained?: number;
  streak?: number;
  highScore?: number;
}

// Fun quotes for different scenarios
const QUOTES = {
  correct: [
    "You're on fire! 🔥",
    "Trading genius! 🧠",
    "Warren Buffett who? 💰",
    "To the moon! 🚀",
    "Stonks! 📈"
  ],
  incorrect: [
    "Ouch! That hurt! 💔",
    "Even pros make mistakes! 🎯",
    "Not stonks! 📉",
    "Keep HODLing! 💎",
    "Buy high, sell low? 🤔"
  ]
};

// Fun GIFs for different scenarios
const GIFS = {
  correct: [
    "/gifs/success-1.gif",
    "/gifs/success-2.gif",
    "/gifs/success-3.gif"
  ],
  incorrect: [
    "/gifs/fail-1.gif",
    "/gifs/fail-2.gif",
    "/gifs/fail-3.gif"
  ]
};

export function ResultScreen({ 
  isCorrect, 
  onNext,
  xpGained = 10,
  streak = 0,
  highScore = 0
}: ResultScreenProps) {
  const [quote] = useState(() => {
    const quotes = isCorrect ? QUOTES.correct : QUOTES.incorrect;
    return quotes[Math.floor(Math.random() * quotes.length)];
  });

  const [gif] = useState(() => {
    const gifs = isCorrect ? GIFS.correct : GIFS.incorrect;
    return gifs[Math.floor(Math.random() * gifs.length)];
  });

  useEffect(() => {
    // Play sound effect
    const audio = new Audio(isCorrect ? '/success.mp3' : '/fail.mp3');
    audio.play().catch(() => {});
  }, [isCorrect]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative flex flex-col items-center gap-8 p-8 max-w-md w-full mx-4"
      >
        {/* Result Icon with Dramatic Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            damping: 10,
            stiffness: 100,
            duration: 0.8 
          }}
          className="text-8xl"
        >
          {isCorrect ? '🎯' : '💔'}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center"
        >
          {quote}
        </motion.div>

        {/* Stats with Counting Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          {isCorrect && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                damping: 10,
                delay: 0.7 
              }}
              className="px-6 py-3 bg-green-500 text-white rounded-full text-xl font-bold"
            >
              +{xpGained} XP
            </motion.div>
          )}
          
          <div className="flex gap-8 text-lg">
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-500">Streak</span>
              <motion.div 
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  delay: 0.9,
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="font-bold flex items-center gap-1"
              >
                <span className="text-2xl">{streak}</span>
                <span className="text-xl">🔥</span>
              </motion.div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-500">High Score</span>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ 
                  delay: 1,
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
                className="font-bold flex items-center gap-1"
              >
                <span className="text-2xl">{highScore}</span>
                <span className="text-xl">🏆</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-4 bg-black text-white text-xl font-bold rounded-2xl shadow-lg"
        >
          NEXT CHART →
        </motion.button>
      </motion.div>
    </motion.div>
  );
} 