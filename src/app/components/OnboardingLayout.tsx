import { useRouter } from 'next/navigation';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step?: number;
  title?: string;
  emoji?: string;
}

export default function OnboardingLayout({ 
  children, 
  step = 0,
  title,
  emoji
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-3">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex items-center justify-between h-8">
            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="text-[12px] font-bold h-8 flex items-center"
            >
              BACK
            </button>

            {/* Progress Dots */}
            <div className="flex items-center gap-2 h-8">
              <div className={`w-2 h-2 rounded-full ${step >= 0 ? 'bg-black' : 'bg-gray-200'}`} />
              <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-black' : 'bg-gray-200'}`} />
              <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`} />
            </div>

            {/* Profile Pic */}
            <div className="w-8 h-8 rounded-full bg-gray-100" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-lg mx-auto px-4 py-8">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              {emoji && <span>{emoji}</span>}
              {title}
            </h2>
          </div>
        )}
        {children}
      </main>
    </div>
  );
} 