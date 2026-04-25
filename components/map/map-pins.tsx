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
 * MapPins — Premium claymorphism-style interactive location markers.
 * Collected pins: vibrant Jeju Blue with glowing ring + checkmark.
 * Uncollected pins: frosted glass with dashed ring + pulsing dot.
 * Each pin has a glassmorphism tooltip on hover.
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
          {/* ── Pin drop shadow (depth) ── */}
          <div className="absolute bottom-0 left-1/2 h-2 w-6 -translate-x-1/2 translate-y-2 rounded-full bg-black/10 blur-[3px]" />

          {/* ── Outer glow ring (only for collected) ── */}
          {pin.collected && (
            <div className="absolute -inset-[5px] animate-ping-slow rounded-full bg-[#3B6CF4]/20 blur-[2px]" />
          )}

          {/* ── Dashed outer ring (uncollected) ── */}
          {!pin.collected && (
            <div
              className="absolute -inset-[3px] rounded-full border border-dashed border-[#8A91B8]/50 animate-spin"
              style={{ animationDuration: "8s" }}
            />
          )}

          {/* ── Pin body ── */}
          <div
            className={`
              relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white
              transition-all duration-200 group-hover:scale-115 group-active:scale-95
              ${pin.collected
                ? "gradient-jeju shadow-[inset_0_3px_6px_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.15),0_6px_20px_rgba(59,108,244,0.40)]"
                : "bg-white/90 backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.80),inset_0_-1px_3px_rgba(174,182,220,0.40),0_4px_12px_rgba(0,0,0,0.08)]"
              }
            `}
          >
            {pin.collected ? (
              /* Checkmark icon */
              <svg className="h-4 w-4 text-white drop-shadow-sm" fill="none" viewBox="0 0 16 16">
                <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              /* Pulsing dot */
              <div className="relative flex items-center justify-center">
                <div className="h-3 w-3 animate-ping rounded-full bg-[#8A91B8]/30 absolute" style={{ animationDuration: "2.5s" }}/>
                <div className="h-2.5 w-2.5 rounded-full bg-[#8A91B8]/60"/>
              </div>
            )}

            {/* Shine overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
          </div>

          {/* ── Pin stem ── */}
          <div
            className={`mx-auto h-2 w-2 rotate-45 -mt-[3px] border-r border-b ${
              pin.collected
                ? "bg-[#2952D9] border-white/20"
                : "bg-white/90 border-[#E0E5F0]"
            }`}
          />

          {/* ── Glassmorphism tooltip ── */}
          <div
            className="pointer-events-none absolute bottom-full left-1/2 mb-4 -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 drop-shadow-[0_4px_12px_rgba(59,108,244,0.20)]"
          >
            <div
              className="flex items-center gap-2 rounded-2xl px-3 py-2 bg-ink/80 backdrop-blur-md backdrop-saturate-[1.8] border border-white/10"
            >
              {/* Status dot */}
              <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${pin.collected ? "bg-[#22C55E]" : "bg-[#8A91B8]"}`}/>
              <span className="text-[12px] font-semibold text-white">{pin.name}</span>
              <span className={`text-[10px] font-medium ${pin.collected ? "text-[#6EE7B7]" : "text-[#8A91B8]"}`}>
                {pin.collected ? "Collected" : "Undiscovered"}
              </span>
            </div>
            {/* Tooltip arrow */}
            <div className="mx-auto h-2 w-2 -mt-1 rotate-45 bg-[rgba(13,18,56,0.80)]" style={{ marginLeft: "calc(50% - 4px)" }}/>
          </div>
        </Link>
      ))}
    </>
  );
});
MapPins.displayName = "MapPins";
