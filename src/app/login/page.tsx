'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { signInWithEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await signInWithEmail(email);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6ff] flex flex-col items-center p-4 relative overflow-hidden">
      {/* Font import and Animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        @keyframes letterFlicker {
          0%, 100% { opacity: 1; transform: translateY(0); }
          10% { opacity: 0.5; transform: translateY(1px); }
          20% { opacity: 0.8; transform: translateY(-1px); }
          30% { opacity: 0.4; transform: translateY(1px); }
          40% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes glowPulseHover {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 153, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 153, 0.5); }
        }
        
        @keyframes pixelBounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(2px); }
          100% { transform: translateY(0); }
        }

        @keyframes crtFlicker {
          0% { opacity: 0.95; }
          50% { opacity: 1; }
          100% { opacity: 0.98; }
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes coinShimmer {
          0% { text-shadow: 0 0 5px rgba(118, 255, 3, 0.4); }
          50% { text-shadow: 0 0 15px rgba(118, 255, 3, 0.8), 0 0 30px rgba(118, 255, 3, 0.4); }
          100% { text-shadow: 0 0 5px rgba(118, 255, 3, 0.4); }
        }

        @keyframes insertCoinGlow {
          0% { color: #888888; text-shadow: 0 0 5px rgba(136, 136, 136, 0.3); }
          50% { color: #aaaaaa; text-shadow: 0 0 10px rgba(170, 170, 170, 0.5); }
          100% { color: #888888; text-shadow: 0 0 5px rgba(136, 136, 136, 0.3); }
        }
      `}</style>

      {/* Language Selector */}
      <div className="absolute top-8 right-8">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-black">
          <span>English</span>
          <span>⌄</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md space-y-10 mt-28">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            {'TRADR'.split('').map((letter, i) => (
              <span 
                key={i}
                className="inline-block"
                style={{ 
                  animation: `letterFlicker 2s ${i * 0.2}s infinite`
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            Buy Or Sell - You Choose
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link href="/game" className="block w-full">
            <button className="btn btn-primary w-full">
              NEW GAME
            </button>
          </Link>
          <Link href="/leaderboard" className="block w-full">
            <button className="btn btn-primary w-full">
              LEADERBOARD
            </button>
          </Link>
          <button className="btn btn-primary w-full opacity-50 cursor-not-allowed" disabled>
            1-1 COMING SOON
          </button>
        </div>

        {/* High Score Section */}
        <Link 
          href="/profile/ALEX_88"
          className="block w-full bg-[#fffde1] rounded-xl p-6 border-2 border-[#ffeb3b] shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="text-center mb-4">
            <div className="text-sm text-gray-600" style={{ fontFamily: "'Press Start 2P', cursive" }}>HIGHEST SCORE</div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 text-base flex items-center justify-center">👾</div>
              </div>
              <div className="text-xs text-black" style={{ fontFamily: "'Press Start 2P', cursive" }}>ALEX_88</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🪙</span>
              <div 
                className="text-3xl font-bold text-[#0a5c36]"
                style={{ 
                  fontFamily: "'Press Start 2P', cursive",
                  textShadow: '2px 2px 0px rgba(10, 92, 54, 0.1)',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                $487K
              </div>
            </div>
          </div>
          <div className="text-center">
            <div 
              className="text-xs text-gray-500 italic transform -rotate-1" 
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              CAN YOU BEAT IT?
            </div>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center space-y-2">
        <div 
          className="text-[10px] cursor-pointer"
          style={{ 
            fontFamily: "'Press Start 2P', cursive",
            animation: 'insertCoinGlow 2s ease-in-out infinite'
          }}
          onClick={() => {
            // Coin drop sound would be added here
            const audio = new Audio('/coin.mp3');
            audio.play().catch(() => {});
          }}
        >
          INSERT COIN TO CONTINUE
        </div>
        <div 
          className="text-[8px] text-gray-400" 
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          A PRODUCTION BY MATT JAMES
        </div>
      </div>
    </main>
  );
}