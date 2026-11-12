import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/lib/admin-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, logout } = body;

    // Handle logout
    if (logout) {
      const response = NextResponse.json({ success: true });
      response.cookies.delete('admin-auth');
      return response;
    }

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password required' },
        { status: 400 }
      );
    }

    if (verifyAdminPassword(password)) {
      const response = NextResponse.json(
        { success: true, message: 'Authentication successful' },
        { status: 200 }
      );

      response.cookies.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  
  if (authCookie?.value === 'true') {
    return NextResponse.json({ authenticated: true });
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
