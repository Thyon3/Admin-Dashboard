"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useUserPreferences } from "@/context/UserPreferencesContext";

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme();
  const { preferences, toggleCompactMode, toggleStatus } = useUserPreferences();
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, title: "Critical Stock Alert", desc: "Ultra-Light Runner — only 12 units left", type: "error",   time: "2m ago" },
    { id: 2, title: "High-Value Order",     desc: "Order #9422 ($2,499) placed by Yuki T.", type: "success", time: "18m ago" },
    { id: 3, title: "RMA Submitted",        desc: "Return request from James O'Brien",       type: "warning", time: "1h ago" },
  ];

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 h-16">
      <div className="flex items-center h-full px-4 sm:px-6 gap-3">
        {/* Hamburger for mobile */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex-shrink-0"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search… (⌘K)"
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          {/* Compact mode — hidden on mobile */}
          <button
            onClick={toggleCompactMode}
            title="Toggle compact mode"
            className={`hidden sm:flex p-2 rounded-xl transition-all ${preferences.appearance.compactMode ? "bg-brand-500 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
            {isDark
              ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
            }
          </button>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setNotifOpen(o => !o)} className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Notifications</span>
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-500 text-[10px] font-bold rounded-full">{notifications.length} NEW</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800/50 cursor-pointer">
                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.type === "error" ? "bg-red-500" : n.type === "success" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{n.title}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5 truncate">{n.desc}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 text-center">
                    <button className="text-xs font-bold text-brand-500 hover:underline">View all alerts</button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800 ml-1">
            <div className="relative cursor-pointer" onClick={toggleStatus}>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white text-xs font-bold">TM</div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-gray-900 ${preferences.status === "online" ? "bg-emerald-500" : "bg-amber-500"}`} />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Thyon (Asnake Mengesha)</span>
              <span className="text-[10px] text-gray-400 font-bold lowercase tracking-wider">asnakemengesha80@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
