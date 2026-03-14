"use client";

import { BottomNav } from "@/components/bottom-nav";
import { useStampStore } from "@/store/use-stamp-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Stamp,
  BookOpen,
  Plus,
  Nfc,
  Globe,
  Calendar,
  Hash,
  MapPin,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Sample stamp book data
const stampBooks = [
  {
    id: "jeju-1",
    country: "Jeju Island",
    region: "South Korea",
    bookNumber: 1,
    stampsCollected: 3,
    totalStamps: 25,
    lastStampDate: "2025-12-17",
  },
  {
    id: "taiwan-1",
    country: "Taiwan",
    region: "East Asia",
    bookNumber: 1,
    stampsCollected: 8,
    totalStamps: 20,
    lastStampDate: "2025-11-24",
  },
  {
    id: "japan-1",
    country: "Japan",
    region: "East Asia",
    bookNumber: 1,
    stampsCollected: 0,
    totalStamps: 30,
    lastStampDate: "",
  },
];

// Sample stamp pages for e-book viewer
const stampPages = [
  {
    id: "s1",
    locationName: "Hallasan Mountain",
    description: "The highest peak in South Korea at 1,950m. A UNESCO World Natural Heritage Site.",
    stampDate: "Dec 15, 2025",
    stamped: true,
    comment: "Incredible sunrise view from the summit!",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "s2",
    locationName: "Seongsan Ilchulbong",
    description: "UNESCO World Heritage sunrise peak on Jeju's eastern shore. A tuff cone formed by hydrovolcanic eruptions.",
    stampDate: "Dec 16, 2025",
    stamped: true,
    comment: "The sunrise was absolutely breathtaking.",
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: "s3",
    locationName: "Manjanggul Cave",
    description: "One of the finest lava tunnels in the world, stretching 7.4km underground.",
    stampDate: "Dec 17, 2025",
    stamped: true,
    comment: "",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "s4",
    locationName: "Cheonjiyeon Falls",
    description: "Known as the 'Pond of God', this three-tiered waterfall is surrounded by warm-temperate forest.",
    stampDate: "",
    stamped: false,
    comment: "",
    color: "from-purple-400 to-indigo-600",
  },
  {
    id: "s5",
    locationName: "Jeongbang Falls",
    description: "The only waterfall in Asia that falls directly into the ocean from a height of 23m.",
    stampDate: "",
    stamped: false,
    comment: "",
    color: "from-cyan-400 to-blue-500",
  },
];

// Available countries for new book
const availableCountries = [
  { id: "jeju", name: "Jeju Island", region: "South Korea" },
  { id: "taiwan", name: "Taiwan", region: "East Asia" },
  { id: "japan", name: "Japan", region: "East Asia" },
  { id: "thailand", name: "Thailand", region: "Southeast Asia" },
  { id: "singapore", name: "Singapore", region: "Southeast Asia" },
  { id: "vietnam", name: "Vietnam", region: "Southeast Asia" },
];

export default function StampBookPage() {
  const { collectedStamps, totalStamps } = useStampStore();
  const [showChangeBook, setShowChangeBook] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEbook, setShowEbook] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    stampPages.forEach((page) => {
      if (page.comment) initial[page.id] = page.comment;
    });
    return initial;
  });

  const progress = (collectedStamps.length / totalStamps) * 100;

  // NFC scan simulation
  const handleNfcScan = () => {
    setShowNfcModal(true);
    setTimeout(() => {
      setShowNfcModal(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  // E-book page navigation
  const nextPage = () => {
    if (currentPage < stampPages.length - 1) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // Save comment
  const saveComment = (pageId: string, text: string) => {
    setComments((prev) => ({ ...prev, [pageId]: text }));
    setEditingComment(null);
  };

  // E-book overlay view
  if (showEbook) {
    const page = stampPages[currentPage];
    return (
      <div className="relative min-h-dvh bg-[#F5F0E8] pb-8">
        {/* E-book header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-[#F5F0E8]/90 px-5 py-4 backdrop-blur-md">
          <button
            onClick={() => setShowEbook(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-sm font-bold text-foreground">
            Stamp Passport — Jeju Island
          </h1>
          <span className="text-xs text-muted-foreground">
            {currentPage + 1}/{stampPages.length}
          </span>
        </div>

        {/* E-book page content */}
        <div className="mx-auto max-w-lg px-5">
          {/* Page card — styled like a notebook page */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-stamp-md">
            {/* Gradient header with stamp frame */}
            <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${page.color}`}>
              {/* Decorative circles */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-white/10" />

              {/* Stamp frame */}
              <div className={`flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-dashed ${
                page.stamped ? "border-white/80 bg-white/20" : "border-white/30 bg-white/5"
              }`}>
                {page.stamped ? (
                  <div className="text-center">
                    <Stamp className="mx-auto h-8 w-8 text-white" />
                    <p className="mt-1 text-[10px] font-bold uppercase text-white/90">Stamped</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto h-8 w-8 rounded-full border-2 border-dashed border-white/30" />
                    <p className="mt-1 text-[10px] font-medium text-white/50">Not yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Page content */}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{page.locationName}</h2>
                  {page.stampDate && (
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-stamp-dark-blue">
                      <Calendar className="h-3 w-3" />
                      {page.stampDate}
                    </p>
                  )}
                </div>
                <Link
                  href={`/location/${stampPages.indexOf(page) + 1}`}
                  className="flex items-center gap-1 rounded-lg bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-stamp-dark-blue"
                >
                  <MapPin className="h-3 w-3" />
                  Detail
                </Link>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {page.description}
              </p>

              {/* Comment section */}
              <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" />
                  My Notes
                </div>
                {editingComment === page.id ? (
                  <div className="mt-2">
                    <textarea
                      autoFocus
                      defaultValue={comments[page.id] || ""}
                      className="w-full resize-none rounded-lg border border-gray-200 p-3 text-sm focus:border-stamp-light-blue focus:outline-none focus:ring-1 focus:ring-stamp-light-blue"
                      rows={3}
                      placeholder="Write your thoughts about this place..."
                      onBlur={(e) => saveComment(page.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          saveComment(page.id, e.currentTarget.value);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingComment(page.id)}
                    className="mt-2 w-full rounded-lg border border-dashed border-gray-200 p-3 text-left text-sm text-muted-foreground transition-colors hover:border-stamp-light-blue hover:text-foreground"
                  >
                    {comments[page.id] || "Tap to add a note..."}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Page navigation — prev/next */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>

            {/* Page dots */}
            <div className="flex gap-1.5">
              {stampPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPage
                      ? "w-5 bg-stamp-dark-blue"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === stampPages.length - 1}
              className="flex items-center gap-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-stamp-light-bg pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-stamp-light-bg/80 px-5 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">Stamp Book</h1>
        </div>
        {/* NFC Scan button — top right */}
        <button
          onClick={handleNfcScan}
          className="flex items-center gap-1.5 rounded-xl bg-stamp-dark-blue px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
        >
          <Nfc className="h-4 w-4" />
          Scan
        </button>
      </div>

      <div className="mx-auto max-w-lg">
        {/* Progress Card */}
        <div className="mx-5 mt-2 rounded-2xl bg-white p-5 shadow-stamp">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Stamp Progress
              </p>
              <p className="mt-1 text-3xl font-bold text-foreground">
                {collectedStamps.length}
                <span className="text-lg text-muted-foreground">
                  /{totalStamps}
                </span>
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stamp-light-blue/30">
              <Stamp className="h-7 w-7 text-stamp-dark-blue" />
            </div>
          </div>
          <Progress
            value={progress}
            className="mt-4 h-2.5 bg-gray-100 [&>div]:bg-stamp-dark-blue [&>div]:transition-all [&>div]:duration-500"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {totalStamps - collectedStamps.length} more stamps to complete your
            book!
          </p>
        </div>

        {/* Passport Book Cover — Clickable to open e-book */}
        <div className="mx-5 mt-6 flex flex-col items-center">
          <button
            onClick={() => {
              setCurrentPage(0);
              setShowEbook(true);
            }}
            className="group relative w-56 overflow-hidden rounded-2xl bg-gradient-to-b from-stamp-dark-blue to-blue-800 p-6 shadow-stamp-md transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Book cover content */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-full border-2 border-white/30 p-3 transition-colors group-hover:border-white/60">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[3px] text-white/60">
                Stamp Passport
              </p>
              <p className="mt-1 text-lg font-bold text-white">Jeju Island</p>
              <div className="mt-3 h-px w-16 bg-white/20" />
              <p className="mt-3 text-[10px] text-white/50">
                {collectedStamps.length} of {totalStamps} stamps collected
              </p>
              {/* Tap to open hint */}
              <div className="mt-4 rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-white/70 transition-colors group-hover:bg-white/20">
                Tap to open →
              </div>
            </div>
            {/* Gold foil accent */}
            <div className="absolute bottom-3 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-yellow-400/40" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mx-5 mt-6 flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => setShowChangeBook(true)}
            className="w-full rounded-lg border-stamp-dark-blue py-5 text-sm font-semibold text-stamp-dark-blue hover:bg-stamp-light-blue/20"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Change Book
          </Button>
          <Button
            onClick={() => setShowAddBook(true)}
            className="w-full rounded-lg bg-stamp-dark-blue py-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        </div>
      </div>

      {/* ===== MODALS ===== */}

      {/* Change Book Modal */}
      <Dialog open={showChangeBook} onOpenChange={setShowChangeBook}>
        <DialogContent className="mx-auto max-w-sm rounded-2xl">
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
                className="flex w-full items-center gap-3 rounded-xl bg-muted/30 p-3 text-left transition-colors hover:bg-stamp-light-blue/20"
              >
                {/* Book icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stamp-dark-blue/10">
                  <BookOpen className="h-5 w-5 text-stamp-dark-blue" />
                </div>
                {/* Book info */}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-foreground">
                      {book.country}
                    </p>
                    <span className="flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      <Hash className="h-2.5 w-2.5" />
                      {book.bookNumber}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Globe className="h-3 w-3" />
                      {book.region}
                    </span>
                    <span className="flex items-center gap-0.5">
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
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Book Modal */}
      <Dialog open={showAddBook} onOpenChange={setShowAddBook}>
        <DialogContent className="mx-auto max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg">Add New Book</DialogTitle>
            <DialogDescription className="text-sm">
              Select a country to create a new stamp passport book
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Country
              </label>
              <Select value={selectedCountry} onValueChange={(val) => setSelectedCountry(val ?? "")}>
                <SelectTrigger className="rounded-lg border-gray-200 focus:border-stamp-light-blue focus:ring-stamp-light-blue">
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
              className="w-full rounded-lg bg-stamp-dark-blue py-5 text-sm font-semibold text-white hover:bg-blue-700"
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
        <DialogContent className="mx-auto max-w-xs rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              Scanning NFC...
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              Hold your phone near the NFC stamp station
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-8">
            <div className="relative">
              <Smartphone className="h-16 w-16 text-stamp-dark-blue animate-stamp-pulse" />
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-stamp-light-blue animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Searching...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="mx-auto max-w-xs rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              Stamp Collected! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              You&apos;ve successfully collected a new stamp
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <p className="mt-4 font-semibold text-foreground">
              Cheonjiyeon Falls
            </p>
            <p className="text-sm text-muted-foreground">Jeju Island</p>
          </div>
          <Button
            onClick={() => setShowSuccessModal(false)}
            className="w-full rounded-lg bg-stamp-dark-blue font-semibold text-white hover:bg-blue-700"
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
