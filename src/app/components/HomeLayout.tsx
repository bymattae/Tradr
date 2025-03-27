interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-3">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex items-center justify-end h-8">
            {/* Profile Pic */}
            <div className="w-8 h-8 rounded-full bg-gray-100" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-lg mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 