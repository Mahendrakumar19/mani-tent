import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const WHATSAPP_CONFIG_FILE = join(process.cwd(), 'public/data/whatsapp-config.json');

interface WhatsAppConfigData {
  enabled: boolean;
  provider: 'twilio' | 'webhook' | 'make' | 'none';
  adminPhoneNumber: string;
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
 * GET /api/admin/whatsapp/config
 * Retrieve current WhatsApp configuration (admin only, no sensitive data)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Check admin authentication
    const adminToken = request.cookies.get('admin-token');
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const config = readWhatsAppConfig();

    // Return config without sensitive data
    return NextResponse.json({
      enabled: config.enabled,
      provider: config.provider,
      adminPhoneNumber: config.adminPhoneNumber,
      isConfigured: isWhatsAppConfigured(config),
      twilioConfigured: !!config.twilio?.accountSid,
      webhookConfigured: !!config.webhook?.url,
    });
  } catch (error) {
    console.error('Error reading WhatsApp config:', error);
    return NextResponse.json(
      { error: 'Error reading configuration' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/whatsapp/config
 * Update WhatsApp configuration (admin only)
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    // Check admin authentication
    const adminToken = request.cookies.get('admin-token');
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const { enabled, provider, adminPhoneNumber, twilio, webhook } = body;

    if (typeof enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid enabled value' },
        { status: 400 }
      );
    }

    if (!['twilio', 'webhook', 'make', 'none'].includes(provider)) {
      return NextResponse.json(
        { error: 'Invalid provider' },
        { status: 400 }
      );
    }

    if (enabled && !adminPhoneNumber) {
      return NextResponse.json(
        { error: 'Admin phone number is required when enabled' },
        { status: 400 }
      );
    }

    // Read current config to preserve structure
    const currentConfig = readWhatsAppConfig();

    // Update config
    const updatedConfig: WhatsAppConfigData = {
      enabled,
      provider,
      adminPhoneNumber: adminPhoneNumber || '',
      twilio: {
        ...currentConfig.twilio,
        ...(twilio && {
          accountSid: twilio.accountSid || currentConfig.twilio?.accountSid,
          authToken: twilio.authToken || currentConfig.twilio?.authToken,
          phoneNumber: twilio.phoneNumber || currentConfig.twilio?.phoneNumber,
        }),
      },
      webhook: {
        ...currentConfig.webhook,
        ...(webhook && {
          url: webhook.url || currentConfig.webhook?.url,
        }),
      },
    };

    // Save updated config
    writeFileSync(
      WHATSAPP_CONFIG_FILE,
      JSON.stringify(updatedConfig, null, 2),
      'utf-8'
    );

    return NextResponse.json({
      message: 'Configuration updated successfully',
      enabled: updatedConfig.enabled,
      provider: updatedConfig.provider,
      adminPhoneNumber: updatedConfig.adminPhoneNumber,
    });
  } catch (error) {
    console.error('Error updating WhatsApp config:', error);
    return NextResponse.json(
      {
        error: 'Error updating configuration',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Helper function to read WhatsApp config
 */
function readWhatsAppConfig(): WhatsAppConfigData {
  try {
    const content = readFileSync(WHATSAPP_CONFIG_FILE, 'utf-8');
    const config = JSON.parse(content);
    return config;
  } catch (error) {
    // Return default config if file doesn't exist
    return {
      enabled: false,
      provider: 'webhook',
      adminPhoneNumber: '',
    };
  }
}

/**
 * Helper function to check if WhatsApp is properly configured
 */
function isWhatsAppConfigured(config: WhatsAppConfigData): boolean {
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
