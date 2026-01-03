'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/app/lib/auth-context';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { X } from 'lucide-react';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user?.role !== 'owner') {
        router.push('/unauthorized');
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'owner') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with notifications - sticky at top */}
      <Header role="owner" onMenuClick={() => setSidebarOpen(true)} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar - Desktop always visible, Mobile slide-in */}
        <div className={`
          fixed lg:sticky lg:top-16 inset-y-0 left-0 z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:transition-none lg:h-[calc(100vh-4rem)]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="lg:hidden absolute top-3 right-3 z-10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}