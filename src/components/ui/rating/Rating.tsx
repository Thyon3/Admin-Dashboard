"use client";
import React, { useState } from "react";

interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  max = 5,
  onChange,
  readonly = false,
  size = "md",
  className = ""
}) => {
  const [hoveredValue, setHoveredValue] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleStarClick = (starValue: number) => {
    if (!readonly && onChange) {
      onChange(starValue);
    }
  };

  const handleStarHover = (starValue: number) => {
    if (!readonly) {
      setHoveredValue(starValue);
    }
  };

  const handleStarLeave = () => {
    if (!readonly) {
      setHoveredValue(0);
    }
  };

  const getStarColor = (starPosition: number) => {
    if (readonly) {
      return starPosition <= value ? "text-yellow-400" : "text-gray-300";
    }
    
    if (hoveredValue >= starPosition) {
      return "text-yellow-400";
    }
    
    return starPosition <= value ? "text-yellow-400" : "text-gray-300";
  };

  return (
    <div 
      className={`flex items-center space-x-1 ${className}`}
      onMouseLeave={handleStarLeave}
    >
      {[...Array(max)].map((_, index) => {
        const starPosition = index + 1;
        const isActive = starPosition <= value;
        const isHovered = starPosition <= hoveredValue;
        
        return (
          <button
            key={starPosition}
            onClick={() => handleStarClick(starPosition)}
            onMouseEnter={() => handleStarHover(starPosition)}
            disabled={readonly}
            className={`transition-colors ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"} ${sizeClasses[size]}`}
            aria-label={`Rate ${starPosition} out of ${max}`}
            aria-pressed={isActive}
          >
            <svg
              className={`w-full h-full ${getStarColor(starPosition)}`}
              fill={isActive || isHovered ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292c.279.858 1.164 1.55 2.034 1.55 1.041 0 1.755-.692 2.034-1.55l1.07-3.292c.3-.921-.003-1.603-.902-1.902L12 2.927c-.899-.299-1.603.003-1.902.902L9.028 7.121c-.279.858-1.164 1.55-2.034 1.55-1.041 0-1.755-.692-2.034-1.55L3.922 4.023c-.3-.921.003-1.603.902-1.902L12 2.927c.899-.299 1.603.003 1.902.902l1.07 3.292c.279.858 1.164 1.55 2.034 1.55 1.041 0 1.755-.692 2.034-1.55l1.07-3.292c.3-.921-.003-1.603-.902-1.902z"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
