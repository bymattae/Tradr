'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
  };

  return (
    <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-32 h-32 bg-green-400/20 rounded-full blur-3xl top-1/4 -left-16 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-green-400/20 rounded-full blur-3xl bottom-1/4 -right-16 animate-pulse delay-1000"></div>
        <div className="absolute w-24 h-24 bg-green-400/20 rounded-full blur-2xl top-1/3 right-1/4 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full relative">
        {/* Sign Up Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          {/* Card Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500 mt-2">Start your trading journey today</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                placeholder="Password"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                placeholder="Confirm Password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <Link href="/terms" className="text-green-500 hover:text-green-600">Terms</Link> and <Link href="/privacy" className="text-green-500 hover:text-green-600">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              CREATE AN ACCOUNT
            </button>

            <div className="text-center">
              <Link 
                href="/login" 
                className="inline-block text-gray-600 hover:text-gray-800 border-2 border-gray-200 rounded-xl px-6 py-3 w-full text-center hover:border-gray-300 transition-colors"
              >
                ALREADY HAVE AN ACCOUNT?
              </Link>
            </div>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/30 rounded-full blur-sm"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-400/30 rounded-full blur-sm"></div>
      </div>
    </main>
  );
} 