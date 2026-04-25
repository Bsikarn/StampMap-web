"use client";

import { useStampStore } from "@/store/use-stamp-store";
import {
  ChevronDown,
  Check,
  LocateFixed,
  LocateOff,
  Bell,
  X,
  Sparkles,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { JejuMap } from "@/components/map/jeju-map";
import { MapPins } from "@/components/map/map-pins";
import { cn } from "@/lib/utils";

// Mock location data for Jeju Island interactive map
const mapPins = [
  { id: "1", name: "Hallasan Mountain", x: 45, y: 38, collected: true },
  { id: "2", name: "Seongsan Ilchulbong", x: 72, y: 32, collected: true },
  { id: "3", name: "Manjanggul Cave", x: 65, y: 25, collected: true },
  { id: "4", name: "Cheonjiyeon Falls", x: 38, y: 55, collected: false },
  { id: "5", name: "Jeongbang Falls", x: 55, y: 60, collected: false },
  { id: "6", name: "Udo Island", x: 82, y: 30, collected: false },
  { id: "7", name: "Teddy Bear Museum", x: 28, y: 48, collected: false },
];

// Stamp progress stats
const TOTAL_STAMPS = 25;
const COLLECTED_COUNT = 3;
const PROGRESS_PCT = Math.round((COLLECTED_COUNT / TOTAL_STAMPS) * 100);

/**
 * HomePage — Main interactive map view for Jeju Island StampMap.
 * Features:
 * - Premium glassmorphism map selector dropdown
 * - Clay-style location/GPS toggle button
 * - Glassmorphism proximity toast notification
 * - Progress floating widget
 */
export default function HomePage() {
  const { selectedMap, availableMaps, setSelectedMap } = useStampStore();

  // Local UI state
  const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);
  const [isLocationOn, setIsLocationOn] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProgress, setShowProgress] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsMapSelectorOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLocationToggle = () => {
    const next = !isLocationOn;
    setIsLocationOn(next);
    if (next) setShowNotification(true);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden animate-in fade-in duration-300 ease-out">

      {/* ── Map canvas ── */}
      <div className="absolute inset-0">
        <JejuMap>
          <MapPins pins={mapPins} />
        </JejuMap>
      </div>

      {/* ══════════════════════════════════════════
          TOP BAR — Map selector + Location toggle
          ══════════════════════════════════════════ */}
      <div className="absolute left-0 right-0 top-0 z-40 flex items-start justify-between px-4 pt-4 md:px-5 md:pt-5">

        {/* ── Map selector pill (left) ── */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="map-selector-btn"
            onClick={() => setIsMapSelectorOpen(!isMapSelectorOpen)}
            className="flex items-center gap-2.5 rounded-[18px] px-4 py-2.5 text-sm font-bold text-ink transition-all duration-200 active:scale-95 glass shadow-soft border border-white/60"
          >
            {/* Brand icon */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black text-white gradient-jeju">
              ✦
            </div>
            <span className="max-w-[140px] truncate font-semibold">{selectedMap.name}</span>
            <ChevronDown
              className={cn("h-4 w-4 text-ink-muted transition-transform duration-300", isMapSelectorOpen ? "rotate-180" : "")}
            />
          </button>

          {/* ── Dropdown menu ── */}
          {isMapSelectorOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-64 animate-stamp-fade-in overflow-hidden rounded-[20px] glass-heavy border border-white/70 shadow-soft">
              <div className="px-4 pb-2 pt-3.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                  Select Map
                </p>
              </div>
              {availableMaps.map((map) => (
                <button
                  key={map.id}
                  onClick={() => { setSelectedMap(map); setIsMapSelectorOpen(false); }}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-150",
                    selectedMap.id === map.id ? "bg-brand/8" : "hover:bg-surface-subtle"
                  )}
                >
                  {/* Map icon */}
                  <div className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black",
                    selectedMap.id === map.id ? "gradient-jeju text-white" : "bg-surface-subtle text-ink-muted"
                  )}>
                    {map.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-semibold truncate", selectedMap.id === map.id ? "text-brand" : "text-ink")}>
                      {map.name}
                    </p>
                    <p className="text-[11px] text-ink-muted truncate">{map.region}</p>
                  </div>
                  {selectedMap.id === map.id && (
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                  )}
                </button>
              ))}
              <div className="h-2" />
            </div>
          )}
        </div>

        {/* ── Location / GPS toggle (right) ── */}
        <button
          id="location-toggle-btn"
          onClick={handleLocationToggle}
          className={cn(
            "relative flex items-center h-10 w-[84px] rounded-full p-1 font-bold transition-all duration-300 active:scale-95 shadow-soft",
            isLocationOn ? "gradient-jeju text-white" : "glass border border-white/60 text-ink"
          )}
        >
          <div className={cn(
            "absolute w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 shadow-sm z-10",
            isLocationOn ? "translate-x-[44px] text-brand" : "translate-x-0 text-ink-muted"
          )}>
            {isLocationOn ? <LocateFixed className="h-4 w-4" /> : <LocateOff className="h-4 w-4" />}
          </div>
          <span className={cn(
            "absolute text-[11px] tracking-wider transition-all duration-300 pointer-events-none font-black z-0",
            isLocationOn ? "left-[16px] opacity-100" : "right-[14px] opacity-100"
          )}>
            {isLocationOn ? "IN" : "OUT"}
          </span>
        </button>
      </div>

      {/* ══════════════════════════════════
          PROXIMITY TOAST — top-center
          ══════════════════════════════════ */}
      {showNotification && (
        <div className="animate-toast-in fixed left-1/2 -translate-x-1/2 top-[72px] z-[100] flex w-full max-w-[360px] justify-center px-4">
          <div className="relative w-full">
            <Link
              href="/location/4"
              onClick={() => setShowNotification(false)}
              className="flex items-center gap-3 rounded-[20px] pr-10 pl-3.5 py-3 transition-all active:scale-[0.98] glass-heavy border border-white/70 shadow-soft"
            >
              {/* Pulsing icon */}
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-1.5 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-brand/20"
                />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-[14px] text-white gradient-jeju">
                  <Bell className="h-5 w-5" />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-brand truncate leading-tight">
                  Cheonjiyeon Falls
                </p>
                <p className="text-[11px] font-semibold text-ink-muted mt-0.5">
                  📍 You&apos;re nearby — Tap to stamp!
                </p>
              </div>
            </Link>

            {/* Close button */}
            <button
              onClick={(e) => { e.preventDefault(); setShowNotification(false); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-90 bg-surface-subtle text-ink-muted"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          JEJU LABEL — center watermark
          ══════════════════════════════════ */}
      <div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p
          className="font-black tracking-[0.2em] uppercase select-none text-[clamp(1.2rem,3.5vw,2rem)] text-brand/10"
        >
          JEJU ISLAND
        </p>
        <p
          className="font-semibold tracking-[0.25em] uppercase select-none text-[clamp(0.6rem,1.5vw,0.85rem)] text-brand/10"
        >
          제주도
        </p>
      </div>

    </div>
  );
}
