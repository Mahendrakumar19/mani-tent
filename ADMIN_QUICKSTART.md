# Admin Panel - Quick Start Guide

## Access Your Admin Panel

1. **Go to:** `http://localhost:3000/admin` (or your domain.com/admin)
2. **Password:** `admin123` (default)
3. **First Time:** Change your password in Settings → Change Admin Password

---

## Admin Dashboard Overview

When you log in, you'll see the admin dashboard with:
- **Statistics** - Count of services, menu items, languages
- **Quick Actions** - Easy buttons to navigate to each editing section

---

## How to Use Each Section

### 1️⃣ Edit Business Information
**Location:** Dashboard → "Business Info" or Sidebar → Business Info

**What You Can Edit:**
- Business name
- Address
- Phone numbers (2 phone numbers)
- Email address
- Business description

**Steps:**
1. Click "Business Info" in the sidebar
2. Update any field
3. Click "Save Changes"
4. Success message appears - changes are live!

---

### 2️⃣ Manage Services
**Location:** Sidebar → Services

**What You Can Edit:**
- Service title (English & Hindi)
- Service description (English & Hindi)
- Service image URL

**Note:** Currently configured with 1 wedding tent service. To add more services, you need to:
1. Edit `public/data/services.json` directly, OR
2. Ask for admin feature expansion

**Steps:**
1. Click "Services" in the sidebar
2. Edit the service details
3. Fill in both English and Hindi versions
4. Click "Save Changes"

---

### 3️⃣ Update Catering Menu
**Location:** Sidebar → Catering Menu

**What You Can Edit:**
- Add/Remove menu items
- Organize items by category (Vegetarian, Non-Vegetarian, Beverages, Desserts)

**Current Categories:**
- ✅ Vegetarian
- ✅ Non-Vegetarian  
- ✅ Beverages
- ✅ Desserts

**Steps:**
1. Click "Catering Menu" in the sidebar
2. For each category, you can:
   - Edit existing items by clicking on them
   - Click "+ Add Item" to add a new item
   - Click "Remove" button to delete an item
3. Click "Save Changes" at the bottom

---

### 4️⃣ Edit Website Content
**Location:** Sidebar → Content

**What You Can Edit:**
- All website text content
- Support for both English and Hindi

**Content Sections:**
- Brand name and tagline
- Hero section (heading, description, buttons)
- Introduction section
- Services section titles
- Why choose us reasons
- Gallery section text
- Process section steps
- Location information
- Menu section titles
- FAQ questions and answers
- Final CTA text
- Footer text

**Steps:**
1. Click "Content" in the sidebar
2. Choose language: **English** or **हिंदी**
3. Click on a section name to expand it
4. Edit text in the form fields
5. Click "Save Changes"

**Example:** To change the hero heading:
1. Click "Content"
2. Make sure "English" is selected
3. Click "hero" to expand
4. Find "heading" field
5. Change text from "Making Every Celebration Unforgettable." to your text
6. Click "Save Changes"

---

### 5️⃣ Admin Settings
**Location:** Sidebar → Settings

**What You Can Do:**
- **Change Admin Password** - Update your login password
  - Minimum 6 characters
  - Must match confirmation
  - New password takes effect immediately

**Steps:**
1. Click "Settings" in the sidebar
2. Enter new password
3. Confirm password
4. Click "Update Password"

---

## Common Tasks

### Change Your Admin Password
1. Go to Settings (gear icon in sidebar)
2. Enter new password (min 6 characters)
3. Confirm password
4. Click "Update Password"
5. Use new password to log in next time

### Update Phone Number
1. Go to Business Info
2. Find "Phone 1" or "Phone 2"
3. Change the number
4. Click "Save Changes"

### Add a Menu Item
1. Go to Catering Menu
2. Find the category (e.g., "Vegetarian")
3. Click "+ Add Item"
4. Type the new item name
5. Click "Save Changes"

### Change Website Heading
1. Go to Content
2. Click "hero" section to expand
3. Find "heading" field
4. Edit the text
5. Click "Save Changes"

### Update Address
1. Go to Business Info
2. Find "Address" field
3. Edit the full address
4. Click "Save Changes"

---

## Tips & Tricks

### 📝 Bilingual Content
When editing content, you can edit both languages:
1. Go to Content
2. Make changes in English first
3. Click "हिंदी" button at top
4. Make same changes in Hindi
5. Click "Save Changes"

### 💾 Always Save
After making changes, always click "Save Changes" button
- You'll see a green success message
- Changes appear on website immediately
- Changes are saved to JSON files in `/public/data/`

### ⚠️ Important
- **Don't edit JSON files directly** - use the admin panel
- **Backup your data** - keep copies of `/public/data/` directory
- **Change default password** - `admin123` is not secure for production
- **Use HTTPS** - when deployed online

---

## Troubleshooting

### "Password incorrect" error
- Check caps lock
- Make sure you're using the current password (not the one you changed from)
- Default password is: `admin123`

### Changes don't appear on website
1. Click "Save Changes" button (not just edit)
2. Wait a few seconds
3. Refresh the website page
4. Check if you're looking at the right language (EN/HI)

### Can't access admin panel
- Make sure you're at `/admin` (not just `/`)
- Try logging out and back in
- Clear browser cache/cookies
- Try a different browser

### "Error saving data"
- Check internet connection
- Make sure you entered valid data
- Try again in a few seconds
- Contact your hosting provider

---

## Data Location

All your data is stored in: `/public/data/`

**Files:**
- `business-info.json` - Your business details
- `services.json` - Service information
- `menu.json` - Menu items
- `dictionary.json` - All website text
- `admin-config.json` - Admin password

**Backup your data regularly!**

---

## Getting Help

If something doesn't work:

1. **Check the console** - Open browser developer tools (F12) to see errors
2. **Try refreshing** - Sometimes a page refresh helps
3. **Clear cache** - Your browser might be showing old version
4. **Log out and back in** - Session might have expired
5. **Check file permissions** - Server might not have access to `/public/data/`

---

## Security Reminders

🔒 **Keep These Safe:**
- Your admin password - never share it
- The `/public/data/` directory - contains all site data
- Your admin login URL - bookmark it

🔐 **Best Practices:**
- Change password regularly
- Use a strong password (not `admin123`)
- Log out when finished
- Only share admin access with trusted people
- Backup data regularly

---

## What's Next?

After setting up your admin panel:

1. ✅ Change your password in Settings
2. ✅ Update your business information  
3. ✅ Add your phone numbers and email
4. ✅ Update the catering menu with your items
5. ✅ Edit all website content to match your business
6. ✅ Review the website to make sure everything looks good
7. ✅ Deploy to production!

---

**Questions?** Check IMPROVEMENTS.md for more technical details.
