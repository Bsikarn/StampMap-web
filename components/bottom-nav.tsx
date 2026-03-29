"use client";

import { BookOpen, Gift, MapIcon, User, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Configuration array mapping routes to their respective labels and icons
const navItems = [
  { id: "book",     label: "Book",     icon: BookOpen, href: "/book" },
  { id: "souvenir", label: "Souvenir", icon: Gift,     href: "/souvenir" },
  { id: "map",      label: "Map",      icon: MapIcon,  href: "/" },
  { id: "profile",  label: "Profile",  icon: User,     href: "/auth" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

/**
 * BottomNav Component
 * 
 * A globally persistent navigation bar mounted at the bottom of the screen.
 * Tracks the current URL path to highlight the active menu item dynamically.
 */
export function BottomNav() {
  const pathname = usePathname();

  /**
   * Derives the active item ID by evaluating the current Next.js `pathname`.
   * Evaluated immediately inside an IIFE (Immediately Invoked Function Expression).
   */
  const activeId = (() => {
    if (pathname === "/")                    return "map";
    if (pathname.startsWith("/book"))        return "book";
    if (pathname.startsWith("/souvenir"))    return "souvenir";
    if (pathname.startsWith("/auth"))        return "profile";
    if (pathname.startsWith("/settings"))    return "settings";
    return "map"; // Fallback default
  })();

  return (
    /* Outer wrapper — constrained to a max-width for tablet/desktop views while staying centered */
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 px-3 pb-4 animate-stamp-slide-up">
      {/* Floating glassmorphic container */}
      <nav className="flex items-center justify-around rounded-2xl bg-white/90 px-1 py-1.5 shadow-card-md backdrop-blur-xl ring-1 ring-black/[0.04]">
        {navItems.map((item) => {
          const active  = activeId === item.id;
          const isCenter = item.id === "map";

          // Center item (Map) uses a special emphasized circular styling
          if (isCenter) {
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-label="Map"
                onClick={(e) => {
                  // Hard-refresh if tapping the active tab again to reset states/cache
                  if (active) {
                    e.preventDefault();
                    window.location.href = item.href;
                  }
                }}
                className={`flex h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-brand text-white shadow-card"
                    : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                }`}
              >
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={active ? 2.5 : 1.8} />
              </Link>
            );
          }

          // Standard peripheral tab icons
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => {
                // Hard-refresh if already active
                if (active) {
                  e.preventDefault();
                  window.location.href = item.href;
                }
              }}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 transition-all duration-200 ${
                active
                  ? "text-brand"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <item.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[10px] sm:text-xs md:text-sm font-medium transition-all ${active ? "opacity-100" : "opacity-70"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
