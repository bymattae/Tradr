'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';

export default function UserAvatar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-3">
        {/* XP Counter */}
        {user && (
          <div className="flex items-center">
            <span className="text-[14px] text-gray-700 font-bold" style={{ fontFamily: "'Press Start 2P', cursive" }}>
              15,142
            </span>
          </div>
        )}
        
        {/* Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors focus:outline-none"
        >
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-xl text-gray-600">
                {user?.email ? user.email[0].toUpperCase() : '?'}
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
          {user ? (
            <div className="w-48">
              <Link
                href="/profile"
                className="block px-4 py-3 text-[14px] text-black hover:bg-gray-50 transition-colors border-b border-gray-100"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
                onClick={() => setIsOpen(false)}
              >
                Edit Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-3 text-[14px] text-black hover:bg-gray-50 transition-colors"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="w-40">
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-3 text-[14px] text-black hover:bg-gray-50 transition-colors"
                style={{ fontFamily: "'Press Start 2P', cursive" }}
                onClick={() => setIsOpen(false)}
              >
                <span>📈</span>
                <span>Start</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 