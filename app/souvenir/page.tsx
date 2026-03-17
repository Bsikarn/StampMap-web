"use client";

import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Package, Repeat } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Sample souvenir items
const souvenirItems = [
  {
    id: 1,
    name: "Jeju Dol Hareubang Figurine",
    image: "🗿",
    stampsRequired: 10,
    inStock: true,
  },
  {
    id: 2,
    name: "Hallasan Enamel Pin",
    image: "📍",
    stampsRequired: 5,
    inStock: true,
  },
  {
    id: 3,
    name: "Tangerine Tea Collection",
    image: "🍊",
    stampsRequired: 8,
    inStock: false,
  },
  {
    id: 4,
    name: "Haenyeo Postcard Set",
    image: "🏊‍♀️",
    stampsRequired: 3,
    inStock: true,
  },
  {
    id: 5,
    name: "Jeju Lava Stone Bracelet",
    image: "🪨",
    stampsRequired: 15,
    inStock: true,
  },
  {
    id: 6,
    name: "Cherry Blossom Bookmark",
    image: "🌸",
    stampsRequired: 4,
    inStock: false,
  },
];

export default function SouvenirPage() {
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedSouvenir, setSelectedSouvenir] = useState<
    (typeof souvenirItems)[0] | null
  >(null);
  const [passportBook, setPassportBook] = useState("");
  const [passportId, setPassportId] = useState("");

  const openExchangeModal = (item: (typeof souvenirItems)[0]) => {
    setSelectedSouvenir(item);
    setShowExchangeModal(true);
  };

  return (
    <div className="relative min-h-dvh bg-slate-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex items-center gap-4 px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Map</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 leading-none">
              Souvenir Exchange
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Redeem stamps for souvenirs
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 ring-1 ring-brand/20">
            <Package className="h-4 w-4 text-brand" />
            <span className="text-xs font-bold text-brand">
              {souvenirItems.filter((s) => s.inStock).length} available
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Grid - allows unlimited expansion on large screens */}
      <div className="mx-auto grid grid-cols-2 gap-4 px-5 pt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 border-b border-transparent">
        {souvenirItems.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.03] transition-shadow hover:shadow-card-md"
          >
            {/* Product image area */}
            <div className="relative flex aspect-square items-center justify-center bg-slate-50">
              <span className="text-5xl transition-transform duration-200 group-hover:scale-110">{item.image}</span>
              {/* Stock badge */}
              <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                item.inStock
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {item.inStock ? "In stock" : "Sold out"}
              </span>
            </div>

            {/* Card content */}
            <div className="flex flex-1 flex-col p-3">
              <h3 className="text-sm font-bold leading-snug text-slate-900 mt-1">
                {item.name}
              </h3>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-sm font-bold text-brand">{item.stampsRequired}</span>
                <span className="text-xs font-medium text-slate-500">stamps</span>
              </div>

              <Button
                size="sm"
                onClick={() => openExchangeModal(item)}
                disabled={!item.inStock}
                className="mt-3 w-full rounded-xl bg-brand py-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <Repeat className="mr-1 h-3 w-3" />
                Redeem
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Exchange Modal */}
      <Dialog open={showExchangeModal} onOpenChange={setShowExchangeModal}>
        <DialogContent className="mx-auto max-w-sm rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg">Exchange Stamps</DialogTitle>
            <DialogDescription className="text-sm">
              Redeem your stamps for{" "}
              <span className="font-medium text-foreground">
                {selectedSouvenir?.name}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Souvenir preview */}
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <span className="text-3xl">{selectedSouvenir?.image}</span>
              <div>
                <p className="text-sm font-semibold">{selectedSouvenir?.name}</p>
                <p className="text-xs text-stamp-dark-blue">
                  Requires {selectedSouvenir?.stampsRequired} stamps
                </p>
              </div>
            </div>

            {/* Select Passport Book */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Select Passport Book
              </label>
              <Select value={passportBook} onValueChange={(val) => setPassportBook(val ?? "")}>
                <SelectTrigger className="rounded-lg border-gray-200 focus:border-stamp-light-blue focus:ring-stamp-light-blue">
                  <SelectValue placeholder="Choose a passport book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jeju">Jeju Island Passport</SelectItem>
                  <SelectItem value="taiwan">Taiwan Passport</SelectItem>
                  <SelectItem value="japan">Japan Passport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Passport ID */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Passport ID
              </label>
              <Input
                placeholder="Enter your passport ID"
                value={passportId}
                onChange={(e) => setPassportId(e.target.value)}
                className="rounded-lg border-gray-200 focus:border-stamp-light-blue focus:ring-stamp-light-blue"
              />
            </div>

            {/* Exchange button */}
            <Button
              className="w-full rounded-lg bg-stamp-dark-blue py-5 text-sm font-semibold text-white hover:bg-blue-700"
              disabled={!passportBook || !passportId.trim()}
              onClick={() => {
                setShowExchangeModal(false);
                setPassportBook("");
                setPassportId("");
              }}
            >
              <Repeat className="mr-2 h-4 w-4" />
              Exchange
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
