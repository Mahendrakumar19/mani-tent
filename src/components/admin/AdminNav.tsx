'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({ logout: true }),
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
    { href: '/admin/business-info', label: 'Business Info', icon: '🏢' },
    { href: '/admin/services', label: 'Services', icon: '🎯' },
    { href: '/admin/menu', label: 'Catering Menu', icon: '🍽️' },
    { href: '/admin/dictionary', label: 'Content', icon: '📝' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="bg-gradient-to-b from-charcoal to-charcoal/95 text-ivory border-r border-gold/20 w-full md:w-64 flex flex-col shadow-lg">
      <div className="p-6 border-b border-gold/20 bg-gradient-to-r from-gold/10 to-transparent">
        <h1 className="text-2xl font-bold text-gold font-playfair">🎪 MANI TENT HOUSE</h1>
        <p className="text-xs text-ivory/50 mt-2 uppercase tracking-wide">Admin Control Panel</p>
      </div>

      <ul className="flex-1 overflow-y-auto space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'bg-gold text-charcoal font-semibold shadow-lg'
                    : 'text-ivory/70 hover:text-ivory hover:bg-gold/10'
                }`}
              >
                <span className={`text-xl transition-transform group-hover:scale-110 ${
                  isActive ? '' : 'group-hover:brightness-125'
                }`}>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="p-4 border-t border-gold/20 bg-gradient-to-t from-charcoal/50 to-transparent">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/25 hover:bg-red-600/40 text-red-200 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 border border-red-600/30 hover:border-red-500/50 hover:shadow-lg"
        >
          <span>🚪</span>
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </nav>
  );
}
