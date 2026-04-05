# Velvet Crema — Coffee Shop Website

A fully responsive, production-grade website for Velvet Crema, a luxury coffee brand.
Dark aesthetic with gold (#e9c349) accents. Fully responsive for mobile, tablet & desktop.

---

## 📁 Folder Structure

```
velvet-crema/
│
├── index.html                  ← Home page (landing)
│
├── css/
│   └── style.css               ← All shared styles (design tokens, components, layouts)
│
├── js/
│   ├── main.js                 ← All shared interactivity
│   └── nav.js                  ← Navigation helper (optional use)
│
└── pages/
    ├── boutique.html           ← Product collection grid page
    ├── product.html            ← Product detail page (PDP)
    ├── cart.html               ← Shopping cart / checkout summary
    └── membership.html         ← Membership tiers & newsletter
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width         | Layout         |
|------------|---------------|----------------|
| Mobile     | < 640px       | Single column, bottom nav visible |
| Tablet     | 640px–1023px  | 2-column grids, bottom nav visible |
| Desktop    | ≥ 1024px      | Multi-column grids, top nav, bottom nav hidden |

---

## 🎨 Design System

- **Primary color:** `#e9c349` (gold)
- **Background:** `#131313` (near black)
- **Headline font:** Noto Serif (Google Fonts)
- **Body font:** Manrope (Google Fonts)
- **Icons:** Material Symbols Outlined
- All values driven by CSS custom properties in `css/style.css`

---

## ✅ Pages Included

1. **index.html** — Hero, Collections Bento Grid, Editorial Quote, Daily Essentials, Newsletter
2. **boutique.html** — Category filter pills, Featured bento grid, Product grid
3. **product.html** — Product spotlight hero, Tasting notes, Brewing guide, Pairs section
4. **cart.html** — Cart items with qty controls, remove, Order summary sidebar
5. **membership.html** — Membership hero, 3 tier cards, Benefits, Testimonials, Newsletter

---

## ⚙️ Features

- Sticky glass-morphism top navigation
- Fixed bottom navigation bar (mobile/tablet)
- Floating Action Button (Concierge)
- Product hover overlays with Quick Add
- Favourite toggle (heart icon)
- Quantity +/– controls with live total update
- Remove item with slide-out animation
- Newsletter form with success state
- Quick-Add toast notification
- Scroll-triggered fade-up animations (IntersectionObserver)
- Scroll-aware navbar background
- Category pill filter tabs

---

## 🚀 How to Use

Simply open `index.html` in any modern browser. No build step, no dependencies.
All external resources (fonts, icons) load from Google CDN.

For production deployment, upload the entire `velvet-crema/` folder to any static host
(Netlify, Vercel, GitHub Pages, etc.) — works out of the box.
