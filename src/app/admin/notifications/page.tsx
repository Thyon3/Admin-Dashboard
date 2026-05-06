"use client";
import React, { useState } from "react";

const initialNotifications = [
  { 
    id: 1, 
    title: "Critical Stock Alert", 
    desc: "The 'Ultra-Light Runner Pro' is currently below the threshold. Only 12 units remaining in Warehouse A.", 
    type: "error", 
    time: "2 mins ago",
    category: "Inventory",
    unread: true
  },
  { 
    id: 2, 
    title: "High-Value Order Received", 
    desc: "Order #9422 ($2,499.00) has been successfully placed by Yuki Tanaka. VIP Customer detected.", 
    type: "success", 
    time: "18 mins ago",
    category: "Sales",
    unread: true
  },
  { 
    id: 3, 
    title: "New Return Request (RMA)", 
    desc: "James O'Brien has requested a return for 'Carbon Frame XR-7' (Reason: Sizing Issue).", 
    type: "warning", 
    time: "1 hour ago",
    category: "Operations",
    unread: true
  },
  { 
    id: 4, 
    title: "Marketing Campaign Peak", 
    desc: "Summer Splash campaign is currently seeing a 45% increase in click-through rates.", 
    type: "info", 
    time: "3 hours ago",
    category: "Marketing",
    unread: false
  },
  { 
    id: 5, 
    title: "Server Maintenance Scheduled", 
    desc: "Planned infrastructure updates will occur on Saturday at 02:00 AM UTC. Expect minor latency.", 
    type: "info", 
    time: "5 hours ago",
    category: "System",
    unread: false
  },
  { 
    id: 6, 
    title: "Payout Successful", 
    desc: "Your weekly payout of $14,203.50 has been transferred to your connected bank account.", 
    type: "success", 
    time: "1 day ago",
    category: "Finance",
    unread: false
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return n.unread;
    if (filter === "all") return true;
    return n.category.toLowerCase() === filter.toLowerCase();
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Activity Center</h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated with real-time alerts and system events.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: "all", label: "All Notifications", icon: "🔔" },
            { id: "unread", label: "Unread", icon: "✉️", count: notifications.filter(n => n.unread).length },
            { id: "inventory", label: "Inventory", icon: "📦" },
            { id: "sales", label: "Sales", icon: "💰" },
            { id: "system", label: "System", icon: "⚙️" },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${filter === f.id ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25" : "text-gray-500 hover:bg-white dark:hover:bg-gray-900 border border-transparent hover:border-gray-100 dark:hover:border-gray-800"}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{f.icon}</span>
                <span className="text-sm font-bold">{f.label}</span>
              </div>
              {f.count ? (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${filter === f.id ? "bg-white/20 text-white" : "bg-brand-500 text-white"}`}>
                  {f.count}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="lg:col-span-3 space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(n => (
              <div 
                key={n.id} 
                className={`group relative flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border transition-all hover:shadow-xl hover:shadow-brand-500/5 ${n.unread ? "border-brand-500/30 ring-1 ring-brand-500/5" : "border-gray-100 dark:border-gray-800"}`}
              >
                <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.type === "error" ? "bg-red-50 text-red-500 dark:bg-red-500/10" : 
                  n.type === "success" ? "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10" : 
                  n.type === "warning" ? "bg-amber-50 text-amber-500 dark:bg-amber-500/10" : 
                  "bg-brand-50 text-brand-500 dark:bg-brand-500/10"
                }`}>
                  {n.category === "Inventory" && "📦"}
                  {n.category === "Sales" && "💰"}
                  {n.category === "Operations" && "🔄"}
                  {n.category === "Marketing" && "📢"}
                  {n.category === "System" && "⚙️"}
                  {n.category === "Finance" && "💳"}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">{n.category}</span>
                    <span className="text-[10px] font-bold text-gray-400">{n.time}</span>
                  </div>
                  <h3 className={`text-sm font-bold transition-colors ${n.unread ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                    {n.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{n.desc}</p>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => deleteNotification(n.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>

                {n.unread && (
                  <div className="absolute top-4 left-[-4px] w-2 h-2 bg-brand-500 rounded-full" />
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="font-bold text-gray-900 dark:text-white">All caught up!</h3>
              <p className="text-sm text-gray-500 mt-1">You have no notifications for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
