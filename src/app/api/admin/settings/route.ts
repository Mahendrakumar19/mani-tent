import { NextRequest, NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/lib/admin-utils';

function isAuthenticated(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'true';
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const data = readJSONFile('admin-config.json');
  // Don't return the actual password to the client
  const safeData = { ...data };
  delete (safeData as any).password;
  return NextResponse.json(safeData);
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { newPassword } = await request.json();

    if (!newPassword || newPassword.trim().length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const config = readJSONFile('admin-config.json');
    const updatedConfig = {
      ...config,
      password: newPassword,
    };

    const result = writeJSONFile('admin-config.json', updatedConfig);

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Password updated successfully' });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
