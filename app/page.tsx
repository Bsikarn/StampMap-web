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
import { MapBackground } from "@/components/map/map-background";
import { MapPins } from "@/components/map/map-pins";

// Using mock data for initial development
const mapPins = [
  { id: "1", name: "Hallasan Mountain",    x: 45, y: 38, collected: true },
  { id: "2", name: "Seongsan Ilchulbong",  x: 72, y: 32, collected: true },
  { id: "3", name: "Manjanggul Cave",      x: 65, y: 25, collected: true },
  { id: "4", name: "Cheonjiyeon Falls",    x: 38, y: 55, collected: false },
  { id: "5", name: "Jeongbang Falls",      x: 55, y: 60, collected: false },
  { id: "6", name: "Udo Island",           x: 82, y: 30, collected: false },
  { id: "7", name: "Teddy Bear Museum",    x: 28, y: 48, collected: false },
];

/**
 * HomePage Component
 * 
 * Serves as the main entry point for the StampMap application. It displays the interactive map,
 * handles location toggling, map region selection, and shows proximity notifications.
 */
export default function HomePage() {
  // Global state from Zustand store
  const { selectedMap, availableMaps, setSelectedMap } = useStampStore();
  
  // Local UI state
  const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);
  const [isLocationOn, setIsLocationOn]           = useState(false);
  const [showNotification, setShowNotification]   = useState(false);
  
  // Ref for handling clicks outside the dropdown selector
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Effect hook to close the map selector dropdown when the user clicks anywhere outside of it.
   * This improves UX by allowing users to dismiss menus intuitively.
   */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // If we clicked outside the dropdownRef boundaries, close the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsMapSelectorOpen(false);
    };
    
    document.addEventListener("mousedown", handler);
    // Cleanup event listener on unmount to prevent memory leaks
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /**
   * Toggles the user's location tracking service.
   * For the mock implementation, turning location ON also triggers a nearby notification.
   */
  const handleToggle = () => {
    const next = !isLocationOn;
    setIsLocationOn(next);
    setShowNotification(next);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden animate-in fade-in duration-300 ease-out">

      {/* ── Map background ── */}
      <div className="absolute inset-0 bg-[#E8F4FD]">
        <MapBackground />
        <MapPins pins={mapPins} />
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
        <div className="animate-toast-in fixed left-0 right-0 mx-auto top-4 sm:top-6 md:top-8 z-50 w-full max-w-[340px] px-4 flex justify-center text-left">
          <div className="relative inline-flex w-full">
            <Link
              href="/location/4"
              className="glass flex-1 flex items-center gap-3 rounded-full pr-10 pl-3 py-2.5 sm:py-3 shadow-card-lg ring-1 ring-black/[0.06] hover:bg-white/80 transition-colors"
            >
              {/* Icon */}
              <div className="relative shrink-0">
                 <div className="absolute -inset-1 animate-ping rounded-full bg-brand/20" style={{ animationDuration: "2s" }}/>
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-md">
                   <Bell className="h-5 w-5" />
                 </div>
              </div>
              
              {/* Text */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="truncate text-[15px] sm:text-[17px] font-bold text-brand leading-tight">Cheonjiyeon Falls</p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-tight mt-[1px]">Location Nearby!</p>
              </div>
            </Link>

            {/* Close button */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                setShowNotification(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors shadow-sm"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
