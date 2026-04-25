import { ChevronLeft, ChevronRight, MapPin, Calendar, Pencil } from "lucide-react";
import { useState } from "react";

interface StampPageData {
  id: string;
  locationName: string;
  koreanName?: string;
  description: string;
  stampDate: string;
  stamped: boolean;
  imageFallback?: string;
  stampImage?: string;
}

interface EbookViewerProps {
  page: StampPageData;
  currentIndex: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * EbookViewer — Premium glassmorphism stamp book page viewer.
 * Shows location details, a scenic image area, stamp imprint, and memo field.
 * Navigation uses clay-style pill buttons.
 */
export function EbookViewer({ page, currentIndex, totalPages, onNext, onPrev }: EbookViewerProps) {
  // Memo dictionary keyed by page ID
  const [memos, setMemos] = useState<Record<string, string>>({});

  const currentMemo = memos[page.id] !== undefined
    ? memos[page.id]
    : (page.stamped ? page.stampDate : "");

  const handleMemoChange = (val: string) => {
    setMemos(prev => ({ ...prev, [page.id]: val }));
  };

  return (
    <div className="flex w-full flex-col items-center pb-8 animate-stamp-fade-in">

      {/* ══════════════════════════════════
          MAIN PAGE CARD
          ══════════════════════════════════ */}
      <div
        className="w-full max-w-[480px] overflow-hidden rounded-[28px] glass-heavy border-[1.5px] border-white/80 shadow-[0_20px_60px_rgba(59,108,244,0.14),0_6px_20px_rgba(0,0,0,0.06)]"
      >
        {/* ── Page header strip ── */}
        <div
          className="flex items-center justify-between px-6 py-4 bg-gradient-to-br from-brand/8 to-accent-purple/6 border-b border-brand/8"
        >
          <div>
            <h2 className="text-xl font-black text-ink leading-tight">
              {page.locationName}
            </h2>
            {page.koreanName && (
              <p className="text-sm font-semibold text-[#FF7B42] mt-0.5">{page.koreanName}</p>
            )}
          </div>

          {/* Page number badge */}
          <div
            className="flex flex-col items-center rounded-2xl px-3.5 py-2 gradient-jeju shadow-[inset_0_2px_4px_rgba(255,255,255,0.30),0_4px_12px_rgba(59,108,244,0.40)]"
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/70">Page</span>
            <span className="text-lg font-black text-white leading-none">{currentIndex + 1}</span>
          </div>
        </div>

        <div className="px-6 py-5">
          {/* ── Location Image Placeholder ── */}
          <div
            className={`relative mb-5 flex h-48 w-full items-center justify-center overflow-hidden rounded-[18px] border border-brand/10 ${
              page.stamped
                ? "bg-[linear-gradient(135deg,#DBEAFE_0%,#EEF2FF_50%,#F3F0FF_100%)]"
                : "bg-[linear-gradient(135deg,#F2F4FC_0%,#E8EAF6_100%)]"
            }`}
          >
            {/* Decorative landscape SVG */}
            <svg viewBox="0 0 200 120" width="100%" height="100%" className="absolute inset-0 opacity-60">
              {/* Sky gradient */}
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor={page.stamped ? "#BFDBFE" : "#E8EAF6"} />
                  <stop offset="100%" stopColor={page.stamped ? "#EEF2FF" : "#F2F4FC"} />
                </linearGradient>
              </defs>
              <rect width="200" height="120" fill="url(#skyGrad)" />
              {/* Mountains */}
              <path d="M0 90 L40 50 L70 75 L100 35 L130 65 L160 45 L200 80 L200 120 L0 120 Z"
                fill={page.stamped ? "rgba(59,108,244,0.15)" : "rgba(174,182,220,0.25)"}/>
              {/* Water / foreground */}
              <rect x="0" y="95" width="200" height="25"
                fill={page.stamped ? "rgba(59,108,244,0.10)" : "rgba(174,182,220,0.15)"}/>
              {/* Sun */}
              {page.stamped && <circle cx="160" cy="28" r="14" fill="rgba(255,200,50,0.30)"/>}
            </svg>

            {/* Location label overlay */}
            <div
              className="relative z-10 flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-white/75 backdrop-blur-md border border-white/70 shadow-brand-soft"
            >
              <MapPin className="h-3.5 w-3.5 text-brand"/>
              <span className="text-xs font-bold text-ink">{page.locationName}</span>
            </div>
          </div>

          {/* ── Two-column: description + stamp ── */}
          <div className="flex items-start gap-4">

            {/* Left: Description */}
            <div className="flex-[3] text-sm leading-relaxed text-[#3D4875]">
              {page.description}
            </div>

            {/* Right: Stamp + Memo */}
            <div className="flex flex-[2] flex-col gap-3">

              {/* Stamp square */}
              <div
                className={`flex aspect-square items-center justify-center rounded-[16px] ${
                  page.stamped
                    ? "bg-[linear-gradient(135deg,rgba(255,215,100,0.15),rgba(255,180,50,0.10))] border-[1.5px] border-[#FFB432]/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.80)]"
                    : "bg-surface-subtle border-[1.5px] border-dashed border-ink-muted/60"
                }`}
              >
                {page.stamped ? (
                  /* Decorative stamp imprint */
                  <div className="relative flex items-center justify-center h-full w-full p-2">
                    <svg viewBox="0 0 60 60" className="w-full h-full opacity-70" style={{ color: "#B45309" }}>
                      <circle cx="30" cy="30" r="27" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2"/>
                      <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="1.2"/>
                      <text x="30" y="23" textAnchor="middle" fontSize="7" fontWeight="900" fill="currentColor" letterSpacing="2">JEJU</text>
                      <text x="30" y="33" textAnchor="middle" fontSize="5" fontWeight="700" fill="currentColor" letterSpacing="1">ISLAND</text>
                      <text x="30" y="42" textAnchor="middle" fontSize="5" fontWeight="700" fill="currentColor">✦ 제주도 ✦</text>
                    </svg>
                  </div>
                ) : (
                  <span className="text-[11px] font-medium text-[#C4CAE8] text-center px-2">
                    Not yet<br/>stamped
                  </span>
                )}
              </div>

              {/* Memo input */}
              <div
                className="flex items-center gap-2 rounded-[12px] px-3 py-2.5 transition-all focus-within:ring-2 focus-within:ring-brand/20 bg-surface-subtle border border-brand/12"
              >
                <Pencil className="h-3 w-3 shrink-0 text-[#8A91B8]"/>
                <input
                  type="text"
                  value={currentMemo}
                  onChange={(e) => handleMemoChange(e.target.value)}
                  placeholder="Add memo..."
                  className="flex-1 bg-transparent text-[11px] font-medium text-[#3D4875] outline-none placeholder:text-[#C4CAE8]"
                  maxLength={40}
                />
              </div>

              {/* Date chip */}
              {page.stamped && page.stampDate && (
                <div className="flex items-center gap-1.5 rounded-[10px] bg-[#F2F4FC] px-2.5 py-1.5">
                  <Calendar className="h-3 w-3 text-[#8B5CF6]"/>
                  <span className="text-[10px] font-semibold text-[#3D4875]">{page.stampDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          NAVIGATION PILLS
          ══════════════════════════════════ */}
      <div className="mt-7 flex items-center justify-center gap-3">
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 disabled:opacity-40 glass border border-brand/15 text-brand shadow-brand-soft"
        >
          <ChevronLeft className="h-4 w-4"/>
          Prev
        </button>

        {/* Page indicator dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === currentIndex ? "20px" : "6px",
                height: "6px",
                background: i === currentIndex
                  ? "linear-gradient(90deg,#3B6CF4,#8B5CF6)"
                  : "#D4D8F0",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={currentIndex === totalPages - 1}
          className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 disabled:opacity-40 gradient-jeju text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),0_6px_20px_rgba(59,108,244,0.40)]"
        >
          Next
          <ChevronRight className="h-4 w-4"/>
        </button>
      </div>
    </div>
  );
}
