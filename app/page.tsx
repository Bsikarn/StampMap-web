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
import { MapBackground } from "@/components/map/map-background";
import { MapPins } from "@/components/map/map-pins";

// Mock location data for Jeju Island interactive map
const mapPins = [
  { id: "1", name: "Hallasan Mountain",   x: 45, y: 38, collected: true },
  { id: "2", name: "Seongsan Ilchulbong", x: 72, y: 32, collected: true },
  { id: "3", name: "Manjanggul Cave",     x: 65, y: 25, collected: true },
  { id: "4", name: "Cheonjiyeon Falls",   x: 38, y: 55, collected: false },
  { id: "5", name: "Jeongbang Falls",     x: 55, y: 60, collected: false },
  { id: "6", name: "Udo Island",          x: 82, y: 30, collected: false },
  { id: "7", name: "Teddy Bear Museum",   x: 28, y: 48, collected: false },
];

// Stamp progress stats
const TOTAL_STAMPS    = 25;
const COLLECTED_COUNT = 3;
const PROGRESS_PCT    = Math.round((COLLECTED_COUNT / TOTAL_STAMPS) * 100);

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
  const [isLocationOn,      setIsLocationOn]       = useState(false);
  const [showNotification,  setShowNotification]   = useState(false);
  const [showProgress,      setShowProgress]       = useState(true);

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
        <MapBackground />
        <MapPins pins={mapPins} />
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
            className="flex items-center gap-2.5 rounded-[18px] px-4 py-2.5 text-sm font-bold text-[#0D1238] transition-all duration-200 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "0 4px 16px rgba(59,108,244,0.12), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            {/* Brand icon */}
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-black text-white"
              style={{
                background: "linear-gradient(135deg, #3B6CF4 0%, #2952D9 100%)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.35), 0 3px 8px rgba(59,108,244,0.40)",
              }}
            >
              ✦
            </div>
            <span className="max-w-[140px] truncate font-semibold">{selectedMap.name}</span>
            <ChevronDown
              className={`h-4 w-4 text-[#8A91B8] transition-transform duration-300 ${isMapSelectorOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* ── Dropdown menu ── */}
          {isMapSelectorOpen && (
            <div
              className="absolute left-0 top-full z-50 mt-2 w-64 animate-stamp-fade-in overflow-hidden rounded-[20px]"
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(32px) saturate(200%)",
                WebkitBackdropFilter: "blur(32px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.70)",
                boxShadow: "0 16px 48px rgba(59,108,244,0.18), 0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div className="px-4 pb-2 pt-3.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8A91B8]">
                  Select Map
                </p>
              </div>
              {availableMaps.map((map) => (
                <button
                  key={map.id}
                  onClick={() => { setSelectedMap(map); setIsMapSelectorOpen(false); }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                    selectedMap.id === map.id
                      ? "bg-[#3B6CF4]/08"
                      : "hover:bg-[#F2F4FC]"
                  }`}
                >
                  {/* Map icon */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black"
                    style={
                      selectedMap.id === map.id
                        ? { background: "linear-gradient(135deg,#3B6CF4,#2952D9)", color: "#FFF", boxShadow: "0 4px 12px rgba(59,108,244,0.35)" }
                        : { background: "#F2F4FC", color: "#8A91B8" }
                    }
                  >
                    {map.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${selectedMap.id === map.id ? "text-[#3B6CF4]" : "text-[#0D1238]"}`}>
                      {map.name}
                    </p>
                    <p className="text-[11px] text-[#8A91B8] truncate">{map.region}</p>
                  </div>
                  {selectedMap.id === map.id && (
                    <Check className="h-4 w-4 shrink-0 text-[#3B6CF4]" />
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
          className="flex items-center gap-2 rounded-[18px] px-4 py-2.5 text-sm font-bold transition-all duration-300 active:scale-95"
          style={
            isLocationOn
              ? {
                  background: "linear-gradient(135deg, #3B6CF4 0%, #2952D9 100%)",
                  color: "#FFF",
                  boxShadow: "inset 0 3px 6px rgba(255,255,255,0.30), inset 0 -2px 4px rgba(0,0,0,0.12), 0 8px 24px rgba(59,108,244,0.45)",
                }
              : {
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  WebkitBackdropFilter: "blur(24px) saturate(200%)",
                  border: "1px solid rgba(255,255,255,0.65)",
                  color: "#3D4875",
                  boxShadow: "0 4px 16px rgba(59,108,244,0.10), 0 1px 4px rgba(0,0,0,0.04)",
                }
          }
        >
          {isLocationOn
            ? <><LocateFixed className="h-4 w-4"/><span>Live</span></>
            : <><LocateOff   className="h-4 w-4"/><span>Off</span></>
          }
        </button>
      </div>

      {/* ══════════════════════════════════
          PROXIMITY TOAST — top-center
          ══════════════════════════════════ */}
      {showNotification && (
        <div className="animate-toast-in fixed left-0 right-0 top-[72px] z-50 mx-auto flex w-full max-w-[360px] justify-center px-4">
          <div className="relative w-full">
            <Link
              href="/location/4"
              className="flex items-center gap-3 rounded-[20px] pr-10 pl-3.5 py-3 transition-all active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.70)",
                boxShadow: "0 12px 40px rgba(59,108,244,0.18), 0 3px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Pulsing icon */}
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-1.5 animate-ping rounded-full"
                  style={{ background: "rgba(59,108,244,0.20)", animationDuration: "2s" }}
                />
                <div
                  className="relative flex h-11 w-11 items-center justify-center rounded-[14px] text-white"
                  style={{
                    background: "linear-gradient(135deg, #3B6CF4, #2952D9)",
                    boxShadow: "inset 0 3px 6px rgba(255,255,255,0.30), 0 6px 16px rgba(59,108,244,0.40)",
                  }}
                >
                  <Bell className="h-5 w-5" />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-[#3B6CF4] truncate leading-tight">
                  Cheonjiyeon Falls
                </p>
                <p className="text-[11px] font-semibold text-[#8A91B8] mt-0.5">
                  📍 You&apos;re nearby — Tap to stamp!
                </p>
              </div>
            </Link>

            {/* Close button */}
            <button
              onClick={(e) => { e.preventDefault(); setShowNotification(false); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-90"
              style={{ background: "#F2F4FC", color: "#8A91B8" }}
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          PROGRESS FLOATING WIDGET — bottom-right
          ══════════════════════════════════════════════ */}
      {showProgress && (
        <div className="absolute bottom-28 right-4 z-30 animate-stamp-slide-up">
          <div
            className="flex flex-col gap-2 rounded-[20px] p-3.5 w-[150px]"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
              border: "1px solid rgba(255,255,255,0.70)",
              boxShadow: "0 8px 28px rgba(59,108,244,0.14), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#FF7B42]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A91B8]">
                  Progress
                </span>
              </div>
              <button
                onClick={() => setShowProgress(false)}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F2F4FC] text-[#8A91B8] hover:bg-[#E8EAF6] transition-colors"
              >
                <X className="h-3 w-3"/>
              </button>
            </div>

            {/* Big stamp count */}
            <div className="text-center">
              <p className="font-black leading-none text-[#0D1238]" style={{ fontSize: "2.2rem" }}>
                {COLLECTED_COUNT}
                <span className="text-lg text-[#8A91B8] font-semibold">/{TOTAL_STAMPS}</span>
              </p>
              <p className="text-[11px] font-medium text-[#8A91B8]">Stamps</p>
            </div>

            {/* Progress bar */}
            <div className="overflow-hidden rounded-full bg-[#F2F4FC] h-1.5">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${PROGRESS_PCT}%`,
                  background: "linear-gradient(90deg, #3B6CF4, #8B5CF6)",
                }}
              />
            </div>
            <p className="text-center text-[10px] font-bold text-[#3B6CF4]">
              {PROGRESS_PCT}% Complete
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          JEJU LABEL — center watermark
          ══════════════════════════════════ */}
      <div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p
          className="font-black tracking-[0.2em] uppercase select-none"
          style={{ fontSize: "clamp(1.2rem, 3.5vw, 2rem)", color: "rgba(59,108,244,0.10)" }}
        >
          JEJU ISLAND
        </p>
        <p
          className="font-semibold tracking-[0.25em] uppercase select-none"
          style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)", color: "rgba(59,108,244,0.08)" }}
        >
          제주도
        </p>
      </div>

    </div>
  );
}
