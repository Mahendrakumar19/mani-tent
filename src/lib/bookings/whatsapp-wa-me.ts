import { Booking } from './types';

/**
 * Generate WhatsApp wa.me link for direct messaging
 * No backend required - uses free WhatsApp web links
 * 
 * wa.me format: https://wa.me/{phoneNumber}?text={message}
 */

export interface WhatsAppLink {
  url: string;
  message: string;
  phoneNumber: string;
}

/**
 * Format booking details into a WhatsApp message
 * Keeps it concise but informative for wa.me links
 */
function formatBookingForWhatsApp(booking: Booking): string {
  const eventTypeLabel = booking.eventType
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
  
  const eventDate = new Date(booking.eventDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  let message = `📋 NEW BOOKING REQUEST\n\n`;
  message += `👤 Name: ${booking.customerName}\n`;
  message += `📞 Phone: ${booking.phone}\n`;
  
  if (booking.email) {
    message += `📧 Email: ${booking.email}\n`;
  }
  
  message += `\n📅 Event Date: ${eventDate}\n`;
  message += `🎯 Event Type: ${eventTypeLabel}\n`;
  
  if (booking.guestCount) {
    message += `👥 Guest Count: ${booking.guestCount}\n`;
  }
  
  if (booking.budgetRange) {
    message += `💰 Budget: ₹${booking.budgetRange}\n`;
  }
  
  if (booking.honeycombGlamping) {
    message += `🎪 Glamping: Yes\n`;
  }
  
  if (booking.eventDetails) {
    message += `\n📝 Details:\n${booking.eventDetails}\n`;
  }
  
  if (booking.additionalRequests) {
    message += `\n⭐ Special Requests:\n${booking.additionalRequests}\n`;
  }
  
  message += `\n---\nBooking ID: ${booking.id}`;

  return message;
}

/**
 * Generate wa.me link to send booking to admin
 * Phone number should be in format: 919098888130 (without +)
 */
export function generateAdminWhatsAppLink(
  booking: Booking,
  adminPhone: string
): WhatsAppLink {
  const message = formatBookingForWhatsApp(booking);
  
  // Clean phone number (remove +, -, spaces)
  const cleanPhone = adminPhone.replace(/[^\d]/g, '');
  
  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // Generate wa.me link
  const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return {
    url,
    message,
    phoneNumber: cleanPhone,
  };
}

/**
 * Generate wa.me link to send confirmation to customer
 * Allows customer to start a conversation about their booking
 */
export function generateCustomerConfirmationLink(
  customerPhone: string,
  customerName: string,
  bookingId: string
): WhatsAppLink {
  // Clean phone number
  const cleanPhone = customerPhone.replace(/[^\d]/g, '');
  
  // Add country code if missing (assume India +91)
  const phoneWithCountry = cleanPhone.startsWith('91') 
    ? cleanPhone 
    : `91${cleanPhone}`;

  const message = `Hi ${customerName}! ✅\n\nYour booking has been submitted successfully!\n\nBooking ID: ${bookingId}\n\nOur team will contact you shortly to confirm details.\n\nThank you for choosing MANI TENT HOUSE! 🎉`;
  
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneWithCountry}?text=${encodedMessage}`;

  return {
    url,
    message,
    phoneNumber: phoneWithCountry,
  };
}

/**
 * Check if WhatsApp is available on current device
 * Returns true if running on mobile or has WhatsApp installed
 */
export function isWhatsAppAvailable(): boolean {
  if (typeof window === 'undefined') return true; // Server-side, assume available
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check if on mobile
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  
  // On mobile, WhatsApp is usually available
  if (isMobile) return true;
  
  // On desktop, WhatsApp Web is available
  return true; // wa.me works on all platforms
}

/**
 * Open WhatsApp with pre-filled message in new window
 * Handles both mobile (WhatsApp app) and web (WhatsApp Web)
 */
export function openWhatsAppChat(waLink: WhatsAppLink, target = '_blank'): void {
  window.open(waLink.url, target);
}

/**
 * Copy WhatsApp message to clipboard
 * Fallback if user can't open WhatsApp directly
 */
export function copyMessageToClipboard(message: string): Promise<boolean> {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = message;
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve(success);
  }

  return navigator.clipboard
    .writeText(message)
    .then(() => true)
    .catch(() => false);
}
