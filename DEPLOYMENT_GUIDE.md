# 🚀 Deployment Guide - Mani Tent House Website

## Overview

Your website is now **production-ready** with:
- ✅ Professional UI/UX
- ✅ Password-protected admin panel
- ✅ Content management system (no backend needed)
- ✅ Bilingual support (English/Hindi)
- ✅ Mobile responsive design

---

## Pre-Deployment Checklist

### 1. Security ⚠️ CRITICAL
- [ ] Change admin password from `admin123` to something secure
  - Go to `/admin/settings` and change password
  - Use a strong password (12+ characters, mix of letters/numbers/symbols)
- [ ] Backup your data files (`/public/data/` folder)
- [ ] Enable HTTPS on your domain
- [ ] Don't use HTTP in production

### 2. Content Verification
- [ ] Verify business information is correct
  - Phone numbers, email, address
  - Go to Admin → Business Info
- [ ] Check all service descriptions are accurate
  - Admin → Services
- [ ] Review catering menu items
  - Admin → Menu
- [ ] Verify website content (English & Hindi)
  - Admin → Content
- [ ] Ensure all images are loading correctly
  - Check on mobile and desktop

### 3. Testing
- [ ] Test on mobile devices
  - iPhone, Android, tablets
- [ ] Test on different browsers
  - Chrome, Firefox, Safari, Edge
- [ ] Test admin panel functionality
  - Login/logout
  - Edit content
  - Verify changes appear on website
- [ ] Test contact form (if backend is added later)
- [ ] Test language switcher
  - English and Hindi both work

### 4. Performance
- [ ] Check website speed
  - Run on https://pagespeed.web.dev/
  - Target: >90 score
- [ ] Verify images are optimized
- [ ] Check for any broken links
- [ ] Verify all pages load correctly

### 5. SEO
- [ ] Verify meta tags are correct
  - Title, description on each page
- [ ] Check Open Graph tags for social sharing
- [ ] Verify structured data (if implemented)
- [ ] Create sitemap.xml
- [ ] Submit to Google Search Console

---

## Local Development Setup

### First Time Setup
```bash
# 1. Clone the repository
git clone https://github.com/Mahendrakumar19/mani-tent.git
cd mani-tent

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Visit in browser
# http://localhost:3000  (Website)
# http://localhost:3000/admin  (Admin Panel - Password: admin123)
```

### Common Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check code quality
```

---

## Deployment Options

### Option 1: Vercel (Recommended) ⭐
**Best for: Easy deployment, automatic updates, free tier available**

1. Push code to GitHub (already done)
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"
6. ✅ Done! Your site is live

**Advantages:**
- Auto-deploys when you push to GitHub
- Free tier available
- Very fast performance
- Easy to rollback

**Important:** Ensure `/public/data/` folder is included in deployment
- Vercel should include it automatically
- Check "Environment Variables" if needed

---

### Option 2: Netlify
**Best for: Alternative to Vercel, similar features**

1. Go to https://netlify.com
2. Click "New site from Git"
3. Select your GitHub repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Click "Deploy"

**Important:** 
- May need to configure serverless functions for file I/O
- Check `/public/data/` permissions

---

### Option 3: Traditional Hosting (VPS/Shared)
**Best for: Full control, custom domain, email hosting**

Requires Node.js 20+

**Steps:**
1. SSH into your server
2. Clone repository:
   ```bash
   git clone https://github.com/Mahendrakumar19/mani-tent.git
   cd mani-tent
   npm install
   npm run build
   ```
3. Keep process running with PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "mani-tent" -- start
   pm2 startup
   pm2 save
   ```
4. Setup Nginx reverse proxy to port 3000
5. Setup SSL certificate (Let's Encrypt)

---

### Option 4: cPanel/Shared Hosting
**Best for: Simple, includes email, domain management**

Most shared hosting with Node.js support:

1. Upload files via FTP to `public_html/`
2. Install dependencies:
   ```bash
   npm install --production
   ```
3. Build:
   ```bash
   npm run build
   ```
4. Use hosting control panel to manage Node.js app
5. Point domain to the app

---

## Post-Deployment

### 1. Test Live Site
- [ ] Visit your domain
- [ ] Check all pages load
- [ ] Test admin panel at `/admin`
- [ ] Verify forms work
- [ ] Test on mobile

### 2. Setup Monitoring
- [ ] Google Analytics (optional)
- [ ] Monitor uptime (Pingdom, UptimeRobot)
- [ ] Setup error alerts

### 3. Backup Strategy
- [ ] **Backup location:** `/public/data/` folder
- **Frequency:** Daily or after each edit
- **Method:** 
  - Download via FTP/SFTP
  - Or use Git to version control changes
  - Or setup automated backups

**Backup Command:**
```bash
# Backup your data
cp -r public/data/ backup/data-$(date +%Y%m%d).zip

# Or use Git to track changes
git add public/data/
git commit -m "Backup: $(date)"
git push
```

### 4. Domain Setup
If you have a custom domain:
- [ ] Update DNS records to point to hosting
- [ ] Setup SSL certificate
- [ ] Setup email forwarding (optional)
- [ ] Verify domain is working

---

## How File Storage Works

Your website stores data in JSON files. When you use admin panel:

```
Admin Panel Edit
    ↓
Click "Save"
    ↓
API Route saves to /public/data/*.json
    ↓
Website reads from JSON files
    ↓
Changes appear immediately
```

**Data Files Location:** `/public/data/`
- `business-info.json` - Contact details
- `services.json` - Service information
- `menu.json` - Menu items
- `dictionary.json` - Website content
- `admin-config.json` - Admin password

⚠️ **Important:** Keep these files backed up!

---

## Adding Backend Features Later

Currently, the admin panel works with JSON files (no backend needed).

If you want to add features later:
- Contact forms → Add backend
- Image uploads → Add backend
- User accounts → Add backend
- Payment processing → Add backend

The structure is ready for these additions!

---

## Troubleshooting

### Site Not Loading
- [ ] Check server is running
- [ ] Check port 3000 is open
- [ ] Check firewall settings
- [ ] Check error logs

### Admin Panel Not Working
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Check `/public/data/` folder exists
- [ ] Check folder has write permissions
- [ ] Check password is correct

### Changes Not Saving
- [ ] Check `/public/data/` folder permissions
- [ ] Check disk space available
- [ ] Check error in browser console (F12)
- [ ] Restart application

### Performance Issues
- [ ] Enable gzip compression
- [ ] Enable caching headers
- [ ] Optimize images
- [ ] Use CDN for static files

---

## Monitoring & Maintenance

### Regular Tasks
- [ ] **Weekly:** Check website loads correctly
- [ ] **Weekly:** Check admin panel works
- [ ] **Monthly:** Backup data files
- [ ] **Monthly:** Review website analytics
- [ ] **Quarterly:** Update dependencies

### Backup Routine
```bash
# Automated backup script (run daily)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "backup_$DATE.tar.gz" public/data/
# Upload to cloud storage or email
```

---

## Security Best Practices

### 1. Password Security ✅
- [ ] Change default password
- [ ] Use strong password (12+ characters)
- [ ] Don't share with others
- [ ] Change periodically

### 2. HTTPS Only ✅
- [ ] Enable SSL certificate
- [ ] Redirect HTTP to HTTPS
- [ ] Use secure domain

### 3. File Permissions ✅
- [ ] `/public/data/` must be writable
- [ ] Restrict access to `/admin` if possible
- [ ] Regular backups of data files

### 4. Updates ✅
- [ ] Keep Node.js updated
- [ ] Keep npm packages updated
- [ ] Monitor security advisories

---

## Performance Optimization

### For Vercel
- ✅ Automatic: Vercel optimizes for you
- ✅ CDN included
- ✅ Automatic caching

### For Other Hosting
```nginx
# Enable caching in Nginx
location ~* ^.*\.(jpg|jpeg|gif|png|ico|css|js|svg|woff|woff2|ttf|eot)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Enable gzip compression
gzip on;
gzip_types text/plain text/css text/javascript application/json;
```

---

## Cost Estimates

| Hosting | Cost | Best For |
|---------|------|----------|
| Vercel | Free-$20/mo | Easiest, auto-deploy |
| Netlify | Free-$19/mo | Alternative to Vercel |
| Shared Hosting | $3-10/mo | Budget-friendly |
| VPS | $5-20/mo | More control |
| Dedicated | $50+/mo | High traffic |

---

## Support & Help

If something goes wrong:

1. **Check Logs**
   ```bash
   # Check error logs
   pm2 logs mani-tent
   # or check hosting control panel
   ```

2. **Check GitHub Issues**
   - https://github.com/Mahendrakumar19/mani-tent/issues

3. **Check Documentation**
   - START_HERE.md
   - ADMIN_QUICKSTART.md
   - README_UPDATES.md

---

## Congratulations! 🎉

Your website is ready to go live!

**Next Steps:**
1. ✅ Follow the pre-deployment checklist
2. ✅ Choose a hosting provider
3. ✅ Deploy your site
4. ✅ Test everything
5. ✅ Update your domain
6. ✅ Setup backups
7. ✅ You're live!

---

## Quick Links

- **Repository:** https://github.com/Mahendrakumar19/mani-tent
- **Vercel:** https://vercel.com (recommended)
- **Netlify:** https://netlify.com
- **Let's Encrypt:** https://letsencrypt.org (free SSL)

---

**Good luck! Your website is amazing! 🚀**
