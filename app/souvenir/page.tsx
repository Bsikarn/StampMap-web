"use client";

import { useState, useMemo, useEffect } from "react";
import { SouvenirCard } from "@/components/souvenir/souvenir-card";
import { useStampStore, type SouvenirItem } from "@/store/use-stamp-store";
import { ExchangeModal } from "@/components/souvenir/exchange-modal";
import { Gift, Sparkles } from "lucide-react";



/**
 * SouvenirPage — Stamp exchange marketplace.
 * Premium glassmorphism header + claymorphism souvenir grid.
 * Jeju Island themed rewards with stamp-based redemption.
 */
export default function SouvenirPage() {
  const { souvenirs, fetchSouvenirs, isLoadingSouvenirs, collectedStamps, selectedMap } = useStampStore();
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedSouvenir, setSelectedSouvenir] = useState<SouvenirItem | null>(null);

  useEffect(() => {
    fetchSouvenirs(); // Fetch all souvenirs regardless of selected map
  }, [fetchSouvenirs]);

  // Memoized to avoid unnecessary re-renders on unrelated state changes
  const items = useMemo(() => souvenirs, [souvenirs]);

  const handleOpenExchangeModal = (item: SouvenirItem) => {
    setSelectedSouvenir(item);
    setShowExchangeModal(true);
  };

  return (
    <div className="relative min-h-dvh bg-transparent pb-28 animate-in fade-in slide-in-from-right-4 duration-300 ease-out">

      {/* ── Glassmorphism sticky header ── */}
      <div className="sticky top-0 z-40 glass-heavy shadow-soft border-b border-brand/8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3.5">

          {/* Left: Title block (mirrors Stamp Book header) */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-muted">
              Stamp Rewards
            </p>
            <h1 className="text-lg font-black text-ink leading-tight">
              Souvenir Exchange
            </h1>
          </div>

          {/* Right: Stats strip */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent-jeju" />
              <span className="text-[11px] font-bold text-ink-secondary">
                {items.filter(i => i.inStock).length} available
              </span>
            </div>
            <div className="h-3.5 w-px bg-ink-ghost" />
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-brand" />
              <span className="text-[11px] font-bold text-ink-secondary">
                {collectedStamps.length} stamps collected
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
