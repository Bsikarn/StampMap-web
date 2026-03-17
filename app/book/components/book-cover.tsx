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
      className="group relative flex w-64 flex-col items-center overflow-hidden rounded-md bg-gradient-to-b from-[#FFF3D6] to-[#FFB74D] p-6 shadow-card-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Decorative dots pattern (subtle) */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "8px 8px" }} />

      {/* Bubbly Title */}
      <div className="relative z-10 flex flex-col items-center drop-shadow-md">
        <h2 className="font-black tracking-wider text-white" style={{ WebkitTextStroke: "1.5px #1E3A8A", textShadow: "2px 2px 0 #1E3A8A", fontSize: "1.35rem", lineHeight: "1.1" }}>
          {title}
        </h2>
        <h2 className="font-black tracking-wider text-[#FFD54F]" style={{ WebkitTextStroke: "1.5px #1E3A8A", textShadow: "2px 2px 0 #1E3A8A", fontSize: "1.6rem", lineHeight: "1" }}>
          {subtitle}
        </h2>
        {/* Sparkle decoration */}
        <div className="absolute -left-4 -top-2 h-3 w-3 rotate-45 bg-[#FFD54F]" />
      </div>

      {/* Center Emblem Placehoder */}
      <div className="relative z-10 mt-6 flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-[#D84315] bg-[#FFF8E1] shadow-inner">
        <div className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full border-2 border-[#D84315] p-2 text-center text-[#D84315]">
          <span className="text-[10px] font-bold tracking-widest">{title}</span>
          {/* Tree icon mockup */}
          <div className="my-1 flex items-end justify-center">
            <div className="h-6 w-8 rounded-t-full bg-[#1E3A8A]" />
            <div className="h-3 w-4 bg-[#1E3A8A]" />
          </div>
          <div className="mb-1 h-3 w-16 bg-[#1E3A8A]" />
          <span className="text-[6px] leading-[8px] font-semibold">Unique Old Temples of<br/>Jeju Heritage</span>
          <span className="mt-1 text-[8px] font-bold">ECE-ENG-KMUTNB</span>
        </div>
      </div>

      {/* Date Box */}
      <div className="relative z-10 mt-8 flex w-full items-center justify-between px-2">
        <span className="text-[10px] font-bold tracking-widest text-white drop-shadow-sm">DATE :</span>
        <div className="w-24 bg-white px-2 py-1 text-center text-xs font-semibold text-slate-800 shadow-sm">
          {date}
        </div>
      </div>
    </button>
  );
}
