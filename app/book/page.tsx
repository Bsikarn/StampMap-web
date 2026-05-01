"use client";

import { useState, useEffect } from "react";
import { useStampStore, type MapOption } from "@/store/use-stamp-store";
import { Wifi, Sparkles, BookOpen } from "lucide-react";

// Extracted Components
import { BookCover } from "./components/book-cover";
import { ProgressCard } from "./components/progress-card";
import { EbookViewer } from "./components/ebook-viewer";
import { BookPageModals } from "./components/book-page-modals";

/**
 * StampBookPage — Digital Passport & Stamp Book screen.
 * Shows the 3D book cover or an in-book ebook viewer with page navigation.
 * Premium Glassmorphism + Claymorphism aesthetic.
 */
export default function StampBookPage() {
  const {
    collectedStamps, totalStamps, locations, availableMaps, userBooks, selectedMap,
    fetchStamps, fetchLocations, addStamp, fetchAvailableMaps, fetchUserBooks, deleteUserBook, addUserBook
  } = useStampStore();

  // Tracks which book is currently displayed — null means no books exist
  const [selectedBook, setSelectedBook] = useState<MapOption | null>(selectedMap ?? null);

  // Fetch available zones and user books on mount
  useEffect(() => {
    fetchAvailableMaps();
    fetchUserBooks();
  }, [fetchAvailableMaps, fetchUserBooks]);

  // If there are no user books yet, fall back to the global selectedMap
  useEffect(() => {
    if (!userBooks.length && selectedMap) {
      setSelectedBook(selectedMap);
    }
  }, [selectedMap, userBooks.length]);

  // Keep selectedBook valid: if deleted, move to first remaining book
  useEffect(() => {
    if (userBooks.length === 0) {
      setSelectedBook(null);
      return;
    }
    const stillExists = userBooks.some((b) => b.id === selectedBook?.id);
    if (!stillExists) setSelectedBook(userBooks[0]);
  }, [userBooks, selectedBook?.id]);

  // Fetch stamps & locations whenever the active book changes
  useEffect(() => {
    if (selectedBook?.name) {
      fetchStamps(selectedBook.name);
      fetchLocations(selectedBook.name);
    }
  }, [fetchStamps, fetchLocations, selectedBook?.name]);

  // Derive stamp book list from userBooks for the modal
  const stampBooks = userBooks.map((map) => ({
    id: map.id,
    country: map.name,
    bookNumber: 1,
    stampsCollected: map.id === selectedBook?.id ? collectedStamps.length : 0,
    totalStamps: map.id === selectedBook?.id ? totalStamps : 0,
  }));

  // Derive stamp pages from locations + collectedStamps
  const stampPages = locations.map((loc) => {
    const stamp = collectedStamps.find((s) => s.locationId === loc.id);
    return {
      id: loc.id,
      locationName: loc.name,
      koreanName: (loc as any).koreanName ?? "",
      description: (loc as any).description ?? "",
      stampDate: stamp ? new Date(stamp.collectedAt).toISOString().split("T")[0] : "",
      stamped: !!stamp,
      stampImage: stamp ? "true" : "",
    };
  });

  // View toggle state
  const [showEbook, setShowEbook] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Modal visibility states
  const [showChangeBook, setShowChangeBook] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNextPage = () => { if (currentPage < stampPages.length - 1) setCurrentPage((p) => p + 1); };
  const handlePrevPage = () => { if (currentPage > 0) setCurrentPage((p) => p - 1); };

  // Simulate NFC stamp collection
  const handleNfcCollect = () => {
    setShowNfcModal(true);
    setTimeout(() => {
      setShowNfcModal(false);
      const uncollected = locations.filter((loc) => !collectedStamps.some((s) => s.locationId === loc.id));
      if (uncollected.length > 0) {
        const randomLoc = uncollected[Math.floor(Math.random() * uncollected.length)];
        addStamp({
          id: Math.random().toString(),
          locationId: randomLoc.id,
          locationName: randomLoc.name,
          image: "🏛️",
          description: "Collected via NFC simulation",
          collectedAt: new Date().toISOString(),
        });
      }
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <div className="relative min-h-dvh bg-transparent pb-28 selection:bg-[#3B6CF4]/15 animate-in fade-in slide-in-from-right-4 duration-300 ease-out">

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-40 glass-heavy shadow-soft border-b border-brand/8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3.5">
          {/* Title block */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-muted">
              Digital Passport
            </p>
            <h1 className="text-lg font-black text-ink leading-tight">Stamp Book</h1>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Back button (ebook mode only) */}
            {showEbook && (
              <button
                type="button"
                onClick={() => setShowEbook(false)}
                className="rounded-xl px-3.5 py-2 text-xs font-bold text-ink-muted bg-surface-subtle transition-all hover:text-ink active:scale-95"
              >
                ← Back
              </button>
            )}

            {/* NFC collect button (cover mode only) */}
            {!showEbook && (
              <button
                id="nfc-collect-btn"
                type="button"
                onClick={handleNfcCollect}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-brand transition-all active:scale-95 glass-tint-blue"
              >
                <Wifi className="h-3.5 w-3.5" />
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
          stampPages.length > 0 ? (
            <EbookViewer
              page={stampPages[currentPage]}
              currentIndex={currentPage}
              totalPages={stampPages.length}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          ) : (
            <div className="flex h-64 items-center justify-center text-ink-muted">
              Loading pages...
            </div>
          )
        ) : (
          /* ── Book cover + progress ── */
          <div className="flex w-full flex-col items-center animate-stamp-slide-up">

            {userBooks.length > 0 && selectedBook ? (
              <>
                <BookCover
                  onClick={() => { setCurrentPage(0); setShowEbook(true); }}
                  title={selectedBook.name.toUpperCase()}
                  subtitle="STAMPBOOK"
                  date={new Date().toISOString().split("T")[0]}
                />

                <ProgressCard
                  date="2024-01-15"
                  collected={collectedStamps.length}
                  total={totalStamps}
                />
              </>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-80">
                <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-700">No Stamp Books Yet</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                  Create a new digital passport to start collecting stamps on your journey.
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-6 flex w-full max-w-[340px] flex-col gap-3">
              {/* Change Book */}
              <button
                type="button"
                onClick={() => setShowChangeBook(true)}
                className="w-full rounded-[16px] py-3.5 text-sm font-bold text-brand transition-all duration-200 active:scale-[0.98] glass border border-brand/20 shadow-soft"
              >
                Change Book
              </button>

              {/* Add New Book */}
              <button
                type="button"
                onClick={() => setShowAddBook(true)}
                className="w-full rounded-[16px] py-3.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98] gradient-jeju shadow-[inset_0_3px_6px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.10),0_8px_24px_rgba(59,108,244,0.40)]"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Add New Book
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <BookPageModals
        showChangeBook={showChangeBook} setShowChangeBook={setShowChangeBook}
        showAddBook={showAddBook} setShowAddBook={setShowAddBook}
        showNfcModal={showNfcModal} setShowNfcModal={setShowNfcModal}
        showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal}
        stampBooks={stampBooks}
        availableCountries={availableMaps}
        onSelectBook={(id) => {
          const map = userBooks.find((m) => m.id === id);
          if (map) setSelectedBook(map);
        }}
        onAddBook={(id) => addUserBook(id)}
        onDeleteBook={(id) => {
          deleteUserBook(id);
          if (selectedBook?.id === id) {
            const remaining = userBooks.filter((b) => b.id !== id);
            setSelectedBook(remaining.length > 0 ? remaining[0] : null);
          }
        }}
      />
    </div>
  );
}
