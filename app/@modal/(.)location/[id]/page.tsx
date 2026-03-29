"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Star, Bell, MapPin, Share2, Layers, CheckCircle2, ThumbsUp, Send, Image as ImageIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { locationData, locationReviews as reviews, type ReviewData } from "@/lib/mock-data";
import { StarRating } from "@/components/location/star-rating";

export default function LocationModal() {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [show3DModal, setShow3DModal] = useState(false);
  
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [dragY, setDragY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Trigger entrance slide-up on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      router.back();
    }, 400); // Matches the exit transition duration
  };

  const toggleLike = (id: number) =>
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop > 5) return;
    setIsDragging(true);
    setStartY('touches' in e ? e.touches[0].clientY : e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = currentY - startY;
    
    // Only apply drag transform if pulling downwards
    if (diff > 0) {
      setDragY(diff);
    } else {
      setIsDragging(false); 
      setDragY(0);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (dragY > 180) {
      handleClose();
    } else {
      setDragY(0); // Snap back reliably
    }
  };

  return (
    // Outer modal overlay container covering the screen.
    <div className="fixed inset-0 z-[100] flex flex-col justify-start">
      
      {/* Scrollable drawer container */}
      <div 
        ref={scrollRef}
        className="relative w-full h-full overflow-y-auto overflow-x-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        style={{ 
          transform: `translateY(${!mounted || isClosing ? '100%' : dragY + 'px'})`, 
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' 
        }}
      >
        {/* ── Background that scrolls with content ── */}
        <div className="absolute top-0 inset-x-0 bottom-[-500px] -z-10 pointer-events-none flex flex-col">
          {/* 40vh gradient from transparent to white */}
          <div className="h-[40vh] shrink-0 bg-gradient-to-b from-transparent to-white" />
          {/* Solid white for the rest */}
          <div className="flex-grow bg-white" />
        </div>

        {/* ── Transparent Top Header / Drag Area ── */}
        <div className="w-full flex-col flex shrink-0 relative z-20 pt-6 pb-4" onClick={(e) => {
           // Clicking on empty grabber area goes back
           if (e.target === e.currentTarget) handleClose();
        }}>
          {/* Apple drag grabber */}
          <div className="mx-auto h-[6px] w-14 rounded-full bg-slate-400/80 drop-shadow-sm pointer-events-none mt-4 sm:mt-10" />
        </div>

        {/* ── Main content wrapper ── */}
        <div className="mx-auto w-full max-w-2xl px-4 z-10 text-slate-800 mt-2 pb-16">
          
          <div className="rounded-2xl bg-white/95 backdrop-blur-md shadow-card-lg ring-1 ring-black/[0.04] p-4 sm:p-6 mb-6">
            
            {/* Post Image Placeholder (Overlapping top edge) */}
            <div className="relative -mt-6 sm:-mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-slate-50 shadow-md">
              {/* Background pattern inside image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4FACFE] via-[#6EC6F5] to-[#A3D8F4]"/>
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
                  <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 shadow-sm ring-1 ring-emerald-200 ml-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600"/>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">Collected</span>
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
            <div className="mt-3 flex items-center justify-between rounded-xl bg-white/50 p-3 text-sm backdrop-blur-sm shadow-sm ring-1 ring-slate-200/50">
              <span className="font-semibold text-slate-700">Opening Hours</span>
              <span className="font-medium text-brand">{locationData.openTime}</span>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="mt-6 px-2">
            <h2 className="mb-4 text-lg font-bold text-slate-900">Community Reviews</h2>

            <div className="mb-6 rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-sm ring-1 ring-slate-200/50">
              <p className="mb-2 text-sm font-bold text-slate-800">Share your experience</p>
              <StarRating rating={userRating} size={24} interactive onRate={setUserRating}/>
              <Textarea
                placeholder="What did you think of this place?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-4 min-h-[80px] resize-none border-slate-200 bg-white/50 text-sm placeholder:text-slate-400 focus-visible:ring-brand"
              />
              <Button
                className="mt-4 w-full rounded-xl bg-brand py-5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-40"
                disabled={!userRating || !reviewText.trim()}
              >
                <Send className="mr-2 h-4 w-4"/> Post Review
              </Button>
            </div>

            <div className="space-y-3">
              {reviews.map((r: ReviewData) => (
                <div key={r.id} className="rounded-2xl bg-white/70 backdrop-blur-sm p-4 shadow-sm ring-1 ring-slate-200/50">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ${r.avatarColor}`}>
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-slate-900 leading-none">{r.user}</p>
                      <p className="mt-1 text-xs font-medium text-slate-400">{r.date}</p>
                    </div>
                    <StarRating rating={r.rating} size={14}/>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{r.comment}</p>
                  <div className="mt-3 flex items-center gap-4 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => toggleLike(r.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-all ${likedIds.includes(r.id) ? "text-brand" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${likedIds.includes(r.id) ? "fill-brand" : ""}`}/>
                      {r.likes + (likedIds.includes(r.id) ? 1 : 0)} Helpful
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* 3D View Modal */}
      <Dialog open={show3DModal} onOpenChange={setShow3DModal}>
        <DialogContent className="mx-auto max-w-sm rounded-[24px] p-6 z-[110]">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200">
              <Layers className="h-8 w-8 text-brand" />
            </div>
            <DialogTitle className="text-xl font-bold">3D Viewer</DialogTitle>
            <DialogDescription className="text-sm font-medium mt-2">
              Explore {locationData.name} in an immersive 3D environment.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="flex h-32 w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
               <p className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                 <ImageIcon className="h-5 w-5"/>
                 3D Canvas Placeholder
               </p>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500 text-center">
              (Interactive 3D model will be loaded here in a future update)
            </p>
          </div>
          <Button
            onClick={() => setShow3DModal(false)}
            className="w-full rounded-xl bg-brand py-5 text-sm font-bold text-white hover:bg-blue-700"
          >
            Close Viewer
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
