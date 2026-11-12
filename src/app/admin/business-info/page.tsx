'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormButtonGroup } from '@/components/admin/FormInput';
import Toast, { useToast } from '@/components/admin/Toast';

interface BusinessInfo {
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  description: string;
}

export default function BusinessInfoPage() {
  const router = useRouter();
  const { toast, showToast, setToast } = useToast();
  const [data, setData] = useState<BusinessInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const authRes = await fetch('/api/admin/auth');
        if (!authRes.ok) {
          router.push('/admin/login');
          return;
        }

        const dataRes = await fetch('/api/admin/business-info');
        if (!dataRes.ok) throw new Error('Failed to load data');

        const businessData = await dataRes.json();
        setData(businessData);
      } catch (err) {
        showToast('Error loading data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoad();
  }, [router, showToast]);

  const handleChange = (field: keyof BusinessInfo, value: string) => {
    if (data) {
      setData({ ...data, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/business-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast('Business information saved successfully!', 'success');
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      showToast('Error saving changes', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin');
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!data) {
    return <div className="p-8">Error loading data</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Edit Business Information</h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        <FormInput
          label="Business Name"
          name="name"
          value={data.name}
          onChange={(value) => handleChange('name', value)}
          required
        />

        <FormInput
          label="Address"
          name="address"
          value={data.address}
          onChange={(value) => handleChange('address', value)}
          type="textarea"
          rows={3}
          required
        />

        <FormInput
          label="Phone 1"
          name="phone1"
          value={data.phone1}
          onChange={(value) => handleChange('phone1', value)}
          required
        />

        <FormInput
          label="Phone 2"
          name="phone2"
          value={data.phone2}
          onChange={(value) => handleChange('phone2', value)}
        />

        <FormInput
          label="Email"
          name="email"
          value={data.email}
          onChange={(value) => handleChange('email', value)}
          type="email"
          required
        />

        <FormInput
          label="Description"
          name="description"
          value={data.description}
          onChange={(value) => handleChange('description', value)}
          type="textarea"
          rows={4}
        />

        <FormButtonGroup
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      </div>

      {toast && <Toast {...toast} />}
    </div>
  );
}
