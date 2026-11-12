import { NextRequest, NextResponse } from 'next/server';
import { BookingFormData, BookingResponse } from '@/lib/bookings/types';
import { validateBookingForm } from '@/lib/bookings/validation';
import { saveBooking, createBookingFromFormData, readBookings } from '@/lib/bookings/utils';
import { notifyAdminViaWhatsApp } from '@/lib/bookings/whatsapp-notify';

export async function POST(request: NextRequest): Promise<NextResponse<BookingResponse>> {
  try {
    const body = await request.json();
    const { locale, ...formData } = body as BookingFormData & { locale: string };

    // Validate form data
    const validationErrors = validateBookingForm(formData);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          error: validationErrors.map((e) => e.message).join(', '),
        },
        { status: 400 }
      );
    }

    // Create booking from form data
    const booking = createBookingFromFormData(
      formData,
      locale as 'en' | 'hi'
    );

    // Save booking
    saveBooking(booking);

    // Send WhatsApp notification (async, non-blocking)
    // This runs in the background and doesn't affect the response
    notifyAdminViaWhatsApp(booking).catch((error) => {
      console.error('Failed to send WhatsApp notification:', error);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        bookingId: booking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error creating booking',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const bookings = readBookings();
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Error reading bookings:', error);
    return NextResponse.json(
      { error: 'Error reading bookings' },
      { status: 500 }
    );
  }
}
