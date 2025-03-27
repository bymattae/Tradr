'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import OnboardingLayout from '@/app/components/OnboardingLayout';
import ProfilePreview from '@/app/components/ProfilePreview';

export default function AvatarPage() {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For now, just create a local URL for preview
    setIsUploading(true);
    const url = URL.createObjectURL(file);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate upload
    setAvatarUrl(url);
    setIsUploading(false);
  };

  const handleNext = () => {
    const audio = new Audio('/click.mp3');
    audio.play().catch(() => {});
    router.push('/onboard/auth');
  };

  return (
    <OnboardingLayout step={1} title="JAZZ IT UP" emoji="✨">
      <div className="space-y-8">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32">
            {isUploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <div className="w-6 h-6 border-2 border-[#00b36b] border-t-transparent rounded-full animate-[spin_0.6s_linear_infinite]" />
              </div>
            ) : avatarUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  fill
                  className="rounded-xl object-cover"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-1.5 bg-black bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all"
                >
                  <span className="text-xs text-white">✏️</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#00b36b] transition-all"
              >
                <span className="text-2xl mb-2">📸</span>
                <span 
                  className="text-[10px] text-gray-500 font-bold"
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                >
                  Add photo
                </span>
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Bio Input */}
        <div className="space-y-2">
          <label 
            className="block text-[10px] text-gray-600 font-bold" 
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            YOUR BIO
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell everyone a bit about yourself..."
            className="w-full h-24 p-4 bg-gray-50 border-2 rounded-lg text-black text-[10px] focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#00b36b] focus:shadow-[0_0_15px_rgba(0,255,153,0.2)] resize-none font-bold"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
            maxLength={150}
          />
          <p 
            className="text-[10px] text-right text-gray-400 font-bold" 
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            {bio.length}/150
          </p>
        </div>

        {/* Profile Preview */}
        <ProfilePreview
          username={username}
          avatarUrl={avatarUrl}
          bio={bio}
        />
      </div>

      {/* Continue Button */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={handleNext}
          disabled={!avatarUrl || !bio.trim()}
          className={`w-full p-4 rounded-lg transition-all duration-300 font-bold ${
            avatarUrl && bio.trim()
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          🚀 START PLAYING
        </button>
      </div>
    </OnboardingLayout>
  );
} 