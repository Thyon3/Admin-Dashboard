"use client";
import React, { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  variant?: "default" | "bordered";
}

const Accordion: React.FC<AccordionProps> = ({ 
  items, 
  allowMultiple = false,
  className = "",
  variant = "default"
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultOpen).map(item => item.id))
  );

  const toggleItem = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item?.disabled) return;

    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (allowMultiple) {
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
      } else {
        return newSet.has(itemId) ? new Set() : new Set([itemId]);
      }
      return newSet;
    });
  };

  const variantClasses = {
    default: "space-y-2",
    bordered: "border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700",
  };

  const itemClasses = variant === "bordered" ? "p-4" : "";

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div key={item.id} className={itemClasses}>
            <button
              onClick={() => toggleItem(item.id)}
              disabled={item.disabled}
              className={`w-full flex items-center justify-between p-4 text-left font-medium transition-colors ${
                item.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : isOpen
                  ? "text-brand-500"
                  : "text-gray-700 hover:text-brand-500 dark:text-gray-300 dark:hover:text-brand-500"
              }`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span>{item.title}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
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
            
            <div
              id={`accordion-content-${item.id}`}
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
              aria-hidden={!isOpen}
            >
              <div className="p-4 text-gray-600 dark:text-gray-400">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
