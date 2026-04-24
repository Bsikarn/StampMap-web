"use client";

import { BookOpen, Gift, MapIcon, User, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        className="flex items-center justify-around rounded-[28px] px-3 py-2"
        style={{
          background: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.70)",
          boxShadow:
            "0 8px 32px rgba(59, 108, 244, 0.12), 0 2px 8px rgba(0,0,0,0.04)",
        }}
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
                className="relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl transition-all duration-200 active:scale-95"
                style={{
                  background: active
                    ? "linear-gradient(135deg, #3B6CF4 0%, #2952D9 100%)"
                    : "linear-gradient(135deg, #EEF2FF 0%, #E0E8FE 100%)",
                  boxShadow: active
                    ? "inset 0 4px 8px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(0,0,0,0.15), 0 8px 24px rgba(59,108,244,0.40)"
                    : "inset 0 3px 6px rgba(255,255,255,0.70), inset 0 -2px 4px rgba(174,182,220,0.40), 0 4px 12px rgba(59,108,244,0.10)",
                }}
              >
                <item.icon
                  className={`h-6 w-6 transition-all ${active ? "text-white" : "text-[#3B6CF4]"}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                {/* Active glow ring */}
                {active && (
                  <div className="absolute -inset-1 rounded-[26px] bg-[#3B6CF4]/20 blur-sm" />
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
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-3.5 py-2 transition-all duration-200 ${
                active ? "text-[#3B6CF4]" : "text-[#8A91B8] hover:text-[#3D4875]"
              }`}
            >
              {/* Icon with subtle active indicator */}
              <div className="relative">
                <item.icon
                  className="h-5 w-5 transition-all"
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {/* Active dot indicator */}
                {active && (
                  <div className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#3B6CF4]" />
                )}
              </div>
              <span className={`text-[10px] font-semibold transition-all ${active ? "opacity-100" : "opacity-60"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
