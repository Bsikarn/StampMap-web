# StampMap Web

A premium, mobile-first interactive stamp collection map application. Explore locations, collect stamps via NFC, manage your stamp passport books, and exchange stamps for exclusive souvenirs.

## Tech Stack

### Languages
- TypeScript
- CSS (Tailwind CSS v4)

### Frontend
- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4 with custom design tokens
- shadcn/ui (Button, Card, Dialog, Input, Select, Badge, Tabs, Switch, Progress, Textarea, Popover, Separator)
- Poppins font (Google Fonts via `next/font`)

### State Management
- Zustand v5

### Icons
- Lucide React

### Build Tools
- PostCSS
- ESLint

## Features

- **Splash Screen** — Branded loading screen with pulse animation and auto-redirect
- **Interactive Map View** — Static mockup map with SVG pins (collected/uncollected), proximity notification, map selector dropdown (Jeju, Taiwan, Japan, Thailand, Singapore)
- **Location Details** — Hero image with 3D View button, history section, star ratings, review system with write-a-review form
- **Stamp Book** — Progress tracker with progress bar, passport visualization, stamp detail carousel, NFC scan simulation, success modal
- **Souvenir Exchange** — 2-column product grid with stock badges, stamp exchange modal with passport book selection
- **Authentication** — Login/Sign Up segmented tabs, form inputs with icons, social login (Google, Facebook, Apple)
- **Settings** — Grouped setting sections (Account, Notifications, Location, Privacy, About) with iOS-style toggle switches
- **Bottom Navigation** — Floating nav bar with map selector center button

## Directory Structure

```
stampmap_web/
├── app/
│   ├── globals.css          # Design system (custom colors, shadows, animations)
│   ├── layout.tsx           # Root layout (Poppins font, mobile viewport)
│   ├── page.tsx             # Screen 2: Main Map View (Home)
│   ├── splash/page.tsx      # Screen 1: Splash/Loading
│   ├── location/[id]/page.tsx  # Screen 3: Location Details & Reviews
│   ├── book/page.tsx        # Screen 4: Stamp Book
│   ├── souvenir/page.tsx    # Screen 5: Souvenir Exchange
│   ├── auth/page.tsx        # Screen 6: Authentication
│   └── settings/page.tsx    # Screen 7: Settings
├── components/
│   ├── bottom-nav.tsx       # Bottom navigation bar with map selector
│   └── ui/                  # shadcn/ui components (DO NOT TOUCH)
├── store/
│   └── use-stamp-store.ts   # Zustand global state (stamps, maps, tabs)
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── docs/private/            # Private documentation (Thai)
└── public/                  # Static assets
```

> **DO NOT TOUCH**: `components/ui/` — These are auto-generated shadcn/ui components. Do not manually edit them. Use `npx shadcn@latest add <component>` to add new ones.
