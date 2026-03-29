import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

/**
 * StarRating Component
 * 
 * Renders a row of 5 stars representing a rating. 
 * Can be static (display only) or interactive (for submitting reviews).
 */
export const StarRating = React.memo(({ rating, size = 16, interactive = false, onRate }: StarRatingProps) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button 
          key={n} 
          disabled={!interactive} 
          onClick={() => onRate?.(n)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
          aria-label={`Rate ${n} stars`}
        >
          <Star 
            size={size}
            className={n <= rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-200"}
          />
        </button>
      ))}
    </div>
  );
});
StarRating.displayName = "StarRating";
