"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

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
    const isActive = pathname === item.href || item.children?.some(c => c.href === pathname);
    const isChildActive = pathname === item.href;

    return (
      <div key={item.id} className="w-full">
        <div
          className={`flex items-center px-3 py-2.5 my-0.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer group ${
            isActive && level === 0 
              ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
              : isChildActive 
                ? "bg-brand-50 dark:bg-brand-900/20 text-brand-500"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          } ${isCollapsed && level > 0 ? "hidden" : ""}`}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.id);
            }
          }}
        >
          {item.icon && (
            <span className={`mr-3 flex-shrink-0 transition-colors ${
              isActive && level === 0 ? "text-white" : "group-hover:text-brand-500"
            }`}>
              {item.icon}
            </span>
          )}
          
          {!isCollapsed && (
            <>
              <span className="flex-1 truncate">
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  item.label
                )}
              </span>
              
              {item.badge && (
                <span className={`ml-2 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                  isActive && level === 0 ? "bg-white/20 text-white" : "bg-brand-500 text-white"
                }`}>
                  {item.badge}
                </span>
              )}
              
              {hasChildren && (
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </>
          )}
        </div>
        
        {hasChildren && !isCollapsed && (
          <div className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}>
            <div className="pl-9 mt-1 space-y-1">
              {item.children?.map(child => renderSidebarItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`fixed lg:relative flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? "w-20" : "w-64"
      } ${className}`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Antigravity
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-brand-500 transition-all ${
            isCollapsed ? "mx-auto" : ""
          }`}
        >
          <svg className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        {items.map(item => renderSidebarItem(item))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className={`flex items-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-3 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-500 font-bold">
            P
          </div>
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Pro Plan</p>
              <p className="text-xs text-gray-500 truncate">7 days left</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
