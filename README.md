# Un-Old-Jeju (StampMap)

An interactive, mobile-first stamp collection map and digital passport application designed to gamify real-world exploration on Jeju Island, South Korea.

## 🛠️ Tech Stack

**Languages**
- TypeScript, HTML, CSS

**Frontend (Web App)**
- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Library:** React 19
- **Styling:** Tailwind CSS v4, shadcn/ui
- **State Management:** Zustand
- **Icons:** lucide-react
- **Map Engine:** maplibre-gl & react-map-gl (with OpenFreeMap)

**Backend & Database**
- **API:** Next.js Route Handlers
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma v7
- **Authentication:** @supabase/ssr

## ✨ Active Features

- **Live Data Integration:** Entire app connected to Supabase (PostgreSQL) via Prisma ORM, replacing all previous mock data for locations, stamps, and souvenirs.
- **Multi-Region Support:** Added support for toggling regions (e.g. "Jeju Island" and "Thailand") across Database schema, APIs, Zustand store, and UI components.
- **Supabase Authentication:** Fully integrated authentication via `@supabase/ssr` supporting manual Sign Up, Log In, and Log Out.
- **Silent Guest Login:** Implemented an `AuthWrapper` that automatically authenticates users into a "Demo Account" (`demo@unoldjeju.com`) on their first visit, offering a frictionless portfolio showcase. Users can log out to test the manual Auth flow.
- **Interactive Jeju Map Dashboard:** SVG Jeju Island silhouette with topographic contours, compass rose, scale bar, and an interactive MapLibre map with Zone-to-Zoom.
- **Dynamic Map Pins:** Markers are rendered using real GPS coordinates (Latitude/Longitude) from the database, correctly handling map zoom and pan.
- **Premium Splash Screen:** 3D clay logo, orbital spinning rings, floating Jeju location badges, animated loading bar.
- **Stamp Book (Digital Passport):** 3D claymorphism orange book cover with Hallasan mountain SVG emblem and glassmorphism progress widget.
- **Ebook Stamp Viewer:** Glass page card with decorative SVG landscape, authentic Jeju stamp imprint, memo input, and pill-style pagination.
- **Souvenir Exchange Hub:** Frosted glass card grid with ambient emoji glow, clay redeem button, and glassmorphism exchange modal with success state.
- **Floating Bottom Nav:** Glassmorphism floating pill with 3D clay left-most Map button and active dot indicators.
- **Performance Optimized:** Clean component structure migrated completely from inline styles to pure Tailwind v4 utility classes.
- **Stamp Book Management:** Users can create multiple stamp books per zone, switch between them, and delete existing books via a glassmorphism dialog.
- **Accessible Interactive Lists:** Book selection rows use `div[role=button]` to prevent invalid `<button>` nesting while maintaining full keyboard accessibility.


## 📁 Directory Structure

- `app/` (**✔️ SAFE TO MODIFY**): All Next.js App Router endpoints.
  - `api/` : Backend Route Handlers for Supabase (Locations, Stamps, Souvenirs).
  - `@modal/` : Parallel route intercepting `/location/[id]`.
  - `location/` : Standalone location detail page.
  - `splash/` : Animated splash screen with clay logo.
  - `book/` : Digital passport & stamp book.
  - `souvenir/` : Souvenir exchange marketplace page.
  - `auth/` : Authentication screen.
  - `settings/` : App settings & preferences.
- `components/` (**✔️ SAFE TO MODIFY**): Global reusable components.
  - `map/` : `jeju-map.tsx` (MapLibre), `map-pins.tsx` (clay 3D pins), `map-background.tsx` (SVG Jeju Island).
  - `souvenir/` : `souvenir-card.tsx` (Badge + token utilities), `exchange-modal.tsx`.
  - `location/` : Star ratings, reviews.
  - `settings/` : `settings-group.tsx`.
  - `ui/` (**❌ DO NOT TOUCH**): shadcn/ui primitive components.
- `lib/` : Helper functions and mock data models.
- `store/` : Zustand global state stores with async data fetching.
- `prisma/` : Database schema and `seed.ts` for populating real Jeju data.
- `prisma.config.ts` : Centralized Prisma V7 configuration.
- `.env` : Database connection secrets (SAFE in local, ignored in git).
