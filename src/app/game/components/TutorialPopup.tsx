'use client';

import { useState, useEffect } from 'react';

interface TutorialPopupProps {
  onClose: () => void;
}

export default function TutorialPopup({ onClose }: TutorialPopupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      title: "Welcome to TRADR!",
      description: "Get ready to start your trading journey. You'll start with $10,000 and can earn XP by making successful trades.",
      icon: "🎮"
    },
    {
      title: "How to Play",
      description: "Buy low, sell high! Watch market trends, analyze stocks, and make smart decisions to grow your portfolio.",
      icon: "📈"
    },
    {
      title: "Ready to Start?",
      description: "Click the button below to begin trading. Remember, the market waits for no one!",
      icon: "🚀"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      const audio = new Audio('/click.mp3');
      audio.play().catch(() => {});
    } else {
      setIsVisible(false);
      onClose();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 animate-[slideUp_0.3s_ease-out]">
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-[#00b36b] w-4' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <span className="text-4xl">{steps[currentStep].icon}</span>
          <h2 
            className="text-lg font-bold text-black" 
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            {steps[currentStep].title}
          </h2>
          <p 
            className="text-sm text-gray-600" 
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            {steps[currentStep].description}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleNext}
            className="w-full p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span 
              className="block" 
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              {currentStep === steps.length - 1 ? 'START TRADING' : 'NEXT'}
            </span>
          </button>
          <button
            onClick={handleSkip}
            className="w-full p-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span 
              className="block text-sm" 
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Skip Tutorial
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 