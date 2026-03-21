"use client";
import React, { useState } from "react";

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  showLabels?: boolean;
  disabled?: boolean;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange,
  showValue = true,
  showLabels = true,
  disabled = false,
  className = ""
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {showLabels && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
          }}
          aria-label={`Range slider, current value ${currentValue}`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
        />
        
        {showValue && (
          <div
            className="absolute -top-8 transform -translate-x-1/2 bg-brand-500 text-white text-xs px-2 py-1 rounded"
            style={{ left: `${percentage}%` }}
          >
            {currentValue}
          </div>
        )}
      </div>
      
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #3B82F6;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3B82F6;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]:disabled::-webkit-slider-thumb {
          background: #9CA3AF;
          cursor: not-allowed;
        }
        
        input[type="range"]:disabled::-moz-range-thumb {
          background: #9CA3AF;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default RangeSlider;
