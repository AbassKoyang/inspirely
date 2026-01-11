'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useAuth } from '@/lib/contexts/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log('ProtectedRoute: Current state', { user, loading });

  useEffect(() => {
    if (!loading && !user) {
      console.log('ProtectedRoute: Redirecting to auth');
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
        <div className="animate-bounce h-8 w-8 rounded-full bg-emerald-600"></div>
        <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-bounce h-8 w-8 rounded-full bg-emerald-600"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}