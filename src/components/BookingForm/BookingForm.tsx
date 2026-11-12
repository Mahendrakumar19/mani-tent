'use client';

import { useState, FormEvent } from 'react';
import { BookingFormData, BookingResponse } from '@/lib/bookings/types';
import { validateBookingForm, ValidationError } from '@/lib/bookings/validation';
import { CONFIRMED_SERVICES } from '@/content/data';
import { generateAdminWhatsAppLink, openWhatsAppChat } from '@/lib/bookings/whatsapp-wa-me';
import { Booking } from '@/lib/bookings/types';

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
  const [successBooking, setSuccessBooking] = useState<any>(null);

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
        // Store booking info for WhatsApp button
        setSuccessBooking({
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          eventDate: formData.eventDate,
          eventType: formData.eventType,
          guestCount: formData.guestCount ? parseInt(formData.guestCount, 10) : undefined,
          eventDetails: formData.eventDetails,
          budgetRange: formData.budgetRange,
          additionalRequests: formData.additionalRequests,
          honeycombGlamping: formData.honeycombGlamping,
          preferredContact: formData.preferredContact,
          id: data.bookingId,
        });

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
            className={`mb-4 ${
              submitMessage.type === 'success'
                ? 'text-green-700'
                : 'text-red-700'
            }`}
          >
            {submitMessage.message}
          </p>
          
          {/* WhatsApp Notification Button */}
          {submitMessage.type === 'success' && successBooking && (
            <div className="mt-6 space-y-3">
              <p className="text-sm text-green-700 font-medium">
                ✨ {locale === 'hi' ? 'आपके बुकिंग विवरण को WhatsApp पर भेजें' : 'Send booking details to admin via WhatsApp'}
              </p>
              <button
                type="button"
                onClick={() => {
                  const waLink = generateAdminWhatsAppLink(
                    successBooking,
                    '919098888130' // Admin phone
                  );
                  openWhatsAppChat(waLink);
                }}
                className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.223-5.047 5.455-5.047 8.905 0 2.763.75 5.431 2.161 7.75l-2.335 8.5c-.42 1.532.372 3.288 1.901 3.708.479.129.98.129 1.461.001l8.497-2.324c2.318 1.409 5.018 2.164 7.782 2.164 8.714 0 15.888-7.065 15.888-15.777 0-2.761-.75-5.428-2.161-7.75l2.335-8.497c.42-1.532-.372-3.288-1.901-3.708-.479-.129-.98-.129-1.461-.001l-8.497 2.324C12.394.751 9.694 0 6.933 0 1.266 0 -5.864 7.065 -5.864 15.777c0 2.761.75 5.428 2.161 7.75l-2.335 8.497c-.42 1.532.372 3.288 1.901 3.708.479.129.98.129 1.461.001l8.497-2.324c2.318 1.409 5.018 2.164 7.782 2.164 8.714 0 15.888-7.065 15.888-15.777 0-2.761-.75-5.428-2.161-7.75l2.335-8.497c.42-1.532-.372-3.288-1.901-3.708-.479-.129-.98-.129-1.461-.001z"/>
                </svg>
                {locale === 'hi' ? 'WhatsApp पर भेजें' : 'Send via WhatsApp'}
              </button>
              <p className="text-xs text-green-600">
                {locale === 'hi'
                  ? 'बटन क्लिक करें और WhatsApp खुलेगा आपके बुकिंग विवरण के साथ'
                  : 'Click to open WhatsApp with your booking details'}
              </p>
            </div>
          )}
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
