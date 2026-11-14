import type { Metadata } from 'next';
import AdminNav from '@/components/admin/AdminNav';
import SessionTimeoutProvider from '@/components/admin/SessionTimeoutProvider';

export const metadata: Metadata = {
  title: 'Admin Panel | MANI TENT HOUSE',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionTimeoutProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-charcoal/5">
        <AdminNav />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </SessionTimeoutProvider>
  );
}
