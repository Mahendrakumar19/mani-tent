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
    { href: '/admin/business-info', label: 'Business Info', icon: '🏢' },
    { href: '/admin/services', label: 'Services', icon: '🎯' },
    { href: '/admin/menu', label: 'Catering Menu', icon: '🍽️' },
    { href: '/admin/dictionary', label: 'Content', icon: '📝' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="bg-charcoal text-ivory border-r border-gold/20 w-full md:w-64 flex flex-col">
      <div className="p-6 border-b border-gold/20">
        <h1 className="text-2xl font-bold text-gold">MANI TENT HOUSE</h1>
        <p className="text-sm text-ivory/60 mt-1">Admin Panel</p>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                  isActive
                    ? 'bg-gold/20 text-gold border-r-4 border-gold'
                    : 'text-ivory/70 hover:text-ivory hover:bg-charcoal/50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="p-6 border-t border-gold/20">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <span>🚪</span>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </nav>
  );
}
