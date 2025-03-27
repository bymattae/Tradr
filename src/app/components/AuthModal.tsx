'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl border-2 border-gray-200 w-full max-w-sm mx-4 transform transition-all"
      >
        <div className="p-6">
          <h2 className="text-[20px] mb-6 font-bold text-center" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            Start a game
          </h2>
          
          <div className="space-y-4">
            <Link
              href="/onboard"
              className="flex items-center w-full p-4 text-[14px] text-black hover:bg-gray-50 transition-colors rounded-lg border-2 border-gray-200 group"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
              onClick={onClose}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-6 h-6 flex items-center justify-center">📊</span>
                  <span>I'm new here</span>
                </div>
                <div className="text-[10px] text-gray-500 ml-9">
                  Make an account now
                </div>
              </div>
            </Link>

            <Link
              href="/login"
              className="flex items-center w-full p-4 text-[14px] text-black hover:bg-gray-50 transition-colors rounded-lg border-2 border-gray-200 group"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
              onClick={onClose}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-6 h-6 flex items-center justify-center">💹</span>
                  <span>I have an account</span>
                </div>
                <div className="text-[10px] text-gray-500 ml-9">
                  Login to Tradr now
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 