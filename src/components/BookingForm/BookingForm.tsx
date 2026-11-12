'use client';

import { useState, FormEvent } from 'react';
import { BookingFormData, BookingResponse } from '@/lib/bookings/types';
import { validateBookingForm, ValidationError } from '@/lib/bookings/validation';
import { CONFIRMED_SERVICES } from '@/content/data';

interface BookingFormProps {
  locale: 'en' | 'hi';
  t: any;
  onSuccess?: () => void;
}

export default function BookingForm({ locale, t, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    eventDetails: '',
    preferredContact: 'phone',
    budgetRange: '',
    additionalRequests: '',
    honeycombGlamping: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  const labels = t.booking;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage(null);

    // Validate form
    const validationErrors = validateBookingForm(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      });

      const data: BookingResponse = await response.json();

      if (data.success) {
        setSubmitMessage({
          type: 'success',
          title: labels.successTitle,
          message: labels.successMessage,
        });

        // Reset form
        setFormData({
          customerName: '',
          phone: '',
          email: '',
          eventDate: '',
          eventType: '',
          guestCount: '',
          eventDetails: '',
          preferredContact: 'phone',
          budgetRange: '',
          additionalRequests: '',
          honeycombGlamping: false,
        });

        if (onSuccess) {
          onSuccess();
        }
      } else {
        setSubmitMessage({
          type: 'error',
          title: labels.errorTitle,
          message: data.error || labels.errorMessage,
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        title: labels.errorTitle,
        message: labels.errorMessage,
      });
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = CONFIRMED_SERVICES.map((service) => ({
    value: service.id,
    label: service.title[locale],
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Success/Error Message */}
      {submitMessage && (
        <div
          className={`p-6 rounded-lg border ${
            submitMessage.type === 'success'
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <h3
            className={`font-semibold mb-2 ${
              submitMessage.type === 'success'
                ? 'text-green-800'
                : 'text-red-800'
            }`}
          >
            {submitMessage.title}
          </h3>
          <p
            className={
              submitMessage.type === 'success'
                ? 'text-green-700'
                : 'text-red-700'
            }
          >
            {submitMessage.message}
          </p>
        </div>
      )}

      {/* Customer Name */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.customerNameLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          placeholder={labels.customerNamePlaceholder}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
            errors.customerName ? 'border-red-500' : 'border-beige'
          }`}
        />
        {errors.customerName && (
          <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.phoneLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={labels.phonePlaceholder}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
            errors.phone ? 'border-red-500' : 'border-beige'
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.emailLabel}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={labels.emailPlaceholder}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
            errors.email ? 'border-red-500' : 'border-beige'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Event Date */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.eventDateLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
            errors.eventDate ? 'border-red-500' : 'border-beige'
          }`}
        />
        {errors.eventDate && (
          <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
        )}
      </div>

      {/* Event Type */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.eventTypeLabel} <span className="text-red-500">*</span>
        </label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
            errors.eventType ? 'border-red-500' : 'border-beige'
          }`}
        >
          <option value="">{labels.eventTypePlaceholder}</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.eventType && (
          <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
        )}
      </div>

      {/* Guest Count */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.guestCountLabel}
        </label>
        <input
          type="number"
          name="guestCount"
          value={formData.guestCount}
          onChange={handleChange}
          placeholder={labels.guestCountPlaceholder}
          min="1"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
            errors.guestCount ? 'border-red-500' : 'border-beige'
          }`}
        />
        {errors.guestCount && (
          <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>
        )}
      </div>

      {/* Event Details */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.eventDetailsLabel}
        </label>
        <textarea
          name="eventDetails"
          value={formData.eventDetails}
          onChange={handleChange}
          placeholder={labels.eventDetailsPlaceholder}
          rows={4}
          className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-3">
          {labels.preferredContactLabel}
        </label>
        <div className="space-y-2">
          {['phone', 'email', 'whatsapp'].map((method) => (
            <label key={method} className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value={method}
                checked={formData.preferredContact === method}
                onChange={handleChange}
                className="w-4 h-4 accent-gold cursor-pointer"
              />
              <span className="ml-3 text-charcoal">
                {labels[`${method}Option` as keyof typeof labels]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.budgetRangeLabel}
        </label>
        <input
          type="text"
          name="budgetRange"
          value={formData.budgetRange}
          onChange={handleChange}
          placeholder={labels.budgetRangePlaceholder}
          className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      {/* Additional Requests */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {labels.additionalRequestsLabel}
        </label>
        <textarea
          name="additionalRequests"
          value={formData.additionalRequests}
          onChange={handleChange}
          placeholder={labels.additionalRequestsPlaceholder}
          rows={3}
          className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      {/* Honeycomb/Glamping */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="honeycombGlamping"
            checked={formData.honeycombGlamping}
            onChange={handleChange}
            className="w-4 h-4 accent-gold cursor-pointer"
          />
          <span className="ml-3 text-charcoal font-medium">
            {labels.honeycombGlampingLabel}
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-gold text-charcoal font-semibold rounded-lg hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? labels.submitting : labels.submitBtn}
        </button>
      </div>
    </form>
  );
}
