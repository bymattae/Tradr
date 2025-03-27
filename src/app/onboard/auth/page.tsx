'use client';

import { useState, useEffect } from 'react';
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
  // Add more country codes as needed
];

export default function AuthPage() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState('');

  useEffect(() => {
    // Get stored user data
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const storedAvatarUrl = localStorage.getItem('avatarUrl');
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }
    const storedBio = localStorage.getItem('bio');
    if (storedBio) {
      setBio(storedBio);
    }
  }, []);

  const handleGetOtp = () => {
    const audio = new Audio('/click.mp3');
    audio.play().catch(() => {});
    // Here you would typically make an API call to send OTP
    setShowOtp(true);
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    // Here you would typically verify the OTP with your API
    setTimeout(() => {
      const audio = new Audio('/success.mp3');
      audio.play().catch(() => {});
      router.push('/game');
    }, 1000);
  };

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

  return (
    <OnboardingLayout step={2} title="GET OTP" emoji="📱">
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
            Select country code and enter your phone number
          </p>
        </div>

        {/* OTP Section */}
        {showOtp ? (
          <div className="space-y-4">
            <div className="flex gap-2 justify-between">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  value={otp[i] || ''}
                  readOnly
                  className="w-12 h-12 text-center font-bold text-xl border-2 border-gray-200 rounded-lg focus:border-[--primary] focus:outline-none"
                />
              ))}
            </div>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="opacity-0 absolute"
              autoFocus
              maxLength={6}
            />
            <p className="text-[10px] text-gray-500 text-center font-bold">
              Enter the 6-digit code sent to {countryCode} {phone}
            </p>
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
            🔒 GET OTP
          </button>
        )}

        {/* Profile Preview */}
        <ProfilePreview
          username={username}
          avatarUrl={avatarUrl}
          bio={bio}
        />
      </div>
    </OnboardingLayout>
  );
} 