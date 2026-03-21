import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  rounded?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
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

  const borderClasses = border ? "border border-gray-200 dark:border-gray-700" : "";
  const roundedClasses = rounded ? "rounded-lg" : "";

  return (
    <div
      className={`bg-white dark:bg-gray-800 ${shadowClasses[shadow]} ${paddingClasses[padding]} ${borderClasses} ${roundedClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
