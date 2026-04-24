import { Calendar, TrendingUp } from "lucide-react";

interface ProgressCardProps {
  date: string;
  collected: number;
  total: number;
}

/**
 * ProgressCard — Glassmorphism stamp collection progress widget.
 * Displays collected vs total stamps with animated progress arc.
 */
export function ProgressCard({ date, collected, total }: ProgressCardProps) {
  const pct = Math.round((collected / total) * 100);

  return (
    <div
      className="mx-auto mt-5 w-full max-w-[340px] rounded-[22px] p-5"
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow: "0 8px 32px rgba(59,108,244,0.10), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#3B6CF4]"/>
          <p className="text-xs font-bold uppercase tracking-wider text-[#8A91B8]">Stamp Progress</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-[#F2F4FC] px-2.5 py-1">
          <Calendar className="h-3 w-3 text-[#8B5CF6]"/>
          <span className="text-[10px] font-semibold text-[#3D4875]">{date}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-end gap-1 mb-3">
        <p
          className="font-black leading-none text-[#0D1238]"
          style={{ fontSize: "3rem" }}
        >
          {collected}
        </p>
        <p className="mb-1.5 text-xl font-semibold text-[#8A91B8]">/{total}</p>
        <p className="mb-1.5 ml-auto text-sm font-black text-[#3B6CF4]">{pct}%</p>
      </div>

      {/* Progress track */}
      <div className="relative h-2 overflow-hidden rounded-full bg-[#F2F4FC]">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #3B6CF4 0%, #8B5CF6 100%)",
            boxShadow: "0 0 10px rgba(59,108,244,0.40)",
          }}
        />
      </div>

      {/* Sub-label */}
      <p className="mt-2.5 text-[11px] font-medium text-[#8A91B8]">
        {total - collected} stamps remaining · Jeju Island
      </p>
    </div>
  );
}
