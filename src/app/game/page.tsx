'use client';

import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [decisionPrice, setDecisionPrice] = useState<number | undefined>(undefined);
  const [decisionIndex, setDecisionIndex] = useState<number | undefined>(undefined);
  const [isReplayComplete, setIsReplayComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const {
    currentChart,
    timeFrame,
    handleTimeFrameChange,
    handleChoice,
    nextRound,
    score,
  } = useGameState();

  useEffect(() => {
    setIsMounted(true);
    setShowWelcome(true);
  }, []);

  const handleDecision = (choice: 'buy' | 'sell') => {
    if (showResult) return;

    if (!currentChart) return;

    // Store the current price and index
    const currentIndex = currentChart.length - 10; // Show last 10 candles
    const currentPrice = currentChart[currentIndex].close;
    
    setDecisionPrice(currentPrice);
    setDecisionIndex(currentIndex);
    setShowResult(true);
    setIsCorrect(choice === (currentPrice > currentChart[currentIndex + 10].close ? 'buy' : 'sell'));
  };

  // Wrap the original nextRound to reset our additional state
  const handleNextRound = () => {
    setDecisionPrice(undefined);
    setDecisionIndex(undefined);
    setIsReplayComplete(false);
    nextRound();
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Tradr</h1>
              <div className="ml-4 flex items-center space-x-2">
                <Button
                  variant={timeFrame === '4H' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeFrameChange('4H')}
                >
                  4H
                </Button>
                <Button
                  variant={timeFrame === '1D' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeFrameChange('1D')}
                >
                  1D
                </Button>
                <Button
                  variant={timeFrame === '1W' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeFrameChange('1W')}
                >
                  1W
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-900">
                Score: {score}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex items-center justify-center">
            <div className="text-gray-500 text-lg">Chart temporarily disabled</div>
          </div>

          {/* Decision Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
              onClick={() => handleDecision('sell')}
              disabled={showResult}
            >
              SELL
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
              onClick={() => handleDecision('buy')}
              disabled={showResult}
            >
              BUY
            </Button>
          </div>

          {/* Result Overlay */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center"
                >
                  <div className="text-6xl mb-4">
                    {isCorrect ? '🎯' : '😢'}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {isCorrect
                      ? 'Great job! You made the right call.'
                      : 'Better luck next time!'}
                  </p>
                  <Button onClick={handleNextRound}>
                    Next Round
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 