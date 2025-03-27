'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import AuthModal from './components/AuthModal';

export default function HomePage() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleActionClick = () => {
    if (!user) {
      setShowAuthModal(true);
    }
    // If user is logged in, handle the action normally
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center">
      <div className="w-full max-w-md space-y-6 mt-28">
        {/* Title */}
        <div className="text-center space-y-6 relative">
          {/* Animated Trading Candlestick */}
          <div className="trading-candlestick mx-auto mb-8">
            <div className="candlestick">
              <div className="upper-wick"></div>
              <div className="body"></div>
              <div className="lower-wick"></div>
            </div>
      </div>

          <h1 className="text-[32px] leading-relaxed relative" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            <div className="inline-flex items-center justify-center space-x-4">
              <span className="text-black trading-text font-bold">BUY</span>
              <span className="text-[24px] trading-text text-gray-400">or</span>
              <span className="text-black trading-text font-bold">SELL</span>
      </div>
          </h1>
          <p className="text-[10px] text-gray-500 slide-up-delay" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            Powered by Tradr
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-3 px-4">
          {/* New Game Button */}
          <button 
            onClick={handleActionClick}
            className="w-full p-4 bg-[#E8FFF3] hover:bg-[#D0FFE7] text-black rounded-xl border-2 border-[#00ff7e] transition-colors"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-xl">🚀</span>
              <span className="text-[14px]" style={{ fontFamily: "'Press Start 2P', cursive" }}>NEW GAME</span>
            </div>
          </button>
          
          {/* Leaderboard Button */}
          <button 
            onClick={handleActionClick}
            className="w-full p-4 bg-[#F0E7FF] hover:bg-[#E5D4FF] text-black rounded-xl border-2 border-[#B794F4] transition-colors"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-xl">👾</span>
              <span className="text-[14px]" style={{ fontFamily: "'Press Start 2P', cursive" }}>LEADERBOARD</span>
            </div>
          </button>
          
          {/* 1-1 Battle Button */}
          <button 
            disabled
            className="w-full p-4 bg-[#F5F5F5] text-gray-400 rounded-xl border-2 border-gray-200 transition-colors cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-xl">⚔️</span>
              <span className="text-[14px]" style={{ fontFamily: "'Press Start 2P', cursive" }}>1-1 BATTLE</span>
            </div>
          </button>
        </div>

        {/* High Score Card */}
        <div className="mx-4 bg-[#FFFDE1] rounded-xl p-6 border-2 border-[#FFEB3B]">
          <div className="text-center mb-4">
            <div className="text-[12px] text-gray-600" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              HIGHEST SCORE
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
                <span className="text-base">👾</span>
              </div>
              <span className="text-[12px] text-black" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                ALEX_88
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🪙</span>
              <span className="text-[24px] font-bold text-[#4CAF50]" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                $487K
              </span>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-[10px] text-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              CAN YOU BEAT IT?
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 text-center space-y-2">
        <div 
          className="text-[10px] text-gray-500 cursor-pointer hover:text-gray-600 transition-colors"
          style={{ 
            fontFamily: "'Press Start 2P', cursive",
            animation: 'coinPulse 2s ease-in-out infinite'
          }}
          onClick={() => {
            const audio = new Audio('/coin.mp3');
            audio.play().catch(() => {});
          }}
        >
          INSERT COIN TO CONTINUE
        </div>
        <div className="text-[8px] text-gray-400" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          A PRODUCTION BY MATT JAMES
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes coinPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes tradingAnimation {
          0% { 
            transform: translateY(0) scale(1);
            filter: brightness(1.1);
          }
          25% { 
            transform: translateY(-8px) scale(1.1);
            filter: brightness(1.3);
          }
          50% { 
            transform: translateY(0) scale(1);
            filter: brightness(1.1);
          }
          75% { 
            transform: translateY(8px) scale(0.95);
            filter: brightness(1);
          }
          100% { 
            transform: translateY(0) scale(1);
            filter: brightness(1.1);
          }
        }

        .trading-text {
          display: inline-block;
          animation: tradingAnimation 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .trading-candlestick {
          width: 32px;
          height: 64px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .candlestick {
          width: 100%;
          height: 100%;
          position: relative;
          animation: candlestickPulse 3s ease-in-out infinite;
        }

        .upper-wick, .lower-wick {
          position: absolute;
          left: 50%;
          width: 2px;
          height: 12px;
          background: #333;
          transform: translateX(-50%);
        }

        .upper-wick {
          top: 0;
        }

        .lower-wick {
          bottom: 0;
        }

        .body {
          position: absolute;
          top: 12px;
          bottom: 12px;
          width: 100%;
          border-radius: 2px;
          animation: candleColor 3s ease-in-out infinite;
        }

        @keyframes candlestickPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes candleColor {
          0% {
            background: #22c55e;
            height: 20%;
            top: 32px;
          }
          25% {
            background: #22c55e;
            height: 40px;
            top: 12px;
          }
          50% {
            background: #ef4444;
            height: 40px;
            top: 12px;
          }
          75% {
            background: #ef4444;
            height: 20%;
            top: 12px;
          }
          100% {
            background: #22c55e;
            height: 20%;
            top: 32px;
          }
        }

        .slide-up-delay {
          opacity: 0;
          animation: slideUp 0.5s ease-out forwards;
          animation-delay: 1s;
        }

        @keyframes slideUp {
          from { 
            transform: translateY(10px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
