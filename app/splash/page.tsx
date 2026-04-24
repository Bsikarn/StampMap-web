"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * SplashPage — Premium Glassmorphism + Claymorphism splash screen.
 * Jeju Island theme: ocean blue, tangerine orange, Hallasan purple.
 * Auto-redirects to the main map after 2.4 seconds.
 */
export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 2400);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-white">

      {/* ── Mesh gradient backdrop ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#FF7B42]/15 blur-3xl" />
        <div className="absolute -right-32 -top-20 h-[450px] w-[450px] rounded-full bg-[#3B6CF4]/12 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/10 blur-3xl" />
        <div className="absolute -bottom-24  left-0    h-[350px] w-[350px] rounded-full bg-[#3B6CF4]/08 blur-3xl" />
      </div>

      {/* ── Animated orbital rings ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <div
          className="h-[380px] w-[380px] animate-spin rounded-full border border-dashed border-[#3B6CF4]/15"
          style={{ animationDuration: "18s" }}
        />
        {/* Mid ring */}
        <div
          className="absolute h-[280px] w-[280px] animate-spin rounded-full border border-dashed border-[#FF7B42]/20"
          style={{ animationDuration: "12s", animationDirection: "reverse" }}
        />
        {/* Inner pulse ring */}
        <div
          className="absolute h-[190px] w-[190px] animate-ping rounded-full border border-[#3B6CF4]/12"
          style={{ animationDuration: "2.8s" }}
        />
      </div>

      {/* ── Main logo card (claymorphism 3D) ── */}
      <div className="relative z-10 flex flex-col items-center animate-stamp-fade-in">

        {/* Outer glow halo */}
        <div className="absolute inset-[-20px] rounded-[36px] bg-gradient-to-br from-[#3B6CF4]/20 via-[#8B5CF6]/10 to-[#FF7B42]/15 blur-2xl" />

        {/* Logo card */}
        <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-[32px] bg-gradient-to-br from-[#3B6CF4] to-[#2952D9] shadow-[inset_0_4px_12px_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(0,0,0,0.15),0_20px_60px_rgba(59,108,244,0.40)]">
          {/* Stamp icon grid */}
          <div className="grid grid-cols-3 gap-[3px] opacity-90">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`h-[10px] w-[10px] rounded-sm ${
                  [0,2,4,6,8].includes(i)
                    ? "bg-white"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
          {/* Shine overlay */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/25 to-transparent" />
        </div>

        {/* App name */}
        <h1 className="mt-7 font-outfit text-[2.4rem] font-black tracking-tight text-[#0D1238] leading-none">
          StampMap
        </h1>
        <p className="mt-2 font-outfit text-sm font-medium tracking-[0.12em] text-[#8A91B8] uppercase">
          Jeju Island Passport
        </p>

        {/* Glass pill badge */}
        <div className="mt-5 flex items-center gap-2 rounded-full glass px-4 py-1.5 shadow-soft">
          <span className="h-2 w-2 rounded-full bg-[#22C55E] shadow-sm" />
          <span className="text-[11px] font-semibold tracking-wide text-[#3D4875]">
            7 Locations · 3 Collected
          </span>
        </div>
      </div>

      {/* ── Floating island badges (decorative) ── */}
      <div className="pointer-events-none absolute left-[8%] top-[18%] animate-float">
        <div className="glass clay-orange flex items-center gap-1.5 rounded-2xl px-3 py-2 shadow-orange">
          <span className="text-lg">🌋</span>
          <span className="text-[11px] font-semibold text-[#FF7B42]">Hallasan</span>
        </div>
      </div>
      <div className="pointer-events-none absolute right-[7%] top-[25%] animate-float-delay">
        <div className="glass clay flex items-center gap-1.5 rounded-2xl px-3 py-2 shadow-soft">
          <span className="text-lg">🌅</span>
          <span className="text-[11px] font-semibold text-[#3B6CF4]">Ilchulbong</span>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[22%] left-[10%] animate-float-delay">
        <div className="glass clay-purple flex items-center gap-1.5 rounded-2xl px-3 py-2 shadow-purple">
          <span className="text-lg">🌊</span>
          <span className="text-[11px] font-semibold text-[#8B5CF6]">Cheonjiyeon</span>
        </div>
      </div>

      {/* ── Loading indicator ── */}
      <div className="absolute bottom-14 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-[#3B6CF4] animate-pulse"
              style={{
                width: i === 1 ? "20px" : "6px",
                animationDelay: `${i * 0.18}s`,
                opacity: i === 1 ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        <p className="text-[11px] font-medium tracking-widest text-[#8A91B8] uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}
