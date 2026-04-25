"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Star, Bell, MapPin, Layers, ThumbsUp, Send,
  CheckCircle2, Share2, Image as ImageIcon, XIcon
} from "lucide-react";
import { StarRating } from "@/components/location/star-rating";
import { locationData, locationReviews as reviews, type ReviewData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function LocationContent() {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [show3DModal, setShow3DModal] = useState(false);

  const toggleLike = (id: number) =>
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-4 z-10 text-slate-800 mt-2 pb-16">
        <div className="rounded-2xl glass-heavy shadow-soft ring-1 ring-black/[0.04] p-4 sm:p-6 mb-6">
          {/* Post Image Placeholder */}
          <div className="relative -mt-10 sm:-mt-14 md:-mt-16 aspect-video w-full overflow-hidden rounded-2xl bg-slate-50 shadow-md border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4FACFE] via-[#6EC6F5] to-[#A3D8F4]" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center justify-center rounded-xl bg-black/20 px-4 py-3 backdrop-blur-md">
                <ImageIcon className="h-6 w-6 text-white mb-1 opacity-80" />
                <span className="text-xs font-bold text-white tracking-wider">LOCATION IMAGE</span>
              </div>
            </div>

            {/* Pop-up trigger overlay */}
            <div
              onClick={(e) => { e.stopPropagation(); setShow3DModal(true); }}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-bold text-slate-800 shadow-lg backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Layers className="h-4 w-4 text-brand" />
              3D View
            </div>
          </div>

          {/* Location Name & Distance */}
          <div className="mt-5 flex flex-col items-center text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {locationData.name}
            </h1>
            <div className="mt-1.5 flex items-center justify-center gap-1.5 flex-wrap">
              <p className="text-sm sm:text-base font-medium text-slate-500">
                Jeju Official Spot • {locationData.distance} away
              </p>
              {locationData.collected && (
                <div className="flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 shadow-sm ring-1 ring-success/25 ml-1">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span className="text-[11px] font-bold text-success uppercase tracking-wide">Collected</span>
                </div>
              )}
            </div>
          </div>

          {/* Unified Action Buttons Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-slate-100">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              {locationData.rating} ({locationData.reviewsCount})
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-slate-100">
              <Bell className="h-4 w-4 text-brand" />
              Alert
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-slate-100">
              <MapPin className="h-4 w-4 text-brand" />
              Directions
            </button>
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-slate-100">
              <Share2 className="h-4 w-4 text-slate-500" />
              Share
            </button>
          </div>
        </div>

        {/* About Section */}
        <section className="mt-4 px-2">
          <h2 className="text-lg font-bold text-slate-900">About this place</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {locationData.description}
          </p>
          <div className="mt-3 flex items-center justify-between rounded-xl glass p-3 text-sm shadow-sm ring-1 ring-white/60">
            <span className="font-semibold text-slate-700">Opening Hours</span>
            <span className="font-medium text-brand">{locationData.openTime}</span>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-6 px-2">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Community Reviews</h2>

          {/* Write review */}
          <div className="mb-6 rounded-2xl glass p-4 shadow-sm ring-1 ring-white/60">
            <p className="mb-2 text-sm font-bold text-slate-800">Share your experience</p>
            <StarRating rating={userRating} size={24} interactive onRate={setUserRating} />
            <Textarea
              placeholder="What did you think of this place?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="mt-4 min-h-[80px] resize-none border-white/50 bg-white/40 text-sm placeholder:text-slate-500 focus-visible:ring-brand"
            />
            <Button
              className="mt-4 w-full rounded-xl gradient-jeju py-5 text-sm font-bold text-white shadow-soft-md disabled:opacity-40"
              disabled={!userRating || !reviewText.trim()}
            >
              <Send className="mr-2 h-4 w-4" /> Post Review
            </Button>
          </div>

          {/* Review cards */}
          <div className="space-y-3">
            {reviews.map((r: ReviewData) => (
              <div key={r.id} className="rounded-2xl glass p-4 shadow-sm ring-1 ring-white/60">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ${r.avatarColor}`}>
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-slate-900 leading-none">{r.user}</p>
                    <p className="mt-1 text-xs font-medium text-slate-400">{r.date}</p>
                  </div>
                  <StarRating rating={r.rating} size={14} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{r.comment}</p>
                <div className="mt-3 flex items-center gap-4 border-t border-white/40 pt-3">
                  <button
                    onClick={() => toggleLike(r.id)}
                    className={cn("flex items-center gap-1.5 text-xs font-bold transition-all", likedIds.includes(r.id) ? "text-brand" : "text-slate-500 hover:text-slate-800")}
                  >
                    <ThumbsUp className={cn("h-4 w-4", likedIds.includes(r.id) ? "fill-brand" : "")} />
                    {r.likes + (likedIds.includes(r.id) ? 1 : 0)} Helpful
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 3D View Modal - BIGGER and CLEANER as requested */}
      <Dialog open={show3DModal} onOpenChange={setShow3DModal}>
        <DialogContent 
          className="mx-auto w-[90vw] max-w-4xl h-[80vh] rounded-[32px] p-0 overflow-hidden bg-transparent border-0 shadow-none"
          showCloseButton={false}
        >
          <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center">
            
            {/* Minimal close button overlayed on the 3D scene */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 z-50 rounded-full bg-black/40 text-white hover:bg-white/20 hover:text-white"
              onClick={() => setShow3DModal(false)}
            >
              <XIcon className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col items-center justify-center gap-4">
               <Layers className="h-16 w-16 text-brand animate-pulse" />
               <p className="text-xl font-bold tracking-[0.2em] text-white uppercase text-center">
                 Interactive 3D View
               </p>
               <p className="text-sm font-medium text-slate-400">
                 (Large 3D Canvas Placeholder)
               </p>
            </div>
            
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
