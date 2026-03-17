import { Button } from "@/components/ui/button";
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
import { BookOpen, Hash, Globe, Stamp, Calendar, Plus, Smartphone, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";

// Mock types needed for the modals
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
  // Modals state
  showChangeBook: boolean;
  setShowChangeBook: (open: boolean) => void;
  showAddBook: boolean;
  setShowAddBook: (open: boolean) => void;
  showNfcModal: boolean;
  setShowNfcModal: (open: boolean) => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (open: boolean) => void;

  // Data
  stampBooks: StampBook[];
  availableCountries: CountryOption[];
}

export function BookPageModals({
  showChangeBook, setShowChangeBook,
  showAddBook, setShowAddBook,
  showNfcModal, setShowNfcModal,
  showSuccessModal, setShowSuccessModal,
  stampBooks, availableCountries
}: BookPageModalsProps) {
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <>
      {/* Change Book Modal */}
      <Dialog open={showChangeBook} onOpenChange={setShowChangeBook}>
        <DialogContent className="mx-auto max-w-sm rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Select Stamp Book</DialogTitle>
            <DialogDescription className="text-sm">
              Switch to a different stamp passport book
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-72 space-y-2 overflow-y-auto pt-2">
            {stampBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => setShowChangeBook(false)}
                className="flex w-full items-center gap-3 rounded-2xl bg-slate-50 p-3 text-left ring-1 ring-black/[0.04] transition-all hover:bg-slate-100 hover:shadow-card active:scale-[0.98]"
              >
                {/* Book icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <BookOpen className="h-5 w-5" />
                </div>
                {/* Book info */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-slate-800">
                      {book.country}
                    </p>
                    <span className="flex items-center gap-0.5 rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                      <Hash className="h-2.5 w-2.5" />
                      {book.bookNumber}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[11px] font-medium text-slate-400">
                    <span className="flex items-center gap-0.5">
                      <Globe className="h-3 w-3" />
                      {book.region}
                    </span>
                    <span className="flex items-center gap-0.5 text-brand">
                      <Stamp className="h-3 w-3" />
                      {book.stampsCollected}/{book.totalStamps}
                    </span>
                    {book.lastStampDate && (
                      <span className="flex items-center gap-0.5">
                        <Calendar className="h-3 w-3" />
                        {book.lastStampDate}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Book Modal */}
      <Dialog open={showAddBook} onOpenChange={setShowAddBook}>
        <DialogContent className="mx-auto max-w-sm rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Add New Book</DialogTitle>
            <DialogDescription className="text-sm">
              Select a country to create a new stamp passport book
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Country</label>
              <Select value={selectedCountry} onValueChange={(val) => setSelectedCountry(val ?? "")}>
                <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50 focus:border-brand focus:ring-brand">
                  <SelectValue placeholder="Choose a country" />
                </SelectTrigger>
                <SelectContent>
                  {availableCountries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name} — {country.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full rounded-xl bg-brand py-5 text-sm font-semibold text-white hover:bg-blue-700"
              disabled={!selectedCountry}
              onClick={() => {
                setShowAddBook(false);
                setSelectedCountry("");
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Book
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* NFC Scan Modal */}
      <Dialog open={showNfcModal} onOpenChange={setShowNfcModal}>
        <DialogContent className="mx-auto max-w-xs rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">Scanning NFC...</DialogTitle>
            <DialogDescription className="text-center text-sm">
              Hold your phone near the NFC stamp station
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-8">
            <div className="relative">
              <Smartphone className="animate-stamp-pulse h-16 w-16 text-brand" />
              <div className="absolute -inset-4 animate-spin rounded-full border-2 border-dashed border-brand/40" style={{ animationDuration: "3s" }} />
            </div>
            <p className="mt-6 text-sm font-medium text-slate-500">Searching...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="mx-auto max-w-xs rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">Stamp Collected! 🎉</DialogTitle>
            <DialogDescription className="text-center text-sm">
              You&apos;ve successfully collected a new stamp
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-emerald-100 ring-1 ring-emerald-200">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </div>
            <p className="mt-4 font-bold text-slate-900">Cheonjiyeon Falls</p>
            <p className="text-xs font-medium text-slate-500">Jeju Island</p>
          </div>
          <Button
            onClick={() => setShowSuccessModal(false)}
            className="w-full rounded-xl bg-brand py-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
