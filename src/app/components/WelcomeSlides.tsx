'use client';

import { useState } from 'react';

interface WelcomeSlidesProps {
  onComplete: () => void;
  isOpen: boolean;
}

const SLIDES = [
  {
    title: 'PREDICT THE CHARTS',
    subtitle: 'Look at real market data and predict if the price will go up or down',
    emoji: '📈',
    color: 'green'
  },
  {
    title: 'GUESS RIGHT = WIN XP',
    subtitle: 'Build your streak and climb the ranks with each correct prediction',
    emoji: '⚡️',
    color: 'yellow'
  },
  {
    title: 'JOIN THE LEADERS',
    subtitle: 'Compete with traders worldwide and make it to the leaderboard',
    emoji: '👑',
    color: 'purple'
  },
  {
    title: 'READY TO START?',
    subtitle: 'Create your profile and start trading in seconds',
    emoji: '🚀',
    color: 'blue',
    isLast: true
  }
];

export default function WelcomeSlides({ onComplete, isOpen }: WelcomeSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSlide === SLIDES.length - 1) {
      const audio = new Audio('/success.mp3');
      audio.play().catch(() => {});
      onComplete();
    } else {
      const audio = new Audio('/click.mp3');
      audio.play().catch(() => {});
      setCurrentSlide(prev => prev + 1);
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex flex-col items-center justify-center min-h-[400px] relative">
          {/* Progress Dots */}
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-2">
            {SLIDES.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-[--primary] w-8'
                    : index < currentSlide
                    ? 'bg-[--primary] opacity-50'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Slide Content */}
          <div className="text-center space-y-6 max-w-sm mx-auto">
            {/* Emoji with colored background */}
            <div className={`w-20 h-20 mx-auto rounded-2xl bg-${slide.color}-50 border-2 border-${slide.color}-100 flex items-center justify-center`}>
              <span className="text-4xl">{slide.emoji}</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{slide.title}</h1>
              <p className="text-sm text-gray-500">{slide.subtitle}</p>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="btn btn-primary w-full font-bold"
            >
              {slide.isLast ? '🎯 START PLAYING' : 'NEXT →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 