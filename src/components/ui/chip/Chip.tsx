import React from "react";

interface ChipProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "filled";
  color?: "primary" | "success" | "error" | "warning" | "gray";
  size?: "sm" | "md" | "lg";
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  disabled?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  children,
  variant = "default",
  color = "gray",
  size = "md",
  removable = false,
  onRemove,
  className = "",
  disabled = false
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantClasses = {
    default: {
      primary: "bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200",
      success: "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200",
      error: "bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200",
      warning: "bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200",
      gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    },
    outlined: {
      primary: "border border-brand-500 text-brand-500 bg-transparent",
      success: "border border-success-500 text-success-500 bg-transparent",
      error: "border border-error-500 text-error-500 bg-transparent",
      warning: "border border-warning-500 text-warning-500 bg-transparent",
      gray: "border border-gray-500 text-gray-500 bg-transparent",
    },
    filled: {
      primary: "bg-brand-500 text-white",
      success: "bg-success-500 text-white",
      error: "bg-error-500 text-white",
      warning: "bg-warning-500 text-white",
      gray: "bg-gray-500 text-white",
    },
  };

  const baseClasses = "inline-flex items-center rounded-full font-medium transition-colors";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant][color]} ${disabledClasses} ${className}`}
    >
      <span>{children}</span>
      
      {removable && !disabled && (
        <button
          onClick={onRemove}
          className="ml-2 hover:opacity-70 transition-opacity"
          aria-label="Remove chip"
        >
          <svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 4.293a1 1 0 010-1.414z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip;
