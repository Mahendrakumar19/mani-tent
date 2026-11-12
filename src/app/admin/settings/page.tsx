'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormButtonGroup } from '@/components/admin/FormInput';
import Toast, { useToast } from '@/components/admin/Toast';

export default function SettingsPage() {
  const router = useRouter();
  const { toast, showToast, setToast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authRes = await fetch('/api/admin/auth');
        if (!authRes.ok) {
          router.push('/admin/login');
          return;
        }
      } catch (err) {
        showToast('Error loading settings', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, showToast]);

  const handleSavePassword = async () => {
    if (!newPassword || !confirmPassword) {
      showToast('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (res.ok) {
        showToast('Password changed successfully!', 'success');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error('Failed to change password');
      }
    } catch (err) {
      showToast('Error changing password', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Admin Settings</h1>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-charcoal mb-6">Change Admin Password</h2>
        <p className="text-charcoal/70 mb-6">Keep your admin password secure and change it regularly.</p>

        <FormInput
          label="New Password"
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Enter new password (min. 6 characters)"
          required
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm password"
          required
        />

        <button
          onClick={handleSavePassword}
          disabled={isSaving || !newPassword || !confirmPassword}
          className="px-6 py-3 bg-gold hover:bg-gold/90 disabled:bg-gold/50 text-charcoal font-bold rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Update Password'}
        </button>
      </div>

      {/* Info Section */}
      <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
        <h3 className="font-bold text-charcoal mb-4">ℹ️ Admin Panel Information</h3>
        <ul className="text-charcoal/80 space-y-2 text-sm">
          <li>• <strong>Data Storage:</strong> All content is stored in JSON files located in <code className="bg-charcoal/10 px-2 py-1 rounded">/public/data/</code></li>
          <li>• <strong>No Database:</strong> This admin panel uses file-based storage for simplicity</li>
          <li>• <strong>Bilingual:</strong> All content supports both English and Hindi languages</li>
          <li>• <strong>Automatic Backup:</strong> Keep regular backups of your data directory</li>
          <li>• <strong>Security:</strong> Always use a strong, unique password for your admin account</li>
        </ul>
      </div>

      {toast && <Toast {...toast} />}
    </div>
  );
}
