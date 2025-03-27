'use client';

import { useState } from 'react';

interface GameControlsProps {
  onChoice: (choice: 'buy' | 'sell') => void;
}

export function GameControls({ onChoice }: GameControlsProps) {
  const [clickedButton, setClickedButton] = useState<'buy' | 'sell' | null>(null);

  const handleClick = (choice: 'buy' | 'sell') => {
    setClickedButton(choice);
    // Add a small delay for the animation
    setTimeout(() => {
      setClickedButton(null);
      onChoice(choice);
    }, 150);
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        onClick={() => handleClick('buy')}
        className={`relative flex-1 py-6 bg-green-500 text-white font-bold rounded-2xl shadow-lg 
          transition-all duration-150 overflow-hidden group
          ${clickedButton === 'buy' ? 'transform scale-95 brightness-90' : 'hover:scale-105 hover:brightness-110'}
        `}
      >
        {/* Background Pulse Effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
          transition-opacity duration-300 rounded-2xl" />
        
        {/* Click Ripple Effect */}
        {clickedButton === 'buy' && (
          <div className="absolute inset-0 animate-ripple bg-white opacity-20" />
        )}
        
        {/* Button Text */}
        <div className="relative flex items-center justify-center gap-2">
          <span className="text-2xl">BUY</span>
          <span className="text-xl">📈</span>
        </div>
      </button>

      <button
        onClick={() => handleClick('sell')}
        className={`relative flex-1 py-6 bg-red-500 text-white font-bold rounded-2xl shadow-lg 
          transition-all duration-150 overflow-hidden group
          ${clickedButton === 'sell' ? 'transform scale-95 brightness-90' : 'hover:scale-105 hover:brightness-110'}
        `}
      >
        {/* Background Pulse Effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
          transition-opacity duration-300 rounded-2xl" />
        
        {/* Click Ripple Effect */}
        {clickedButton === 'sell' && (
          <div className="absolute inset-0 animate-ripple bg-white opacity-20" />
        )}
        
        {/* Button Text */}
        <div className="relative flex items-center justify-center gap-2">
          <span className="text-2xl">SELL</span>
          <span className="text-xl">📉</span>
        </div>
      </button>
    </div>
  );
} 