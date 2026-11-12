'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  businessName: string;
  servicesCount: number;
  menuCategoriesCount: number;
  languagesSupported: string[];
  bookingsCount?: number;
  newBookingsCount?: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authRes = await fetch('/api/admin/auth');
        if (!authRes.ok) {
          router.push('/admin/login');
          return;
        }

        // Fetch stats
        const [businessRes, servicesRes, menuRes, dictRes, bookingsRes] = await Promise.all([
          fetch('/api/admin/business-info'),
          fetch('/api/admin/services'),
          fetch('/api/admin/menu'),
          fetch('/api/admin/dictionary'),
          fetch('/api/admin/bookings'),
        ]);

        if (!businessRes.ok || !servicesRes.ok || !menuRes.ok || !dictRes.ok) {
          throw new Error('Failed to load dashboard data');
        }

        const [business, services, menu, dict] = await Promise.all([
          businessRes.json(),
          servicesRes.json(),
          menuRes.json(),
          dictRes.json(),
        ]);

        let bookingsData = { stats: { total: 0, new: 0 } };
        if (bookingsRes.ok) {
          bookingsData = await bookingsRes.json();
        }

        setStats({
          businessName: business.name,
          servicesCount: services.services?.length || 0,
          menuCategoriesCount: menu.categories?.length || 0,
          languagesSupported: Object.keys(dict),
          bookingsCount: bookingsData.stats?.total || 0,
          newBookingsCount: bookingsData.stats?.new || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-charcoal">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="px-4 py-2 bg-gold text-charcoal rounded-lg font-medium hover:bg-gold/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-charcoal mb-2">Admin Dashboard</h1>
        <p className="text-charcoal/60">Welcome back! Manage your website content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon="🏢"
          label="Business Name"
          value={stats?.businessName || 'N/A'}
        />
        <StatCard
          icon="🎯"
          label="Services"
          value={`${stats?.servicesCount || 0} service${(stats?.servicesCount || 0) !== 1 ? 's' : ''}`}
        />
        <StatCard
          icon="🍽️"
          label="Menu Categories"
          value={`${stats?.menuCategoriesCount || 0} categor${(stats?.menuCategoriesCount || 0) !== 1 ? 'ies' : 'y'}`}
        />
        <StatCard
          icon="🌐"
          label="Languages"
          value={stats?.languagesSupported?.join(', ').toUpperCase() || 'N/A'}
        />
        <StatCard
          icon="📅"
          label="Total Bookings"
          value={`${stats?.bookingsCount || 0} booking${(stats?.bookingsCount || 0) !== 1 ? 's' : ''}`}
        />
        {stats && stats.newBookingsCount !== undefined && stats.newBookingsCount > 0 && (
          <StatCard
            icon="🆕"
            label="New Bookings"
            value={`${stats.newBookingsCount} new`}
          />
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-charcoal mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            href="/admin/business-info"
            icon="🏢"
            title="Edit Business Info"
            description="Update your contact details and address"
          />
          <QuickActionCard
            href="/admin/services"
            icon="🎯"
            title="Manage Services"
            description="Edit service descriptions and details"
          />
          <QuickActionCard
            href="/admin/menu"
            icon="🍽️"
            title="Update Menu"
            description="Manage catering menu items"
          />
          <QuickActionCard
            href="/admin/dictionary"
            icon="📝"
            title="Edit Content"
            description="Update all website text content"
          />
          <QuickActionCard
            href="/admin/bookings"
            icon="📅"
            title="View Bookings"
            description="Manage wedding booking requests"
          />
          <QuickActionCard
            href="/admin/settings"
            icon="⚙️"
            title="Settings"
            description="Change admin password and preferences"
          />
          <QuickActionCard
            href="/"
            icon="👁️"
            title="View Website"
            description="See how your site looks"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-gold/5 border border-gold/20 rounded-xl p-6">
        <h3 className="font-bold text-charcoal mb-3">ℹ️ How to Use This Admin Panel</h3>
        <ul className="text-charcoal/80 space-y-2">
          <li>• <strong>Business Info:</strong> Update your company details, address, and contact information</li>
          <li>• <strong>Services:</strong> Edit service descriptions, images, and checklists</li>
          <li>• <strong>Menu:</strong> Manage your catering menu categories and items</li>
          <li>• <strong>Content:</strong> Edit all website text in both English and Hindi</li>
          <li>• <strong>Settings:</strong> Change your admin password to something secure</li>
        </ul>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-beige/50">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-sm text-charcoal/60 mb-1">{label}</p>
      <p className="text-2xl font-bold text-charcoal">{value}</p>
    </div>
  );
}

interface QuickActionCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

function QuickActionCard({ href, icon, title, description }: QuickActionCardProps) {
  return (
    <a
      href={href}
      className="block p-4 rounded-lg border border-beige/50 hover:border-gold/50 hover:shadow-md transition-all bg-white hover:bg-gold/2"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-bold text-charcoal mb-1">{title}</h3>
      <p className="text-sm text-charcoal/60">{description}</p>
    </a>
  );
}
