"use client";

import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Star, ArrowLeft, Bell, MapPin, Layers,
  ThumbsUp, Send, CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    user: "Alice K.",
    avatar: "AK",
    avatarColor: "bg-violet-500",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely breathtaking views from the top! The hike was challenging but totally worth it.",
    likes: 12,
  },
  {
    id: 2,
    user: "Taro M.",
    avatar: "TM",
    avatarColor: "bg-emerald-500",
    rating: 4,
    date: "1 week ago",
    comment: "Beautiful scenery and well-maintained trails. Got there early to avoid crowds — totally worth it.",
    likes: 8,
  },
  {
    id: 3,
    user: "Sophie L.",
    avatar: "SL",
    avatarColor: "bg-rose-500",
    rating: 5,
    date: "2 weeks ago",
    comment: "One of the most memorable experiences in Jeju. The stamp station is near the summit rest area.",
    likes: 15,
  },
];

function StarRating({
  rating, size = 16, interactive = false, onRate,
}: {
  rating: number; size?: number; interactive?: boolean; onRate?: (n: number) => void;
}) {
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
  const [likedIds, setLikedIds]     = useState<number[]>([]);

  const toggleLike = (id: number) =>
    setLikedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  /* ── stamp collected state (demo) ── */
  const stamped = true;

  return (
    <div className="relative min-h-dvh bg-slate-50 pb-28">

      {/* ── Hero ── */}
      <div className="relative h-72 w-full overflow-hidden">
        {/* Gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4FACFE] via-[#6EC6F5] to-[#A3D8F4]"/>
        {/* Mountain silhouette */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 800 180" preserveAspectRatio="none">
          <path d="M0 180 L0 120 Q100 40 200 90 Q300 140 400 60 Q500 -10 600 70 Q700 130 800 50 L800 180Z"
            fill="white" opacity="0.12"/>
          <path d="M0 180 L0 140 Q150 70 300 120 Q450 155 600 90 Q720 40 800 100 L800 180Z"
            fill="white" opacity="0.18"/>
          <path d="M0 180 L0 160 Q200 130 400 150 Q600 165 800 140 L800 180Z"
            fill="white" opacity="0.25"/>
        </svg>

        {/* Stamp badge */}
        {stamped && (
          <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-card backdrop-blur-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-brand"/>
            <span className="text-[11px] font-bold text-brand">Collected</span>
          </div>
        )}

        {/* Back */}
        <Link href="/"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-card backdrop-blur-sm transition-colors hover:bg-white">
          <ArrowLeft className="h-4.5 w-4.5 text-slate-700"/>
        </Link>

        {/* 3D View */}
        <button className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-card backdrop-blur-sm transition-colors hover:bg-white">
          <Layers className="h-3.5 w-3.5"/>
          3D View
        </button>
      </div>

      {/* ── Content ── */}
      <div className="relative -mt-5 rounded-t-3xl bg-slate-50 px-0 pt-0">
        <div className="mx-auto max-w-2xl px-5 pt-6">

          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Hallasan Mountain</h1>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5"/>
                Jeju Island, South Korea
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400"/>
                <span className="text-lg font-bold text-slate-900">4.7</span>
              </div>
              <span className="text-xs text-slate-400">{reviews.length} reviews</span>
            </div>
          </div>

          {/* Action chips */}
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-1.5 rounded-xl bg-brand/8 px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/15">
              <Bell className="h-4 w-4"/>Alert
            </button>
            <button className="flex items-center gap-1.5 rounded-xl bg-brand/8 px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/15">
              <MapPin className="h-4 w-4"/>Direction
            </button>
          </div>

          {/* History */}
          <section className="mt-7">
            <h2 className="text-base font-bold text-slate-900">About</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Hallasan Mountain (한라산) is a massive shield volcano that forms the bulk of Jeju Island,
              off the southern coast of the Korean Peninsula. Standing at 1,950 m, it is the highest
              peak in South Korea — a <strong className="font-medium text-slate-800">UNESCO World Natural Heritage Site</strong> since 2007.
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              The mountain features diverse ecosystems, from subtropical forests at its base to alpine
              vegetation near its summit. Baengnokdam, the crater lake at the top, is one of Jeju&apos;s
              most iconic natural landmarks.
            </p>
          </section>

          {/* Reviews */}
          <section className="mt-8">
            <h2 className="text-base font-bold text-slate-900">Reviews</h2>

            {/* Rating bars */}
            <div className="mt-3 flex gap-4 rounded-2xl bg-white p-4 shadow-card">
              <div className="flex flex-col items-center justify-center">
                <p className="text-4xl font-bold tracking-tighter text-slate-900">4.7</p>
                <StarRating rating={5} size={12}/>
                <p className="mt-1 text-[11px] text-slate-400">{reviews.length} reviews</p>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-1">
                {[5,4,3,2,1].map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <span className="w-2.5 text-[11px] text-slate-400">{n}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-amber-400 transition-all"
                        style={{ width: n === 5 ? "70%" : n === 4 ? "25%" : n === 3 ? "5%" : "0%" }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Write review */}
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-card">
              <p className="mb-2 text-sm font-semibold text-slate-800">Write a review</p>
              <StarRating rating={userRating} size={26} interactive onRate={setUserRating}/>
              <Textarea
                placeholder="Share your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-3 min-h-[72px] resize-none rounded-xl border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 focus-visible:ring-brand"
              />
              <Button
                className="mt-3 w-full rounded-xl bg-brand py-4 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
                disabled={!userRating || !reviewText.trim()}
              >
                <Send className="mr-2 h-4 w-4"/>Submit Review
              </Button>
            </div>

            {/* Review cards */}
            <div className="mt-3 space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-2xl bg-white p-4 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold text-white ${r.avatarColor}`}>
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{r.user}</p>
                      <p className="text-xs text-slate-400">{r.date}</p>
                    </div>
                    <StarRating rating={r.rating} size={12}/>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{r.comment}</p>
                  <button
                    onClick={() => toggleLike(r.id)}
                    className={`mt-2 flex items-center gap-1.5 text-xs font-medium transition-colors ${likedIds.includes(r.id) ? "text-brand" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5"/>
                    {r.likes + (likedIds.includes(r.id) ? 1 : 0)} helpful
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div className="h-6"/>
        </div>
      </div>

      <BottomNav/>
    </div>
  );
}
