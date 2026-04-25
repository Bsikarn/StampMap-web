"use client";

import { BookOpen, Gift, MapIcon, User, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Navigation items configuration: route → label + icon
const navItems = [
  { id: "book",     label: "Book",     icon: BookOpen, href: "/book" },
  { id: "souvenir", label: "Souvenir", icon: Gift,     href: "/souvenir" },
  { id: "map",      label: "Map",      icon: MapIcon,  href: "/" },
  { id: "profile",  label: "Profile",  icon: User,     href: "/auth" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

/**
 * BottomNav — Premium glassmorphism floating navigation bar.
 * Center "Map" item uses a clay 3D raised button style.
 * Active state uses Jeju brand color with subtle glow.
 * Migrated to use Tailwind v4 utilities and cn() helper.
 */
export function BottomNav() {
  const pathname = usePathname();

  // Determine active tab from current route
  const activeId = (() => {
    if (pathname === "/")                 return "map";
    if (pathname.startsWith("/book"))     return "book";
    if (pathname.startsWith("/souvenir")) return "souvenir";
    if (pathname.startsWith("/auth"))     return "profile";
    if (pathname.startsWith("/settings")) return "settings";
    return "map";
  })();

  return (
    /* Outer wrapper: centered, max-width constrained */
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 px-4 pb-5 animate-stamp-slide-up">

      {/* Floating frosted-glass nav container */}
      <nav
        className="glass-heavy flex items-center justify-around rounded-[28px] px-3 py-2 shadow-soft-md border border-white/70"
      >
        {navItems.map((item) => {
          const active   = activeId === item.id;
          const isCenter = item.id === "map";

          // Center Map button — claymorphism 3D raised style
          if (isCenter) {
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-label="Map"
                onClick={(e) => {
                  if (active) { e.preventDefault(); window.location.href = item.href; }
                }}
                className={cn(
                  "relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl",
                  "transition-all duration-200 active:scale-95",
                  active
                    ? "gradient-jeju shadow-soft-md shadow-[inset_0_4px_8px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.15),0_8px_24px_rgba(59,108,244,0.40)]"
                    : "bg-gradient-to-br from-brand-light to-[#E0E8FE] shadow-[inset_0_3px_6px_rgba(255,255,255,0.70),inset_0_-2px_4px_rgba(174,182,220,0.40),0_4px_12px_rgba(59,108,244,0.10)]"
                )}
              >
                <item.icon
                  className={cn("h-6 w-6 transition-all", active ? "text-white" : "text-brand")}
                  strokeWidth={active ? 2.5 : 2}
                />
                {/* Active glow ring */}
                {active && (
                  <div className="absolute -inset-1 rounded-[26px] bg-brand/20 blur-sm" />
                )}
              </Link>
            );
          }

          // Standard peripheral nav items
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => {
                if (active) { e.preventDefault(); window.location.href = item.href; }
              }}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-2xl px-3.5 py-2",
                "transition-all duration-200",
                active ? "text-brand" : "text-ink-muted hover:text-ink-secondary"
              )}
            >
              {/* Icon with subtle active indicator */}
              <div className="relative">
                <item.icon
                  className="h-5 w-5 transition-all"
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {/* Active dot indicator */}
                {active && (
                  <div className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-brand" />
                )}
              </div>
              <span className={cn("text-[10px] font-semibold transition-all", active ? "opacity-100" : "opacity-60")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
