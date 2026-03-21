"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  isCollapsed = false,
  onToggle,
  className = ""
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const { isDark } = useTheme();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const paddingLeft = level * 16 + 16;

    return (
      <div key={item.id}>
        <a
          href={item.href || "#"}
          className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
            isCollapsed && level > 0 ? "hidden" : ""
          } ${
            isDark
              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.id);
            }
          }}
        >
          {item.icon && (
            <span className="mr-3 flex-shrink-0">{item.icon}</span>
          )}
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-brand-500 text-white rounded-full">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </a>
        
        {hasChildren && !isCollapsed && (
          <div className={`overflow-hidden transition-all duration-200 ${
            isExpanded ? "max-h-96" : "max-h-0"
          }`}>
            {item.children?.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } ${className}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h2>
          )}
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                className={`w-5 h-5 transition-transform ${isCollapsed ? "" : "rotate-180"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7 7M15 5l-7-7 7 7"
                />
              </svg>
            </button>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {items.map(item => renderSidebarItem(item))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
