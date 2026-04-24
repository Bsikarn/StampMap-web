import React from "react";
import { Sparkles } from "lucide-react";

export interface SouvenirItem {
  id: number;
  name: string;
  image: string;
  stampsRequired: number;
  inStock: boolean;
}

interface SouvenirCardProps {
  item: SouvenirItem;
  onExchange: (item: SouvenirItem) => void;
}

/**
 * SouvenirCard — Premium claymorphism souvenir item card.
 * Features a 3D emoji icon with ambient glow, glassmorphism body,
 * stock badge, stamp count, and a clay-style redeem button.
 */
export const SouvenirCard = React.memo(({ item, onExchange }: SouvenirCardProps) => {
  return (
    <div
      className="group flex flex-col overflow-hidden rounded-[24px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.70)",
        boxShadow: "0 6px 24px rgba(59,108,244,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* ── Emoji icon area ── */}
      <div
        className="relative flex aspect-square items-center justify-center"
        style={{
          background: item.inStock
            ? "linear-gradient(145deg, #EEF2FF 0%, #F3F0FF 100%)"
            : "linear-gradient(145deg, #F8F9FF 0%, #F2F4FC 100%)",
        }}
      >
        {/* Ambient glow behind emoji */}
        {item.inStock && (
          <div
            className="absolute inset-[15%] rounded-full opacity-40 blur-xl group-hover:opacity-60 transition-opacity"
            style={{ background: "radial-gradient(circle, rgba(59,108,244,0.35), transparent 70%)" }}
          />
        )}

        {/* 3D emoji icon */}
        <span
          className="relative z-10 text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-lg select-none"
          style={{ filter: item.inStock ? "drop-shadow(0 6px 12px rgba(59,108,244,0.25))" : "grayscale(0.6) opacity(0.6)" }}
        >
          {item.image}
        </span>

        {/* Stock badge */}
        <div
          className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
          style={
            item.inStock
              ? {
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#16A34A",
                }
              : {
                  background: "rgba(174,182,220,0.20)",
                  border: "1px solid rgba(174,182,220,0.30)",
                  color: "#8A91B8",
                }
          }
        >
          {item.inStock ? "In Stock" : "Sold Out"}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-3.5 gap-2">
        <h3 className="text-[13px] font-bold leading-snug text-[#0D1238]">
          {item.name}
        </h3>

        {/* Stamps required */}
        <div className="flex items-center gap-1.5">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black text-white"
            style={{ background: "linear-gradient(135deg,#3B6CF4,#8B5CF6)" }}
          >
            ✦
          </div>
          <span className="text-sm font-black text-[#3B6CF4]">{item.stampsRequired}</span>
          <span className="text-[11px] font-medium text-[#8A91B8]">stamps</span>
        </div>

        {/* Redeem button */}
        <button
          onClick={() => onExchange(item)}
          disabled={!item.inStock}
          className="mt-auto w-full rounded-[14px] py-2.5 text-[12px] font-bold transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          style={
            item.inStock
              ? {
                  background: "linear-gradient(135deg, #3B6CF4, #2952D9)",
                  color: "#FFF",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.25), 0 4px 14px rgba(59,108,244,0.38)",
                }
              : {
                  background: "#F2F4FC",
                  color: "#C4CAE8",
                  border: "1px solid rgba(174,182,220,0.30)",
                }
          }
        >
          <span className="flex items-center justify-center gap-1.5">
            {item.inStock && <Sparkles className="h-3 w-3"/>}
            Redeem
          </span>
        </button>
      </div>
    </div>
  );
});
SouvenirCard.displayName = "SouvenirCard";
