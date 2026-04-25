"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Map, { MapRef, ViewStateChangeEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useAppStore } from "@/store/useAppStore";

interface JejuMapProps {
  children?: React.ReactNode;
}

export function JejuMap({ children }: JejuMapProps) {
  const mapRef = useRef<MapRef>(null);
  
  // Zustand state integration
  const { mapViewState, setMapViewState } = useAppStore();

  const handleMove = useCallback((e: ViewStateChangeEvent) => {
    setMapViewState({
      longitude: e.viewState.longitude,
      latitude: e.viewState.latitude,
      zoom: e.viewState.zoom,
    });
  }, [setMapViewState]);

  // Expose "Zone-to-Zoom" flyTo logic if needed by external buttons
  // Here we hook up map bounds specifically for Jeju Island
  useEffect(() => {
    if (mapRef.current) {
      // Optional: enforce bounds or flyTo initial state if necessary
    }
  }, []);

  return (
    <Map
      ref={mapRef}
      initialViewState={mapViewState}
      onMove={handleMove}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      style={{ width: "100%", height: "100%" }}
      maxBounds={[
        [125.8, 33.1], // Southwest bound of Jeju
        [127.1, 33.6], // Northeast bound of Jeju
      ]}
      minZoom={9}
      maxZoom={18}
      attributionControl={false} // Disable default to keep UI clean
    >
      {children}
    </Map>
  );
}
