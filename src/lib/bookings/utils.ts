import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Booking, BookingFormData } from './types';

const BOOKINGS_FILE = join(process.cwd(), 'public/data/bookings.json');

export function generateBookingId(): string {
  return `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export function readBookings(): Booking[] {
  try {
    const content = readFileSync(BOOKINGS_FILE, 'utf-8');
    const data = JSON.parse(content);
    return data.bookings || [];
  } catch (error) {
    return [];
  }
}

export function saveBooking(booking: Booking): Booking {
  const bookings = readBookings();
  bookings.push(booking);

  writeFileSync(
    BOOKINGS_FILE,
    JSON.stringify({ bookings }, null, 2),
    'utf-8'
  );

  return booking;
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | null {
  const bookings = readBookings();
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) return null;

  bookings[index] = { ...bookings[index], ...updates };

  writeFileSync(
    BOOKINGS_FILE,
    JSON.stringify({ bookings }, null, 2),
    'utf-8'
  );

  return bookings[index];
}

export function deleteBooking(id: string): boolean {
  const bookings = readBookings();
  const filteredBookings = bookings.filter((b) => b.id !== id);

  if (filteredBookings.length === bookings.length) return false;

  writeFileSync(
    BOOKINGS_FILE,
    JSON.stringify({ bookings: filteredBookings }, null, 2),
    'utf-8'
  );

  return true;
}

export function getBookingById(id: string): Booking | null {
  const bookings = readBookings();
  return bookings.find((b) => b.id === id) || null;
}

export function getBookingStats() {
  const bookings = readBookings();

  return {
    total: bookings.length,
    new: bookings.filter((b) => b.status === 'new').length,
    contacted: bookings.filter((b) => b.status === 'contacted').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };
}

export function createBookingFromFormData(
  formData: BookingFormData,
  locale: 'en' | 'hi'
): Booking {
  const now = new Date();

  return {
    id: generateBookingId(),
    timestamp: now.toISOString(),
    locale,
    customerName: formData.customerName.trim(),
    phone: formData.phone.replace(/\s/g, ''),
    email: formData.email?.trim(),
    eventDate: formData.eventDate,
    eventType: formData.eventType,
    guestCount: formData.guestCount ? parseInt(formData.guestCount, 10) : undefined,
    eventDetails: formData.eventDetails?.trim(),
    preferredContact: formData.preferredContact,
    budgetRange: formData.budgetRange?.trim(),
    additionalRequests: formData.additionalRequests?.trim(),
    honeycombGlamping: formData.honeycombGlamping,
    status: 'new',
    notes: '',
  };
}
