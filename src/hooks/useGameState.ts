'use client';

import { useState, useCallback, useEffect } from 'react';

type TimeFrame = '4H' | '1D' | '1W';

interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

// Seeded random number generator for consistent values
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Simple implementation of a seeded random number generator
  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
}

// Generate base 5-minute candles for a realistic price movement
function generateBaseCandles(count: number = 1000, seed: number = 42): CandlestickData[] {
  const random = new SeededRandom(seed);
  const baseCandles: CandlestickData[] = [];
  let currentPrice = 100 + random.next() * 900; // Random starting price between 100 and 1000
  const volatility = 0.002; // Base volatility for 5-minute candles

  const now = new Date();
  // Round to the start of the day to ensure consistent timestamps
  now.setHours(0, 0, 0, 0);

  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 5 * 60 * 1000);
    
    // Generate realistic price movement
    const change = currentPrice * volatility * (random.next() * 2 - 1);
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.abs(change) * random.next();
    const low = Math.min(open, close) - Math.abs(change) * random.next();

    baseCandles.push({
      time: time.toISOString(),
      open,
      high,
      low,
      close
    });

    currentPrice = close;
  }

  return baseCandles;
}

// Aggregate candles based on timeframe
function aggregateCandles(baseCandles: CandlestickData[], timeFrame: TimeFrame): CandlestickData[] {
  const periods = {
    '4H': 48,    // 48 5-minute candles = 4 hours
    '1D': 288,   // 288 5-minute candles = 24 hours
    '1W': 2016   // 2016 5-minute candles = 1 week
  };

  const periodSize = periods[timeFrame];
  const aggregated: CandlestickData[] = [];

  for (let i = 0; i < baseCandles.length; i += periodSize) {
    const slice = baseCandles.slice(i, i + periodSize);
    if (slice.length === 0) continue;

    const open = slice[0].open;
    const close = slice[slice.length - 1].close;
    const high = Math.max(...slice.map(c => c.high));
    const low = Math.min(...slice.map(c => c.low));
    const time = slice[0].time;

    aggregated.push({ time, open, high, low, close });
  }

  // Return last 50 candles for display
  return aggregated.slice(-50);
}

export function useGameState() {
  const [baseCandles, setBaseCandles] = useState<CandlestickData[]>([]);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('4H');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [isClient, setIsClient] = useState(false);

  // Initialize data only on client side
  useEffect(() => {
    setIsClient(true);
    // Use a fixed seed for consistent data generation
    setBaseCandles(generateBaseCandles(1000, 42));
  }, []);

  // Get current chart data based on timeframe
  const currentChart = isClient ? aggregateCandles(baseCandles, timeFrame) : [];

  const handleTimeFrameChange = useCallback((newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
  }, []);

  const handleChoice = useCallback((choice: 'buy' | 'sell') => {
    if (!currentChart.length) return;
    
    const lastCandle = currentChart[currentChart.length - 1];
    const isUp = lastCandle.close > lastCandle.open;
    const correct = (choice === 'buy' && isUp) || (choice === 'sell' && !isUp);

    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      if (streak > 0 && streak % 5 === 0) {
        setLevel(l => l + 1);
      }
    } else {
      setStreak(0);
    }
  }, [currentChart, streak]);

  const nextRound = useCallback(() => {
    setShowResult(false);
  }, []);

  return {
    currentChart,
    showResult,
    isCorrect,
    handleChoice,
    nextRound,
    score,
    streak,
    level,
    timeFrame,
    handleTimeFrameChange,
    isClient
  };
} 