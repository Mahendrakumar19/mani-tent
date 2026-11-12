# Booking System Architecture

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        MANI TENT HOUSE                          │
│                        BOOKING SYSTEM                           │
└─────────────────────────────────────────────────────────────────┘

                          ┌───────────────────┐
                          │   Website Pages   │
                          └───────────────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
        ┌──────────────┐   ┌─────────────────┐   ┌──────────────┐
        │  Home Page   │   │  Contact Page   │   │ Booking Page │
        │  /[locale]/  │   │ /[locale]/      │   │ /[locale]/   │
        │              │   │ contact         │   │ booking      │
        └──────────────┘   └─────────────────┘   └──────────────┘
                │                   │                   │
                └───────────────────┴───────────────────┘
                              │
                    ┌─────────────────────┐
                    │  BookingForm.tsx    │
                    │  (React Component)  │
                    └─────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    ┌─────────────┐   ┌──────────────┐   ┌─────────────────┐
    │ Validation  │   │  Form State  │   │ Form Submission │
    │ (Client)    │   │  Management  │   │                 │
    └─────────────┘   └──────────────┘   └─────────────────┘
         │                                        │
         └────────────────┬───────────────────────┘
                          │
                ┌─────────────────────┐
                │  POST /api/bookings │
                │  (API Endpoint)     │
                └─────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ┌──────────────┐  ┌─────────────┐  ┌──────────────┐
    │  Server-side │  │  Generate   │  │  Save to     │
    │  Validation  │  │  Booking ID │  │  JSON File   │
    └──────────────┘  └─────────────┘  └──────────────┘
         │                                    │
         └────────────────┬───────────────────┘
                          │
                ┌─────────────────────┐
                │  bookings.json      │
                │  (/public/data/)    │
                │  (Data Storage)     │
                └─────────────────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
    ┌──────────────────┐   ┌──────────────────────┐
    │ Customer Views   │   │ Admin Dashboard      │
    │ Success Message  │   │ /admin/bookings      │
    │                  │   │                      │
    └──────────────────┘   └──────────────────────┘
                                      │
                        ┌─────────────┴────────────┐
                        │                          │
                  ┌────────────────┐      ┌─────────────────┐
                  │ View All       │      │ Search & Filter │
                  │ Bookings       │      │ By Status/Name  │
                  │                │      │                 │
                  └────────────────┘      └─────────────────┘
                        │                          │
                        └────────────┬─────────────┘
                                     │
                        ┌─────────────────────────┐
                        │ Click View/Edit on      │
                        │ Booking                 │
                        └─────────────────────────┘
                                     │
              ┌──────────────────────┴──────────────────────┐
              │                                             │
        ┌──────────────┐                             ┌──────────────┐
        │ Detail Modal │                             │ Update Form  │
        │              │                             │              │
        │ - View Info  │                             │ - Change     │
        │ - Add Notes  │                             │   Status     │
        │ - WhatsApp   │                             │ - Add Notes  │
        │ - Delete     │                             │ - Save       │
        └──────────────┘                             └──────────────┘
              │                                             │
              └─────────────────┬──────────────────────────┘
                                │
                    ┌───────────────────────┐
                    │ PUT /api/bookings/[id]│
                    │ (Update API)          │
                    └───────────────────────┘
                                │
                    ┌───────────────────────┐
                    │ Update bookings.json  │
                    └───────────────────────┘
```

---

## 📁 File Structure

```
MANI TENT HOUSE
│
├── src/
│   ├── components/
│   │   └── BookingForm/
│   │       ├── BookingForm.tsx          (Main component)
│   │       └── index.ts                 (Exports)
│   │
│   ├── lib/
│   │   └── bookings/
│   │       ├── types.ts                 (TypeScript types)
│   │       ├── validation.ts            (Validation logic)
│   │       └── utils.ts                 (Utility functions)
│   │
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── booking/
│   │   │   │   └── page.tsx             (Booking page)
│   │   │   └── contact/
│   │   │       └── page.tsx             (Modified - form added)
│   │   │
│   │   ├── api/
│   │   │   ├── bookings/
│   │   │   │   ├── route.ts             (POST/GET all)
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts         (GET/PUT/DELETE)
│   │   │   │
│   │   │   └── admin/
│   │   │       └── bookings/
│   │   │           └── route.ts         (Admin list)
│   │   │
│   │   └── admin/
│   │       ├── page.tsx                 (Modified - booking stats)
│   │       └── bookings/
│   │           └── page.tsx             (Admin dashboard)
│   │
│   └── content/
│       └── dictionary.ts                (Modified - labels added)
│
├── public/
│   └── data/
│       └── bookings.json                (Data storage)
│
└── Documentation/
    ├── BOOKING_SYSTEM_GUIDE.md
    ├── BOOKING_QUICKSTART.md
    ├── BOOKING_API.md
    ├── BOOKING_IMPLEMENTATION_SUMMARY.md
    ├── BOOKING_CHANGES.md
    └── BOOKING_ARCHITECTURE.md          (this file)
```

---

## 🔄 Data Flow Diagram

### User Booking Flow
```
┌─────────────┐
│   Customer  │
└──────┬──────┘
       │
       │ 1. Visits /[locale]/booking
       │
       ▼
┌──────────────────┐
│  Booking Page    │
│  Component       │
└──────┬───────────┘
       │
       │ 2. Fills form fields
       │
       ▼
┌──────────────────┐
│  BookingForm     │
│  Component       │
└──────┬───────────┘
       │
       │ 3. Client-side validation
       │
       ├─ Invalid? Show error
       │
       │ 4. Valid? Submit POST request
       │
       ▼
┌──────────────────────────────┐
│  POST /api/bookings          │
│  (API Endpoint)              │
└──────┬───────────────────────┘
       │
       │ 5. Server-side validation
       │
       ├─ Invalid? Return 400 error
       │
       │ 6. Valid? Create booking object
       │    - Generate ID
       │    - Add timestamp
       │    - Add locale
       │
       ▼
┌──────────────────────────────┐
│  saveBooking(booking)        │
│  (Utils function)            │
└──────┬───────────────────────┘
       │
       │ 7. Save to bookings.json
       │
       ▼
┌──────────────────────────────┐
│  /public/data/bookings.json  │
│  (Data storage)              │
└──────┬───────────────────────┘
       │
       │ 8. Return success response
       │
       ▼
┌──────────────────────────────┐
│  Customer sees success msg   │
│  Form clears                 │
└──────────────────────────────┘
```

### Admin Booking Management Flow
```
┌──────────┐
│  Admin   │
└────┬─────┘
     │
     │ 1. Login to /admin
     │
     ▼
┌────────────────────────┐
│  Admin Dashboard       │
│  /admin/bookings       │
└────┬───────────────────┘
     │
     │ 2. View booking list
     │
     ├─ Search by name/phone
     │
     ├─ Filter by status
     │
     │ 3. Click "View/Edit"
     │
     ▼
┌────────────────────────────┐
│  Booking Detail Modal      │
│                            │
│  - View customer info      │
│  - View event details      │
│  - See current status      │
│  - Read admin notes        │
└────┬───────────────────────┘
     │
     │ 4. Update booking
     │
     ├─ Change status dropdown
     │
     ├─ Edit notes textarea
     │
     │ 5. Click "Save Changes"
     │
     ▼
┌────────────────────────────┐
│  PUT /api/bookings/[id]    │
│  (Update API)              │
└────┬───────────────────────┘
     │
     │ 6. Verify admin auth
     │
     │ 7. Update booking data
     │
     ▼
┌────────────────────────────┐
│  bookings.json updated     │
│  - New status saved        │
│  - Notes updated           │
└────┬───────────────────────┘
     │
     │ 8. Return updated booking
     │
     ▼
┌────────────────────────────┐
│  Modal shows updated data  │
│  List refreshes            │
└────────────────────────────┘
```

---

## 📊 Component Hierarchy

```
BookingForm Component
├── State Management
│   ├── formData
│   ├── errors
│   ├── isSubmitting
│   └── submitMessage
│
├── Form Sections
│   ├── Success/Error Message Display
│   ├── Customer Name Input
│   ├── Phone Input
│   ├── Email Input
│   ├── Event Date Input
│   ├── Event Type Select
│   ├── Guest Count Input
│   ├── Event Details Textarea
│   ├── Contact Method Radio
│   ├── Budget Range Input
│   ├── Additional Requests Textarea
│   ├── Honeycomb/Glamping Checkbox
│   └── Submit Button
│
└── Handlers
    ├── handleChange()
    └── handleSubmit()
```

---

## 🔐 Security Flow

```
┌─────────────────┐
│  User Input     │
└────────┬────────┘
         │
         ▼
    ┌──────────────────────────┐
    │ Client-Side Validation   │
    │ (JavaScript)             │
    │ - Format checks          │
    │ - Required fields        │
    │ - Type checks            │
    └────────┬─────────────────┘
             │
             ▼ (if valid)
         ┌──────────────────┐
         │ API Request      │
         │ POST /api/...    │
         └────────┬─────────┘
                  │
                  ▼
            ┌─────────────────────────┐
            │ Server-Side Validation  │
            │ (TypeScript)            │
            │ - Regex validation      │
            │ - Type checking         │
            │ - Business rules        │
            │ - Sanitization          │
            └────────┬────────────────┘
                     │
                     ▼ (if valid)
            ┌─────────────────────────┐
            │ Data Storage            │
            │ Write to bookings.json  │
            └─────────────────────────┘
```

---

## 🌐 API Endpoints Map

```
                    ┌─────────────────────┐
                    │  /api/bookings      │
                    │  (Base Route)       │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
        ┌───────────────┐          ┌──────────────────┐
        │ POST          │          │ GET              │
        │ (Create)      │          │ (List All)       │
        │               │          │                  │
        │ - Validation  │          │ - No Auth needed │
        │ - Save to DB  │          │ - Returns array  │
        │ - Return ID   │          │ - No filtering   │
        └───────────────┘          └──────────────────┘
                │                             │
                │                             ▼
                │                  /api/bookings/[id]
                │                         │
                │        ┌────────────────┼────────────────┐
                │        │                │                │
                │    ┌────────┐      ┌────────┐      ┌─────────┐
                │    │ GET    │      │ PUT    │      │ DELETE  │
                │    │(Read)  │      │(Update)│      │(Remove) │
                │    │        │      │        │      │         │
                │    │ - Auth │      │ - Auth │      │ - Auth  │
                │    │ - Detail│     │ - Status│     │ - Delete│
                │    └────────┘      └────────┘      └─────────┘
                │
                │     /api/admin/bookings
                │            │
                │    ┌───────────────┐
                │    │ GET (Admin)   │
                │    │               │
                │    │ - Auth check  │
                │    │ - Get stats   │
                │    │ - Filtering   │
                │    │ - Sorting     │
                │    └───────────────┘
                │
                └────────────────────────────────────────
                           │
                    ┌──────────────────┐
                    │  Success Response│
                    │  Error Response  │
                    │  Status Codes    │
                    └──────────────────┘
```

---

## 🗄️ Data Structure Hierarchy

```
bookings.json
│
└─ bookings: Array
   │
   └─ Booking Object
      ├─ id: string (BK-timestamp-random)
      ├─ timestamp: string (ISO 8601)
      ├─ locale: 'en' | 'hi'
      │
      ├─ Customer Info
      │  ├─ customerName: string
      │  ├─ phone: string (10 digits)
      │  └─ email?: string
      │
      ├─ Event Info
      │  ├─ eventDate: string (YYYY-MM-DD)
      │  ├─ eventType: string
      │  ├─ guestCount?: number
      │  ├─ eventDetails?: string
      │  ├─ budgetRange?: string
      │  └─ additionalRequests?: string
      │
      ├─ Preferences
      │  ├─ preferredContact: 'phone' | 'email' | 'whatsapp'
      │  └─ honeycombGlamping: boolean
      │
      └─ Admin Info
         ├─ status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled'
         └─ notes?: string
```

---

## 🔄 State Management Flow

### BookingForm Component State
```
formData (State)
│
├─ customerName: string
├─ phone: string
├─ email: string
├─ eventDate: string
├─ eventType: string
├─ guestCount: string
├─ eventDetails: string
├─ preferredContact: 'phone' | 'email' | 'whatsapp'
├─ budgetRange: string
├─ additionalRequests: string
└─ honeycombGlamping: boolean
         │
         ├─ handleChange() → Update state
         │
         └─ handleSubmit() → Validate & Submit
                      │
                      ├─ errors: Record<string, string>
                      │  ├─ Display validation errors
                      │  └─ Clear on input
                      │
                      ├─ isSubmitting: boolean
                      │  └─ Show loading state
                      │
                      └─ submitMessage: object
                         ├─ type: 'success' | 'error'
                         ├─ title: string
                         └─ message: string
```

---

## 🎯 Validation Pipeline

```
INPUT → CLIENT VALIDATION → SERVER VALIDATION → STORAGE
   │           │                   │               │
   │      ┌────────────┐      ┌────────────┐     │
   │      │ Format OK? │      │ Format OK? │     │
   │      │ Required?  │      │ Type OK?   │     │
   │      │ Type OK?   │      │ Rules OK?  │     │
   │      └────┬───────┘      └────┬───────┘     │
   │           │                   │              │
   │ ┌─ NO ─┐  │ ┌─ NO ──┐        │  ┌─ NO ──┐  │
   │ │Error │  │ │Error  │        │  │Error  │  │
   │ └──────┘  │ └───────┘        │  └───────┘  │
   │           │                   │              │
   │           └─ YES ─────────────┘ ┌─ YES ──┐  │
   │                                  │        │  │
   │                                  │      SAVE │
   │                                  │        │  │
   │                                  └────────┼──┤
   │                                           │  │
   └───────────────────────────────────────────┘  │
                                                   │
                                              SUCCESS ✓
```

---

## 📈 Admin Dashboard State

```
AdminBookingsPage Component
│
├─ bookings: Booking[]
│  ├─ Fetched from GET /api/admin/bookings
│  └─ Filtered by selectedStatus & searchTerm
│
├─ stats: BookingStats
│  ├─ total
│  ├─ new
│  ├─ contacted
│  ├─ confirmed
│  ├─ completed
│  └─ cancelled
│
├─ UI State
│  ├─ isLoading: boolean
│  ├─ error: string
│  ├─ selectedStatus: string (filter)
│  ├─ searchTerm: string (search)
│  ├─ selectedBooking: Booking | null (modal)
│  ├─ editingStatus: string
│  └─ editingNotes: string
│
└─ Handlers
   ├─ loadBookings()
   ├─ handleDeleteBooking()
   ├─ handleUpdateBooking()
   └─ UI event handlers
```

---

## 🚀 Deployment Architecture

```
                    ┌──────────────────┐
                    │  Next.js Server  │
                    │  (Vercel/Self)   │
                    └────────┬─────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
            ┌─────────┐  ┌────────┐  ┌────────┐
            │ Public  │  │ API    │  │ Admin  │
            │ Pages   │  │Routes  │  │Pages   │
            │         │  │        │  │        │
            └─────────┘  └────────┘  └────────┘
                │            │            │
                └────────────┼────────────┘
                             │
                    ┌────────────────────┐
                    │  File System       │
                    │  /public/data/     │
                    │  bookings.json     │
                    └────────────────────┘
```

---

## 🔗 Integration Points

```
MANI TENT HOUSE Website
│
├─ Header/Navigation
│  └─ Link to booking page (can be added)
│
├─ Home Page
│  ├─ CTA button to booking (can be added)
│  └─ Link to booking page
│
├─ Services Pages
│  ├─ Service detail with booking form (can be added)
│  └─ "Book Now" button
│
├─ Contact Page
│  ├─ Booking form (ADDED)
│  └─ Contact information
│
├─ Dedicated Booking Page (/booking)
│  ├─ Booking form (ADDED)
│  └─ Contact information
│
└─ Admin Dashboard (/admin)
   ├─ Booking stats (ADDED)
   ├─ Bookings link in nav (ADDED)
   └─ Booking management page (ADDED)
       └─ /admin/bookings
```

---

This architecture provides a scalable, maintainable solution for managing wedding service bookings with clear separation of concerns and multiple integration points.

For detailed implementation information, see the other documentation files.
