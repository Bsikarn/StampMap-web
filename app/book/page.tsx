"use client";

import { useState } from "react";
import Link from "next/link";
import { useStampStore } from "@/store/use-stamp-store";
import { Button } from "@/components/ui/button";
import { Wifi, Sparkles } from "lucide-react";

// Extracted Components
import { BookCover }      from "./components/book-cover";
import { ProgressCard }   from "./components/progress-card";
import { EbookViewer }    from "./components/ebook-viewer";
import { BookPageModals } from "./components/book-page-modals";

// Static data — in production this would come from an API/store
const stampBooks = [
  { id: "jeju-1",   country: "Jeju Island", region: "South Korea", bookNumber: 1, stampsCollected: 3,  totalStamps: 25, lastStampDate: "2025-12-17" },
  { id: "taiwan-1", country: "Taiwan",      region: "East Asia",   bookNumber: 1, stampsCollected: 8,  totalStamps: 20, lastStampDate: "2025-11-24" },
  { id: "japan-1",  country: "Japan",       region: "East Asia",   bookNumber: 1, stampsCollected: 0,  totalStamps: 30, lastStampDate: "" },
];

const stampPages = [
  {
    id: "s1",
    locationName: "Geumryongsa",
    koreanName:   "금룡사",
    description:  "Geumryongsa Temple, located in Gimnyeong-ri, eastern Jeju Island, is a natural temple where the harmonious harmony of the blue dragon and yellow dragon, formed by the intertwining of rocky outcrops and pine trees, creates a breathtaking landscape.",
    stampDate:    "2024-01-15",
    stamped:      true,
    stampImage:   "true",
  },
  {
    id: "s2",
    locationName: "Seongsan Ilchulbong",
    koreanName:   "성산 일출봉",
    description:  "UNESCO World Heritage sunrise peak on Jeju's eastern shore. A dramatic tuff cone formed by hydrovolcanic eruptions, offering panoramic views of the sunrise over the sea.",
    stampDate:    "2024-01-16",
    stamped:      true,
    stampImage:   "true",
  },
  {
    id: "s3",
    locationName: "Manjanggul Cave",
    koreanName:   "만장굴",
    description:  "One of the finest lava tunnels in the world, stretching 7.4km underground beneath Jeju Island. A UNESCO World Natural Heritage site with unique geological formations.",
    stampDate:    "",
    stamped:      false,
  },
];

const availableCountries = [
  { id: "jeju",   name: "Jeju Island", region: "South Korea" },
  { id: "taiwan", name: "Taiwan",      region: "East Asia" },
  { id: "japan",  name: "Japan",       region: "East Asia" },
];

/**
 * StampBookPage — Digital Passport & Stamp Book screen.
 * Shows the 3D book cover or an in-book ebook viewer with page navigation.
 * Premium Glassmorphism + Claymorphism aesthetic.
 */
export default function StampBookPage() {
  const { collectedStamps, totalStamps } = useStampStore();

  // View toggle state
  const [showEbook, setShowEbook] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Modal visibility states
  const [showChangeBook,  setShowChangeBook]  = useState(false);
  const [showAddBook,     setShowAddBook]     = useState(false);
  const [showNfcModal,    setShowNfcModal]    = useState(false);
  const [showSuccessModal,setShowSuccessModal]= useState(false);

  const handleNextPage = () => { if (currentPage < stampPages.length - 1) setCurrentPage(p => p + 1); };
  const handlePrevPage = () => { if (currentPage > 0) setCurrentPage(p => p - 1); };

  return (
    <div className="relative min-h-dvh bg-transparent pb-28 selection:bg-[#3B6CF4]/15 animate-in fade-in slide-in-from-right-4 duration-300 ease-out">

      {/* ── Sticky top bar ── */}
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
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3.5">
          {/* Title */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A91B8]">
              Digital Passport
            </p>
            <h1 className="text-lg font-black text-[#0D1238] leading-tight">Stamp Book</h1>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Back button (ebook mode) */}
            {showEbook && (
              <button
                onClick={() => setShowEbook(false)}
                className="rounded-xl px-3.5 py-2 text-xs font-bold text-[#8A91B8] transition-all hover:text-[#0D1238] active:scale-95"
                style={{ background: "#F2F4FC" }}
              >
                ← Back
              </button>
            )}

            {/* NFC collect button */}
            {!showEbook && (
              <button
                id="nfc-collect-btn"
                onClick={() => {
                  setShowNfcModal(true);
                  setTimeout(() => { setShowNfcModal(false); setShowSuccessModal(true); }, 2000);
                }}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(59,108,244,0.10), rgba(139,92,246,0.08))",
                  border: "1px solid rgba(59,108,244,0.18)",
                  color: "#3B6CF4",
                  boxShadow: "0 2px 8px rgba(59,108,244,0.10)",
                }}
              >
                <Wifi className="h-3.5 w-3.5"/>
                NFC
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-6 md:px-6">

        {showEbook ? (
          /* ── Ebook viewer ── */
          <EbookViewer
            page={stampPages[currentPage]}
            currentIndex={currentPage}
            totalPages={stampPages.length}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        ) : (
          /* ── Book cover + progress ── */
          <div className="flex w-full flex-col items-center animate-stamp-slide-up">

            {/* Book cover card */}
            <BookCover
              onClick={() => { setCurrentPage(0); setShowEbook(true); }}
              title="UN-OLD-JEJU"
              subtitle="STAMPBOOK"
              date="2024-01-15"
            />

            {/* Progress widget */}
            <ProgressCard
              date="2024-01-15"
              collected={collectedStamps.length}
              total={totalStamps}
            />

            {/* Action buttons */}
            <div className="mt-6 flex w-full max-w-[340px] flex-col gap-3">

              {/* Change Book */}
              <button
                onClick={() => setShowChangeBook(true)}
                className="w-full rounded-[16px] py-3.5 text-sm font-bold transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1.5px solid rgba(59,108,244,0.20)",
                  color: "#3B6CF4",
                  boxShadow: "0 4px 16px rgba(59,108,244,0.08)",
                }}
              >
                Change Book
              </button>

              {/* Add New Book */}
              <button
                onClick={() => setShowAddBook(true)}
                className="w-full rounded-[16px] py-3.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #3B6CF4 0%, #2952D9 100%)",
                  boxShadow:
                    "inset 0 3px 6px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.10), 0 8px 24px rgba(59,108,244,0.40)",
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4"/>
                  Add New Book
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <BookPageModals
        showChangeBook={showChangeBook}  setShowChangeBook={setShowChangeBook}
        showAddBook={showAddBook}        setShowAddBook={setShowAddBook}
        showNfcModal={showNfcModal}      setShowNfcModal={setShowNfcModal}
        showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}
        stampBooks={stampBooks}
        availableCountries={availableCountries}
      />
    </div>
  );
}
