'use client';

import { useState, useEffect } from 'react';
import { Chart } from '@/components/Chart';
import { GameControls } from '@/components/GameControls';
import { ResultScreen } from '@/components/ResultScreen';
import { useGameState } from '@/hooks/useGameState';
import WelcomeSlides from '@/app/components/WelcomeSlides';
import { motion, AnimatePresence } from 'framer-motion';

export default function GamePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [decisionPrice, setDecisionPrice] = useState<number | null>(null);
  const [decisionIndex, setDecisionIndex] = useState<number | null>(null);
  const [isReplayComplete, setIsReplayComplete] = useState(false);

  const {
    currentChart,
    showResult,
    isCorrect,
    timeFrame,
    handleTimeFrameChange,
    nextRound,
    score,
    streak,
    level,
    handleChoice: originalHandleChoice
  } = useGameState();

  useEffect(() => {
    setIsMounted(true);
    // Check if we should show welcome slides
    const shouldShowWelcome = localStorage.getItem('showWelcome') === 'true';
    if (shouldShowWelcome) {
      setShowWelcome(true);
      localStorage.removeItem('showWelcome'); // Clear the flag
    }
  }, []);

  const handleWelcomeComplete = () => {
    const audio = new Audio('/success.mp3');
    audio.play().catch(() => {});
    setShowWelcome(false);
  };

  // Wrap the original handleChoice to add replay functionality
  const handleChoice = (choice: 'buy' | 'sell') => {
    if (showResult) return;

    // Store the current price and index
    const currentIndex = currentChart.length - 10; // Show last 10 candles
    const currentPrice = currentChart[currentIndex].close;
    
    setDecisionPrice(currentPrice);
    setDecisionIndex(currentIndex);
    setIsReplayComplete(false);

    // Start the replay
    setTimeout(() => {
      originalHandleChoice(choice);
      setIsReplayComplete(true);
    }, (currentChart.length - currentIndex) * 300); // 300ms per candle
  };

  // Wrap the original nextRound to reset our additional state
  const handleNextRound = () => {
    setDecisionPrice(null);
    setDecisionIndex(null);
    setIsReplayComplete(false);
    nextRound();
  };

  if (!isMounted) {
    return (
      <main className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <div className="w-full space-y-4">
          <div className="px-4">
            <div className="h-8 bg-blue-50 rounded-xl animate-pulse" />
          </div>
          <div className="h-[50vh] bg-blue-50 rounded-xl animate-pulse" />
          <div className="px-4">
            <div className="h-12 bg-blue-50 rounded-xl animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  // Generate hearts based on level (max 3)
  const hearts = Math.min(level, 3);

  return (
    <div className="relative h-screen bg-[#f4f6ff] overflow-hidden">
      {/* Fixed Header */}
      <motion.div 
        layout
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <AnimatePresence>
                {Array.from({ length: hearts }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-lg"
                  >
                    ❤️
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <motion.div 
              layout
              className="text-sm font-medium"
            >
              🔥 
              <motion.span
                key={streak}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-orange-500"
              >
                {streak}
              </motion.span>
            </motion.div>
          </div>
          <div className="flex gap-2">
            {(['4H', '1D', '1W'] as const).map((tf) => (
              <motion.button
                key={tf}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTimeFrameChange(tf)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all
                  ${timeFrame === tf 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tf}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Chart Area (Full Screen) */}
      <div className="absolute inset-0 pt-16">
        <Chart
          data={currentChart}
          showResult={showResult}
          isCorrect={isCorrect}
          timeFrame={timeFrame}
          onTimeFrameChange={handleTimeFrameChange}
          decisionPrice={decisionPrice || undefined}
          decisionIndex={decisionIndex || undefined}
          isReplayComplete={isReplayComplete}
        />
      </div>

      {/* Fixed Controls at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="container mx-auto px-4 pb-8">
          <AnimatePresence mode="wait">
            <div className="pointer-events-auto">
              {showResult && isReplayComplete ? (
                <ResultScreen
                  key="result"
                  isCorrect={isCorrect}
                  onNext={handleNextRound}
                  xpGained={10}
                  streak={streak}
                  highScore={score}
                />
              ) : !showResult ? (
                <motion.div
                  key="controls"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                >
                  <GameControls onChoice={handleChoice} />
                </motion.div>
              ) : null}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Welcome Slides */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeSlides 
            isOpen={showWelcome} 
            onComplete={() => setShowWelcome(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
} 