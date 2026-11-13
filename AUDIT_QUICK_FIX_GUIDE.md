# Quick Fix Guide - MANI TENT HOUSE Audit Issues

## 🔴 CRITICAL (Must Fix Now)

### Issue #1: Background Color Inconsistency
**Problem:** Booking page has `bg-beige` breaking white background theme  
**Location:** `src/app/[locale]/booking/page.tsx:68`  
**Quick Fix:**
```tsx
// BEFORE
<Section className="bg-beige">

// AFTER
<Section className="bg-white border-t border-beige/30">
```

**Also Check:**
- Search entire project for `bg-beige`
- Search for `bg-ivory` and decide: keep for other sections or remove
- Run: `grep -r "bg-beige" src/`

---

## 🟠 HIGH (Fix This Week)

### Issue #2: Create Button Component
**Problem:** CTA buttons repeated across 15+ places with inconsistent styles  
**Create New File:** `src/components/Button.tsx`

```tsx
import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gold text-charcoal hover:bg-gold/90 hover:shadow-2xl hover:shadow-gold/40 hover:scale-105 shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'border-2 border-ivory/70 text-white hover:bg-white/15 hover:border-ivory hover:shadow-lg',
    dark: 'bg-charcoal text-white hover:bg-charcoal/90 hover:shadow-lg',
  };
  
  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
```

**Files to Update After Creating:**
- `src/components/Hero.tsx` (lines 45, 51)
- `src/app/[locale]/page.tsx` (lines 134, 224)
- `src/app/[locale]/services/page.tsx` (CTA button)
- `src/app/[locale]/services/[slug]/page.tsx` (CTA button)
- `src/app/[locale]/about/page.tsx` (CTA button)
- `src/app/[locale]/contact/page.tsx` (CTA buttons)

**Migration Example:**
```tsx
// BEFORE (in Hero.tsx)
<Link
  href={`/${locale}/contact`}
  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold text-charcoal font-semibold text-base hover:bg-gold/90 hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold/20"
>
  {t.primaryCta}
</Link>

// AFTER
<Button href={`/${locale}/contact`} variant="primary" size="md">
  {t.primaryCta}
</Button>
```

### Issue #3: Add Admin Session Timeout
**Problem:** Admin panel has no session timeout  
**Location:** `src/app/admin/layout.tsx` or create new hook  

**Solution:** Create `src/hooks/useSessionTimeout.ts`
```tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function useSessionTimeout() {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fetch('/api/admin/auth', { method: 'DELETE' });
        router.push('/admin/login');
      }, SESSION_TIMEOUT);
    };

    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);
    
    resetTimeout();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
    };
  }, [router]);
}
```

**Use in Admin Layout:**
```tsx
'use client';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';

export default function AdminLayout({ children }) {
  useSessionTimeout();
  return (
    // existing layout code
  );
}
```

---

## 🟡 MEDIUM (Fix This Sprint)

### Issue #4: Header Scroll State Color
**Location:** `src/components/Header.tsx:42`  
**Fix:**
```tsx
// BEFORE
isScrolled
  ? 'bg-ivory/98 backdrop-blur-md shadow-lg border-b border-gold/30'
  : 'bg-transparent'

// AFTER
isScrolled
  ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gold/30'
  : 'bg-transparent'
```

### Issue #5: Mobile Navigation Backdrop
**Location:** `src/components/Header.tsx:115`  
**Fix:**
```tsx
// BEFORE
<div className="py-6 px-2 space-y-1 border-t border-gold/20 bg-ivory/50 backdrop-blur-sm">

// AFTER
<div className="py-6 px-2 space-y-1 border-t border-gold/20 bg-white/50 backdrop-blur-sm">
```

### Issue #6: Service Card Gradient
**Location:** `src/components/ServiceCard.tsx:42`  
**Fix:**
```tsx
// BEFORE
<div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

// AFTER
<div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
```

### Issue #7: Gallery Grid Responsiveness
**Location:** `src/app/[locale]/gallery/page.tsx:60`  
**Fix:**
```tsx
// BEFORE
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

// AFTER
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
```

### Issue #8: Create Card Component
**Create New File:** `src/components/Card.tsx`

```tsx
import { ReactNode } from 'react';

interface CardProps {
  icon?: string | ReactNode;
  title: string;
  description: string;
  hoverable?: boolean;
  className?: string;
}

export default function Card({
  icon,
  title,
  description,
  hoverable = true,
  className = '',
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-7 sm:p-6 md:p-8 border border-beige/50 shadow-md ${
        hoverable
          ? 'hover:shadow-xl hover:border-gold/30 transition-all duration-300 group hover:translate-y-[-4px]'
          : ''
      } ${className}`}
    >
      {icon && (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
          {typeof icon === 'string' ? (
            <span className="text-gold font-playfair text-2xl font-bold">{icon}</span>
          ) : (
            icon
          )}
        </div>
      )}
      <h3 className={`font-playfair text-lg font-semibold mb-3 ${
        hoverable ? 'group-hover:text-gold transition-colors' : ''
      } text-charcoal`}>
        {title}
      </h3>
      <p className="text-sm text-charcoal/75 leading-relaxed">{description}</p>
    </div>
  );
}
```

**Replace in page.tsx:**
```tsx
// BEFORE (Why Choose Us section)
{t.whyChooseUs.reasons.map((reason, index) => (
  <div key={index} className="bg-white rounded-xl p-7 sm:p-6 md:p-8 border border-beige/50 shadow-md hover:shadow-xl hover:border-gold/30 transition-all duration-300 group hover:translate-y-[-4px]">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
      <span className="text-gold font-playfair text-2xl font-bold">{index + 1}</span>
    </div>
    <h3 className="font-playfair text-lg font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors">
      {reason.title}
    </h3>
    <p className="text-sm text-charcoal/75 leading-relaxed">{reason.desc}</p>
  </div>
))}

// AFTER
{t.whyChooseUs.reasons.map((reason, index) => (
  <Card key={index} icon={index + 1} title={reason.title} description={reason.desc} />
))}
```

### Issue #9: Gallery Disclaimer Copy
**Location:** `src/content/dictionary.ts` - Find `gallerySection.note`  
**Current:** "Decoration Inspiration: Visual ideas for wedding setups. Genuine business project photographs will be updated once available."  

**Better Options:**
```tsx
// Option 1: Short & professional
note: "Gallery features inspirational wedding decoration ideas. Genuine project photos coming soon.",

// Option 2: Move to info section
note: "Explore our wedding decoration inspiration gallery",
// Add separate page or modal with full disclaimer

// Option 3: Tooltip approach
note: "Gallery features inspirational wedding decoration ideas",
// Add info icon with tooltip explaining photos
```

### Issue #10: Clarify Catering Menu
**Location:** `src/content/dictionary.ts` - `menuSection`  
**Add Context:**

```tsx
// In Hero or Intro section
"MANI TENT HOUSE provides comprehensive wedding planning services including tent arrangements, decoration, mandap design, and coordinated catering options."

// Or explicitly add to menu section:
menuSection: {
  title: "Catering Menu",
  subtitle: "Delicious catering options to complement your celebration", // ADD THIS
  description: "As part of our comprehensive wedding services, we coordinate with trusted caterers to provide delicious meal options for your guests.",
  categories: [...]
}
```

### Issue #11: Mobile Hero Section Spacing
**Location:** `src/components/Hero.tsx:13`  
**Fix:**
```tsx
// BEFORE
<section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden mt-16 md:mt-0">

// AFTER
<section className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden mt-16 md:mt-0">
```

---

## 🟢 LOW (Nice to Have)

### Issue #12: CTA Copy Optimization
**Locations to Review:**
- Hero primary CTA: "Plan Your Wedding" ✓ (Good)
- Hero secondary CTA: "Explore Services" ✓ (Good)
- Gallery CTA: "View Decoration Inspiration" ✓ (Good)
- Final CTA: Could be "Let's Create Magic" or "Start Planning Now"

### Issue #13: SEO Enhancement
**Add to** `src/lib/seo.ts`:
```tsx
// Add Open Graph tags
og: {
  title,
  description,
  image: 'https://manitenthouse.in/og-image.jpg',
  url: `https://manitenthouse.in${path}`,
  type: 'website',
},
// Add Twitter cards
twitter: {
  card: 'summary_large_image',
  title,
  description,
}
```

### Issue #14: Footer Tablet Layout
**Location:** `src/components/Footer.tsx:14`  
**Fix:**
```tsx
// BEFORE
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

// AFTER
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
```

---

## ✅ Testing Checklist After Fixes

- [ ] Test all pages on mobile (iPhone 12/14)
- [ ] Test all pages on tablet (iPad)
- [ ] Test all CTA buttons (click, hover, mobile tap)
- [ ] Verify form submission success message
- [ ] Check header scroll behavior
- [ ] Verify booking form validation
- [ ] Test language switcher
- [ ] Admin panel login and logout
- [ ] Admin session timeout (wait 30 mins)
- [ ] Gallery image loading on slow connection
- [ ] Responsive images on different screen sizes

---

## 📋 Implementation Checklist

### Phase 1: Critical (Day 1)
- [ ] Remove `bg-beige`, standardize colors
- [ ] Update header/mobile nav colors
- [ ] Create Button component
- [ ] Update 5-6 CTA instances

### Phase 2: Refactoring (Day 2-3)
- [ ] Create Card component
- [ ] Replace card implementations (2 locations)
- [ ] Audit admin components
- [ ] Add session timeout

### Phase 3: Content (Day 4)
- [ ] Simplify gallery disclaimer
- [ ] Add catering menu context
- [ ] Review service descriptions

### Phase 4: Polish (Day 5)
- [ ] Responsive testing
- [ ] SEO enhancement
- [ ] Final QA

---

**💡 Pro Tips:**
- Use `Find & Replace` in VS Code for color updates
- Test component changes with `npm run dev` first
- Git commit after each component creation
- Keep original functionality while refactoring
- Run type check: `npx tsc --noEmit`

