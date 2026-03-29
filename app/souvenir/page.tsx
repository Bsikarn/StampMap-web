"use client";

import { useState, useMemo } from "react";
import { SouvenirCard, type SouvenirItem } from "@/components/souvenir/souvenir-card";
import { ExchangeModal } from "@/components/souvenir/exchange-modal";

// Sample souvenir items - Ideally fetched from an API
const SOUVENIR_DATA: SouvenirItem[] = [
  { id: 1, name: "Jeju Dol Hareubang Figurine", image: "🗿", stampsRequired: 10, inStock: true },
  { id: 2, name: "Hallasan Enamel Pin", image: "📍", stampsRequired: 5, inStock: true },
  { id: 3, name: "Tangerine Tea Collection", image: "🍊", stampsRequired: 8, inStock: false },
  { id: 4, name: "Haenyeo Postcard Set", image: "🏊‍♀️", stampsRequired: 3, inStock: true },
  { id: 5, name: "Jeju Lava Stone Bracelet", image: "🪨", stampsRequired: 15, inStock: true },
  { id: 6, name: "Cherry Blossom Bookmark", image: "🌸", stampsRequired: 4, inStock: false },
];

/**
 * SouvenirPage Component
 * 
 * Main page for exchanging collected stamps for physical items.
 * Renders a grid of available souvenirs and an exchange modal sequence.
 */
export default function SouvenirPage() {
  // Local UI State for handling modals
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  
  // Track the currently selected item for exchange
  const [selectedSouvenir, setSelectedSouvenir] = useState<SouvenirItem | null>(null);

  /**
   * Memoize the items list to prevent unnecessary mapping recalculations on re-renders,
   * though not strictly necessary for tiny lists, it's best practice.
   */
  const items = useMemo(() => SOUVENIR_DATA, []);

  // Opens the modal and prepares the specific item data
  const handleOpenExchangeModal = (item: SouvenirItem) => {
    setSelectedSouvenir(item);
    setShowExchangeModal(true);
  };

  return (
    <div className="relative min-h-dvh bg-slate-50 pb-24 animate-in fade-in slide-in-from-right-4 duration-300 ease-out">
      
      {/* ── Header ── */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex w-full flex-col items-center justify-center px-4 py-3 text-center">
          <h1 className="text-xl font-bold text-slate-900 leading-none">
            Souvenir Exchange
          </h1>
          <p className="mt-1.5 text-xs font-medium text-slate-500">
            Trade your stamps for exclusive rewards
          </p>
        </div>
      </div>

      {/* ── Responsive Grid ── */}
      <div className="mx-auto grid grid-cols-2 gap-4 px-5 pt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 border-b border-transparent">
        {items.map((item) => (
          <SouvenirCard 
            key={item.id} 
            item={item} 
            onExchange={handleOpenExchangeModal} 
          />
        ))}
      </div>

      {/* ── Exchange Modal ── */}
      <ExchangeModal
        isOpen={showExchangeModal}
        onOpenChange={setShowExchangeModal}
        selectedSouvenir={selectedSouvenir}
      />
      
    </div>
  );
}
