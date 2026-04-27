import Link from "next/link";
import { Bell, X } from "lucide-react";
import type { MapPinData } from "@/components/map/map-pins";

interface ProximityToastProps {
  locations: MapPinData[];
  onClose: () => void;
}

export function ProximityToast({ locations, onClose }: ProximityToastProps) {
  const nearbyLocation = locations[0]?.name || "New Location";
  
  return (
    <div className="animate-toast-in fixed left-1/2 -translate-x-1/2 top-[72px] z-[100] flex w-full max-w-[360px] justify-center px-4">
      <div className="relative w-full">
        <Link
          href="/location/4"
          onClick={onClose}
          className="flex items-center gap-3 rounded-[20px] pr-10 pl-3.5 py-3 transition-all active:scale-[0.98] glass-heavy border border-white/70 shadow-soft"
        >
          {/* Pulsing icon */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1.5 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-brand/20" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-[14px] text-white gradient-jeju">
              <Bell className="h-5 w-5" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-brand truncate leading-tight">
              {nearbyLocation}
            </p>
            <p className="text-[11px] font-semibold text-ink-muted mt-0.5">
              📍 You&apos;re nearby — Tap to stamp!
            </p>
          </div>
        </Link>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-90 bg-surface-subtle text-ink-muted"
          aria-label="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
