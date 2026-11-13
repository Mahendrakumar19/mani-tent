# Audit Issues - Organized by Page/Component

## 🏠 Home Page (`src/app/[locale]/page.tsx`)

### Issues Found: 5

| # | Issue | Type | Priority | Line(s) | Fix |
|---|-------|------|----------|---------|-----|
| 2 | CTA Button #1 - No Button component | Code Quality | HIGH | 134-147 | Replace with `<Button>` component |
| 7 | Gallery grid not optimized for all screens | Responsive | MEDIUM | 112 | Change to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| 8 | Gallery disclaimer too long | Copy | MEDIUM | 131 | Shorten to "Gallery features inspirational wedding decoration ideas" |
| 14 | CTA Button #2 - Final CTA no component | Code Quality | HIGH | 224-229 | Replace with `<Button>` component |
| 19 | Section background inconsistency | Design | CRITICAL | 40, 57, 152, 184, 210 | Review ivory vs white usage; be consistent |

**Quick Wins for Home Page:**
- [ ] Create Button component
- [ ] Update 2 CTA buttons
- [ ] Simplify gallery note copy
- [ ] Review section background colors

---

## 📍 About Page (`src/app/[locale]/about/page.tsx`)

### Issues Found: 2

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 2 | CTA Button - No Button component | Code Quality | HIGH | Line ~230 | Replace with `<Button>` component |
| 12 | Potential color inconsistency | Design | MEDIUM | Line ~221 (bg-charcoal) | Already uses dark variant - OK ✅ |

**Status:** Mostly clean, just needs Button component usage

---

## 🎯 Services Page (`src/app/[locale]/services/page.tsx`)

### Issues Found: 3

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 2 | CTA Button - No Button component | Code Quality | HIGH | Final CTA button | Replace with `<Button>` component |
| 6 | Service card gradients | Design | MEDIUM | ServiceCard component (line 42) | Increase gradient opacity from 0.5 to 0.7 |
| 7 | No Card component abstraction | Code Quality | MEDIUM | Multiple card sections | Create Card component and refactor |

**Quick Wins for Services:**
- [ ] Replace CTA button
- [ ] Update ServiceCard gradient
- [ ] Create and use Card component

---

## 🖼️ Gallery Page (`src/app/[locale]/gallery/page.tsx`)

### Issues Found: 2

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 7 | Gallery grid responsiveness | Responsive | MEDIUM | Line 60 | Add `sm:grid-cols-2 lg:grid-cols-3` breakpoints |
| 8 | Gallery note disclaimer | Copy | MEDIUM | Title/subtitle | Simplify copy for clarity |

**Quick Wins for Gallery:**
- [ ] Improve grid responsiveness
- [ ] Clarify disclaimer text

---

## 📞 Contact Page (`src/app/[locale]/contact/page.tsx`)

### Issues Found: 2

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 2 | Multiple CTA buttons | Code Quality | HIGH | Multiple locations | Use Button component (2 instances) |
| 19 | Form validation feedback | Functional | MEDIUM | Form section | Verify loading states and error messages |

**Quick Wins for Contact:**
- [ ] Replace CTA buttons
- [ ] Test form submission flow

---

## 📅 Booking Page (`src/app/[locale]/booking/page.tsx`)

### Issues Found: 3

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 1 | Background color inconsistency | CRITICAL | HIGH | Line 68 | Replace `bg-beige` with `bg-white border-t border-beige/30` |
| 14 | Form success flow unclear | Functional | MEDIUM | BookingForm component | Verify success message and next steps shown |
| 19 | Loading states not visible | Functional | MEDIUM | BookingForm component | Ensure loading spinner displays |

**Quick Wins for Booking:**
- [ ] Fix beige background (CRITICAL)
- [ ] Test form submission flow
- [ ] Verify loading states

---

## 🧭 Header Component (`src/components/Header.tsx`)

### Issues Found: 3

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 4 | Scroll state color mismatch | Design | MEDIUM | Line 42 | Change `bg-ivory/98` to `bg-white/95` |
| 5 | Mobile menu backdrop color | Design | MEDIUM | Line 115 | Change `bg-ivory/50` to `bg-white/50` |
| 10 | LanguageSwitcher visibility | Design | MEDIUM | Line 73, 131 | Verify visibility on white background |

**Quick Wins for Header:**
- [ ] Update scroll state color
- [ ] Update mobile menu color
- [ ] Test language switcher visibility

---

## 🦸 Hero Component (`src/components/Hero.tsx`)

### Issues Found: 3

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 2 | CTA Button #1 (primary) | Code Quality | HIGH | Line 46 | Replace with Button component |
| 2 | CTA Button #2 (secondary) | Code Quality | HIGH | Line 52 | Replace with Button component |
| 13 | Mobile height too large | Responsive | MEDIUM | Line 13 | Change min-h-[90vh] to min-h-[80vh] for mobile |

**Quick Wins for Hero:**
- [ ] Replace both CTA buttons
- [ ] Adjust mobile height
- [ ] Test on actual mobile devices

---

## 🃏 Service Card Component (`src/components/ServiceCard.tsx`)

### Issues Found: 1

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 6 | Image overlay gradient not prominent | Design | MEDIUM | Line 42 | Change `from-charcoal/50` to `from-charcoal/70 via-charcoal/30` |

**Quick Wins for Service Card:**
- [ ] Enhance gradient visibility

---

## 🎁 FAQ Accordion (`src/components/FAQAccordion.tsx`)

### Issues Found: 1

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 19 | Accessibility enhancements | Functional | MEDIUM | Component-wide | Add proper ARIA labels (already has some) |

**Status:** Mostly good, minor accessibility enhancements needed

---

## 🔗 Footer Component (`src/components/Footer.tsx`)

### Issues Found: 1

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 15 | Tablet layout not optimized | Responsive | LOW | Line 14, 79 | Add `sm:grid-cols-2` breakpoint |

**Status:** Mostly good, nice-to-have responsive improvement

---

## 🔑 Admin Login Page (`src/app/admin/login/page.tsx`)

### Issues Found: 1

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 3 | No session timeout | Security | HIGH | Entire page | Create useSessionTimeout hook and integrate |

**Priority Action:**
- [ ] Add session timeout immediately

---

## 📱 Admin Components (Various)

### Issues Found: 1

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 11 | Admin color consistency | Design | MEDIUM | All admin pages | Audit for beige/ivory/white consistency after global changes |

**Action:** After global colors fixed, review admin components

---

## 📖 Dictionary/Content (`src/content/dictionary.ts`)

### Issues Found: 3

| # | Issue | Type | Priority | Location | Fix |
|---|-------|------|----------|----------|-----|
| 8 | Gallery disclaimer too wordy | Copy | MEDIUM | gallerySection.note | Shorten disclaimer |
| 9 | Catering menu context unclear | Copy | MEDIUM | menuSection | Add context about catering coordination |
| 18 | Service descriptions | Copy | MEDIUM | servicesSection | Review each service description for clarity |

**Quick Wins for Content:**
- [ ] Simplify gallery note
- [ ] Add catering context
- [ ] Review service descriptions

---

## 🎨 Styling & Colors (Global)

### Issues Found: 5

| # | Issue | Type | Priority | Impact | Fix |
|---|-------|------|----------|--------|-----|
| 1 | bg-beige usage | CRITICAL | HIGH | Entire site | Replace all with bg-white or adjusted colors |
| 4 | Header color | MEDIUM | MEDIUM | Header only | Update scroll state colors |
| 5 | Mobile nav color | MEDIUM | MEDIUM | Mobile only | Update menu backdrop |
| 10 | LanguageSwitcher | MEDIUM | LOW | Small area | Test visibility |
| 12 | Overall consistency | MEDIUM | MEDIUM | Everywhere | Ensure white/ivory/charcoal used consistently |

---

## 📊 Issues by Type

### By Component
```
Header Component:           3 issues
Hero Component:             3 issues
Home Page:                  5 issues
Services Page:              3 issues
Booking Page:               3 issues
Contact Page:               2 issues
Gallery Page:               2 issues
About Page:                 2 issues
ServiceCard Component:      1 issue
Footer Component:           1 issue
FAQ Accordion:              1 issue
Admin Login:                1 issue
Global (Content):           3 issues
Global (Colors):            5 issues
Admin Components:           1 issue
FAQ Accordion:              1 issue
─────────────────────────────────
TOTAL:                      38 issue instances
                           (23 unique issues)
```

### By Type
```
Design/UI Issues:           12
Code Quality Issues:        8
Responsive Issues:          3
Content/Copy Issues:        5
Functional Issues:          5
Security Issues:            1
Accessibility Issues:       1
```

---

## ✅ Implementation Order by Impact

### Phase 1: Critical Path (Must Do First)
1. Fix `bg-beige` → `bg-white` (BLOCKS other color work)
2. Update header colors (affects entire site aesthetics)
3. Create Button component (enables 6+ page fixes)

### Phase 2: High ROI Components
4. Use Button component on all CTAs (simplifies 6+ pages)
5. Add admin session timeout (security)
6. Create Card component (cleanup 2 locations)

### Phase 3: Polish
7. Update responsive grids (gallery, footer)
8. Enhance image gradients (service cards, gallery)
9. Fix mobile heights (hero)

### Phase 4: Content & Testing
10. Simplify copy (gallery, catering)
11. Full responsive testing
12. Admin component audit

---

## 📋 Quick Reference: What to Fix Where

### QUICK FIXES (< 5 min each)
```
Header.tsx:      bg-ivory → bg-white/95 (2 places)
Booking page:    bg-beige → bg-white (1 place)
Gallery page:    grid-cols-2 md:grid-cols-3 (1 line)
```

### MEDIUM FIXES (15-30 min each)
```
Hero.tsx:        Create & use Button component (2 places)
Page.tsx:        Create & use Button component (2 places)
Services page:   Create & use Button component (1 place)
ServiceCard:     Update gradient opacity (1 line)
```

### MAJOR COMPONENTS (1-2 hours each)
```
Button.tsx:      CREATE new component
Card.tsx:        CREATE new component
useSessionTimeout.ts: CREATE new hook
Admin auth:      INTEGRATE session timeout
```

---

## 🎯 Success Metrics After Fixes

After implementing all fixes, you should see:

✅ **No beige colors visible** - Only white/ivory/charcoal  
✅ **Consistent CTAs** - All buttons use Button component  
✅ **Responsive on all devices** - Mobile/tablet/desktop  
✅ **Professional appearance** - Cohesive design language  
✅ **Better maintainability** - Reusable components  
✅ **Improved security** - Admin session timeout  
✅ **Cle