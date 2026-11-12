import { Booking } from './types';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * WhatsApp Integration for Booking Notifications
 *
 * Supports multiple providers:
 * 1. Twilio WhatsApp Sandbox - Professional, requires API key
 * 2. Make.com Webhook - Visual automation, no code
 * 3. Custom Webhook - POST to any URL
 * 4. Webhook.cool/Webhook.site - Free webhook testing
 */

export interface WhatsAppConfig {
  enabled: boolean;
  provider: 'twilio' | 'webhook' | 'make' | 'none';
  adminPhoneNumber: string; // Format: +919098888130
  twilio?: {
    accountSid?: string;
    authToken?: string;
    phoneNumber?: string;
  };
  webhook?: {
    url?: string;
  };
}

/**
 * Load WhatsApp configuration from file or environment
 */
function loadWhatsAppConfig(): WhatsAppConfig {
  try {
    // Try to load from config file
    const configPath = join(process.cwd(), 'public/data/whatsapp-config.json');
    const configContent = readFileSync(configPath, 'utf-8');
    const fileConfig = JSON.parse(configContent);
    return fileConfig;
  } catch (error) {
    // Fallback to environment variables
    return {
      enabled: process.env.WHATSAPP_ENABLED === 'true',
      provider: (process.env.WHATSAPP_PROVIDER as any) || 'webhook',
      adminPhoneNumber: process.env.WHATSAPP_ADMIN_PHONE || '',
      twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER,
      },
      webhook: {
        url: process.env.WHATSAPP_WEBHOOK_URL,
      },
    };
  }
}

export const DEFAULT_WHATSAPP_CONFIG = loadWhatsAppConfig();

/**
 * Format a booking into a WhatsApp message
 */
export function formatBookingMessage(booking: Booking, includeAdminUrl = true): string {
  const eventTypeLabel = booking.eventType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const budgetText = booking.budgetRange ? `💰 Budget: ₹${booking.budgetRange}` : '';
  const guestCountText = booking.guestCount ? `👥 Guest Count: ${booking.guestCount}` : '';
  const additionalText = booking.additionalRequests ? `\n📝 Special Requests: ${booking.additionalRequests}` : '';
  const adminUrl = includeAdminUrl ? '\n\n👉 View & Manage: https://mani-tent-house.vercel.app/admin/bookings' : '';

  return `🎉 NEW BOOKING REQUEST! 🎉

Customer: ${booking.customerName}
Phone: ${booking.phone}
${booking.email ? `Email: ${booking.email}` : ''}

📅 Event Date: ${new Date(booking.eventDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
${guestCountText ? guestCountText + '\n' : ''}🎯 Event Type: ${eventTypeLabel}
${budgetText}${additionalText}
${booking.eventDetails ? `\nDescription: ${booking.eventDetails}` : ''}
${adminUrl}`;
}

/**
 * Send WhatsApp notification via Twilio
 */
async function sendViaTwilio(config: WhatsAppConfig, message: string, bookingId: string): Promise<boolean> {
  try {
    const accountSid = config.twilio?.accountSid;
    const authToken = config.twilio?.authToken;
    const phoneNumber = config.twilio?.phoneNumber;

    if (!accountSid || !authToken || !phoneNumber) {
      console.warn('Twilio credentials not configured');
      return false;
    }

    const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const formData = new URLSearchParams();
    formData.append('From', `whatsapp:${phoneNumber}`);
    formData.append('To', `whatsapp:${config.adminPhoneNumber}`);
    formData.append('Body', message);

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[Twilio] Failed to send WhatsApp: ${error}`);
      return false;
    }

    console.log(`[Twilio] WhatsApp message sent for booking ${bookingId}`);
    return true;
  } catch (error) {
    console.error('[Twilio] Error sending WhatsApp:', error);
    return false;
  }
}

/**
 * Send WhatsApp notification via webhook (Make.com, Webhook.cool, etc.)
 */
async function sendViaWebhook(config: WhatsAppConfig, booking: Booking, message: string, bookingId: string): Promise<boolean> {
  try {
    const webhookUrl = config.webhook?.url;
    if (!webhookUrl) {
      console.warn('Webhook URL not configured');
      return false;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      bookingId,
      customer: {
        name: booking.customerName,
        phone: booking.phone,
        email: booking.email,
      },
      event: {
        date: booking.eventDate,
        type: booking.eventType,
        guestCount: booking.guestCount,
        budget: booking.budgetRange,
        details: booking.eventDetails,
      },
      message: message,
      adminPhone: config.adminPhoneNumber,
      bookingUrl: `https://mani-tent-house.vercel.app/admin/bookings/${bookingId}`,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[Webhook] Failed to send: ${response.status} ${response.statusText}`);
      return false;
    }

    console.log(`[Webhook] Notification sent for booking ${bookingId}`);
    return true;
  } catch (error) {
    console.error('[Webhook] Error sending notification:', error);
    return false;
  }
}

/**
 * Main function to send WhatsApp notification
 * Gracefully handles failures - never blocks booking creation
 */
export async function notifyAdminViaWhatsApp(booking: Booking, config = DEFAULT_WHATSAPP_CONFIG): Promise<{ success: boolean; provider?: string; message?: string }> {
  // Check if WhatsApp is enabled
  if (!config.enabled) {
    console.log('WhatsApp notifications disabled');
    return { success: true, message: 'WhatsApp disabled' };
  }

  // Check if admin phone is configured
  if (!config.adminPhoneNumber) {
    console.warn('Admin WhatsApp phone number not configured');
    return { success: false, message: 'Admin phone not configured' };
  }

  try {
    const message = formatBookingMessage(booking);

    if (config.provider === 'twilio') {
      const success = await sendViaTwilio(config, message, booking.id);
      return { success, provider: 'twilio' };
    } else if (config.provider === 'webhook' || config.provider === 'make') {
      const success = await sendViaWebhook(config, booking, message, booking.id);
      return { success, provider: config.provider };
    }

    return { success: false, message: `No provider configured (${config.provider})` };
  } catch (error) {
    // Never throw - just log and return failure
    // The booking is already saved, this is just a notification
    console.error('WhatsApp notification error (booking saved):', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get current configuration (for admin panel)
 */
export function getWhatsAppConfig(): WhatsAppConfig {
  return DEFAULT_WHATSAPP_CONFIG;
}

/**
 * Check if WhatsApp is properly configured
 */
export function isWhatsAppConfigured(): boolean {
  const config = getWhatsAppConfig();
  if (!config.enabled || !config.adminPhoneNumber) {
    return false;
  }

  switch (config.provider) {
    case 'twilio':
      return !!(config.twilio?.accountSid && config.twilio?.authToken && config.twilio?.phoneNumber);
    case 'webhook':
    case 'make':
      return !!config.webhook?.url;
    case 'none':
      return true;
    default:
      return false;
  }
}
