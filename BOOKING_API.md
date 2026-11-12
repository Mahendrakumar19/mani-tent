# Booking System API Documentation

## Overview

The booking system provides REST API endpoints for creating, reading, updating, and deleting bookings. All endpoints support JSON request/response format.

## Base URL

```
http://localhost:3000/api
```

---

## Public Endpoints

### 1. Create Booking

**Endpoint:** `POST /bookings`

**Description:** Create a new booking request

**Request Body:**
```json
{
  "locale": "en",
  "customerName": "John Doe",
  "phone": "9098888130",
  "email": "john@example.com",
  "eventDate": "2025-01-15",
  "eventType": "wedding-tent-setup",
  "guestCount": "250",
  "eventDetails": "Wedding ceremony with traditional setup",
  "preferredContact": "phone",
  "budgetRange": "50000-100000",
  "additionalRequests": "Need special lighting",
  "honeycombGlamping": false
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "bookingId": "BK-1234567890-ABC123"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "Phone number must be 10 digits, Event date must be in the future"
}
```

**Validation Rules:**
- `customerName`: Required, non-empty string
- `phone`: Required, must be 10 digits
- `email`: Optional, but if provided must be valid email format
- `eventDate`: Required, must be a future date
- `eventType`: Required, non-empty string
- `guestCount`: Optional, must be positive integer if provided
- `locale`: Required, either "en" or "hi"
- `preferredContact`: Required, one of: "phone", "email", "whatsapp"
- `honeycombGlamping`: Boolean (default: false)

**Status Codes:**
- `201`: Booking created successfully
- `400`: Validation error
- `500`: Server error

---

### 2. Get All Bookings

**Endpoint:** `GET /bookings`

**Description:** Retrieve all bookings (public access)

**Query Parameters:**
None

**Response (200):**
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
      "eventDetails": "Wedding ceremony...",
      "preferredContact": "phone",
      "budgetRange": "50000-100000",
      "additionalRequests": "Need lighting",
      "honeycombGlamping": false,
      "status": "new",
      "notes": ""
    }
  ]
}
```

**Status Codes:**
- `200`: Success
- `500`: Server error

---

### 3. Get Single Booking

**Endpoint:** `GET /bookings/:id`

**Description:** Retrieve details of a specific booking

**URL Parameters:**
- `id` (string): Booking ID (e.g., "BK-1234567890-ABC123")

**Response (200):**
```json
{
  "booking": {
    "id": "BK-1234567890-ABC123",
    "timestamp": "2024-11-12T20:00:00Z",
    "locale": "en",
    "customerName": "John Doe",
    "phone": "9098888130",
    "email": "john@example.com",
    "eventDate": "2025-01-15",
    "eventType": "wedding-tent-setup",
    "guestCount": 250,
    "eventDetails": "Wedding ceremony...",
    "preferredContact": "phone",
    "budgetRange": "50000-100000",
    "additionalRequests": "Need lighting",
    "honeycombGlamping": false,
    "status": "new",
    "notes": ""
  }
}
```

**Response (404):**
```json
{
  "error": "Booking not found"
}
```

**Status Codes:**
- `200`: Success
- `404`: Booking not found
- `500`: Server error

---

## Protected Endpoints (Admin Only)

All admin endpoints require authentication via cookie. Admin must be logged in to the admin panel.

### 4. Get Admin Bookings List

**Endpoint:** `GET /admin/bookings`

**Description:** Retrieve all bookings with statistics (admin only)

**Authentication:** Required (admin-token cookie)

**Query Parameters:**
- `status` (string, optional): Filter by status (new, contacted, confirmed, completed, cancelled)
- `sortBy` (string, optional): Sort by field - "timestamp" (default), "date", "name"
- `order` (string, optional): Sort order - "desc" (default) or "asc"

**Example Requests:**
```
GET /admin/bookings
GET /admin/bookings?status=new
GET /admin/bookings?status=confirmed&sortBy=date&order=asc
```

**Response (200):**
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
      "eventDetails": "Wedding ceremony...",
      "preferredContact": "phone",
      "budgetRange": "50000-100000",
      "additionalRequests": "Need lighting",
      "honeycombGlamping": false,
      "status": "new",
      "notes": ""
    }
  ],
  "stats": {
    "total": 5,
    "new": 2,
    "contacted": 1,
    "confirmed": 1,
    "completed": 0,
    "cancelled": 1
  },
  "total": 5
}
```

**Response (401):**
```json
{
  "error": "Unauthorized"
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized (not logged in)
- `500`: Server error

---

### 5. Update Booking

**Endpoint:** `PUT /bookings/:id`

**Description:** Update booking status and notes (admin only)

**Authentication:** Required (admin-token cookie)

**URL Parameters:**
- `id` (string): Booking ID

**Request Body:**
```json
{
  "status": "contacted",
  "notes": "Customer confirmed interest. Sent initial quote."
}
```

**Valid Status Values:**
- `new` - Just received
- `contacted` - Admin has reached out
- `confirmed` - Customer confirmed booking
- `completed` - Event completed
- `cancelled` - Booking cancelled

**Response (200):**
```json
{
  "message": "Booking updated successfully",
  "booking": {
    "id": "BK-1234567890-ABC123",
    "timestamp": "2024-11-12T20:00:00Z",
    "locale": "en",
    "customerName": "John Doe",
    "phone": "9098888130",
    "email": "john@example.com",
    "eventDate": "2025-01-15",
    "eventType": "wedding-tent-setup",
    "guestCount": 250,
    "eventDetails": "Wedding ceremony...",
    "preferredContact": "phone",
    "budgetRange": "50000-100000",
    "additionalRequests": "Need lighting",
    "honeycombGlamping": false,
    "status": "contacted",
    "notes": "Customer confirmed interest. Sent initial quote."
  }
}
```

**Response (401):**
```json
{
  "error": "Unauthorized"
}
```

**Response (404):**
```json
{
  "error": "Booking not found"
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `404`: Booking not found
- `500`: Server error

---

### 6. Delete Booking

**Endpoint:** `DELETE /bookings/:id`

**Description:** Delete a booking (admin only)

**Authentication:** Required (admin-token cookie)

**URL Parameters:**
- `id` (string): Booking ID

**Response (200):**
```json
{
  "message": "Booking deleted successfully"
}
```

**Response (401):**
```json
{
  "error": "Unauthorized"
}
```

**Response (404):**
```json
{
  "error": "Booking not found"
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `404`: Booking not found
- `500`: Server error

---

## Data Types

### Booking Object

```typescript
{
  id: string;              // Unique identifier (BK-timestamp-random)
  timestamp: string;       // ISO 8601 datetime
  locale: 'en' | 'hi';    // Language code
  customerName: string;    // Customer full name
  phone: string;           // 10-digit phone number
  email?: string;          // Optional email address
  eventDate: string;       // Date in YYYY-MM-DD format
  eventType: string;       // Service type (wedding-tent-setup, etc.)
  guestCount?: number;     // Optional estimated guest count
  eventDetails?: string;   // Optional event description
  preferredContact: 'phone' | 'email' | 'whatsapp'; // Contact preference
  budgetRange?: string;    // Optional budget (e.g., "50000-100000")
  additionalRequests?: string; // Optional special requests
  honeycombGlamping: boolean;  // Interest in glamping options
  status: string;          // new | contacted | confirmed | completed | cancelled
  notes?: string;          // Internal admin notes
}
```

### Statistics Object

```typescript
{
  total: number;      // Total bookings
  new: number;        // New (not contacted)
  contacted: number;  // Admin has reached out
  confirmed: number;  // Customer confirmed
  completed: number;  // Event completed
  cancelled: number;  // Cancelled bookings
}
```

---

## Error Handling

### Common Error Responses

**400 - Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "Phone number must be 10 digits, Event date must be in the future"
}
```

**401 - Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**404 - Not Found:**
```json
{
  "error": "Booking not found"
}
```

**500 - Server Error:**
```json
{
  "error": "Error creating booking",
  "message": "Error details here"
}
```

---

## Usage Examples

### cURL Examples

**Create Booking:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "locale": "en",
    "customerName": "John Doe",
    "phone": "9098888130",
    "eventDate": "2025-01-15",
    "eventType": "wedding-tent-setup",
    "preferredContact": "phone"
  }'
```

**Get All Bookings:**
```bash
curl http://localhost:3000/api/bookings
```

**Get Single Booking:**
```bash
curl http://localhost:3000/api/bookings/BK-1234567890-ABC123
```

**Get Admin Bookings (requires login):**
```bash
curl -b "admin-token=<your-token>" \
  http://localhost:3000/api/admin/bookings?status=new
```

**Update Booking:**
```bash
curl -X PUT http://localhost:3000/api/bookings/BK-1234567890-ABC123 \
  -H "Content-Type: application/json" \
  -b "admin-token=<your-token>" \
  -d '{
    "status": "contacted",
    "notes": "Customer interested in May wedding"
  }'
```

**Delete Booking:**
```bash
curl -X DELETE http://localhost:3000/api/bookings/BK-1234567890-ABC123 \
  -b "admin-token=<your-token>"
```

### JavaScript Examples

**Create Booking:**
```javascript
const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    locale: 'en',
    customerName: 'John Doe',
    phone: '9098888130',
    eventDate: '2025-01-15',
    eventType: 'wedding-tent-setup',
    preferredContact: 'phone'
  })
});

const data = await response.json();
console.log(data.bookingId);
```

**Get All Bookings:**
```javascript
const response = await fetch('/api/bookings');
const { bookings } = await response.json();
console.log(bookings);
```

**Update Booking (Admin):**
```javascript
const response = await fetch('/api/bookings/BK-123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'contacted',
    notes: 'Sent quote'
  })
});

const data = await response.json();
console.log(data.booking);
```

---

## Rate Limiting

Currently: No rate limiting implemented

Recommended for production:
- Limit public booking creation to 5 per hour per IP
- Limit admin API calls to 100 per minute
- Implement CORS restrictions

---

## Authentication

Admin endpoints check for `admin-token` cookie set during admin login.

The cookie is set automatically when admin user logs in via `/admin/login`.

---

## Versioning

Current version: v1.0

No API versioning currently implemented. Future changes will maintain backward compatibility or include version in URL path (e.g., `/api/v2/bookings`).

---

## Response Format

All responses are in JSON format with appropriate HTTP status codes.

**Success Responses:**
- 200: OK
- 201: Created
- 204: No Content

**Client Error Responses:**
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found

**Server Error Responses:**
- 500: Internal Server Error

---

## CORS

Currently: No CORS restrictions

Add CORS headers if integrating with external services

---

## Rate Limits & Quotas

- No quotas implemented
- No rate limiting implemented

Recommended: Implement based on expected usage volume

---

## Pagination

Currently: No pagination implemented

All GET endpoints return all results. For high volume, consider adding:
- `limit` parameter (default: 100, max: 1000)
- `offset` parameter (default: 0)

---

## Webhooks

Currently: Not implemented

Future enhancement: Send webhooks on booking creation/update

---

## Additional Notes

1. **Data Storage:** Bookings are stored in `/public/data/bookings.json`
2. **File Format:** Plain JSON text file
3. **Encoding:** UTF-8
4. **Backup:** Manually backup the JSON file regularly
5. **Scalability:** JSON storage suitable for < 10,000 bookings
6. **Database Migration:** Use Prisma ORM when migrating to database

---

## Support

For API issues:
1. Check request format against examples
2. Verify required fields are included
3. Check admin authentication for protected endpoints
4. Review error messages in response
5. Check browser console for client-side errors
6. Review `/public/data/bookings.json` directly

---

## Summary

The Booking API provides complete CRUD operations for managing wedding tent service bookings. Public endpoints allow customers to submit booking requests, while protected endpoints enable admin management of bookings with filtering, searching, and status tracking.

For implementation details, see `BOOKING_SYSTEM_GUIDE.md`.
