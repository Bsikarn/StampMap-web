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
import { Repeat } from "lucide-react";
import { SouvenirItem } from "./souvenir-card";

interface ExchangeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSouvenir: SouvenirItem | null;
}

/**
 * ExchangeModal Component
 * 
 * Manages the UI and local state for exchanging stamps for a souvenir.
 * Handles the input fields for passport selection and ID before claiming.
 */
export function ExchangeModal({ isOpen, onOpenChange, selectedSouvenir }: ExchangeModalProps) {
  // Local state for the exchange form
  const [passportBook, setPassportBook] = useState("");
  const [passportId, setPassportId] = useState("");

  const handleExchange = () => {
    // In a real app, dispatch an API call here.
    onOpenChange(false);
    
    // Reset form states
    setPassportBook("");
    setPassportId("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          {/* Souvenir preview banner */}
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
            <span className="text-3xl">{selectedSouvenir?.image}</span>
            <div>
              <p className="text-sm font-semibold">{selectedSouvenir?.name}</p>
              <p className="text-xs text-brand"> {/* changed from text-stamp-dark-blue to text-brand */}
                Requires {selectedSouvenir?.stampsRequired} stamps
              </p>
            </div>
          </div>

          {/* Select Passport Book Dropdown */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Select Passport Book
            </label>
            <Select value={passportBook} onValueChange={(val) => setPassportBook(val ?? "")}>
              <SelectTrigger className="rounded-lg border-gray-200 focus:border-brand focus:ring-brand">
                <SelectValue placeholder="Choose a passport book" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jeju">Jeju Island Passport</SelectItem>
                <SelectItem value="taiwan">Taiwan Passport</SelectItem>
                <SelectItem value="japan">Japan Passport</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Passport ID Input */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Passport ID
            </label>
            <Input
              placeholder="Enter your passport ID"
              value={passportId}
              onChange={(e) => setPassportId(e.target.value)}
              className="rounded-lg border-gray-200 focus:border-brand focus:ring-brand"
            />
          </div>

          {/* Exchange confirmation button */}
          <Button
            className="w-full rounded-lg bg-brand py-5 text-sm font-semibold text-white hover:bg-blue-700"
            disabled={!passportBook || !passportId.trim()}
            onClick={handleExchange}
          >
            <Repeat className="mr-2 h-4 w-4" />
            Exchange
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
