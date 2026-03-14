"use client";

import { BookOpen, Gift, MapIcon, User, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "book",     label: "Book",     icon: BookOpen, href: "/book" },
  { id: "souvenir", label: "Souvenir", icon: Gift,     href: "/souvenir" },
  { id: "map",      label: "Map",      icon: MapIcon,  href: "/" },
  { id: "profile",  label: "Profile",  icon: User,     href: "/auth" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function BottomNav() {
  const pathname = usePathname();

  const activeId = (() => {
    if (pathname === "/")                    return "map";
    if (pathname.startsWith("/book"))        return "book";
    if (pathname.startsWith("/souvenir"))    return "souvenir";
    if (pathname.startsWith("/auth"))        return "profile";
    if (pathname.startsWith("/settings"))    return "settings";
    return "map";
  })();

  return (
    /* Outer wrapper — stays within max-w-lg centred column on desktop */
    <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 px-3 pb-4 animate-stamp-slide-up">
      <nav className="flex items-center justify-around rounded-2xl bg-white/90 px-1 py-1.5 shadow-card-md backdrop-blur-xl ring-1 ring-black/[0.04]">
        {navItems.map((item) => {
          const active  = activeId === item.id;
          const isCenter = item.id === "map";

          if (isCenter) {
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-label="Map"
                className={`
                  flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200
                  ${active
                    ? "bg-brand text-white shadow-card"
                    : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"}
                `}
              >
                <item.icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8} />
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-all duration-200
                ${active
                  ? "text-brand"
                  : "text-slate-400 hover:text-slate-600"}
              `}
            >
              <item.icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[10px] font-medium transition-all ${active ? "opacity-100" : "opacity-70"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
