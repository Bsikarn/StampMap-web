import React from "react";

/**
 * MapBackground Component
 * Renders the static SVG-based background of the StampMap application.
 * 
 * We extract this to prevent polluting the main page.tsx file, making it easier
 * to maintain the core logic separated from purely visual elements.
 */
export function MapBackground() {
  return (
    <>
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

      {/* Island landmass — more organic SVG paths */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Water texture circles */}
        <circle cx="10" cy="15" r="3" fill="#C5E2F4" opacity="0.4"/>
        <circle cx="90" cy="75" r="4" fill="#C5E2F4" opacity="0.3"/>
        {/* Main island path */}
        <path d="M18 42 Q22 28 38 26 Q52 22 65 26 Q79 28 84 36 Q88 44 82 54 Q74 64 60 66 Q44 70 30 64 Q16 58 18 42Z"
          fill="#C8E6C0" opacity="0.55"/>
        <path d="M22 42 Q26 32 40 30 Q54 26 66 30 Q78 34 80 42 Q82 52 72 60 Q58 68 42 66 Q26 62 22 48 Z"
          fill="#B4D9AD" opacity="0.45"/>
        {/* Small islands */}
        <ellipse cx="84" cy="30" rx="4.5" ry="3" fill="#C8E6C0" opacity="0.5"/>
        <ellipse cx="19" cy="55" rx="3.5" ry="2.5" fill="#C8E6C0" opacity="0.45"/>
      </svg>
    </>
  );
}
