'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    fetch('/api/admin/auth')
      .then((res) => {
        if (res.ok) {
          router.push('/admin');
        }
      })
      .finally(() => setIsChecking(false));
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <p className="text-ivory">Checking authentication...</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Authentication failed');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-charcoal/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-charcoal/60 border border-gold/30 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gold font-playfair mb-2">MANI TENT HOUSE</h1>
            <p className="text-ivory/60 text-sm">Admin Panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ivory mb-2">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg bg-charcoal/40 border border-gold/20 text-ivory placeholder-ivory/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-gold hover:bg-gold/90 disabled:bg-gold/50 text-charcoal font-bold py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login to Admin Panel'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 p-4 bg-gold/10 border border-gold/20 rounded-lg">
            <p className="text-xs text-ivory/60 text-center">
              Default password: <code className="text-gold font-mono">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
