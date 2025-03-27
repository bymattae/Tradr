'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UsernameSelectionPage() {
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();

  // Simulated username check - will be replaced with actual API call
  const checkUsername = async (value: string) => {
    if (!value) {
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsChecking(false);
    
    // For now, just check if username is at least 3 chars
    setIsAvailable(value.length >= 3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAvailable) {
      router.push('/signup/profile');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Choose your username</h1>
          <p className="mt-2 text-gray-600">This will be your unique identifier in the game</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1 relative">
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  checkUsername(e.target.value);
                }}
                className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${isChecking ? 'border-gray-300' :
                    isAvailable === true ? 'border-green-500' :
                    isAvailable === false ? 'border-red-500' :
                    'border-gray-300'
                  }`}
                placeholder="Choose a username"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {isChecking ? (
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : isAvailable === true ? (
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : isAvailable === false ? (
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                ) : null}
              </div>
            </div>
            <p className={`mt-2 text-sm ${
              isChecking ? 'text-gray-500' :
              isAvailable === true ? 'text-green-600' :
              isAvailable === false ? 'text-red-600' :
              'text-gray-500'
            }`}>
              {isChecking ? 'Checking availability...' :
               isAvailable === true ? 'Username is available!' :
               isAvailable === false ? 'Username is too short or unavailable' :
               'Choose a unique username'}
            </p>
          </div>

          <button
            type="submit"
            disabled={!isAvailable}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
              ${isAvailable
                ? 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            Continue
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          <p>Your username will be visible to other players</p>
        </div>
      </div>
    </main>
  );
} 