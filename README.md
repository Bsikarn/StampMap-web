# Un-Old-Jeju (StampMap)

An interactive, mobile-first stamp collection map and digital passport application designed to gamify real-world exploration on Jeju Island, South Korea.

## 🏗️ Technology Stack

**Core Frameworks & Languages**
- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui

**Design System**
- **Typography:** Outfit (Geometric Sans-serif, Google Fonts) — v3 Design System
- **Aesthetic:** Glassmorphism + Soft UI + 3D Claymorphism
- **Color Palette:** Jeju Blue `#3B6CF4`, Jeju Orange `#FF7B42`, Hallasan Purple `#8B5CF6`
- **Background:** Vibrant mesh gradient (fixed attachment, corner-anchored radials)

**Database & State Management**
- **State Management:** Zustand (Immutable global stores)
- **Database/ORM:** PostgreSQL + Prisma ORM

**UI Libraries**
- **Icons:** Lucide React
- **Animations:** Custom keyframe animations (float, clay glow, ping-slow, shimmer)
- **UI Primitives:** shadcn/ui (Dialog, Select, Input, Button)

## 🚀 Active Features

- **Interactive Jeju Map Dashboard:** SVG Jeju Island silhouette with topographic contours, compass rose, scale bar, and glassmorphism floating progress widget.
- **Claymorphism Map Pins:** Collected pins use 3D inset blue gradient with pulsing glow rings; uncollected pins have frosted glass + dashed spinning ring + animated dot.
- **Location Discovery:** Route-intercepting modals (`@modal`) show rich location data without losing the map viewport.
- **Premium Splash Screen:** 3D clay logo, orbital spinning rings, floating Jeju location badges, animated loading bar.
- **Stamp Book (Digital Passport):** 3D claymorphism orange book cover with Hallasan mountain SVG emblem and glassmorphism progress widget.
- **Ebook Stamp Viewer:** Glass page card with decorative SVG landscape, authentic Jeju stamp imprint, memo input, and pill-style pagination.
- **Souvenir Exchange Hub:** Frosted glass card grid with ambient emoji glow, clay redeem button, and glassmorphism exchange modal with success state.
- **Floating Bottom Nav:** Glassmorphism floating pill with 3D clay center Map button and active dot indicators.

## 📁 Directory Structure Breakdown

- `/app`: All Next.js App Router endpoints.
  - `/app/@modal`: Parallel route intercepting `/location/[id]` — displays as overlay modal.
  - `/app/location/[id]`: Standalone location detail page (fallback on hard refresh).
  - `/app/splash`: Animated splash screen with clay logo and floating island badges.
  - `/app/book`: Digital passport & stamp book. Sub-components in `/app/book/components/`.
  - `/app/souvenir`: Souvenir exchange marketplace page.
  - `/app/auth`: Authentication screen.
  - `/app/settings`: App settings & preferences.
  - `globals.css`: **Design System v3** — all tokens, glass/clay/neumorphic utilities, keyframes.
  - `layout.tsx`: Root shell with Outfit font, mesh gradient body, BottomNav injection.
- `/components`: Global reusable components.
  - `/components/bottom-nav.tsx`: Glassmorphism floating navigation bar.
  - `/components/map/`: `map-background.tsx` (SVG Jeju Island), `map-pins.tsx` (clay 3D pins).
  - `/components/souvenir/`: `souvenir-card.tsx`, `exchange-modal.tsx`.
  - `/components/location/`: Star ratings, reviews.
  - `/components/settings/`: Settings group UI.
  - `/components/ui/`: shadcn/ui primitive components. **[DO NOT MODIFY DIRECTLY]**
- `/docs`: All documentation. **[DO NOT TOUCH — READ ONLY]**
- `/lib`: Helper functions and mock data models.
- `/store`: Zustand global state stores.
- `/prisma`: Database schema.
