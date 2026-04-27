import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, LocateFixed, LocateOff } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MapOption } from "@/store/use-stamp-store";

interface TopBarProps {
  selectedMap: MapOption;
  availableMaps: MapOption[];
  setSelectedMap: (map: MapOption) => void;
  isLocationOn: boolean;
  onLocationToggle: () => void;
}

export function TopBar({
  selectedMap,
  availableMaps,
  setSelectedMap,
  isLocationOn,
  onLocationToggle,
}: TopBarProps) {
  const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsMapSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
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
        onClick={onLocationToggle}
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
  );
}
