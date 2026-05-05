"use client";
import React, { useState } from "react";

const tickets = [
  { id: "TKT-4821", customer: "Alexandra Winters", subject: "Wrong size delivered - Order #9841", priority: "High", status: "Open", category: "Shipping", created: "5 mins ago", avatar: "AW", avatarColor: "bg-violet-500" },
  { id: "TKT-4820", customer: "Marcus Chen", subject: "Refund not received after 7 days", priority: "High", status: "In Progress", category: "Billing", created: "2 hrs ago", avatar: "MC", avatarColor: "bg-blue-500" },
  { id: "TKT-4819", customer: "Yuki Tanaka", subject: "Carbon Frame scratched on arrival", priority: "Medium", status: "In Progress", category: "Product Quality", created: "5 hrs ago", avatar: "YT", avatarColor: "bg-amber-500" },
  { id: "TKT-4818", customer: "Sofia Reyes", subject: "Cannot apply discount code at checkout", priority: "Low", status: "Resolved", category: "Technical", created: "1 day ago", avatar: "SR", avatarColor: "bg-emerald-500" },
  { id: "TKT-4817", customer: "James O'Brien", subject: "Request invoice for corporate purchase", priority: "Low", status: "Resolved", category: "Billing", created: "2 days ago", avatar: "JO", avatarColor: "bg-rose-500" },
];

const priorityStyle: Record<string, string> = {
  High: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-gray-100 text-gray-500 dark:bg-gray-800",
};

const statusStyle: Record<string, { bg: string; text: string; dot: string }> = {
  Open: { bg: "bg-brand-50 dark:bg-brand-900/20", text: "text-brand-600 dark:text-brand-400", dot: "bg-brand-500" },
  "In Progress": { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500 animate-pulse" },
  Resolved: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
};

const categoryColors: Record<string, string> = {
  Shipping: "bg-blue-100 text-blue-600",
  Billing: "bg-violet-100 text-violet-600",
  "Product Quality": "bg-orange-100 text-orange-600",
  Technical: "bg-cyan-100 text-cyan-600",
};

export default function SupportTicketsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>("TKT-4821");

  const filters = ["All", "Open", "In Progress", "Resolved"];
  const filtered = statusFilter === "All" ? tickets : tickets.filter(t => t.status === statusFilter);
  const activeTicket = tickets.find(t => t.id === selected);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">Relationships / Support</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Support Tickets</h1>
          <p className="text-gray-500 mt-1 text-sm">2 open · 2 in progress · Avg. response time: 1.4h</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30">+ Create Ticket</button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Open Tickets", value: "2", color: "text-brand-500 bg-brand-50 dark:bg-brand-900/20" },
          { label: "In Progress", value: "2", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
          { label: "Resolved (30d)", value: "148", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Avg. CSAT Score", value: "4.8★", color: "text-violet-500 bg-violet-50 dark:bg-violet-900/20" },
        ].map(k => (
          <div key={k.label} className={`${k.color} rounded-2xl p-5`}>
            <p className="text-2xl font-bold">{k.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-70">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex gap-2 mb-3 flex-wrap">
            {filters.map(f => (
              <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${statusFilter === f ? "bg-brand-500 text-white" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-brand-300"}`}>{f}</button>
            ))}
          </div>
          {filtered.map(t => {
            const s = statusStyle[t.status];
            return (
              <div key={t.id} onClick={() => setSelected(t.id)} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selected === t.id ? "border-brand-500 bg-brand-50/50 dark:bg-brand-900/10" : "border-transparent bg-white dark:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700"}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{t.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{t.subject}</p>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{t.customer} · {t.created}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${priorityStyle[t.priority]}`}>{t.priority}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.bg} ${s.text}`}>{t.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        {activeTicket && (
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex flex-col h-[580px]">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activeTicket.id}</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">{activeTicket.subject}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${priorityStyle[activeTicket.priority]}`}>{activeTicket.priority} Priority</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${categoryColors[activeTicket.category]}`}>{activeTicket.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-bold border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Assign</button>
                  <button className="px-3 py-1.5 text-xs font-bold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all">Resolve</button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full ${activeTicket.avatarColor} flex-shrink-0 flex items-center justify-center text-white text-xs font-bold`}>{activeTicket.avatar}</div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl rounded-tl-sm p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Hi, I placed an order recently and received the wrong size. My order was for Size 10 but I received Size 8. Can you please help me resolve this issue? I need it for an event this weekend.</p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 ml-1">{activeTicket.created}</p>
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-brand-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">JD</div>
                <div className="flex-1">
                  <div className="bg-brand-500 rounded-2xl rounded-tr-sm p-4">
                    <p className="text-sm text-white">Hi Alexandra! I'm so sorry about this mix-up. I've checked your order and can confirm this was our error. I'm arranging an express replacement shipment for you right now at no extra cost.</p>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 mr-1 text-right">2 mins ago · John Doe (Admin)</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-3">
                <input className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" placeholder="Type a reply…" />
                <button className="px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-bold hover:bg-brand-600 transition-all">Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
