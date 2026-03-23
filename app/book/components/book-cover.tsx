import { Calendar } from "lucide-react";

interface BookCoverProps {
  onClick: () => void;
  title?: string;
  subtitle?: string;
  date?: string;
}

export function BookCover({ onClick, title = "UN-OLD-JEJU", subtitle = "STAMPBOOK", date = "2024-01-15" }: BookCoverProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-[360px] flex-col items-center overflow-hidden rounded-xl bg-gradient-to-b from-[#FFF3D6] to-[#FFB74D] p-8 shadow-card-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Decorative dots pattern (subtle) */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "8px 8px" }} />

      {/* Bubbly Title */}
      <div className="relative z-10 flex flex-col items-center drop-shadow-md">
        <h2 className="font-black tracking-wider text-white" style={{ WebkitTextStroke: "1.5px #1E3A8A", textShadow: "3px 3px 0 #1E3A8A", fontSize: "1.9rem", lineHeight: "1.1" }}>
          {title}
        </h2>
        <h2 className="font-black tracking-wider text-[#FFD54F]" style={{ WebkitTextStroke: "1.5px #1E3A8A", textShadow: "3px 3px 0 #1E3A8A", fontSize: "2.2rem", lineHeight: "1" }}>
          {subtitle}
        </h2>
        {/* Sparkle decoration */}
        <div className="absolute -left-4 -top-2 h-3 w-3 rotate-45 bg-[#FFD54F]" />
      </div>

      {/* Center Emblem Placehoder */}
      <div className="relative z-10 mt-8 flex h-44 w-44 items-center justify-center rounded-full border-[4px] border-[#D84315] bg-[#FFF8E1] shadow-inner">
        <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-[3px] border-[#D84315] p-2 text-center text-[#D84315]">
          <span className="text-xs font-bold tracking-widest">{title}</span>
          {/* Tree icon mockup */}
          <div className="my-2 flex items-end justify-center">
            <div className="h-8 w-10 rounded-t-full bg-[#1E3A8A]" />
            <div className="h-4 w-5 bg-[#1E3A8A]" />
          </div>
          <div className="mb-2 h-4 w-20 bg-[#1E3A8A]" />
          <span className="text-[9px] leading-[11px] font-bold">Unique Old Temples of<br/>Jeju Heritage</span>
          <span className="mt-1.5 text-[10px] font-black">ECE-ENG-KMUTNB</span>
        </div>
      </div>

      {/* Date Box */}
      <div className="relative z-10 mt-10 flex w-full items-center justify-between px-3">
        <span className="text-sm font-bold tracking-widest text-white drop-shadow-sm">DATE :</span>
        <div className="w-32 bg-white px-3 py-2 text-center text-sm font-bold text-slate-800 shadow-sm rounded-sm">
          {date}
        </div>
      </div>
    </button>
  );
}
