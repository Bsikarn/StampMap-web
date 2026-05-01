"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SouvenirItem, useStampStore } from "@/store/use-stamp-store";



interface ExchangeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSouvenir: SouvenirItem | null;
}

/**
 * ExchangeModal — Premium glassmorphism stamp exchange dialog.
 * Uses shadcn/ui Dialog, Select, Input, and Button components.
 * Migrated from inline styles to Tailwind v4 design token utilities.
 */
export function ExchangeModal({ isOpen, onOpenChange, selectedSouvenir }: ExchangeModalProps) {
  const { availableMaps } = useStampStore();
  const [passportBook, setPassportBook] = useState("");
  const [passportId, setPassportId] = useState("");
  const [exchanged, setExchanged] = useState(false);

  // Handle exchange confirmation — shows success state then auto-closes
  const handleExchange = () => {
    setExchanged(true);
    setTimeout(() => {
      onOpenChange(false);
      setExchanged(false);
      setPassportBook("");
      setPassportId("");
    }, 2000);
  };

  // Reset all state when dialog is closed externally
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setExchanged(false);
      setPassportBook("");
      setPassportId("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "mx-auto max-w-sm overflow-hidden rounded-[28px] border-0 p-0",
          "glass-heavy shadow-[0_24px_80px_rgba(59,108,244,0.20),0_8px_24px_rgba(0,0,0,0.06)]"
        )}
      >
        {/* ── Gradient header strip ── */}
        <div className="px-6 pb-4 pt-6 bg-gradient-to-br from-brand/6 to-accent-purple/5 border-b border-brand/8">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-ink">
              {exchanged ? "🎉 Exchange Complete!" : "Exchange Stamps"}
            </DialogTitle>
            <DialogDescription className="text-sm text-ink-muted">
              {exchanged
                ? "Your souvenir is on its way!"
                : <>Redeem for <span className="font-semibold text-ink">{selectedSouvenir?.name}</span></>
              }
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-5 space-y-4">
          {exchanged ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center py-4 gap-3 animate-stamp-fade-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-success/12 border border-success/25 shadow-[0_8px_24px_rgba(34,197,94,0.20)]">
                <CheckCircle2 className="h-12 w-12 text-success" />
              </div>
              <div className="text-center">
                <p className="text-3xl mb-1">{selectedSouvenir?.image}</p>
                <p className="font-bold text-ink">{selectedSouvenir?.name}</p>
                <p className="text-xs text-ink-muted mt-0.5">Successfully redeemed</p>
              </div>
            </div>
          ) : (
            <>
              {/* ── Souvenir preview card ── */}
              <div className="flex items-center gap-3 rounded-[18px] p-3.5 bg-gradient-to-br from-brand-light to-accent-pale border border-brand/12">
                <span className="text-3xl">{selectedSouvenir?.image}</span>
                <div>
                  <p className="text-sm font-bold text-ink">{selectedSouvenir?.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs font-black text-brand">{selectedSouvenir?.stampsRequired}</span>
                    <span className="text-[11px] text-ink-muted">stamps required</span>
                  </div>
                </div>
              </div>

              {/* ── Passport Book selector ── */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Select Passport Book
                </label>
                <Select value={passportBook} onValueChange={(val) => setPassportBook(val ?? "")}>
                  <SelectTrigger
                    className="rounded-[14px] border border-brand/12 bg-surface-subtle text-sm font-medium text-ink w-full justify-center [&>span]:mx-auto"
                  >
                    <SelectValue placeholder="Choose a passport book" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[18px]">
                    {availableMaps.map((map) => (
                      <SelectItem key={map.id} value={map.id}>
                        {map.id === "thailand" ? "🐘" : "🌋"} {map.name} Passport
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ── Passport ID input ── */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Passport ID
                </label>
                <Input
                  placeholder="Enter your passport ID"
                  value={passportId}
                  onChange={(e) => setPassportId(e.target.value)}
                  className="rounded-[14px] border border-brand/12 bg-surface-subtle text-sm font-medium text-ink"
                />
              </div>

              {/* ── Confirm button — shadcn/ui Button ── */}
              <Button
                onClick={handleExchange}
                disabled={!passportBook || !passportId.trim()}
                className={cn(
                  "w-full rounded-[16px] py-3.5 text-sm font-bold text-white h-auto",
                  "gradient-jeju transition-all duration-200 active:scale-[0.98]",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  "shadow-[inset_0_3px_6px_rgba(255,255,255,0.25),0_8px_24px_rgba(59,108,244,0.40)]"
                )}
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Confirm Exchange
                </span>
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
