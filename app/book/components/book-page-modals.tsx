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
  BookOpen, Hash, Stamp, Plus, Smartphone,
  CheckCircle2, ChevronRight, Trash2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Type definitions
interface StampBook {
  id: string;
  country: string;
  bookNumber: number;
  stampsCollected: number;
  totalStamps: number;
}

interface CountryOption {
  id: string;
  name: string;
}

interface BookPageModalsProps {
  showChangeBook: boolean;
  setShowChangeBook: (open: boolean) => void;
  showAddBook: boolean;
  setShowAddBook: (open: boolean) => void;
  showNfcModal: boolean;
  setShowNfcModal: (open: boolean) => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (open: boolean) => void;
  stampBooks: StampBook[];
  availableCountries: CountryOption[];
  onSelectBook: (id: string) => void;
  onAddBook: (id: string) => void;
  onDeleteBook: (id: string) => void;
}

// Shared modal class tokens
const MODAL_CLS = "glass-heavy border border-white/80 shadow-[0_24px_80px_rgba(59,108,244,0.20),0_8px_24px_rgba(0,0,0,0.06)]";
const HEADER_CLS = "bg-gradient-to-br from-brand/6 to-accent-purple/5 border-b border-brand/8";

/**
 * BookPageModals — Premium glassmorphism dialogs for the stamp book page.
 * Includes: Change Book, Add Book, NFC Scanning, and Stamp Success modals.
 *
 * NOTE: The "Change Book" list renders each row as a <div role="button"> to avoid
 * the invalid HTML nesting error caused by a <button> inside a <button>.
 * The delete icon at the end of each row is its own independent <button>.
 */
export function BookPageModals({
  showChangeBook, setShowChangeBook,
  showAddBook, setShowAddBook,
  showNfcModal, setShowNfcModal,
  showSuccessModal, setShowSuccessModal,
  stampBooks, availableCountries, onSelectBook, onAddBook, onDeleteBook,
}: BookPageModalsProps) {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <>
      {/* ════════════════════════════
          CHANGE BOOK MODAL
          ════════════════════════════ */}
      <Dialog open={showChangeBook} onOpenChange={setShowChangeBook}>
        <DialogContent className={cn("mx-auto max-w-sm overflow-hidden rounded-[28px] p-0", MODAL_CLS)}>
          <div className={cn("px-6 pb-4 pt-6", HEADER_CLS)}>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-ink">Select Stamp Book</DialogTitle>
              <DialogDescription className="text-sm text-ink-muted">
                Switch to a different stamp passport book
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto px-4 py-4">
            {stampBooks.map((book) => (
              // Use div[role=button] to avoid invalid <button> inside <button> nesting.
              // The delete <button> at the end of the row is a sibling, not a descendant.
              <div
                key={book.id}
                role="button"
                tabIndex={0}
                onClick={() => { onSelectBook(book.id); setShowChangeBook(false); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectBook(book.id);
                    setShowChangeBook(false);
                  }
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-[18px] p-3.5 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] bg-[#F8F9FF] border border-brand/8 shadow-[0_2px_8px_rgba(59,108,244,0.05)]"
              >
                {/* Book icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-brand/12 to-accent-purple/8 border border-brand/15">
                  <BookOpen className="h-5 w-5 text-brand" />
                </div>

                {/* Book info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-sm font-bold text-ink truncate">{book.country}</p>
                    <span className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-black bg-surface-subtle text-ink-muted">
                      <Hash className="h-2.5 w-2.5" />{book.bookNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-medium text-ink-muted">
                    <span className="flex items-center gap-0.5 text-brand">
                      <Stamp className="h-3 w-3" />{book.stampsCollected}/{book.totalStamps}
                    </span>
                  </div>
                </div>

                {/* Right: chevron + delete (these are siblings, NOT nested buttons) */}
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#C4CAE8]" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDeleteBook(book.id); }}
                    className="p-1.5 rounded-md hover:bg-red-100 text-red-500 transition-colors"
                    aria-label={`Delete ${book.country} book`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════
          ADD NEW BOOK MODAL
          ════════════════════════════ */}
      <Dialog open={showAddBook} onOpenChange={setShowAddBook}>
        <DialogContent className={cn("mx-auto max-w-sm overflow-hidden rounded-[28px] p-0", MODAL_CLS)}>
          <div className={cn("px-6 pb-4 pt-6", HEADER_CLS)}>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-ink">Add New Book</DialogTitle>
              <DialogDescription className="text-sm text-ink-muted">
                Create a new stamp passport for a destination
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-4 px-6 py-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">Country</label>
              <Select value={selectedCountry} onValueChange={(val) => setSelectedCountry(val ?? "")}>
                <SelectTrigger className="rounded-[14px] text-sm font-medium w-full justify-center [&>span]:mx-auto bg-surface-subtle border border-brand/12 text-ink">
                  <SelectValue placeholder="Choose a country" />
                </SelectTrigger>
                <SelectContent className="rounded-[18px]">
                  {availableCountries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              type="button"
              disabled={!selectedCountry}
              onClick={() => {
                onAddBook(selectedCountry);
                setShowAddBook(false);
                setSelectedCountry("");
              }}
              className="w-full rounded-[16px] py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed gradient-jeju shadow-[inset_0_3px_6px_rgba(255,255,255,0.25),0_8px_24px_rgba(59,108,244,0.40)]"
            >
              <span className="flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
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
        <DialogContent className={cn("mx-auto max-w-xs overflow-hidden rounded-[28px] p-0", MODAL_CLS)}>
          <div className={cn("px-6 pb-4 pt-6 text-center", HEADER_CLS)}>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-ink">Scanning NFC...</DialogTitle>
              <DialogDescription className="text-sm text-ink-muted">
                Hold your phone near the stamp station
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex flex-col items-center px-6 py-8 gap-5">
            {/* Animated phone icon with pulsing rings */}
            <div className="relative">
              <div className="absolute -inset-6 animate-ping rounded-full bg-brand/8" style={{ animationDuration: "2s" }} />
              <div className="absolute -inset-4 animate-ping rounded-full bg-brand/12" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-[22px] animate-stamp-pulse gradient-jeju shadow-[inset_0_4px_8px_rgba(255,255,255,0.30),0_12px_32px_rgba(59,108,244,0.45)]">
                <Smartphone className="h-9 w-9 text-white" />
              </div>
            </div>

            {/* Searching indicator dots */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <p className="text-sm font-semibold text-ink-muted">Searching for stamp...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════
          SUCCESS MODAL
          ════════════════════════════ */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className={cn("mx-auto max-w-xs overflow-hidden rounded-[28px] p-0", MODAL_CLS)}>
          <div className={cn("px-6 pb-4 pt-6 text-center", HEADER_CLS)}>
            <DialogHeader>
              <DialogTitle className="text-lg font-black text-ink">
                Stamp Collected! 🎉
              </DialogTitle>
              <DialogDescription className="text-sm text-ink-muted">
                You&apos;ve successfully collected a new stamp
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex flex-col items-center px-6 py-6 gap-4 animate-stamp-fade-in">
            {/* Success icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br from-success/12 to-success/6 border-[1.5px] border-success/25 shadow-[0_8px_24px_rgba(34,197,94,0.20)]">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>

            {/* Location info */}
            <div className="text-center">
              <p className="font-black text-ink text-lg">Cheonjiyeon Falls</p>
              <p className="text-sm font-medium text-ink-muted mt-0.5">천지연 폭포 · Jeju Island</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
