import { Smartphone } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#E3F2FD]">
      <div className="relative">
        <Smartphone className="h-16 w-16 text-brand animate-stamp-pulse" />
        <div className="absolute -inset-4 rounded-full border-2 border-dashed border-brand/40 animate-spin" style={{ animationDuration: "3s" }} />
      </div>
      <p className="mt-6 text-sm font-semibold text-slate-500 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
