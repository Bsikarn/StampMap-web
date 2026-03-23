"use client";

import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  Bell,
  MapPin,
  Shield,
  Moon,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Smartphone,
  Volume2,
  Navigation,
  Eye,
  Trash2,
  FileText,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Toggle switch component with iOS styling
function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
        enabled ? "bg-stamp-dark-blue" : "bg-gray-300"
      }`}
      aria-label="Toggle setting"
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? "left-[calc(100%-1.625rem)]" : "left-0.5"
        }`}
      />
    </button>
  );
}

// Setting groups configuration
const settingsGroups = [
  {
    title: "Account",
    items: [
      {
        id: "profile",
        icon: User,
        label: "Edit Profile",
        type: "link" as const,
      },
      {
        id: "language",
        icon: Globe,
        label: "Language",
        type: "link" as const,
        value: "English",
      },
      {
        id: "darkmode",
        icon: Moon,
        label: "Dark Mode",
        type: "toggle" as const,
        defaultEnabled: false,
      },
    ],
  },
  {
    title: "Notifications",
    items: [
      {
        id: "push",
        icon: Bell,
        label: "Push Notifications",
        type: "toggle" as const,
        defaultEnabled: true,
      },
      {
        id: "sound",
        icon: Volume2,
        label: "Sound",
        type: "toggle" as const,
        defaultEnabled: true,
      },
      {
        id: "vibration",
        icon: Smartphone,
        label: "Vibration",
        type: "toggle" as const,
        defaultEnabled: false,
      },
    ],
  },
  {
    title: "Location Services",
    items: [
      {
        id: "location",
        icon: MapPin,
        label: "Location Access",
        type: "toggle" as const,
        defaultEnabled: true,
      },
      {
        id: "navigation",
        icon: Navigation,
        label: "Background Navigation",
        type: "toggle" as const,
        defaultEnabled: false,
      },
    ],
  },
  {
    title: "Privacy",
    items: [
      {
        id: "profile_visibility",
        icon: Eye,
        label: "Profile Visibility",
        type: "link" as const,
        value: "Public",
      },
      {
        id: "data_sharing",
        icon: Shield,
        label: "Data Sharing",
        type: "toggle" as const,
        defaultEnabled: false,
      },
      {
        id: "clear_data",
        icon: Trash2,
        label: "Clear Cache Data",
        type: "link" as const,
      },
    ],
  },
  {
    title: "About",
    items: [
      {
        id: "help",
        icon: HelpCircle,
        label: "Help & Support",
        type: "link" as const,
      },
      {
        id: "terms",
        icon: FileText,
        label: "Terms of Service",
        type: "link" as const,
      },
      {
        id: "about",
        icon: Info,
        label: "About StampMap",
        type: "link" as const,
        value: "v1.0.0",
      },
    ],
  },
];

export default function SettingsPage() {
  // Initialize toggle states from defaults
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(
    () => {
      const states: Record<string, boolean> = {};
      settingsGroups.forEach((group) => {
        group.items.forEach((item) => {
          if (item.type === "toggle") {
            states[item.id] = item.defaultEnabled;
          }
        });
      });
      return states;
    }
  );

  const handleToggle = (id: string) => {
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative min-h-dvh bg-gray-50 pb-24">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex w-full flex-col items-center justify-center px-4 py-3 text-center">
          <h1 className="text-xl font-bold text-slate-900 leading-none">
            Settings
          </h1>
          <p className="mt-1.5 text-xs font-medium text-slate-500">
            Manage your application preferences
          </p>
        </div>
      </div>

      {/* Settings groups */}
      <div className="mx-auto max-w-4xl space-y-6 px-5 pt-6">
        {settingsGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2.5 ml-2 text-sm font-bold tracking-wide text-slate-500">
              {group.title}
            </p>
            <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.04]">
              {group.items.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === group.items.length - 1;

                return (
                  <div key={item.id}>
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      {/* Icon */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                        <Icon className="h-4 w-4 text-slate-500" />
                      </div>

                      {/* Label */}
                      <span className="flex-1 text-sm font-medium text-slate-800">
                        {item.label}
                      </span>

                      {/* Control element */}
                      {item.type === "toggle" ? (
                        <Toggle
                          enabled={toggleStates[item.id] ?? false}
                          onToggle={() => handleToggle(item.id)}
                        />
                      ) : (
                        <div className="flex items-center gap-1 text-slate-400">
                          {"value" in item && item.value && (
                            <span className="text-xs">{item.value}</span>
                          )}
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    {!isLast && (
                      <div className="mx-4 h-px bg-slate-100" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-semibold text-red-500 shadow-stamp transition-colors hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          Log Out
        </button>

        {/* Version info */}
        <p className="pb-4 text-center text-xs text-muted-foreground">
          StampMap v1.0.0 • Made with ❤️
        </p>
      </div>
    </div>
  );
}
