"use client";

import { BottomNav } from "@/components/bottom-nav";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, use } from "react";
import { LocationContent } from "@/components/location/location-content";

export default function LocationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
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

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop > 5) return;
    setIsDragging(true);
    setStartY('touches' in e ? e.touches[0].clientY : e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const diff = currentY - startY;

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
      setDragY(0); 
    }
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-50">

      {/* ── DRAWER CONTENT LAYER ── */}
      <div
        ref={scrollRef}
        className="relative flex min-h-dvh flex-col w-full h-full overflow-y-auto overflow-x-hidden touch-pan-y"
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
        {/* Background that scrolls with content */}
        <div className="absolute top-[0] inset-x-0 bottom-[-500px] -z-10 pointer-events-none flex flex-col">
          <div className="h-[40vh] shrink-0 bg-gradient-to-b from-transparent to-white" />
          <div className="flex-grow bg-white" />
        </div>

        {/* Draggable Top Area (Header) */}
        <div
          className="w-full flex-col flex shrink-0 relative z-20 pt-6 pb-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="mx-auto h-[6px] w-14 rounded-full bg-slate-400/80 drop-shadow-sm pointer-events-none mt-4 sm:mt-10" />
        </div>

        {/* Centralized Location View Content & 3D Viewer */}
        <LocationContent locationId={resolvedParams.id} />

      </div>

      <BottomNav />
    </div>
  );
}

