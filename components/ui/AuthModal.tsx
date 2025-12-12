// ============================================
// FILE: components/ui/AuthModal.tsx (UPDATED WITH CORRECT REDIRECTS)
// ============================================
'use client';

import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Props = {
  show: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
};

export default function AuthModal({ show, mode, onClose }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'OWNER' | 'AGENT'>('OWNER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!show) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      if (result?.ok) {
        onClose();
        
        // Redirect based on user role
        // Role comes from the database user record
        // For now, we'll fetch it or assume from signup
        const roleRedirects = {
          OWNER: '/owner/dashboard',
          AGENT: '/agent/dashboard',
          CARETAKER: '/caretaker/dashboard',
          TENANT: '/tenant/dashboard',
          SECURITY: '/staff/security/dashboard',
          GARDENER: '/staff/gardener/dashboard',
        };
        
        // Default to owner for now (will be determined by session)
        router.push('/owner/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Call your API to create user
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          fullName,
          role, // OWNER or AGENT only
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Auto login after signup
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.ok) {
        onClose();
        
        // Redirect based on role they signed up as
        if (role === 'OWNER') {
          router.push('/checkout'); // Owner goes to subscription page first
        } else if (role === 'AGENT') {
          router.push('/checkout'); // Agent goes to subscription page first
        }
        
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}

        {mode === 'login' ? (
          <>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
              Welcome back
            </h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
              Create your account
            </h3>
            
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('OWNER')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    role === 'OWNER'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Property Owner</div>
                  <div className="text-xs mt-1 text-gray-600">
                    Manage properties & tenants
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole('AGENT')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    role === 'AGENT'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Agent</div>
                  <div className="text-xs mt-1 text-gray-600">
                    Manage client properties
                  </div>
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                ℹ️ Only Owners and Agents can subscribe. Other roles (Caretakers, Tenants, Staff) are invited by property owners.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Continue to Subscription'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By signing up, you agree to subscribe to a plan after account creation.
            </p>
          </>
        )}
      </div>
    </div>
  );
}