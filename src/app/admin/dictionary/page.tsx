'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormButtonGroup } from '@/components/admin/FormInput';
import Toast, { useToast } from '@/components/admin/Toast';

interface DictionaryData {
  en: Record<string, any>;
  hi: Record<string, any>;
}

export default function DictionaryPage() {
  const router = useRouter();
  const { toast, showToast, setToast } = useToast();
  const [data, setData] = useState<DictionaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const authRes = await fetch('/api/admin/auth');
        if (!authRes.ok) {
          router.push('/admin/login');
          return;
        }

        const dataRes = await fetch('/api/admin/dictionary');
        if (!dataRes.ok) throw new Error('Failed to load data');

        const dictionaryData = await dataRes.json();
        setData(dictionaryData);
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

  const currentLangData = data[language];

  const handleFieldChange = (path: string, value: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    const keys = path.split('.');
    let obj = newData[language];

    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }

    obj[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/dictionary', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast('Content saved successfully!', 'success');
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      showToast('Error saving content', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Edit Website Content</h1>

      {/* Language Tabs */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setLanguage('en')}
          className={`px-6 py-3 rounded-lg font-bold transition-colors ${
            language === 'en'
              ? 'bg-gold text-charcoal'
              : 'bg-ivory text-charcoal hover:bg-gold/20'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('hi')}
          className={`px-6 py-3 rounded-lg font-bold transition-colors ${
            language === 'hi'
              ? 'bg-gold text-charcoal'
              : 'bg-ivory text-charcoal hover:bg-gold/20'
          }`}
        >
          हिंदी
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
        {Object.entries(currentLangData).map(([section, sectionData]) => {
          if (typeof sectionData !== 'object' || sectionData === null) {
            return (
              <FormInput
                key={section}
                label={section}
                name={section}
                value={String(sectionData)}
                onChange={(value) => handleFieldChange(section, value)}
                type={String(sectionData).length > 50 ? 'textarea' : 'text'}
              />
            );
          }

          return (
            <div key={section} className="border border-beige/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section)}
                className="w-full px-6 py-4 bg-gold/10 hover:bg-gold/20 text-charcoal font-bold text-left transition-colors flex justify-between items-center"
              >
                {section}
                <span className={`transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedSections[section] && (
                <div className="p-6 space-y-4">
                  {typeof sectionData === 'object' && Array.isArray(sectionData) ? (
                    <div className="space-y-4">
                      {sectionData.map((item, index) => (
                        <div key={index} className="p-4 bg-ivory rounded-lg">
                          {Object.entries(item).map(([key, value]) => (
                            <FormInput
                              key={key}
                              label={key}
                              name={`${section}.${index}.${key}`}
                              value={String(value)}
                              onChange={(newValue) =>
                                handleFieldChange(`${section}.${index}.${key}`, newValue)
                              }
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    Object.entries(sectionData).map(([key, value]) => (
                      <FormInput
                        key={key}
                        label={key}
                        name={`${section}.${key}`}
                        value={String(value)}
                        onChange={(newValue) => handleFieldChange(`${section}.${key}`, newValue)}
                        type={String(value).length > 50 ? 'textarea' : 'text'}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
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
