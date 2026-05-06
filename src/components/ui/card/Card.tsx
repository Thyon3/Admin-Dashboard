import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  rounded?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title,
  className = "",
  shadow = "md",
  padding = "md",
  border = true,
  rounded = true
}) => {
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const borderClasses = border ? "border border-gray-100 dark:border-white/10" : "";
  const roundedClasses = rounded ? "rounded-2xl" : "";

  return (
    <div
      className={`bg-white dark:bg-gray-900/50 backdrop-blur-sm ${shadowClasses[shadow]} ${paddingClasses[padding]} ${borderClasses} ${roundedClasses} ${className}`}
    >
      {title && (
        <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
