import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface StampPageData {
  id: string;
  locationName: string;
  koreanName?: string;
  description: string;
  stampDate: string;
  stamped: boolean;
  imageFallback?: string;
  stampImage?: string;
}

interface EbookViewerProps {
  page: StampPageData;
  currentIndex: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export function EbookViewer({ page, currentIndex, totalPages, onNext, onPrev }: EbookViewerProps) {
  return (
    <div className="flex w-full flex-col items-center pb-8 animate-stamp-fade-in">
      {/* Main Page Card */}
      <div className="w-full max-w-sm rounded-[24px] border-[3px] border-brand bg-white p-5 shadow-card-lg">
        {/* Header - Title & Subtitle */}
        <div className="flex items-end justify-between px-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">{page.locationName}</h2>
          {page.koreanName && (
            <span className="text-sm font-medium text-amber-600">{page.koreanName}</span>
          )}
        </div>
        
        {/* Separator Line */}
        <div className="my-3 h-[2px] w-full bg-slate-800" />
        
        {/* Landscape Image Placeholder */}
        <div className="relative mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-md bg-slate-100 ring-1 ring-slate-200">
          {page.imageFallback ? (
            <div className="flex flex-col items-center text-slate-400">
              <ImageIcon className="h-8 w-8 mb-2" />
              <span className="text-xs font-medium">Image Placeholder</span>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
          )}
        </div>
        
        {/* 2-Column Content */}
        <div className="flex items-start gap-4">
          {/* Left: Description */}
          <div className="flex-[3] text-[11px] leading-relaxed text-slate-700">
            {page.description}
          </div>
          
          {/* Right: Stamp & Date Fields */}
          <div className="flex flex-[2] flex-col gap-2">
            {/* Stamp Square */}
            <div className={`flex aspect-square items-center justify-center rounded-lg border-2 ${page.stamped ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-50"}`}>
              {page.stamped ? (
                page.stampImage ? (
                  <div className="relative h-16 w-16">
                     {/* Simulated Stamp Graphics */}
                     <div className="absolute inset-0 rounded-full border border-amber-500/30" />
                     <div className="absolute inset-2 rounded-full border border-amber-500/20" />
                     <div className="absolute inset-x-2 top-1/2 h-4 -translate-y-1/2 bg-amber-500/10" />
                     <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-amber-600 whitespace-nowrap -rotate-12">STAMPED</span>
                  </div>
                ) : (
                   <span className="text-[10px] font-bold text-amber-600">STAMPED</span>
                )
              ) : (
                <span className="text-[10px] font-medium text-slate-300">No stamp</span>
              )}
            </div>
            
            {/* Memo Input */}
            <div className="flex h-12 flex-col justify-center border-t border-slate-200 bg-transparent px-3 transition-colors focus-within:border-brand focus-within:bg-brand/5">
              <input 
                type="text" 
                defaultValue={page.stamped ? page.stampDate : ""}
                placeholder="Tap to write a memo..."
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:font-normal placeholder:text-slate-400"
                maxLength={40}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex h-9 items-center rounded-full border-2 border-brand bg-white px-4 text-xs font-bold text-brand shadow-sm transition-all hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </button>

        {/* Page Indicator */}
        <div className="flex h-9 items-center rounded-full border-2 border-brand bg-white px-4 text-xs font-bold text-brand shadow-sm">
          Page {currentIndex + 1} of {totalPages}
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={currentIndex === totalPages - 1}
          className="flex h-9 items-center rounded-full border-2 border-brand bg-white px-4 text-xs font-bold text-brand shadow-sm transition-all hover:bg-slate-50 disabled:opacity-40"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
