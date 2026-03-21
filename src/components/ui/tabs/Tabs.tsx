"use client";
import React, { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
  variant?: "default" | "pills";
}

const Tabs: React.FC<TabsProps> = ({ 
  items, 
  defaultTab,
  className = "",
  variant = "default"
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || "");

  const handleTabClick = (tabId: string) => {
    const tab = items.find(item => item.id === tabId);
    if (tab && !tab.disabled) {
      setActiveTab(tabId);
    }
  };

  const tabButtonClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = "px-4 py-2 text-sm font-medium transition-colors";
    
    if (variant === "pills") {
      return `${baseClasses} rounded-full ${
        isActive
          ? "bg-brand-500 text-white"
          : isDisabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-600 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
      }`;
    }
    
    return `${baseClasses} border-b-2 ${
      isActive
        ? "border-brand-500 text-brand-500"
        : isDisabled
        ? "text-gray-400 cursor-not-allowed border-transparent"
        : "border-transparent text-gray-600 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
    }`;
  };

  return (
    <div className={className}>
      <div 
        className="flex space-x-1 mb-4"
        role="tablist"
      >
        {items.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={tabButtonClasses(activeTab === tab.id, tab.disabled || false)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div>
        {items.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className={activeTab === tab.id ? "block" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
