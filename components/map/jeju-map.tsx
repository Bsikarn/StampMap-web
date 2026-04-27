"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Map, { MapRef, ViewStateChangeEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useAppStore } from "@/store/useAppStore";
import { useStampStore } from "@/store/use-stamp-store";

interface JejuMapProps {
  children?: React.ReactNode;
}

export function JejuMap({ children }: JejuMapProps) {
  const mapRef = useRef<MapRef>(null);
  
  // Zustand state integration
  const { mapViewState, setMapViewState } = useAppStore();
  const { selectedMap } = useStampStore();

  const handleMove = useCallback((e: ViewStateChangeEvent) => {
    setMapViewState({
      longitude: e.viewState.longitude,
      latitude: e.viewState.latitude,
      zoom: e.viewState.zoom,
    });
  }, [setMapViewState]);

  useEffect(() => {
    if (mapRef.current) {
      if (selectedMap.id === "thailand") {
        mapRef.current.jumpTo({ center: [100.5018, 13.7563], zoom: 5 });
      } else {
        mapRef.current.jumpTo({ center: [126.5412, 33.3765], zoom: 9.5 });
      }
    }
  }, [selectedMap.id]);

  return (
    <Map
      ref={mapRef}
      initialViewState={mapViewState}
      onMove={handleMove}
      mapStyle="https://tiles.openfreemap.org/styles/liberty"
      style={{ width: "100%", height: "100%" }}
      maxBounds={selectedMap.id === "thailand" ? [
        [97.0, 5.0], // Southwest bound of Thailand
        [106.0, 21.0], // Northeast bound of Thailand
      ] : [
        [125.8, 33.1], // Southwest bound of Jeju
        [127.1, 33.6], // Northeast bound of Jeju
      ]}
      minZoom={selectedMap.id === "thailand" ? 4 : 9}
      maxZoom={18}
      attributionControl={false} // Disable default to keep UI clean
    >
      {children}
    </Map>
  );
}
