'use client';

import { ReactNode, useState, useEffect } from 'react';

interface PokemonDialogProps {
  children: ReactNode;
  onComplete?: () => void;
  typingSpeed?: number;
  showCursor?: boolean;
}

export default function PokemonDialog({ 
  children, 
  onComplete, 
  typingSpeed = 50,
  showCursor = true 
}: PokemonDialogProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed, onComplete]);

  return (
    <div className="relative p-4 bg-white border-4 border-[#104068] rounded-xl min-h-[100px] font-pokemon text-[#104068]">
      <div className="relative">
        {displayedText}
        {showCursor && isComplete && (
          <span className="inline-block w-4 h-4 ml-1 animate-bounce">▼</span>
        )}
      </div>
    </div>
  );
} 