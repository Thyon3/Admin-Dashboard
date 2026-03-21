"use client";
import React from "react";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "error" | "warning";
  label?: string;
  description?: string;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  color = "primary",
  label,
  description,
  className = ""
}) => {
  const sizeClasses = {
    sm: {
      toggle: "w-8 h-4",
      thumb: "w-3 h-3",
      translate: "translate-x-4"
    },
    md: {
      toggle: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-5"
    },
    lg: {
      toggle: "w-14 h-8",
      thumb: "w-7 h-7",
      translate: "translate-x-6"
    }
  };

  const colorClasses = {
    primary: {
      checked: "bg-brand-500",
      unchecked: "bg-gray-300 dark:bg-gray-600"
    },
    success: {
      checked: "bg-success-500",
      unchecked: "bg-gray-300 dark:bg-gray-600"
    },
    error: {
      checked: "bg-error-500",
      unchecked: "bg-gray-300 dark:bg-gray-600"
    },
    warning: {
      checked: "bg-warning-500",
      unchecked: "bg-gray-300 dark:bg-gray-600"
    }
  };

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out
          ${sizeClasses[size].toggle}
          ${checked ? colorClasses[color].checked : colorClasses[color].unchecked}
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}
        `}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`
            inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out
            ${sizeClasses[size].thumb}
            ${checked ? sizeClasses[size].translate : "translate-x-0"}
          `}
        />
      </button>
      
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <div className={`text-sm font-medium ${
              disabled ? "text-gray-400" : "text-gray-900 dark:text-white"
            }`}>
              {label}
            </div>
          )}
          {description && (
            <div className={`text-xs ${
              disabled ? "text-gray-400" : "text-gray-500 dark:text-gray-400"
            }`}>
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Toggle;
