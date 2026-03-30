# Sawariyasethfurniture — Nuxt Website

Premium furniture shop + showroom + manufacturing website built with Nuxt 4, Tailwind CSS 4, and @nuxt/ui.

## Tech Stack

- **Nuxt 4** — App router, auto-imports, SSG/SSR
- **Tailwind CSS v4** — Utility-first styling
- **@nuxt/ui v3** — Component primitives
- **@nuxt/content** — Ready for blog/collections content pages
- **Cormorant Garamond + Jost** — Brand typography via Google Fonts
- **lucide-vue-next** — Icons
- **@vueuse/nuxt** — Composable utilities

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate
```

---

## Project Structure

```
woodcraft/
├── app.vue                      # Root layout
├── nuxt.config.ts               # Nuxt + module config
├── assets/css/main.css          # Brand tokens + global styles
├── pages/
│   └── index.vue                # Home page (all sections)
├── components/
│   ├── TheNavbar.vue            # Sticky scroll-aware nav
│   ├── TheFooter.vue            # Footer with links + address
│   ├── HeroSection.vue          # Full-screen cinematic hero
│   ├── CollectionsSection.vue   # Product grid
│   ├── WorkshopSection.vue      # Manufacturing story
│   ├── ShowroomSection.vue      # Showroom info + testimonials
│   ├── AboutSection.vue         # Brand story
│   ├── ContactSection.vue       # Enquiry form
│   └── StickyEnquiryBar.vue     # Mobile floating CTA
├── composables/
│   ├── useScrollReveal.ts       # IntersectionObserver reveal
│   └── useEnquiry.ts            # Form state + submission
└── server/api/
    └── enquiry.post.ts          # Form handler (add email/DB logic here)
```

---

## Customisation Checklist

### Replace placeholder content
- [ ] Update brand name throughout (search `WoodCraft Studio`)
- [ ] Replace Unsplash image URLs with your own photography
- [ ] Update address, phone, email in `TheFooter.vue`, `ShowroomSection.vue`, `ContactSection.vue`
- [ ] Update Google Maps link in `ShowroomSection.vue` and `ContactSection.vue`

### Connect the enquiry form
Open `server/api/enquiry.post.ts` and choose one:
- **Email via Resend** — `npm install resend` then call `resend.emails.send(...)`
- **Email via Nodemailer** — `npm install nodemailer`
- **Save to SQLite** — `better-sqlite3` is already in your deps
- **Google Sheets** — use the Google Sheets API with a service account

### Google Analytics
Add your GA4 measurement ID in `nuxt.config.ts`:
```ts
// Replace @nuxtjs/google-gtag was in your original deps — re-add if needed:
gtag: { id: 'G-XXXXXXXXXX' }
```

### SEO
Update meta in `pages/index.vue` → `useSeoMeta({ ... })` block.

### Collections detail pages
Use `@nuxt/content` to create markdown files under `content/collections/` and a dynamic page at `pages/collections/[slug].vue`.

---

## Brand Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bark` | `#2C1A0E` | Primary dark, headings |
| `--color-clay` | `#C4845A` | Accent, CTAs, links |
| `--color-sand` | `#F5ECD7` | Light backgrounds |
| `--color-linen` | `#EDE0C8` | Borders, section bg |
| `--color-moss` | `#4A5E3A` | Success states |
| `--color-warm-white` | `#FDFAF4` | Page background |

---

## Deployment

Works out of the box on **Vercel**, **Netlify**, or any Node.js host.

For static deployment (no server routes): `npm run generate` → deploy `dist/` folder.
For full SSR (form API works natively): `npm run build` → deploy with Node adapter.
