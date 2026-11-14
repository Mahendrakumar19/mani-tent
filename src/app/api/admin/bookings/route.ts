import { NextRequest, NextResponse } from 'next/server';
import { readBookings, getBookingStats } from '@/lib/bookings/utils';

async function checkAdminAuth(request: NextRequest): Promise<boolean> {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'true';
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Check admin authentication
    const isAuthenticated = await checkAdminAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters for filtering/sorting
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'timestamp';
    const order = searchParams.get('order') || 'desc';

    let bookings = readBookings();

    // Filter by status if provided
    if (status) {
      bookings = bookings.filter((b) => b.status === status);
    }

    // Sort bookings
    bookings.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortBy) {
        case 'date':
          aVal = new Date(a.eventDate).getTime();
          bVal = new Date(b.eventDate).getTime();
          break;
        case 'name':
          aVal = a.customerName.toLowerCase();
          bVal = b.customerName.toLowerCase();
          break;
        case 'timestamp':
        default:
          aVal = new Date(a.timestamp).getTime();
          bVal = new Date(b.timestamp).getTime();
      }

      return order === 'asc' ? aVal - bVal : bVal - aVal;
    });

    const stats = getBookingStats();

    return NextResponse.json(
      {
        bookings,
        stats,
        total: bookings.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Error fetching bookings' },
      { status: 500 }
    );
  }
}
