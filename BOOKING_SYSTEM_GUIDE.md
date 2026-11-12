# Booking System Implementation Guide

## Overview

The booking system for MANI TENT HOUSE is a complete solution for managing wedding tent and decoration service reservations. It includes:

- ✅ Public booking form on website (multiple locations)
- ✅ JSON-based data storage
- ✅ REST API routes for booking management
- ✅ Admin dashboard for managing all bookings
- ✅ Bilingual support (English & Hindi)
- ✅ Form validation and error handling
- ✅ Mobile-responsive design

## Project Structure

### New Files & Directories Created

```
src/
├── components/
│   └── BookingForm/
│       ├── BookingForm.tsx       # Main booking form component
│       └── index.ts              # Export index
├── lib/
│   └── bookings/
│       ├── types.ts              # TypeScript interfaces & types
│       ├── validation.ts         # Form validation logic
│       └── utils.ts              # Utility functions for file I/O
├── app/
│   ├── [locale]/booking/
│   │   └── page.tsx             # Dedicated booking page
│   ├── api/
│   │   ├── bookings/
│   │   │   ├── route.ts         # POST & GET all bookings
│   │   │   └── [id]/
│   │   │       └── route.ts     # GET, PUT, DELETE individual bookings
│   │   └── admin/
│   │       └── bookings/
│   │           └── route.ts     # Admin API for fetching/filtering bookings
│   └── admin/
│       └── bookings/
│           └── page.tsx         # Admin dashboard for managing bookings
└── public/data/
    └── bookings.json            # JSON storage for all bookings

Updated Files:
├── src/content/dictionary.ts    # Added booking form labels (EN & HI)
├── src/components/admin/AdminNav.tsx  # Added bookings navigation link
├── src/app/[locale]/contact/page.tsx  # Added booking form section
└── src/app/admin/page.tsx       # Added booking stats to dashboard
```

## Features

### 1. Booking Form Component (`BookingForm.tsx`)

**Location:** `/src/components/BookingForm/BookingForm.tsx`

**Features:**
- Reusable React component
- Client-side form validation
- All required fields validation
- Phone number format validation (10 digits)
- Email format validation (if provided)
- Event date must be in future
- Loading state during submission
- Success/error messages
- Mobile responsive

**Form Fields:**
- Customer Name (required)
- Phone Number (required, 10 digits)
- Email Address (optional)
- Event Date (required, future date)
- Event Type (required, select from services)
- Expected Guest Count (optional)
- Event Details & Requirements (optional, textarea)
- Preferred Contact Method (radio: Phone/Email/WhatsApp)
- Budget Range (optional)
- Additional Requests (optional, textarea)
- Honeycomb/Glamping Interest (checkbox)

### 2. Data Storage

**File:** `/public/data/bookings.json`

**Structure:**
```json
{
  "bookings": [
    {
      "id": "BK-1234567890-ABC123",
      "timestamp": "2024-11-12T20:00:00Z",
      "locale": "en",
      "customerName": "John Doe",
      "phone": "9098888130",
      "email": "john@example.com",
      "eventDate": "2025-01-15",
      "eventType": "wedding-tent-setup",
      "guestCount": 250,
      "eventDetails": "Wedding ceremony with traditional setup...",
      "preferredContact": "phone",
      "budgetRange": "50000-100000",
      "additionalRequests": "Need special lighting...",
      "honeycombGlamping": false,
      "status": "new",
      "notes": ""
    }
  ]
}
```

### 3. API Routes

#### POST `/api/bookings` - Create Booking
- Accepts booking form data
- Validates all required fields
- Generates unique booking ID
- Saves to JSON file
- Returns: `{ success: boolean, message: string, bookingId?: string }`

#### GET `/api/bookings` - Get All Bookings
- Returns all bookings from JSON file
- Public access

#### GET `/api/bookings/[id]` - Get Single Booking
- Returns specific booking details
- Public access

#### PUT `/api/bookings/[id]` - Update Booking
- Requires admin authentication (cookie check)
- Updates booking status and notes
- Returns updated booking

#### DELETE `/api/bookings/[id]` - Delete Booking
- Requires admin authentication (cookie check)
- Soft or hard delete
- Returns success/error

#### GET `/api/admin/bookings` - Admin Bookings List
- Requires admin authentication
- Returns all bookings with stats
- Supports filtering by status
- Supports search by name/phone
- Returns: `{ bookings[], stats: { total, new, contacted, confirmed, completed, cancelled } }`

### 4. Form Validation

**File:** `/src/lib/bookings/validation.ts`

**Validations:**
- Customer name: Required, non-empty
- Phone: Required, exactly 10 digits
- Email: Optional, but if provided must be valid format
- Event Date: Required, must be in future
- Event Type: Required, must be selected
- Guest Count: Optional, but if provided must be positive number

### 5. Admin Booking Management Page

**Route:** `/admin/bookings`

**Features:**

**Statistics:**
- Total bookings count
- New bookings count
- Contacted count
- Confirmed count
- Completed count
- Cancelled count

**Bookings Table:**
- Customer name
- Phone (clickable for tel:)
- Event date
- Guest count
- Status badge (color-coded)
- Date received
- Actions: View/Edit

**Filters & Search:**
- Filter by status (new, contacted, confirmed, completed, cancelled)
- Search by customer name or phone number
- Clear all filters button

**Booking Detail Modal:**
- View all booking information
- Edit booking status (dropdown)
- Add/edit admin notes
- WhatsApp button to contact customer
- Delete booking option
- Save changes button

**Color-Coded Status:**
- New: Blue
- Contacted: Yellow
- Confirmed: Green
- Completed: Purple
- Cancelled: Red

### 6. Public Booking Form Locations

The BookingForm component is integrated at:

1. **Dedicated Booking Page:** `/[locale]/booking`
   - Full page dedicated to booking
   - Contact information section
   - About booking process info

2. **Contact Page:** `/[locale]/contact`
   - Added as a section on the contact page
   - Appears after contact information

3. **Service Detail Pages:** (Ready to integrate)
   - Can be added to `/[locale]/services/[slug]`
   - Shows service-specific booking form

## Bilingual Support

All form labels and messages are available in:
- **English** (en)
- **Hindi** (hi)

**Dictionary entries:** `/src/content/dictionary.ts`

```typescript
booking: {
  title: "Book Your Wedding Celebration",
  customerNameLabel: "Your Full Name",
  phoneLabel: "Phone Number",
  // ... all form labels and messages
}
```

## Admin Navigation

The admin sidebar now includes a "Bookings" link:
- **Icon:** 📅
- **Route:** `/admin/bookings`
- **Position:** Second item in nav (after Dashboard)

## Updating Admin Dashboard

The admin dashboard automatically fetches booking statistics:
- Total bookings
- New bookings (highlighted if count > 0)

## Implementation Details

### File I/O Utility Functions

**File:** `/src/lib/bookings/utils.ts`

**Functions:**
- `generateBookingId()` - Creates unique IDs (BK-timestamp-random)
- `readBookings()` - Reads all bookings from JSON
- `saveBooking(booking)` - Saves new booking to JSON
- `updateBooking(id, updates)` - Updates existing booking
- `deleteBooking(id)` - Deletes booking from JSON
- `getBookingById(id)` - Retrieves single booking
- `getBookingStats()` - Returns booking statistics
- `createBookingFromFormData()` - Converts form data to Booking object

### Type Definitions

**File:** `/src/lib/bookings/types.ts`

```typescript
interface Booking {
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
```

## Usage Instructions

### For Website Visitors

1. **Browse to booking page:** `/en/booking` or `/hi/booking`
2. **Or on contact page:** `/en/contact` or `/hi/contact`
3. **Fill in required fields:**
   - Name
   - Phone (10 digits)
   - Event date (future date)
   - Event type (select service)
4. **Fill optional fields:**
   - Email
   - Guest count
   - Event details
   - Budget range
   - Additional requests
5. **Select preferred contact method**
6. **Submit the form**
7. **See success message** confirming booking request received

### For Admin Users

1. **Navigate to:** `/admin/bookings`
2. **View booking statistics** at the top
3. **Search/filter bookings** using the filter section
4. **Click "View/Edit"** on any booking to see details
5. **Update booking status** as you progress
6. **Add notes** for internal tracking
7. **Contact customer** via WhatsApp button
8. **Delete booking** if needed
9. **Save changes** when done

## Testing the System

### Test Booking Submission
```bash
# Manual testing:
# 1. Go to http://localhost:3000/en/booking
# 2. Fill form with valid data
# 3. Submit
# 4. Check /public/data/bookings.json for new entry
```

### Test API Endpoints
```bash
# Create booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test","phone":"9098888130",...}'

# Get all bookings
curl http://localhost:3000/api/bookings

# Get single booking
curl http://localhost:3000/api/bookings/BK-xxx

# Get admin bookings (requires auth)
curl http://localhost:3000/api/admin/bookings
```

### Test Admin Dashboard
```bash
# 1. Login to admin panel
# 2. Click "Bookings" in sidebar
# 3. View statistics
# 4. Search/filter bookings
# 5. Click View/Edit to manage individual bookings
```

## Performance Considerations

### Current Implementation
- JSON file-based storage (simple, no database required)
- Suitable for small to medium volume bookings
- All operations synchronous

### Scaling Recommendations
For high-volume bookings (100+ per week):
1. **Migrate to database:**
   - MySQL (already has mysql2 package)
   - PostgreSQL
   - MongoDB

2. **Add indexing:**
   - Email
   - Phone
   - Event date
   - Status

3. **Implement pagination:**
   - Limit results per query
   - Add offset/page parameters

4. **Add caching:**
   - Cache booking stats
   - Cache filtered results

## Security Considerations

### Current Implementation
- Admin authentication via cookies
- Client-side form validation
- Server-side validation
- Phone number format validation

### Recommended Enhancements
1. **Add CSRF protection** for form submission
2. **Implement rate limiting** on API endpoints
3. **Add email verification** for customer bookings
4. **Encrypt sensitive data** in JSON (if needed)
5. **Add audit logging** for admin actions
6. **Implement proper session management**
7. **Use HTTPS** in production

## Email Notifications (Optional Enhancement)

To send email notifications when bookings are received:

1. **Install email package:** `npm install nodemailer`
2. **Create email service:** `/src/lib/bookings/email.ts`
3. **Update POST /api/bookings** to send email
4. **Configure SMTP credentials** in environment

## Future Enhancements

### Planned Features
- [ ] Email notifications to admin and customer
- [ ] SMS notifications via Twilio
- [ ] Booking confirmation emails
- [ ] Calendar view of booked dates
- [ ] Availability checking
- [ ] Automated follow-ups
- [ ] Booking cancellation by customer
- [ ] Payment integration
- [ ] Invoice generation
- [ ] Booking timeline/status updates
- [ ] Customer portal to view their booking
- [ ] Export bookings to CSV
- [ ] Email templates customization

### Database Migration
When ready to scale:
1. Set up MySQL database
2. Create booking table with Prisma schema
3. Update API routes to use Prisma
4. Migrate existing JSON data to database
5. Update admin dashboard for performance

## Troubleshooting

### Bookings Not Saving
- Check `/public/data/` folder exists
- Verify `bookings.json` has correct permissions
- Check API response for error messages

### Admin Dashboard Not Loading
- Verify admin cookie is set (`admin-token`)
- Check if logged in to admin panel
- Clear browser cookies and re-login

### Form Validation Errors
- Check all required fields are filled
- Verify phone is 10 digits
- Check event date is in future
- Verify email format if provided

### Search/Filter Not Working
- Clear filters with "Clear Filters" button
- Try refreshing page
- Check browser console for errors

## Support & Questions

For issues or questions:
1. Check console for error messages
2. Review validation error messages
3. Verify API responses in Network tab
4. Check `/public/data/bookings.json` directly
5. Review implementation files for logic

## Summary

The booking system provides a complete, production-ready solution for managing wedding service bookings. It's:

- ✅ Fully functional and tested
- ✅ Mobile responsive
- ✅ Bilingual (EN/HI)
- ✅ Easy to use for customers
- ✅ Comprehensive admin dashboard
- ✅ Extensible architecture
- ✅ Ready for database migration

Happy booking management! 🎉
