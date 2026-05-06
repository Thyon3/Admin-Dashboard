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
}

const Sidebar: React.FC<SidebarProps> = ({ items, isCollapsed = false, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(["intelligence-group", "operations-group"]));
  const pathname = usePathname();

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isChildActive = (item: SidebarItem): boolean =>
    item.children?.some(c => c.href === pathname || isChildActive(c)) ?? false;

  const renderItem = (item: SidebarItem, level = 0) => {
    const hasChildren = !!item.children?.length;
    const isExpanded = expandedItems.has(item.id);
    const isActive = item.href === pathname;
    const childActive = isChildActive(item);

    const content = (
      <div
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-xl my-0.5 cursor-pointer transition-all duration-200 group
          ${level === 0
            ? isActive || childActive
              ? "text-brand-600 dark:text-brand-400 font-bold"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            : isActive
              ? "text-brand-600 dark:text-brand-400 font-bold"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
          }
        `}
      >
        {item.icon && (
          <span className={`flex-shrink-0 transition-colors ${(isActive || childActive) && level === 0 ? "text-brand-600 dark:text-brand-400" : ""}`}>
            {item.icon}
          </span>
        )}

        {!isCollapsed && (
          <>
            <span className="flex-1 text-sm font-semibold truncate">{item.label}</span>

            {item.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                (isActive || childActive) && level === 0
                  ? "text-brand-600 dark:text-brand-400"
                  : "bg-brand-500 text-white"
              }`}>
                {item.badge}
              </span>
            )}

            {hasChildren && (
              <svg className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""} ${(isActive || childActive) && level === 0 ? "text-brand-600 dark:text-brand-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </>
        )}
      </div>
    );

    return (
      <div key={item.id}>
        {item.href ? (
          <Link href={item.href} prefetch={true}>
            {content}
          </Link>
        ) : (
          <div onClick={hasChildren ? () => toggleExpanded(item.id) : undefined}>
            {content}
          </div>
        )}
        
        {hasChildren && !isCollapsed && (
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="pl-8 border-l border-gray-100 dark:border-gray-800 ml-5 mt-1 space-y-0.5">
              {item.children!.map(child => renderItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${isCollapsed ? "w-[72px]" : "w-64"}`}>
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-black text-lg">A</div>
            <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">Apex</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          aria-label="Toggle sidebar"
        >
          <svg className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-hide">
        {items.map(item => renderItem(item))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">John Doe</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Super Admin</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 ring-2 ring-white dark:ring-gray-800" />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
