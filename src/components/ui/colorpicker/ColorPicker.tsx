"use client";
import React, { useState } from "react";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presetColors?: string[];
  showAlpha?: boolean;
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value = "#000000",
  onChange,
  presetColors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080"
  ],
  showAlpha = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const handleColorChange = (color: string) => {
    setInputValue(color);
    onChange?.(color);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange?.(value);
    }
  };

  const handlePresetClick = (color: string) => {
    handleColorChange(color);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:border-brand-500 transition-colors"
        aria-label="Color picker"
        aria-expanded={isOpen}
      >
        <div
          className="w-8 h-8 rounded border border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: inputValue }}
        />
        <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">
          {inputValue.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
          <div className="space-y-4">
            {/* Hex Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hex Color
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                placeholder="#000000"
                aria-label="Hex color input"
              />
            </div>

            {/* Color Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preview
              </label>
              <div
                className="w-full h-16 rounded-md border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: inputValue }}
              />
            </div>

            {/* Preset Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preset Colors
              </label>
              <div className="grid grid-cols-5 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handlePresetClick(color)}
                    className="w-8 h-8 rounded border-2 border-gray-200 dark:border-gray-700 hover:border-brand-500 transition-colors"
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
