# Un-Old-Jeju (StampMap)

An interactive, mobile-first stamp collection map application designed to gamify real-world exploration on Jeju Island. 

## 🏗️ Technology Stack

**Core Frameworks & Languages**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui

**Database & State Management**
- **State Management:** Zustand (Immutable global stores)
- **Database/ORM:** PostgreSQL + Prisma ORM
- **Map Engine:** Mapbox GL JS (`react-map-gl`)

**UI Features**
- **Icons:** Lucide React
- **Animations:** Custom CSS Tailwind Animations (`animate-stamp-slide-up`, `fade-in`, `slide-in-from-right`)

## 🚀 Active Features

- **Interactive Map Dashboard:** Region selection with floating notifications for nearby collectible locations.
- **Location Discovery:** Route-intercepting modals (`@modal`) allow users to read rich location data without losing their map viewport.
- **Stamp Book Collection:** A visual progress tracker of collected stamps mimicking a physical passport.
- **Souvenir Exchange Hub:** Users can redeem collected stamps for physical items by inputting their passport ID.
- **Settings & User Preferences:** Mock options for account controls, notifications, and location tracking configs.
- **Fluid Gesture & Routing UI:** Slide-in animations between nav tabs, and bounce-to-dismiss drag gestures.

## 📁 Directory Structure Breakdown

- `/app`: Contains all Next.js App Router endpoints.
  - `/app/@modal`: Parallel route intercepting `/location/[id]` to display as a modal.
  - `/app/location/[id]`: The standalone detail page (fallback on hard refresh).
- `/components`: Global reusable UI components (Buttons, Modals).
  - `/components/location`: Abstracted star ratings and reviews.
  - `/components/map`: Logic for rendering SVG background and interactive map pins.
  - `/components/settings`: Settings group logic.
  - `/components/souvenir`: Grid item cards and exchange flow modals.
- `/docs`: Project guidelines, setup instructions, and the private knowledge base. **[DO NOT TOUCH / READ ONLY]**
- `/lib`: Helper functions and mock data models (e.g., `mock-data.ts`).
- `/store`: Zustand global state models.
