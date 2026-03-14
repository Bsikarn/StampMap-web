"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 2200);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-brand">

      {/* Background rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[420px] w-[420px] animate-ping rounded-full border border-white/10" style={{ animationDuration: "2.4s" }}/>
        <div className="absolute h-[320px] w-[320px] animate-ping rounded-full border border-white/10" style={{ animationDuration: "2s", animationDelay: "0.3s" }}/>
        <div className="absolute h-[220px] w-[220px] animate-ping rounded-full border border-white/15" style={{ animationDuration: "1.6s", animationDelay: "0.6s" }}/>
      </div>

      {/* Logo card */}
      <div className="relative flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 shadow-card-lg backdrop-blur-sm ring-1 ring-white/20">
          <span className="text-5xl font-black text-white">S</span>
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-white">StampMap</h1>
        <p className="mt-1 text-sm font-medium text-white/60">Your passport to the world</p>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-1.5">
        {[0,1,2].map((i) => (
          <div key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50"
            style={{ animationDelay: `${i * 0.25}s` }}/>
        ))}
      </div>
    </div>
  );
}
