import React from "react";

/**
 * MapBackground — Premium SVG map backdrop for Jeju Island.
 * Features a stylized Jeju Island silhouette with:
 * - Ocean gradient fill (Jeju Blue tones)
 * - Delicate topographic contour lines (Hallasan mountain)
 * - Floating cloud shapes and texture elements
 * - Gentle wave patterns representing the surrounding sea
 */
export function MapBackground() {
  return (
    <>
      {/* ── Ocean base — layered gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #E8F0FE 0%, #EEF6FF 40%, #F0F4FF 60%, #EAF0FF 100%)",
        }}
      />

      {/* ── Subtle dot grid pattern ── */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotgrid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#3B6CF4" opacity="0.25"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* ── Ocean wave bands ── */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="#DBEAFE" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#EEF2FF" stopOpacity="0.2"/>
          </radialGradient>
        </defs>
        {/* Concentric wave arcs suggesting ocean depth */}
        <ellipse cx="50%" cy="50%" rx="48%" ry="38%" fill="none" stroke="#BFDBFE" strokeWidth="1" opacity="0.40"/>
        <ellipse cx="50%" cy="50%" rx="40%" ry="31%" fill="none" stroke="#BFDBFE" strokeWidth="0.7" opacity="0.30"/>
        <ellipse cx="50%" cy="50%" rx="32%" ry="24%" fill="none" stroke="#C7D2FE" strokeWidth="0.5" opacity="0.25"/>
        <rect width="100%" height="100%" fill="url(#oceanGrad)" />
      </svg>

      {/* ── Jeju Island landmass — stylized SVG ── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Island fill gradient: lush green to soft yellow-green */}
          <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#86EFAC" stopOpacity="0.65"/>
            <stop offset="50%"  stopColor="#6EE7B7" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.50"/>
          </linearGradient>
          {/* Inner highland gradient (Hallasan centre) */}
          <radialGradient id="highlandGrad" cx="44%" cy="40%" r="30%">
            <stop offset="0%"   stopColor="#34D399" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0"/>
          </radialGradient>
          {/* Ocean shimmer near coast */}
          <radialGradient id="coastGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#93C5FD" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Coastal glow halo */}
        <ellipse cx="50" cy="45" rx="38" ry="26" fill="url(#coastGlow)" />

        {/* Main island body — realistic Jeju silhouette approximation */}
        <path
          d="M 17 44 Q 19 30 28 27 Q 38 23 50 22 Q 62 21 71 25 Q 81 29 85 38 Q 89 47 84 56 Q 77 66 64 68 Q 50 71 36 68 Q 22 63 16 53 Q 14 48 17 44 Z"
          fill="url(#islandGrad)"
        />

        {/* Hallasan highland highlight */}
        <ellipse cx="44" cy="40" rx="14" ry="10" fill="url(#highlandGrad)" />

        {/* Second island layer (depth) */}
        <path
          d="M 20 44 Q 22 33 30 30 Q 40 26 51 25 Q 62 24 70 28 Q 79 32 82 40 Q 85 48 80 56 Q 72 64 59 66 Q 45 69 32 65 Q 20 60 19 52 Q 18 48 20 44 Z"
          fill="#A7F3D0"
          opacity="0.30"
        />

        {/* Udo Island (small eastern isle) */}
        <ellipse cx="87" cy="32" rx="4.5" ry="2.8" fill="#86EFAC" opacity="0.60"/>
        <ellipse cx="87" cy="32" rx="3.2" ry="1.8" fill="#6EE7B7" opacity="0.45"/>

        {/* Biyangdo Island (small western isle) */}
        <ellipse cx="16" cy="37" rx="2.8" ry="1.8" fill="#86EFAC" opacity="0.55"/>

        {/* Marado Island (southern) */}
        <ellipse cx="38" cy="72" rx="2" ry="1.2" fill="#86EFAC" opacity="0.45"/>

        {/* Topographic contour lines on Hallasan */}
        <path d="M 36 38 Q 39 33 44 33 Q 50 33 54 37 Q 57 41 54 45 Q 50 49 44 49 Q 38 49 36 44 Q 34 41 36 38 Z"
          fill="none" stroke="#34D399" strokeWidth="0.4" opacity="0.50"/>
        <path d="M 38 40 Q 41 36 44 36 Q 49 36 52 39 Q 54 42 52 45 Q 49 48 44 48 Q 39 48 38 44 Q 37 42 38 40 Z"
          fill="none" stroke="#34D399" strokeWidth="0.3" opacity="0.40"/>
      </svg>

      {/* ── Floating cloud shapes (decorative) ── */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <ellipse cx="8"  cy="10" rx="6"   ry="2.5" fill="white" opacity="0.50"/>
        <ellipse cx="11" cy="9"  rx="4"   ry="2"   fill="white" opacity="0.40"/>
        <ellipse cx="92" cy="80" rx="5.5" ry="2.2" fill="white" opacity="0.45"/>
        <ellipse cx="89" cy="79" rx="3.5" ry="1.8" fill="white" opacity="0.35"/>
        <ellipse cx="20" cy="70" rx="4"   ry="1.8" fill="white" opacity="0.30"/>
      </svg>

      {/* ── Compass rose (decorative, bottom-right) ── */}
      <div className="pointer-events-none absolute bottom-24 right-5 opacity-20 sm:opacity-30">
        <svg viewBox="0 0 40 40" width="40" height="40" className="text-[#3B6CF4]">
          {/* N */}
          <polygon points="20,2 17,18 23,18" fill="currentColor" opacity="0.9"/>
          {/* S */}
          <polygon points="20,38 17,22 23,22" fill="currentColor" opacity="0.4"/>
          {/* W */}
          <polygon points="2,20 18,17 18,23" fill="currentColor" opacity="0.4"/>
          {/* E */}
          <polygon points="38,20 22,17 22,23" fill="currentColor" opacity="0.9"/>
          <circle cx="20" cy="20" r="2.5" fill="currentColor"/>
          <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1.5 1.5"/>
        </svg>
      </div>

      {/* ── Scale bar (decorative, bottom-left) ── */}
      <div className="pointer-events-none absolute bottom-24 left-5 opacity-25">
        <div className="flex flex-col items-start gap-0.5">
          <div className="flex">
            <div className="h-[5px] w-6 border border-[#3B6CF4] bg-[#3B6CF4]"/>
            <div className="h-[5px] w-6 border border-[#3B6CF4] bg-white"/>
          </div>
          <span className="text-[8px] font-semibold text-[#3B6CF4]">5 km</span>
        </div>
      </div>
    </>
  );
}
