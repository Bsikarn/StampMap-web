"use client";

import { BottomNav } from "@/components/bottom-nav";
import { useStampStore } from "@/store/use-stamp-store";
import {
  ChevronDown,
  Check,
  LocateFixed,
  LocateOff,
  Bell,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const mapPins = [
  { id: "1", name: "Hallasan Mountain",    x: 45, y: 38, collected: true },
  { id: "2", name: "Seongsan Ilchulbong",  x: 72, y: 32, collected: true },
  { id: "3", name: "Manjanggul Cave",      x: 65, y: 25, collected: true },
  { id: "4", name: "Cheonjiyeon Falls",    x: 38, y: 55, collected: false },
  { id: "5", name: "Jeongbang Falls",      x: 55, y: 60, collected: false },
  { id: "6", name: "Udo Island",           x: 82, y: 30, collected: false },
  { id: "7", name: "Teddy Bear Museum",    x: 28, y: 48, collected: false },
];

export default function HomePage() {
  const { selectedMap, availableMaps, setSelectedMap } = useStampStore();
  const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);
  const [isLocationOn, setIsLocationOn]           = useState(false);
  const [showNotification, setShowNotification]   = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsMapSelectorOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = () => {
    const next = !isLocationOn;
    setIsLocationOn(next);
    setShowNotification(next);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden">

      {/* ── Map background ── */}
      <div className="absolute inset-0 bg-[#E8F4FD]">
        {/* Subtle road/grid lines */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="roads" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#B8D9EF" strokeWidth="0.6"/>
            </pattern>
            <pattern id="roads2" width="240" height="240" patternUnits="userSpaceOnUse">
              <path d="M 240 0 L 0 0 0 240" fill="none" stroke="#A3C8E4" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roads)"/>
          <rect width="100%" height="100%" fill="url(#roads2)"/>
        </svg>

        {/* Island landmass — more organic */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Water texture circles */}
          <circle cx="10" cy="15" r="3" fill="#C5E2F4" opacity="0.4"/>
          <circle cx="90" cy="75" r="4" fill="#C5E2F4" opacity="0.3"/>
          {/* Main island */}
          <path d="M18 42 Q22 28 38 26 Q52 22 65 26 Q79 28 84 36 Q88 44 82 54 Q74 64 60 66 Q44 70 30 64 Q16 58 18 42Z"
            fill="#C8E6C0" opacity="0.55"/>
          <path d="M22 42 Q26 32 40 30 Q54 26 66 30 Q78 34 80 42 Q82 52 72 60 Q58 68 42 66 Q26 62 22 48 Z"
            fill="#B4D9AD" opacity="0.45"/>
          {/* Small islands */}
          <ellipse cx="84" cy="30" rx="4.5" ry="3" fill="#C8E6C0" opacity="0.5"/>
          <ellipse cx="19" cy="55" rx="3.5" ry="2.5" fill="#C8E6C0" opacity="0.45"/>
        </svg>

        {/* Map pins */}
        {mapPins.map((pin) => (
          <Link
            key={pin.id}
            href={`/location/${pin.id}`}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-full"
            aria-label={pin.name}
          >
            {/* Drop shadow layer */}
            <div className="absolute bottom-0 left-1/2 h-2 w-4 -translate-x-1/2 translate-y-1 rounded-full bg-black/10 blur-sm" />
            {/* Pin body */}
            <div className={`
              flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-card-md
              transition-transform duration-150 group-hover:scale-115 group-active:scale-95
              ${pin.collected ? "bg-brand" : "bg-white"}
            `}>
              {pin.collected
                ? <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 14 14"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <div className="h-2.5 w-2.5 rounded-full bg-slate-300"/>
              }
            </div>
            {/* Pointer triangle */}
            <div className={`
              mx-auto h-2 w-2 rotate-45 -mt-0.5
              ${pin.collected ? "bg-brand" : "bg-white border border-slate-200"}
            `}/>

            {/* Hover label */}
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-xl bg-slate-900/90 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100">
              {pin.name}
              <span className={`ml-1.5 text-[10px] font-normal ${pin.collected ? "text-blue-300" : "text-slate-400"}`}>
                {pin.collected ? "✓" : "○"}
              </span>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900/90"/>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Top bar ── */}
      <div className="absolute left-0 right-0 top-0 z-40 flex items-start justify-between px-4 pt-4 md:px-6 md:pt-6">
        
        {/* Map selector pill — left */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="map-selector-btn"
            onClick={() => setIsMapSelectorOpen(!isMapSelectorOpen)}
            className="glass flex items-center gap-2.5 sm:gap-3 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-bold text-slate-800 shadow-card transition-all hover:shadow-card-md active:scale-95"
          >
            <span className="flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-brand text-[11px] sm:text-[13px] md:text-sm font-bold text-white shadow-sm">
              ✦
            </span>
            <span className="max-w-[130px] sm:max-w-[180px] md:max-w-[220px] truncate">{selectedMap.name}</span>
            <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 ${isMapSelectorOpen ? "rotate-180" : ""}`}/>
          </button>

          {isMapSelectorOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-64 origin-top-left animate-stamp-fade-in overflow-hidden rounded-2xl bg-white shadow-card-lg ring-1 ring-black/[0.04]">
              <div className="px-3 pb-1.5 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Select map</p>
              </div>
              {availableMaps.map((map) => (
                <button
                  key={map.id}
                  onClick={() => { setSelectedMap(map); setIsMapSelectorOpen(false); }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                    selectedMap.id === map.id
                      ? "bg-brand/8 text-brand"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    selectedMap.id === map.id ? "bg-brand text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {map.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight">{map.name}</p>
                    <p className="text-[11px] text-slate-400">{map.region}</p>
                  </div>
                  {selectedMap.id === map.id && <Check className="h-4 w-4 text-brand"/>}
                </button>
              ))}
              <div className="h-3"/>
            </div>
          )}
        </div>

        {/* IN/OUT toggle — pinned right */}
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 sm:gap-2.5 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-bold shadow-card transition-all duration-300 active:scale-95 ${
            isLocationOn
              ? "bg-brand text-white shadow-card-md"
              : "glass text-slate-600 hover:text-slate-800"
          }`}
        >
          {isLocationOn
            ? <><LocateFixed className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"/><span>IN</span></>
            : <><LocateOff   className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"/><span>OUT</span></>
          }
        </button>
      </div>

      {/* ── Proximity toast — top center compact ── */}
      {showNotification && (
        <div className="animate-toast-in fixed left-0 right-0 mx-auto top-4 sm:top-6 md:top-8 z-50 w-full max-w-sm px-4">
          <div className="glass relative flex items-center gap-3 sm:gap-4 rounded-xl p-3 sm:p-4 shadow-card-lg ring-1 ring-black/[0.06]">
            
            {/* Icon */}
            <div className="relative shrink-0">
               <div className="absolute -inset-2 animate-ping rounded-full bg-brand/20" style={{ animationDuration: "2s" }}/>
               <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-brand text-white shadow-md">
                 <Bell className="h-5 w-5" />
               </div>
            </div>
            
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-none mb-1">Location Nearby!</p>
              <p className="truncate text-xs sm:text-sm text-slate-600">Near <span className="font-semibold text-brand">Cheonjiyeon Falls</span></p>
            </div>
            
            {/* Actions */}
            <Link
              href="/location/4"
              className="shrink-0 rounded-xl bg-brand px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
            >
              Collect
            </Link>

            {/* Close button */}
            <button 
              onClick={() => setShowNotification(false)}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ring-1 ring-black/5 hover:text-slate-600"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
