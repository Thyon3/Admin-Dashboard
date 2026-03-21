"use client";
import React from "react";

interface StepItem {
  id: string;
  title: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed" | "error";
  icon?: React.ReactNode;
}

interface StepsProps {
  items: StepItem[];
  currentStep?: string;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Steps: React.FC<StepsProps> = ({
  items,
  currentStep,
  direction = "horizontal",
  size = "md",
  className = ""
}) => {
  const getStepStatus = (item: StepItem, index: number) => {
    if (item.status) return item.status;
    
    const currentIndex = items.findIndex(item => item.id === currentStep);
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "in-progress";
    return "pending";
  };

  const sizeClasses = {
    sm: {
      step: "w-8 h-8 text-xs",
      title: "text-sm",
      description: "text-xs"
    },
    md: {
      step: "w-10 h-10 text-sm",
      title: "text-base",
      description: "text-sm"
    },
    lg: {
      step: "w-12 h-12 text-base",
      title: "text-lg",
      description: "text-base"
    }
  };

  const isVertical = direction === "vertical";

  return (
    <div className={`${isVertical ? "space-y-4" : "flex items-center justify-between"} ${className}`}>
      {items.map((item, index) => {
        const status = getStepStatus(item, index);
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.id} className={`flex items-center ${isVertical ? "" : "flex-1"}`}>
            <div className="flex items-center">
              <div
                className={`
                  ${sizeClasses[size].step} 
                  rounded-full flex items-center justify-center font-medium transition-colors
                  ${status === "completed" ? "bg-success-500 text-white" : ""}
                  ${status === "in-progress" ? "bg-brand-500 text-white" : ""}
                  ${status === "error" ? "bg-error-500 text-white" : ""}
                  ${status === "pending" ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400" : ""}
                `}
              >
                {item.icon || index + 1}
              </div>
              
              <div className={`ml-4 ${isVertical ? "" : "flex-1"}`}>
                <div className={`font-medium ${sizeClasses[size].title} ${
                  status === "completed" ? "text-success-600 dark:text-success-400" : ""
                } ${status === "in-progress" ? "text-brand-600 dark:text-brand-400" : ""}
                  ${status === "error" ? "text-error-600 dark:text-error-400" : ""}
                  ${status === "pending" ? "text-gray-600 dark:text-gray-400" : ""
                }`}>
                  {item.title}
                </div>
                {item.description && (
                  <div className={`mt-1 ${sizeClasses[size].description} text-gray-500 dark:text-gray-400`}>
                    {item.description}
                  </div>
                )}
              </div>
            </div>
            
            {!isLast && (
              <div className={`${
                isVertical ? "ml-5 mt-2 mb-2" : "ml-4 flex-1"
              } h-px ${
                status === "completed" ? "bg-success-500" : "bg-gray-200 dark:bg-gray-700"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
