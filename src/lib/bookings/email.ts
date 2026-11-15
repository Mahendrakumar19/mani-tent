import { Booking } from './types';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CONFIRMED_SERVICES } from '@/content/data';

export interface EmailConfig {
  enabled: boolean;
  provider: 'smtp' | 'none';
  to: string;
  from: string;
  smtp?: {
    host?: string;
    port?: number;
    secure?: boolean;
    user?: string;
    password?: string;
  };
}

function loadEmailConfig(): EmailConfig {
  try {
    const configPath = join(process.cwd(), 'public/data/email-config.json');
    const configContent = readFileSync(configPath, 'utf-8');
    const fileConfig = JSON.parse(configContent);
    return fileConfig;
  } catch (error) {
    return {
      enabled: false,
      provider: 'none',
      to: '',
      from: '',
    };
  }
}

export const DEFAULT_EMAIL_CONFIG = loadEmailConfig();

function formatBookingEmail(booking: Booking): { subject: string; html: string; text: string } {
  const isHindi = booking.locale === 'hi';

  const typesList = booking.eventTypes && booking.eventTypes.length > 0
    ? booking.eventTypes
    : (booking as any).eventType ? [(booking as any).eventType] : [];

  const serviceLabels = typesList.map((typeId) => {
    const found = CONFIRMED_SERVICES.find(s => s.id === typeId);
    if (found) {
      return found.title[booking.locale];
    }
    return typeId.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  }).join(', ');

  const eventDate = new Date(booking.eventDate).toLocaleDateString(
    isHindi ? 'hi-IN' : 'en-IN',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const address = 'Hemu Nagar, Bandhuapara Talab, Torwa Road, Torwa, Bilaspur, Chhattisgarh - 495004';

  if (isHindi) {
    const subject = `नई बुकिंग अनुरोध - ${booking.customerName}`;
    const text = `नई बुकिंग अनुरोध मिली है!

नाम: ${booking.customerName}
फोन: ${booking.phone}
${booking.email ? `ईमेल: ${booking.email}` : ''}

आयोजन तारीख: ${eventDate}
सेवाएं: ${serviceLabels}
${booking.guestCount ? `अतिथि संख्या: ${booking.guestCount}` : ''}
${booking.budgetRange ? `बजट: ₹${booking.budgetRange}` : ''}
पता: ${address}

${booking.eventDetails ? `विवरण:\n${booking.eventDetails}\n\n` : ''}${booking.additionalRequests ? `विशेष अनुरोध:\n${booking.additionalRequests}\n\n` : ''}बुकिंग ID: ${booking.id}
समय: ${new Date(booking.timestamp).toLocaleString('hi-IN')}`;
    return { subject, html: text.replace(/\n/g, '<br>'), text };
  }

  const subject = `New Booking Request - ${booking.customerName}`;
  const text = `New booking request received!

Name: ${booking.customerName}
Phone: ${booking.phone}
${booking.email ? `Email: ${booking.email}` : ''}

Event Date: ${eventDate}
Services: ${serviceLabels}
${booking.guestCount ? `Guest Count: ${booking.guestCount}` : ''}
${booking.budgetRange ? `Budget: ₹${booking.budgetRange}` : ''}
Address: ${address}

${booking.eventDetails ? `Details:\n${booking.eventDetails}\n\n` : ''}${booking.additionalRequests ? `Special Requests:\n${booking.additionalRequests}\n\n` : ''}Booking ID: ${booking.id}
Received: ${new Date(booking.timestamp).toLocaleString('en-IN')}`;
  return { subject, html: text.replace(/\n/g, '<br>'), text };
}

async function sendViaSmtp(
  config: EmailConfig,
  to: string,
  from: string,
  subject: string,
  html: string,
  text: string
): Promise<boolean> {
  const smtp = config.smtp;
  if (!smtp?.host || !smtp?.user || !smtp?.password) {
    console.warn('[Email] SMTP credentials not configured');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port || 587,
    secure: smtp.secure ?? false,
    auth: {
      user: smtp.user,
      pass: smtp.password,
    },
  });

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    console.log(`[Email] Message sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    return false;
  }
}

export async function notifyAdminViaEmail(
  booking: Booking,
  config = DEFAULT_EMAIL_CONFIG
): Promise<{ success: boolean; message?: string }> {
  if (!config.enabled) {
    return { success: true, message: 'Email disabled' };
  }

  if (!config.to) {
    return { success: false, message: 'No recipient email configured' };
  }

  const { subject, html, text } = formatBookingEmail(booking);

  if (config.provider === 'smtp') {
    const success = await sendViaSmtp(
      config,
      config.to,
      config.from,
      subject,
      html,
      text
    );
    return { success, message: success ? 'Email sent' : 'SMTP failed' };
  }

  return { success: false, message: `No provider configured (${config.provider})` };
}

export function getEmailConfig(): EmailConfig {
  return DEFAULT_EMAIL_CONFIG;
}
