import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen, Hash, Globe, Stamp, Calendar,
  Plus, Smartphone, CheckCircle2, ChevronRight, Sparkles,
} from "lucide-react";
import { useState } from "react";

// Type definitions
interface StampBook {
  id: string;
  country: string;
  region: string;
  bookNumber: number;
  stampsCollected: number;
  totalStamps: number;
  lastStampDate: string;
}

interface CountryOption {
  id: string;
  name: string;
  region: string;
}

interface BookPageModalsProps {
  showChangeBook: boolean;     setShowChangeBook: (open: boolean) => void;
  showAddBook: boolean;        setShowAddBook: (open: boolean) => void;
  showNfcModal: boolean;       setShowNfcModal: (open: boolean) => void;
  showSuccessModal: boolean;   setShowSuccessModal: (open: boolean) => void;
  stampBooks: StampBook[];
  availableCountries: CountryOption[];
}

/**
 * BookPageModals — Premium glassmorphism dialogs for the stamp book page.
 * Includes: Change Book, Add Book, NFC Scanning, and Stamp Success modals.
 */
export function BookPageModals({
  showChangeBook, setShowChangeBook,
  showAddBook, setShowAddBook,
  showNfcModal, setShowNfcModal,
  showSuccessModal, setShowSuccessModal,
  stampBooks, availableCountries,
}: BookPageModalsProps) {
  const [selectedCountry, setSelectedCountry] = useState("");

  // Shared modal content style
  const modalStyle = {
    background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(40px) saturate(200%)",
    WebkitBackdropFilter: "blur(40px) saturate(200%)",
    border: "1px solid rgba(255,255,255,0.80)",
    boxShadow: "0 24px 80px rgba(59,108,244,0.20), 0 8px 24px rgba(0,0,0,0.06)",
  };

  // Shared header strip style
  const headerStyle = {
    background: "linear-gradient(135deg, rgba(59,108,244,0.06) 0%, rgba(139,92,246,0.05) 100%)",
    borderBottom: "1px solid rgba(59,108,244,0.08)",
  };

  return (
    <>
      {/* ════════════════════════════
          CHANGE BOOK MODAL
          ════════════════════════════ */}
      <Dialog open={showChangeBook} onOpenChange={setShowChangeBook}>
        <DialogContent className="mx-auto max-w-sm overflow-hidden rounded-[28px] border-0 p-0" style={modalStyle}>
          <div className="px-6 pb-4 pt-6" style={headerStyle}>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-[#0D1238]">Select Stamp Book</DialogTitle>
              <DialogDescription className="text-sm text-[#8A91B8]">
                Switch to a different stamp passport book
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto px-4 py-4">
            {stampBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => setShowChangeBook(false)}
                className="flex w-full items-center gap-3 rounded-[18px] p-3.5 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: "#F8F9FF",
                  border: "1px solid rgba(59,108,244,0.08)",
                  boxShadow: "0 2px 8px rgba(59,108,244,0.05)",
                }}
              >
                {/* Book icon */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,108,244,0.12), rgba(139,92,246,0.08))",
                    border: "1px solid rgba(59,108,244,0.15)",
                  }}
                >
                  <BookOpen className="h-5 w-5 text-[#3B6CF4]"/>
                </div>

                {/* Book info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-sm font-bold text-[#0D1238] truncate">{book.country}</p>
                    <span
                      className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-black"
                      style={{ background: "#F2F4FC", color: "#8A91B8" }}
                    >
                      <Hash className="h-2.5 w-2.5"/>{book.bookNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-medium text-[#8A91B8]">
                    <span className="flex items-center gap-0.5"><Globe className="h-3 w-3"/>{book.region}</span>
                    <span className="flex items-center gap-0.5 text-[#3B6CF4]">
                      <Stamp className="h-3 w-3"/>{book.stampsCollected}/{book.totalStamps}
                    </span>
                    {book.lastStampDate && (
                      <span className="flex items-center gap-0.5">
                        <Calendar className="h-3 w-3"/>{book.lastStampDate}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#C4CAE8]"/>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════
          ADD NEW BOOK MODAL
          ════════════════════════════ */}
      <Dialog open={showAddBook} onOpenChange={setShowAddBook}>
        <DialogContent className="mx-auto max-w-sm overflow-hidden rounded-[28px] border-0 p-0" style={modalStyle}>
          <div className="px-6 pb-4 pt-6" style={headerStyle}>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-[#0D1238]">Add New Book</DialogTitle>
              <DialogDescription className="text-sm text-[#8A91B8]">
                Create a new stamp passport for a destination
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8A91B8]">Country</label>
              <Select value={selectedCountry} onValueChange={(val) => setSelectedCountry(val ?? "")}>
                <SelectTrigger
                  className="rounded-[14px] border-0 text-sm font-medium"
                  style={{ background: "#F2F4FC", border: "1px solid rgba(59,108,244,0.12)", color: "#0D1238" }}
                >
                  <SelectValue placeholder="Choose a country" />
                </SelectTrigger>
                <SelectContent className="rounded-[18px]">
                  {availableCountries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name} — {country.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              disabled={!selectedCountry}
              onClick={() => { setShowAddBook(false); setSelectedCountry(""); }}
              className="w-full rounded-[16px] py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #3B6CF4 0%, #2952D9 100%)",
                boxShadow: "inset 0 3px 6px rgba(255,255,255,0.25), 0 8px 24px rgba(59,108,244,0.40)",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <Plus className="h-4 w-4"/>
                Create Book
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════
          NFC SCAN MODAL
          ════════════════════════════ */}
      <Dialog open={showNfcModal} onOpenChange={setShowNfcModal}>
        <DialogContent className="mx-auto max-w-xs overflow-hidden rounded-[28px] border-0 p-0" style={modalStyle}>
          <div className="px-6 pb-4 pt-6 text-center" style={headerStyle}>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-[#0D1238]">Scanning NFC...</DialogTitle>
              <DialogDescription className="text-sm text-[#8A91B8]">
                Hold your phone near the stamp station
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex flex-col items-center px-6 py-8 gap-5">
            {/* Animated phone icon */}
            <div className="relative">
              {/* Pulsing rings */}
              <div className="absolute -inset-6 animate-ping rounded-full bg-[#3B6CF4]/08" style={{ animationDuration: "2s" }}/>
              <div className="absolute -inset-4 animate-ping rounded-full bg-[#3B6CF4]/12" style={{ animationDuration: "2s", animationDelay: "0.3s" }}/>

              {/* Phone icon */}
              <div
                className="relative flex h-20 w-20 items-center justify-center rounded-[22px] animate-stamp-pulse"
                style={{
                  background: "linear-gradient(135deg, #3B6CF4, #2952D9)",
                  boxShadow: "inset 0 4px 8px rgba(255,255,255,0.30), 0 12px 32px rgba(59,108,244,0.45)",
                }}
              >
                <Smartphone className="h-9 w-9 text-white"/>
              </div>
            </div>

            {/* Searching indicator */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#3B6CF4] animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}/>
                ))}
              </div>
              <p className="text-sm font-semibold text-[#8A91B8]">Searching for stamp...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════
          SUCCESS MODAL
          ════════════════════════════ */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="mx-auto max-w-xs overflow-hidden rounded-[28px] border-0 p-0" style={modalStyle}>
          <div className="px-6 pb-4 pt-6 text-center" style={headerStyle}>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-[#0D1238]">
                Stamp Collected! 🎉
              </DialogTitle>
              <DialogDescription className="text-sm text-[#8A91B8]">
                You&apos;ve successfully collected a new stamp
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex flex-col items-center px-6 py-6 gap-4 animate-stamp-fade-in">
            {/* Success icon */}
            <div
              className="flex h-20 w-20 items-center justify-center rounded-[22px]"
              style={{
                background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.06))",
                border: "1.5px solid rgba(34,197,94,0.25)",
                boxShadow: "0 8px 24px rgba(34,197,94,0.20)",
              }}
            >
              <CheckCircle2 className="h-12 w-12 text-[#22C55E]"/>
            </div>

            {/* Location info */}
            <div className="text-center">
              <p className="font-black text-[#0D1238] text-lg">Cheonjiyeon Falls</p>
              <p className="text-sm font-medium text-[#8A91B8] mt-0.5">천지연 폭포 · Jeju Island</p>
            </div>

            {/* Continue button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full rounded-[16px] py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #3B6CF4 0%, #2952D9 100%)",
                boxShadow: "inset 0 3px 6px rgba(255,255,255,0.25), 0 8px 24px rgba(59,108,244,0.40)",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4"/>
                Continue Exploring
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
