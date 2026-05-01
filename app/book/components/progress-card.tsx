import { Calendar, TrendingUp } from "lucide-react";

interface ProgressCardProps {
  date: string;
  collected: number;
  total: number;
}

/**
 * ProgressCard — Glassmorphism stamp collection progress widget.
 * Uses Tailwind v4 design tokens and shadcn/ui Progress component.
 * Displays collected vs total stamps with progress bar.
 */
export function ProgressCard({ date, collected, total }: ProgressCardProps) {
  // Guard against division by zero when no locations are loaded yet
  const pct = total > 0 ? Math.round((collected / total) * 100) : 0;

  return (
    <div className="glass shadow-soft mx-auto mt-5 w-full max-w-[340px] rounded-[22px] p-5 border border-white/65">

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-brand" />
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Stamp Progress</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-surface-subtle px-2.5 py-1">
          <Calendar className="h-3 w-3 text-accent-purple" />
          <span className="text-[10px] font-semibold text-ink-secondary">{date}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-end gap-1 mb-3">
        <p className="font-black leading-none text-ink text-[3rem]">
          {collected}
        </p>
        <p className="mb-1.5 text-xl font-semibold text-ink-muted">/{total}</p>
        <p className="mb-1.5 ml-auto text-sm font-black text-brand">{pct}%</p>
      </div>

      {/* Progress bar — shadcn/ui Progress + custom gradient overlay */}
      <div className="relative h-2 overflow-hidden rounded-full bg-surface-subtle">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 gradient-hallasan shadow-[0_0_10px_rgba(59,108,244,0.40)]"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Sub-label */}
      <p className="mt-2.5 text-[11px] font-medium text-ink-muted">
        {total - collected} stamps remaining · Jeju Island
      </p>
    </div>
  );
}
