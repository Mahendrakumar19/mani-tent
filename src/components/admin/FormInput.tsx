'use client';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'textarea' | 'number' | 'password';
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
  rows = 4,
}: FormInputProps) {
  if (type === 'textarea') {
    return (
      <div className="mb-6">
        <label htmlFor={name} className="block text-sm font-bold text-charcoal mb-2">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 rounded-lg bg-white border border-beige/50 text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
        />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-bold text-charcoal mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-white border border-beige/50 text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
      />
    </div>
  );
}

interface FormButtonGroupProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export function FormButtonGroup({ onSave, onCancel, isSaving = false }: FormButtonGroupProps) {
  return (
    <div className="flex gap-4 pt-6">
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="flex-1 px-6 py-3 bg-gold hover:bg-gold/90 disabled:bg-gold/50 text-charcoal font-bold rounded-lg transition-colors disabled:cursor-not-allowed"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-6 py-3 bg-charcoal/10 hover:bg-charcoal/20 text-charcoal font-bold rounded-lg transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
