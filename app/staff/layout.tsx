'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/navigation/Sidebar';
import { useAuth } from '@/app/lib/auth-context';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user?.role !== 'staff') {
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

  if (!isAuthenticated || user?.role !== 'staff') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}