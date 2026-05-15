# StampMap-web

An interactive, mobile-first stamp collection map and digital passport application. A personal project for Sikarn Pattarasirimongkol, designed to gamify real-world exploration and showcase Full-stack development skills.

## Tech Stack

### Languages
- TypeScript
- HTML
- CSS

### Frontend
- Next.js 16+ (App Router)
- React 19
- Tailwind CSS v4
- shadcn/ui
- Zustand
- maplibre-gl & react-map-gl

### Backend & Database
- Next.js Route Handlers
- PostgreSQL (via Supabase)
- Prisma ORM v7
- @supabase/ssr

### Tools
- ESLint
- TypeScript Compiler
- PostCSS

## Active Features

- **Live Data Integration** — Entire app connected to Supabase via Prisma ORM for locations, stamps, and souvenirs.
- **Multi-Region Support** — Support for toggling regions like "Jeju Island" and "Thailand" across Database, APIs, and UI.
- **Supabase Authentication** — Fully integrated authentication supporting manual Sign Up, Log In, and Log Out.
- **Silent Guest Login** — Automatically authenticates users into a "Demo Account" on their first visit for a frictionless experience.
- **Interactive Map Dashboard** — SVG silhouette with topographic contours and an interactive MapLibre map with dynamic markers.
- **Digital Passport** — 3D claymorphism orange book cover with authentic stamp imprints and progress tracking.
- **Souvenir Exchange Hub** — Frosted glass marketplace with a clay redeem button for exchanging collected stamps.

## Directory Structure

```text
app/                 # Next.js App Router endpoints
  api/               # Backend Route Handlers
  @modal/            # Intercepting routes
  location/          # Standalone location pages
  splash/            # Animated splash screen
  book/              # Digital passport & stamp book
  souvenir/          # Marketplace
  auth/              # Authentication
  settings/          # App preferences
components/          # Global reusable components
  map/               # MapLibre & SVG map utilities
  souvenir/          # Souvenir related components
  ui/                # ⚠️ DO NOT TOUCH (shadcn primitives)
lib/                 # Helper utilities and Prisma clients
prisma/              # Database schema and seed data
store/               # Zustand global state
docs/                # Project documentation
public/              # Static assets
.env                 # ⚠️ Local secrets
package.json         # ⚠️ Project dependencies
prisma.config.ts     # ⚠️ Prisma configuration
```

## Environment Variables

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
DATABASE_URL=
```
