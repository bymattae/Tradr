'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingLayout from '@/app/components/OnboardingLayout';
import ProfilePreview from '@/app/components/ProfilePreview';

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'IN' },
  { code: '+61', country: 'AU' },
  { code: '+65', country: 'SG' },
  { code: '+81', country: 'JP' },
];

export default function OnboardPage() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Profile state
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleGetOtp = () => {
    const audio = new Audio('/click.mp3');
    audio.play().catch(() => {});
    setShowOtp(true);
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    // For testing: accept any 6-digit number
    setTimeout(() => {
      const audio = new Audio('/success.mp3');
      audio.play().catch(() => {});
      setShowProfile(true);
    }, 1000);
  };

  // Profile handlers
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

  const handleCompleteProfile = () => {
    if (!username || !isAvailable || !avatarUrl || !bio) return;

    try {
      // Play success sound
      const audio = new Audio('/success.mp3');
      audio.play().catch(() => {});

      // Store profile data
      localStorage.setItem('username', username);
      localStorage.setItem('avatarUrl', avatarUrl);
      localStorage.setItem('bio', bio);
      localStorage.setItem('showWelcome', 'true');

      // Navigate to game
      router.push('/game');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (showProfile) {
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
            <div className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg whitespace-nowrap ${
              isChecking 
                ? 'bg-gray-50' 
                : isAvailable 
                  ? 'bg-green-50 border-2 border-green-100' 
                  : 'bg-red-50 border-2 border-red-100'
            }`}>
              {isChecking ? (
                <>
                  <div className="w-3 h-3 border-2 border-[--primary] border-t-transparent rounded-full spin" />
                  <p className="text-[12px] text-gray-500 font-bold animate-pulse">Checking availability...</p>
                </>
              ) : isAvailable ? (
                <>
                  <span className="text-lg">✅</span>
                  <p className="text-[12px] text-green-600 font-bold">@{username} is available!</p>
                </>
              ) : (
                <>
                  <span className="text-lg">❌</span>
                  <p className="text-[12px] text-red-600 font-bold">Min 3, max 15 characters</p>
                </>
              )}
            </div>
          )}

          {/* Complete Profile Button */}
          <button
            onClick={handleCompleteProfile}
            disabled={!username || !isAvailable || !avatarUrl || !bio}
            className="btn btn-primary w-full font-bold"
          >
            {!username ? '1. ADD USERNAME' : !avatarUrl ? '2. ADD PHOTO' : !bio ? '3. ADD BIO' : '✨ COMPLETE PROFILE'}
          </button>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout step={0} title="VERIFY YOUR PHONE" emoji="📱">
      <div className="space-y-6">
        {/* Phone Input */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="appearance-none bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 pr-8 font-bold text-[14px] focus:outline-none focus:border-[--primary] disabled:bg-gray-100 disabled:cursor-not-allowed w-32"
                disabled={showOtp}
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} {country.country}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Phone number"
              className="input font-bold flex-1"
              disabled={showOtp}
            />
          </div>
          <p className="text-[10px] text-gray-500 text-center font-bold">
            {showOtp ? `Enter any 6 digits to continue (testing mode)` : `Enter your phone number`}
          </p>
        </div>

        {/* OTP Section */}
        {showOtp ? (
          <div className="space-y-4">
            <div className="flex gap-2 justify-between">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center font-bold text-xl"
                >
                  {otp[i] || ''}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter any 6 digits"
              className="input text-center font-bold"
              maxLength={6}
              autoFocus
            />
            <button 
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || isVerifying}
              className="btn btn-primary w-full font-bold"
            >
              {isVerifying ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spin mx-auto" />
              ) : (
                '🔒 VERIFY OTP'
              )}
            </button>
          </div>
        ) : (
          <button 
            onClick={handleGetOtp}
            disabled={phone.length < 10}
            className="btn btn-primary w-full font-bold"
          >
            📱 GET OTP
          </button>
        )}
      </div>
    </OnboardingLayout>
  );
} 