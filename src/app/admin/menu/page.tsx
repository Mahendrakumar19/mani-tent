'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormButtonGroup } from '@/components/admin/FormInput';
import Toast, { useToast } from '@/components/admin/Toast';

interface MenuItem {
  name: string;
  items: string[];
}

interface MenuData {
  categories: MenuItem[];
}

export default function MenuPage() {
  const router = useRouter();
  const { toast, showToast, setToast } = useToast();
  const [data, setData] = useState<MenuData | null>(null);
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

        const dataRes = await fetch('/api/admin/menu');
        if (!dataRes.ok) throw new Error('Failed to load data');

        const menuData = await dataRes.json();
        setData(menuData);
      } catch (err) {
        showToast('Error loading data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoad();
  }, [router, showToast]);

  const handleItemChange = (categoryIndex: number, itemIndex: number, value: string) => {
    if (data) {
      const newData = JSON.parse(JSON.stringify(data));
      newData.categories[categoryIndex].items[itemIndex] = value;
      setData(newData);
    }
  };

  const handleAddItem = (categoryIndex: number) => {
    if (data) {
      const newData = JSON.parse(JSON.stringify(data));
      newData.categories[categoryIndex].items.push('New item');
      setData(newData);
    }
  };

  const handleRemoveItem = (categoryIndex: number, itemIndex: number) => {
    if (data) {
      const newData = JSON.parse(JSON.stringify(data));
      newData.categories[categoryIndex].items.splice(itemIndex, 1);
      setData(newData);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast('Menu saved successfully!', 'success');
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      showToast('Error saving menu', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!data) {
    return <div className="p-8">Error loading data</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-charcoal mb-8">Edit Catering Menu</h1>

      <div className="space-y-8">
        {data.categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6">{category.name}</h2>

            <div className="space-y-3 mb-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(categoryIndex, itemIndex, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-ivory border border-beige/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(categoryIndex, itemIndex)}
                    className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-600 rounded-lg font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAddItem(categoryIndex)}
              className="px-4 py-2 bg-gold/20 hover:bg-gold/30 text-charcoal rounded-lg font-medium transition-colors"
            >
              + Add Item
            </button>
          </div>
        ))}
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
