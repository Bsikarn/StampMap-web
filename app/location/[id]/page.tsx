"use client";

import { BottomNav } from "@/components/bottom-nav";
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
  Star, ArrowLeft, Bell, MapPin, Layers,
  ThumbsUp, Send, CheckCircle2, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Using Mock Data (ideally fetched from lib/mock-data.ts)
const locationData = {
  id: "1",
  name: "Geumryongsa Temple",
  koreanName: "금룡사",
  description: "A natural temple on Jeju Island featuring a harmonious landscape formed by rocky outcrops and pine trees. Known for the legend of the blue and yellow dragons.",
  rating: 4.8,
  reviewsCount: 124,
  distance: "2.4 km",
  openTime: "06:00 AM - 06:00 PM",
  collected: true,
};

const reviews = [
  { id: 1, user: "Alice K.", avatar: "AK", avatarColor: "bg-violet-500", rating: 5, date: "2 days ago", comment: "Absolutely breathtaking views! The hike was totally worth it.", likes: 12 },
  { id: 2, user: "Taro M.", avatar: "TM", avatarColor: "bg-emerald-500", rating: 4, date: "1 week ago", comment: "Beautiful scenery and well-maintained trails.", likes: 8 },
];

function StarRating({ rating, size = 16, interactive = false, onRate }: any) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} disabled={!interactive} onClick={() => onRate?.(n)}
          className={interactive ? "cursor-pointer" : "cursor-default"}>
          <Star size={size}
            className={n <= rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-200"}/>
        </button>
      ))}
    </div>
  );
}

export default function LocationDetailPage() {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [show3DModal, setShow3DModal] = useState(false);

  const toggleLike = (id: number) =>
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="relative min-h-dvh bg-slate-100 pb-28">
      
      {/* Top Navigation */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-white/80 px-5 py-4 backdrop-blur-md shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Back to Map</span>
          <span className="inline sm:hidden">Back</span>
        </Link>
        {locationData.collected && (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 shadow-sm ring-1 ring-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600"/>
            <span className="text-xs font-bold text-emerald-700">Collected</span>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        
        {/* Facebook-style Image Card */}
        <div className="rounded-2xl bg-white shadow-card ring-1 ring-black/[0.04]">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-900 leading-none">{locationData.name}</span>
                <span className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  Jeju Official Spot • {locationData.distance} away
                </span>
              </div>
            </div>
            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-50">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Post Image Placeholder */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-50">
            {/* The Mountain/Hero background from before, now contained inside the box */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4FACFE] via-[#6EC6F5] to-[#A3D8F4]"/>
            <svg className="absolute bottom-0 w-full" viewBox="0 0 800 180" preserveAspectRatio="none">
              <path d="M0 180 L0 120 Q100 40 200 90 Q300 140 400 60 Q500 -10 600 70 Q700 130 800 50 L800 180Z" fill="white" opacity="0.12"/>
              <path d="M0 180 L0 140 Q150 70 300 120 Q450 155 600 90 Q720 40 800 100 L800 180Z" fill="white" opacity="0.18"/>
              <path d="M0 180 L0 160 Q200 130 400 150 Q600 165 800 140 L800 180Z" fill="white" opacity="0.25"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center justify-center rounded-xl bg-black/20 px-4 py-3 backdrop-blur-md">
                <ImageIcon className="h-6 w-6 text-white mb-1 opacity-80" />
                <span className="text-xs font-bold text-white tracking-wider">LOCATION IMAGE</span>
              </div>
            </div>
            
            {/* Pop-up trigger overlay */}
            <button 
              onClick={() => setShow3DModal(true)}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-bold text-slate-800 shadow-md backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
            >
              <Layers className="h-4 w-4 text-brand" />
              3D View
            </button>
          </div>

          {/* Post Actions (Like/Comment/Share style) */}
          <div className="flex items-center justify-between border-t border-slate-100 p-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              {locationData.rating} ({locationData.reviewsCount})
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <MessageCircle className="h-5 w-5" />
              Reviews
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <Share2 className="h-5 w-5" />
              Share
            </button>
          </div>
        </div>

        {/* Action chips */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-slate-50">
            <Bell className="h-4 w-4 text-brand"/> Enable Alert
          </button>
          <button className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-slate-50">
            <MapPin className="h-4 w-4 text-brand"/> Get Directions
          </button>
        </div>

        {/* About Section */}
        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04]">
          <h2 className="text-lg font-bold text-slate-900">About this place</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {locationData.description}
          </p>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
            <span className="font-semibold text-slate-700">Opening Hours</span>
            <span className="font-medium text-brand">{locationData.openTime}</span>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Community Reviews</h2>

          {/* Write review */}
          <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04]">
            <p className="mb-3 text-sm font-bold text-slate-800">Share your experience</p>
            <StarRating rating={userRating} size={28} interactive onRate={setUserRating}/>
            <Textarea
              placeholder="What did you think of this place?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="mt-4 min-h-[80px] resize-none border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 focus-visible:ring-brand"
            />
            <Button
              className="mt-4 w-full rounded-xl bg-brand py-5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-40"
              disabled={!userRating || !reviewText.trim()}
            >
              <Send className="mr-2 h-4 w-4"/> Post Review
            </Button>
          </div>

          {/* Review cards */}
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/[0.04]">
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

      {/* 3D View Modal */}
      <Dialog open={show3DModal} onOpenChange={setShow3DModal}>
        <DialogContent className="mx-auto max-w-sm rounded-[24px] p-6">
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

      <BottomNav/>
    </div>
  );
}
