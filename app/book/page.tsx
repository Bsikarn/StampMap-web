"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, Plus } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { useStampStore } from "@/store/use-stamp-store";
import { Button } from "@/components/ui/button";

// Extracted Components
import { BookCover } from "./components/book-cover";
import { ProgressCard } from "./components/progress-card";
import { EbookViewer } from "./components/ebook-viewer";
import { BookPageModals } from "./components/book-page-modals";

// Re-using the same static data in the main file to pass to components
// In a real app, this would come from an API or store.
const stampBooks = [
  { id: "jeju-1", country: "Jeju Island", region: "South Korea", bookNumber: 1, stampsCollected: 3, totalStamps: 25, lastStampDate: "2025-12-17" },
  { id: "taiwan-1", country: "Taiwan", region: "East Asia", bookNumber: 1, stampsCollected: 8, totalStamps: 20, lastStampDate: "2025-11-24" },
  { id: "japan-1", country: "Japan", region: "East Asia", bookNumber: 1, stampsCollected: 0, totalStamps: 30, lastStampDate: "" },
];

const stampPages = [
  {
    id: "s1",
    locationName: "Geumryongsa",
    koreanName: "금룡사",
    description: "Geumryongsa Temple, located in Gimnyeong-ri, eastern Jeju Island, is a natural temple where the harmonious harmony of the blue dragon and yellow dragon, formed by the intertwining of rocky outcrops and pine trees, creates a harmonious landscape. Since 2010.",
    stampDate: "2024-01-15",
    stamped: true,
    stampImage: "true"
  },
  {
    id: "s2",
    locationName: "Seongsan Ilchulbong",
    koreanName: "성산 일출봉",
    description: "UNESCO World Heritage sunrise peak on Jeju's eastern shore. A tuff cone formed by hydrovolcanic eruptions.",
    stampDate: "2024-01-16",
    stamped: true,
    stampImage: "true"
  },
  {
    id: "s3",
    locationName: "Manjanggul Cave",
    koreanName: "만장굴",
    description: "One of the finest lava tunnels in the world, stretching 7.4km underground.",
    stampDate: "",
    stamped: false,
  },
];

const availableCountries = [
  { id: "jeju", name: "Jeju Island", region: "South Korea" },
  { id: "taiwan", name: "Taiwan", region: "East Asia" },
  { id: "japan", name: "Japan", region: "East Asia" },
];

export default function StampBookPage() {
  const { collectedStamps, totalStamps } = useStampStore();
  
  // UI State
  const [showEbook, setShowEbook] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Modals State
  const [showChangeBook, setShowChangeBook] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Ebook Nav Handlers
  const handleNextPage = () => {
    if (currentPage < stampPages.length - 1) setCurrentPage(p => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <div className="relative min-h-dvh bg-[#E3F2FD] pb-24 selection:bg-brand/20">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-[#E3F2FD]/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4">
          {showEbook ? (
            <button
              onClick={() => setShowEbook(false)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Book</span>
              <span className="inline sm:hidden">Back</span>
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Map</span>
              <span className="inline sm:hidden">Back</span>
            </Link>
          )}

          {/* Action Button (e.g. Sound/Collect) */}
          {!showEbook && (
            <button
              onClick={() => {
                 setShowNfcModal(true);
                 setTimeout(() => { setShowNfcModal(false); setShowSuccessModal(true); }, 2000);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand ring-1 ring-brand/20 transition-all hover:bg-brand/20 active:scale-95"
            >
              <Volume2 className="h-4 w-4" />
              Scan NFC
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-4 md:px-6">
        {showEbook ? (
          /* --- Ebook View --- */
          <EbookViewer
            page={stampPages[currentPage]}
            currentIndex={currentPage}
            totalPages={stampPages.length}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        ) : (
          /* --- Book Cover & Progress View --- */
          <div className="flex w-full flex-col items-center animate-stamp-slide-up">
            
            <BookCover 
              onClick={() => { setCurrentPage(0); setShowEbook(true); }}
              title="UN-OLD-JEJU"
              subtitle="STAMPBOOK"
              date="2024-01-15"
            />

            <ProgressCard
              date="2024-01-15"
              collected={collectedStamps.length}
              total={totalStamps}
            />

            {/* Action Buttons */}
            <div className="mt-5 flex w-48 flex-col gap-2.5">
              <Button
                variant="outline"
                onClick={() => setShowChangeBook(true)}
                className="w-full rounded-xl border-brand bg-white/80 py-5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-slate-50 hover:text-brand"
              >
                Change Book
              </Button>
              <Button
                onClick={() => setShowAddBook(true)}
                className="w-full rounded-xl bg-brand py-5 text-xs font-bold text-white shadow-card transition-colors hover:bg-blue-700"
              >
                Add New Book
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Extracted Modals Component */}
      <BookPageModals
        showChangeBook={showChangeBook} setShowChangeBook={setShowChangeBook}
        showAddBook={showAddBook} setShowAddBook={setShowAddBook}
        showNfcModal={showNfcModal} setShowNfcModal={setShowNfcModal}
        showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}
        stampBooks={stampBooks}
        availableCountries={availableCountries}
      />

      <BottomNav />
    </div>
  );
}
