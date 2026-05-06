import React from "react";

interface ProgressBarProps {
  progress: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "error" | "warning";
  showLabel?: boolean;
  showPercentage?: boolean; // Added to match ProgressRing and page usage
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  max = 100, 
  size = "md",
  color = "primary",
  showLabel = false,
  showPercentage = false,
  className = "" 
}) => {
  const displayLabel = showLabel || showPercentage;
  const percentage = Math.min((progress / max) * 100, 100);
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const colorClasses = {
    primary: "bg-brand-500",
    success: "bg-success-500",
    error: "bg-error-500",
    warning: "bg-warning-500",
  };

  return (
    <div className={`w-full ${className}`}>
      {displayLabel && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div 
        className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(percentage)}%`}
      >
        <div 
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
