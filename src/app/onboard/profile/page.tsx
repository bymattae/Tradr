'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingLayout from '@/app/components/OnboardingLayout';
import ProfilePreview from '@/app/components/ProfilePreview';

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate username availability check
  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value.length > 0) {
      setIsChecking(true);
      const timer = setTimeout(() => {
        setIsAvailable(value.length >= 3 && !value.includes(' '));
        setIsChecking(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsAvailable(null);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const url = URL.createObjectURL(file);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate upload
    setAvatarUrl(url);
    setIsUploading(false);
  };

  const handleFinish = () => {
    if (!username || !isAvailable || !avatarUrl || !bio) return;

    try {
      // Play success sound
      const audio = new Audio('/success.mp3');
      audio.play().catch(() => {});

      // Store profile data
      localStorage.setItem('username', username);
      localStorage.setItem('avatarUrl', avatarUrl);
      localStorage.setItem('bio', bio);

      // Navigate to game
      router.push('/game');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <OnboardingLayout step={1} title="BUILD YOUR PROFILE" emoji="✨">
      <div className="space-y-6">
        {/* Live Profile Preview */}
        <ProfilePreview
          username={username}
          avatarUrl={avatarUrl}
          bio={bio}
          isEditing={true}
          onAvatarClick={handleAvatarClick}
          onBioChange={setBio}
          onUsernameChange={handleUsernameChange}
        />

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Username Availability */}
        {username && (
          <div className="flex items-center justify-center gap-2">
            {isChecking ? (
              <>
                <div className="w-3 h-3 border-2 border-[--primary] border-t-transparent rounded-full spin" />
                <p className="text-[10px] text-gray-500 font-bold">Checking availability...</p>
              </>
            ) : isAvailable ? (
              <>
                <span className="text-[--primary] font-bold">✓</span>
                <p className="text-[10px] text-[--primary] font-bold">@{username} is available!</p>
              </>
            ) : (
              <>
                <span className="text-red-400 font-bold">×</span>
                <p className="text-[10px] text-red-400 font-bold">Username must be 3-15 characters, no spaces</p>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleGoBack}
            className="btn btn-secondary flex-1 font-bold"
          >
            👈 GO BACK
          </button>
          <button
            onClick={handleFinish}
            disabled={!username || !isAvailable || !avatarUrl || !bio}
            className="btn btn-primary flex-1 font-bold"
          >
            {!username ? '1. ADD USERNAME' : !avatarUrl ? '2. ADD PHOTO' : !bio ? '3. ADD BIO' : '✨ LOOKS GOOD!'}
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 