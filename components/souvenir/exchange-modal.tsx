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
import { Sparkles, CheckCircle2 } from "lucide-react";
import { SouvenirItem } from "./souvenir-card";

interface ExchangeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSouvenir: SouvenirItem | null;
}

/**
 * ExchangeModal — Premium glassmorphism stamp exchange dialog.
 * Collects passport book selection and ID before confirming exchange.
 * Shows a success state after confirmation.
 */
export function ExchangeModal({ isOpen, onOpenChange, selectedSouvenir }: ExchangeModalProps) {
  const [passportBook, setPassportBook] = useState("");
  const [passportId,   setPassportId]   = useState("");
  const [exchanged,    setExchanged]    = useState(false);

  const handleExchange = () => {
    setExchanged(true);
    setTimeout(() => {
      onOpenChange(false);
      setExchanged(false);
      setPassportBook("");
      setPassportId("");
    }, 2000);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setExchanged(false);
      setPassportBook("");
      setPassportId("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="mx-auto max-w-sm overflow-hidden rounded-[28px] border-0 p-0"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.80)",
          boxShadow: "0 24px 80px rgba(59,108,244,0.20), 0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── Gradient header strip ── */}
        <div
          className="px-6 pb-4 pt-6"
          style={{
            background: "linear-gradient(135deg, rgba(59,108,244,0.06) 0%, rgba(139,92,246,0.05) 100%)",
            borderBottom: "1px solid rgba(59,108,244,0.08)",
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-[#0D1238]">
              {exchanged ? "🎉 Exchange Complete!" : "Exchange Stamps"}
            </DialogTitle>
            <DialogDescription className="text-sm text-[#8A91B8]">
              {exchanged
                ? "Your souvenir is on its way!"
                : <>Redeem for <span className="font-semibold text-[#0D1238]">{selectedSouvenir?.name}</span></>
              }
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-5 space-y-4">
          {exchanged ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center py-4 gap-3 animate-stamp-fade-in">
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
              <div className="text-center">
                <p className="text-3xl mb-1">{selectedSouvenir?.image}</p>
                <p className="font-bold text-[#0D1238]">{selectedSouvenir?.name}</p>
                <p className="text-xs text-[#8A91B8] mt-0.5">Successfully redeemed</p>
              </div>
            </div>
          ) : (
            <>
              {/* ── Souvenir preview ── */}
              <div
                className="flex items-center gap-3 rounded-[18px] p-3.5"
                style={{
                  background: "linear-gradient(135deg, #EEF2FF 0%, #F3F0FF 100%)",
                  border: "1px solid rgba(59,108,244,0.12)",
                }}
              >
                <span className="text-3xl">{selectedSouvenir?.image}</span>
                <div>
                  <p className="text-sm font-bold text-[#0D1238]">{selectedSouvenir?.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs font-black text-[#3B6CF4]">{selectedSouvenir?.stampsRequired}</span>
                    <span className="text-[11px] text-[#8A91B8]">stamps required</span>
                  </div>
                </div>
              </div>

              {/* ── Passport Book selector ── */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8A91B8]">
                  Select Passport Book
                </label>
                <Select value={passportBook} onValueChange={(val) => setPassportBook(val ?? "")}>
                  <SelectTrigger
                    className="rounded-[14px] border-0 text-sm font-medium"
                    style={{
                      background: "#F2F4FC",
                      border: "1px solid rgba(59,108,244,0.12)",
                      color: "#0D1238",
                    }}
                  >
                    <SelectValue placeholder="Choose a passport book" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[18px]">
                    <SelectItem value="jeju">🌋 Jeju Island Passport</SelectItem>
                    <SelectItem value="taiwan">🏮 Taiwan Passport</SelectItem>
                    <SelectItem value="japan">⛩️ Japan Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ── Passport ID input ── */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8A91B8]">
                  Passport ID
                </label>
                <Input
                  placeholder="Enter your passport ID"
                  value={passportId}
                  onChange={(e) => setPassportId(e.target.value)}
                  className="rounded-[14px] border-0 text-sm font-medium"
                  style={{
                    background: "#F2F4FC",
                    border: "1px solid rgba(59,108,244,0.12)",
                    color: "#0D1238",
                  }}
                />
              </div>

              {/* ── Confirm button ── */}
              <button
                onClick={handleExchange}
                disabled={!passportBook || !passportId.trim()}
                className="w-full rounded-[16px] py-3.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #3B6CF4 0%, #2952D9 100%)",
                  boxShadow: "inset 0 3px 6px rgba(255,255,255,0.25), 0 8px 24px rgba(59,108,244,0.40)",
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4"/>
                  Confirm Exchange
                </span>
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
