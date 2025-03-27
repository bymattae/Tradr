'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1 && phoneNumber) {
      // TODO: Send verification code
      setStep(2);
    } else if (step === 2 && verificationCode) {
      // TODO: Verify code
      setStep(3);
    } else if (step === 3 && username) {
      // TODO: Save username
      router.push('/game');
    }
  };

  const stepClass = (s: number) => s === step ? 'bg-blue-500' : 'bg-gray-200';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b-2 border-gray-100 p-4"
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : router.push('/')}
            className="text-gray-600 hover:text-gray-800 font-heading text-sm"
          >
            ← BACK
          </button>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full ${stepClass(s)}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <h1 className="text-2xl font-heading mb-2">
              {step === 1 && 'VERIFY YOUR PHONE'}
              {step === 2 && 'ENTER THE CODE'}
              {step === 3 && 'CHOOSE YOUR NAME'}
            </h1>
            <p className="text-gray-500 text-sm font-sans mb-8">
              {step === 1 && 'We'll send you a verification code'}
              {step === 2 && 'Check your phone for the code'}
              {step === 3 && 'This is how other players will see you'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <div className="flex gap-2">
                  <select
                    className="bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 font-heading text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option>+1</option>
                    <option>+44</option>
                    <option>+81</option>
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(555) 555-5555"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 font-sans placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {step === 2 && (
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 font-heading text-center tracking-[0.5em] focus:outline-none focus:border-blue-500"
                  maxLength={6}
                />
              )}

              {step === 3 && (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="CHOOSE A USERNAME"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 font-heading text-center uppercase focus:outline-none focus:border-blue-500"
                  maxLength={12}
                />
              )}

              <button
                type="submit"
                className="w-full bg-[#F0F0FF] hover:bg-[#E6E6FF] text-[#000066] py-4 rounded-lg border-2 border-[#D6D6FF] transition-colors font-heading"
              >
                {step === 1 && 'SEND CODE'}
                {step === 2 && 'VERIFY'}
                {step === 3 && 'START PLAYING'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 