"use client";

import { useStampStore } from "@/store/use-stamp-store";
import { useState, useEffect } from "react";
import { JejuMap } from "@/components/map/jeju-map";
import { MapPins } from "@/components/map/map-pins";
import { TopBar } from "@/components/home/top-bar";
import { ProximityToast } from "@/components/home/proximity-toast";

/**
 * HomePage — Main interactive map view for Jeju Island StampMap.
 * Features:
 * - Premium glassmorphism map selector dropdown
 * - Clay-style location/GPS toggle button
 * - Glassmorphism proximity toast notification
 */
export default function HomePage() {
  const { selectedMap, availableMaps, setSelectedMap, locations, fetchLocations } = useStampStore();

  // Fetch locations from DB when map selection changes
  useEffect(() => {
    fetchLocations(selectedMap.name);
  }, [fetchLocations, selectedMap.name]);

  // Local UI state
  const [isLocationOn, setIsLocationOn] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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
          <MapPins pins={locations} />
        </JejuMap>
      </div>

      <TopBar
        selectedMap={selectedMap}
        availableMaps={availableMaps}
        setSelectedMap={setSelectedMap}
        isLocationOn={isLocationOn}
        onLocationToggle={handleLocationToggle}
      />

      {showNotification && (
        <ProximityToast
          locations={locations}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* ══════════════════════════════════
          JEJU LABEL — center watermark
          ══════════════════════════════════ */}
      <div className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p
          className="font-black tracking-[0.2em] uppercase select-none text-[clamp(1.2rem,3.5vw,2rem)] text-brand/10"
        >
          {selectedMap.id === "thailand" ? "THAILAND" : "JEJU ISLAND"}
        </p>
        <p
          className="font-semibold tracking-[0.25em] uppercase select-none text-[clamp(0.6rem,1.5vw,0.85rem)] text-brand/10"
        >
          {selectedMap.id === "thailand" ? "ประเทศไทย" : "제주도"}
        </p>
      </div>

    </div>
  );
}
