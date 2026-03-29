import React from "react";
import Link from "next/link";

export interface MapPinData {
  id: string;
  name: string;
  x: number;
  y: number;
  collected: boolean;
}

interface MapPinsProps {
  pins: MapPinData[];
}

/**
 * MapPins Component
 * Renders interactive location markers on the map background.
 * Separating this prevents the main page.tsx from getting cluttered with specific rendering logic.
 */
export const MapPins = React.memo(({ pins }: MapPinsProps) => {
  return (
    <>
      {pins.map((pin) => (
        <Link
          key={pin.id}
          href={`/location/${pin.id}`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          className="group absolute -translate-x-1/2 -translate-y-full"
          aria-label={pin.name}
        >
          {/* Drop shadow layer for depth */}
          <div className="absolute bottom-0 left-1/2 h-2 w-4 -translate-x-1/2 translate-y-1 rounded-full bg-black/10 blur-sm" />
          
          {/* Pin body (Circle) */}
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
          
          {/* Pointer triangle connecting the circle to the exact map point */}
          <div className={`
            mx-auto h-2 w-2 rotate-45 -mt-0.5
            ${pin.collected ? "bg-brand" : "bg-white border border-slate-200"}
          `}/>

          {/* Hover tooltip label */}
          <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-xl bg-slate-900/90 px-3 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100">
            {pin.name}
            <span className={`ml-1.5 text-[10px] font-normal ${pin.collected ? "text-blue-300" : "text-slate-400"}`}>
              {pin.collected ? "✓" : "○"}
            </span>
            {/* Tooltip pointer */}
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900/90"/>
          </div>
        </Link>
      ))}
    </>
  );
});
MapPins.displayName = "MapPins";
