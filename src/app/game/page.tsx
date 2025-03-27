'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const router = useRouter();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(1000);
  const [timeLeft, setTimeLeft] = useState(10);
  const [candleData, setCandleData] = useState({
    open: 100,
    high: 120,
    low: 80,
    close: 110,
  });

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Handle timeout - consider it a wrong answer
          setIsCorrect(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChoice = (choice: 'buy' | 'sell') => {
    // Simulate checking if the choice was correct
    const wasCorrect = Math.random() > 0.5;
    setIsCorrect(wasCorrect);
    setScore((prev) => prev + (wasCorrect ? 100 : -100));
  };

  const handleNextRound = () => {
    setIsCorrect(null);
    setTimeLeft(10);
    // Generate new candle data
    setCandleData({
      open: Math.floor(Math.random() * 100) + 50,
      high: Math.floor(Math.random() * 100) + 100,
      low: Math.floor(Math.random() * 50),
      close: Math.floor(Math.random() * 100) + 50,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b-2 border-gray-100 p-4"
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800 font-heading text-sm"
          >
            ← BACK
          </button>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-sans">SCORE</p>
              <p className="font-heading text-green-600">${score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-sans">TIME</p>
              <p className="font-heading text-blue-600">{timeLeft}s</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-8">
          {/* Candle Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-heading text-sm">BTCUSDT</span>
              <span className="font-heading text-sm text-gray-500">1M</span>
            </div>
            <div className="h-48 flex items-center justify-center">
              {/* Placeholder for candle chart */}
              <div className="w-8 relative">
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300 -translate-x-1/2" />
                <div
                  className={`absolute w-full ${
                    candleData.close > candleData.open
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    top: `${((candleData.high - candleData.close) / (candleData.high - candleData.low)) * 100}%`,
                    height: `${Math.abs(candleData.close - candleData.open) / (candleData.high - candleData.low) * 100}%`,
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Game Controls */}
          {isCorrect === null ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <button
                onClick={() => handleChoice('buy')}
                className="w-full bg-[#E7FFF2] hover:bg-[#D0FFE4] text-[#006837] py-4 rounded-lg border-2 border-[#B3FFD6] transition-colors font-heading"
              >
                BUY
              </button>
              <button
                onClick={() => handleChoice('sell')}
                className="w-full bg-[#FFF0F0] hover:bg-[#FFE6E6] text-[#660000] py-4 rounded-lg border-2 border-[#FFD6D6] transition-colors font-heading"
              >
                SELL
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-heading mb-4">
                {isCorrect ? (
                  <span className="text-green-600">CORRECT! +$100</span>
                ) : (
                  <span className="text-red-600">WRONG! -$100</span>
                )}
              </h2>
              <button
                onClick={handleNextRound}
                className="w-full bg-[#F0F0FF] hover:bg-[#E6E6FF] text-[#000066] py-4 rounded-lg border-2 border-[#D6D6FF] transition-colors font-heading"
              >
                NEXT ROUND
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 