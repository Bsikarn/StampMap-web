"use client";

import { useState, useMemo } from "react";
import { SouvenirCard, type SouvenirItem } from "@/components/souvenir/souvenir-card";
import { ExchangeModal } from "@/components/souvenir/exchange-modal";
import { Gift, Sparkles } from "lucide-react";

// Static souvenir data — ideally fetched from an API
const SOUVENIR_DATA: SouvenirItem[] = [
  { id: 1, name: "Jeju Dol Hareubang Figurine",  image: "🗿",    stampsRequired: 10, inStock: true  },
  { id: 2, name: "Hallasan Enamel Pin",           image: "📍",    stampsRequired: 5,  inStock: true  },
  { id: 3, name: "Tangerine Tea Collection",      image: "🍊",    stampsRequired: 8,  inStock: false },
  { id: 4, name: "Haenyeo Postcard Set",          image: "🏊‍♀️", stampsRequired: 3,  inStock: true  },
  { id: 5, name: "Jeju Lava Stone Bracelet",      image: "🪨",    stampsRequired: 15, inStock: true  },
  { id: 6, name: "Cherry Blossom Bookmark",       image: "🌸",    stampsRequired: 4,  inStock: false },
];

/**
 * SouvenirPage — Stamp exchange marketplace.
 * Premium glassmorphism header + claymorphism souvenir grid.
 * Jeju Island themed rewards with stamp-based redemption.
 */
export default function SouvenirPage() {
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedSouvenir,  setSelectedSouvenir]  = useState<SouvenirItem | null>(null);

  // Memoized to avoid unnecessary re-renders on unrelated state changes
  const items = useMemo(() => SOUVENIR_DATA, []);

  const handleOpenExchangeModal = (item: SouvenirItem) => {
    setSelectedSouvenir(item);
    setShowExchangeModal(true);
  };

  return (
    <div className="relative min-h-dvh bg-transparent pb-28 animate-in fade-in slide-in-from-right-4 duration-300 ease-out">

      {/* ── Glassmorphism sticky header ── */}
      <div
        className="sticky top-0 z-40"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
          borderBottom: "1px solid rgba(59,108,244,0.08)",
          boxShadow: "0 2px 16px rgba(59,108,244,0.06)",
        }}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-4 text-center">
          {/* Icon */}
          <div
            className="mb-2 flex h-11 w-11 items-center justify-center rounded-[14px]"
            style={{
              background: "linear-gradient(135deg, rgba(255,123,66,0.12), rgba(255,176,133,0.10))",
              border: "1px solid rgba(255,123,66,0.20)",
            }}
          >
            <Gift className="h-5 w-5 text-[#FF7B42]"/>
          </div>

          <h1 className="text-xl font-black leading-none text-[#0D1238]">
            Souvenir Exchange
          </h1>
          <p className="mt-1.5 text-xs font-medium text-[#8A91B8]">
            Trade your stamps for exclusive Jeju Island rewards
          </p>

          {/* Stats strip */}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#FF7B42]"/>
              <span className="text-[11px] font-bold text-[#3D4875]">
                {items.filter(i => i.inStock).length} available
              </span>
            </div>
            <div
              className="h-3.5 w-px bg-[#E0E5F0]"
            />
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#3B6CF4]"/>
              <span className="text-[11px] font-bold text-[#3D4875]">
                3 stamps collected
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Souvenir grid ── */}
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-5 pt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {items.map((item) => (
          <SouvenirCard
            key={item.id}
            item={item}
            onExchange={handleOpenExchangeModal}
          />
        ))}
      </div>

      {/* ── Exchange modal ── */}
      <ExchangeModal
        isOpen={showExchangeModal}
        onOpenChange={setShowExchangeModal}
        selectedSouvenir={selectedSouvenir}
      />
    </div>
  );
}
