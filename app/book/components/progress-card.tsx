import { Calendar } from "lucide-react";

interface ProgressCardProps {
  date: string;
  collected: number;
  total: number;
}

export function ProgressCard({ date, collected, total }: ProgressCardProps) {
  return (
    <div className="mx-auto mt-4 w-48 rounded-xl border-2 border-brand bg-white p-3 shadow-sm">
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
        <Calendar className="h-3 w-3 text-[#A5B4FC]" />
        <span>Date: {date}</span>
      </div>
      <p className="mt-2 text-center text-xs font-bold text-slate-700">Stamp Progress</p>
      <p className="mt-1 text-center text-3xl font-black text-brand">
        {collected}<span className="text-xl text-brand/70">/{total}</span>
      </p>
    </div>
  );
}
