import React from "react";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  thickness?: "thin" | "medium" | "thick";
  color?: "gray" | "primary" | "success" | "error" | "warning";
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  variant = "solid",
  thickness = "thin",
  color = "gray",
  className = ""
}) => {
  const orientationClasses = {
    horizontal: "w-full h-px",
    vertical: "h-full w-px",
  };

  const variantClasses = {
    solid: "",
    dashed: "border-dashed",
    dotted: "border-dotted",
  };

  const thicknessClasses = {
    thin: "border-t",
    medium: "border-t-2",
    thick: "border-t-4",
  };

  const colorClasses = {
    gray: "border-gray-200 dark:border-gray-700",
    primary: "border-brand-300 dark:border-brand-600",
    success: "border-success-300 dark:border-success-600",
    error: "border-error-300 dark:border-error-600",
    warning: "border-warning-300 dark:border-warning-600",
  };

  const borderClasses = `${variantClasses[variant]} ${thicknessClasses[thickness]} ${colorClasses[color]}`;

  return (
    <div
      className={`${orientationClasses[orientation]} ${borderClasses} ${className}`}
      role="separator"
      aria-orientation={orientation}
    />
  );
};

export default Divider;
