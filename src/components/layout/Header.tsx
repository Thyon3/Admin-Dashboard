"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useUserPreferences } from "@/context/UserPreferencesContext";

interface HeaderProps {
  onMenuToggle?: () => void;
  className?: string;
}

interface SearchResult {
  id: string;
  type: "product" | "order" | "customer" | "page";
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, className = "" }) => {
  const { isDark, toggleTheme } = useTheme();
  const { preferences, toggleCompactMode, toggleStatus } = useUserPreferences();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mock search data
  const mockSearchResults: SearchResult[] = [
    {
      id: "1",
      type: "product",
      title: "Ultra-Light Runner",
      subtitle: "SKU: UL-2024-BLK-M",
      href: "/admin/products/ul-2024-blk-m",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
    },
    {
      id: "2",
      type: "order",
      title: "Order #9422",
      subtitle: "John Doe - $2,450.00",
      href: "/admin/orders/9422",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    },
    {
      id: "3",
      type: "customer",
      title: "Sarah Johnson",
      subtitle: "Premium Tier • 127 orders",
      href: "/admin/customers/sarah-johnson",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
    {
      id: "4",
      type: "page",
      title: "Analytics Dashboard",
      subtitle: "Revenue Attribution & LTV",
      href: "/admin/analytics",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    }
  ];

  const filteredResults = mockSearchResults.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K to open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(!isCommandOpen);
        setSearchQuery("");
        setSelectedIndex(0);
      }

      // ESC to close
      if (e.key === 'Escape' && isCommandOpen) {
        setIsCommandOpen(false);
      }

      // Arrow navigation in command palette
      if (isCommandOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredResults.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
        } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
          window.location.href = filteredResults[selectedIndex].href;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, selectedIndex, filteredResults]);

  // Focus input when command palette opens
  useEffect(() => {
    if (isCommandOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isCommandOpen]);

  return (
    <>
      <header className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-all ${preferences.appearance.compactMode ? "h-12" : "h-16"} ${className}`}>
        <div className="flex items-center justify-between px-6 h-full">
          {/* Left: Command Center */}
          <div className="flex-1 max-w-xl flex items-center">
            {onMenuToggle && (
              <button onClick={onMenuToggle} className="lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            )}

            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400 group-focus-within:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
                placeholder="Quick search... (⌘K)"
                onClick={() => setIsCommandOpen(true)}
                readOnly
              />
            </div>
          </div>

          {/* Right: User Workspace */}
          <div className="flex items-center space-x-2 ml-6">
            {/* Compact Toggle */}
            <button
              onClick={toggleCompactMode}
              className={`p-2 rounded-xl transition-all ${preferences.appearance.compactMode ? "bg-brand-500 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              title="Toggle Compact Mode"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl transition-all">
              {isDark ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-gray-900"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <span className="font-bold text-sm">Notifications</span>
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-500 text-[10px] font-bold rounded-full">3 NEW</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[
                      { id: 1, title: "Critical Stock Alert", desc: "Low stock for 'Ultra-Light Runner'", type: "error" },
                      { id: 2, title: "High Value Order", desc: "Order #9422 ($2.5k) was placed", type: "success" },
                      { id: 3, title: "New Feature Available", desc: "Try the new Inventory Matrix tool", type: "info" }
                    ].map(notif => (
                      <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800/50 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${notif.type === "error" ? "bg-error-500" : notif.type === "success" ? "bg-success-500" : "bg-brand-500"}`} />
                          <div>
                            <p className="text-xs font-bold text-gray-900 dark:text-white">{notif.title}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{notif.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100 dark:border-gray-800">
                    <button className="text-[10px] font-bold text-brand-500 hover:underline uppercase tracking-widest">View All Alerts</button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2"></div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer select-none">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold">JD</div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleStatus(); }}
                  className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-900 transition-colors ${preferences.status === "online" ? "bg-success-500" : "bg-warning-500"}`}
                ></button>
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">John Doe</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Super Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Command Palette Overlay */}
      {isCommandOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in duration-200">
          <div className="flex items-start justify-center pt-[20vh] px-4">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in slide-in-from-top-4 duration-200">
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 outline-none text-sm"
                  placeholder="Search products, orders, customers, or pages..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                />
                <button
                  onClick={() => setIsCommandOpen(false)}
                  className="ml-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="py-2">
                    {filteredResults.map((result, index) => (
                      <a
                        key={result.id}
                        href={result.href}
                        className={`flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${index === selectedIndex ? "bg-gray-50 dark:bg-gray-800" : ""
                          }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3 text-gray-500">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{result.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{result.subtitle}</p>
                        </div>
                        <div className="ml-3">
                          <span className={`px-2 py-1 text-[10px] font-medium rounded-full ${result.type === "product" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" :
                              result.type === "order" ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" :
                                result.type === "customer" ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" :
                                  "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            }`}>
                            {result.type}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 font-mono">↑↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 font-mono">↵</kbd>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 font-mono">ESC</kbd>
                    <span>Close</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {filteredResults.length} results
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
