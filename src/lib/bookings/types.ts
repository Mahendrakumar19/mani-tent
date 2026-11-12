export interface Booking {
  id: string;
  timestamp: string;
  locale: 'en' | 'hi';
  customerName: string;
  phone: string;
  email?: string;
  eventDate: string;
  eventType: string;
  guestCount?: number;
  eventDetails?: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  budgetRange?: string;
  additionalRequests?: string;
  honeycombGlamping: boolean;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface BookingFormData {
  customerName: string;
  phone: string;
  email?: string;
  eventDate: string;
  eventType: string;
  guestCount?: string;
  eventDetails?: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  budgetRange?: string;
  additionalRequests?: string;
  honeycombGlamping: boolean;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  error?: string;
}
