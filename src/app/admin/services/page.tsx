'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormButtonGroup } from '@/components/admin/FormInput';
import Toast, { useToast } from '@/components/admin/Toast';

interface Service {
  id: string;
  title: { en: string; hi: string };
  shortDescription: { en: string; hi: string };
  fullDescription: { en: string[]; hi: string[] };
  checklist: { en: string[]; hi: string[] };
  image: string;
}

interface ServicesData {
  services: Service[];
}

export default function ServicesPage() {
  const router = useRouter();
  const { toast, showToast, setToast } = useToast();
  const [data, setData] = useState<ServicesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const authRes = await fetch('/api/admin/auth');
        if (!authRes.ok) {
          router.push('/admin/login');
          return;
        }

        const dataRes = await fetch('/api/admin/services');
        if (!dataRes.ok) throw new Error('Failed to load data');

        const servicesData = await dataRes.json();
        setData(servicesData);
      } catch (err) {
        showToast('Error loading data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoad();
  }, [router, showToast]);

  if (isLoading || !data) {
    return <div className="p-8">Loading...</div>;
  }

  const service = data.services[activeService];

  const handleFieldChange = (field: string, lang: string, value: string | string[]) => {
    const newData = JSON.parse(JSON.stringify(data));
    const keys = field.split('.');
    let obj: any = newData.services[activeService];

    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    if (typeof obj[lastKey] === 'object' && !Array.isArray(obj[lastKey])) {
      obj[lastKey][lang] = value;
    } else {
      obj[lastKey] = value;
    }

    setData(newData);
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast('Services saved successfully!', 'success');
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      showToast('Error saving services', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Edit Services</h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        {/* Service Tabs */}
        <div className="border-b border-beige mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {data.services.map((s, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeService === index
                    ? 'bg-gold text-charcoal'
                    : 'bg-ivory text-charcoal hover:bg-gold/20'
                }`}
              >
                {s.title.en}
              </button>
            ))}
          </div>
        </div>

        {/* Service Fields */}
        <div className="space-y-8">
          {/* English */}
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4 pb-3 border-b border-beige">English</h3>
            <FormInput
              label="Title"
              name="title_en"
              value={service.title.en}
              onChange={(value) => handleFieldChange('title', 'en', value)}
            />
            <FormInput
              label="Short Description"
              name="shortDescription_en"
              value={service.shortDescription.en}
              onChange={(value) => handleFieldChange('shortDescription', 'en', value)}
              type="textarea"
            />
            <FormInput
              label="Image URL"
              name="image"
              value={service.image}
              onChange={(value) => handleFieldChange('image', 'en', value)}
            />
          </div>

          {/* Hindi */}
          <div>
            <h3 className="text-xl font-bold text-charcoal mb-4 pb-3 border-b border-beige">हिंदी (Hindi)</h3>
            <FormInput
              label="Title (हिंदी)"
              name="title_hi"
              value={service.title.hi}
              onChange={(value) => handleFieldChange('title', 'hi', value)}
            />
            <FormInput
              label="Short Description (हिंदी)"
              name="shortDescription_hi"
              value={service.shortDescription.hi}
              onChange={(value) => handleFieldChange('shortDescription', 'hi', value)}
              type="textarea"
            />
          </div>
        </div>

        <FormButtonGroup
          onSave={handleSave}
          onCancel={() => router.push('/admin')}
          isSaving={isSaving}
        />
      </div>

      {toast && <Toast {...toast} />}
    </div>
  );
}
