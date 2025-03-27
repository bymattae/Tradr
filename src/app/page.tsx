'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from '@/components/AuthModal';

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block border-2 border-black p-2 mb-4">
              <h1 className="text-4xl font-heading">BUY or SELL</h1>
            </div>
            <p className="text-gray-600 text-sm font-sans">Powered by Tradr</p>
          </motion.div>

          {/* Game Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-[#E7FFF2] hover:bg-[#D0FFE4] text-[#006837] py-4 rounded-lg border-2 border-[#B3FFD6] transition-colors font-heading flex items-center justify-center gap-2"
            >
              <span>🚀</span>
              NEW GAME
            </button>

            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-[#F0F0FF] hover:bg-[#E6E6FF] text-[#000066] py-4 rounded-lg border-2 border-[#D6D6FF] transition-colors font-heading flex items-center justify-center gap-2"
            >
              <span>🏆</span>
              LEADERBOARD
            </button>

            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-[#FFF0F0] hover:bg-[#FFE6E6] text-[#660000] py-4 rounded-lg border-2 border-[#FFD6D6] transition-colors font-heading flex items-center justify-center gap-2"
            >
              <span>⚔️</span>
              1-1 BATTLE
            </button>
          </motion.div>

          {/* High Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#FFFFF0] border-2 border-[#FFFFD6] rounded-lg p-4"
          >
            <h2 className="text-center text-sm font-heading mb-4">HIGHEST SCORE</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  👾
                </div>
                <span className="font-heading text-sm">ALEX_88</span>
              </div>
              <span className="font-heading text-sm text-green-600">$487K</span>
            </div>
            <p className="text-center text-xs font-sans mt-4 text-gray-500">
              CAN YOU BEAT IT?
            </p>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-xs font-sans text-gray-400"
          >
            INSERT COIN TO CONTINUE
          </motion.p>
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
