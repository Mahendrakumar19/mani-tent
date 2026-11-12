# Booking System - Quick Start Guide

## 🎉 Welcome to Your New Booking System!

Your MANI TENT HOUSE website now has a complete booking management system. Here's how to get started:

## 📋 What's New

### For Your Customers
- **Booking Form** at `/en/booking` and `/hi/booking`
- **Easy-to-use interface** with validation
- **Mobile responsive design**
- **Bilingual support** (English & Hindi)

### For Your Admin Team
- **Admin Dashboard** at `/admin/bookings`
- **View all bookings** with statistics
- **Search & filter** by name, phone, or status
- **Update booking status** and add notes
- **Contact customers** directly via WhatsApp

## 🚀 Getting Started

### 1. Test the Booking Form

**Desktop:**
- Visit: `http://localhost:3000/en/booking`
- Fill out the form with test data
- Click "Submit Booking Request"
- You should see a success message

**On Contact Page:**
- Visit: `http://localhost:3000/en/contact`
- Scroll down to find the booking form
- Test booking submission

### 2. Access Admin Dashboard

**Path:** `/admin/bookings`

**What you'll see:**
- Total bookings received
- New bookings count
- Status breakdown (new, contacted, confirmed, etc.)
- Complete list of all bookings
- Search and filter options

### 3. Manage Bookings

**Click "View/Edit" on any booking to:**
- See all customer details
- Update booking status
- Add internal notes
- Contact customer via WhatsApp
- Delete booking if needed

## 📁 Key Files Created

```
/public/data/bookings.json          ← All bookings stored here
/src/components/BookingForm/        ← Reusable form component
/src/lib/bookings/                  ← Validation & utilities
/src/app/[locale]/booking/          ← Dedicated booking page
/src/app/api/bookings/              ← API endpoints
/src/app/admin/bookings/            ← Admin dashboard
```

## 📝 Form Fields Explained

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| Name | ✅ | Text | Customer's full name |
| Phone | ✅ | Tel | 10-digit mobile number |
| Email | ❌ | Email | Optional contact email |
| Event Date | ✅ | Date | Must be future date |
| Event Type | ✅ | Select | Choose from wedding services |
| Guest Count | ❌ | Number | Estimated guests |
| Event Details | ❌ | Textarea | Vision, style, requirements |
| Contact Method | ✅ | Radio | Phone / Email / WhatsApp |
| Budget Range | ❌ | Text | Optional budget (e.g., 50000-100000) |
| Additional Requests | ❌ | Textarea | Special requests |
| Honeycomb/Glamping | ❌ | Checkbox | Interest in glamping options |

## 💾 Where Bookings Are Stored

**File:** `/public/data/bookings.json`

**Structure:**
```json
{
  "bookings": [
    {
      "id": "BK-1234567890-ABC123",
      "timestamp": "2024-11-12T20:00:00Z",
      "customerName": "John Doe",
      "phone": "9098888130",
      "email": "john@example.com",
      "eventDate": "2025-01-15",
      "eventType": "wedding-tent-setup",
      "guestCount": 250,
      "status": "new",
      "notes": ""
    }
  ]
}
```

**Statuses:**
- `new` - Just received
- `contacted` - Admin has reached out
- `confirmed` - Customer confirmed booking
- `completed` - Event completed
- `cancelled` - Booking cancelled

## 🌐 Public URLs

### English
- Booking page: `/en/booking`
- Contact page: `/en/contact` (has booking form)
- Services: `/en/services` (can add form here too)

### Hindi
- Booking page: `/hi/booking`
- Contact page: `/hi/contact` (has booking form)
- Services: `/hi/services` (can add form here too)

## 🔧 Admin URLs

- Dashboard: `/admin`
- Bookings: `/admin/bookings` ← **Most Important**

## ✨ Features

### Customer-Facing
✅ Mobile responsive  
✅ Form validation  
✅ Success/error messages  
✅ Bilingual (EN/HI)  
✅ Easy to fill out  

### Admin Features
✅ View all bookings  
✅ Search by name/phone  
✅ Filter by status  
✅ Update booking status  
✅ Add internal notes  
✅ WhatsApp contact link  
✅ Delete bookings  
✅ Booking statistics  

## 🔍 How to Find Bookings

1. Go to `/admin/bookings`
2. Use **search box** to find by name or phone
3. Use **status filter** to see specific status
4. **Click View/Edit** to see full details

## 📞 Quick Contact Links

In the admin booking details, you can:
- **Call:** Click on phone number to call
- **WhatsApp:** Click WhatsApp button for instant message
- **Email:** Customer email is shown in details

## 🎨 Customization

### Change Form Fields
Edit: `/src/content/dictionary.ts`
- Look for `booking:` section
- Modify labels, placeholders, messages
- Supports both English and Hindi

### Change Admin Dashboard Styling
Edit: `/src/app/admin/bookings/page.tsx`
- Modify colors, layout, components
- Change status badge colors
- Adjust table styling

### Change Form Layout
Edit: `/src/components/BookingForm/BookingForm.tsx`
- Add/remove fields
- Change validation rules
- Modify styling

## 🧪 Testing Checklist

- [ ] Fill booking form with valid data
- [ ] See success message after submission
- [ ] Check booking appears in admin dashboard
- [ ] Search for booking by name
- [ ] Filter by status
- [ ] Update booking status
- [ ] Add notes to booking
- [ ] Test on mobile device
- [ ] Test in both English and Hindi

## 📊 Data Analysis

### Booking Statistics
The admin dashboard shows:
- **Total:** All bookings received
- **New:** Not yet contacted
- **Contacted:** Admin has reached out
- **Confirmed:** Customer agreed to booking
- **Completed:** Event finished
- **Cancelled:** Booking cancelled

### Export Data
Current: Bookings stored in `/public/data/bookings.json`

Future enhancement: Export to CSV button

## 🚨 Important Notes

1. **Bookings are stored in JSON** - Easy to backup, but not ideal for high volume
2. **Admin authentication** uses cookies - Make sure to log in first
3. **No email notifications yet** - You'll need to check dashboard manually
4. **Phone field requires 10 digits** - Basic format validation only
5. **Event date must be in future** - Can't book past dates

## 💡 Pro Tips

1. **Search is smart** - Works with partial names and phone numbers
2. **Status colors help** - Blue=New, Yellow=Contacted, Green=Confirmed
3. **Notes are sticky** - Add reminders for follow-ups
4. **WhatsApp integration** - Direct link to message customer
5. **Mobile works great** - Customers can book from phone

## 🔒 Security

The booking system includes:
- ✅ Client-side validation
- ✅ Server-side validation
- ✅ Admin authentication check
- ✅ Phone format validation
- ✅ Email format validation (if provided)

Recommended: Add HTTPS in production

## 🆘 Troubleshooting

**Form won't submit?**
- Check all required fields are filled (name, phone, date, type)
- Verify phone is 10 digits
- Verify event date is in future

**Admin dashboard won't load?**
- Make sure you're logged in to admin panel
- Check browser console for errors
- Try clearing cookies and logging in again

**Can't find a booking?**
- Use search with name or phone
- Try clearing filters
- Refresh the page

**Booking not saved?**
- Check `/public/data/bookings.json` file exists
- Check file permissions
- Look for error messages in console

## 📚 Full Documentation

For complete documentation, see:
- `BOOKING_SYSTEM_GUIDE.md` - Detailed technical guide
- `BOOKING_QUICKSTART.md` - This file (quick reference)

## 🎯 Next Steps

1. **Test the system** with sample bookings
2. **Share booking page** with customers
3. **Add to header/footer** navigation links
4. **Set up email notifications** (optional)
5. **Monitor bookings** in admin dashboard
6. **Follow up with customers** via WhatsApp

## 📞 Need Help?

Check:
1. Error messages in form
2. Browser console (F12 → Console tab)
3. Admin dashboard statistics
4. `/public/data/bookings.json` file directly

---

**Your booking system is ready!** 🚀

Start accepting bookings and managing them easily through your admin dashboard.

Happy bookings! 🎉
