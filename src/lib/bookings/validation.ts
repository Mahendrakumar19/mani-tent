import { BookingFormData } from './types';

export interface ValidationError {
  field: string;
  message: string;
}

const PHONE_REGEX = /^[0-9]{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBookingForm(data: BookingFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate customer name
  if (!data.customerName || data.customerName.trim().length === 0) {
    errors.push({
      field: 'customerName',
      message: 'Customer name is required',
    });
  }

  // Validate phone
  if (!data.phone || !PHONE_REGEX.test(data.phone.replace(/\s/g, ''))) {
    errors.push({
      field: 'phone',
      message: 'Phone number must be 10 digits',
    });
  }

  // Validate email if provided
  if (data.email && data.email.trim().length > 0) {
    if (!EMAIL_REGEX.test(data.email)) {
      errors.push({
        field: 'email',
        message: 'Please enter a valid email address',
      });
    }
  }

  // Validate event date
  if (!data.eventDate) {
    errors.push({
      field: 'eventDate',
      message: 'Event date is required',
    });
  } else {
    const selectedDate = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.push({
        field: 'eventDate',
        message: 'Event date must be in the future',
      });
    }
  }

  // Validate event type
  if (!data.eventType || data.eventType.trim().length === 0) {
    errors.push({
      field: 'eventType',
      message: 'Event type is required',
    });
  }

  // Validate guest count if provided
  if (data.guestCount) {
    const count = parseInt(data.guestCount, 10);
    if (isNaN(count) || count < 1) {
      errors.push({
        field: 'guestCount',
        message: 'Please enter a valid guest count',
      });
    }
  }

  return errors;
}
