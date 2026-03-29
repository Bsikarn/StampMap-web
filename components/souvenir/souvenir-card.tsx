import React from "react";
import { Button } from "@/components/ui/button";
import { Repeat } from "lucide-react";

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
 * SouvenirCard Component
 * 
 * Displays individual souvenir details including stock status and stamp requirements.
 * Extracted to compartmentalize the rendering logic of a single grid item.
 */
export const SouvenirCard = React.memo(({ item, onExchange }: SouvenirCardProps) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.03] transition-shadow hover:shadow-card-md">
      {/* Product image area */}
      <div className="relative flex aspect-square items-center justify-center bg-slate-50">
        <span className="text-5xl transition-transform duration-200 group-hover:scale-110">{item.image}</span>
        {/* Stock badge */}
        <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
          item.inStock
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-500"
        }`}>
          {item.inStock ? "In stock" : "Sold out"}
        </span>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm font-bold leading-snug text-slate-900 mt-1">
          {item.name}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          <span className="text-sm font-bold text-brand">{item.stampsRequired}</span>
          <span className="text-xs font-medium text-slate-500">stamps</span>
        </div>

        <Button
          size="sm"
          onClick={() => onExchange(item)}
          disabled={!item.inStock}
          className="mt-3 w-full rounded-xl bg-brand py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400"
        >
          <Repeat className="mr-1 h-3 w-3" />
          Redeem
        </Button>
      </div>
    </div>
  );
});
SouvenirCard.displayName = "SouvenirCard";
