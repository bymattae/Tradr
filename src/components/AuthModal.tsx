'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-[20px] mb-6 font-heading text-center">
            Start a game
          </h2>
          
          <div className="space-y-4">
            <Link
              href="/onboard"
              className="flex items-center w-full p-4 text-[14px] text-black hover:bg-gray-50 transition-colors rounded-lg border-2 border-gray-200 group"
              onClick={onClose}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-6 h-6 flex items-center justify-center">📊</span>
                  <span className="font-heading">I&apos;m new here</span>
                </div>
                <div className="text-[10px] text-gray-500 ml-9 font-sans">
                  Make an account now
                </div>
              </div>
            </Link>

            <Link
              href="/login"
              className="flex items-center w-full p-4 text-[14px] text-black hover:bg-gray-50 transition-colors rounded-lg border-2 border-gray-200 group"
              onClick={onClose}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-6 h-6 flex items-center justify-center">💹</span>
                  <span className="font-heading">I have an account</span>
                </div>
                <div className="text-[10px] text-gray-500 ml-9 font-sans">
                  Login to Tradr now
                </div>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 