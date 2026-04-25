# Un-Old-Jeju (StampMap)

An interactive, mobile-first stamp collection map and digital passport application designed to gamify real-world exploration on Jeju Island, South Korea.

## 🛠️ Tech Stack

- **Languages:** TypeScript, HTML, CSS
- **Frontend:** Next.js 16+ (App Router, Turbopack), React
- **Backend:** PostgreSQL, Prisma ORM
- **Libraries/Tools:** Tailwind CSS v4 & shadcn/ui (Styling/UI), Zustand (State Management), lucide-react (Icons), maplibre-gl & react-map-gl (Map Engine), OpenFreeMap (Map Provider)

## ✨ Active Features

- **Interactive Jeju Map Dashboard:** SVG Jeju Island silhouette with topographic contours, compass rose, scale bar, and an interactive MapLibre map with Zone-to-Zoom.
- **Claymorphism Map Pins:** Collected pins use 3D inset blue gradient with pulsing glow rings; uncollected pins have frosted glass + dashed spinning ring + animated dot.
- **Location Discovery:** Route-intercepting modals (`@modal`) show rich location data without losing the map viewport.
- **Premium Splash Screen:** 3D clay logo, orbital spinning rings, floating Jeju location badges, animated loading bar.
- **Stamp Book (Digital Passport):** 3D claymorphism orange book cover with Hallasan mountain SVG emblem and glassmorphism progress widget.
- **Ebook Stamp Viewer:** Glass page card with decorative SVG landscape, authentic Jeju stamp imprint, memo input, and pill-style pagination.
- **Souvenir Exchange Hub:** Frosted glass card grid with ambient emoji glow, clay redeem button, and glassmorphism exchange modal with success state.
- **Floating Bottom Nav:** Glassmorphism floating pill with 3D clay center Map button and active dot indicators.
- **Performance Optimized:** Clean component structure migrated completely from inline styles to pure Tailwind v4 utility classes.

## 📁 Directory Structure

- `app/` (**✔️ SAFE TO MODIFY**): All Next.js App Router endpoints.
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
- `store/` : Zustand global state stores.
- `prisma/` : Database schema.
