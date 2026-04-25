import { Calendar, Stamp } from "lucide-react";

interface BookCoverProps {
  onClick: () => void;
  title?: string;
  subtitle?: string;
  date?: string;
}

/**
 * BookCover — Premium 3D claymorphism stamp book cover card.
 * Uses warm orange gradient (Jeju tangerine / clay-orange theme) with:
 * - Glossy inset highlight for 3D depth
 * - Embossed title typography
 * - Circular emblem with Hallasan island motif
 * - Date display strip
 * Migrated to use Tailwind v4 utilities where applicable.
 */
export function BookCover({
  onClick,
  title    = "UN-OLD-JEJU",
  subtitle = "STAMPBOOK",
  date     = "2024-01-15",
}: BookCoverProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full max-w-[340px] overflow-hidden rounded-[28px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-[linear-gradient(145deg,#FF9A5C_0%,#FF7B42_40%,#E8612A_100%)] shadow-[inset_0_6px_14px_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(0,0,0,0.15),0_24px_60px_rgba(255,123,66,0.40),0_8px_20px_rgba(0,0,0,0.08)]"
    >
      {/* ── Subtle dot texture ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:8px_8px]"
      />

      {/* ── Top gloss shine ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] bg-gradient-to-b from-white/25 to-transparent"
      />

      <div className="relative z-10 flex flex-col items-center px-8 pb-8 pt-7">

        {/* ── Title block ── */}
        <div className="flex flex-col items-center">
          <div className="text-[10px] font-black tracking-[0.35em] uppercase text-white/60 mb-1">
            JEJU ISLAND
          </div>
          <h2
            className="font-black text-white drop-shadow-md leading-none text-center text-[1.75rem] tracking-wide drop-shadow-[2px_4px_0_rgba(150,60,10,0.40)] [text-shadow:0_1px_0_rgba(255,255,255,0.30)]"
          >
            {title}
          </h2>
          <h3
            className="font-black leading-none mt-0.5 text-center text-[2rem] text-[#FFD770] drop-shadow-[2px_4px_0_rgba(150,60,10,0.40)] tracking-[0.05em]"
          >
            {subtitle}
          </h3>
        </div>

        {/* ── Circular emblem ── */}
        <div className="relative mt-6 flex h-[148px] w-[148px] items-center justify-center">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-white/50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.15),0_0_0_2px_rgba(255,150,80,0.60)]"
          />
          {/* Inner fill */}
          <div
            className="absolute inset-[6px] rounded-full bg-white/10 border-[1.5px] border-white/30"
          />

          {/* Emblem content */}
          <div className="relative z-10 flex flex-col items-center text-center px-3">
            {/* Hallasan mountain SVG silhouette */}
            <svg viewBox="0 0 60 40" width="56" height="36" className="drop-shadow-sm">
              <path d="M5 38 L20 16 L30 22 L38 8 L55 38 Z" fill="rgba(255,255,255,0.85)" />
              <path d="M35 12 L38 8 L41 14 Z" fill="white" opacity="0.95" />
              <circle cx="49" cy="12" r="5" fill="#FFD770" opacity="0.90" />
            </svg>
            <p className="text-[8px] font-black text-white tracking-[0.15em] uppercase leading-tight mt-1">
              Heritage of<br />Jeju Island
            </p>
          </div>
        </div>

        {/* ── Date strip ── */}
        <div
          className="mt-7 flex w-full items-center justify-between rounded-xl px-3 py-2.5 bg-black/10 border border-white/20"
        >
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-white/70" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-white/70 uppercase">Date</span>
          </div>
          <div
            className="rounded-lg px-3 py-1.5 text-sm font-bold text-ink bg-white/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.10)]"
          >
            {date}
          </div>
        </div>

        {/* ── "Tap to open" CTA ── */}
        <div className="mt-4 flex items-center gap-1.5 opacity-60">
          <Stamp className="h-3.5 w-3.5 text-white" />
          <p className="text-[10px] font-semibold tracking-wide text-white">
            Tap to view stamp pages
          </p>
        </div>
      </div>
    </button>
  );
}
