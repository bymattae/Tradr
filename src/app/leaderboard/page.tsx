'use client';

import { useState } from 'react';

// Mock data - replace with real data from your backend
const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  username: `Trader${i + 1}`,
  xp: Math.floor(Math.random() * 1000000),
  streak: Math.floor(Math.random() * 100),
  level: Math.floor(Math.random() * 50) + 1
}));

// Sort by XP
const sortedUsers = [...mockUsers].sort((a, b) => b.xp - a.xp);

export default function LeaderboardPage() {
  const [timeFrame, setTimeFrame] = useState<'all' | 'weekly' | 'daily'>('all');

  return (
    <main className="min-h-screen bg-[#f4f6ff] flex flex-col items-center p-4">
      {/* Font import and Animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div className="w-full max-w-md mb-8">
        <h1 
          className="text-xl font-bold text-center text-black mb-4" 
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          LEADERBOARD
        </h1>
        
        {/* Time Frame Selector */}
        <div className="flex justify-center space-x-2">
          {(['all', 'weekly', 'daily'] as const).map((frame) => (
            <button
              key={frame}
              onClick={() => setTimeFrame(frame)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                timeFrame === frame
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              {frame.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-md space-y-2">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 rounded-lg">
          <div className="col-span-1 text-center text-xs text-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>#</div>
          <div className="col-span-5 text-left text-xs text-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>USER</div>
          <div className="col-span-3 text-right text-xs text-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>XP</div>
          <div className="col-span-2 text-right text-xs text-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>LVL</div>
          <div className="col-span-1 text-right text-xs text-gray-500" style={{ fontFamily: "'Press Start 2P', cursive" }}>🔥</div>
        </div>

        {/* User Rows */}
        {sortedUsers.map((user, index) => {
          const isTop3 = index < 3;
          const bgColor = isTop3 
            ? index === 0 
              ? 'bg-yellow-50' 
              : index === 1 
                ? 'bg-gray-50' 
                : 'bg-amber-50'
            : 'bg-white';
          
          const borderColor = isTop3
            ? index === 0
              ? 'border-yellow-200'
              : index === 1
                ? 'border-gray-200'
                : 'border-amber-200'
            : 'border-gray-100';

          return (
            <div 
              key={user.id}
              className={`grid grid-cols-12 gap-2 px-4 py-3 rounded-lg border ${bgColor} ${borderColor} transition-all duration-300 hover:shadow-md`}
            >
              <div className="col-span-1 text-center">
                <span 
                  className={`text-sm font-bold ${
                    isTop3 
                      ? index === 0 
                        ? 'text-yellow-500' 
                        : index === 1 
                          ? 'text-gray-500' 
                          : 'text-amber-500'
                      : 'text-gray-400'
                  }`}
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                >
                  {index + 1}
                </span>
              </div>
              <div className="col-span-5 text-left">
                <span 
                  className="text-sm font-bold text-black" 
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                >
                  {user.username}
                </span>
              </div>
              <div className="col-span-3 text-right">
                <span 
                  className="text-sm font-bold text-[#00b36b]" 
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                >
                  {user.xp.toLocaleString()}
                </span>
              </div>
              <div className="col-span-2 text-right">
                <span 
                  className="text-sm font-bold text-blue-500" 
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                >
                  {user.level}
                </span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-sm">{user.streak}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
} 