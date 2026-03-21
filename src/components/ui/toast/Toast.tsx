"use client";
import React, { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  isVisible,
  onClose
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          onClose();
        }, 300);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeClasses = {
    success: "bg-success-500",
    error: "bg-error-500",
    warning: "bg-warning-500",
    info: "bg-brand-500",
  };

  const iconPaths = {
    success: "M5 13l4 4L4.5 12.5 8 8l4-4z",
    error: "M6 18L18 6M6 6l12 12",
    warning: "M12 9v2m0 4h.01M12 9V9m0 4h.01",
    info: "M13 16h-1v-4h-1m1-4h-1v-4h-1m1-4h-1v-4h-1",
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg text-white ${typeClasses[type]} ${
        isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } transition-all duration-300 ease-out`}
      role="alert"
      aria-live="polite"
    >
      <svg
        className="w-5 h-5 mr-2 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={iconPaths[type]}
        />
      </svg>
      <span className="text-sm font-medium">{message}</span>
      
      <button
        onClick={onClose}
        className="ml-4 text-white/80 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
