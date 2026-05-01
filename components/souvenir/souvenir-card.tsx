import React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SouvenirItem } from "@/store/use-stamp-store";

interface SouvenirCardProps {
  item: SouvenirItem;
  onExchange: (item: SouvenirItem) => void;
}

/**
 * SouvenirCard — Premium claymorphism souvenir item card.
 * Uses Tailwind v4 custom utilities (glass, clay, shadow-soft) and shadcn/ui Badge.
 * Features a 3D emoji icon with ambient glow and a clay-style redeem button.
 */
export const SouvenirCard = React.memo(({ item, onExchange }: SouvenirCardProps) => {
  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-[24px]",
        "glass shadow-soft border border-white/70",
        "transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-soft-md"
      )}
    >
      {/* ── Emoji icon area ── */}
      <div
        className={cn(
          "relative flex aspect-square items-center justify-center",
          item.inStock
            ? "bg-gradient-to-br from-brand-light to-accent-pale"
            : "bg-gradient-to-br from-surface-raised to-surface-subtle"
        )}
      >
        {/* Ambient glow behind emoji (in-stock only) */}
        {item.inStock && (
          <div className="absolute inset-[15%] rounded-full opacity-40 blur-xl group-hover:opacity-60 transition-opacity bg-[radial-gradient(circle,rgba(59,108,244,0.35),transparent_70%)]" />
        )}

        {/* 3D emoji icon */}
        <span
          className={cn(
            "relative z-10 text-5xl transition-transform duration-300 select-none drop-shadow-lg",
            "group-hover:scale-110 group-hover:-translate-y-1",
            !item.inStock && "grayscale-[0.6] opacity-60"
          )}
          style={item.inStock ? { filter: "drop-shadow(0 6px 12px rgba(59,108,244,0.25))" } : undefined}
        >
          {item.image}
        </span>

        {/* Stock badge — shadcn/ui Badge */}
        <div className="absolute right-2.5 top-2.5">
          <Badge
            variant={item.inStock ? "default" : "secondary"}
            className={cn(
              "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
              item.inStock
                ? "bg-success/12 text-[#16A34A] border border-success/25 hover:bg-success/12"
                : "bg-ink-ghost/20 text-ink-muted border border-ink-ghost/30 hover:bg-ink-ghost/20"
            )}
          >
            {item.inStock ? "In Stock" : "Sold Out"}
          </Badge>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-3.5 gap-2">
        <h3 className="text-[13px] font-bold leading-snug text-ink">
          {item.name}
        </h3>

        {/* Stamps required counter */}
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black text-white gradient-jeju">
            ✦
          </div>
          <span className="text-sm font-black text-brand">{item.stampsRequired}</span>
          <span className="text-[11px] font-medium text-ink-muted">stamps</span>
        </div>

        {/* Redeem button */}
        <button
          onClick={() => onExchange(item)}
          disabled={!item.inStock}
          className={cn(
            "mt-auto w-full rounded-[14px] py-2.5 text-[12px] font-bold",
            "transition-all duration-200 active:scale-95",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            item.inStock
              ? "gradient-jeju text-white shadow-soft-md"
              : "bg-surface-subtle text-ink-ghost border border-ink-ghost/30"
          )}
          style={item.inStock ? { boxShadow: "inset 0 2px 4px rgba(255,255,255,0.25), 0 4px 14px rgba(59,108,244,0.38)" } : undefined}
        >
          <span className="flex items-center justify-center gap-1.5">
            {item.inStock && <Sparkles className="h-3 w-3" />}
            Redeem
          </span>
        </button>
      </div>
    </div>
  );
});
SouvenirCard.displayName = "SouvenirCard";
