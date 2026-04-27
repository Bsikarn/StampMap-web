"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Bell,
  MapPin,
  Shield,
  Moon,
  Globe,
  HelpCircle,
  LogOut,
  Smartphone,
  Volume2,
  Navigation,
  Eye,
  Trash2,
  FileText,
  Info,
  User,
} from "lucide-react";
import { useState } from "react";
import { SettingsGroup } from "@/components/settings/settings-group";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useStampStore } from "@/store/use-stamp-store";

// Setting groups configuration
const settingsGroups = [
  {
    title: "Account",
    items: [
      { id: "profile",  icon: User,       label: "Edit Profile",  type: "link"   as const },
      { id: "language", icon: Globe,       label: "Language",      type: "link"   as const, value: "English" },
      { id: "darkmode", icon: Moon,        label: "Dark Mode",     type: "toggle" as const, defaultEnabled: false },
    ],
  },
  {
    title: "Notifications",
    items: [
      { id: "push",      icon: Bell,       label: "Push Notifications",   type: "toggle" as const, defaultEnabled: true  },
      { id: "sound",     icon: Volume2,    label: "Sound",                type: "toggle" as const, defaultEnabled: true  },
      { id: "vibration", icon: Smartphone, label: "Vibration",            type: "toggle" as const, defaultEnabled: false },
    ],
  },
  {
    title: "Location Services",
    items: [
      { id: "location",   icon: MapPin,    label: "Location Access",       type: "toggle" as const, defaultEnabled: true  },
      { id: "navigation", icon: Navigation,label: "Background Navigation", type: "toggle" as const, defaultEnabled: false },
    ],
  },
  {
    title: "Privacy",
    items: [
      { id: "profile_visibility", icon: Eye,    label: "Profile Visibility", type: "link"   as const, value: "Public" },
      { id: "data_sharing",       icon: Shield, label: "Data Sharing",       type: "toggle" as const, defaultEnabled: false },
      { id: "clear_data",         icon: Trash2, label: "Clear Cache Data",   type: "link"   as const },
    ],
  },
  {
    title: "About",
    items: [
      { id: "help",  icon: HelpCircle, label: "Help & Support",    type: "link" as const },
      { id: "terms", icon: FileText,   label: "Terms of Service",  type: "link" as const },
      { id: "about", icon: Info,       label: "About StampMap",    type: "link" as const, value: "v1.0.0" },
    ],
  },
];

/**
 * SettingsPage — App preferences and configuration screen.
 * Migrated header to match Stamp Book / Souvenir Exchange header design.
 * Uses Tailwind v4 design tokens and shadcn/ui Button.
 */
export default function SettingsPage() {
  // Initialize toggle states from default values
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(
    () => {
      const states: Record<string, boolean> = {};
      settingsGroups.forEach((group) => {
        group.items.forEach((item) => {
          if (item.type === "toggle") {
            states[item.id] = item.defaultEnabled ?? false;
          }
        });
      });
      return states;
    }
  );

  const router = useRouter();
  const supabase = createClient();
  const { setUserId } = useStampStore();

  const handleToggle = (id: string) => {
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setUserId(null);
    router.push("/auth");
  };

  return (
    <div className="relative min-h-dvh bg-transparent pb-28 animate-in fade-in slide-in-from-right-4 duration-300 ease-out">

      {/* ── Glassmorphism sticky header (matches Stamp Book pattern) ── */}
      <div className="sticky top-0 z-40 glass-heavy shadow-soft border-b border-brand/8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3.5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-muted">
              Preferences
            </p>
            <h1 className="text-lg font-black text-ink leading-tight">Settings</h1>
            <p className="text-xs font-medium text-ink-muted mt-0.5">
              Manage your application preferences
            </p>
          </div>
        </div>
      </div>

      {/* Settings groups list */}
      <div className="mx-auto max-w-4xl space-y-6 px-5 pt-6">
        {settingsGroups.map((group) => (
          <SettingsGroup
            key={group.title}
            group={group}
            toggleStates={toggleStates}
            onToggle={handleToggle}
          />
        ))}

        {/* Logout button — shadcn/ui Button with destructive variant */}
        <Button
          variant="outline"
          onClick={handleLogOut}
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 h-auto text-sm font-semibold text-destructive border-destructive/20 hover:bg-destructive/5 hover:text-destructive glass"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>

        {/* Version info */}
        <p className="pb-4 text-center text-xs text-ink-muted">
          StampMap v1.0.0 • Made with ❤️
        </p>
      </div>
    </div>
  );
}
